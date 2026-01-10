import { validateAuthForm } from "../lib/validate.js";
import { deriveHmacKeyFromPassword, createToken } from "../auth/jwt.js";
import { setSessionKey, setSessionToken } from "../auth/session.js";

const enc = new TextEncoder();

const ACCESS_KEY_HASH_STORAGE = "workspaceoffline_access_key_hash";
const APP_SALT_PREFIX = "workspace-offline::salt::";

const DEBUG_PASSWORD_KEY = "debug_password";
const DEBUG_ACCESS_KEY = "debug_access_key";

function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64urlEncodeBytes(bytes) {
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function sha256Base64url(str) {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(str));
  return b64urlEncodeBytes(new Uint8Array(digest));
}

async function buildSaltFromAccessKey(accessKey) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    enc.encode(`${APP_SALT_PREFIX}${accessKey}`)
  );
  return new Uint8Array(digest);
}

export default function Login() {
  const div = document.createElement("div");
  div.innerHTML = `
    <section class="p-8 max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-primary">Login</h1>
      <p class="text-muted mt-1">Workspace Offline — Tela de login</p>

      <form id="login-form" class="mt-6 space-y-4" novalidate>
        <div>
          <label class="block mb-1" for="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="border rounded px-3 py-2 w-full"
            aria-describedby="email-error"
            aria-invalid="false"
            required
          />
          <p id="email-error" class="text-red-600 text-sm mt-1" aria-live="polite"></p>
        </div>

        <div>
          <label class="block mb-1" for="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            class="border rounded px-3 py-2 w-full"
            aria-describedby="password-error"
            aria-invalid="false"
            required
          />
          <p id="password-error" class="text-red-600 text-sm mt-1" aria-live="polite"></p>
        </div>

        <div>
          <label class="block mb-1" for="accessKey">Chave de acesso</label>
          <input
            id="accessKey"
            name="accessKey"
            type="text"
            autocomplete="off"
            class="border rounded px-3 py-2 w-full"
            aria-describedby="accessKey-help accessKey-error"
            aria-invalid="false"
            required
          />
          <p id="accessKey-help" class="text-sm text-muted mt-1"></p>
          <p id="accessKey-error" class="text-red-600 text-sm mt-1" aria-live="polite"></p>
        </div>

        <button
          type="submit"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Entrar
        </button>
      </form>

      <nav class="mt-8 flex gap-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
        <a href="#/help" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Help</a>
      </nav>
    </section>
  `;

  const section = div.firstElementChild;

  const form = section.querySelector("#login-form");
  const emailInput = section.querySelector("#email");
  const passwordInput = section.querySelector("#password");
  const accessKeyInput = section.querySelector("#accessKey");

  const emailError = section.querySelector("#email-error");
  const passwordError = section.querySelector("#password-error");
  const accessKeyHelp = section.querySelector("#accessKey-help");
  const accessKeyError = section.querySelector("#accessKey-error");

  const storedAccessKeyHash = localStorage.getItem(ACCESS_KEY_HASH_STORAGE);
  accessKeyHelp.textContent = storedAccessKeyHash
    ? "Informe a chave configurada neste navegador."
    : "Primeiro acesso: defina uma chave (ela será exigida nos próximos logins).";

  function clearFieldError(input, errorEl) {
    errorEl.textContent = "";
    input.setAttribute("aria-invalid", "false");
  }

  function setFieldError(input, errorEl, messages) {
    if (messages && messages.length) {
      errorEl.textContent = messages[0];
      input.setAttribute("aria-invalid", "true");
      return true;
    }
    clearFieldError(input, errorEl);
    return false;
  }

  function setSingleError(input, errorEl, msg) {
    errorEl.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  }

  emailInput.addEventListener("input", () => clearFieldError(emailInput, emailError));
  passwordInput.addEventListener("input", () => clearFieldError(passwordInput, passwordError));
  accessKeyInput.addEventListener("input", () => clearFieldError(accessKeyInput, accessKeyError));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const result = validateAuthForm({
      email: emailInput.value,
      password: passwordInput.value,
      accessKey: accessKeyInput.value,
    });

    const emailHasError = setFieldError(emailInput, emailError, result.errors.email);
    const passwordHasError = setFieldError(passwordInput, passwordError, result.errors.password);
    const accessHasError = setFieldError(accessKeyInput, accessKeyError, result.errors.accessKey);

    if (!result.ok) {
      if (emailHasError) emailInput.focus();
      else if (passwordHasError) passwordInput.focus();
      else if (accessHasError) accessKeyInput.focus();
      return;
    }

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const accessKey = accessKeyInput.value.trim();

    try {
      const accessKeyHash = await sha256Base64url(accessKey);

      if (!storedAccessKeyHash) {
        localStorage.setItem(ACCESS_KEY_HASH_STORAGE, accessKeyHash);
        accessKeyHelp.textContent = "Chave configurada com sucesso. Guarde-a.";
      } else {
        if (accessKeyHash !== storedAccessKeyHash) {
          setSingleError(accessKeyInput, accessKeyError, "Chave de acesso incorreta.");
          accessKeyInput.focus();
          return;
        }
      }

      const salt = await buildSaltFromAccessKey(accessKey);
      const key = await deriveHmacKeyFromPassword(password, salt);

      const token = await createToken({ sub: email, email }, key, { expiresIn: 60 * 60 });

      setSessionKey(key);
      setSessionToken(token);

      if (import.meta?.env?.DEV) {
        sessionStorage.setItem(DEBUG_PASSWORD_KEY, password);
        sessionStorage.setItem(DEBUG_ACCESS_KEY, accessKey);
      }

      window.location.hash = "#/app";
    } catch {
      setSingleError(passwordInput, passwordError, "Falha ao iniciar sessão. Tente novamente.");
      passwordInput.focus();
    }
  });

  return section;
}
