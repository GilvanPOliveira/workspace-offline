const STORAGE_KEY = "wo_users_v1";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeAll(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUserByEmail(email) {
  const users = readAll();
  return users.find((u) => u.email === email) || null;
}

export function createUser({ email, password, key }) {
  const users = readAll();
  const exists = users.some((u) => u.email === email);
  if (exists) {
    return { ok: false, error: "Este e-mail já está cadastrado." };
  }

  const user = {
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    email,
    // placeholder (Task 3.4 vai virar hash+salt)
    password,
    key,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  writeAll(users);

  return { ok: true, user };
}

export function verifyCredentials({ email, password, key }) {
  const user = getUserByEmail(email);
  if (!user) return { ok: false, error: "Usuário não encontrado." };

  if (user.password !== password || user.key !== key) {
    return { ok: false, error: "Credenciais inválidas." };
  }

  return { ok: true, user };
}
