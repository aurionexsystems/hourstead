# Manila — the product

A local medical-bill file. Open `manila.html` in a browser. There is no server.

## Try it
1. Open [manila.html](manila.html) (needs `engine.js` beside it), or serve this folder.
2. Click **Load SAMPLE**.
3. Read **The match**. Open **Letters** → itemized request.
4. Demo Founding File key: `MNL-DEM0-F1LE-NV` (computed by `engine.js`; I/O normalized).

```bash
python3 -m http.server 8765 --directory Downloads/Product/05-website
```

Then: http://localhost:8765 and http://localhost:8765/app/manila.html

## Tests

```bash
node Downloads/Product/04-product/test.js
```

15 assertions. FPL figures are the 2026 HHS numbers from FR Doc. 2026-00755. License checksum and letter disclaimer are checked.

## What 1.0 does
- Cover sheet (provider, insurer, collector, amounts, household)
- Bill lines + EOB lines
- Match + flags (bill > EOB, paid-still-collected, duplicate codes, unmatched lines, NSA screen, GFE $400, FAP/FPL, FDCPA 30-day clock, under-$500 bureau note)
- 2026 FPL charity screen (contiguous / AK / HI)
- Eight letter templates; free tier = itemized request only
- Call/mail log
- Save/open `.manila` JSON; print; localStorage

## What 1.0 does not
OCR, AMA CPT codebook, live hospital price files, 50-state statute engine, e-file to CFPB/CMS, payment checkout, server-side license check. See build log D-012.

## Honor-system license
`checkLicense` is readable in `engine.js`. That is intentional. See `07-proof/PROOF.md`.
