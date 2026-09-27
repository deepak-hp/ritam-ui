# Dates and popup refinement

User approved Calendar, DatePicker and DateRangePicker, and explicitly requested a DropdownMenu/Select UI/UX review. Preserve the established Flame & Ink design and React web scope.

- [x] Date agent: use @daypicker/react 10.0.1 for Gregorian keyboard grid/date selection and Base UI for popup lifecycle. Public values are ISO date-only strings; UTC prevents timezone shifts. Support min/max/unavailable dates, clearing, range completion, error/help labels, native form values, fixed-date stories and focused tests.
- [x] Root: inspect current Select/Menu screenshots and behaviour before edits. Fix menu alignment, consistent popup surfaces/focus, stable selected indicators, bounded scrolling and long labels. Add Select placeholder/help/error/disabled-option support and empty-state examples.
- [x] Integrate exports, compiled calendar styles, AI catalogue, package consumer and SSR fixtures. Document date-only, locale and incomplete range contracts.
- [x] Review component and date edge cases. Verify units, builds, browser interactions/axe in both themes/motion modes, consumer install, SSR, MCP and bounded visual checks.

Baseline popup inspection: Escape/focus return works in both controls. DropdownMenu defaults to centred alignment; Select indicator follows variable-length text. Existing Select wrapper lacks empty/validation/disabled-option APIs and both popups lack deliberate long-content bounds. Existing layouts are retained; no new overall visual direction is requested.

Reference: https://daypicker.dev/start and https://daypicker.dev/localization/setting-time-zone. DayPicker supplies calendar behaviour; the library owns its wrappers, styling and verification. Manual accessibility conformance review remains open.
