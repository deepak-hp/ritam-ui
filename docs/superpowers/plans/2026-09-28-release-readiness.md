# Ritam UI Release Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Deliver a verified professional React-web release candidate and retain every long-term/public-release commitment in the master checklist.

**Architecture:** Extend the installed-package reference app for catalogue and workflows. Retain the existing API, components, token identity and build system. Add release tooling/governance without publishing or creating fake production services.

**Tech Stack:** React, TypeScript, Base UI, precompiled StyleX, Vite, Storybook, Vitest, Playwright and axe.

**Spec:** `docs/superpowers/specs/2026-09-28-release-readiness-design.md`

## Global Constraints

- Preserve Flame & Ink, Plus Jakarta Sans, orange primary actions with dark text and restrained green.
- React web only for this release; native/Figma/RTL expansion remain explicit roadmap items.
- Keep current workspace and composition routes working.
- Use existing public APIs; no new UI framework/dependency or copied competitor assets.
- Fictional data and async demonstrations must be identified; no actual payment or email operations.
- Do not publish a package, apply a final license grant or send public promotion without owner release authorization.
- Tests and review evidence must distinguish automated results from manual/native accessibility and legal review.

### Task 1: Searchable component catalogue

**Files:** create `trial/reference/src/catalogue/` modules/styles; modify reference `main.tsx`, `App.tsx`, `vite.config.ts` as needed; create `trial/scripts/check-catalogue.mjs`; add corresponding npm command. Metadata consumes `trial/ai/contract.json`; asset publishing may copy existing AI text during build. Do not edit unrelated library components.

**Interfaces:** `Catalogue` default React component at `?view=catalogue`; workflow links use `?view=invoices`, `?view=settings`, `?view=onboarding`; all 42 component names remain discoverable. Current workspace is `?view=workspace` or no view; composition is unchanged.

- [x] Build categorized search, no-results recovery, selected component URL/deep link, keyboard-operable controls, live typed specimen and source/API/usage guidance for each export.
- [x] Add foundations, practical clone/tarball installation and AI/accessibility links; no unworking npm install instructions.
- [x] Verify search/filter/deep link/theme/no-results/copy fallback and document assets in browser at 1440/390/320px, both themes, with axe and no page overflow.
- [x] Build reference, review screenshots, run scoped independent code/design review and resolve material findings.

### Task 2: Three complete reviewed workflows

**Files:** create `trial/reference/src/workflows/` for common shell, invoices, settings, onboarding and CSS; modify `main.tsx`; add `trial/scripts/check-workflows.mjs` and tests near pure workflow logic.

**Interfaces:** routes named in Task 1, links back to catalogue; all import package controls from `@ritam-ui/react`. Storage keys under `ritam-ui.examples.*`; reject invalid stored shapes and do not overwrite corrupt data silently.

- [x] Invoice workflow: fixture records, search/status filters, meaningful empty state/reset, accessible detail surface, simulated reminder with pending/failure/retry/success and duplicate-submit prevention.
- [x] Settings workflow: grouped name/timezone/notification fields, explicit validation/save/reset, browser persistence, unsaved feedback and simulated/actual storage failure preserving edits.
- [x] Onboarding workflow: workspace details, preferences, review, explicit local completion/restart, back navigation preserving valid edits and field-error focus.
- [x] Test meaningful state transitions first, then implement; check complete flows and failure recovery in browser, both themes, narrow/desktop, keyboard and axe.
- [x] Inspect screenshots and resolve independent code/design review findings.

### Task 3: AI recipes, accessibility evidence and integration docs

**Files:** `trial/ai/COMPOSITION.md`, `trial/ai/README.md`, generated AI files via generator, `trial/docs/ACCESSIBILITY.md`, new workflow/evaluation/accessibility-matrix docs; starter instructions if required.

**Interfaces:** source references target shipped workflow files; keep contract generator/fingerprint freshness guarantees. Catalogue should expose current AI assets produced by Task 1.

- [x] Add usable workflow recipes with when-to-use/avoid, source paths, state obligations and visual-review rubric.
- [x] Document assistant-neutral offline integration and existing Storybook MCP; no unsupported universal compatibility claims.
- [x] Define reproducible multi-task AI comparison protocol with human review and no invented scores.
- [x] Add WCAG 2.2 evidence/manual-review matrix and complete-process accessibility test instructions; retain EAA scope limits.
- [x] Regenerate AI artifacts, check freshness and test links/asset availability.

### Task 4: Repository governance and release pipeline

**Files:** root README, CONTRIBUTING, SECURITY, proposed MIT license, third-party notices, CHANGELOG, `.github` workflows/templates; package metadata/scripts/lockfile; release guide and draft launch material.

**Interfaces:** existing `trial` npm commands and new catalogue/workflow checks. All CI processes must clean up their own servers. Use least-privilege workflow permissions; no auto-publish or secrets embedded.

- [x] Add owner-reviewable MIT proposal, attribution and concise contribution/security/maintenance documents.
- [x] Add accurate package metadata/contents verification, release/versioning checklist and safe CI jobs for source/build/browser checks.
- [x] Inspect dependency audit output; fix supported low-risk issues or record concrete residual findings.
- [x] Improve README setup/navigation and prepare truthful promotion drafts/demo outline; keep publication gated.
- [x] Validate configuration, package contents and clean clone/setup procedure as far as available credentials/network permit.

### Task 5: Final integrated release-candidate verification

**Files:** verification/release checklist/plan status, fixes identified by review only.

- [x] Run full unit/type/build/AI/package/consumer/SSR and starter checks.
- [x] Build Storybook and run browser interaction/theme/motion matrix; run reference/catalogue/workflow and accessibility checks.
- [x] Independently review complete change set, preserve reviewed design evidence, fix material findings and rerun affected checks.
- [x] Update all master checklist statuses with evidence and list external/manual release gates without claiming completion of them.
- [x] Commit verified work and prepare repository handoff; no force push or public announcements.

## Execution decisions

Use the current checkout on dedicated branch `codex/release-readiness` to preserve installed runtime and the user's live app. Only one implementation worker runs at a time; read-only audits may run independently. The user's explicit unattended instruction supersedes skill interview/approval pauses for reversible design and implementation decisions. Final publication/license remains a release gate.
