# Search and selection extension

User approved the proposed next step: CommandPalette, searchable MultiSelect, and a realistic composed settings example. This extends the established Flame & Ink system without changing its palette, fonts, or platform scope.

## Contracts

- CommandPalette uses Base UI for its dialog and keyboard selection. Search matches action labels, descriptions and keywords. Actions have stable IDs and optional disabled state. Selection calls the action once and requests closing. Support controlled or uncontrolled opening, reset the query on reopening, Escape dismissal and focus return. Global keyboard shortcuts belong to the consuming app.
- MultiSelect accepts controlled string-array values and named options. Search does not discard selection. Chips have labeled removal controls; disabled options cannot be chosen and a disabled field cannot be edited. Forward form names and associate help/error text with the input.
- Compose both in a local workspace settings example with General/Notifications tabs, project subscriptions, draft reset and explicit local-save feedback. No backend or persistence claim.
- Preserve token colors, Plus Jakarta Sans, 48px inputs and visible focus. Handle long labels, narrow widths, both themes and reduced motion. No new dependencies.

## Work and ownership

- [x] CommandPalette: isolated source, focused tests, interaction/state stories (command agent).
- [x] MultiSelect: isolated source, focused tests, interaction/state stories (forms agent).
- [x] Root: composed settings example with workflow checks, package exports, component catalogue, AI contract guidance, SSR and consumer fixtures.
- [x] Review: read implementation and review keyboard/disabled/control contracts; fixed initial palette focus, mobile layout and hidden-tab validation recovery. Reviewer accepted corrections.
- [x] Verify: 72 units; 116 stories in 4 theme/motion combinations (464); TypeScript and production builds; strict packed consumer, SSR, 39-component MCP metadata; six visual specimens and one focused confirmation after footer correction. Manual accessibility limits remain in trial/docs/VERIFICATION.md.

Work stays in the existing uncommitted project; no publishing or commits. Advanced calendar, tree and grid work is outside this pass.
