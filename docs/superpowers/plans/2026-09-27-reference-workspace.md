# Reference workspace implementation plan

**Goal:** Prove the UI package in a useful local project workflow.
**Architecture:** Standalone packaged consumer, one app shell/editor with a small storage/data module. No library source aliases or new UI dependencies.
**Stack:** Existing React, Vite, TypeScript and @deepak-ui/react tarball.
**Spec:** ../specs/2026-09-27-reference-workspace-design.md

- [x] UI task: implement app, storage/model, responsive styles and meaningful model tests under trial/reference/src. Use only exported library APIs; preserve approved tokens and fonts.
- [x] Integration task: create standalone package/configuration, reproducible pack/install script, browser acceptance test and usage docs. Verify the acceptance test fails before implementation.
- [x] Review: inspect app code, test main flows and accessibility, capture desktop/mobile in both themes, fix concrete defects in one batch and confirm.
- [x] Delivery: build and start the reference app, record evidence and make it available for user review.

Do not commit or publish. Do not change unrelated components. Existing repository is an uncommitted workspace, so keep the implementation isolated in its new directory instead of creating a worktree that cannot include it.
