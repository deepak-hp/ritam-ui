# AI composition guidance implementation plan

**Goal:** Help assistants compose purpose-specific screens with the existing library, and provide a reproducible first comparison.

**Architecture:** Keep the public component API and Flame & Ink unchanged. Ship a small composition guide alongside the generated API documentation. Add a reference-app comparison route using identical invoice data, public controls, and shared working interactions. Independently generate the two layouts; label this as an illustrative pilot, not proof of general AI improvement.

**Tech stack:** Existing React, TypeScript, compiled library CSS, Vite, Playwright and axe.

**Approved brief:** The conversation's six-point proposal and the user's instruction to continue to completion. No new approval is needed for this milestone. The user will create the remote repository after receiving a name recommendation.

## Constraints

- Preserve approved palette, Plus Jakarta Sans, orange/dark-label actions and limited green.
- No package rename, publication, remote creation or push without the user-provided repository.
- No personal birth data in distributed docs or new public files.
- Generated claims must distinguish inspected APIs, automated checks and subjective visual judgments.
- One screen pilot only; broader model evaluation is future work.
- Reuse the existing checkout with its extensive uncommitted work; do not discard or relocate it.

## Checklist

- [x] Recommend name and repo slug after meaning and obvious-collision research.
- [x] Add `trial/ai/COMPOSITION.md`: brief, recipe selection, design decisions, review rubric and three task recipes.
- [x] Include guide in generated AI text and fingerprint; link it from starter instructions; check freshness.
- [x] Add comparison at `?view=composition`: shared invoice fixture, two independently generated layouts, same actions/content, light/dark, narrow view and neutral labels.
- [x] Record exact shared brief, differing context, model and limits in `trial/docs/COMPOSITION-PILOT.md`.
- [x] Verify search/filter/detail, keyboard use, data parity, no page overflow, light/dark, automated accessibility and builds.
- [x] Independent code and visual review; address material findings. Final reviewer disposition: ship; the one accessibility parity repair was verified resolved.
- [x] Prepare safe repository handoff excluding private research, local data and generated artifacts. Do not push yet.

## Results

Recommended Ritam UI / `ritam-ui` with public meaning references and a collision caveat. No package rename, remote or push. Private research/historical drafts remain on disk and are ignored by Git. Three practical recipes ship in the AI guide and Storybook. The pilot found no overall visual winner: a guide alone did not consistently eliminate weak choices, reinforcing the need for a rendered review loop.

Verified 16 layout/theme/width browser cases plus pair reflow/shared state and keyboard/focus; 9 reference unit tests; 8 starter tests; existing reference workflow; AI freshness; package, reference and Storybook builds. Existing build warnings remain. Detailed scope is in `trial/docs/VERIFICATION.md`. A fresh independent reviewer found one table-scroll instruction inconsistency; both variants now receive unique descriptive region names, and the focused suite passed again.

## File ownership and review

Main agent owns shared comparison behavior, integration, guide generation, verification and plan. Independent layout workers own only their one TSX and CSS pair. Naming worker is read-only. Identical view props/fixture and shared controls prevent differing data or interactions from biasing the comparison. Baseline receives the brief/API/identity only; guided worker additionally receives the composition guide. Only accessibility/build repairs are made after generation and recorded. A reviewer evaluates the shipped result and limits, not a claim that one generated pair establishes causation.

## Done checks

Run `npm run build`, `npm run ai:check`, `npm run reference:setup`, `npm run reference:build`, `npm run reference:test`, focused comparison browser checks and existing `npm run check:reference`. Inspect desktop and narrow captures. Document actual results and open limitations. Recommend the name without asserting trademark clearance.
