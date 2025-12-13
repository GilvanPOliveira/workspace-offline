export function AppShell() {
  const test = document.createElement('div');

  test.innerHTML = 
  `
  <div>
    <h1>Projeto criado</h1>
    <h2>Estrutura criada</h2>
    <h3>Testado</h3>
    <p>Aplicação Funcionando</p>
  </div>
  `
  return test;
}