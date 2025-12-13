export default function Login() {
  const div = document.createElement('div');
  div.innerHTML = `
    <section class="p-8">
      <h1 class="text-3xl font-bold text-primary">Login</h1>
      <p>Workspace Offline — Tela de login</p>
      <nav class="mt-4 space-x-2">
        <a href="#/" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">Home</a>
        <a href="#/app" class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">App</a>
      </nav>
    </section>
  `;
  return div.firstElementChild;
}
