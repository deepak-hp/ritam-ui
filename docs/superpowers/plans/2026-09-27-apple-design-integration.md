# Apple design integration

**Goal:** Add both user-requested navigation finishes while preserving the approved astrology-informed Flame & Ink identity.
**Architecture:** An opt-in CSS surface utility in the existing compiled stylesheet; three material choices (subtle, expressive, solid) independent of light/dark. Reference-app appearance controls and identical Storybook specimens expose the choices. No new React API, renderer, dependencies or native support claim.

- [x] Add neutral material tokens and a navigation-only utility with opaque fallback, reduced-transparency, increased-contrast and forced-color support. Preserve every existing colour and font token.
- [x] Add reference-app appearance choices and three Storybook specimens; retain the same controls/content. Keep sticky navigation from obscuring focus at small viewport sizes.
- [x] Document the Apple source-to-design mapping, identity boundaries and web limitations in package docs, Storybook and generated AI guidance.
- [x] Verify actual browser materials, contrast against extreme backdrops, all three choices in both themes, keyboard focus, narrow reflow, accessibility preferences and existing reference workflows. Build package/Storybook, check generated AI contracts, review screenshots and run a source review.

**Approved direction:** User requested incorporation of Apple design guidance and answered “how about both?” to subtle vs more visible glass. Keep filled orange primary actions, Plus Jakarta Sans, white/near-black canvases, semantic green only, and crisp controls. Expressive treatment may change navigation's outer framing, not the controls or content surfaces. Private birth details stay out of the distributed package.

## Evidence

- Local package build and reference package installation passed; reference production build and Storybook static build passed.
- Library unit tests: 84 passed. New Storybook stories: 3 passed in each theme (6 total), including axe and interaction checks. AI contract validation still covers 42 components and two hooks.
- `check:materials` passed all three finishes in both themes. Worst tested neutral-backdrop navigation text contrast: 4.86:1 light expressive and 6.20:1 dark expressive. Keyboard focus return, skip-link clearance, 18 successive focused controls beneath sticky navigation, 320px reflow, and opaque reduced-transparency/high-contrast/forced-colour variants passed.
- Existing `check:reference` workflow and `check:reference-accessibility` passed (reflow, spacing, simulated text enlargement, forced colours and keyboard editing).
- Impeccable detector returned no findings. Independent source review found no outstanding issue. Desktop and narrow screenshots reviewed in two bounded passes, under `trial/.review/materials`.
- This Windows/browser environment requests reduced transparency by default. Production respects it; tests explicitly emulate normal transparency only in the test browser, then verify each preference separately. Appearance explains this behaviour.
- Full manual assistive-technology certification and native Liquid Glass rendering remain out of scope.
