const enc = new TextEncoder();
const dec = new TextDecoder();

function bytesToBase64(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64urlEncodeBytes(bytes) {
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function b64urlDecodeToBytes(b64url) {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  return base64ToBytes(b64);
}

function b64urlEncodeJson(obj) {
  return b64urlEncodeBytes(enc.encode(JSON.stringify(obj)));
}

function b64urlDecodeJson(b64url) {
  return JSON.parse(dec.decode(b64urlDecodeToBytes(b64url)));
}

const PBKDF2_ITERATIONS = 210_000;
const PBKDF2_HASH = "SHA-256";

export async function deriveHmacKeyFromPassword(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: PBKDF2_HASH },
    baseKey,
    { name: "HMAC", hash: "SHA-256", length: 256 },
    false,
    ["sign", "verify"]
  );
}

async function signHS256(message, key) {
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return b64urlEncodeBytes(new Uint8Array(sig));
}

export async function createToken(payload, key, opts = {}) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = Number.isFinite(opts.expiresIn) ? opts.expiresIn : 60 * 60;

  const claims = { ...payload, iat: now, exp: now + expiresIn };

  const headerB64 = b64urlEncodeJson(header);
  const payloadB64 = b64urlEncodeJson(claims);
  const signingInput = `${headerB64}.${payloadB64}`;

  const signatureB64 = await signHS256(signingInput, key);
  return `${signingInput}.${signatureB64}`;
}

export async function verifyToken(token, key) {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;
    const header = b64urlDecodeJson(headerB64);

    if (header?.alg !== "HS256" || header?.typ !== "JWT") return null;

    const signingInput = `${headerB64}.${payloadB64}`;

    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlDecodeToBytes(sigB64),
      enc.encode(signingInput)
    );
    if (!ok) return null;

    const payload = b64urlDecodeJson(payloadB64);
    const now = Math.floor(Date.now() / 1000);

    if (typeof payload.exp !== "number" || payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}
