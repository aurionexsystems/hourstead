# Hourstead 1.1 "First Furrow" — the product

> **1.1 (2026-07-10):** post-mortem fix — **auto-save to a real file on disk** (File System Access API, Chrome/Edge). Link a stead file in Settings and every change mirrors to it (debounced), surviving browser-data wipes; the link persists across restarts via IndexedDB, with a permission-resume flow. Other browsers get an honest fallback note pointing at Export. Verified: API detection, all three UI states, IndexedDB round-trip, save-path regression, and invoice math re-run green with zero console errors. *Not* machine-verifiable: the native file-picker dialog itself (requires a real user gesture) — the first manual click-through should confirm picker → file write.

**One file: [hourstead.html](hourstead.html).** Double-click it or serve it statically. No build step, no dependencies, no server, no account.

## What it does
- **Track** — live timer + manual entries, weekly hours / unbilled / paid stats.
- **Clients** — hourly rate per client, archive/restore, lifetime hours.
- **Invoices** — one click turns a client's unbilled time into a numbered invoice (auto-numbered, 14-day due date, tax from settings). Print / save PDF via the browser; a print stylesheet isolates the invoice document. Draft → sent → paid workflow. Deleting an invoice returns its entries to unbilled.
- **Stead file** — export/import the entire business as `mybusiness.stead.json` (open JSON; the schema is the file). This is the backup, the sync mechanism, and the exit door.

## Free tier & license
- Free: everything, capped at 3 active clients, small "Made with Hourstead" footer on invoices.
- Founding License ($79 once): key format `HS1-XXXX-XXXX-XXNN` where NN = (sum of char codes of the 10 body characters) mod 97. Validation is client-side by design — the honor-system license fits the brand (and pirates were never going to be customers). Demo key that validates: `HS1-FIRS-TFUR-RO14`.

## Verification performed (2026-07-10)
Scripted end-to-end run in Chromium via local server: 3-client cap enforced (4th add blocked) · 3.5h @ $120 → $420 unbilled · invoice HS-0001 subtotal $420 / 10% tax $42 / total $462 · entries flip to billed · footer present when unlicensed, gone after valid key · timer start/stop logs an entry · export JSON round-trips. Zero console warnings/errors.

## Cut from 1.0 (logged, deliberate)
Projects (entry descriptions cover it), multi-currency per client, recurring invoices, expenses, team sync (breaks the no-server promise).
