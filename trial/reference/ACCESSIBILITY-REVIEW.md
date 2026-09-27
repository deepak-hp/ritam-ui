# Accessibility review protocol

## Automated evidence — 27 September 2026

Run `npm run check:reference-accessibility` from `trial` with the reference app on port 5174. The test uses a fresh Chromium context and fictional projects. It checks:

- A 320 × 256 CSS-pixel viewport: page reflow, editor overflow, keyboard reachability of Save, validation focus and focus return. This is the viewport equivalent described in [W3C's reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), not a native browser zoom interaction.
- Text spacing: line height 1.5, paragraph spacing 2em, letter spacing 0.12em and word spacing 0.16em; see [W3C's text-spacing guidance](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html).
- Text enlargement: computed font sizes doubled through injected test CSS at a 640px viewport. This is a stress test, not a replacement for browser text zoom.
- Forced-colour emulation: system button text, visible control borders, current-page outline, and usable editor controls. Native Windows contrast themes still require review.
- Keyboard only: skip navigation, open a project, edit its name, save, and restore focus to its trigger. Focus hit-testing checks that the current control is not entirely obscured; see [W3C's focus-not-obscured guidance](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html).
- Error recovery: corrected fields stop reporting stale errors; attempted dismissal focuses Keep editing; discarding returns focus to the opener.
- Reduced motion: the skip link appears without a transition.

The separate `check:reference` flow covers search, date/status filtering, persistence, simulated save failures and archive recovery, with axe checks in light/dark and the editor error state. Both checks pass after the fixes recorded in VERIFICATION.md.

## Manual checks still pending

Record browser/OS/assistive-technology versions, expected behaviour, actual result and any evidence for every row. Do not mark a row passed based on the automated script.

| Environment and flow | Expected result | Status |
| --- | --- | --- |
| NVDA + Firefox: navigate heading, search/status/date filters and table | Meaningful names, correct selected/sorted state, understandable results and table navigation | Pending |
| NVDA + Firefox: invalid submit, correction, failed save, retry | Field error association and useful announcements without stale errors or duplicate interruptions | Pending |
| VoiceOver + Safari: create/edit, dirty dismissal and archive confirmation | Modal boundary, reading order, decision focus and return focus are understandable | Pending |
| Browser text zoom 200% | Content and controls remain readable, operable and untruncated | Pending |
| Browser zoom 400% from a 1280px-wide window | Ordinary content reflows; only the data table needs horizontal scrolling; all editor actions remain reachable | Pending |
| Windows contrast themes, including dark and light themes | Text, checked/selected states, validation, disabled controls and focus remain distinguishable | Pending |
| Keyboard and screen reader: Due dates popup | Month/day navigation, partial range and completed selection are understandable; focus returns to the date trigger | Pending |
| Dynamic storage failure and recovery | The error is announced, corrupt stored data remains untouched, and Retry loading has an understandable outcome | Pending |

This protocol covers the reference workspace. Each consuming app still needs complete-page and complete-process evaluation, including its own content and services. No WCAG or EAA conformance claim follows from these checks.
