const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toCleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function isEmail(value) {
  return EMAIL_REGEX.test(toCleanString(value));
}

export function validateEmail(value) {
  const errors = [];
  const clean = toCleanString(value);

  if (!clean) {
    errors.push('O e-mail é obrigatório.');
  } else if (!EMAIL_REGEX.test(clean)) {
    errors.push('Informe um e-mail válido (ex.: nome@dominio.com).');
  }

  return { ok: errors.length === 0, errors };
}

export function validatePassword(value, { minLength = 8 } = {}) {
  const errors = [];
  const clean = toCleanString(value);

  if (!clean) {
    errors.push('A senha é obrigatória.');
  } else if (clean.length < minLength) {
    errors.push(`A senha deve ter pelo menos ${minLength} caracteres.`);
  }

  return { ok: errors.length === 0, errors };
}

export function validateAuthForm({ email, password }) {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);

  return {
    ok: emailResult.ok && passwordResult.ok,
    errors: {
      email: emailResult.errors,
      password: passwordResult.errors,
    },
  };
}
