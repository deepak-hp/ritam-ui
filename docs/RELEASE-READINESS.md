# Ritam UI release candidate

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
- The invoice example uses Ritam's exported DataTable so the canonical AI recipe demonstrates component reuse.
- A permissive license is proposed for owner review. No final grant, package publication or public promotional message is implied by this work.

## External release gates

- Approve/apply the license and verify dependency notices.
- Confirm repository visibility, npm scope ownership, release permissions and hosting configuration.
- Perform native NVDA/Firefox and VoiceOver/Safari checks, actual browser zoom and complete-process accessibility evaluation; review EAA applicability for the consuming product.
- Run the multi-task AI evaluation with independent human review before making improvement claims.
- Authorize package/site publication and, separately, public announcements.

Native adapters, desktop examples, Figma parity, RTL/localization and advanced modules remain visible in the master checklist. They are not represented as implemented React-release capabilities.

## Beta verification — 7 October 2026

The owner approved the proposed public beta sequence. MIT licensing is applied at the repository and package level; `@ritam-ui/react@0.1.0-beta.1` is configured for public access under the `beta` tag, but has not been published.

The first hosted Linux run found that a clean checkout type-checked playground imports before building `dist`. The aggregate check now builds the library first. [Linux run 37526475891](https://github.com/deepak-hp/ritam-ui/actions/runs/37526475891) passed the complete release gate on `cd7280a`. The same complete local gate passed for the beta working tree (`trial/beta-release.log`, exit 0), including 84 unit tests, 560 story cases, package/consumer/SSR checks, reference/starter checks, live MCP, catalogue, workflows and existing experiences. Later changes still require their own hosted checks before merge.

The rebuilt beta reference workflows also passed in Firefox and WebKit, with the same 18 route/theme/viewport and 8 state/theme audits, plus three text-spacing checks and three keyboard paths per engine. Chromium passed these within the integrated gate. Browser-engine checks do not replace native NVDA, VoiceOver, browser zoom or human review. See [the evidence matrix](../trial/docs/ACCESSIBILITY-EVIDENCE.md).

The development lockfiles now resolve `source-map-js@1.2.2` for [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). Fresh registry audits of both lockfiles returned zero findings. This is a point-in-time result, not a security guarantee. Public static builds now retain the full Plus Jakarta Sans OFL text and Ritam MIT text; both reference and Storybook output hashes matched their source copies.

Publication access is not complete: npm identity lookup returned 401, the connected hosting account returned no teams, and the repository remains private. The license approval is resolved; actual distribution, native assistive-technology review, independent human AI evaluation and public promotion remain open.
