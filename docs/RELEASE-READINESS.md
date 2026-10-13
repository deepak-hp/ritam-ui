# Serein release candidate

Current Serein work is recorded in [the redesign and frame audit](SEREIN-REDESIGN.md) and [the beta release plan](superpowers/plans/2026-10-13-serein-beta-release.md). Historical results below apply to their named revisions, not automatically to later changes.

This record accompanies the [master checklist](RELEASE-CHECKLIST.md). The current milestone is a reviewed React-web release candidate. Public licensing, package publication, hosting and manual accessibility evaluation remain separate release gates.

## Delivered scope

- Searchable catalogue for all 42 components, with live previews, typed source, API links, themes and keyboard navigation.
- Complete invoice, settings and onboarding demonstrations, including pending states, validation, failures, retries and local persistence where appropriate. Operations are explicitly simulated; no email, payment or account service is connected.
- Reviewed workflow source distributed with the AI contract, composition recipes and assistant-neutral offline guidance. Freshness checks distinguish real source changes from Windows/Linux line endings.
- Foundations preserve Flame & Ink: orange primary actions, white/near-black surfaces, Plus Jakarta Sans, restrained success green, crisp controls and optional navigation materials.
- Accessibility evidence and a reproducible AI evaluation protocol. Automated checks do not establish WCAG/EAA conformance or prove that AI-generated designs improve.

## Review and verification

The catalogue, workflows, AI guidance and release tooling received independent reviews, followed by a whole-branch review. No material findings remain. Review fixes include recovery-button focus return and cross-platform AI fingerprint stability. Integration also corrected an assertion that checked focus before popup removal and two legacy browser checks that ignored the release runner's server address.

Verification environment: Windows, Node 24.19.0, npm 10.8.1 and Chromium. On 28 September 2026, the complete `npm run check:release` command finished with exit code **0**, including the live MCP checks and all browser audits. The final run reused cached dependency downloads; the separate clean-source install verified the lockfile from an empty dependency directory. Raw local output: `trial/release-final-pass.log`.

| Area | Verified coverage |
| --- | --- |
| Library | 84 unit tests; strict type check; compiled library and playground builds |
| Distribution | Tarball allowlist and stale-file regression; strict fresh consumer without StyleX compiler; server rendering, hydration and focus |
| Starter and reference | 8 starter unit tests, fresh generated-app installation/build/browser check; 15 reference unit tests; installed-package reference build |
| Storybook | 140 stories in four theme/motion combinations (560 cases); static build; live documentation, icon motion and responsive layout checks |
| AI | Current declarations, tokens and six source mirrors; LF/CRLF regression; actual MCP discovery and typed metadata for all 42 components |
| Catalogue | 84 component/theme audits; all previews at 1440/390/320px; search, history, keyboard, clipboard fallback and nested static assets |
| Workflows | 18 route/theme/viewport plus 8 state/theme accessibility and overflow audits; validation, focus, failures, retries and storage recovery |
| Existing experiences | Project workspace operations; five accessibility scenarios; three navigation finishes in both themes; 16 composition cases and keyboard/forced-colours checks |

These are distinct coverage counts, not an aggregate quality score. Repeated verification runs are not counted as additional tests. Local logs and browser captures are ignored artifacts under `trial` and `trial/.review`; CI uses the same release command.

An independent Git source export with no preinstalled dependencies passed `npm ci`, library build, package manifest checks, AI freshness, fresh reference setup and the reference production build. The missing vendor archive was successfully regenerated from source. The dependency audit reported zero known vulnerabilities; this is a point-in-time registry result, not a security guarantee.

Known non-blocking tooling notices: Storybook preview annotation/docgen and documentation chunk-size warnings; npm emitted an optional-package cleanup warning during the Windows clean install, which still completed successfully. Hosted Linux CI has been configured but has not been observed running.

## Decisions retained

- Work used a dedicated branch in the existing checkout to retain installed dependencies and the live reference app.
- The user's unattended instruction authorized reversible implementation decisions without an interview pause.
- The invoice example uses Serein's exported DataTable so the canonical AI recipe demonstrates component reuse.
- A permissive license is proposed for owner review. No final grant, package publication or public promotional message is implied by this work.

## External release gates

