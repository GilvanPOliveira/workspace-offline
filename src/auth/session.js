import { createToken, verifyToken } from "./jwt.js";

const TOKEN_KEY = "wo_session_token";
const SECRET_KEY = "wo_session_key"; // didático (Task 3.4/4.x pode mudar)
const CREATED_AT = "wo_session_created_at";

export function setSession({ email, password, key }) {
  // didático: guarda também senha/chave dentro do payload pra você exibir no Settings (Task 3.2)
  const payload = { email, password, key, iat: Date.now() };
  const token = createToken(payload, key);

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SECRET_KEY, key);
  localStorage.setItem(CREATED_AT, new Date().toISOString());

  return payload;
}

export function getSession() {
  const token = localStorage.getItem(TOKEN_KEY);
  const key = localStorage.getItem(SECRET_KEY);
  if (!token || !key) return null;

  const { ok, payload } = verifyToken(token, key);
  if (!ok) {
    clearSession();
    return null;
  }

  return payload;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SECRET_KEY);
  localStorage.removeItem(CREATED_AT);
}
