# Serein beta release implementation plan

> **For agentic workers:** Use subagent-driven-development or executing-plans to implement this plan task-by-task. Preserve existing approved design work and frozen evaluation evidence.

**Goal:** Deliver a reviewed, reproducibly verified Serein React-web beta, ready for public source, documentation hosting and npm distribution, with explicit evidence for remaining human or account gates.

**Architecture:** Keep the current React/Base UI/StyleX package and installed-package reference app. Use the existing aggregate release gate. Host static catalogue and Storybook together using the repository's available hosting path; avoid adding a service backend.

**Tech Stack:** Node 24, React 19, TypeScript, Base UI, StyleX, Vite, Storybook, Playwright, GitHub Actions, npm.

**Spec:** `docs/RELEASE-CHECKLIST.md`, `docs/RELEASING.md`, and the user's authorization to work through the six remaining release areas.

## Global constraints

- Preserve Serein's approved astrology-informed visual identity and existing `dp-*` hooks.
- Release scope is React web, version `0.1.0-beta.1`; do not claim stable 1.0, native support, proven AI-quality superiority, or accessibility certification.
- Keep private birth research and secrets out of source, history and public build artifacts.
- Preserve frozen `trial/evaluation` evidence and unrelated user changes. Use the current `codex/serein-design` branch.
- Do not send invitations or announcements without explicit message authorization. External testers and native assistive-technology results cannot be fabricated.

## Task 1: Freeze and verify the candidate

Files: existing release runner, tests and build configuration only where a reproducible failure requires a correction; `docs/RELEASE-READINESS.md` for evidence.

- [x] Run `npm run check:release` with Node 24; diagnose and fix actual failures without weakening checks.
- [x] Repeat Firefox and WebKit workflow checks against the rebuilt package.
- [x] Audit current dependencies and package contents, then review the final diff and private-data exclusions.
- [ ] Commit the intentional Serein work, push the branch, open a PR and observe fresh hosted checks on that commit.

## Task 2: Publishable documentation site

Files: dedicated static-site assembly script and GitHub Pages workflow, with deployment instructions in a focused document.

- [x] Inspect current static asset/base-path handling and choose a single catalogue + Storybook output.
- [x] Implement a deterministic build that retains licenses and links; use official hosting documentation for workflow configuration.
- [x] Validate the built site under the actual repository subpath, including component navigation, Storybook and required asset links.
- [ ] Configure/deploy on the existing repository when permissions and public-release checks permit; otherwise retain a tested artifact and exact remaining setup step.

## Task 3: Human review and stable-release requirements

Files: `trial/reference/ACCESSIBILITY-REVIEW.md`, focused beta feedback/support documentation, and relevant public documentation links.

- [x] Provide executable NVDA/Firefox, VoiceOver/Safari and real zoom review procedures with result recording; leave unperformed cases pending.
- [x] Prepare a real-application beta evaluation kit with installation, concrete tasks, issue reporting and 1.0 exit criteria.
- [x] Clarify supported environments using actual tested versions and recorded limitations.

## Task 4: Public source and distribution

Files: `.gitignore` only if new private paths require exclusions; `SECURITY.md`, release notes and public setup instructions.

- [x] Inspect current repository visibility, npm identity/scope access and hosting access without exposing credentials.
- [ ] Enable a private vulnerability-reporting channel when available and verify its actual URL.
- [ ] Make the reviewed repository public only after privacy and release checks pass.
- [ ] Publish the verified beta only with confirmed package ownership/authentication; verify registry metadata and a clean npm consumer after publication.
- [ ] Update the durable checklist with completed evidence and exact external blockers; retain beta status until human gates are satisfied.

## Completion evidence

Record commands, exit statuses, tested revision, hosted CI/preview links and external limitations. Source publication, package publication, site deployment and human review are separate outcomes; a local build is not evidence for the others.
