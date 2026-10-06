# Protocol amendments and limitations

Record deviations rather than quietly changing the experiment.

## Before the first browser measurement

The controller added a wait for the harness root to contain rendered content after navigation. Vite's document load does not guarantee React has committed its first render. This wait applies identically to every candidate and changes no task assertion. No candidate browser results or source were inspected to make this change. The original verifier hash remains in `materials/checks-fingerprint.json`; measurement records identify the actual verifier used.

The amended browser verifier SHA-256 is `17409de7c4c29beee1e610a28fdfde3ee036650b175f8e99abdedad0ca1c64aa`.

The first generator's notes revealed that the common TypeScript harness lacks a CSS side-effect import declaration. The frozen generation configuration is retained for all twelve attempts to avoid changing the task mid-experiment. Any resulting compiler diagnostic or suppression must be reported as a harness limitation, not evidence of inferior UI quality. Initial and corrected sources remain separate.

One correction (`c9a6e15`) adds `app.css.d.ts`; others suppress the known missing declaration at the import. The extra declaration is preserved and hashed at collection. Original check reports hashed App/CSS/prompt only, so its collection hash is not presented as a historical measurement-time hash.

The pilot is not randomized pair presentation: the review page orders opaque candidate IDs for individual review. It hides condition labels only; visual design may reveal the library. Human review has not happened.

The controller patched the production lockfiles to `source-map-js@1.2.2`. Installed tooling was kept unchanged during generation so every candidate used the same environment, recorded in `materials/checks-fingerprint.json`. A later fresh install is required for release verification. No vulnerable tooling is shipped in the library's production dependency graph.

## Supplemental verification after observing primary failures

An independent code review found test-harness defects: exact label queries rejected wrapping labels or matched hidden native inputs; immediate focus reads raced normal animation-frame focus; duplicate equivalent Clear filters buttons triggered strict-locator errors; and the overlong-name check treated native maximum-length prevention as a failure.

`scripts/browser-confirmation.mjs` is a separate, exploratory correction, not a replacement preregistered endpoint. It uses accessible roles and prefix names for selects/checkboxes, keyboard Space to change checkbox state, an enabled visible clear action, bounded focus polling, and separate empty/maximum-length scenarios. Native prevention at 60 characters is accepted; an actual overlong value must still be rejected. The unique onboarding forward action may be Continue or Review setup. Service outcomes, exact payloads, contrast and overflow checks remain in place. No generated candidate source was repaired.

All twelve final supplemental records use verifier SHA-256 `ed2459021a8c68b15f02c9cdf7ff4fdb57b27cf49dd39aee88dc0e0d92481215`. Each records its execution timestamp, verifier hash, checked source/prompt hashes, primary check-report hash and actual runtime versions. All 36 source/prompt hashes match the primary compiler checks. Source-map-js was patched to 1.2.2 after all primary generation/measurement finished; candidate builds were reused unchanged.

Preliminary supplemental reports were overwritten during the correction pass before the archival instruction arrived. They cannot be truthfully reconstructed. Original primary records, initial/final source and final supplemental records are preserved. This limitation reinforces that the supplemental outcomes are exploratory observations, not a controlled superiority claim.
