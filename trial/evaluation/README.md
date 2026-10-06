# Whole-library AI comparison

This is a separate, in-domain pilot: 3 briefs × 2 conditions × 2 independent repeats. All three briefs overlap Ritam's canonical recipes. It measures the combination of Ritam components and guidance against a credible plain React/CSS implementation, not the isolated effect of a library or general AI quality.

`private-key.json` maps opaque candidate IDs to conditions. Each run preserves its exact prompt, manifest, raw generated App/CSS/notes and initial source. Generators use fresh conversations, `gpt-5.6-sol`, medium effort, one initial attempt and one correction pass. Prompts specify a 450-line limit; elapsed time is observed, not enforced. No token budget is claimed.

The package/guidance snapshot was frozen once after the package worker completed its build. `materials/fingerprint.json` records SHA-256 hashes. Do not run `prepare.mjs` again or modify frozen materials/shared inputs after generation starts. The local package snapshot is not evidence of independently installing a published package.

This directory disables Git text normalization to preserve the exact archived input/output bytes and their SHA-256 values across checkouts. `results/observations.json` retains initial/final compiler diagnostics and raw primary browser outcomes; read `AMENDMENTS.md` before interpreting them. The original verifier is preserved as `results/primary-verifier.mjs` for archival comparison, not as an alternate executable entry point.

From `trial`:

```
node evaluation/scripts/check.mjs CANDIDATE_ID
node evaluation/scripts/browser.mjs CANDIDATE_ID
node evaluation/scripts/browser-confirmation.mjs CANDIDATE_ID
node evaluation/scripts/collect.mjs
node evaluation/scripts/review.mjs
node evaluation/scripts/server.mjs 5187
node --test evaluation/scripts/service.test.mjs
node evaluation/scripts/smoke.mjs
```

Open http://127.0.0.1:5187 for the review packet. It serves only build outputs, not prompts/manifests/condition keys. Each candidate has its own document so library CSS cannot affect the plain condition. Review labels hide the conditions, but visual appearance may reveal them. The candidate order is fixed by opaque ID; this is a sequential independent review page, not randomized pair presentation.

Missing/failed candidates remain visible as unavailable. `check.mjs` records TypeScript and Vite outcomes independently and hashes final source. `browser.mjs` records build/type failures as blocked browser checks. Automated outcomes and screenshots are ignored build evidence; preserve them outside Git for the experiment report. Do not silently fix generated candidates; any host repairs must be separate, documented artifacts excluded from primary comparison.

## Predeclared automated checks

- Invoices: initial record count/totals, combined case-insensitive filter, empty recovery, correct selected email/service ID, first failure/retry success, focus return, no paid reminder.
- Settings: defaults, empty/overlong validation, focus, reset original defaults, full saved payload, failure/retry and retained values, reset to last saved values.
- Onboarding: validation focus, back preserves choices, review content, first failure/retry with exact payload, restart defaults.
- Initial desktop/narrow light/dark renders: console errors, overflow, keyboard entry, screenshots and separate axe violation reports.

These are a partial behavioral check, not exhaustive validation of all requirements. Pending protection, step-transition focus, full manual keyboard flow and all state/theme combinations additionally require human review. Selector failures are measured test failures requiring examination; they are not proof that a user cannot operate the screen. All semantic queries use accessible roles/labels, not CSS implementation classes.

## Human review remains pending

Use `review/rubric.md` and `review/observations.csv`. Humans independently review before seeing the condition key. Record task clarity, hierarchy, content fit, interaction recovery, responsiveness, keyboard/focus and brand fidelity. Keep disagreements. No agent-generated aesthetic scores or invented human judgments. Report partial automation separately from human findings, with all 12 attempts in denominators. Two repeats, task overlap, shared filesystem access, model alias/version uncertainty, unequal documentation exposure and unenforced execution time limit generalization.
