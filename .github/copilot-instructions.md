<!-- Generated: AI agent guidance for this repo -->
# Copilot / AI Agent Instructions

Purpose
- Quickly orient AI coding agents to the app architecture, developer flows, and project-specific patterns so suggestions and edits are immediately useful.

Big picture
- Single-page React app bootstrapped by Create React App (`react-scripts`). Entry is [src/index.js](src/index.js).
- Main UI: `App` composes a map (`src/components/Map.js`) and `Footer` (`src/components/Footer.js`). Map rendering uses `maplibre-gl` and several local GeoJSON assets in `src/assets/` (e.g. `veloway.geojson`).
- Static shell is in `public/index.html`; assets are imported directly in source files (Webpack/CRA handles GeoJSON and SVG -> ReactComponent imports).

Key files to consult when making changes
- Application entry: [src/index.js](src/index.js)
- App composition: [src/App.js](src/App.js)
- Map implementation & maplibre usage: [src/components/Map.js](src/components/Map.js)
- Footer + SVG imports: [src/components/Footer.js](src/components/Footer.js)
- Tests that mock maplibre: [src/App.test.js](src/App.test.js)
- Build / scripts: `package.json`

Developer workflows & commands
- Start dev server: `yarn start` (uses `react-scripts start`).
- Build production bundle: `yarn build`.
- Run tests (CI-friendly): `yarn test` — note test script passes `--env=./custom-test-env.cjs` (see `package.json`).
- Husky & lint-staged are configured: run `yarn prepare` to install hooks; staged JS/JSX files run `npx eslint`.
- Run the linter: run `npx eslint`, which should run cleanly before calling a task completed.

Project-specific conventions & patterns
- Functional React components with default exports. When adding components follow existing folder structure `src/components/<Name>.js` and styles in matching `*.css` files.
- Map pattern: create sources with `map.addSource(...)` and layers with `map.addLayer(...)` on `map.on('load')`. Always remove the map in `useEffect` cleanup (`return () => map.remove()`).
- GeoJSON and SVGs are imported directly (e.g. `import veloway from '../assets/veloway.geojson'`; `import { ReactComponent as CoPilotText } from '../assets/githubcopilot-text.svg'`). Keep file paths relative to the importing file.
- Tests mock `maplibre-gl` to avoid rendering real maps. When adding tests that touch `Map.js`, mirror the jest mock approach from `src/App.test.js`.

Integration points & external dependencies
- maplibre-gl (rendering), OpenStreetMap raster tiles (configured in `Map.js`), Create React App toolchain (`react-scripts`).
- Tests rely on Jest and @testing-library. Map behavior should be tested with mocks rather than real map rendering.

What to avoid or take care of
- Do not try to initialize a real map in unit tests — use the existing jest.mock pattern.
- Be conservative changing `package.json` scripts because CI/test runner expects the custom env `custom-test-env.cjs`.
- Keep SVG imports as `ReactComponent` when they are used inline (Footer pattern).

Examples (copyable)
- Start dev server:
  - `yarn start`
- Run linter once (CI):
  - `npx eslint`
- Run tests once (CI):
  - `yarn test` 

If something is unclear or you need deeper context, open the files listed above and include code references in PRs. Ask for the preferred behavior before making large architectural changes.

-- End of guidance