- Approve/apply the license and verify dependency notices.
- Confirm repository visibility, npm scope ownership, release permissions and hosting configuration.
- Perform native NVDA/Firefox and VoiceOver/Safari checks, actual browser zoom and complete-process accessibility evaluation; review EAA applicability for the consuming product.
- Run the multi-task AI evaluation with independent human review before making improvement claims.
- Authorize package/site publication and, separately, public announcements.

Native adapters, desktop examples, Figma parity, RTL/localization and advanced modules remain visible in the master checklist. They are not represented as implemented React-release capabilities.

## Beta verification — 7 October 2026

The owner approved the proposed public beta sequence. MIT licensing is applied at the repository and package level; `@serein-ui/react@0.1.0-beta.1` is configured for public access under the `beta` tag, but has not been published.

The first hosted Linux run found that a clean checkout type-checked playground imports before building `dist`. The aggregate check now builds the library first. [Linux run 37526475891](https://github.com/deepak-hp/ritam-ui/actions/runs/37526475891) passed the complete release gate on `cd7280a`. The same complete local gate passed for the beta working tree (`trial/beta-release.log`, exit 0), including 84 unit tests, 560 story cases, package/consumer/SSR checks, reference/starter checks, live MCP, catalogue, workflows and existing experiences. Later changes still require their own hosted checks before merge.

The rebuilt beta reference workflows also passed in Firefox and WebKit, with the same 18 route/theme/viewport and 8 state/theme audits, plus three text-spacing checks and three keyboard paths per engine. Chromium passed these within the integrated gate. Browser-engine checks do not replace native NVDA, VoiceOver, browser zoom or human review. See [the evidence matrix](../trial/docs/ACCESSIBILITY-EVIDENCE.md).

The development lockfiles now resolve `source-map-js@1.2.2` for [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). Fresh registry audits of both lockfiles returned zero findings. This is a point-in-time result, not a security guarantee. Public static builds retain the full Plus Jakarta Sans OFL text and project MIT text; both reference and Storybook output hashes matched their source copies at the recorded revision.

Publication access is not complete: npm identity lookup returned 401, the connected hosting account returned no teams, and the repository remains private. The license approval is resolved; actual distribution, native assistive-technology review, independent human AI evaluation and public promotion remain open.

The [twelve-attempt AI pilot](../trial/evaluation/RESULTS.md) is preserved in the repository, including frozen inputs, initial/final outputs and both original and supplemental test evidence. Final outputs all compiled; the corrected supplemental verifier passed 28 scripted interaction scenarios and reported 21 failures among 48 render checks. Those bounded observations do not establish a quality winner. Independent review confirmed that test-harness corrections and provenance limits are disclosed. The condition-label-hidden review packet is ready for actual human evaluation.

The final source review has no unresolved material findings within its scope. The latest-head GitHub status and integration state are recorded on [PR #1](https://github.com/deepak-hp/ritam-ui/pull/1); earlier green runs do not attest later commits. Local packaging produces a 49-file beta archive with licensing, compiled library, AI guidance and public docs; experiment candidates are excluded.

[Linux run 37528468167](https://github.com/deepak-hp/ritam-ui/actions/runs/37528468167) passed the integrated gate and the additional Firefox and WebKit workflow checks on `a851552`. A subsequent run exposed an intermittent alert-dialog test assertion before asynchronous initial focus completed. The affected test now waits for initial and restored focus; all seven overlay tests and all 84 unit tests passed locally after the repair. The final revision still requires a green hosted run before integration.

Run 37530520023 then exposed an unnamed MultiSelect listbox during the full-motion story audit. MultiSelect and the related Combobox now explicitly name their option lists from the existing field label. Regression assertions check the names while the lists are open; accessibility rules remain enabled. The complete local gate passed again after this repair (`trial/beta-final-release.log`), as did rebuilt-reference Firefox and WebKit checks (`trial/beta-final-firefox.log`, `trial/beta-final-webkit.log`). Final hosted verification is tracked on PR #1. The AI pilot retains its earlier frozen package snapshot and is not silently rerun against this repair.

## Serein candidate verification — 13 October 2026

The full local `npm run check:release` gate passed after the Serein rename, visual refinement and frame audit. It includes 84 unit tests, 560 Storybook cases, packed consumer and SSR/hydration checks, generated AI and live MCP checks, starter/reference builds and tests, catalogue/workflow audits, and the new Serein studio checks. Raw ignored log: `trial/serein-release.log`.

The fresh aggregate run executed on Windows with Node `24.19.0` and npm `10.8.1` and exited `0`. Its Chromium workflow used Playwright engine `153.0.8010.12`. Separate rebuilt-package workflow runs exited `0` with Firefox `155.0` and WebKit `26.6`; each covered 18 route/theme/viewport audits, 8 additional state/theme accessibility and overflow audits, text spacing and keyboard paths for all three complete workflows, and the interaction and recovery cases recorded by the workflow verifier. The browser versions were captured by launching each installed engine and reading `browser.version()` after the checks.

The first production run found a verifier defect: Vite minifies six-digit CSS hex colours to three digits where possible, while the contrast helper only parsed pairs of digits. The helper now expands shorthand before computing luminance. Production colours and contrast thresholds were unchanged; the corrected complete gate passed. Independent source review found no additional material issue in the Serein candidate and deployment preparation.

Fresh npm audits of both package and reference lockfiles reported zero findings. A targeted scan of working source and all local Git-history blobs found no matching credential patterns, exact private birth details, or tracked private research paths. This bounded review is not a guarantee against all possible undiscovered secrets.

The combined documentation site was assembled separately with Node `24.11.1` for the repository base path `/ritam-ui/`. All five site-builder tests passed, followed by the complete reference and Storybook build and the browser smoke check of the assembled subpath. The local artifact verifies catalogue, Storybook and required asset routing under that base path; it is not evidence of a deployed GitHub Pages site or a hosted CI result for the final revision.

Npm authentication still returns HTTP 401; a public package lookup returns HTTP 404 and does not prove scope ownership. Native NVDA/Firefox, VoiceOver/Safari and actual zoom review remain pending. The [review protocol](../trial/reference/ACCESSIBILITY-REVIEW.md), [real-application beta evaluation kit](BETA-EVALUATION.md) and [support matrix](SUPPORT.md) record these limits. No external reviewer feedback, npm publication, accessibility certification or stable 1.0 approval is claimed.

The reviewed candidate was committed as `72a6de4` and opened in [PR #2](https://github.com/deepak-hp/ritam-ui/pull/2). After the privacy review and complete local release gate passed, the repository was made public and GitHub private vulnerability reporting was enabled; API reads confirmed `PUBLIC` and `enabled: true`. Pages is configured for Actions and its deployment environment permits only the `main` branch. Actual hosted checks and deployment must still pass independently of those settings. The assembled Storybook manager was also opened locally at `/ritam-ui/storybook/`; its Button navigation, documentation and rendered examples loaded correctly.

## First public Serein deployment — 13 October 2026

[PR #2](https://github.com/deepak-hp/ritam-ui/pull/2) merged after [release checks on `d2e9cb9`](https://github.com/deepak-hp/ritam-ui/actions/runs/38415009134) passed. The merged revision `3809c26` then passed its own [complete Linux release check](https://github.com/deepak-hp/ritam-ui/actions/runs/38416528961), followed by the [Pages build, smoke check and deployment](https://github.com/deepak-hp/ritam-ui/actions/runs/38417887319). GitHub deployment `7041958190` reports success.

Public browser verification confirmed the catalogue redirect, working Button specimen, Checkbox navigation and permalink reload, both themes, and the Serein design studio. HTTPS reads of `site-metadata.json`, the MIT license and AI reference each returned 200 with expected content. Storybook's manager and sidebar Button documentation loaded, but this additional inspection exposed a separate defect in the Markdown catalogue cross-links: they duplicated the `?path=` prefix and escaped the hosted Storybook path. The initial smoke test covered story/docs iframes and therefore missed that manager navigation.

The follow-up fixes generated catalogue links and the workspace example link using Storybook route paths. It also preserves the hosting prefix in Link/Breadcrumbs examples and adapts three source-document links for the hosted Apple/accessibility documentation without changing package Markdown. The rebuilt site passed an expanded Chromium check that clicks the actual catalogue Button link, asserts the manager URL remains under `/ritam-ui/storybook/`, and waits for Button documentation. The five site tests and AI-document freshness check passed as well. These are local results for the follow-up patch; its hosted CI and public deployment must pass independently before that revision is considered published.

Public destinations: [catalogue](https://deepak-hp.github.io/ritam-ui/?view=catalogue), [design studio](https://deepak-hp.github.io/ritam-ui/?view=serein), [Storybook](https://deepak-hp.github.io/ritam-ui/storybook/), and [AI reference](https://deepak-hp.github.io/ritam-ui/catalogue-assets/ai/llms-full.txt).
