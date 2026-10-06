# Release guide

Ritam UI `0.1.0-beta.1` is licensed under MIT and configured as a public npm package under the `beta` tag. It has not yet been published. Until registry publication is verified, installation guidance must use a locally produced tarball.

## Local release gate

Use Node 24 and a clean dependency install in `trial`:

```sh
npm ci
npm run test:browser-install
npm run check:release
```

The gate checks source tests, types, library and playground builds, tarball contents, a strict consumer, SSR/hydration, generated AI material and freshness, Storybook interactions, the installed reference workspace, starter generation, live Storybook documentation and UI checks, and reference/catalogue/workflow/material checks. It starts its own Storybook and reference preview on available loopback ports and stops those children on success or failure. It never kills an existing user server. Browser installation is separate so local users can choose when to download it; the script sets the same local Playwright path used by the checks.

`npm run reference:setup` builds a fresh package tarball, installs it into the reference app, and updates the tracked reference manifest and lockfile hash. The generated `reference/vendor` archive is untracked. Every fresh clone must run setup before `npm run reference:build` or reference checks.

## Owner checklist

1. Review `git status`, `CHANGELOG.md`, package metadata, package manifest output, and current audit results. Run `npm audit` from `trial`; the last inventory found zero findings across 401 dependencies, which must be rechecked rather than assumed.
2. Run the local release gate and complete the manual accessibility and browser review recorded in `docs/RELEASE-READINESS.md`.
3. Confirm the root and packaged MIT licenses are identical, the package contains `THIRD_PARTY_NOTICES.md`, and the package guard accepts only the approved beta version, public access, `beta` tag, license and attribution files.
4. Enable private vulnerability reporting and add the resulting repository link to `SECURITY.md`. Configure npm trusted publishing or another owner-approved credential method; do not put long-lived registry credentials in CI. The latest npm authentication check returned 401, so publication remains blocked until owner-controlled authentication is available.
5. After the reviewed release commit and hosted checks pass, create an annotated `v0.1.0-beta.1` tag and publish manually from `trial` with `npm publish`. The manifest's `publishConfig` applies public access and the `beta` tag. Confirm the registry metadata and install the published beta in a clean consumer before changing documentation from local tarball installation.
6. Promote the repository/site and send any announcement only after the prior checks and explicit owner authorization. Keep rollback material: the prior package version, tag, changelog, and documented deprecation or remediation plan.

The CI workflow validates changes but does not publish, deploy, use registry secrets, or change repository settings.
