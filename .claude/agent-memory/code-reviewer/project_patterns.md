---
name: Codebase patterns & conventions
description: Architecture rules, style conventions, and recurring bugs observed across review sessions of this expense tracker
type: project
---

## Architecture (confirmed from code review, 2026-04-19)

- No routing, no Context API, no external state library — enforced by CLAUDE.md
- `App` owns `transactions` array and `CATEGORIES` constant
- `TransactionForm` owns local form state (description, amount, type, category)
- `TransactionList` owns filter state (filterType, filterCategory)
- Amounts stored as numbers; parseFloat applied on submit in TransactionForm
- Component tree: App → Summary, SpendingChart, TransactionForm, TransactionList

## Style conventions observed

- Arrow functions preferred for event handlers (all components consistent)
- No TypeScript — plain JSX throughout
- No prop-types defined on any component
- CSS custom properties (CSS vars) used for all colors; defined in index.css :root
- CSS classes income-amount and expense-amount are intentionally shared between Summary cards and table rows (overridden for td context via `td.income-amount`)
- No memoization used anywhere (useMemo, useCallback, memo) — intentional given small data size
- Inline styles avoided; all styling via App.css and index.css

## Bugs / issues found in first review (2026-04-19)

- App.jsx line 24: seed data has "Freelance Work" marked type: "expense" but category: "salary" — data inconsistency, not a code bug
- App.jsx line 24: "Freelance Work" is labelled type: "expense" — likely should be "income"
- App.jsx handleAdd: uses spread `[...transactions, transaction]` instead of functional update `prev => [...prev, transaction]` — stale closure risk under concurrent features
- App.jsx handleDelete: same stale closure risk — uses `transactions` directly instead of functional updater
- Summary.jsx: amounts displayed with raw `$` + number interpolation — no toFixed(2), can produce values like "$5000.10000000001" for float arithmetic
- Summary.jsx: balance can go negative but always displays in gold color — no conditional styling for negative balance
- TransactionForm.jsx: amount input accepts negative numbers and zero — no validation guards; parseFloat("-5") is valid
- TransactionForm.jsx: description trimming not performed — whitespace-only strings pass the `!description` guard
- TransactionForm.jsx: category state defaults to "food" hardcoded — if CATEGORIES prop changes order or removes "food", default is silently wrong
- TransactionList.jsx: empty state (zero transactions after filtering) renders an empty table with no user feedback
- TransactionList.jsx: `window.confirm` used for delete confirmation — blocks main thread, not accessible, inconsistent with app's custom UI
- TransactionList.jsx: the empty `<th></th>` for the delete column has no accessible label
- SpendingChart.jsx: Cell key uses array index — acceptable here since data is derived/recomputed, not reordered by user
- SpendingChart.jsx: tooltip and axis font families hard-coded as inline style strings rather than CSS vars — diverges if fonts change
- SpendingChart.jsx: no aria-label on the chart container — screen readers get nothing
- App.css: `form` selector is global — will affect any future form added outside .add-transaction
- App.css: `table`, `thead`, `th`, `td`, `tr` selectors are all global — same scoping risk
