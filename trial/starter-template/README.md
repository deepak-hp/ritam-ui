# Your app

A React/Vite starting point using a real local `@ritam-ui/react` package. It includes the approved tokens, font, accessible controls and document-wide light/dark themes.

## Run

Use Node 24.19 or later. If dependencies were not installed during creation, run `npm install --ignore-scripts`. Then:

```sh
npm run dev
npm run build
```

Vite prints the local preview URL. `build` runs strict TypeScript and creates `dist`. There is no backend. The form is a removable local example; only the theme choice is saved in browser storage.

## Keep it portable

Keep `vendor/ritam-ui-react.tgz`, package.json and package-lock.json together with this app. The library is unpublished and is installed from that archive, so it does not depend on the original library checkout. After the first successful install, `npm ci --ignore-scripts` reproduces the locked dependencies. Registry access is still needed for dependencies not already cached.

Read [UI-LIBRARY.md](UI-LIBRARY.md) and [AGENTS.md](AGENTS.md) before extending the UI. Import CSS/font once in `src/main.tsx`; no StyleX compiler is needed in this app. Native mobile and desktop components are not included.

## Verify changes

Run `npm run build`. Check meaningful labels, keyboard navigation, errors, narrow layouts and both themes. Screen-reader, native zoom and complete-app accessibility review remain your responsibility; this starter is not a compliance certificate.
