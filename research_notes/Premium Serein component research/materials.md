# Premium Serein component materials

## How should resting, interactive, and transient surfaces differ?

### Takeaway
Use three semantic planes rather than decorating every container: a canvas for page framing, a quiet solid field/card plane for resting content, and a raised plane only for popups, menus, dialogs, drawers, and transient feedback. Interactive state belongs primarily in color/tonal changes and focus treatment; elevation belongs to the layer relationship.

### Cited Findings
- Apple’s Dark Mode guidance uses distinct base and elevated background sets: dimmer base colors make background interfaces recede, while brighter elevated colors bring foreground interfaces forward. Apple also recommends adaptive label colors rather than fixed values for dark appearance. The page itself does not provide a publication date. — [Apple Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode)
- Apple defines material selection semantically, not by the tint it happens to produce: thin material for interactive elements or selected items, regular material for separating major sections, and thick material where stronger separation and legibility are needed. Apple warns that material appearance changes with system settings. — [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Fluent 2 names solid as its most common material. It limits acrylic to transient, light-dismiss surfaces such as popovers and menus; smoke dims the underlying interface to signal a blocking modal. — [Fluent 2 Material](https://fluent2.microsoft.design/material)
- Fluent elevation uses paired key and ambient shadows: the sharper directional shadow defines edges and the diffuse shadow implies distance. Its published use cases put low elevation on cards and higher elevation on command dropdowns, hover cards, panels, and dialogs. — [Fluent 2 Elevation](https://fluent2.microsoft.design/elevation/)
- Spectrum says most components should separate through color change or modal overlay; it reserves shadows for transient, elevated, dismissible components such as dropdown menus. Its one default shadow grows more opaque in dark themes to remain perceptually consistent. — [Spectrum Object styles](https://spectrum.adobe.com/page/object-styles/)
- Spectrum’s background layers are intended for large layout regions rather than individual component backgrounds. Their values reverse across modes so dimensionality persists: lighter layers advance in light and dark themes while the base surrounds content. — [Spectrum Using color](https://spectrum.adobe.com/page/using-color/)

### Inferences
- **Observed Serein:** `--dp-canvas`, `--dp-surface`, `--dp-raised`, `--dp-field`, and three shadow tiers already provide the right vocabulary, but the generic `Card` always receives `--dp-shadow-surface`. In the screenshots, the large settings card therefore floats even though it behaves as persistent page content. Treat ordinary cards as resting surfaces: tonal fill plus divider, no shadow. Reserve `--dp-shadow-popup` for menus/selects/tooltips/toasts and `--dp-shadow-dialog` for blocking overlays. This follows the common Spectrum/Fluent division rather than copying any one platform’s values.
- In light mode, use canvas `#fff`, a subtly tinted resting region (`--dp-surface`), and white raised overlays. In dark mode, the current ordering is sound: near-black canvas `#0B0E14`, darker field `#10151E`, surface `#151A23`, raised `#1B2230`. The card can keep the raised tonal value while dropping or greatly reducing persistent shadow; tonal separation remains legible even when shadows are hard to perceive.
- “Serein” can appear as a near-imperceptible cool-neutral tonal progression and soft settling motion. It does not require rain, galaxy, weather, or glass illustration.

### Gaps
- Apple’s material guidance is platform/system-renderer specific and does not establish that CSS backdrop blur is appropriate for ordinary websites. The recommendation to use solid web surfaces and restrict blur is an inference from Apple’s semantic guidance plus Fluent’s explicit transient-use rule.

## How can Serein avoid heavy outlines while retaining accessibility?

### Takeaway
Reduce decorative borders, not the visual information required to identify controls. Keep an accessible control edge or fill, a separate 2 px focus indicator, and explicit text/icon state. Let whitespace, tonal fill, and typography carry grouping; let borders identify fields and selected/error states.

### Cited Findings
- WCAG 2.2 requires visual information needed to identify an active UI component and its state to reach 3:1 against adjacent colors. Thin anti-aliased lines can appear fainter than their nominal color, so W3C advises avoiding especially thin shapes or exceeding the threshold. — [W3C Understanding SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- WCAG’s own examples say a text input may use a bottom border or full border as its identifying cue, and that cue must reach 3:1. A button can be identifiable through context, position, and text treatment without a contrasting stroke, though a conforming outline can aid recognition. — [W3C Understanding SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- Small text needs at least 4.5:1 contrast; large text needs 3:1. Inactive controls are exempt, but placeholder text is included in the text requirement. — [W3C Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- Spectrum uses 1 px borders for fields, tags, popovers, and dividers; 2 px is for stronger emphasis and keyboard focus. Spectrum’s text-field guidance keeps visible labels, recommends top labels for long/localized/responsive copy, and notes that quiet fields work only where layout already makes the controls easy to parse. The component changelog records an accessibility border update on February 26, 2020 and version 9.0.0 on February 24, 2023. — [Spectrum Object styles](https://spectrum.adobe.com/page/object-styles/); [Spectrum Text field](https://spectrum.adobe.com/page/text-field/)
- Fluent separates pointer and keyboard states: interaction typically changes tonal color while focus adds a thicker container stroke. Fluent also advises text plus a visible indicator for toggle state and requires 4.5:1 button text and 3:1 button icons in all active states. — [Fluent 2 Color](https://fluent2.microsoft.design/color); [Fluent 2 Button](https://fluent2.microsoft.design/components/web/react/core/button/usage/)
- Spectrum uses theme-specific foreground/border tokens for contrast-sensitive content, while static colored backgrounds pair with whichever of black or white supplies contrast. Theme-specific interaction colors darken in light themes and lighten in dark themes. — [Spectrum Using color](https://spectrum.adobe.com/page/using-color/)

### Inferences
- **Observed Serein:** all fields and secondary buttons use `--dp-border` (`#7C8492` light, `#707F95` dark). This makes the demo easy to read but visually outline-heavy because the same strong edge repeats across persistent cards, every field, buttons, selectors, badges, and dividers. Split the role into `stroke-accessible` for field perimeters/selected state and `stroke-subtle` for grouping/dividers. Do not weaken a field edge below 3:1 unless another clear identifying cue, such as a contrast-qualified fill boundary, replaces it.
- Secondary buttons can lose their always-on high-contrast perimeter where context and label styling clearly identify them; use a subtle neutral fill at rest, a stronger fill on hover/press, and retain the 2 px focus ring. Keep outlined secondary buttons where they sit alone and could be mistaken for text.
- Serein’s current `outline: 2px solid ...; outline-offset: 3px` is structurally good. Keep it independent of orange so primary color remains an action cue, and validate the ring against both canvas and raised/card backgrounds. The current near-black/light focus tokens are sensible candidates.
- Preserve explicit field labels and helper/error copy. Do not replace them with placeholder-only fields. The current screenshots already model this well.

### Gaps
- This review did not run contrast calculations for every token pair. Before implementation, calculate default, hover, pressed, selected, focus, error, success, and placeholder combinations in both themes; WCAG thresholds are not safely inferred by eye.

## What typography and icon treatment create one product language?

### Takeaway
Keep Plus Jakarta Sans, narrow the hierarchy to a small set of repeatable roles, and align one icon family by canvas, stroke, cap/join, and optical weight. Premium craft comes from baseline and role consistency more than extra styles.

### Cited Findings
- Spectrum says hierarchy can use size, weight, and color: larger, heavier, darker text carries “need-to-know” information; smaller, lighter text carries supporting detail. Its current web body scale uses 14 px/150% for small body and 16 px/150% for medium body. — [Spectrum Typography system](https://spectrum.adobe.com/foundations/typography/typography-system); [Spectrum Body typography](https://spectrum.adobe.com/page/body)
- Spectrum notes that its variable font’s updated baseline metrics improve alignment with icons, components, and avatars. It also notes that a slightly thinner weight may improve dark-mode readability, but frames that as a future tuning example rather than a universal rule. — [Spectrum Typography overview](https://spectrum.adobe.com/foundations/typography/overview)
- Apple’s typography guidance recommends a minimal number of typefaces and maintaining hierarchy through weight, size, and color. It advises regular, medium, semibold, or bold over ultra-light/thin/light weights, especially for small text. The accessible indexed page available in search is Apple’s Japanese localization. — [Apple Typography](https://developer.apple.com/jp/design/human-interface-guidelines/typography)
- Spectrum 2 icons are mostly monochrome outlines so status badges can use color selectively. The system uses consistent metaphors, predefined key shapes, and a 1.5 px stroke within a 20 px canvas. It cautions against resizing icons designed for a fixed canvas because scaling changes stroke appearance. — [Spectrum Icon fundamentals](https://spectrum.adobe.com/foundations/icons-and-illustrations/icon-fundamentals); [Spectrum Using icons](https://spectrum.adobe.com/foundations/icons-and-illustrations/using-icons)
- Apple advises consistent icon size, detail, line weight, and perspective across an interface; simple, familiar metaphors are easier to recognize than fine-detail symbols. The accessible indexed page available in search is Apple’s Japanese localization. — [Apple Icons](https://developer.apple.com/jp/design/human-interface-guidelines/icons)
- Spectrum requires non-text icon contrast of 3:1 and suggests subtle fills in light and dark themes to preserve legibility without overpowering the interface. — [Spectrum Using icons](https://spectrum.adobe.com/foundations/icons-and-illustrations/using-icons)

### Inferences
- **Observed Serein:** Plus Jakarta Sans is already cohesive and should stay. Consolidate the visible scale into about five roles: display (the 52-ish px landing statement), page/section title (24 px), body/control value (16 px), label/action (14 px semibold), and helper/meta (13 px regular). Avoid adding display variants to component internals.
- The existing 650 weight is distinctive but repeated on buttons, labels, badges, titles, and navigation, flattening hierarchy. Use 600/650 for action labels and local headings; use 500/regular for field labels or secondary metadata where contrast and placement already communicate structure. Retest dark-mode small text after any weight reduction.
- Normalize current inline SVGs to one 20 or 24 px source grid, one default stroke (roughly 1.75–2 CSS px at the chosen grid), round caps/joins, and consistent optical bounds. Keep text labels for non-universal actions. Orange icons should identify action/selection; green/red should retain semantic status only.

### Gaps
- Plus Jakarta Sans has different metrics from Adobe Clean, SF Pro, and Segoe UI. The cited sizes are hierarchy references, not direct copy values; visual and accessibility testing should decide final Serein sizes and line heights.

## What motion makes the interface feel settled and cohesive?

### Takeaway
Use short, state-explaining motion: color/fill transitions for controls, a tiny press displacement or scale, and restrained fade/translate for transient surfaces. Motion should reveal causality and then get out of the way.

### Cited Findings
- Spectrum describes motion as purposeful, intuitive, and seamless: it should connect states, direct attention, or give feedback without slowing people down. It uses ease-out for entering/fading in, ease-in for exiting, and ease-in-out for larger movement. Its published duration ramp classifies 130–220 ms as micro motion and 250–500 ms as macro motion. The page changelog lists version 5.0.0 dated April 20, 2019. — [Spectrum Motion](https://spectrum.adobe.com/page/motion/)
- Fluent says motion should identify the next step, communicate UI changes, and maintain consistent physical behavior. — [Fluent 2 Motion](https://fluent2.microsoft.design/motion)
- Spectrum 2 uses color progression for default, hover, down, and keyboard focus, and permits a size change for some down states to make controls feel pressed. Accent emphasis is best for a narrowly scoped goal or one clear call to action. — [Spectrum States](https://spectrum.adobe.com/foundations/behavior/states)
- Apple’s accessibility evaluation guidance says scaling, spinning, peripheral movement, parallax, animated blur, and depth-of-field can trigger discomfort; apps should respect reduced-motion settings and disable or substitute depth simulation when requested. — [Apple Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria)

### Inferences
- **Observed Serein:** `140ms` fast, `240ms` enter, and `cubic-bezier(.16,1,.3,1)` are within a disciplined micro/entry range. Keep them. Add a paired exit duration near 120–160 ms rather than using the same enter timing in reverse.
- Keep button press travel at 1 px or use an extremely small scale reduction, never both strongly. Menus/select lists can enter with opacity plus 4–6 px translation over ~180–220 ms; dialogs can use opacity plus a very small scale over ~220–260 ms. Cards should not animate merely because they exist.
- Expand the current reduced-motion rule beyond buttons: remove transforms from menus/dialogs/drawers, disable spinner rotation where a static status icon and live text still communicate progress, and retain instantaneous color/fill state changes.

### Gaps
- The repository excerpts show transitions on buttons and a reduced-motion override for button transforms, plus spinner/skeleton overrides. They do not establish all Base UI overlay transition behavior; implementation should inspect rendered state attributes before choosing selectors.

## What should a consumer web UI avoid copying from native glass systems?

### Takeaway
Do not make blur the brand. Native glass is supported by system compositing, adaptive vibrancy, wallpaper/window context, accessibility settings, and platform conventions that a browser component library does not automatically inherit.

### Cited Findings
- Apple explicitly says to choose material by semantic usage rather than apparent color, because settings can change appearance and behavior; thicker material may be needed for fine-detail contrast. — [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Fluent classifies acrylic as a mode-aware, semi-transparent frosted material for transient, light-dismiss surfaces, while solid is the common material for general UI. It also says to check technical limitations before selecting material. — [Fluent 2 Material](https://fluent2.microsoft.design/material)
- Spectrum discourages transparency as a substitute for theme colors; it limits transparency mainly to overlays, drop shadows, and selection highlights. — [Spectrum Using color](https://spectrum.adobe.com/page/using-color/)
- Apple’s current color guidance notes that Liquid Glass samples content behind it and becomes more opaque for larger elements to preserve legibility. The page changelog snippet returned by Apple’s index includes recent Liquid Glass changes, but no reliable publication date for this specific color page was exposed. — [Apple Color](https://developer.apple.com/design/human-interface-guidelines/color)

### Inferences
- The current `.dp-navigation-surface` is a defensible opt-in because it is limited to one navigation plane, has a solid fallback, honors reduced transparency/contrast/forced colors, and keeps nested content opaque. Do not extend it to cards, fields, selectors, or badges.
- On a consumer website, blur can make text contrast depend on scroll position and background content, increase GPU cost, and visually compete with Serein’s orange action cue. The safer Serein signature is tonal depth, crisp type, warm action fill, and soft short-lived motion.

### Gaps
- The official design systems do not provide browser performance budgets for backdrop blur. Performance cautions above are implementation inferences and should be verified on representative low-power devices.

## Five concrete Serein improvements

### Takeaway
These changes target the visible demo and current component source while preserving the stated palette and font constraints.

### Cited Findings
- **1. Make persistent cards tonal, not floating.** Remove `--dp-shadow-surface` from the default noninteractive `Card`; keep a low-contrast divider edge and the current raised tone. Reserve popup/dialog shadows for transient layers. This follows Spectrum’s shadow reservation and Fluent’s elevation use-case ladder. — [Spectrum Object styles](https://spectrum.adobe.com/page/object-styles/); [Fluent 2 Elevation](https://fluent2.microsoft.design/elevation/)
- **2. Split accessible control strokes from subtle structural dividers.** Keep a contrast-qualified field edge and focus ring, but soften card/divider/badge outlines. Let secondary buttons use tonal rest/hover fills in grouped action areas, retaining an outline where context is weak. — [W3C SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html); [Fluent 2 Button](https://fluent2.microsoft.design/components/web/react/core/button/usage/)
- **3. Give each control family a consistent state ladder.** Primary orange: static orange fill with dark label, perceptually darker hover in light and lighter hover in dark, pressed displacement, independent focus ring. Neutral controls: quiet rest, tonal hover, stronger pressed/selected fill. Error/success use icon or text plus color. — [Spectrum Using color](https://spectrum.adobe.com/page/using-color/); [Spectrum States](https://spectrum.adobe.com/foundations/behavior/states); [Fluent 2 Color](https://fluent2.microsoft.design/color)
- **4. Tighten type roles and icon construction.** Retain Plus Jakarta Sans but reduce semibold saturation across labels and metadata; normalize icons to one grid/stroke/cap system and reserve chroma for action or semantic status. — [Spectrum Typography system](https://spectrum.adobe.com/foundations/typography/typography-system); [Spectrum Icon fundamentals](https://spectrum.adobe.com/foundations/icons-and-illustrations/icon-fundamentals)
- **5. Build a complete reduced-motion-aware overlay pattern.** Keep the existing 140/240 ms tokens, add a faster exit, and use opacity plus only a few pixels of travel for menu/select/dialog entry. Apply reduced-motion handling to every transient component, not only buttons/spinners/skeletons. — [Spectrum Motion](https://spectrum.adobe.com/page/motion/); [Apple Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria)

### Inferences
- Priority order: (1) surface/elevation semantics, (2) stroke-role split with contrast tests, (3) state ladders, (4) typography/icons, (5) motion. The first two will produce the largest visible refinement in both supplied screenshots without changing brand palette or information architecture.
- The restricted green should remain a success/delivered signal only. The orange filled primary with dark text should remain the dominant action. The near-black dark canvas and white light canvas should remain the two anchors.

### Gaps
- Menu, selector, badge, and card examples were observed in source and screenshots, but this research did not interact with the running Storybook/app. Hover, press, focus, open/close, and reduced-motion behavior need browser verification during implementation.

## Pitfalls to avoid

### Takeaway
The premium result depends on subtraction and role clarity, not more effects.

### Cited Findings
- Avoid glass or blur on persistent cards and fields; official systems reserve translucent materials or shadow emphasis for specific semantic layers. — [Fluent 2 Material](https://fluent2.microsoft.design/material); [Spectrum Object styles](https://spectrum.adobe.com/page/object-styles/)
- Avoid weakening every outline at once; component identification and state cues still require 3:1 when they carry essential visual information. — [W3C SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- Avoid color-only badges or statuses; pair color with text and, where useful, a consistent icon. — [Spectrum Using color](https://spectrum.adobe.com/page/using-color/); [Fluent 2 Color](https://fluent2.microsoft.design/color)
- Avoid multiple accent actions of equal weight. Fluent recommends one primary action per layout, and Spectrum reserves accent emphasis for essential or narrowly scoped goals. — [Fluent 2 Button](https://fluent2.microsoft.design/components/web/react/core/button/usage/); [Spectrum States](https://spectrum.adobe.com/foundations/behavior/states)
- Avoid arbitrary icon resizing or mixed stroke languages. — [Spectrum Using icons](https://spectrum.adobe.com/foundations/icons-and-illustrations/using-icons)
- Avoid ornamental parallax, animated blur, galaxy/weather imagery, or motion that does not explain a state change. — [Apple Reduced Motion evaluation criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria); [Spectrum Motion](https://spectrum.adobe.com/page/motion/)

### Inferences
- Do not make “evening rain” literal. Express it through quiet neutral temperature, clear hierarchy, and motion that settles quickly.

### Gaps
- None material to this scope.
