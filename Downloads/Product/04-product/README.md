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

## Verify

```bash
python3 04-product/test_eavefile.py
```

Assertions: license math, free-tier caps, deadline arithmetic, CA 75 / FL 120 / TX 60 cards, letter merge fields, packet contents, export round-trip, watermark present then gone after unlock.
