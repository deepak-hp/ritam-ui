# Public beta completion plan

**Goal:** Complete the approved release sequence: GitHub review/CI, an actual multi-task AI comparison, additional accessibility evidence, MIT licensing and beta distribution, then an honest launch handoff.

**Authorization:** On 7 October 2026 the owner said “go ahead finish all” in response to this sequence, including license approval, hosting, npm publication and promotion. Proceed with the already proposed MIT license and version `0.1.0-beta.1`. Preserve Flame & Ink. No invented human feedback, native screen-reader results or certification.

**Architecture:** Keep the current reviewed React package and reference app. Put experimental generated output in a separate evaluation harness; don't replace production components with experiment output. Reuse the existing release gate. Remain on the existing release branch and preserve local review evidence.

- [x] Verify GitHub access and create/attach the release PR.
- [x] Observe hosted Linux checks and fix concrete failures (`cd7280a`, run 37526475891). Final-head checks still required below.
- [x] Apply MIT license and prepare a distributable beta package, including license/attribution in the archive and accurate installation guidance.
- [x] Run matched AI generations on three tasks, repeated per condition, keeping prompts/output/conditions; render and test outputs without silently improving them. Prepare condition-label-hidden human review, separating automated/AI observations from human results. All twelve attempts retained; see `trial/evaluation/RESULTS.md` and `AMENDMENTS.md`.
- [x] Extend browser/accessibility evidence in Chromium, Firefox and WebKit; retain concrete native/human test protocols and mark those unperformed gates honestly.
- [ ] Verify the final package and complete review, commit and push; merge only after the relevant hosted checks pass.
- [ ] Publish the catalogue and beta package where authenticated access permits. Verify live installation/site after publication.
- [x] Prepare/update truthful launch drafts and a concrete early-feedback protocol.
- [ ] Collect actual early-user feedback before claiming validated outcomes. No audience or testers have been invented.
- [x] Update master checklist with completed work, exact evidence and external requirements.

## Known access findings

- GitHub connector now has admin/push access; repository is private. PR: https://github.com/deepak-hp/ritam-ui/pull/1.
- npm whoami returned 401; the package lookup returned 404. Scope ownership and publication cannot be inferred from an absent package. Do not expose or scrape authentication tokens.
- The local machine is Windows. Safari/VoiceOver and independent human review cannot be replaced by simulated browser checks.
- RTK executable remains unusable; direct PowerShell is the documented fallback.

## Completion standard

Record the actual result of each item. A build or deployed preview is not evidence of native accessibility or human preference. If authentication, participants or native devices are missing, complete independent work and leave a concrete, small handoff rather than marking those items done.
