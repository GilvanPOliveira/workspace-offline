import { getSession, clearSession } from "../auth/session.js";

function getNameFromEmail(email) {
  if (!email || typeof email !== "string") return "";
  const at = email.indexOf("@");
  return at === -1 ? email : email.slice(0, at);
}

export default function Dashboard() {
  const section = document.createElement("section");
  section.className = "p-8 max-w-3xl mx-auto";
  section.innerHTML = `
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
        <p class="text-muted mt-1" id="session-line">Carregando sessão...</p>
      </div>

      <div class="flex gap-2">
        <a href="#/settings" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Settings</a>
        <a href="#/help" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Help</a>
        <button
          id="logout-btn"
          type="button"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Sair
        </button>
      </div>
    </header>

    <main class="mt-8 space-y-3">
      <div class="border rounded p-4">
        <h2 class="text-xl font-bold">Status</h2>
        <p class="text-muted mt-1">
          Área protegida por sessão local (token). Refresh deve manter sessão.
        </p>
      </div>
    </main>
  `;

  const sessionLine = section.querySelector("#session-line");
  const logoutBtn = section.querySelector("#logout-btn");

  logoutBtn.addEventListener("click", () => {
    clearSession();
    window.location.hash = "#/login";
  });

  // ✅ getSession() retorna o payload direto (ou null)
  const session = getSession();
  if (!session) {
    window.location.hash = "#/login";
    return section;
  }

  const email = session.email || session.sub || "";
  const name = getNameFromEmail(email);

  sessionLine.textContent = `Logado como: ${name}`;

  return section;
}
