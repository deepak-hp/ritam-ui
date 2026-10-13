# Fresh file-review AI comparison

One new file-review task, two conditions (plain React/CSS; Serein plus current guidance), two independent fresh generators per condition. This tests the combined package/guidance treatment; it does not isolate the library effect. The task is outside the supplied invoice, settings and onboarding recipes. “Fresh task” is not a guarantee of a general holdout or unseen training data.

All four requested generators use `gpt-5.6-sol`, medium reasoning, at most 450 combined App/CSS lines, one initial attempt and at most one compiler/build correction. No browser feedback is given to generators. There is no claimed token or elapsed-time budget. Root dispatches fresh agents with `fork_turns: none`; exact dispatch text is in each `runs/ID/dispatch.txt`, full raw prompt in `prompt.txt`. Root records actual agent ID, start/end times and final response in each manifest/response file. The alias is recorded, not an unverifiable resolved model build.

## Frozen inputs and predeclared endpoints

`materials/fingerprint.json` records freeze time and SHA-256 hashes of the brief, package/guidance snapshot, shared service/brand, scripts and prompts. Do not run prepare again or alter those materials after generation starts. Initial/final generated source is archived automatically by the compiler script alongside diagnostics and timestamps; it refuses overwrite. Browser measurements also refuse overwrite. No post-hoc behavioral repair is permitted. Report any harness amendments separately and apply them consistently without replacing primary results.

The service owns five synthetic files: three pending, one approved, one blocked. First valid submission fails after 350ms; subsequent valid submissions succeed. A rejection needs a nonblank reason. Eligibility and request validation do not consume the first-failure counter. Returned fixtures are copies. Undo is deliberately out of scope.

Compiler records include TypeScript and Vite outcomes independently, line count, exact source/prompt hashes, tool versions and harness/fingerprint hashes. Browser endpoints, identical for each candidate, are:

1. Initial light/1280, dark/1280, light/320 and dark/320 renders: required heading/main, runtime errors, document overflow, screenshots and separate axe reports. Overflow failures do not prevent axe data capture.
2. Eligibility and bulk selection: disabled approved/blocked records, disabled actions with empty selection, select/deselect three pending records, no service calls.
3. Reject two files: whitespace reason blocked before service and focused, disabled decision controls while pending and repeated Enter attempts, first failure, visible alert, reason/selection retention, exact request retry, changed eligibility/cleared selection and success status.
4. Keyboard Tab/Space/Enter: select all, approve, disabled decision controls while pending and repeated Enter attempts, retry failed request, identical payload, changed eligibility and cleared selection.

These are partial checks. Visible status wording, mixed checkbox state, persistent focus visibility, complete keyboard operation of rejection, other state/theme combinations, native browser zoom and assistive technologies also require human inspection. Updated record state is checked through returned eligibility and exact service payload, not a layout-dependent row selector. Pending protection checks cover the scripted repeated Enter path, not every concurrency mechanism. Axe uses WCAG 2 A/AA, 2.1 AA and 2.2 AA tags; this does not prove conformance. Semantic selector failures are test failures requiring examination, not proof of user inability. Human review is not performed by agents.

## Run

Generation and measurement are complete; read [RESULTS.md](RESULTS.md) and [AMENDMENTS.md](AMENDMENTS.md) before interpreting primary failures. Do not rerun archived stages to build the packet.

For a clean clone, activate Node 24 on PATH, verify the version, install the trial lockfile, and recreate only ignored review assets:

```text
rtk node --version
rtk npm --prefix trial ci
rtk node trial/evaluation-next/scripts/replay-build.mjs
rtk node trial/evaluation-next/scripts/server.mjs 5194
```

The version check must report 24.x; historical measurement and replay validation used 24.19.0. On this machine an explicit Node path is `C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`. Use that path in place of `node` when PATH differs. npm must also run under Node 24. No production package rebuild or browser binary download is needed for this browser-served review packet: it uses the frozen package snapshot and the reviewer's normal browser. Open http://127.0.0.1:5194 and use `review/rubric.md`. Builds/runtime files and screenshots are ignored; JSON measurement evidence and sources are retained.

`replay-build.mjs` verifies all 48 frozen input hashes and the final source/prompt hashes for all four candidates before writing only `.runtime/replay/` and `builds/`. It creates the index and a build-only replay timestamp in `builds/replay.json`. It never overwrites archived compiler/browser reports, regenerates prompts, or claims historical measurements reran. Missing historical compiler/build successes remain unavailable rather than being silently repaired. Replay was validated locally by rebuilding all four verified final candidates; the clean-clone install command is documented, not represented as a newly executed clean dependency install.

The commands below are the original one-time generation/measurement commands, retained for protocol documentation; their immutable archives already exist:

Use `C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe` (24.19.0) explicitly; all shell commands start with `rtk`. From repository root:

```text
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe trial/evaluation-next/scripts/check.mjs ID initial
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe trial/evaluation-next/scripts/check.mjs ID final
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe trial/evaluation-next/scripts/browser.mjs ID
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe trial/evaluation-next/scripts/review.mjs
rtk C:/Users/deepa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe trial/evaluation-next/scripts/server.mjs 5194
```

The generators run the two compiler stages. Root runs browser measurements once after generation for every candidate, including failed candidates so blocked outcomes remain explicit. Local browser execution may need elevated sandbox permission for loopback access. The script uses dependencies from trial/node_modules and browser binaries from trial/.playwright, without changing manifests.

Before generation, a separate native HTML smoke fixture (`c000000`, excluded from the four-candidate denominator) validated service contracts, CSS import declarations, compiler mechanics and all seven browser scenarios. A first sandbox attempt could not access loopback; it is retained in `evidence/preflight-history/network-denied`. The successful elevated preflight is `evidence/preflight.json` and `evidence/c000000`. Do not rerun smoke after the freeze; it copies current package files and is a setup tool only.

## Review and interpretation

The review server serves only build outputs. Candidate documents are isolated so library CSS cannot affect other candidates. `review/` contains condition-label-hidden objective results, rubric and an empty observations sheet. `condition-key.json` is ignored locally and kept outside reviewer assets; it is a mapping, not a credential. Manifests and generator prompts also expose conditions and must not be shared before review. Opaque IDs use fixed ordering; visual appearance may reveal the condition, so this is label-hidden review, not guaranteed blinding or randomized paired review. Missing or failed candidates remain visible.

Report all four candidates in denominators. Keep compiler, interaction and render outcomes separate; no combined quality score or claimed winner. This is one task, two repeats, one requested model alias, shared workspace access (instructed restrictions rather than technical isolation), unequal documentation exposure and no independent human design review. Results do not establish broad AI superiority, general accessibility conformance, external adoption or a guaranteed holdout.
