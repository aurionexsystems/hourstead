# Eavefile 1.0 — the product

**One file: [eavefile.html](eavefile.html).** Double-click it or serve it statically. No build step, no dependencies, no server, no account.

## What it does

- **Case file** — property, carrier, policy, notice date, coverage-end clock.
- **State cards** — CA / FL / TX / CT from statutes and department pages we fetched; GA / IN / LA / MD from NerdWallet’s reporting (labeled). Complaint links are only URLs we retrieved (plus the NAIC state directory).
- **Walk the lot** — free checklist of aerial red flags copied from NerdWallet + Connecticut CID.
- **Evidence locker** — typed exhibits (label + date + filename + note). Bytes stay on the user’s disk.
- **Three letters** — demand images/reason; appeal with exhibits; DOI complaint. Editable. Print/PDF via the browser.
- **Packet** — one printable document of the above.
- **`.eave.json` export/import** — the file is the backup.

## Free tier & license

- Free: 1 case, 5 exhibits, watermark on letters/packet. Walk the lot unlimited.
- Founding License ($49 once): key format `EF1-XXXX-XXXX-XXNN` where `NN = (sum of char codes of the 10 body characters) mod 97`. Client-side on purpose. Demo key: **`EF1-SHOW-THEM-GR00`**.

## What we cut (deliberate)

- In-app photo storage / OCR of the notice (needs a model or a paid API).
- Live checkout.
- File System Access auto-save (Hourstead 1.1). Export is the 1.0 exit door; auto-save is the first 1.1 if anyone uses this for real.
- A 50-state statute table. If we didn’t fetch it, it is not in the app.
- Any “we will email the carrier for you.” That would be publishing + unauthorized practice.

## Verify (2026-08-20)

```bash
python3 04-product/test_eavefile.py
```

Chromium (system Chrome) via Playwright. All assertions green, zero `pageerror`:

- static: demo key, brand, fetched URLs present, invented FL complaint URL absent
- license math: `EF1-SHOW-THEM-GR00` valid; bad checksum and Hourstead key rejected
- deadline arithmetic: 75 / 120 day spans
- free tier: 2nd case blocked; 6th exhibit blocked
- letters: address, policy, carrier, alleged condition, CA source merge into request + packet
- unlock: second case allowed; `[draft / free tier]` mark removed
- export JSON `version: 1` with both cases
