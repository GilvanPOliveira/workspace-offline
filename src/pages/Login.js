import { validateAuthForm } from '../lib/validate.js';

export default function Login() {
  const div = document.createElement('div');
  div.innerHTML = `
    <section class="p-8">
      <h1 class="text-3xl font-bold text-primary">Login</h1>
      <p>Workspace Offline — Tela de login</p>

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

        <button
          type="submit"
          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Entrar
        </button>
      </form>

      <nav class="mt-8 space-x-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
        <a href="#/app" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">App</a>
      </nav>
    </section>
  `;

  const section = div.firstElementChild;

  const form = section.querySelector('#login-form');
  const emailInput = section.querySelector('#email');
  const passwordInput = section.querySelector('#password');

  const emailError = section.querySelector('#email-error');
  const passwordError = section.querySelector('#password-error');

  function clearFieldError(input, errorEl) {
    errorEl.textContent = '';
    input.setAttribute('aria-invalid', 'false');
  }

  function setFieldError(input, errorEl, messages) {
    if (messages && messages.length) {
      errorEl.textContent = messages[0];
      input.setAttribute('aria-invalid', 'true');
      return true;
    }
    clearFieldError(input, errorEl);
    return false;
  }

  emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  passwordInput.addEventListener('input', () => clearFieldError(passwordInput, passwordError));

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const result = validateAuthForm({
      email: emailInput.value,
      password: passwordInput.value,
    });

    const emailHasError = setFieldError(emailInput, emailError, result.errors.email);
    const passwordHasError = setFieldError(passwordInput, passwordError, result.errors.password);

    if (!result.ok) {
      if (emailHasError) emailInput.focus();
      else if (passwordHasError) passwordInput.focus();
      return;
    }

    console.log('Form válido, seguir com login...');
  });

  return section;
}
