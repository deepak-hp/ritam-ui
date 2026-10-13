# Premium, accessible colour architecture for Serein

## How should warm orange balance neutral surfaces in light and dark themes?

### Takeaway
Keep orange as a deliberately scarce action/selection signal, and build most hierarchy with a nearly neutral surface ramp. A faint warm bias can make the system feel cohesive, but fully orange-tinted grays—especially in dark mode—would make semantic colors compete with the brand accent.

### Cited Findings
- Radix assigns separate scale roles to app/subtle backgrounds (steps 1–2), component backgrounds and states (3–5), borders (6–8), solids (9–10), and text (11–12). This is useful architecture even if Serein keeps its own colors. — [Radix Colors, “Understanding the scale”](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) (accessed 2026-10-13)
- Radix describes pure gray as the neutral pairing for any accent and suggests the gray closest to the accent hue for a more colorful, harmonious result; it specifically cautions that saturated gray backgrounds can clash with colorful UI, especially in dark mode. — [Radix Colors, “Composing a color palette”](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette) (accessed 2026-10-13)
- Adobe Spectrum uses structured relationships among colors, grays, themes, and contrast ratios, and says color should create hierarchy, signal meaning, and guide attention while unnecessary color is avoided. — [Adobe Spectrum, “Colors”](https://spectrum.adobe.com/page/using-color) (accessed 2026-10-13)
- Spectrum generates theme-specific colors against target background contrast rather than expecting one numeric color to serve every surface and mode. — [Adobe Spectrum, “Color fundamentals”](https://spectrum.adobe.com/page/color-fundamentals/) (accessed 2026-10-13)

### Inferences
- Preserve the symbolic roles already fixed by the brief: orange for primary/active action, white for the light canvas, and near-black for the dark canvas. The astrology-derived role does not determine exact hex values; the measured candidates below are design choices.
- The present `#FFFFFF` / `#0B0E14` canvases, `#181B22` / `#F4F6FA` text, and `#FF681F` / `#FF803E` oranges are already coherent. The largest visual gain is a calmer neutral ladder, not a new accent hue.
- Candidate neutral ladder (sRGB hex, intended for prototyping and visual review):

  | Role | Light | Dark | Reasoned use |
  |---|---:|---:|---|
  | Canvas | `#FFFFFF` | `#0B0E14` | Keep the fixed anchors. |
  | Subtle surface | `#F7F7F5` | `#151719` | Slight warmth without an obvious peach/brown cast. |
  | Raised surface | `#FFFFFF` | `#1C2024` | Separate elevation from hue. |
  | Field | `#FFFFFF` | `#111418` | Quiet input interior distinct from a dark card. |
  | Primary text | `#181814` | `#F6F3EE` | Warm-neutral, measured at 17.80:1 on light canvas; dark equivalent should be rechecked per actual surface. |
  | Muted text | `#5F5B55` | `#B9B3AA` | Light candidate measures 6.74:1 on white. |
  | Interactive border | `#858077` | `#7D7972` | Light candidate measures 3.92:1 on white; validate dark value against both field and surrounding surface. |
  | Divider | `#E4E0DA` | `#35383C` | Decorative separation only; do not reuse where boundary contrast conveys a control. |
  | Brand solid | `#FF681F` | `#FF803E` | Keep current orange identity. |
  | On-brand text | `#18130F` | `#18130F` | Measures 6.37:1 on light orange; independently recheck on dark orange. |
  | Brand text/link | `#9F3A0B` | `#FF9A66` | Light candidate measures 6.81:1 on white; dark candidate needs per-surface verification. |

- The contrast numbers above were independently calculated with the WCAG relative-luminance formula for the stated pairs; WCAG AA requires 4.5:1 for ordinary text and 3:1 for large text. — [W3C WAI, Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (accessed 2026-10-13)

### Gaps
- “Premium” has no standards definition. The recommendation to reduce chroma and reserve orange is a subjective visual judgment grounded in the cited systems’ hierarchy principles, and still needs review in real Serein components and on representative displays.
- The candidate palette is deliberately measured, not implementation-ready: hover/pressed/disabled pairs and every text/background pair must be checked after component mapping, because compliance attaches to rendered pairings rather than isolated tokens.

## Should semantic statuses use distinct tinted fills instead of peach variants?

### Takeaway
Yes. Give success, warning, error, and information their own low-chroma fill, readable text, and optional border families; keep orange for brand action and warning/pending only where the words make the meaning explicit. Distinct fills improve scanning, but text/iconography must continue to carry the state.

### Cited Findings
- Radix recommends distinct semantic scales: red families for error, green/teal/jade families for success, yellow/amber/orange for warning, and blue/indigo/sky/cyan for information. — [Radix Colors, “Composing a color palette”](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette) (accessed 2026-10-13)
- Spectrum says color is used for both semantic and non-semantic purposes and should make important actions, states, and messages stand out. — [Adobe Spectrum, “Colors”](https://spectrum.adobe.com/page/using-color) (accessed 2026-10-13)
- WCAG 1.4.1 does not allow hue alone to carry information; the Non-text Contrast guidance gives a star-rating example where hue-only differentiation can fail Use of Color. — [W3C WAI, Understanding SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (accessed 2026-10-13)

### Inferences
- Candidate semantic ramps (sRGB hex):

  | Meaning | Light fill / text / border | Dark fill / text / border | Measured text contrast |
  |---|---|---|---:|
  | Success | `#E9F7EF` / `#1F6548` / `#A8D8BD` | `#142820` / `#8AD3AC` / `#376B55` | 6.31:1 light; 8.86:1 dark |
  | Warning/pending | `#FFF4DC` / `#87520B` / `#E3BA6A` | `#332711` / `#FFD28A` / `#856A38` | 5.93:1 light; 10.31:1 dark |
  | Error | `#FDECEF` / `#A1263D` / `#E7A9B4` | `#32171D` / `#FF9CAF` / `#824451` | 6.44:1 light; 8.33:1 dark |
  | Information | `#EAF2FF` / `#285E9B` / `#ABC8EB` | `#15243A` / `#9FC8FF` / `#46698E` | 5.89:1 light; 9.05:1 dark |

- These borders are quiet aesthetic edges, not guaranteed component-identification boundaries: several light borders are below 3:1 against white, and two dark candidates are just below 3:1 against the proposed dark surface. That is acceptable only where the labeled text/icon already identifies the badge and the border conveys no required state. Controls and state indicators need separately qualified 3:1 boundaries.
- Keep the green footprint minimal: success-only, low-chroma tint, no general decorative use. This respects the user’s fixed color direction while preventing a “Delivered” status from reading as another orange/pending badge.

### Gaps
- Cultural semantics vary. The red/green/amber/blue mapping is a common Western convention described by Radix, not a universal meaning system; localized user research can still justify different mappings.
- Color-vision simulation and high-contrast/forced-colors behavior should be verified on the final components; distinct hue families alone are insufficient evidence of accessibility.

## How can soft-border controls preserve required 3:1 contrast, and is a visible border always mandatory?

### Takeaway
Use a strong boundary only where the boundary is what lets a user find or understand the control. A border is not universally mandatory: readable button text or an adequately contrasting icon can identify some controls, while an empty text field generally needs its field fill or perimeter to differ from the adjacent surface by at least 3:1.

### Cited Findings
- WCAG 1.4.11 requires 3:1 contrast for visual information needed to identify UI components and states. Its guidance explicitly says a control does not require a visible hit-area boundary when contrasting text or an icon already identifies the control. — [W3C WAI, Understanding SC 1.4.11, lines 56–65](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (accessed 2026-10-13)
- When a boundary is the only visual means of identifying the control, that boundary must have sufficient contrast; the guidance’s input example uses `#767676` against white. — [W3C WAI, Understanding SC 1.4.11, lines 66–73](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (accessed 2026-10-13)
- A filled control can pass where the fill itself contrasts with its surroundings; an intermediate low-contrast border can be ignored when it does not interfere with identifying the component. — [W3C WAI, Understanding SC 1.4.11, lines 68–79](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (accessed 2026-10-13)
- Radix reserves one step for subtle non-interactive borders, a stronger step for interactive borders/focus rings, and a still stronger step for hovered interactive borders. — [Radix Colors, “Understanding the scale”](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) (accessed 2026-10-13)

### Inferences
- Serein’s existing light interactive border `#7C8492` measures 3.77:1 against white. Its dark border `#707F95` measures 4.75:1 against `#0B0E14` and 4.49:1 against `#10151E`. Those are good compliance-oriented anchors; the proposed warmer equivalents should not be adopted until their actual adjacent pairs are at least 3:1.
- A “soft” control should derive softness from a 1px stroke, restrained chroma, radius, and low-key shadow—not from dropping required boundary luminance below 3:1. Decorative dividers may remain much quieter (`#DFE3E9` is only 1.29:1 against white) because they are not necessarily required to identify a control or state.
- Filled text buttons can omit a perimeter when their label clearly identifies them. Empty fields, unchecked checkboxes, icon-only controls, slider tracks/thumbs, and state marks need particular pair-by-pair review because their geometry or boundary often is the information.

### Gaps
- Whether each individual Serein border is normative information depends on the rendered component and adjacent colors. A token-level audit cannot settle this without mapping tokens to every control state.

## Is a subtle inset focus treatment as safe as an external outline?

### Takeaway
An external 2px outline with separation is the safest default across varied component fills. An inset treatment can comply, but it has stricter adjacency and area constraints: WCAG’s AAA guidance shows that a 2px inset does not provide the same area as a 2px perimeter and may need to be 3px thick.

### Cited Findings
- WCAG 2.2 Level AA Focus Visible requires a visible keyboard focus indicator; W3C also notes that focus indicators are subject to Level AA Non-text Contrast. — [W3C WAI, Understanding SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) (updated 2026-09-06; accessed 2026-10-13)
- For an outside indicator, contrast is measured against the page/surface behind the component; for an inside indicator, it is measured against adjacent colors within the component. A border on the visible edge can need contrast with both sides. — [W3C WAI, Understanding SC 1.4.11, lines 89–110](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (accessed 2026-10-13)
- WCAG 2.2 Focus Appearance is Level AAA. It asks for an indicator area at least as large as a 2 CSS-pixel perimeter and a 3:1 change between focused and unfocused pixels. The W3C example states that a 2px inset fails its area test while a 3px inset can pass. — [W3C WAI, Understanding SC 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) (accessed 2026-10-13)
- W3C recommends a two-color focus indicator when backgrounds vary, because one line can preserve contrast across light and dark surroundings. — [W3C WAI, Understanding SC 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) (accessed 2026-10-13)

### Inferences
- Keep the current architecture (`outline: 2px solid; outline-offset: 3px`) as the base. Its geometry is simple, does not consume the component interior, and targets the stronger AAA area model even though Serein’s conformance target may only require AA.
- The current light/dark focus colors (`#181B22` and `#F6F7F9`) contrast strongly with their canvases (17.23:1 and 18.02:1). They must also be checked anywhere a control sits on a raised or colored surface.
- A subtle inset glow or shadow may accompany focus for polish, but should not be the sole qualified indicator unless the part with 3:1 adjacent contrast has enough area. For brand-orange controls, a two-color ring (for example a 2px near-black/near-white qualified line plus a 1px opposite-color gap) is safer than trying to make one orange focus color work everywhere.

### Gaps
- WCAG AA does not prescribe one exact focus-ring thickness. The 2px perimeter sizing is from Level AAA Focus Appearance; adopting it is a robust design target, not an AA requirement.

## How should OKLCH, wide gamut, and fallbacks be introduced without a library rewrite?

### Takeaway
Keep reviewed sRGB hex values as the baseline and layer OKLCH or Display-P3 overrides only where the extra gamut creates a visible benefit. This makes gamut work a progressive enhancement and avoids turning palette modernization into a library switch.

### Cited Findings
- CSS Color 4 defines `oklch()` and uses OkLCh for perceptual gamut mapping; its current Candidate Recommendation Draft describes chroma reduction to bring out-of-gamut colors into the destination gamut while holding hue and lightness. — [W3C CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) (accessed 2026-10-13)
- MDN defines OKLCH as lightness, chroma, and hue, and documents relative-color syntax for deriving channels from an origin color. — [MDN, `oklch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch) (accessed 2026-10-13)
- Radix’s custom-palette output includes both wide-gamut definitions and closest sRGB fallbacks, noting that P3 alpha blending differs from sRGB. — [Radix Colors, “Custom palettes”](https://www.radix-ui.com/colors/docs/overview/custom-palettes) (accessed 2026-10-13)
- Media Queries Level 4 recommends an ascending pattern: establish an sRGB base, then override for P3-capable displays. — [W3C Media Queries Level 4, `color-gamut`](https://www.w3.org/TR/mediaqueries-4/#color-gamut) (accessed 2026-10-13)

### Inferences
- Minimal adoption pattern: declare the tested hex token first, then an `oklch()` override inside `@supports (color: oklch(50% 0.1 30))`; reserve `@media (color-gamut: p3)` or `color(display-p3 …)` for the orange solid/illustrative accents that visibly benefit. Keep semantic contrast-critical tokens in sRGB until both fallback and enhanced pairs are independently measured.
- Do not generate all states with `color-mix()` or relative OKLCH and assume they pass. Perceptual spacing helps palette consistency, but WCAG compliance still depends on the final rendered foreground/background pair.
- The current hex-only implementation is a valid, lower-risk baseline. Wide gamut is a refinement, not evidence of a more accessible or more “premium” interface.

### Gaps
- Browser/device support can change; compatibility should be checked against Serein’s declared browser matrix at implementation time. No browser-market-share claim is made here.
- The candidate hex values are sRGB. Converting them to OKLCH mechanically would preserve appearance, not create a better scale; a real wide-gamut ramp needs visual evaluation and contrast remeasurement.

## Evidence-to-decision table

### Takeaway
The standards determine contrast and focus constraints; they do not determine Serein’s aesthetic. The decisions below keep those categories explicit.

### Cited Findings

| Evidence | Decision for Serein | Status / tradeoff |
|---|---|---|
| Scale roles separate backgrounds, controls, borders, solids, and text. — [Radix](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) | Expand role aliases only where a component state needs them; do not import a whole palette library. | Architecture inference, not a WCAG rule. |
| Saturated gray surfaces can clash with colorful UI in dark mode. — [Radix](https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette) | Use near-neutral dark surfaces and let orange/semantic colors carry chroma. | Aesthetic judgment backed by system guidance. |
| Semantic color should be purposeful and structured by theme/contrast. — [Spectrum](https://spectrum.adobe.com/page/using-color) | Replace all-peach status fills with low-chroma success/warning/error/info families. | Subjective hierarchy choice; labels remain mandatory. |
| Ordinary text needs 4.5:1; large text 3:1. — [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Require 4.5:1 for all ordinary badge/control copy; candidate pairs target roughly 5.9:1 or higher. | Normative Level AA requirement. |
| Required component/state visuals need 3:1, but every control need not show its full hit-area boundary. — [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Keep ≥3:1 input/check/control boundaries; allow quiet decorative badge/card borders where content already identifies them. | Normative Level AA plus component-specific interpretation. |
| Focus must be visible at AA; 2px-perimeter area is defined at AAA. — [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible), [WCAG 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) | Retain a 2px external outline with 3px offset as the default; use ≥3px for sole inset indicators if targeting the AAA area model. | AA requirement and AAA robustness target clearly separated. |
| CSS supports perceptual/wide-gamut colors with gamut mapping and progressive gamut queries. — [CSS Color 4](https://www.w3.org/TR/css-color-4/), [Media Queries 4](https://www.w3.org/TR/mediaqueries-4/#color-gamut) | Hex baseline first; scoped OKLCH/P3 overrides later. | Engineering risk control; no accessibility benefit assumed. |

### Inferences
- Highest-value sequence: (1) preserve the strong current accessibility anchors, (2) introduce distinct semantic fills, (3) tune neutral surfaces, (4) optionally add wide-gamut enhancement.
- The measured palette is a candidate specification for prototype review, not a claim that standards or planetary symbolism prescribe these hex values.

### Gaps
- Final sign-off still requires state-by-state contrast checks, forced-colors review, keyboard focus review, and visual comparison on the actual component catalog in both themes.
