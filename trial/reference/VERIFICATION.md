# Reference workspace verification — 27 September 2026

Scope: the local app installed from the library tarball, not a backend or a released product.

- Actual tarball installed in `reference/node_modules/@serein-ui/react`; no source aliases or StyleX compiler dependency.
- Six model tests pass: storage envelope, corrupt/invalid records, unique IDs, filtering, inclusive date bounds, sorting and draft normalization.
- Strict TypeScript and Vite production build pass. Vite reports a non-blocking approximately 505 kB JavaScript chunk advisory (approximately 158 kB compressed).
- Chromium acceptance checks pass for search, status/date filters, empty recovery, validation focus, create/save/reload, failed edit/retry, dirty-draft protection, Escape focus return, archive failure/retry and archive persistence.
- Corrupt stored data is reported; saving is blocked and the original record remains untouched.
- Light/dark screenshots checked at 390px and 1280px. The table retains readable columns and scrolls within its labeled, keyboard-focusable region; the page does not overflow.
- axe WCAG A/AA checks pass for the initial app in both themes and the editor error state. This is automated evidence, not full conformance certification.
- The Impeccable detector returned no findings. Manual screen-reader, zoom, forced-colour, other-browser and complete application-level accessibility reviews remain open.
- Independent code review found no remaining material issue in the app flow. The existing library API remains at 42 components and two hooks, with its generated AI contract verified.

Run commands and data boundaries are in README.md. Browser checks use isolated sample data, so they do not alter the user's browser workspace.

## Accessibility hardening follow-up

`check:reference-accessibility` passes the 320px reflow, text-spacing, simulated 200% text enlargement, forced-colour emulation, validation/focus recovery and keyboard-only editing cases. Screenshots were inspected. It originally failed on reduced-motion skip-link visibility, stale corrected-field errors, unsaved-change prompt focus and forced-colour primary text; those regressions now pass.

The library's forced-colour tokens now use the system button foreground/background pair instead of mixing highlight text with browser-drawn text backgrounds. The current pagination page and selected calendar days have an inset outline in forced-colour mode. Normal light/dark palettes are unchanged. Library unit checks: 84 passing after the token change.

The [manual review protocol](ACCESSIBILITY-REVIEW.md) explicitly separates these automated stress tests from pending NVDA, VoiceOver, native browser zoom and real Windows contrast-theme checks.
