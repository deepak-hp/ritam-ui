# Ritam UI — AI integration

Status: Ritam UI is a local unpublished React web library, package `@ritam-ui/react`. Use this exact package name and do not claim native mobile support.

## Quick start for any coding assistant

Read `llms-full.txt` and `contract.json` in this directory. These are generated from the installed package's TypeScript declarations and CSS tokens on every build. Read stories for usage and `docs/ACCESSIBILITY.md` for obligations and known limits. Never invent props or components.

For a local checkout, run `npm ci`, `npm run build`, then `npm run storybook` from `trial`. To use the unpublished package in another React 19 app, run `npm pack` here and install that tarball in the app. Import `@ritam-ui/react/styles.css` once. Import `@fontsource-variable/plus-jakarta-sans` if using the bundled brand font. The consumer does not need a StyleX compiler.

Set `data-dp-theme="light"` or `"dark"` on `<html>` and class `dp-theme` on `<body>`. The theme is document-wide, including portals. Do not apply the theme solely to a nested wrapper. Only use supported, documented props.

## Live AI tools through MCP

Start Storybook, then add an HTTP MCP server to your AI client's project settings:

- Name: `ritam-ui`
- Transport: Streamable HTTP
- URL: `http://127.0.0.1:6006/mcp`

Use the client's documented MCP server setup; configuration file formats differ. The server must run on the same machine as the client. A cloud-only assistant cannot reach your laptop's localhost. This repository does not edit global AI-client settings or expose the server publicly.

Discover the available tools first; use documentation listing/detail tools to inspect components, then run supported story tests. The official Storybook MCP addon and manifests are preview features. They are not a promise that every AI product can connect. Any tool that can read text files can use the generated offline contract instead.

Storybook provides `/manifests/components.json` and `/manifests/docs.json`; this library also serves `/ai/llms.txt`, `/ai/llms-full.txt` and `/ai/contract.json`. Static Storybook builds include the text/JSON material; the MCP endpoint requires the running dev server.

## Design and accessibility rules

Before composing a screen, read `ai/COMPOSITION.md` (also included in `llms-full.txt`). Identify the user's task, choose an appropriate layout recipe, and inspect the rendered result. Component reuse alone does not establish good hierarchy or task fit. The recipes describe composition, not additional exports.

- Reuse exported components before writing custom controls. Keep Plus Jakarta Sans, token colours and the established geometry.
- Use dark text on the orange primary fill. White text on that orange is not an approved text pairing.
- Every control needs a meaningful visible label. Keep descriptions and errors associated with inputs. Error meaning must also be conveyed with text.
- `Select`, `Checkbox`, `Switch`, `RadioGroup` and `Tabs` are controlled: store their value and handle changes. Do not pass undocumented native props to wrapper APIs that do not support them.
- `Dialog`, `AlertDialog`, `Drawer`, `Popover` and `DropdownMenu` support `open`, `defaultOpen` and `onOpenChange`. A controlled parent owns closing. Confirmation requests closing immediately; it does not await an asynchronous operation. Keep async confirmation controlled and close only after success. Read `docs/API-CONTRACTS.md` for value, overlay and package contracts.
- `StatusIcon` is decorative. Pair it with text; use a polite live region for asynchronous status. `useAsyncAction` must receive the real operation and its AbortSignal. Report success only when that operation resolves.
- Respect reduced motion by default. The explicit Storybook motion preview is a demo override, not a production preference.
- Test keyboard navigation, focus return, errors, loading, disabled states, light/dark and narrow layouts. Automated axe checks do not prove full WCAG conformance or EAA compliance.

## Navigation materials and Apple guidance

Preserve Flame & Ink's approved palette, Plus Jakarta Sans, crisp controls and filled orange primary actions. Apple guidance refines navigation hierarchy, legibility and interaction within that identity; it is not a replacement theme. Read `docs/APPLE-DESIGN.md` for the source-to-design mapping.

The compiled stylesheet provides `.dp-navigation-surface` with `data-dp-material="subtle"`, `"expressive"` or `"solid"` on a navigation container. It is a CSS utility, not an exported React component or a universal control prop. Omission uses subtle. Use one navigation plane; keep content/forms/tables and nested controls opaque/plain. The app owns positioning, padding and preference UI. Both glass finishes become opaque under supported reduced-transparency, increased-contrast or forced-colour preferences; offer an explicit Solid choice for browsers without preference support. No backdrop-filter support also means opaque fallback. Keep primary orange and dark labels unchanged. These web effects do not reproduce native Liquid Glass APIs or adaptive refraction.

