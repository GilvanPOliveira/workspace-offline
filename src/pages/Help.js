export default function Help() {
  const div = document.createElement('div');
  div.innerHTML = `
    <section class="p-8">
      <h1 class="text-3xl font-bold text-primary">Ajuda</h1>
      <p>Workspace Offline — Central de ajuda</p>
      <nav class="mt-4 space-x-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
      </nav>
    </section>
  `;
  return div.firstElementChild;
}
