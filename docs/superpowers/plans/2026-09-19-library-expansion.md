# Core library expansion

The user has authorized a full library using the previously approved React + Base UI + StyleX direction. Extend that implementation in place; do not restart the visual design, publish packages, or claim native adapters exist.

## Scope and design

Retain the 9 existing components. Add forms (Textarea, NumberField, Slider, Combobox, ToggleGroup, DateField, FileUpload), overlays (Tooltip, Popover, DropdownMenu, AlertDialog, Drawer, Accordion), feedback/display (Badge, Alert, Avatar, Card, Separator, Skeleton, Progress, Spinner, EmptyState, ToastProvider with useToast), and navigation/data (Breadcrumbs, Pagination, DataTable, Link, IconButton). Public helpers such as ToastProvider are distinguished from leaf components in the inventory.

Use established tokens: orange #FF681F with #141414 primary text, white/near-black canvas, Plus Jakarta Sans, restrained green only for success, crisp geometry. Never use source colour-refinement-02 values: that historical document predates the approved implementation. Base UI handles complex focus/keyboard state; use native elements for simple inputs. Every icon-only action requires a name; decorative status must have text. Respect reduced motion and use themes inherited by portals.

## Work packages and ownership

- [x] Forms: `trial/src/forms.tsx`, matching stories and `tests/forms.test.tsx`. Controlled value callbacks, visible labels, error/description associations, disabled cases. Native date and file inputs; no upload backend claimed.
- [x] Overlays: `trial/src/overlays.tsx`, matching stories and `tests/overlays.test.tsx`. Keyboard opening/closing, focus return, named overlays, safe initial focus for destructive confirmation.
- [x] Feedback: `trial/src/feedback.tsx`, matching stories and `tests/feedback.test.tsx`. Toast queue, dismissal and announcement semantics; progress labels and reduced-motion loading; image fallback.
- [x] Navigation/data: `trial/src/navigation.tsx`, `trial/src/data-table.tsx`, matching stories/tests. Semantic links/breadcrumbs, bounded pagination, controlled sorting with aria-sort, empty/loading table states. Core table is not an enterprise data grid.
- [x] Integration: root owns `src/index.ts`, token additions, compiled bundle, AI generation/checks, consumer verification, Storybook catalogue/ordering and documentation. Agents do not mutate shared files or run builds while the root integrates.
- [x] Review and verification: meaningful unit tests; TypeScript; library and static Storybook builds; all browser stories and axe in light/dark × motion preference; packed consumer; MCP/AI API completeness; desktop/narrow visual inspection.

## Definition of done

All listed implementations exported, built and reachable from a searchable Storybook catalogue; no dummy controls or invented API metadata. Documentation explicitly states supported behaviour and limits. Tests prove keyboard/disabled/validation states and key lifecycle behaviours. Release accessibility work (screen-reader/browser matrix, full WCAG evaluation) stays explicit. Native adapters, calendar/range picker, rich-text editor, charts, virtualization and enterprise data-grid interactions are separate future modules, not represented as completed.

## Execution record

Work is uncommitted in the existing workspace because it has no initial commit; avoid worktree/commit operations. Existing approved direction and current user instruction authorize the implementation. Use parallel agents for isolated families and review their results before completion.

Completed: all seven work packages. Inventory is 37 exported components (including ToastProvider), 2 hooks, 100 stories. Verification: 53 unit tests, all four 100-story browser combinations, builds, packed consumer, full MCP metadata and catalogue route checks. Four layout screenshots are in trial/.review; durable results and remaining manual release obligations are in trial/docs/VERIFICATION.md. Review fixes covered popup layering, slider input validation, combobox open-state labeling, toast update typing and close lifecycle assertions. RTK and Impeccable engine could not run on this host; existing code/tokens and direct checks were used. The implementation remains private/unpublished.
