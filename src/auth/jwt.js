function base64urlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64urlDecode(str) {
  const pad = str.length % 4 ? "=".repeat(4 - (str.length % 4)) : "";
  const b64 = (str + pad).replace(/-/g, "+").replace(/_/g, "/");
  return decodeURIComponent(escape(atob(b64)));
}

// hash simples (não-cripto) p/ didática
function fnv1a(input) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return ("00000000" + h.toString(16)).slice(-8);
}

export function createToken(payload, key) {
  const header = { alg: "FNV1A", typ: "JWT" };
  const h = base64urlEncode(JSON.stringify(header));
  const p = base64urlEncode(JSON.stringify(payload));
  const sig = base64urlEncode(fnv1a(`${h}.${p}.${key}`));
  return `${h}.${p}.${sig}`;
}

export function verifyToken(token, key) {
  try {
    const [h, p, sig] = String(token || "").split(".");
    if (!h || !p || !sig) return { ok: false, payload: null };

    const expected = base64urlEncode(fnv1a(`${h}.${p}.${key}`));
    if (sig !== expected) return { ok: false, payload: null };

    const payload = JSON.parse(base64urlDecode(p));
    return { ok: true, payload };
  } catch {
    return { ok: false, payload: null };
  }
}