## Component families and ownership

The generated contract includes every runtime component and hook, grouped by family. Storybook's Start here / Catalogue links every implementation to its examples. Use `useToast` under one `ToastProvider`; `add` creates a message, `update` accepts a partial patch, and `dismiss` closes one or all. Use `timeout: 0` when a message must remain available until acknowledgement. Keep important errors inline as well.

Use `DataTable` for semantic client-side rows and sorting; supply stable row keys, then compose `Pagination` externally if required. It is not a virtualized or editable data grid. `DateField` uses the native browser date picker. `FileUpload` selects local files; the application owns validation and upload requests. Do not describe native input affordances as a custom calendar or a completed upload.

Use `MultiSelect` for controlled string-array choices with search, selected chips and labeled removal. Supply stable option values and a `name` for repeated native form entries. Use `CommandPalette` for local actions: each item has a stable `id`, label, optional description/keywords/disabled state, and `onSelect`. It supports controlled opening but does not install a global shortcut or await asynchronous actions. The application owns those policies. Storybook's Patterns / Workspace settings demonstrates both with tabs, draft reset and local save feedback; it is an in-memory example, not a backend integration.

## Dates and selection

`Calendar`, `DatePicker` and `DateRangePicker` use controlled date-only ISO strings in a Gregorian calendar with English labels. Use `value: string | null` for single dates and `{ from: string | null, to: string | null }` for ranges. Store partial ranges after the first click; the second click completes the range. `min`/`max` are inclusive, and `disabledDates` blocks unavailable dates and ranges crossing them. Pickers support descriptions, errors and controlled opening. `name` submits a single date; range forms use `startName` and `endName`. Disabled pickers omit form entries. Use `today` and `defaultMonth` for deterministic previews. Date values remain the same across time zones. Time selection and locale configuration are not supported by these wrappers.

`Select` supports a null placeholder value, descriptions/errors and disabled options. `DropdownMenu` is for actions. Do not use an action menu as a form field.

## Example prompt

“Read the Ritam UI contract and accessibility guidance. Build a settings form using the documented components, preserve the theme and keyboard behaviour, add stories for errors and disabled states, and run the relevant checks. If a requested capability is missing, identify it instead of inventing a prop.”

## Verification

`npm run ai:check` verifies generated docs against current declaration and token files. `npm run test:stories` runs browser interaction/accessibility checks in light and dark, with reduced motion on and off. `npm run check:consumer` installs a packed copy into a separate app. Rebuild after changing component source.

`npm run check:production` adds package/client-boundary, SSR/hydration and strict packed-consumer type checks to the normal tests and builds. The compiled entry preserves `"use client"`; individual server frameworks still need integration testing. These checks do not establish native platform support or accessibility certification.

