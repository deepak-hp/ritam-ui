# Documentation hosting

The public documentation site is one static GitHub Pages artifact:

- `https://deepak-hp.github.io/ritam-ui/?view=catalogue` opens the component catalogue.
- `https://deepak-hp.github.io/ritam-ui/storybook/` opens Storybook.
- `https://deepak-hp.github.io/ritam-ui/licenses/serein.txt` preserves the package license in the catalogue build.
- `https://deepak-hp.github.io/ritam-ui/catalogue-assets/ai/llms-full.txt` exposes the reviewed AI integration reference linked by the catalogue.

The build uses relative Vite and Storybook asset URLs, so the same artifact also works at a root path or custom domain. `actions/configure-pages` supplies the repository's actual base path; `build-site.mjs` validates it, records the resolved catalogue and Storybook paths in `site-metadata.json`, removes stale output, and refuses to assemble an artifact missing the reviewed AI guidance or licenses.

## Local build

Use Node 24 from the repository root:

```powershell
nvm use 24.11.1
npm --prefix trial ci
node trial/scripts/build-site.mjs --base-path /ritam-ui/
npm --prefix trial run test:browser-install
node trial/scripts/check-site.mjs
```

The output is the ignored `trial/site-dist` directory. `check-site.mjs` serves it at the base path recorded in `site-metadata.json` and runs the bounded Chromium checks below. For a root deployment, build with `--base-path /`. The root page redirects to `?view=catalogue` only when there is no query string; direct component and workflow links keep their query parameters.

Before deployment, verify all of these against the served artifact:

1. The root URL resolves to `?view=catalogue`, component selection and permalinks work, and a reload keeps the selected component.
2. `/storybook/` loads the manager, a component story and its docs page without missing assets.
3. The license and AI reference URLs above return the expected text files.
4. Browser developer tools show no requests escaping the configured repository path and no 404 responses.
5. `site-metadata.json` reports `/ritam-ui/?view=catalogue` and `/ritam-ui/storybook/` for the repository deployment.

## GitHub Pages setup and release gate

The repository owner or an administrator must complete the account-level setup. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The repository is currently private, and GitHub warns that a Pages site can still be public even when its source repository is private. Do not run the workflow or merge a change that triggers it until the privacy review, public-source gate and release checks are complete.

After those gates pass:

1. Confirm the default branch is `main` and the protected `github-pages` environment permits deployments only from `main`.
2. Merge the reviewed workflow and site-builder changes to `main`. The documentation workflow starts only after **Release checks** succeeds for that `main` commit, checks out that exact commit SHA, then builds and deploys it.
3. If a manual rerun is needed, run **Deploy documentation site** from `main`. The gate rejects other refs and rejects a `main` SHA without a successful completed **Release checks** run, so manual dispatch cannot bypass the release workflow.
4. Confirm the workflow's release gate, `Build catalogue and Storybook`, artifact upload and deployment steps all succeed.
5. Record the workflow run URL, deployed commit SHA and Pages URL in the release evidence.
6. Re-run the five served-artifact checks above against `https://deepak-hp.github.io/ritam-ui/`.

The workflow follows GitHub's custom Pages flow: `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4`, and `actions/deploy-pages@v5`, with `contents: read`, `pages: write`, and `id-token: write`. GitHub documents the setup and security-sensitive visibility behavior in [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). The `base_path` output is defined by the official [`actions/configure-pages` action](https://github.com/actions/configure-pages/blob/v5/action.yml), and the current deployment contract by [`actions/deploy-pages`](https://github.com/actions/deploy-pages/blob/v5/action.yml).
