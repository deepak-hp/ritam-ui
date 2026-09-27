# Storybook, AI integration and accessibility implementation plan

**Goal:** Make the approved library inspectable in Storybook and usable by AI agents, with explicit accessibility evidence and a chart-based name proposal.

**Architecture:** Storybook renders the compiled React library and shared CSS. The official Storybook MCP addon supplies live discovery, with portable text/JSON documentation alongside it. Accessibility combines automated structural checks, interaction stories, contrast checks and a documented manual audit boundary.

**Stack:** React, Base UI, StyleX, Storybook React/Vite, official docs/a11y/MCP/Vitest addons.

**Approved scope:** User approved Storybook and requested AI integration, accessibility including EAA/WCAG 2.2, and modern astrology-inspired naming. Preserve the visual direction and unpublished package name until a name is selected. Do not include private birth details in distributed docs.

## Deliverables

- [x] Configure `.storybook`, stories for every exported component, controls, document-level themes and reduced-motion preview.
- [x] Build Storybook; verify real component interactions and automated accessibility checks.
- [x] Enable and probe the official local MCP endpoint and generated component manifest; document client setup without silently editing global AI settings.
- [x] Add an AI entry point, portable component contract, examples and agent instructions. Validate references against actual exports and package contents.
- [x] Fix concrete accessibility defects, add axe and contrast regression checks, and document WCAG/EAA scope plus pending assistive-technology/manual evaluation.
- [x] Research the documented chart and propose three modern names in `design-system/NAMING.md`; no automatic package rename.
- [x] Run tests, type checks, package/playground/Storybook builds and compiler-free consumer check; inspect the running Storybook.

## Completion evidence

Record exact commands and outcomes in the implementation documentation. Passing automated tests is not a claim of WCAG or EAA conformance. Actual app content, complete processes and applicable product/service obligations still require evaluation.
