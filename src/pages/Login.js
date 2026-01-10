import { validateAuthForm } from "../lib/validate.js";
import { createUser, verifyCredentials } from "../data/usersRepo.js";
import { setSession, getSession } from "../auth/session.js";

function renderErrors(root, errors) {
  const map = {
    email: root.querySelector("#err-email"),
    password: root.querySelector("#err-password"),
    key: root.querySelector("#err-key"),
    form: root.querySelector("#err-form"),
  };

  Object.values(map).forEach((el) => {
    if (el) el.textContent = "";
  });

  if (errors?.email) map.email.textContent = errors.email;
  if (errors?.password) map.password.textContent = errors.password;
  if (errors?.key) map.key.textContent = errors.key;
  if (errors?.form) map.form.textContent = errors.form;
}

function getNextFromHash() {
  // suporta #/login?next=%2Fapp
  const raw = location.hash || "#/login";
  const qIndex = raw.indexOf("?");
  if (qIndex === -1) return null;
  const qs = new URLSearchParams(raw.slice(qIndex + 1));
  const next = qs.get("next");
  return next ? decodeURIComponent(next) : null;
}

export default function Login() {
  // se já está logado, manda pro app
  if (getSession()) {
    location.hash = "#/app";
  }

  const root = document.createElement("section");
  root.className = "p-8 max-w-xl mx-auto";

  root.innerHTML = `
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-primary">Login</h1>
      <p class="text-muted">Workspace Offline — entrar ou criar conta</p>
    </header>

    <div class="mt-6 flex gap-2">
      <button id="tab-login" class="px-4 py-2 rounded bg-primary text-white">Entrar</button>
      <button id="tab-register" class="px-4 py-2 rounded border">Criar conta</button>
    </div>

    <form id="auth-form" class="mt-6 space-y-4" novalidate>
      <div>
        <label class="block mb-1" for="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          class="w-full px-3 py-2 rounded border"
          placeholder="voce@exemplo.com"
          aria-describedby="err-email"
        />
        <p id="err-email" class="text-sm text-danger mt-1" aria-live="polite"></p>
      </div>

      <div>
        <label class="block mb-1" for="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          class="w-full px-3 py-2 rounded border"
          placeholder="mínimo 6 caracteres"
          aria-describedby="err-password"
        />
        <p id="err-password" class="text-sm text-danger mt-1" aria-live="polite"></p>
      </div>

      <div>
        <label class="block mb-1" for="key">Chave</label>
        <input
          id="key"
          name="key"
          type="password"
          autocomplete="off"
          class="w-full px-3 py-2 rounded border"
          placeholder="sua chave local"
          aria-describedby="err-key"
        />
        <p id="err-key" class="text-sm text-danger mt-1" aria-live="polite"></p>
      </div>

      <p id="err-form" class="text-sm text-danger" aria-live="polite"></p>

      <button
        id="submit-btn"
        type="submit"
        class="w-full px-4 py-2 rounded bg-primary text-white hover:bg-primary-hover"
      >
        Entrar
      </button>

      <p class="text-sm text-muted">
        Dica: este fluxo é didático. Na Task 3.4 a senha deixa de ser salva em texto puro.
      </p>
    </form>
  `;

  const tabLogin = root.querySelector("#tab-login");
  const tabRegister = root.querySelector("#tab-register");
  const form = root.querySelector("#auth-form");
  const submitBtn = root.querySelector("#submit-btn");

  let mode = "login"; // "login" | "register"

  function setMode(next) {
    mode = next;

    if (mode === "login") {
      tabLogin.className = "px-4 py-2 rounded bg-primary text-white";
      tabRegister.className = "px-4 py-2 rounded border";
      submitBtn.textContent = "Entrar";
      root.querySelector("#password").setAttribute("autocomplete", "current-password");
    } else {
      tabLogin.className = "px-4 py-2 rounded border";
      tabRegister.className = "px-4 py-2 rounded bg-primary text-white";
      submitBtn.textContent = "Criar conta";
      root.querySelector("#password").setAttribute("autocomplete", "new-password");
    }

    renderErrors(root, {});
  }

  tabLogin.addEventListener("click", () => setMode("login"));
  tabRegister.addEventListener("click", () => setMode("register"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = root.querySelector("#email").value;
    const password = root.querySelector("#password").value;
    const key = root.querySelector("#key").value;

    const v = validateAuthForm({ email, password, key });
    if (!v.ok) {
      renderErrors(root, v.errors);
      return;
    }

    if (mode === "register") {
      const res = createUser(v.data);
      if (!res.ok) {
        renderErrors(root, { form: res.error });
        return;
      }

      // após criar, já loga
      setSession(v.data);

      const next = getNextFromHash();
      location.hash = next ? `#${next}` : "#/app";
      return;
    }

    // login
    const auth = verifyCredentials(v.data);
    if (!auth.ok) {
      renderErrors(root, { form: auth.error });
      return;
    }

    setSession(v.data);

    const next = getNextFromHash();
    location.hash = next ? `#${next}` : "#/app";
  });

  // modo inicial
  setMode("login");

  // foco inicial
  setTimeout(() => root.querySelector("#email")?.focus(), 0);

  return root;
}
