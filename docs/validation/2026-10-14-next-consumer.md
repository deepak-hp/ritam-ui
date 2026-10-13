# Next.js consumer validation — 2026-10-14

## Scope

This is internal integration evidence for the reviewed Serein beta archive. It is not external reviewer adoption, independent human feedback, or an accessibility-conformance claim.

The fixture is `trial/integration/next/`. It installs `@serein-ui/react` from a real npm archive under ignored `vendor/`; there is no source alias. The tested archive was `serein-ui-react-0.1.0-beta.1.tgz`, reviewed against source commit `d8f8c54`, with SHA-256 `e7fefb1a74be80df55384ca446db9995359d7d2ae560676bf94d5c23f53cc470`.

## Version selection and environment

The run used Windows, Node `24.19.0`, and npm `10.8.1`. The application pins:

- Next.js `16.4.0`
- React and React DOM `19.3.0`
- TypeScript `6.0.3`
- `@serein-ui/react` `0.1.0-beta.1`
- Playwright `1.63.0` and Chromium `153.0.8010.12` from the parent trial workspace
- axe-core `4.13.0` from the parent trial workspace

Next.js `16.4.0` and React `19.3.0` were the `latest` registry versions when checked on 2026-10-14. The official [Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation) requires Node 20.9 or newer and documents App Router's React version handling; the [Next.js 16.4 announcement](https://nextjs.org/blog/next-16-4) describes its React 19.3 support. The exact package versions were checked against the npm registry metadata for [Next.js](https://registry.npmjs.org/next/latest) and [React](https://registry.npmjs.org/react/latest), then pinned rather than left on a moving `latest` range.

## Reproduction

First install the parent trial workspace, which owns Playwright, axe-core, and the browser binaries. Then prepare either the current source or the frozen reviewed archive.

```powershell
$node = 'C:\Users\deepa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$npm = 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js'
$env:Path = "$(Split-Path $node);$env:Path"

Set-Location trial
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.playwright'
& $node $npm ci --ignore-scripts
& $node $npm exec -- playwright install chromium
Set-Location integration\next

# Fresh current-source consumer:
& $node $npm run setup
& $node $npm ci --ignore-scripts

# Or the exact recorded archive (path is optional when the reviewed artifact exists):
& $node $npm run setup -- --frozen ..\..\.review\beta-review-86926d4\serein-ui-react-0.1.0-beta.1.tgz
& $node $npm ci --ignore-scripts

& $node $npm run build
& $node scripts\verify.mjs
```

`setup` builds and packs current source by default, writes source/archive provenance to ignored `vendor/provenance.json`, and updates only `packages["node_modules/@serein-ui/react"].integrity` in the fixture lockfile. `--frozen` verifies the expected SHA-256 before copying the archive and restores the tracked lock integrity.

Two consecutive current-source pack checks produced different archive SHA-256 values (`eb57996de070f6f16a3c6a5d63dc13e1ee701d4d2c1364c255e270c3c6687a5e` and `8a4fa179021f47d49d4edd5b0ad858a556980165960d590dbb6935eb073a59be`). Therefore the lockfile cannot carry one permanent integrity for arbitrary current-source repacks. Synchronizing that one field before `npm ci` makes the clean install explicit and reproducible for the archive prepared in that run; the ignored provenance file records which archive was actually used.

The verifier defaults to `127.0.0.1:4319`, accepts another port as its first argument, and terminates only the production server process that it starts. Port `5174` is never used.

## Results

The frozen-archive path completed a clean `npm ci --ignore-scripts`: 50 packages installed, 51 audited, and 0 vulnerabilities reported. `next build` completed with Next.js `16.4.0`; `/` was prerendered as static content and `/api/save` was emitted as a dynamic route handler.

The production-server verifier passed these checks:

- the initial HTTP response contained the server-rendered App Router shell, form label, and Serein heading before browser hydration;
- emitted CSS returned HTTP 200 and included Serein's `.dp-theme` base rule and `--dp-orange` token;
- the package under `node_modules/@serein-ui/react` was a real installed directory with version `0.1.0-beta.1`;
- Chromium reported no page errors, hydration errors, or unexpected console errors;
- the local route rejected an unsupported team without consuming the first valid-save failure;
- an empty keyboard submit focused the required text field, showed its associated error, and editing the value cleared that error;
- Select and Switch changes worked from the keyboard;
- the first valid save returned the intentional 503; the text, Select value, and Switch state remained intact;
- pending disabled the text field, Select, Switch, and submit button; repeated Enter, a forced click, and a synthetic duplicate submit still resulted in exactly one first-attempt request;
- keyboard retry succeeded on attempt 2 and retained the entered value;
- light and dark document themes produced their expected canvas colors;
- the 320 × 812 viewport had no horizontal overflow; and
- axe-core reported zero violations for the `wcag2a`, `wcag2aa`, `wcag21aa`, and `wcag22aa` rule tags in both themes.

No Serein package or public API defect was found. The simulated route stores no data and exists only to exercise failure recovery. Native NVDA/Firefox, VoiceOver/Safari, browser zoom, other browsers, and external consuming-application feedback remain outside this automated fixture.
