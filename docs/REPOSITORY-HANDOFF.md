# Repository handoff

Display name: **Ritam UI**. Repository: [deepak-hp/ritam-ui](https://github.com/deepak-hp/ritam-ui).

The name alludes to ṛta, the Indian idea of order and right arrangement, as a symbolic connection to the founder's astrology-inspired identity. It is not a claim that a birth chart prescribes this name. Meaning references: [Rta / Ritam](https://asivanayoga.com/blogs/sanskrit/rta) and [University of Calicut Sanskrit material](https://sde.uoc.ac.in/sites/default/files/sde_videos/VI_Sem-BA_SanskritCore_Course-Culture_and_environmental_science_in_sanskrit.pdf).

A public-web check found other uses of Ritam, including an unrelated Kotlin project. No trademark, domain or registry-package availability is guaranteed. The local unpublished package is now `@ritam-ui/react`; imports, examples and generated apps use that scope.

## Ready before push

- The user supplied `https://github.com/deepak-hp/ritam-ui.git` for the initial push on 28 September 2026. The remote was empty when checked.
- Root `.gitignore` excludes `.research/` and `design-system/`, which contain private chart research and outdated design drafts. They remain on disk.
- Existing nested ignores exclude dependencies, generated builds, browser profiles, local package archives and verification captures.
- Use `trial/README.md` for the actual build/setup commands. Rebuild the local tarball with `reference:setup` after cloning; the reference app's vendor archive is intentionally not committed.
- The committed reference lockfile names a local archive generated from this source. Run `reference:setup` before installing/running that app; do not start with `npm ci` inside `reference`.
- Before the first push, inspect the staged file list and contents for secrets/private data, confirm the intended remote and run the relevant checks. Do not force-push or overwrite existing remote history.
- Public release still requires an explicit license choice, package/name ownership and release accessibility review. This local milestone does not publish a package or certify accessibility.

The repository is a source handoff. No npm package is published by pushing it to GitHub.
