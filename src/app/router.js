const ROUTES = {
  "/": {
    title: "Workspace Offline — Home",
    component: () => import("../pages/Home.js"),
  },
  "/login": {
    title: "Workspace Offline — Login",
    component: () => import("../pages/Login.js"),
  },
  "/app": {
    title: "Workspace Offline — Dashboard",
    component: () => import("../pages/Dashboard.js"),
  },
  "/settings": {
    title: "Workspace Offline — Settings",
    component: () => import("../pages/Settings.js"),
  },
  "/help": {
    title: "Workspace Offline — Help",
    component: () => import("../pages/Help.js"),
  },
  "/404": {
    title: "Workspace Offline — 404",
    component: () => import("../pages/NotFound.js"),
  },
};

function getPath() {
  return window.location.hash.slice(1) || "/";
}

async function renderRoute(path) {
  const route = ROUTES[path] || ROUTES["/404"];
  document.title = route.title;
  
  const container = document.querySelector("#app-content");
  if (!container) throw new Error("Router container #app-content not found");

  try {
    const { default: Page } = await route.component();
    container.innerHTML = "";
    container.appendChild(Page());
    container.focus();  
  } catch (err) {
    const container = document.querySelector("#app-content");
    if (container) {
      container.innerHTML = "<h1>404</h1><p>Erro ao carregar a página.</p>";
    }
    window.location.hash = "#/404";  
  }
}

function router() {
  const path = getPath();

  if (!ROUTES[path]) {
    if (window.location.hash !== "#/404") {
      window.location.hash = "#/404";  
    }
    return;
  }

  renderRoute(path);
}

function initRouter() {
  window.addEventListener("hashchange", router);
  router();
}

export { initRouter };
