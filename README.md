# Finance Dashboard UI

Modern, responsive finance dashboard built with React, TypeScript, Vite and Tailwind CSS — optimized for clarity and quick insights.

Live demo: https://fin-dash-ui.netlify.app

Quick links
- Source: https://github.com/atharvachavhan/Finance_dashboard_UI
- Production: https://fin-dash-ui.netlify.app

Why this project
- Clean visual hierarchy for balance, income, expenses and insights
- Lightweight, component-driven UI for rapid iteration
- Local-first: state persisted to localStorage for quick demos without a backend

Highlights
- Summary cards, balance timeline, category breakdown and transaction list
- Filters: date range, category, type and search
- Role switcher: Viewer (read-only) / Admin (add/edit/delete)
- Dark mode, responsive layout and export (CSV/JSON)

Getting started
1. Clone
   git clone https://github.com/atharvachavhan/Finance_dashboard_UI.git
2. Install
   npm install
3. Dev server
   npm run dev
4. Build
   npm run build
5. Preview production build
   npm run preview

Build notes
- Vite outputs to `dist/`. The project is configured for Netlify (see `netlify.toml`).
- Large bundle warning: consider code-splitting chart code or using dynamic imports.

Project structure (important folders)
- `src/components` — UI primitives + dashboard and transactions
- `src/context` — global state (Context + reducer)
- `src/data` — mock data and categories
- `src/utils` — formatters, export helpers

Deploy
- Deployed to Netlify: https://fin-dash-ui.netlify.app
- To redeploy from local: build (`npm run build`) then use Netlify CLI or push to GitHub and let Netlify build from `main`.

Customization
- Change colors in `tailwind.config.js`
- Add categories in `src/data/mockData.ts`
- Toggle persistence or replace localStorage with an API in `src/context/AppContext.tsx`

Contributing
- Open an issue or PR against `main`.
- Keep changes focused and document UI/UX adjustments.

License
MIT

Credits
Built with React, TypeScript, Vite, Tailwind CSS, Recharts and Lucide icons.
