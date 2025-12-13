export function AppShell() {
  const shell = document.createElement('div');
  shell.className = 'app-shell';

  shell.innerHTML = `
    <main class="main">
      <h1 class="font-bold mb-sm">App ready</h1>
      <button id="theme-toggle" type="button">🌙 Dark Mode</button>
    </main>
  `;

  const toggleBtn = shell.querySelector('#theme-toggle');
  toggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
      html.removeAttribute('data-theme');
      toggleBtn.textContent = '🌙 Dark Mode';
    } else {
      html.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '☀️ Light Mode';
    }
  });

  return shell;
}
