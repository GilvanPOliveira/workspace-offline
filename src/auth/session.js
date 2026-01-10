import { verifyToken } from "./jwt.js";

const SESSION_TOKEN_KEY = "auth_token";
const DEBUG_PASSWORD_KEY = "debug_password";

let sessionKey = null;

export function setSessionKey(key) {
  sessionKey = key;
}

export function clearSessionKey() {
  sessionKey = null;
}

export function setSessionToken(token) {
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function getSessionToken() {
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(DEBUG_PASSWORD_KEY);
  clearSessionKey();
}

export async function getSession() {
  const token = getSessionToken();
  if (!token) return null;

  // Sessão é volátil (refresh perde a key) — igual seu texto no Dashboard
  if (!sessionKey) return null;

  const payload = await verifyToken(token, sessionKey);
  if (!payload) {
    clearSession();
    return null;
  }

  return { token, payload };
}
