# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # ESLint (js/jsx files)
```

No test runner is configured.

## Architecture

Single-page React app (Vite + React 19). All application logic lives in `src/App.jsx` — there is no routing, no context, no external state library.

**State** is managed with `useState` entirely in `App`:
- `transactions` — array of `{ id, description, amount, type, category, date }`
- Form fields: `description`, `amount`, `type`, `category`
- Filter fields: `filterType`, `filterCategory`

**Known bugs in the starter code:**
- `amount` is stored as a string; `totalIncome`/`totalExpenses` use `+` on strings instead of `parseFloat`, so sums are wrong.
- "Freelance Work" is typed `"expense"` but categorized `"salary"` — likely a data bug.

Styles are in `src/App.css` (component) and `src/index.css` (global/reset). CSS classes `income-amount` and `expense-amount` are shared between summary cards and table rows.

Categories are a hardcoded array in `App`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.
