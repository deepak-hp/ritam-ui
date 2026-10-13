# Accessibility validation — 14 October 2026

## Scope and evidence boundary

This focused audit supplements the release-CI baseline already reported as passing at commit `d8f8c547cfaa08552ca3d88b54b338692ed62836`. It did not rerun the full suite. The audit reviewed the library source, `trial/reference/ACCESSIBILITY-REVIEW.md`, `trial/docs/ACCESSIBILITY-EVIDENCE.md`, and the existing component, workflow, menu/select, layout, and reference accessibility checks.

The review found useful browser-automation gaps around disabled composite-widget options, stacked modal focus, stale validation, stable live-region updates, and a bounded target-size check. `trial/scripts/check-accessibility-gaps.mjs` adds an isolated Vite fixture and exercises those cases against the built library. It writes results and screenshots below `trial/.review/accessibility-gaps/`; the fixture server uses an ephemeral loopback port and is closed by the script.

Automated browser behavior is evidence only for the tested DOM states and scripted interactions. It is not native assistive-technology evidence, human visual review, a WCAG conformance claim, or a substitute for the pending review protocol.

## Environment

- Candidate: `d8f8c547cfaa08552ca3d88b54b338692ed62836`
- Host: Microsoft Windows `10.0.26300.9550`
- Node: `24.19.0`, from `C:\Users\deepa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`
- Playwright: `1.63.0`
- Playwright Chromium: `153.0.8010.12`
- Playwright Firefox: `155.0`
- Playwright WebKit: `26.6`

Playwright Firefox is not a native Firefox plus NVDA run, and Playwright WebKit on Windows is not Safari plus VoiceOver.

## Automated results

Every row passed in Chromium, Firefox, and WebKit.

| Scenario | Automated observation | Result |
| --- | --- | --- |
| Disabled combobox option | The option exposes `aria-disabled="true"`; keyboard selection leaves the original value unchanged. | Pass in 3 engines |
| Select and menu keyboard handling | Select End/Enter activates the last enabled value. A disabled menu item exposes disabled semantics; Enter activates an explicitly focused enabled menu item. This case does not verify arrow-key skipping of disabled items. | Pass in 3 engines |
| Dialog nested in Drawer | Focus settles inside each opened layer. The first Escape closes only the nested dialog and returns focus to its trigger; the second closes the drawer and returns focus to the drawer trigger. | Pass in 3 engines |
| Validation recovery | Invalid submit creates an alert, sets `aria-invalid`, and focuses the field. Entering a valid value removes the stale error and invalid state. | Pass in 3 engines |
| Live status semantics | A persistent `role="status"` node updates from `Ready.` to `Saved.` without replacement. This verifies DOM semantics, not what a screen reader announces. | Pass in 3 engines |
| Text spacing and bounded target size | At a 320 CSS-pixel viewport with WCAG text-spacing stress CSS, the page has no horizontal overflow. Six visible buttons/comboboxes in the closed-layer fixture are at least 24 by 24 CSS pixels. | Pass in 3 engines |
| Forced-colour focus | With Playwright `forcedColors: "active"`, the focused submit button has a 2 CSS-pixel solid outline and uses the system button text colour. | Pass in 3 engines |

No library defect was reproduced. Static review initially raised a question because `ComboboxOption.disabled` is not repeated as an explicit prop on the JSX item. Browser behavior showed that Base UI carries the disabled state from the item collection: the rendered option is exposed as disabled and rejects selection in all three engines.

Results are stored in:

- `trial/.review/accessibility-gaps/chromium/results.json`
- `trial/.review/accessibility-gaps/firefox/results.json`
- `trial/.review/accessibility-gaps/webkit/results.json`
- `trial/.review/accessibility-gaps/<engine>/text-spacing-320.png`
- `trial/.review/accessibility-gaps/<engine>/forced-colours.png`

## Exact commands

Run from `trial`:

```powershell
rtk C:\Users\deepa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe .\scripts\check-accessibility-gaps.mjs chromium
rtk C:\Users\deepa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe .\scripts\check-accessibility-gaps.mjs firefox
rtk C:\Users\deepa\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe .\scripts\check-accessibility-gaps.mjs webkit
```

