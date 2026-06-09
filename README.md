# Material 3 Test Lab

A static Material 3 testing website for validating Material Web components, design tokens, interaction states, and responsive layout behavior.

## Run locally

```bash
npm run dev
```

Open <http://127.0.0.1:4173/> in a browser. The page loads the official Material Web components from jsDelivr and includes lightweight fallback custom elements so the layout remains usable if the CDN is unavailable in a restricted environment.

## Validate

```bash
npm run build
```

The build script performs a static smoke check that verifies the page shell, Material Web import URL, key Material components, and token styling are present.
