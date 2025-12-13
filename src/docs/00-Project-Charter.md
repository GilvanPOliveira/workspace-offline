# Project Charter

Construir um workspace de produtividade **offline-first**, feito com **Vite + Vanilla JS**, com persistência local robusta e foco em: arquitetura limpa, performance, acessibilidade e SEO.

## Objetivo
Entregar uma aplicação web que permita ao usuário:
- Organizar projetos e tarefas (lista + kanban),
- Persistir tudo localmente (sem backend),
- Fazer login local (didático),
- Exportar/importar backup,
- Exportar relatórios (PDF/planilha),
com **alto padrão** de UX, acessibilidade e performance.

## Escopo
### Core
- SPA com **hash router**
- UI componentizada (DOM puro)
- Persistência com **IndexedDB**
- Login local (cadastro + sessão via JWT local, uso didático)
- CRUD de Projetos e Tarefas
- Kanban + reordenação e movimentação
- Backup/restore via arquivo (JSON versionado)
- Exportação:
  - CSV (mínimo)
  - XLSX (opcional avançado)
  - PDF por projeto (relatório)

### Qualidade e engenharia
- Código limpo e prático (módulos ES, separação por camadas)
- Acessibilidade (teclado, foco, semântica, aria onde necessário)
- Performance e UX consistentes (loading/empty/error states)
- SEO e boas práticas (head tags, estrutura semântica, títulos por rota)

## Público-alvo / uso
- Projeto de estudo e portfólio técnico.
- Uso prático pessoal com dados locais e backup manual.

## Critérios de sucesso
- O usuário consegue:
  - criar conta, logar e permanecer logado,
  - criar projetos e tarefas,
  - usar kanban,
  - exportar/importar backup e recuperar tudo após reload,
  - exportar CSV e PDF (XLSX se incluído),
  - navegar sem erros e com boa acessibilidade.
- `npm run build` sem erros
- Lighthouse (mobile) meta final: **100/100/100/100**
  - se algum item ficar 98/99, precisa justificativa técnica documentada.

## Regras do projeto
- Execução **task a task**, **commit a commit**
- Padrão de commits: Conventional Commits
- DoD e checklists ficam em:
  - [`docs/02-Definition-of-Done.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/02-Definition-of-Done.md)
  - [`docs/05-Checklist-Lighthouse.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/05-Checklist-Lighthouse.md)
- Roadmap e tasks em:
  - [`docs/01-Roadmap-Tasks.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/01-Roadmap-Tasks.md)
- Arquitetura em:
  - [`docs/04-Architecture.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/04-Architecture.md)

## Riscos e mitigação
- **Limitações de storage do navegador**: usar IndexedDB e evitar blobs gigantes sem necessidade.
- **“JWT local” não é segurança real**: deixar claro no README e usar WebCrypto para hash (didático).
- **SEO em SPA**: garantir boas metas e semântica; títulos e metas por rota; Lighthouse como métrica.
- **Complexidade do kanban/a11y**: implementar incrementalmente; testes manuais por teclado.

## Decisões técnicas (iniciais)
- Persistência: IndexedDB (principal) + localStorage só para prefs leves (se necessário)
- Router: hash routing
- Auth: WebCrypto (PBKDF2) para hash; JWT local para sessão (didático)
- Exportações:
  - CSV: próprio (sem dependência)
  - XLSX/PDF: avaliar bibliotecas leves na fase correspondente

## Como trabalhamos
- Cada task deve seguir o template de entrega descrito no Roadmap.
- Revisão do TL acontece a cada task concluída antes de avançar.