References: [Storybook MCP](https://storybook.js.org/docs/ai/mcp/overview), [Storybook manifests](https://storybook.js.org/docs/ai/manifests), [WCAG 2.2](https://www.w3.org/TR/WCAG22/).


# Composing screens with Ritam UI

Use this guide with the installed version's contract and examples. These recipes guide composition; they are not additional exported components. Preserve the approved Flame & Ink identity. A screen's purpose determines its structure.

## Start with a four-line brief

1. User and task: who is here and what do they need to finish?
2. Priority: what information or action deserves attention first?
3. Content: what real fields, volume, wording and relationships must fit?
4. States: what can be empty, slow, invalid, unavailable or unsuccessful?

Infer settled facts from the request. Ask only when the missing answer changes the solution. For prototypes, label fictional data and simulated operations. Never invent success, metrics, saved data or product capabilities.

## Choose a composition

| Task | Starting structure | Choose something else when |
| --- | --- | --- |
| Compare and act on records | Concise task header, relevant summary, search/filters, DataTable, detail region | Images or spatial relationships matter more than column comparison |
| Edit one record or settings | Readable heading, grouped form, descriptions at the point of need, save/error feedback | The user needs to scan and edit many rows simultaneously |
| Browse visual work | Image-led collection, concise metadata, filters and an accessible detail view | Visuals are decorative and records are best compared as text |

These are starting points, not mandatory templates. Document why the chosen layout serves this task. Don't describe a recipe as a library export. Custom semantic HTML/CSS is appropriate for layout; reuse exported controls rather than rebuilding their behavior.

## Make deliberate visual decisions

- **Hierarchy:** lead with the task. Keep important content near its actions. Use heading size, weight and whitespace to express relationships; avoid making every section equally prominent.
- **Containers:** use a card when an item is an independent unit. Use alignment and dividers for a continuous list or form. Explain the need before nesting surfaces.
- **Density:** dense workspaces need compact, scannable rows; focused forms need comfortable reading width. Density must not reduce usable hit targets or hide focus.
- **Colour:** retain Plus Jakarta Sans and shared tokens. Orange denotes priority; use dark text on the orange fill. Use green sparingly for actual success. Semantic meaning also needs text.
- **Content:** use realistic field lengths, dates and quantities. Name actions specifically. Avoid empty slogans, invented performance numbers and charts that don't help the task.
- **Typography:** use a small consistent hierarchy, readable line lengths and tabular numerals for amounts. Long labels must wrap or have an accessible full-text path.
- **Responsive layout:** decide what stacks, wraps or stays in a scrollable region. A comparison table may scroll inside a labelled focusable region; the page itself must not overflow. Never silently drop essential data.
- **Motion/materials:** animate changes that need explanation. Follow reduced-motion and contrast preferences. Translucency is limited to appropriate navigation surfaces, not a substitute for hierarchy.

## Recipe: invoice collection

**Task:** a small studio owner identifies overdue invoices, compares amounts/dates and reviews details before following up.

Lead with invoices and the current collection priority. Use factual summaries that support that task. Place search and status filters immediately before the records. Show client, invoice identifier, due date, amount and status; align amounts and expose sorting only if implemented. Keep the table reachable without an oversized introductory section. Provide review actions with invoice-specific accessible names. Detail content must preserve the selected record's identity and not imply a message was sent.

Distinguish no matching results from no invoices yet. Clearing filters should recover results. An actual reminder flow needs pending, success and failure tied to the real operation; a local prototype must say it is a demo. Do not add revenue charts just because the page handles money.

## Recipe: grouped settings

**Task:** a user changes a small set of related preferences and understands what saved.

Group fields by meaning with visible labels, short descriptions and errors near their fields. Use TextField/Select for values, Switch for immediate on/off settings only when the behavior supports that, and Checkbox for selection or confirmation. Use Tabs only when groups are substantial and navigation aids the task. Keep unsaved changes and cross-tab validation visible. Offer one clear save path; preserve input on failure and return focus appropriately. Don't use DropdownMenu as a form field or claim local memory is a backend save.

## Recipe: visual collection

**Task:** a user recognizes and selects assets by appearance.

Let actual preview content lead. Keep metadata and selection controls consistent across items. Preserve image aspect ratios where meaningful, include text names and appropriate alternatives, and offer a useful empty state. Adapt column count to available space rather than shrinking text. Use a list/table alternative when detailed comparison dominates. The current package does not include a full gallery, upload transport or image editor; compose layout and verified APIs without inventing exports.

## Build, inspect, correct

1. Retrieve the relevant component APIs and examples before coding.
2. Compose with documented controls and shared tokens; do not guess props.
3. Run type/build and interaction checks. Test meaningful loading/error/empty states when the screen has those behaviors.
4. Render light/dark and narrow/desktop. Exercise keyboard use, focus and long content. Automated accessibility checks do not certify compliance.
5. Inspect the screenshot: does the intended task lead, does grouping make sense, is anything decorative competing with useful content, and does the layout fit this product?
6. Correct concrete issues, then recheck the affected behavior. Describe what was checked and what remains unverified.

## Review rubric

Compare results on task clarity, hierarchy, content fit, interaction completeness, responsive behavior, accessibility and fidelity to the design language. Use a human review for visual quality. Passing a token/API check does not prove a good design; an AI-generated aesthetic score is not an objective measure.

For experiments, keep the task, data, APIs, model and generation budget comparable. Record exactly which guidance each run received. Don't deliberately weaken a baseline. Include several tasks and independent runs before making general claims, and evaluate accessibility separately from visual preference.


# Exact public TypeScript declarations

## StatusIcon.d.ts

```tsx
import type { SVGProps } from 'react';
export type AsyncVisualState = 'idle' | 'pending' | 'success' | 'error';
export type StatusIconKind = 'send' | 'payment' | 'loading';
export interface StatusIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    state: AsyncVisualState;
    kind?: StatusIconKind;
    size?: number;
}
export declare function StatusIcon({ state, kind, size, className, ...props }: StatusIconProps): import("react").JSX.Element;
```

## calendar.d.ts

```tsx
import { TZDate } from '@daypicker/react';
export type CalendarProps = {
    label: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
    defaultMonth?: string;
    min?: string;
    max?: string;
    disabledDates?: string[];
    disabled?: boolean;
    today?: string;
    autoFocus?: boolean;
};
export type CalendarRangeProps = Omit<CalendarProps, 'value' | 'onValueChange'> & {
    value: DateRangeValue;
    onValueChange: (value: DateRangeValue) => void;
};
export type DateRangeValue = {
    from: string | null;
    to: string | null;
};
export declare function parseISODate(value: string | null | undefined): TZDate | undefined;
export declare function formatISODate(date: Date | undefined): string | null;
export declare function Calendar({ label, value, onValueChange, defaultMonth, min, max, disabledDates, disabled, today, autoFocus }: CalendarProps): import("react").JSX.Element;
export declare function CalendarRange({ label, value, onValueChange, defaultMonth, min, max, disabledDates, disabled, today, autoFocus }: CalendarRangeProps): import("react").JSX.Element;
```

## command-palette.d.ts

```tsx
export type CommandItem = {
    id: string;
    label: string;
    description?: string;
    keywords?: string[];
    disabled?: boolean;
    onSelect: () => void;
};
export type CommandPaletteProps = {
    triggerLabel?: string;
    title?: string;
    description?: string;
    items: CommandItem[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
};
export declare function CommandPalette({ triggerLabel, title, description, items, open, defaultOpen, onOpenChange, placeholder, emptyMessage, disabled, }: CommandPaletteProps): import("react").JSX.Element;
```

## components.d.ts

```tsx
import { type ReactNode, type ComponentProps } from 'react';
type NativeButtonProps = Omit<ComponentProps<'button'>, 'color'>;
export type ButtonProps = NativeButtonProps & {
    variant?: 'primary' | 'secondary' | 'quiet';
    loading?: boolean;
};
export declare function Button({ variant, loading, disabled, children, className, ...props }: ButtonProps): import("react").JSX.Element;
export type TextFieldProps = Omit<ComponentProps<'input'>, 'size'> & {
    label: string;
    description?: string;
    error?: string;
};
export declare function TextField({ label, description, error, id: givenId, ...props }: TextFieldProps): import("react").JSX.Element;
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type SelectProps = {
    label: string;
    value: string | null;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    disabled?: boolean;
    name?: string;
    placeholder?: string;
    description?: string;
    error?: string;
};
export declare function Select({ label, value, onValueChange, options, disabled, name, placeholder, description, error }: SelectProps): import("react").JSX.Element;
export type DialogProps = {
    triggerLabel: string;
    title: string;
    description: string;
    children: ReactNode;
    confirmLabel?: string;
    onConfirm?: () => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};
export declare function Dialog({ triggerLabel, title, description, children, confirmLabel, onConfirm, open, defaultOpen, onOpenChange }: DialogProps): import("react").JSX.Element;
export {};
```

## data-table.d.ts

```tsx
import { type ReactNode } from 'react';
export type TableSort = {
    key: string;
    direction: 'asc' | 'desc';
} | null;
export type DataTableColumn<Row> = {
    key: string;
    header: string;
    cell: (row: Row) => ReactNode;
    sortValue?: (row: Row) => string | number | null | undefined;
};
export type DataTableProps<Row> = {
    caption: string;
    rows: Row[];
    columns: DataTableColumn<Row>[];
    rowKey: (row: Row) => string;
    /** Omit to let the table manage its sort; pass null for a controlled unsorted table. */
    sort?: TableSort;
    onSortChange?: (sort: TableSort) => void;
    loading?: boolean;
    emptyMessage?: string;
};
/** Semantic client-side table. Compose Pagination externally; no virtualization or server query is implied. */
export declare function DataTable<Row>({ caption, rows, columns, rowKey, sort: controlledSort, onSortChange, loading, emptyMessage }: DataTableProps<Row>): import("react").JSX.Element;
```

## date-pickers.d.ts

```tsx
import { type CalendarProps, type DateRangeValue } from './calendar';
export type { DateRangeValue } from './calendar';
type PickerMessages = {
    description?: string;
    error?: string;
    name?: string;
    placeholder?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    id?: string;
};
export type DatePickerProps = CalendarProps & PickerMessages;
export type DateRangePickerProps = Omit<CalendarProps, 'value' | 'onValueChange'> & Omit<PickerMessages, 'name'> & {
    value: DateRangeValue;
    onValueChange: (value: DateRangeValue) => void;
    startName?: string;
    endName?: string;
};
export declare function DatePicker({ label, value, onValueChange, description, error, name, placeholder, open, defaultOpen, onOpenChange, id: suppliedId, disabled, ...calendar }: DatePickerProps): import("react").JSX.Element;
export declare function DateRangePicker({ label, value, onValueChange, description, error, startName, endName, placeholder, open, defaultOpen, onOpenChange, id: suppliedId, disabled, ...calendar }: DateRangePickerProps): import("react").JSX.Element;
```

## feedback.d.ts

```tsx
import { type ComponentProps, type ReactNode } from 'react';
export type FeedbackTone = 'neutral' | 'success' | 'error' | 'warning';
export type BadgeProps = {
    children: ReactNode;
    tone?: FeedbackTone;
};
export declare function Badge({ children, tone }: BadgeProps): import("react").JSX.Element;
export type AlertProps = {
    title: string;
    children?: ReactNode;
    tone?: FeedbackTone;
    live?: 'off' | 'polite' | 'assertive';
};
export declare function Alert({ title, children, tone, live }: AlertProps): import("react").JSX.Element;
export type AvatarProps = {
    name: string;
    src?: string;
    size?: number;
};
export declare function Avatar({ name, src, size }: AvatarProps): import("react").JSX.Element;
export type CardProps = ComponentProps<'div'>;
/** Noninteractive surface; compose links or buttons inside instead of nesting interactive cards. */
export declare function Card({ className, ...props }: CardProps): import("react").JSX.Element;
export type SeparatorProps = ComponentProps<'hr'>;
export declare function Separator({ className, ...props }: SeparatorProps): import("react").JSX.Element;
export type SkeletonProps = {
    width?: number | string;
    height?: number;
    label?: string;
};
export declare function Skeleton({ width, height, label }: SkeletonProps): import("react").JSX.Element;
export type ProgressProps = {
    label: string;
    value?: number;
    max?: number;
};
export declare function Progress({ label, value, max }: ProgressProps): import("react").JSX.Element;
export type SpinnerProps = {
    label: string;
};
export declare function Spinner({ label }: SpinnerProps): import("react").JSX.Element;
export type EmptyStateProps = {
    title: string;
    description: string;
    action?: ReactNode;
};
export declare function EmptyState({ title, description, action }: EmptyStateProps): import("react").JSX.Element;
export type ToastOptions = {
    title: string;
    description?: string;
    tone?: FeedbackTone;
    timeout?: number;
    priority?: 'low' | 'high';
};
export type ToastController = {
    add: (options: ToastOptions) => string;
    dismiss: (id?: string) => void;
    update: (id: string, options: Partial<ToastOptions>) => void;
};
/** Must be called beneath ToastProvider. Use timeout:0 for messages that require user acknowledgement. */
export declare function useToast(): ToastController;
export type ToastProviderProps = {
    children: ReactNode;
    timeout?: number;
    limit?: number;
};
export declare function ToastProvider({ children, timeout, limit }: ToastProviderProps): import("react").JSX.Element;
```

## forms.d.ts

```tsx
import { type ComponentProps } from 'react';
type FieldMessagesProps = {
    description?: string;
    error?: string;
};
export type TextareaProps = Omit<ComponentProps<'textarea'>, 'size'> & FieldMessagesProps & {
    label: string;
};
export declare function Textarea({ label, description, error, id: suppliedId, className, ...props }: TextareaProps): import("react").JSX.Element;
export type NumberFieldProps = FieldMessagesProps & {
    label: string;
    value: number | null;
    onValueChange: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number | 'any';
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
};
export declare function NumberField({ label, value, onValueChange, description, error, id: suppliedId, disabled, ...props }: NumberFieldProps): import("react").JSX.Element;
export type SliderProps = FieldMessagesProps & {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    id?: string;
};
export declare function Slider({ label, value, onValueChange, description, error, disabled, ...props }: SliderProps): import("react").JSX.Element;
export type ComboboxOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type ComboboxProps = FieldMessagesProps & {
    label: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
    options: ComboboxOption[];
    disabled?: boolean;
    name?: string;
    id?: string;
    placeholder?: string;
};
export declare function Combobox({ label, value, onValueChange, options, description, error, disabled, id: suppliedId, placeholder, ...props }: ComboboxProps): import("react").JSX.Element;
export type ToggleGroupOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type ToggleGroupProps = FieldMessagesProps & {
    label: string;
    value: string[];
    onValueChange: (value: string[]) => void;
    options: ToggleGroupOption[];
    disabled?: boolean;
    multiple?: boolean;
    orientation?: 'horizontal' | 'vertical';
    id?: string;
};
export declare function ToggleGroup({ label, value, onValueChange, options, description, error, disabled, multiple, orientation, id: suppliedId }: ToggleGroupProps): import("react").JSX.Element;
export type DateFieldProps = Omit<ComponentProps<'input'>, 'type' | 'size' | 'value' | 'onChange'> & FieldMessagesProps & {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
};
export declare function DateField({ label, value, onValueChange, description, error, id: suppliedId, className, ...props }: DateFieldProps): import("react").JSX.Element;
export type FileUploadProps = Omit<ComponentProps<'input'>, 'type' | 'size' | 'onChange' | 'value' | 'defaultValue'> & FieldMessagesProps & {
    label: string;
    onFilesChange?: (files: FileList | null) => void;
};
export declare function FileUpload({ label, onFilesChange, description, error, id: suppliedId, className, ...props }: FileUploadProps): import("react").JSX.Element;
export {};
```

## index.d.ts

```tsx
export { Button, TextField, Select, Dialog } from './components';
export type { ButtonProps, TextFieldProps, SelectProps, SelectOption, DialogProps } from './components';
export { StatusIcon } from './StatusIcon';
export type { StatusIconProps, AsyncVisualState, StatusIconKind } from './StatusIcon';
export { useAsyncAction } from './useAsyncAction';
export type { AsyncActionController } from './useAsyncAction';
export { Tabs } from './tabs';
export type { TabsProps } from './tabs';
export { Checkbox, Switch, RadioGroup } from './selection';
export type { CheckboxProps, SwitchProps, RadioGroupProps, RadioOption } from './selection';
export { Textarea, NumberField, Slider, Combobox, ToggleGroup, DateField, FileUpload } from './forms';
export type { TextareaProps, NumberFieldProps, SliderProps, ComboboxProps, ComboboxOption, ToggleGroupProps, ToggleGroupOption, DateFieldProps, FileUploadProps } from './forms';
export { Tooltip, Popover, DropdownMenu, AlertDialog, Drawer, Accordion } from './overlays';
export type { OverlayOpenProps, TooltipProps, PopoverProps, DropdownMenuProps, DropdownMenuItem, AlertDialogProps, DrawerProps, AccordionProps, AccordionItem } from './overlays';
export { Badge, Alert, Avatar, Card, Separator, Skeleton, Progress, Spinner, EmptyState, ToastProvider, useToast } from './feedback';
export type { FeedbackTone, BadgeProps, AlertProps, AvatarProps, CardProps, SeparatorProps, SkeletonProps, ProgressProps, SpinnerProps, EmptyStateProps, ToastProviderProps, ToastOptions, ToastController } from './feedback';
export { Link, IconButton, Breadcrumbs, Pagination } from './navigation';
export type { LinkProps, IconButtonProps, BreadcrumbsProps, PaginationProps } from './navigation';
export { DataTable } from './data-table';
export type { DataTableProps, DataTableColumn, TableSort } from './data-table';
export { CommandPalette } from './command-palette';
export type { CommandPaletteProps, CommandItem } from './command-palette';
export { MultiSelect } from './multi-select';
export type { MultiSelectProps, MultiSelectOption } from './multi-select';
export { Calendar } from './calendar';
export type { CalendarProps, DateRangeValue } from './calendar';
export { DatePicker, DateRangePicker } from './date-pickers';
export type { DatePickerProps, DateRangePickerProps } from './date-pickers';
```

## multi-select.d.ts

```tsx
export type MultiSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type MultiSelectProps = {
    label: string;
    value: string[];
    onValueChange: (value: string[]) => void;
    options: MultiSelectOption[];
    description?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    placeholder?: string;
    emptyMessage?: string;
};
export declare function MultiSelect({ label, value, onValueChange, options, description, error, disabled, name, id: suppliedId, placeholder, emptyMessage }: MultiSelectProps): import("react").JSX.Element;
```

## navigation.d.ts

```tsx
import type { ComponentProps, ReactNode } from 'react';
import { type ButtonProps } from './components';
export type LinkProps = ComponentProps<'a'> & {
    href: string;
};
/** Uses a native anchor so routing, modifier clicks and downloads retain browser behaviour. */
export declare function Link({ className, target, rel, ...props }: LinkProps): import("react").JSX.Element;
export type IconButtonProps = Omit<ButtonProps, 'children' | 'aria-label' | 'aria-labelledby'> & {
    label: string;
    children: ReactNode;
};
export declare function IconButton({ label, children, className, variant, ...props }: IconButtonProps): import("react").JSX.Element;
export type BreadcrumbsProps = {
    label?: string;
    items: {
        label: string;
        href?: string;
    }[];
};
export declare function Breadcrumbs({ label, items }: BreadcrumbsProps): import("react").JSX.Element;
export type PaginationProps = {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    label?: string;
    disabled?: boolean;
};
export declare function Pagination({ page, pageCount, onPageChange, label, disabled }: PaginationProps): import("react").JSX.Element;
```

## overlays.d.ts

```tsx
import { type ReactElement, type ReactNode } from 'react';
export type TooltipProps = {
    content: ReactNode;
    children: ReactElement;
    disabled?: boolean;
};
export declare function Tooltip({ content, children, disabled }: TooltipProps): import("react").JSX.Element;
export type OverlayOpenProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};
export type PopoverProps = {
    triggerLabel: string;
    title: string;
    children: ReactNode;
} & OverlayOpenProps;
export declare function Popover({ triggerLabel, title, children, open, defaultOpen, onOpenChange }: PopoverProps): import("react").JSX.Element;
export type DropdownMenuItem = {
    label: string;
    onSelect?: () => void;
    disabled?: boolean;
};
export type DropdownMenuProps = {
    triggerLabel: string;
    items: DropdownMenuItem[];
} & OverlayOpenProps;
export declare function DropdownMenu({ triggerLabel, items, open, defaultOpen, onOpenChange }: DropdownMenuProps): import("react").JSX.Element;
export type AlertDialogProps = {
    triggerLabel: string;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    children?: ReactNode;
} & OverlayOpenProps;
export declare function AlertDialog({ triggerLabel, title, description, confirmLabel, cancelLabel, onConfirm, children, open, defaultOpen, onOpenChange }: AlertDialogProps): import("react").JSX.Element;
export type DrawerProps = {
    triggerLabel: string;
    title: string;
    description?: string;
    children: ReactNode;
    side?: 'left' | 'right';
} & OverlayOpenProps;
export declare function Drawer({ triggerLabel, title, description, children, side, open, defaultOpen, onOpenChange }: DrawerProps): import("react").JSX.Element;
export type AccordionItem = {
    value: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
};
export type AccordionProps = {
    label: string;
    items: AccordionItem[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    multiple?: boolean;
};
export declare function Accordion({ label, items, value, defaultValue, onValueChange, multiple }: AccordionProps): import("react").JSX.Element;
```

## selection.d.ts

```tsx
type SelectionProps = {
    label: string;
    description?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    name?: string;
};
export type CheckboxProps = SelectionProps & {
    indeterminate?: boolean;
};
export declare function Checkbox({ label, description, checked, onCheckedChange, disabled, name, indeterminate }: CheckboxProps): import("react").JSX.Element;
export type SwitchProps = SelectionProps;
export declare function Switch({ label, description, checked, onCheckedChange, disabled, name }: SwitchProps): import("react").JSX.Element;
export type RadioOption = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
};
export type RadioGroupProps = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: RadioOption[];
    disabled?: boolean;
    name?: string;
};
export declare function RadioGroup({ label, value, onValueChange, options, disabled, name }: RadioGroupProps): import("react").JSX.Element;
export {};
```

## styles.d.ts

```tsx
export {};
```

## tabs.d.ts

```tsx
import type { ReactNode } from 'react';
export type TabsProps = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    items: {
        value: string;
        label: string;
        content: ReactNode;
        disabled?: boolean;
    }[];
};
/** Controlled tabs. Hidden panels stay mounted to preserve form state. */
export declare function Tabs({ label, value, onValueChange, items }: TabsProps): import("react").JSX.Element;
```

## useAsyncAction.d.ts

```tsx
import type { AsyncVisualState } from './StatusIcon';
export interface AsyncActionController {
    state: AsyncVisualState;
    run: () => void;
    cancel: () => void;
    reset: () => void;
}
export declare function useAsyncAction(action: (signal: AbortSignal) => Promise<void>): AsyncActionController;
```

# Theme tokens

```css
:root,[data-dp-theme="light"]{
 color-scheme:light;
 --dp-canvas:#FFFFFF;--dp-surface:#F4F4F6;--dp-selected:#FFEEE7;
 --dp-text:#111216;--dp-muted:#5B5D66;--dp-border:#858B95;--dp-divider:#E3E4E8;
 --dp-orange:#FF681F;--dp-orange-hover:#F45C14;--dp-orange-border:#A83A0A;--dp-on-orange:#141414;--dp-orange-text:#A83A0A;
 --dp-success:#28694F;--dp-error:#B4233C;--dp-focus:#111216;
 --dp-font:'Plus Jakarta Sans Variable','Plus Jakarta Sans',sans-serif;
 --dp-navigation-subtle-fill:color-mix(in srgb,var(--dp-canvas) 94%,transparent);
 --dp-navigation-expressive-fill:color-mix(in srgb,var(--dp-canvas) 88%,transparent);
 --dp-navigation-shadow:0 4px 16px #1112160A;
 --dp-navigation-expressive-shadow:0 12px 32px #11121618;
}
[data-dp-theme="dark"]{
 color-scheme:dark;--dp-canvas:#090A0C;--dp-surface:#14161B;--dp-selected:#1C1E23;
 --dp-text:#F6F7F9;--dp-muted:#BEC0C7;--dp-border:#788292;--dp-divider:#34373E;
 --dp-orange-text:#FF874D;--dp-success:#8AD3AC;--dp-error:#FF9CAF;--dp-focus:#F6F7F9;
 --dp-navigation-subtle-fill:color-mix(in srgb,var(--dp-canvas) 94%,transparent);
 --dp-navigation-expressive-fill:color-mix(in srgb,var(--dp-canvas) 88%,transparent);
 --dp-navigation-shadow:0 4px 16px #00000040;
 --dp-navigation-expressive-shadow:0 12px 32px #00000066;
}
.dp-theme{font-family:var(--dp-font);background:var(--dp-canvas);color:var(--dp-text)}
.dp-theme *, .dp-theme *::before,.dp-theme *::after{box-sizing:border-box}
.dp-theme :where(button,input,textarea,[role="combobox"],[role="tab"],[role="checkbox"],[role="switch"],[role="radio"],[role="option"],a):focus-visible{outline:2px solid var(--dp-focus);outline-offset:3px}
.dp-theme :is(input,textarea)::placeholder{color:var(--dp-muted);opacity:1}
.dp-theme :is(input,textarea){caret-color:var(--dp-orange-text)}
.dp-theme input:disabled{opacity:.5;cursor:not-allowed}
.dp-theme ::selection{background:var(--dp-orange);color:var(--dp-on-orange)}
@media(prefers-reduced-motion:reduce){.dp-theme button{transition:none!important;transform:none!important}}
@media(forced-colors:active){.dp-theme{--dp-canvas:Canvas;--dp-surface:Canvas;--dp-selected:ButtonFace;--dp-text:CanvasText;--dp-muted:CanvasText;--dp-border:CanvasText;--dp-divider:CanvasText;--dp-orange:ButtonFace;--dp-orange-hover:ButtonFace;--dp-orange-border:CanvasText;--dp-on-orange:ButtonText;--dp-orange-text:CanvasText;--dp-success:CanvasText;--dp-error:CanvasText;--dp-focus:CanvasText}.dp-theme :where(button,input,textarea,[role="combobox"],[role="tab"],[role="checkbox"],[role="switch"],[role="radio"],[role="option"],a):focus-visible{outline-color:CanvasText}.dp-theme :where(button,input,textarea,[role="combobox"],[role="checkbox"],[role="switch"],[role="radio"]){forced-color-adjust:auto}}

@media(forced-colors:active){.dp-theme button[aria-current="page"],.dp-theme .rdp-selected .rdp-day_button{outline:2px solid ButtonText;outline-offset:-4px}}

/* Opt in on one navigation plane; keep content and nested controls opaque/plain.
   Layout, position and corner geometry belong to the consuming app. */
.dp-navigation-surface {
 background:var(--dp-canvas);color:var(--dp-text);
 border:1px solid var(--dp-divider);
 box-shadow:var(--dp-navigation-shadow);
}
.dp-navigation-surface[data-dp-material="expressive"] {
 box-shadow:var(--dp-navigation-expressive-shadow);
}
@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) and (background:color-mix(in srgb,white 94%,transparent)) {
 .dp-navigation-surface {
  background:var(--dp-navigation-subtle-fill);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
 }
 .dp-navigation-surface[data-dp-material="expressive"] {
  background:var(--dp-navigation-expressive-fill);
  -webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);
 }
}
.dp-navigation-surface[data-dp-material="solid"] {
 background:var(--dp-canvas);-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;
}
/* Media-query support varies; always offer the explicit Solid choice too. */
@media (prefers-reduced-transparency:reduce), (prefers-contrast:more), (forced-colors:active) {
 .dp-navigation-surface,.dp-navigation-surface[data-dp-material] {
  background:var(--dp-canvas);-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;
  border-color:var(--dp-border);
 }
}
@media (forced-colors:active) {
 .dp-navigation-surface,.dp-navigation-surface[data-dp-material] {
  background:Canvas;color:CanvasText;border-color:CanvasText;
 }
}
```
