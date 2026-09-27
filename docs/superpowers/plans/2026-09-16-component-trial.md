# Component trial implementation plan

Goal: prove Base UI + StyleX can deliver Deepak's chosen web design and a compiled package consumable without a StyleX compiler.

Architecture: isolated trial/ npm package, src library with StyleX compiled using Babel and esbuild into dist JS/CSS/types. Vite playground imports built package. A separate consumer smoke build installs a tarball. No publication or native implementation.
Stack: React, TypeScript, Base UI, StyleX, Vite, Vitest/Testing Library, CSS motion, locally served Plus Jakarta Sans.

Approved design: typography B Plus Jakarta Sans; colour C Flame & Ink (#FF681F, #090A0C, #1C1E23, white); A+C components with filled 2px-radius orange primary, outlined secondary, open rows; minimal green for success. Avoid dull orange, blue accents, excessive cards. Prototype state controls clearly say simulated; no actual email or payment.

Tasks:
- [ ] Establish build and tests; package precompiled StyleX and token CSS.
- [ ] Build Button, TextField, Select, Dialog with accessible states; test behavior first.
- [ ] Build state-driven sending/pending/success/error SVG feedback with reduced-motion fallbacks; asynchronous callback controls success; clean up/cancel stale requests.
- [ ] Build polished light/dark responsive playground showing real components and interactive scenarios, no fake functioning controls.
- [ ] Run tests, typecheck, build, tarball consumer smoke; inspect browser desktop/mobile and keyboard/overlay behavior; review and fix.
Done means passing checks plus usable preview. Native support and broad production readiness explicitly deferred.