The audit did not need an npm command. If one is needed for later work, the required npm CLI is `C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js` and should be invoked through the same Node 24 executable.

## CI integration

The release workflow now runs this script explicitly for Chromium, Firefox, and WebKit after its existing browser checks. The cases cover behavior that the current unit tests and Chromium-only menu/layout scripts do not jointly exercise: disabled composite-widget options, stacked modal Escape/focus return, stale validation cleanup, and a stable live-status node. The script owns and closes its ephemeral Vite server; the workflow supplies the Playwright browsers. The results above are local Windows observations; the new workflow still needs its own passing hosted run.

## Failures and remaining human gates

There were no failures in the new automated scenarios.

| Required check | This session | Reason and next evidence needed |
| --- | --- | --- |
| NVDA + native Firefox | Blocked | Neither `nvda.exe` nor a native Firefox installation was found. Run the complete protocol on a Windows device with both installed and record exact announced words. |
| VoiceOver + Safari | Blocked | The available host is Windows. Run the complete protocol on macOS with native Safari and VoiceOver. |
| Actual browser zoom at 200% and 400% | Blocked | Native UI automation is unavailable. Playwright viewport and injected text-spacing checks do not operate the browser zoom UI. A person must run the protocol in the named final browsers. |
| Native Windows light/dark contrast themes | Blocked | Native UI APIs are unavailable. Playwright forced-colour emulation passed, but it is not evidence for actual Windows contrast themes. |
| Screen-reader error and status announcements | Pending human review | DOM roles, focus, and stale-state removal passed; interruption order, repetition, and announced wording require native AT observation. |
| Complete target-size and rendered contrast review | Pending human review | The new test measures six visible fixture targets only. A person must assess every non-inline control, spacing exceptions, state boundaries, and measured contrast in complete product flows. |
| Complete keyboard and focus-obscuration review | Pending human review | The new layered path and existing scripted paths pass, but a person still needs to traverse every control and open-layer state in final browsers and record visible focus behavior. |

These blocked rows remain open release gates; the automated passes do not change their status in `trial/reference/ACCESSIBILITY-REVIEW.md`.

## Background keyboard follow-up

Later on 14 October 2026, the checks were extended against the library rebuilt from `ac565b6b3804a892051ba3e73a0e10609fd3e61f`. The earlier result table is retained as a historical record. The Select/menu case now uses arrow keys to reach every item instead of directly focusing an enabled menu item:

- ArrowDown and ArrowUp reach the disabled item in each widget. Disabled items remain discoverable; focus alone does not mean an action is available. This matches the disabled-menu behavior in the [W3C menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).
- Enter and Space on those disabled items leave the selected value/action unchanged, retain focus and keep the popup open.
- Home/End move to the expected items; Enter activates an enabled item; both selection and Escape dismissal return focus to the trigger.

All six scenarios passed again in each of headless Chromium `153.0.8010.12`, Playwright Firefox `155.0` and WebKit `26.6` with Node `24.19.0` and Playwright `1.63.0`: **18 scenario passes, zero failures**. The script used isolated contexts and its own temporary loopback server; it did not operate any desktop browser window. No component implementation changed.

Commands: `npm run build`, followed by the three exact script commands above using the recorded Node 24 executable. The first sandboxed Chromium launch could not access loopback (`ERR_NETWORK_ACCESS_DENIED`); the approved run with loopback access and both subsequent engines exited `0`. Result JSON at the paths above records the expanded scenario name, engine versions and empty failure arrays. The existing release workflow already invokes this script in all three engines; this test revision still requires its own hosted run. The prior main revision passed [release CI 38457458042](https://github.com/deepak-hp/ritam-ui/actions/runs/38457458042).

Native Firefox/NVDA installation was also completed and verified in this follow-up. See the separate [Windows setup record](2026-10-14-windows-setup.md) for the changed setup status and actual native browser automation blocker. Installation and headless results do not constitute a native screen-reader pass.
