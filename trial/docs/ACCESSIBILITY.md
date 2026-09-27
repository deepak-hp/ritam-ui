# Accessibility implementation notes

This library provides accessible component primitives and automated regression checks. It does **not** make a consuming application conformant with WCAG 2.2, the European Accessibility Act (EAA), or any local law. WCAG conformance applies to complete pages and complete processes, not an isolated component library. See [WCAG 2.2 conformance requirements](https://www.w3.org/TR/WCAG22/#conformance-reqs) and the [European Accessibility Act, Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj).

## What these components provide

- Native labels, required state, descriptions, invalid state, and error messages for `TextField`. When an error is supplied, it remains connected through `aria-describedby` and `aria-errormessage`.
- Keyboard-operable Base UI controls with labelled select lists, dialogs, checkboxes, switches, radio groups, and tabs. Tabs use roving focus and activation on focus; dialogs return focus to their trigger after close.
- A consistent `:focus-visible` outline for native and Base UI control roles, including tabs and selection controls. Most controls use 44–48 CSS-pixel minimum dimensions; number-field steppers use 44×24 CSS-pixel targets.
- Reduced-motion handling and a forced-colors mode that uses system colors rather than relying on the normal theme palette.
- Decorative SVGs are hidden from assistive technology.

The automated test suite runs axe-core rules tagged `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, and `wcag22aa`, plus keyboard regression tests for tabs, selection controls, select, and dialog focus restoration. Color contrast is intentionally excluded from axe in jsdom because its canvas-based calculation is not available there; evaluate rendered themes in a real browser.

## Consuming application responsibilities

The application team owns the final accessible name, instructions and error wording, logical focus order across composed screens, page language, headings, landmarks, live updates, media alternatives, authentication, timeout handling, and every complete user process. Validate all consumer CSS overrides because they can remove contrast, target size, or focus visibility.

EAA applicability depends on the product or service, jurisdictional implementation, and the economic operator. The Directive places service-design and ongoing-conformity obligations on service providers; a component library cannot determine scope or make that assessment. Refer to Article 4 and Article 13 of the [official Directive text](https://eur-lex.europa.eu/eli/dir/2019/882/oj).

## Required manual validation before release

The installed-package reference workspace has an additional `npm run check:reference-accessibility` regression check for 320px reflow, text-spacing overrides, simulated text enlargement, forced-colour emulation and keyboard-only editing. Its manual protocol is in `reference/ACCESSIBILITY-REVIEW.md` in the source checkout. Native screen-reader and browser-zoom checks remain pending; emulation does not discharge them.

Current evidence is recorded in [VERIFICATION.md](VERIFICATION.md). Storybook runs real-browser interaction and axe checks in both themes, including open overlays; violations fail the run. Token contrast regression tests check supported text and enabled-control boundaries. These checks supplement, rather than replace, the manual evaluation below.

The criterion-by-criterion evidence map, explicit manual gates, and the limits of the automated checks are in [ACCESSIBILITY-EVIDENCE.md](ACCESSIBILITY-EVIDENCE.md).

The expanded library also tests open combobox naming and search, slider validation on the actual range input, destructive-dialog cancellation focus, nested dropdown hit testing inside a Drawer, table sorting semantics, pagination boundaries, toast dismissal and image fallback. Toasts use Base UI's notification lifecycle; keep important errors inline and use `timeout: 0` for persistent notifications. Date and file inputs use browser-native interfaces, so their platform-specific picker interaction still needs manual evaluation.

- Test each real end-to-end flow with keyboard only, including dialogs, validation, error recovery, menus, and dynamic updates.
- Test with current NVDA + Firefox and VoiceOver + Safari; include the actual content, localization, and error states.
- Check 200% text zoom, 400% browser zoom/reflow, narrow viewports, browser text-spacing overrides, high-contrast/forced-colors mode, and light/dark themes in supported browsers.
- Manually measure contrast, focus indicator visibility and non-text contrast in the final rendered product; verify no sticky header, toast, overlay, or animation obscures focus.
- Include people with disabilities in usability testing and keep test evidence with the release record.

WCAG 2.2 itself describes accessibility evaluation as a combination of automated testing and human evaluation, and states that conformance requires all pages in a complete process to conform. See [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and its [complete-process requirement](https://www.w3.org/TR/WCAG22/#cc5).
