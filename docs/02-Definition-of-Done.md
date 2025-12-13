# Definition of Done (DoD)

Uma task só é considerada concluída quando:

## Qualidade técnica
- `npm run dev` e `npm run build` funcionam sem erros
- Sem erros/warnings relevantes no console do navegador
- Código com nomes claros e sem duplicação óbvia
- Sem “TODO” esquecido que bloqueie funcionalidade

## UX / UI
- Funciona no mobile e desktop (responsivo)
- Estados tratados: loading (quando aplicável), vazio, erro
- Feedback de ação: toast/alert/inline (quando aplicável)

## Acessibilidade
- Navegação por teclado (Tab/Shift+Tab/Enter/Esc) no fluxo principal
- `:focus-visible` com estilo perceptível
- Elementos interativos usam `button/a/input` corretamente

## Entrega e evidência
- Commit com mensagem no padrão (Conventional Commits)
- Instruções de teste manual (passo a passo) registradas no chat
- Se a task mexer com performance/SEO/A11y: anexar resultado Lighthouse
