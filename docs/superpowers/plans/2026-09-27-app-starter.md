# App starter implementation plan

**Goal:** Make a new app consume the library and AI contracts with one local command.
**Architecture:** Repository-local Node CLI builds/packs the unpublished library, copies a small React/Vite template and a vendored archive into an empty destination, then optionally installs dependencies. No publishing, global configuration or source aliases.
**Scope:** Next adoption step from the user-approved roadmap. Retain the approved UI tokens and accessibility fixes. Do not revise the design language or start native adapters.

- [x] Generator task: add scripts/create-app.mjs and scripts/create-app.test.mjs. Test refusal of nonempty targets, flags and template copying before implementation. Accept destination plus --no-install; default installs. Build package once, include vendor archive and self-contained local file dependency; use array-form child processes, no shell interpolation. Existing content must never be removed/overwritten. Preserve generated output on installation failure with recovery instructions.
- [x] Template task: add starter-template/ with standard Vite/React config, CSS/font imports, one small accessible local example, document-wide persisted theme, README, AGENTS.md and AI guidance pointing to installed contracts. No AI vendor-specific global changes or claimed universal MCP support.
- [x] Integration task: generate an app in a new temporary check folder, build it, verify installed package and no StyleX compiler, exercise light/dark/form states in Chromium and axe, and check refusal leaves an existing file untouched.
- [x] Review and documentation: review command safety and output portability, record evidence, and expose commands in package scripts/README. No commit or publish.

Use Node 24 and the existing tool versions. Keep the generated dependency archive in vendor and tracked for portability. Node_modules and build output stay ignored. The command is local to this repository until package distribution is separately authorized.

## Verification — 2026-09-27

- `npm run test:starter`: 8/8 passed. Recovery instructions tested with shell metacharacters in the destination; they print the path as information rather than a shell command. Regression failed before the correction and passed afterward.
- `npm run check:starter`: passed with a fresh generated app, actual packed-library install and strict TypeScript/production build. The first independent build exposed missing Vite asset declarations; the template now includes `src/vite-env.d.ts`.
- Chromium checked keyboard skip link, input focus, invalid/valid submission, persisted light/dark themes, 320px and 1100px reflow, no page errors, and no axe WCAG 2/2.1/2.2 A/AA violations in either theme. Screenshots saved under `trial/.review/starter`; light desktop and dark narrow screenshots visually reviewed.
- Independent source review completed; the setup-command quoting finding was fixed and reviewed again with no remaining findings.
- Automated checks are not a full accessibility certification; manual assistive-technology and application-level review remain necessary. Scope remains React web with a local unpublished package.
