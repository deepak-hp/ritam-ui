# Component catalogue

42 exported React components (including ToastProvider) and 2 hooks. All entries below are implemented and have Storybook examples. This is an MIT-licensed React web library; the beta package is not yet published and release accessibility review remains open.

## Actions

| Component | Supported behaviour |
| --- | --- |
| [Button](/?path=/docs/components-button--docs) | Primary, secondary, quiet, disabled and loading actions. |
| [IconButton](/?path=/docs/components-iconbutton--docs) | Named icon-only actions with a 48px target. |
| [Link](/?path=/docs/components-link--docs) | Native anchors with visible underlines and safe new-tab defaults. |

## Forms and selection

| Component | Supported behaviour |
| --- | --- |
| [TextField](/?path=/docs/components-textfield--docs) | Labeled single-line input with descriptions and errors. |
| [Textarea](/?path=/docs/components-textarea--docs) | Multiline text entry with native resizing and validation messages. |
| [NumberField](/?path=/docs/components-numberfield--docs) | Bounded numeric entry with increment/decrement controls. |
| [Select](/?path=/docs/components-select--docs) | Keyboard-accessible single-choice selection. |
| [Combobox](/?path=/docs/components-combobox--docs) | Searchable choice list with label filtering and empty results. |
| [MultiSelect](/?path=/docs/components-multiselect--docs) | Controlled searchable multiple choices with removable selections and native form values. |
| [Checkbox](/?path=/docs/components-checkbox--docs) | Checked, unchecked and mixed selection. |
| [Switch](/?path=/docs/components-switch--docs) | Controlled on/off setting. |
| [RadioGroup](/?path=/docs/components-radiogroup--docs) | Exclusive choice with optional option descriptions. |
| [ToggleGroup](/?path=/docs/components-togglegroup--docs) | Single/multiple toggles with horizontal and vertical layouts. |
| [Slider](/?path=/docs/components-slider--docs) | Controlled single numeric value with keyboard adjustment. |
| [DateField](/?path=/docs/components-datefield--docs) | Native date entry; calendar presentation follows the browser. |
| [Calendar](/?path=/docs/components-calendar--docs) | Inline Gregorian date selection with keyboard navigation, inclusive bounds and unavailable days. |
| [DatePicker](/?path=/docs/components-datepicker--docs) | Single ISO date selection in a labeled calendar popup, with clear action and form values. |
| [DateRangePicker](/?path=/docs/components-daterangepicker--docs) | Start/end ISO date selection with incomplete-range guidance and unavailable-day exclusions. |
| [FileUpload](/?path=/docs/components-fileupload--docs) | Native file selection with accept/multiple support; upload transport is owned by the application. |

## Navigation and data

| Component | Supported behaviour |
| --- | --- |
| [Tabs](/?path=/docs/components-tabs--docs) | Controlled tab navigation with preserved panel state. |
| [Breadcrumbs](/?path=/docs/components-breadcrumbs--docs) | Linked hierarchy with an explicit current destination. |
| [Pagination](/?path=/docs/components-pagination--docs) | Controlled pages with bounded navigation and compact long ranges. |
| [DataTable](/?path=/docs/components-datatable--docs) | Semantic table, client-side sorting, empty/loading states; compose pagination externally. |

## Overlays and disclosure

| Component | Supported behaviour |
| --- | --- |
| [Tooltip](/?path=/docs/components-tooltip--docs) | Short supplementary help on a focusable trigger. |
| [Popover](/?path=/docs/components-popover--docs) | Named nonmodal contextual content. |
| [DropdownMenu](/?path=/docs/components-dropdownmenu--docs) | Keyboard action menu with disabled items. |
| [CommandPalette](/?path=/docs/components-commandpalette--docs) | Searchable action dialog with keyboard selection, disabled actions and controlled opening. |
| [Dialog](/?path=/docs/components-dialog--docs) | Modal content with focus containment and return. |
| [AlertDialog](/?path=/docs/components-alertdialog--docs) | Destructive confirmation with initial focus on cancellation. |
| [Drawer](/?path=/docs/components-drawer--docs) | Modal side panel with named close action. |
| [Accordion](/?path=/docs/components-accordion--docs) | Single/multiple disclosure sections. |

## Feedback and display

| Component | Supported behaviour |
| --- | --- |
| [Alert](/?path=/docs/components-alert--docs) | Inline feedback with optional polite/assertive announcements. |
| [Badge](/?path=/docs/components-badge--docs) | Short textual status with restrained semantic colour. |
| [Avatar](/?path=/docs/components-avatar--docs) | Image or initials with an accessible name and failed-image fallback. |
| [Card](/?path=/docs/components-card--docs) | Noninteractive composable surface. |
| [Separator](/?path=/docs/components-separator--docs) | Semantic horizontal rule. |
| [Skeleton](/?path=/docs/components-skeleton--docs) | Decorative placeholder with optional screen-reader loading text. |
| [Progress](/?path=/docs/components-progress--docs) | Labeled determinate or indeterminate progress. |
| [Spinner](/?path=/docs/components-spinner--docs) | Visible loading text with reduced-motion-aware icon. |
| [EmptyState](/?path=/docs/components-emptystate--docs) | Empty content explanation with an optional real action. |
| [StatusIcon](/?path=/docs/components-statusicon--docs) | Decorative async state icon; always pair with meaningful text. |
| [ToastProvider](/?path=/docs/components-toast--docs) | Notification queue and live announcements, used with useToast. |

## Hooks

- `useAsyncAction`: real asynchronous operation, cancellation, pending/success/error state.
- `useToast`: add, update and dismiss notifications beneath ToastProvider.

## Separate modules not yet implemented

Native mobile/desktop adapters, rich-text editing, charts, tree view, drag-and-drop upload transport and enterprise data grids (virtualization, grouping, cell editing) are not included. DataTable and DateField intentionally describe their current capabilities above.

## Quality and integration

Use the theme and motion toolbar on any story. Documentation includes source-derived prop types. Read Integration and Agent API for the compiled package and MCP setup, and Accessibility for automated coverage and manual release checks.
