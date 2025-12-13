export default function NotFound() {
  const div = document.createElement('div');
  div.innerHTML = `
    <section class="p-8 text-center">
      <h1 class="text-4xl font-bold text-gray-500 mb-4">404</h1>
      <h2 class="text-2xl font-bold text-primary mb-4">Página não encontrada</h2>
      <p>Rota não existe no Workspace Offline</p>
      <a href="#/" class="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover">← Voltar ao Home</a>
    </section>
  `;
  return div.firstElementChild;
}
