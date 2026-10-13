# Premium product and component craft for Serein

## What do the official references actually demonstrate?

### Takeaway
The useful common ground is disciplined hierarchy and complete interaction states. These sources do not establish an objectively best aesthetic; they offer specific decisions to test against Serein's orange, white/near-black, Plus Jakarta identity. Research inspected 2026-10-13.

### Cited Findings
- **Linear, documented (2026-03-12):** Navigation recedes relative to task content; icons are smaller and less frequent; separators are softened or removed; its former blue-ish palette moves toward less-saturated gray. This is explicitly a product refresh, not a marketing-homepage treatment. — [Official design account](https://linear.app/now/behind-the-latest-design-refresh)
- **Linear, observed:** Opened the article's sidebar comparison at full image size in the browser. The updated sidebar has a rounded neutral selected row, smaller icons, muted inactive text, and greater space between navigation groups. The image annotates those changes. It does not prescribe global compactness: group spacing increases while icons shrink. — [Official annotated product comparison](https://linear.app/now/behind-the-latest-design-refresh#don't-compete-for-attention-you-haven't-earned)
- **Linear, documented (2024):** Designers specifically aligned labels, icons, and buttons horizontally and vertically, and tested the hierarchy across different view types. — [Redesign process](https://linear.app/now/how-we-redesigned-the-linear-ui)
- **Untitled UI, documented:** Buttons distinguish primary/secondary/tertiary, leading/trailing/icon-only, loading and disabled variants; loading spinners match the button's size and color and disable interaction. — [Button examples and behavior](https://untitledui.com/react/components/buttons)
- **Untitled UI, documented:** Dropdowns offer sections, separators, section headers, icons, keyboard addons, selected-item handling, and arrow/Enter/Escape navigation. These are affordances, not a reason to add content to Serein's existing API. — [Dropdown component](https://untitledui.com/react/components/dropdowns)
- **Untitled UI, version caveat:** Its current upgrade page describes tighter navigation spacing and a new 32px extra-small button; the indexed button page still describes four sizes. Treat exact size claims as version-specific, not universal rules. — [Upgrade documentation](https://www.untitledui.com/react/docs/upgrade)
- **Raycast, documented:** Lists group similar data into titled sections and support loading, search, and contextual actions. Actions can have keyboard shortcuts; the UI guidance says render promptly and show loading when content is unavailable. — [List](https://developers.raycast.com/api-reference/user-interface/list), [UI guidance](https://developers.raycast.com/api-reference/user-interface)
- **Radix Themes, documented:** Separate background, interactive, border, solid-fill, and accessible-text steps exist for both accent and gray scales; panel and form backgrounds are separate roles. Gray hue can be selected independently of accent. — [Color system](https://www.radix-ui.com/themes/docs/theme/color)

### Inferences
| Reference | Transferable craft | Serein comparison | Do not copy |
|---|---|---|---|
| Linear product | Quieter chrome, precise optical alignment, task priority | Dark raised surface and control edges dominate more than needed | Product layout, brand, universal tiny controls |
| Untitled UI | Every state has a considered visual role | Existing loading/disabled/selected behavior is a sound base; presentation still needs refinement | Purple brand, extra API surface, showcase volume |
| Raycast | Rapid response, contextual menu organization | Inspect open menus and transitions, not just the default landing view | Launcher layout or shortcut-heavy chrome everywhere |
| Radix Themes | Semantic tonal roles instead of one gray for every job | Existing border/divider separation is useful; dark chroma and role strength need tuning | Replacing Serein tokens or stack wholesale |

### Gaps
- No measured usability result or proof of “premium” quality was supplied by these references. Design claims are the authors' explanations.
- Linear's actual annotated comparison was visually inspected. Untitled UI and Raycast findings above are documentation-based, not claimed visual observations. A second hidden browser tab was blocked in the subagent context; no workaround attempted. Raycast's list documentation includes an official screenshot, but it was not successfully rendered for visual inspection here.
- Untitled UI's input page could not be fetched (content-size limit). Do not attribute detailed form spacing rules to it.

## What currently reads underfinished in Serein?

### Takeaway
The screenshots already have restraint, recognizable typography, clear orange actions, and consistent radii. The remaining weakness is repeated visual weight and some unresolved component alignment; adding decorative effects would leave those defects intact.

### Cited Findings
- **Observed locally:** The light screenshot gives every input, secondary action, and theme switch a conspicuous outline. The dark screenshot gives the form a blue-slate panel with strong blue-gray input edges. The eye keeps noticing containers. — [Light screenshot](../../.impeccable/review/serein-light-1440.png), [Dark screenshot](../../.impeccable/review/serein-dark-1440.png)
- **Source fact:** Dark canvas `#0B0E14`, raised `#1B2230`, field `#10151E`, border `#707F95`, muted text `#B8C1CF`; the 11/14/20 through 27/34/48 RGB values explain the blue cast. Light border is `#7C8492`; divider is separately `#DFE3E9`. — [Tokens](../../trial/src/tokens.css)
- **Source fact:** Buttons and inputs use 48px minimum height; button font is 14px/650 versus input 16px. The form repeats 22px gaps; card heading has 26px bottom space; the outer page uses a 104px header. — [Components](../../trial/src/components.tsx), [Studio layout](../../trial/reference/src/serein-studio.css)
- **Source fact and screenshot observation:** Switch descriptions use the same 32px indentation as checkbox descriptions. A switch is 42px wide plus a 12px row gap, so its text starts at 54px; its helper text begins 22px too far left. Checkbox width 20px plus gap 12px correctly equals 32px. — [Selection components](../../trial/src/selection.tsx), [Light screenshot](../../.impeccable/review/serein-light-1440.png)
- **Source fact:** Select and menu highlighted items get both a selected-tint fill and a 2px inset focus-colored outline, including pointer highlight. Select selection separately uses a bold label and an orange check. — [Select styles](../../trial/src/components.tsx), [Menu styles](../../trial/src/overlays.tsx)
- **Source fact:** Loading prepends an icon directly to button children without a reserved loading slot; disabled presentation is half-opacity. The current screenshot shows distinct labels for loading and unavailable states, but no sequential-state capture proves layout stability. — [Button implementation](../../trial/src/components.tsx)

### Inferences
- “Premium” here should mean better resolved relationships: task versus chrome, value versus label versus hint, selected versus highlighted, and apparent control size versus hit area.
- The form is legible but its repeated large outlined fields and wide inter-field gaps make it feel like a starter form. Tightening relationships inside each field group would help more than compressing everything uniformly.
- The current orange CTA treatment already has an inset highlight and shadow. Increasing gloss is unlikely to resolve the observed hierarchy issue.

### Gaps
- These are supplied screenshots, not proof of current runtime behavior. Interaction issues below are review targets unless confirmed by a runtime test.
- No change to target sizes should be proposed before checking the repository's accessibility commitments.

## Which changes are most worth testing without changing content, identity, or APIs?

### Takeaway
Six targeted refinements can address visible causes. They are design hypotheses, not externally proven rules or implementation authorization.

### Cited Findings
The implementation locations supporting these proposals are [tokens](../../trial/src/tokens.css), [core components](../../trial/src/components.tsx), [selection components](../../trial/src/selection.tsx), [overlays](../../trial/src/overlays.tsx), and [studio composition](../../trial/reference/src/serein-studio.css). Reference principles and their limits are recorded above.

### Inferences
1. **Make the dark tonal ladder nearly achromatic.** Preserve white light canvas and near-black dark canvas, but reduce blue chroma across dark raised/field/muted/border tokens together. Compare neutral charcoal candidates such as canvas `#0D0D0F`, field `#141416`, raised `#19191C` against the existing version; these are unvalidated candidate colors, not final values. Preserve filled orange and dark CTA text. Judge text and component contrast separately before accepting.
2. **Give edges different jobs.** Keep a clearly perceptible boundary for text inputs and selection controls, but make large panel outlines/dividers recede and use quiet styling for low-priority actions where the existing variant supports it. Do not blindly lower every border's contrast. Review the active field beside an idle field: focus should be a clear step up from rest.
3. **Fix internal field geometry before global density.** Align switch hint text to the switch label's 54px start, retain checkbox's 32px start, and align card heading, labels, inputs, and action footer to the same content inset. Test 6px label-to-input and 6px input-to-hint relationships, with 18–20px field-group gaps as candidates. Keep 48px targets initially; improve grouping first.
4. **Separate selection, hover, and keyboard focus.** Keep the select checkmark and selected weight; use a quiet neutral or very restrained warm highlighted row rather than a heavy ring on every pointer-hovered item. Retain an unmistakable keyboard indication and test keyboard and pointer separately using Base UI's supported state. Menus should feel like one floating surface with inset rows, not a stack of individually outlined controls. No new menu API is needed.
5. **Resolve action-state geometry.** Keep orange fills and dark labels. Verify that entering loading does not move adjacent buttons; reserve spinner space or preserve measured action width in the component's existing internal structure. Review disabled orange against light and dark backgrounds so it reads unavailable rather than as another action color. Keep existing non-interactive loading behavior.
6. **Use a small optical audit to finish the family.** Compare chevrons, checkmarks, action arrows, spinner, switch thumb, and status icon at actual size in light/dark. Normalize perceived stroke weight and baseline rather than forcing all SVGs to identical dimensions. Tighten utility chrome visually while preserving usable hit areas, and retain the present headline/copy. Verify all six refinements on form, menu, dialog, and table contexts before applying globally.

### Gaps
- Candidate values need rendered A/B review, contrast checks, focus inspection, loading-width checks, and narrow viewport checks. Nothing in this research justifies new content, a new brand, green decoration, hero glow, weather/galaxy scenes, or library API changes.
