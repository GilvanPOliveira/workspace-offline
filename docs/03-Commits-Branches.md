# Git Workflow (enxuto)

## Branch
- Branch principal: `main`
- Trabalhar direto na `main` é permitido (projeto solo), mas commits devem ser pequenos.

## Conventional Commits
Use:
- `chore:` infra / configs / limpeza
- `docs:` documentação
- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` refatoração sem mudar comportamento
- `test:` testes
- `perf:` performance

Exemplos:
- `feat: add hash router with 404`
- `chore: scaffold app structure`
- `docs: add roadmap and dod`
- `fix: prevent duplicate task ids on import`

## Tamanho do commit
- Preferir 1 task = 1 commit.
- Se necessário, no máximo 2–3 commits por task (ex.: “scaffold”, “implement”, “polish”).
