# Flame & Ink foundations

This is a reference to the implemented Ritam UI system, not a new theme or token layer. The approved Flame & Ink identity uses Plus Jakarta Sans, orange priority actions with dark text, white and near-black canvases, restrained green, and crisp controls. The product retains its astrology-informed foundation as a symbolic approved basis; this document adds no personal data or new astrological prescriptions.

## Colour roles

Authoritative checkout source: `src/tokens.css`. Distributed values are available in the [machine-readable contract](../ai/contract.json) and [token stylesheet](../tokens.css).

| Role | Light | Dark / use |
| --- | --- | --- |
| Canvas | `#FFFFFF` | `#090A0C`; document background |
| Surface | `#F4F4F6` | `#14161B`; quiet contained regions |
| Text | `#111216` | `#F6F7F9`; default readable text |
| Muted text | `#5B5D66` | `#BEC0C7`; supporting copy, never the only state signal |
| Borders and dividers | `#858B95` / `#E3E4E8` | `#788292` / `#34373E`; field boundaries and separation |
| Priority action | `#FF681F` | same fill; pair with `--dp-on-orange` (`#141414`) |
| Priority hover / text | `#F45C14` / `#A83A0A` | `--dp-orange-text` becomes `#FF874D`; actionable links and emphasis |
| Success | `#28694F` | `#8AD3AC`; actual success only |
| Error | `#B4233C` | `#FF9CAF`; include explanatory text and field association |
| Focus | `#111216` | `#F6F7F9`; visible two-pixel outline |

Orange is the priority colour, not a general decoration. Primary orange fills use dark text; white text on orange is not an approved pairing. Success, error, selected state, and disabled state always need text, labels, or another non-colour cue.

## Type, controls and layout

The shared font token is `--dp-font`: Plus Jakarta Sans Variable, Plus Jakarta Sans, then a sans-serif fallback. The document theme belongs on `<html data-dp-theme="light|dark">`, and `dp-theme` belongs on `<body>` so portals inherit it. Defining component text uses 14px labels and buttons (buttons are weight 650), 16px text inputs, and 13px helper text. The workflow reference uses a 2rem page heading and 1.25rem section/legend heading; it is a readable hierarchy for that example, not a new global type scale.

Controls are deliberately crisp: primary buttons and text inputs are 48px minimum height with a 2px radius; common menu options are at least 44px. Popups and menus use a 6px radius, dialogs use 8px, and the global visible-focus rule is a 2px outline with 3px offset. One-pixel boundaries and ordinary flex/grid gaps support the compact geometry. Spacing is not currently centralized as a published scale: use the component’s existing geometry or local layout spacing that preserves readable groups and target size. Do not introduce a parallel spacing or radius system.

The source of truth remains the checkout’s `src/tokens.css`, component styles under `src/`, and `reference/src/workflows/workflows.css`. Package and catalogue users can inspect the [contract](../ai/contract.json), [token stylesheet](../tokens.css), and reviewed [workflow geometry mirror](../ai/examples/workflows.css).

## Motion and navigation materials

Reduced motion disables button transitions and transforms. Keep animation only where it explains a state change and preserve the reduced-motion preference.

`dp-navigation-surface` is an optional CSS utility for one navigation plane. Its `data-dp-material` value may be `subtle`, `expressive`, or `solid`; layout and positioning remain application-owned. Content surfaces, forms, tables, and nested controls remain opaque. The utility falls back to opaque surfaces when transparency, contrast, forced-colour, or browser support requires it. See [`APPLE-DESIGN.md`](APPLE-DESIGN.md), the [distributed token stylesheet](../tokens.css), and the checkout source comments in `src/tokens.css`.

## Accessibility constraints

Keep visible labels, connected descriptions/errors, keyboard operation, focus return, and semantic landmarks in composed screens. Test light and dark themes, narrow layouts, loading/error/empty states, keyboard flow, and the final rendered focus and contrast. The component library has automated evidence but does not establish WCAG or EAA conformance; each product needs complete-page and complete-process review. See [`ACCESSIBILITY.md`](ACCESSIBILITY.md) and [`ACCESSIBILITY-EVIDENCE.md`](ACCESSIBILITY-EVIDENCE.md).
