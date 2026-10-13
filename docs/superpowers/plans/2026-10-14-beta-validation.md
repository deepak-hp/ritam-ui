# Serein beta validation and launch preparation

**Goal:** Produce new, reproducible release evidence and concrete reviewer/launch materials for the four areas selected by the owner, without misrepresenting agent work as human evaluation.

**Architecture:** Extend the existing validation and release documentation. Keep the production library unchanged unless a reproducible integration or accessibility defect requires a surgical fix. Preserve the frozen `trial/evaluation/` pilot; a new experiment gets a separate directory.

**Tech stack:** Node 24, the packed Serein React beta, Next.js App Router, TypeScript, existing Playwright/axe tools, and static review documents.

**Scope:** The owner's selected accessibility, real-app beta, AI validation and launch tasks; `docs/RELEASE-CHECKLIST.md` and `docs/BETA-EVALUATION.md` define the remaining human gates. This work is authorized implementation and validation of the existing release plan.

## Constraints

- Retain Serein's approved design, package name and beta status.
- Never alter frozen `trial/evaluation/` files or invent human review results.
- Keep internal consumer trials distinct from external adoption evidence.
- Do not publish social posts, send invitations, create accounts or incur charges without the required destination and authorization.
- No npm publication is attempted in this workstream; authentication remains a separate gate.
- Preserve existing user servers and unrelated files. Use isolated ports and directories.

## Work and acceptance checks

- [x] Accessibility: review gaps in the existing browser checks; exercise relevant keyboard, error-recovery and preference cases; add a targeted regression only for a concrete uncovered behavior or defect. Record what is automated and what still needs native assistive technology.
- [x] Consumer integration: install the actual tarball in an isolated Next.js App Router application with a server-rendered route, interactive client boundary and local route-handler failure/retry. Build and run the production server, verify hydration, styles, keyboard behavior and retained data. Preserve a reproducible fixture and exact versions; do not call this independent human beta feedback.
- [x] Fresh AI trial: freeze a new brief and identical service/fixture inputs before generation, compare plain React/CSS against Serein plus guidance with two fresh attempts each, retain every attempt and failures, and prepare a condition-label-hidden review packet. Report objective compiler/interaction results separately; do not synthesize human aesthetic scores or declare general superiority.
- [x] Launch: update existing drafts for the now-public beta, include actual catalogue/Storybook/source/feedback links, provide a reviewer invitation and short social copy, and retain the npm/unperformed-review limits. Prepare exact messages for the owner-selected destination before any external sending.
- [x] At the owner's request, perform separate agent visual and technical reviews. Keep their observations distinct from independent human feedback and preserve all generated attempts.
- [x] Address the compact-selection gap exposed by visual review: add optional Checkbox `hideLabel` with an accessible name and 48px click area, a compact-row story and regression, and stronger composition guidance. This is an additive post-trial fix; do not alter the frozen package or generated candidates.
- [x] Review changed files and generated artifacts, run checks appropriate to each change, update the durable release checklist and evidence, and commit the reviewed work through [PR #4](https://github.com/deepak-hp/ritam-ui/pull/4). [Hosted run 38454416679](https://github.com/deepak-hp/ritam-ui/actions/runs/38454416679) passed on implementation revision `d85307152dea739a2d304c33c664b66f4e576a43`; subsequent revision checks and integration evidence are tracked on the PR.
- [x] Publish the selected GitHub beta reviewer call as [issue #5](https://github.com/deepak-hp/ritam-ui/issues/5). Keep the repository/Pages rename deferred until launch gates are met, as requested.

## Human completion requirements

Native NVDA/Firefox, VoiceOver/Safari, actual native browser zoom and disabled-user evaluation remain open until performed on the named devices. External consuming-application feedback and independent AI design scores remain open until actual reviewers submit results. Preparing test material does not complete those requirements.
