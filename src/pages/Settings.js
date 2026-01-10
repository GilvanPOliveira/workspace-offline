import { getSession, clearSession } from "../auth/session.js";

const DEBUG_PASSWORD_KEY = "debug_password";

export default function Settings() {
  const section = document.createElement("section");
  section.className = "p-8 max-w-3xl mx-auto";
  section.innerHTML = `
    <header class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-primary">Settings</h1>
        <p class="text-muted mt-1" id="session-line">Carregando sessão...</p>
      </div>

      <div class="flex gap-2">
        <a href="#/app" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Voltar</a>
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
        <h2 class="text-xl font-bold">Preferências</h2>
        <p class="text-muted mt-1">Serão adicionadas nas próximas tasks.</p>
      </div>

      <div class="border rounded p-4">
        <h2 class="text-xl font-bold">Sessão (debug)</h2>

        <ul class="mt-3 space-y-1">
          <li><span class="font-bold">Logado com:</span> <span id="debug-email">—</span></li>
          <li><span class="font-bold">Senha:</span> <span id="debug-password">—</span></li>
        </ul>

        <p class="text-muted text-sm mt-3">
          A senha só aparece em DEV (sessionStorage).
        </p>
      </div>
    </main>
  `;

  const sessionLine = section.querySelector("#session-line");
  const logoutBtn = section.querySelector("#logout-btn");

  const debugEmail = section.querySelector("#debug-email");
  const debugPassword = section.querySelector("#debug-password");

  logoutBtn.addEventListener("click", () => {
    clearSession();
    window.location.hash = "#/login";
  });

  (async () => {
    const session = await getSession();
    if (!session) {
      window.location.hash = "#/login";
      return;
    }

    const email = session.payload.email || session.payload.sub || "";
    sessionLine.textContent = `Logado como: ${email}`;

    const password = sessionStorage.getItem(DEBUG_PASSWORD_KEY);

    debugEmail.textContent = email;
    debugPassword.textContent = password ?? "(não disponível)";
  })();

  return section;
}
