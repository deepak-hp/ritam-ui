# API and production contract pass

User approved continuing with API consistency and production checks. Preserve all current components, approved styles, package name and examples. Do not publish or claim native support.

- [x] Add optional open/defaultOpen/onOpenChange to Dialog, AlertDialog, Drawer, Popover and DropdownMenu; maintain existing uncontrolled behaviour. Test controlled veto, accepted close and default-open.
- [x] Export the missing public StatusIcon/async/selection types through the package entry. Typecheck a real packed consumer with representative generics, native props and rejected invalid usage. The check exposed and verified a fix for the CSS types export.
- [x] Preserve a client-component boundary in the compiled entry for React Server Component consumers. Verify artifact directive and explain the boundary without claiming an untested framework matrix.
- [x] Render the compiled library in a DOM-free Node process and hydrate it in Chromium with no recoverable hydration errors; interact after hydration and check unique accessible IDs.
- [x] Document consistent control/form/overlay contracts and pre-release scope. Keep manual assistive-technology and cross-browser work explicit.
- [x] Verify existing unit/browser tests, builds, packed consumer, SSR/hydration, generated AI contract and Storybook metadata. Results: 57 unit tests, 102 stories across 4 combinations (408), production builds, strict consumer, SSR and all 37 component metadata entries passed.

SSR fixtures/scripts and overlay implementation run independently in agents; root owns package/build/type exports, integration and review. No new component families are added in this pass.
