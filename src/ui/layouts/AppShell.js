export function AppShell() {
  const shell = document.createElement("div");
  shell.className = "app-shell";

  shell.innerHTML = `
    <a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 px-md py-sm bg-surface border border-border rounded-md"
       href="#app-content">
      Pular para conteúdo
    </a>

    <header class="bg-surface p-md border-b border-border">
      <div class="flex justify-between items-center">
        <nav class="flex gap-md items-center" aria-label="Navegação principal">
          <a data-nav href="#/" class="px-md py-sm font-semibold text-primary hover:bg-primary/10 rounded-md">Home</a>
          <a data-nav href="#/login" class="px-md py-sm text-primary hover:bg-primary/10 rounded-md">Login</a>
          <a data-nav href="#/app" class="px-md py-sm text-primary hover:bg-primary/10 rounded-md">App</a>
          <a data-nav href="#/settings" class="px-md py-sm text-primary hover:bg-primary/10 rounded-md">Settings</a>
          <a data-nav href="#/help" class="px-md py-sm text-primary hover:bg-primary/10 rounded-md">Help</a>

          <button
            id="theme-toggle"
            type="button"
            class="px-md py-sm bg-surface-hover text-text-muted hover:bg-primary/10 rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-pressed="false"
          >
            🌙 Dark Mode
          </button>
        </nav>
      </div>
    </header>

    <main id="app-content" class="flex-1 p-6 overflow-auto" tabindex="-1">
      <!-- Router renderiza aqui -->
    </main>
  `;

  const html = document.documentElement;
  const toggleBtn = shell.querySelector("#theme-toggle");

  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    html.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️ Light Mode";
    toggleBtn.setAttribute("aria-pressed", "true");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    if (isDark) {
      html.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      toggleBtn.textContent = "🌙 Dark Mode";
      toggleBtn.setAttribute("aria-pressed", "false");
    } else {
      html.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀️ Light Mode";
      toggleBtn.setAttribute("aria-pressed", "true");
    }
  });

  const updateActive = () => {
    const path = window.location.hash.slice(1) || "/";
    shell.querySelectorAll("[data-nav]").forEach((a) => {
      const hrefPath = a.getAttribute("href")?.slice(1) || "/";
      if (hrefPath === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  window.addEventListener("hashchange", updateActive);
  updateActive();

  const skip = shell.querySelector('a[href="#app-content"]');
  skip.addEventListener("click", (e) => {
    e.preventDefault();
    shell.querySelector("#app-content")?.focus();
  });

  return shell;
}
