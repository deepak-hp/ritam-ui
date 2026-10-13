# Reviewed client-side workflow examples

These files are generated mirrors of the reference app's workflow sources. They are runnable local demonstrations, not package exports or backend integrations. Read only the example relevant to the task, together with [COMPOSITION.md](../COMPOSITION.md), [README.md](../README.md), and the [generated contract](../contract.json).

- Invoices.tsx: records, filtering, detail focus return, and simulated reminder recovery.
- Settings.tsx: grouped local preferences, validation, failure recovery, and retained input.
- Onboarding.tsx: sequential local setup, review, completion, and restart recovery.
- Shell.tsx and workflows.css: the shared semantic shell and layout treatment.
- model.ts: fictional fixture data, validation, storage boundaries, and simulated latency.

The source of truth is reference/src/workflows/. Run npm run build to regenerate these mirrors; npm run ai:check verifies content-identical freshness while ignoring LF/CRLF checkout differences.
