import { getSession } from "../auth/session.js";

const ROUTES = {
  "/": {
    title: "Workspace Offline — Home",
    component: () => import("../pages/Home.js"),
    public: true,
  },
  "/login": {
    title: "Workspace Offline — Login",
    component: () => import("../pages/Login.js"),
    public: true,
  },
  "/app": {
    title: "Workspace Offline — Dashboard",
    component: () => import("../pages/Dashboard.js"),
    auth: true,
  },
  "/settings": {
    title: "Workspace Offline — Settings",
    component: () => import("../pages/Settings.js"),
    auth: true,
  },
  "/help": {
    title: "Workspace Offline — Help",
    component: () => import("../pages/Help.js"),
    public: true,
  },
  "/404": {
    title: "Workspace Offline — 404",
    component: () => import("../pages/NotFound.js"),
    public: true,
  },
};

function normalizePath(raw) {
  let path = raw || "/";

  // remove querystring (?x=1)
  path = path.split("?")[0];

  // garante que começa com "/"
  if (!path.startsWith("/")) path = `/${path}`;

  // remove barra final (exceto "/")
  if (path.length > 1) path = path.replace(/\/+$/, "");

  return path || "/";
}

function getPath() {
  return normalizePath(window.location.hash.slice(1));
}

function renderError(container, path, err) {
  container.innerHTML = `
    <section class="p-8 max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-primary">Erro ao carregar página</h1>
      <p class="text-muted mt-2">A rota <b>${path}</b> quebrou ao executar.</p>
      <pre class="mt-4 border rounded p-3 overflow-auto" style="white-space:pre-wrap">${String(
        err?.stack || err
      )}</pre>
      <p class="text-muted text-sm mt-4">Abra o Console (F12) para mais detalhes.</p>
      <div class="mt-4 flex gap-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
        <a href="#/login" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Login</a>
      </div>
    </section>
  `;
}

async function renderRoute(path) {
  const route = ROUTES[path] || ROUTES["/404"];
  document.title = route.title;

  const container = document.querySelector("#app-content");
  if (!container) throw new Error("Router container #app-content not found (AppShell não montou?)");

  try {
    const { default: Page } = await route.component();
    container.innerHTML = "";
    container.appendChild(Page());
    container.focus();
  } catch (err) {
    console.error("[router] erro ao renderizar:", path, err);
    renderError(container, path, err);
  }
}

async function router() {
  const path = getPath();
  const route = ROUTES[path];

  // rota inexistente
  if (!route) {
    await renderRoute("/404");
    return;
  }

  // guard
  if (route.auth) {
    const session = await getSession();
    if (!session) {
      window.location.hash = "#/login";
      return;
    }
  }

  await renderRoute(path);
}

function initRouter() {
  const run = () => router().catch((err) => console.error("[router] fatal:", err));
  window.addEventListener("hashchange", run);
  run();
}

export { initRouter };
