export default function Settings() {
  const div = document.createElement('div');
  div.innerHTML = `
    <section class="p-8">
      <h1 class="text-3xl font-bold text-primary">Configurações</h1>
      <p>Workspace Offline — Configurações da aplicação</p>
      <nav class="mt-4 space-x-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
        <a href="#/help" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Help</a>
      </nav>
    </section>
  `;
  return div.firstElementChild;
}
