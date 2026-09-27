# Reference workspace

User approved the proposed reference app by asking to continue. Preserve the established visual system. Operate mode: a user finds a project, reviews its dates/status and updates its details.

Build a standalone Vite/React consumer under trial/reference, installing a local npm tarball rather than aliasing source. Its shell uses a slim header, project list as the main working area, compact filters and a drawer editor. On narrow screens controls stack and the semantic table may scroll inside its labeled region; the page must not overflow. Both light and dark themes are available.

Use fictional projects with stable IDs. Search name/client, filter status and date interval, clear filters, sort, paginate, create/edit projects and archive through confirmation. Save to browser localStorage; validate read data, handle inaccessible/corrupt storage visibly, and never silently report persistence success on failure. Preserve draft on save failure and offer retry. A plainly labeled demo control simulates the next save failure. Loading/saving states use the existing library.

Local-only scope: no authentication, cloud sync or backend claims. The app should explain this concisely. A help section explains data storage and the failure demo. Keyboard users can skip navigation and operate the full edit/filter flow.

Done means: standalone package install and TypeScript/build pass; browser checks cover search, filters, empty recovery, create/edit persistence after reload, validation, failed save/retry, archive, keyboard focus and both themes; axe checks cover initial and editor states; screenshots at 390px and 1280px are inspected.
