# Finance Dashboard

<!-- Hero + buttons -->
<p align="center">
  <img src="./public/hero.png" alt="Finance Dashboard" width="720" style="border-radius:12px" />
</p>

<p align="center">
  <a href="https://fin-dash-ui.netlify.app" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=netlify" alt="Live demo" />
  </a>
  <a href="https://github.com/atharvachavhan/Finance_dashboard_UI" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Source-GitHub-181717?style=for-the-badge&logo=github" alt="Source" />
  </a>
  <a href="https://github.com/atharvachavhan/Finance_dashboard_UI/issues" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Report%20Issue-Issues-red?style=for-the-badge&logo=github" alt="Issues" />
  </a>
  <a href="https://github.com/atharvachavhan/Finance_dashboard_UI/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </a>
</p>

---

A modern, responsive finance dashboard built with React, TypeScript, Vite and Tailwind — focused on clarity and fast insights.

Why you'll like it
- Clean visual hierarchy for balance, income, expenses and insights
- Local-first demo: works without a backend (data persisted to localStorage)
- Lightweight components designed for quick customization and reuse

Key features
- Summary cards, balance timeline, category breakdown and transaction list
- Filters: date range, category, type and search
- Role switcher: Viewer (read-only) / Admin (add/edit/delete)
- Dark mode, responsive layout and export (CSV / JSON)

Quick start

1. Clone
```bash
git clone https://github.com/atharvachavhan/Finance_dashboard_UI.git
cd Finance_dashboard_UI
```

2. Install
```bash
npm install
```

3. Run dev server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

Deploy
- The app is configured for Netlify. Production demo: https://fin-dash-ui.netlify.app
- To deploy from local: build and use Netlify CLI or push to GitHub and let Netlify build from `main`.

Project structure (high level)
```
src/
├─ components/   # UI primitives + dashboard and transaction screens
├─ context/      # Application state (Context + reducer)
├─ data/         # Mock data used for the demo
├─ utils/        # Helpers (format, export)
```

Tech stack
- React + TypeScript
- Vite
- Tailwind CSS
- Recharts (charts)
- Lucide (icons)

Contributing
- Open issues or PRs on GitHub. Keep changes focused and include screenshots for UI updates.

License
MIT

---

Built with ❤️ — happy hacking.
