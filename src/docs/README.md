# Documentação

Workspace de produtividade **offline-first** para estudo avançado com **Vite + Vanilla JS**, focado em arquitetura limpa, UX/UI, performance e **Lighthouse 100**.

## Objetivo do projeto
- Persistir dados localmente com **IndexedDB**
- Autenticação **local (didática)**: cadastro + sessão via **JWT local**
- CRUD de Projetos e Tarefas (lista + kanban)
- Backup/restore via arquivo (JSON versionado)
- Exportação: **CSV** (mínimo), **PDF** (relatório), **XLSX** (opcional avançado)
- UI/UX avançado, acessibilidade e boas práticas

> Sem backend. Sem login social. Projeto voltado para aprendizado e portfólio.

## Regras principais
- Executar uma task por vez (sem pular etapas)
- Cada task tem entregáveis + critérios de aceite + Definition of Done
- Commits pequenos seguindo Conventional Commits
- Sempre manter o projeto rodando e sem erros no console

## Documentação oficial
Toda a documentação do projeto está em /docs:

[`docs/00-Project-Charter.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/00-Project-Charter.md) — Visão, escopo, critérios de sucesso e decisões

[`docs/01-Roadmap-Tasks.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/01-Roadmap-Tasks.md) — Backlog e roteiro de execução (tasks)

[`docs/02-Definition-of-Done.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/02-Definition-of-Done.md) — Definition of Done (DoD) para aceitar uma task

[`docs/03-Commits-Branches.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/03-Commits-Branches.md) — Regras de Git/commits

[`docs/04-Architecture.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/04-Architecture.md) — Arquitetura e organização do código

[`docs/05-Checklist-Lighthouse.md`](https://github.com/GilvanPOliveira/workspace-offline/docs/05-Checklist-Lighthouse.md) — Checklist para performance/SEO/A11y (meta 100/100/100/100)

## Template obrigatório para novas tarefas

Sempre iniciar um chat com:

```
[WorkspaceOffline]
Task atual: X.Y — <título>
Status: (feito / em andamento / bloqueado)

Entregáveis esperados (do /docs/01-Roadmap-Tasks.md):
- ...

O que eu já fiz:
- ...

O que eu preciso do TL agora:
- Revisão + critérios de aceite
- Próximos passos (sem código extra fora do escopo)
```

## Metas de qualidade
- Sem erros/warnings relevantes no console
- Acessível por teclado (Tab/Enter/Esc) no fluxo principal
- npm run build sem erros
- Lighthouse (mobile) meta final: 100/100/100/100
- Se ficar 98/99, documentar justificativa técnica