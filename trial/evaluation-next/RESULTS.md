# File-review AI comparison — 14 October 2026

All four fresh candidates passed TypeScript and Vite on their initial attempt, stayed within the 450-line App/CSS limit, and had identical initial/final source hashes. No compiler corrections or post-measurement candidate repairs occurred. All used the requested `gpt-5.6-sol` alias with medium reasoning. These are automated observations from one task, not independent human design scores.

The preserved primary verifier reported 10/12 interaction passes and 10/16 render passes. Its two interaction failures both occurred in c18a4d2 because the verifier looked for resting button names during a pending state that changed those names. The disabled controls were present. Read [AMENDMENTS.md](AMENDMENTS.md); these primary failures must not be counted as demonstrated application failures.

A separately archived supplemental verifier retained the same button elements before activation and checked their connected, disabled state through the pending-name transition. An independent mechanics fixture tested the correction before candidate measurement. The supplement ran exactly once on every unchanged candidate: 12/12 interaction scenarios passed, and render outcomes remained 10/16. The correction was made after viewing primary failures, so supplemental results are exploratory confirmation, not replacement preregistered endpoints.

| Condition | Initial/final builds | Primary interactions | Supplemental interactions | Primary and supplemental renders |
| --- | --- | --- | --- | --- |
| Plain React/CSS | 2/2 | 4/6 | 6/6 | 2/8 |
| Serein + current guidance | 2/2 | 6/6 | 6/6 | 8/8 |
| All attempts | 4/4 | 10/12 | 12/12 | 10/16 |

The interaction scenarios cover eligibility/bulk selection, whitespace reason validation/focus, rejected-batch failure/retention/retry, and keyboard approval/failure/retry. Pending decision controls and repeated Enter activation are checked. Render scenarios cover initial 1280px/320px light/dark screens with required landmarks, runtime errors, document overflow, screenshots and axe WCAG 2 A/AA, 2.1 AA and 2.2 AA tags. These are partial tests, not accessibility conformance.

All sixteen render records report no document overflow and no captured runtime errors. The six failed render scenarios report `color-contrast`: c18a4d2 in light mode at both widths (orange small text and an approved status), and c85d1e6 at all four combinations (orange small text in light; approved status in dark). Raw axe records retain affected elements and measured ratios; no candidate styling was changed. c39e7b1 and c62f9a3 passed all four initial render checks. Do not turn these counts into a quality winner or a general performance claim.

## Provenance and replay

Inputs froze at `2026-10-13T18:59:53.120Z` with fingerprint SHA-256 `d8fe48e656fc339c991e8fb4ccf88319be3b33aaf34d4b4f3bbf4e2a7576dee2`. The preserved primary verifier hash is `85406c7497cb28e2905de1a5179f513de82b295a35727574867ba39f2fe9082c`. The supplemental protocol was archived before measurement at `2026-10-13T19:06:02.134Z`; verifier hash `1e129bf088baa274827e69512e70a67de523826a278efb85b0ef3874b3e93452`, helper hash `bacc8847f538ecd7466f94a7fc330914d80e2b7b81cbcf2fbbd27ff8486a93f8`.

Every supplemental record links its timestamp and script/helper hashes to the original primary report, final compiler report, frozen fingerprint and exact App/CSS/prompt hashes. `evidence-supplemental/summary.json` preserves per-candidate comparisons and contrast diagnostics; `evidence/` remains the primary record. All four primary hashes still match the pre-supplement protocol, and all candidate source hashes still match their compiler records. Coordinator start/end timestamps reflect dispatch/final-receipt recording, not authoritative per-token runtime.

Measurement used Node 24.19.0, TypeScript 6.0.3, Vite 8.3.0, React/React DOM 19.3.0, Playwright 1.63.0 and axe-core 4.13.0. The [README](README.md) documents Node 24, lockfile installation and `replay-build.mjs` for a clean-clone review packet. Replay verifies all 48 frozen hashes and final candidate hashes, then rebuilds only ignored assets; it does not rerun or overwrite historical measurements. All four builds were successfully replayed locally. Independent human observations remain blank in `review/observations.csv`.

## Limits

This new file-review task is outside supplied invoice/settings/onboarding recipes, but is not a guaranteed unseen holdout. It has one task, two repeats per condition, one requested model alias, common workspace access with instructed rather than technical isolation, and unequal documentation exposure. It measures the combined Serein package/guidance treatment. Condition labels are hidden in the review page, but appearance can reveal a condition and order is fixed by opaque ID. Mixed-selection semantics, visible updated per-file status wording, complete rejection keyboard operation, native assistive technology and independent human design judgment remain outside this automated result. Separate agent visual observations must be labeled as such and cannot fill the human score sheet.
