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

Single-page React app (Vite + React 19). No routing, no context, no external state library.

**Component tree:**
```
App
├── Summary          — computes and displays totals (income, expenses, balance)
├── TransactionForm  — owns form state, calls onAdd(transaction) on submit
└── TransactionList  — owns filter state, renders filtered transactions table
```

**State ownership:**
- `App` — `transactions` array (single source of truth), `CATEGORIES` constant
- `TransactionForm` — `description`, `amount`, `type`, `category` (local form state)
- `TransactionList` — `filterType`, `filterCategory` (local filter state)

**Data flow:**
- `App` passes `transactions` and `categories` down to all three children
- `TransactionForm` receives `onAdd` callback; `App` appends the new transaction to state
- Amounts are always stored as numbers; `TransactionForm` applies `parseFloat` on submit

Styles are in `src/App.css` (component) and `src/index.css` (global/reset). CSS classes `income-amount` and `expense-amount` are shared between summary cards and table rows.
