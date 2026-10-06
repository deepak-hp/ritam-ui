# In-domain pilot observations — 7 October 2026

Twelve independent attempts were generated: three briefs, two conditions, two repeats. All final outputs compiled and built. Initial files, the allowed correction, prompts, check logs and source fingerprints are retained. All attempts used fresh `gpt-5.6-sol` agents with medium effort. Human review has not happened, and no general design-quality improvement is established.

## What was observed

The original browser verifier had selector, timing and maximum-length testing defects. Its raw failures must not be interpreted as application failures. Read [the amendments](AMENDMENTS.md); original results remain in [the observation record](results/observations.json).

A separate supplemental verifier corrected those test mechanics and ran unchanged against all twelve candidates. All 28 scripted interaction scenarios passed. Of 48 initial-render scenarios (two themes × two widths × twelve candidates), 27 passed and 21 reported contrast or page-overflow failures. These checks are partial automation, not comprehensive functional validation, human design judgment or accessibility conformance.

| Task | Condition | Attempts built | Scripted interactions passed | Initial-render checks passed |
| --- | --- | --- | --- | --- |
| Invoices | Plain React/CSS | 2/2 | 4/4 | 1/8 |
| Invoices | Ritam + guidance | 2/2 | 4/4 | 4/8 |
| Settings | Plain React/CSS | 2/2 | 6/6 | 6/8 |
| Settings | Ritam + guidance | 2/2 | 6/6 | 6/8 |
| Onboarding | Plain React/CSS | 2/2 | 4/4 | 2/8 |
| Onboarding | Ritam + guidance | 2/2 | 4/4 | 8/8 |

Do not combine these counts into a quality score or a condition winner. The supplemental checks were corrected after seeing primary failures. The three briefs overlap supplied Ritam examples, documentation exposure differs, and two repeats do not support broad conclusions. The common compiler harness omitted a CSS import declaration and consumed the correction opportunity; that initial diagnostic is a harness limitation.

All four invoice candidates overflowed at 320 CSS pixels in both themes. Component reuse did not by itself prevent that layout failure. Thirteen additional render scenarios reported color-contrast failures. An overflow assertion can mask further violations in the same scenario; raw axe captures remain in local evidence. Reviewed canonical workflows pass their own browser checks and remain the recommended examples. Generated pilot candidates are experiment artifacts, not production templates.

## Reproduce and review

Use [the harness instructions](README.md). The condition-label-hidden review page serves isolated candidates on port 5187. Record independent observations using `review/rubric.md` and `review/observations.csv`; the latter is intentionally empty until real reviewers participate. Visual appearance can reveal a condition, and the order is fixed rather than randomized.

`results/observations.json` contains every primary compiler/browser result and final supplemental record, including failed scenarios. Primary verifier provenance is explicitly reconstructed from the frozen script and execution history. Supplemental records carry execution-time hashes and timestamps. No candidate was repaired after generation. Preliminary supplemental reports were overwritten during correction before archival; this limitation is disclosed rather than reconstructed.

The next evidence needed is independent human review and fresh tasks that do not overlap canonical recipes. Until then, describe Ritam's components, contracts, recipes and checks directly; do not advertise a proven reduction in AI-generated design problems.
