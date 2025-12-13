# Arquitetura (Vanilla SPA)

## Camadas
- `src/app/`: bootstrap, router, eventos globais
- `src/pages/`: telas (Home/Login/Dashboard/Settings)
- `src/ui/`: componentes e layouts (DOM puro)
- `src/store/`: estado global + actions (pub/sub)
- `src/data/`: IndexedDB, repos, backup/import/export
- `src/auth/`: sessão/JWT/crypto (WebCrypto)
- `src/lib/`: helpers (validate, dom, format, etc.)
- `src/styles/`: tokens/base/layout/utilities/components/pages

## Princípios
- Componentes retornam `HTMLElement` e expõem `destroy()` quando necessário.
- Re-render deve ser previsível e com cleanup de listeners.
- Repositories isolam persistência (UI nunca fala com IndexedDB direto).
- Router controla a página atual; páginas são funções `render(container, ctx)`.

## Rotas (hash)
- `#/` Home
- `#/login`
- `#/app` Dashboard
- `#/app/p/:id` Project Details
- `#/settings`
- `#/help`
- `#/404`

## Estado (store)
- `getState()`, `setState(partial)`, `subscribe(listener)`
- Actions: auth/login/logout, projects CRUD, tasks CRUD, settings.
