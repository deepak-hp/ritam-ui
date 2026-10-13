# Independent technical review and Impeccable Assessment B

Reviewed 14 October 2026 on `codex/beta-validation`, against `d8f8c547cfaa08552ca3d88b54b338692ed62836`. Reviewer: independent agent `beta_technical_review` (Assessment B). Assessment A and `trial/evaluation-next/AGENT-VISUAL-REVIEW.md` were not read. This is agent review, not human or native assistive-technology evidence.

## Scope and decision

Reviewed the release-workflow changes, focused accessibility script and report, Next.js consumer source/setup/verifier, launch drafts, fresh AI-trial compiler/browser/replay scripts, protocol supplement, and objective results. Ignored dependencies, generated builds and runtime directories were not treated as implementation sources. Frozen candidates, materials, shared fixtures and primary evidence were not changed.

No concrete P1 implementation/security blocker was found in this scope. One P2 verification gap was reported to the controller before edits and resolved by narrowing the evidence claim, as recorded below. The new hosted workflow still requires its own successful CI run. Native AT, actual browser zoom, independent human evaluation and external integration remain open; local agent checks cannot close them.

## Actionable finding

**P2 — the Select/Menu scenario does not test the disabled-item skip it claims.** In `trial/scripts/check-accessibility-gaps.mjs`, the original scenario presses `End` in Select and directly calls `duplicate.focus()` in DropdownMenu. Neither action traverses the disabled middle item. A regression in arrow-key navigation could therefore pass while the return message and accessibility report claim that disabled choices are skipped. Navigate from a known enabled first item with `ArrowDown` across the disabled item and assert the resulting focus/active descendant and activation, or narrow the stated evidence to what is actually checked. This is a verifier/evidence issue, not a reproduced library defect.

**Disposition: resolved by accurate scope, not additional keyboard coverage.** Follow-up inspection confirmed the scenario is now named `select keyboard activation and menu disabled semantics`, its return text specifies Select End/Enter and the explicitly focused menu item, and the accessibility report expressly states that arrow-key skipping is not verified. Existing historical test observations remain valid for those narrower claims.

## Reproducibility and evidence review

- The Next.js fixture installs an archive into a real package directory; it does not alias the library source. Current-source setup records archive/commit/dirty-state provenance and synchronizes the lockfile's local archive integrity before `npm ci`. Frozen mode validates the recorded SHA-256. The simulated route is clearly fixture-only and stores no data.
- The release workflow installs the browser engines, runs the added focused scenarios and builds/verifies the Next.js fixture. Existing automation is not described as a hosted result for these new steps.
- Replay verifies frozen input and final source hashes before rebuilding ignored review assets. It explicitly labels replay as distinct from rerunning historical measurements.
- Primary and supplemental AI results remain separate, with all four candidates retained. Primary interactions pass 10/12, supplemental interactions 12/12; render scenarios pass 10/16 in both. This does not establish a winner or general superiority.
- The primary c18a4d2 pending failures result from exact resting-name locators waiting through a changed pending label. The supplement retains element identity, checks connection and disabled state, and was applied consistently to all four unchanged candidates. The primary failures are retained as verifier false positives; they are not silently erased or counted as candidate repairs.
- c18a4d2 has light-theme `color-contrast` failures at both widths (including orange small text at about 2.6–2.9:1 and approved text at 4.02:1). c85d1e6 has light-theme contrast failures at both widths (orange small text at 2.87:1) and dark-theme approved-text failures (3.95:1). These remain genuine recorded experimental failures, not harness errors. They should inform future source/guidance work without changing frozen candidates.
- Launch drafts explicitly retain beta, unpublished npm, pending independent review and simulated-service boundaries. No outreach or publication was performed by this review.

## Impeccable Assessment B

The bundled detector ran once over the markup-containing directory `trial/evaluation-next/runs`, covering the four candidates rather than CSS alone. Full output is in ignored `trial/.review/beta-detect.json`: `[]` (zero findings, no rule names or locations, no detector false positives to adjudicate). A PowerShell wrapper failed after writing the output while trying to preserve the native exit status; no native detector exit code is claimed. The detector was not rerun. An empty static detector result is not proof of visual quality or accessibility: the independent archived axe contrast failures above still apply.

A fresh private IAB tab visited the review index and all four candidate pages at `http://127.0.0.1:5194`. Bounded live checks inspected screenshots, accessible structure and read-only DOM dimensions: c18a4d2/light, c39e7b1/dark, c62f9a3/light, c85d1e6/dark. Each showed the required File review heading, five-file queue, three pending choices, disabled approved/blocked selections and disabled empty-selection actions. At the observed 1280-pixel viewport, document scroll width was 1265 pixels in each capture. The captured error-log query returned no entries. This was an initial-state inspection, not a new interaction or narrow-viewport trial.

**No reliable browser overlay is available.** The supported browser evaluator is explicitly read-only; mutation/injection is unavailable. No title/script injection was attempted through a bypass, no detector live server was started, and no user-visible overlay is claimed. Browser screenshots and accessible structure provide the fallback signal. The temporary review tab was closed; the controller-owned review server was left running.

## Verification performed by this reviewer

The bounded command below passed both tests (2 passed, 0 failed), including changing-name native/ARIA controls and rejection of disconnected/enabled controls:

```text
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe --test trial/evaluation-next/scripts/service.test.mjs trial/evaluation-next/scripts/pending-controls.test.mjs
```

The full release suite was not repeated. No aesthetic score, preferred candidate or human-observation entry is supplied.

## Focused follow-up: compact Checkbox

Reviewed the new optional `Checkbox.hideLabel` implementation, selection unit tests, CompactRows story, API contract documentation, AI composition guidance and `check-compact-checkbox.mjs`. No new P1/P2 source issue was found. The default remains a visible label; the required label remains in the accessibility tree when hidden. The compact wrapper reserves 48 by 48 CSS pixels, the checkbox is centered, and the existing controlled/disabled/indeterminate bindings are retained. Guidance limits the option to adjacent visible record identity, requires space for the control column, and wraps long names rather than clipping them.

The narrowed accessibility evidence resolves the earlier finding. The added compact browser check is wired into release CI. Generated AI guide/declaration freshness remains part of the controller's final build and checks; the old experiment snapshots must stay frozen.

The independent follow-up selection-unit command passed **9/9** tests using Node 24.19.0 and Vitest 4.1.11. The first attempt could not collect tests because the sandbox's default temporary directory returned `EPERM` on rename. Repeating with `TEMP` and `TMP` set to the existing writable `trial/.review` directory passed; that initial infrastructure failure is not a component-test failure.

```text
rtk proxy powershell -NoProfile -Command '$env:TEMP = (Resolve-Path ".review").Path; $env:TMP = $env:TEMP; & "C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe" "node_modules/vitest/vitest.mjs" run tests/selection.test.tsx'
```

Run from `trial`. Controller verification subsequently passed all 87 component unit tests, TypeScript, AI-contract freshness, and the final compact browser check: 12 rows across both themes at 320/1280px, full wrapping filenames, no overlap/clipping/overflow, and four axe audits with zero violations. Actual clicks at the label edge outside the 20px checkbox toggled the enabled control and left the disabled control unchanged. This final controller verification is separate from the independent reviewer's 9-test run.

Questions skipped: this is an assigned evidence review; the controller owns synthesis and next actions.
