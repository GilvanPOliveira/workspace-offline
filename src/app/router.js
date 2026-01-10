import { getSession } from "../auth/session.js";

function getPathFromHash() {
  const h = location.hash || "#/";
  const raw = h.startsWith("#") ? h.slice(1) : h;
  const q = raw.indexOf("?");
  const path = q === -1 ? raw : raw.slice(0, q);
  return path || "/";
}

function setTitle(title) {
  document.title = title ? `${title} • Workspace Offline` : "Workspace Offline";
}

function renderError(outlet, err, path) {
  console.error("[router] erro ao renderizar:", path, err);

  outlet.innerHTML = "";
  const box = document.createElement("section");
  box.className = "p-8 max-w-3xl mx-auto";
  box.innerHTML = `
    <h1 class="text-2xl font-bold text-danger">Erro ao carregar página</h1>
    <p class="mt-2 text-muted">A rota <strong>${path}</strong> quebrou ao executar.</p>
    <pre class="mt-4 p-4 rounded border overflow-auto text-sm">${String(
      err?.message || err
    )}</pre>
    <div class="mt-4 flex gap-2">
      <a class="px-4 py-2 rounded bg-primary text-white" href="#/">Home</a>
      <a class="px-4 py-2 rounded border" href="#/login">Login</a>
    </div>
  `;
  outlet.appendChild(box);
}

const routes = [
  {
    path: "/",
    title: "Home",
    auth: false,
    load: () => import("../pages/Home.js"),
  },
  {
    path: "/login",
    title: "Login",
    auth: false,
    load: () => import("../pages/Login.js"),
  },
  {
    path: "/app",
    title: "Dashboard",
    auth: true,
    load: () => import("../pages/Dashboard.js"),
  },
  {
    path: "/settings",
    title: "Settings",
    auth: true,
    load: () => import("../pages/Settings.js"),
  },
  {
    path: "/help",
    title: "Ajuda",
    auth: false,
    load: () => import("../pages/Help.js"),
  },
  {
    path: "/404",
    title: "404",
    auth: false,
    load: () => import("../pages/NotFound.js"),
  },
];

function matchRoute(path) {
  return routes.find((r) => r.path === path) || routes.find((r) => r.path === "/404");
}

function goLoginWithNext(path) {
  const next = encodeURIComponent(path);
  location.hash = `#/login?next=${next}`;
}

async function render(outlet) {
  const path = getPathFromHash();
  const route = matchRoute(path);

  // Guard: área logada
  if (route.auth && !getSession()) {
    goLoginWithNext(path);
    return;
  }

  // se já logado e tentar abrir login, manda pro app
  if (route.path === "/login" && getSession()) {
    location.hash = "#/app";
    return;
  }

  try {
    setTitle(route.title);

    const mod = await route.load();
    const Page = mod.default;

    outlet.innerHTML = "";
    outlet.appendChild(Page());
  } catch (err) {
    renderError(outlet, err, route.path);
  }
}

/**
 * ✅ O main.js espera essa função existir: initRouter()
 */
export function initRouter() {
  // tenta achar um outlet "padrão" sem depender do AppShell exato
  const outlet =
    document.querySelector("[data-router-outlet]") ||
    document.querySelector("#outlet") ||
    document.querySelector("main") ||
    document.querySelector("#app");

  if (!outlet) {
    throw new Error(
      "Router: não encontrei outlet. Crie um container (ex: <main id='outlet'></main>) no AppShell."
    );
  }

  window.addEventListener("hashchange", () => render(outlet));
  render(outlet);

  return {
    navigate: (path) => (location.hash = `#${path}`),
    render: () => render(outlet),
  };
}
