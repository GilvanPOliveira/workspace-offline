import "../../styles/app-shell.css";

export function AppShell() {
  const shell = document.createElement("div");
  shell.className = "app-shell";

  shell.innerHTML = `
    <a class="app-skiplink" href="#app-content">Pular para conteúdo</a>

    <header class="app-header">
      <div class="app-header__inner">
        <button
          id="sidebar-toggle"
          class="sidebar-toggle"
          type="button"
          aria-label="Abrir menu lateral"
          aria-expanded="false"
          aria-controls="sidebar-nav"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>

        <span class="app-title">WorkspaceOffline</span>

        <button
          id="theme-toggle"
          class="theme-toggle"
          type="button"
          aria-pressed="false"
        >
          🌙
        </button>
      </div>
    </header>

    <div class="app-layout">
      <button class="sidebar-backdrop" type="button" aria-label="Fechar menu"></button>

      <aside id="sidebar-nav" class="sidebar">
        <nav class="sidebar-nav" aria-label="Navegação">
          <a data-nav href="#/" class="nav-item">Home</a>
          <a data-nav href="#/login" class="nav-item">Login</a>
          <a data-nav href="#/app" class="nav-item">App</a>
          <a data-nav href="#/settings" class="nav-item">Settings</a>
          <a data-nav href="#/help" class="nav-item">Help</a>
        </nav>
      </aside>

      <main id="app-content" class="app-main" tabindex="-1">
        <!-- Router renderiza aqui -->
      </main>
    </div>
  `;

  const html = document.documentElement;
  const themeBtn = shell.querySelector("#theme-toggle");

  const applyTheme = (mode) => {
    if (!themeBtn) return;
    const isDark = mode === "dark";
    if (isDark) {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeBtn.textContent = "🌞";
      themeBtn.setAttribute("aria-pressed", "true");
    } else {
      html.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      themeBtn.textContent = "🌙";
      themeBtn.setAttribute("aria-pressed", "false");
    }
  };

  applyTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");
  themeBtn?.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });

  const updateActive = () => {
    const raw = window.location.hash.slice(1) || "/";
    const path = raw.split("?")[0].replace(/\/$/, "") || "/";

    shell.querySelectorAll("[data-nav]").forEach((a) => {
      const hrefRaw = a.getAttribute("href")?.slice(1) || "/";
      const hrefPath = hrefRaw.split("?")[0].replace(/\/$/, "") || "/";
      if (hrefPath === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  window.addEventListener("hashchange", updateActive);
  updateActive();

  shell.querySelector(".app-skiplink")?.addEventListener("click", (e) => {
    e.preventDefault();
    shell.querySelector("#app-content")?.focus();
  });

  const layout = shell.querySelector(".app-layout");
  const sidebarToggle = shell.querySelector("#sidebar-toggle");
  const sidebar = shell.querySelector("#sidebar-nav");
  const backdrop = shell.querySelector(".sidebar-backdrop");
  const firstNav = shell.querySelector("[data-nav]");

  const isMobile = () => window.innerWidth < 768;

  const setNavFocusable = (enabled) => {
    if (!sidebar) return;
    const links = sidebar.querySelectorAll("a[data-nav]");
    links.forEach((a) => {
      if (enabled) a.removeAttribute("tabindex");
      else a.setAttribute("tabindex", "-1");
    });
  };

  const setInert = (el, value) => {
    if (!el) return;
    try {
      el.inert = value;
    } catch {
    }
  };

  const setToggleA11y = (open) => {
    if (!sidebarToggle) return;
    sidebarToggle.setAttribute("aria-expanded", String(open));
    sidebarToggle.setAttribute("aria-label", open ? "Fechar menu lateral" : "Abrir menu lateral");
    sidebarToggle.classList.toggle("is-open", open);
  };

  const openSidebar = () => {
    if (!layout || !sidebar || !backdrop) return;
    layout.classList.add("is-open");
    setToggleA11y(true);

    setInert(sidebar, false);
    setInert(backdrop, false);
    setNavFocusable(true);

    firstNav?.focus();
  };

  const closeSidebar = ({ returnFocus = false } = {}) => {
    if (!layout || !sidebar || !backdrop) return;
    layout.classList.remove("is-open");
    setToggleA11y(false);

    setInert(sidebar, true);
    setInert(backdrop, true);
    setNavFocusable(false);

    if (returnFocus) sidebarToggle?.focus();
  };

  const syncSidebarForViewport = () => {
    if (!layout || !sidebar || !backdrop) return;

    if (!isMobile()) {
      layout.classList.remove("is-open");
      setToggleA11y(false);

      setInert(sidebar, false);
      setInert(backdrop, true);
      setNavFocusable(true);
      return;
    }

    closeSidebar();
  };

  sidebarToggle?.addEventListener("click", () => {
    if (!layout) return;
    const open = layout.classList.contains("is-open");
    if (open) closeSidebar({ returnFocus: true });
    else openSidebar();
  });

  backdrop?.addEventListener("click", () => {
    if (isMobile()) closeSidebar({ returnFocus: true });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobile() && layout?.classList.contains("is-open")) {
      closeSidebar({ returnFocus: true });
    }
  });

  window.addEventListener("hashchange", () => {
    if (isMobile()) closeSidebar();
  });

  sidebar?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a[data-nav]");
    if (link && isMobile()) closeSidebar();
  });

  window.addEventListener("resize", syncSidebarForViewport);
  syncSidebarForViewport();

  return shell;
}
