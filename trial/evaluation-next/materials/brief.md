# File review workspace — frozen task

Build a polished file review workspace for a small creative team. The reviewer scans five synthetic files, selects eligible pending files, and approves or rejects a batch. Prioritize file identity, status, selection count and the decision action. This is an in-memory simulated service; label it as demo data. Use the shared fixture/service; do not duplicate its records or fake success. No upload, search, navigation, authentication, undo or extra routes are needed.

Use default-exported React App in App.tsx and app.css (at most 450 combined lines). Import getAssets, submitDecision and relevant types from ../../shared/service. Initialize from getAssets(); display all five files including owner, kind, size and status. Use returned records after successful submissions; selection clears on success. Approved, rejected and blocked files cannot be selected. Explain the blocked file's reason visibly. Never submit an empty selection or an already reviewed/blocked file.

Accessible contract (exact accessible names; these are standard semantics, not a prescribed layout):
- Main landmark and a level-one heading named "File review".
- Each file has a checkbox named "Select <exact file name>"; show disabled checkboxes for ineligible files.
- A checkbox named "Select all pending files" toggles all and only pending files; represent partial selection correctly.
- Buttons named "Approve selected" and "Reject selected"; disabled when none selected or while awaiting the service. These start the respective decision flow; approve may submit immediately.
- Reject selected reveals a visible textbox named "Rejection reason" and a button named "Confirm rejection". A whitespace-only reason must not reach the service; show a visible error and focus the reason control. Cancel rejection, if offered, must preserve selection.
- Submission failure is visible in a role=alert region and reveals a button named "Retry decision". Keep selection, decision and typed reason through failure; retry exactly that failed payload. Never report success before the promise resolves. Prevent concurrent duplicate submissions while pending.
- After success, announce it using role=status and reflect changed file statuses. A fresh page starts with the original fixture and fails the first valid service call; the second valid call succeeds. The service journal is harness-only and must not be imported or read by the app.

Make the complete workflow keyboard-operable with visible focus, readable light and dark styles, and useful behavior at 1280px and 320px viewport widths. Essential text must remain available; a labelled internally scrolling table region is allowed, but the page must not overflow horizontally. The host sets data-dp-theme="light" or "dark" on html, body class dp-theme, and supplies shared brand.css. Use its --eval-* variables if helpful. Use Plus Jakarta Sans and orange for primary emphasis with dark text; the provided brand palette is identical in both conditions. Do not add external network assets.

Automated acceptance is predeclared: TypeScript/build; required semantic controls; disabled ineligible selections; bulk selection; whitespace reason prevention/focus; failed rejection retains reason and selection then retries identical payload; successful approval/rejection updates statuses and clears selection; keyboard Tab/Space/Enter workflow; initial light/dark at 1280/320 with screenshots, page overflow, console errors and axe reports. These partial checks do not replace human design or accessibility review.
