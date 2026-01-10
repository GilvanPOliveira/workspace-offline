import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/utilities.css";

function showBootError(err) {
  const root = document.querySelector("#app");
  if (!root) return;

  root.innerHTML = `
    <section style="padding:24px;max-width:900px;margin:0 auto;">
      <h1 style="font-size:28px;font-weight:800;margin:0 0 8px;">Erro ao iniciar</h1>
      <p style="opacity:.8;margin:0 0 16px;">
        O app quebrou antes de montar o layout. Veja o erro abaixo (ou abra o Console/F12).
      </p>
      <pre style="border:1px solid rgba(255,255,255,.2);padding:12px;border-radius:8px;overflow:auto;white-space:pre-wrap;">${String(
        err?.stack || err
      )}</pre>
    </section>
  `;
}

window.addEventListener("error", (e) => showBootError(e.error || e.message));
window.addEventListener("unhandledrejection", (e) => showBootError(e.reason));

(async () => {
  try {
    const root = document.querySelector("#app");
    if (!root) throw new Error("index.html precisa ter <div id='app'></div>");

    // IMPORTANTE: aqui eu uso os imports do jeito que você tinha (sem .js),
    // porque esse formato já estava funcionando no seu projeto.
    const [{ AppShell }, { initRouter }] = await Promise.all([
      import("./ui/layouts/AppShell"),
      import("./app/router"),
    ]);

    root.innerHTML = "";
    root.appendChild(AppShell());

    initRouter();
  } catch (err) {
    console.error("[boot] erro:", err);
    showBootError(err);
  }
})();
