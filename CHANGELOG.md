# Changelog

All notable beta changes are recorded here. The package has not yet been published to npm.

## Unreleased

- Renamed the active library to Serein and the package to `@serein-ui/react`; existing `dp-*` style hooks and demo storage keys remain stable.
- Refined shared light/dark surfaces, primary and secondary states, typography, corners, status fills, and keyboard focus; added the Serein design studio.
- Removed redundant table frames and scroll wrappers, collapsed joined NumberField seams, and corrected Accordion borders and hover corners.
- Added a gated catalogue/Storybook hosting workflow, native accessibility review procedures, a real-application beta feedback kit, and an explicit support matrix.
- Corrected the production contrast verifier to understand minified three-digit CSS hex colours.
- Added release governance, package manifest validation, and a local/CI release gate.
- Added catalogue and workflow guidance and release-readiness evidence.
- Prepared `@serein-ui/react@0.1.0-beta.1` for public beta publication under the MIT License.
- Included the package license and third-party attribution in the npm archive.
- Corrected clean-checkout verification to build the library before type-checking installed-output playground imports.
- Updated the development tooling lockfile to patched `source-map-js@1.2.2` for [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).
