# Accessibility evidence matrix

Ritam UI targets WCAG 2.2 AA. This matrix records available component and reference-app evidence; it is not a conformance claim. W3C states that automated and human evaluation complement each other, and that conformance includes every page in a complete process. See [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and the [complete-process requirement](https://www.w3.org/TR/WCAG22/#cc5).

| Area / success criterion | Current automated evidence | Required manual or product review | Status |
| --- | --- | --- | --- |
| Names, roles, values; labels and errors (4.1.2, 3.3.2) | `tests/accessibility.test.tsx`, `forms.test.tsx`, component stories, axe | Verify product wording, localization, announcements, and full form flow | Open manual gate |
| Keyboard and focus order (2.1.1, 2.4.3) | `tabs.test.tsx`, `selection.test.tsx`, `overlays.test.tsx`, `date-pickers.test.tsx`, `calendar.test.tsx` | Keyboard-only complete processes, popup/date behavior, focus return in final browsers | Open manual gate |
| Focus visible / not obscured (2.4.7, 2.4.11) | token focus rule; `check-reference-accessibility.mjs` centre hit-testing | Inspect visible indicator thickness/contrast and every sticky/overlay state; centre hit-testing is not proof | Open manual gate |
| Reflow, text spacing, contrast and targets (1.4.10, 1.4.12, 1.4.3, 1.4.11, 2.5.8) | reference reflow/text-spacing/forced-colour checks; token contrast checks | Browser zoom at 200% and 400%, rendered contrast, target sizing, Windows contrast themes | Open manual gate |
| Motion and forced colours (2.3.3 additional AAA practice; 1.4.11 support) | reduced-motion and forced-colour CSS; reference checks | Confirm actual browser/OS behavior; 2.3.3 is an additional practice, not AA | Open manual gate |
| Consistent Help (3.2.6) | No meaningful automated rule in this library | Review help placement across each complete product process | Open manual gate |
| Redundant Entry (3.3.7) | No meaningful automated rule in this library | Review repeated-data flows and any permitted auto-population | Open manual gate |
| Assistive technology | No emulator substitutes for native AT | NVDA + Firefox and VoiceOver + Safari, with actual content and recovery states | Pending |

The axe 4.13 `wcag22a` tag set is empty in the current setup, so it is not treated as proof of WCAG 2.2 A coverage. Browser viewport/text enlargement checks emulate stress conditions; they do not replace native browser zoom. The reference protocol is checkout-only source `reference/ACCESSIBILITY-REVIEW.md`; test coverage references are in [`ACCESSIBILITY.md`](ACCESSIBILITY.md).

EAA applicability depends on the product/service, jurisdictional implementation, and economic operator. A component library cannot determine it. See the [official Directive text](https://eur-lex.europa.eu/eli/dir/2019/882/oj).
