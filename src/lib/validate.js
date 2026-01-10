export function validateEmail(email) {
  const v = String(email || "").trim();
  // simples e suficiente p/ didática
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return { ok, value: v, error: ok ? "" : "Informe um e-mail válido." };
}

export function validatePassword(password) {
  const v = String(password || "");
  const ok = v.length >= 6;
  return {
    ok,
    value: v,
    error: ok ? "" : "A senha deve ter no mínimo 6 caracteres.",
  };
}

export function validateKey(key) {
  const v = String(key || "");
  const ok = v.length >= 4;
  return {
    ok,
    value: v,
    error: ok ? "" : "A chave deve ter no mínimo 4 caracteres.",
  };
}

/**
 * Valida o form de auth do projeto (Task 3.1).
 * @param {{email:string, password:string, key:string}} values
 * @returns {{ok:boolean, errors:Record<string,string>, data:{email:string,password:string,key:string}}}
 */
export function validateAuthForm(values) {
  const errors = {};

  const e = validateEmail(values?.email);
  if (!e.ok) errors.email = e.error;

  const p = validatePassword(values?.password);
  if (!p.ok) errors.password = p.error;

  const k = validateKey(values?.key);
  if (!k.ok) errors.key = k.error;

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: { email: e.value, password: p.value, key: k.value },
  };
}
