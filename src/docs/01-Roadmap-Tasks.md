# Roadmap e Backlog — Workspace Offline

Este projeto é executado **task a task**, **commit a commit**, seguindo o modelo:
- Cada task tem entregáveis, critérios de aceite e DoD.
- Nada de “pular etapas”.
- Código só cresce quando a base estiver estável.

## Fase 1 — Fundação (DX, padrões, SEO base)
### Task 1.1 — Bootstrap do projeto + estrutura de pastas
**Entregáveis**
- Vite vanilla criado
- Pastas: `src/app`, `src/pages`, `src/ui`, `src/data`, `src/auth`, `src/store`, `src/styles`, `src/lib`
- `main.js` renderizando `AppShell` placeholder

**Aceite**
- `npm run dev` ok
- Home renderiza “App ready”
- Sem erros no console

**Commit**
- `chore: bootstrap vite app structure`

<br>

---

### Task 1.2 — Base de CSS avançado (tokens + reset + layout)
**Entregáveis**
- `styles/tokens.css` (cores, spacing, radius, shadow)
- `styles/base.css` (reset, tipografia, `:focus-visible`, `prefers-reduced-motion`)
- `styles/layout.css` (grid do app shell)
- `styles/utilities.css` (helpers)

**Aceite**
- Layout responsivo básico
- Foco visível e contraste OK

**Commit**
- `feat: add design tokens and base css`

<br>

---

### Task 1.3 — SEO e metas essenciais (Lighthouse)
**Entregáveis**
- `index.html` com: title, description, canonical placeholder, OG/Twitter, favicon, theme-color
- Semântica base (`header`, `nav`, `main`)

**Aceite**
- Lighthouse SEO ≥ 95 (base)

**Commit**
- `feat: add seo meta and semantic shell`

## Fase 2 — Router + Navegação + Shell de UI
### Task 2.1 — Router (hash) com 404 e titles
**Entregáveis**
- `app/router.js` com rotas:
  - `#/` Home
  - `#/login`
  - `#/app` Dashboard
  - `#/settings`
  - `#/help`
  - `#/404`
- `document.title` por rota

**Aceite**
- Navegação sem reload
- Voltar/avançar funciona

**Commit**
- `feat: implement hash router with 404`

<br>

---

### Task 2.2 — AppShell (header + sidebar + main) + navegação
**Entregáveis**
- Sidebar com links + estado ativo
- Header com nome do app + actions

**Aceite**
- Responsivo (sidebar colapsa no mobile)

**Commit**
- `feat: add app shell layout and navigation`

## Fase 3 — Autenticação local (didática)
### Task 3.1 — Validação (email/senha/chave)
**Entregáveis**
- `lib/validate.js`
- UX de erros amigável

**Aceite**
- Form não envia inválido

**Commit**
- `feat: add validation helpers for auth`

<br>

---

### Task 3.2 — JWT local + sessão
**Entregáveis**
- `auth/jwt.js` (criar/verificar token local)
- `auth/session.js` (get/set/clear)

**Aceite**
- Login gera token e protege rota `/app`

**Commit**
- `feat: implement local jwt session`

### Task 3.3 — Tela Login/Registro + rotas protegidas
**Entregáveis**
- `pages/Login.js` com entrar/criar conta
- Guard de rota

**Aceite**
- Cria usuário → loga → vai pro dashboard → refresh mantém sessão

**Commit**
- `feat: add login register page and route guard`

<br>

---

### Task 3.4 — WebCrypto (PBKDF2) + users repo
**Entregáveis**
- `auth/crypto.js` (hash+salt, verify)
- `data/usersRepo.js`

**Aceite**
- Senha nunca salva em texto puro

**Commit**
- `feat: store users with salted hash using webcrypto`

## Fase 4 — IndexedDB (camada de dados)
### Task 4.1 — Wrapper + schema v1
**Entregáveis**
- `data/db.js` (open, upgrade, tx)
- Stores: users, workspace (por userId), projects, tasks, settings

**Aceite**
- CRUD simples via repos

**Commit**
- `feat: add indexeddb wrapper and schema v1`

<br>

---

### Task 4.2 — Repositories (projects/tasks/settings)
**Entregáveis**
- `data/projectsRepo.js`, `data/tasksRepo.js`, `data/settingsRepo.js`

**Aceite**
- Script/test básico provando CRUD

**Commit**
- `feat: implement repositories for core entities`

## Fase 5 — Workspace MVP
### Task 5.1 — Dashboard: projetos CRUD
**Entregáveis**
- `pages/Dashboard.js`
- Componentes: `ProjectCard`, `EmptyState`, `Modal`

**Aceite**
- Criar/editar/deletar projeto
- Persistência por usuário

**Commit**
- `feat: dashboard projects CRUD`

<br>

---

### Task 5.2 — Projeto: tarefas CRUD + filtros
**Entregáveis**
- `#/app/p/:id`
- Tarefa: título, descrição, status, prioridade, tags, dueDate

**Aceite**
- Busca + filtros básicos

**Commit**
- `feat: tasks CRUD with search and filters`

## Fase 6 — Kanban + A11y
### Task 6.1 — Kanban básico
**Entregáveis**
- Colunas default
- Render de cards

**Aceite**
- Reordenação dentro da coluna

**Commit**
- `feat: add kanban board view`

<br>

---

### Task 6.2 — Drag/drop + teclado
**Entregáveis**
- Drag/drop com feedback
- Alternativa por teclado

**Aceite**
- Usável sem mouse

**Commit**
- `feat: implement accessible dnd for kanban`

## Fase 7 — Backup/Restore
### Task 7.1 — Export JSON
**Entregáveis**
- `data/backup.js` export por `userId` + `meta.version` + `exportedAt`

**Aceite**
- Download correto

**Commit**
- `feat: add workspace export to json`

<br>

---

### Task 7.2 — Import JSON (merge/replace) + validação
**Entregáveis**
- Import com opções merge/replace
- Valida schema/version

**Aceite**
- Import restaura e reload mantém via IndexedDB

**Commit**
- `feat: add workspace import with merge/replace`

## Fase 8 — Exportações
### Task 8.1 — Export CSV
**Commit** `feat: export tasks to csv`

### Task 8.2 — Export XLSX (opcional)
**Commit** `feat: export workspace to xlsx`

### Task 8.3 — Export PDF
**Commit** `feat: export project report to pdf`

## Fase 9 — Hardening final
### Task 9.1 — Lighthouse 100
**Commit** `perf: optimize lighthouse metrics`

### Task 9.2 — A11y hardening
**Commit** `feat: accessibility improvements`

### Task 9.3 — PWA (opcional)
**Commit** `feat: add pwa offline cache`
