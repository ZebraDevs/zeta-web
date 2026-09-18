---
name: init-zeta-react
description: Use when the user wants to start a brand-new React project built on Zebra's zeta-web design system. Assumes zeta-web is already installed/available. Scaffolds a Vite + React 19 + TypeScript app, ensures @zebra-fed/zeta-icons is present, wires up global styles, and creates a working example component.
usage: "Provide a project name (and optionally a short description). Example: /init-zeta-react my-app - a customer dashboard"
---

# Initialize a New React + Zeta-Web Project

This skill scaffolds a brand-new Vite + React 19 + TypeScript project pre-configured with Zebra's zeta-web design system. It assumes `@zebra-fed/zeta-web` is already accessible to you (you wouldn't be running this skill otherwise), and focuses on app setup, ensuring zeta-icons is installed, and wiring everything correctly.

## 0. Parse the project name

Extract the project name from the prompt. It should be a valid directory name (lowercase, hyphens OK). If no name is provided, ask the user for one before proceeding.

**Example input:** `/init-zeta-react my-app - a customer dashboard`  
**Extracted name:** `my-app`

## 0.5. Preserve .claude directory

If a `.claude` directory exists in the current project root, back it up to a temporary location before scaffolding, since the next step will create a fresh project structure:

```bash
if [ -d ".claude" ]; then
  TEMP_CLAUDE=$(mktemp -d)
  cp -r .claude "$TEMP_CLAUDE"
  echo "Backed up .claude to $TEMP_CLAUDE"
fi
```

Save the `$TEMP_CLAUDE` path so you can restore it after scaffolding.

## 1. Scaffold the project

Run the Vite React template to create a base project:

```bash
npm create vite@latest <project-name> -- --template react-ts
cd <project-name>
```

This creates a minimal React 19 + TypeScript + Vite setup with the JSX transform already configured correctly (standard `"jsx": "react-jsx"` in tsconfig.json).

### 1.5. Restore .claude directory

If you backed up `.claude` in step 0.5, restore it now to the new project root:

```bash
if [ ! -z "$TEMP_CLAUDE" ] && [ -d "$TEMP_CLAUDE" ]; then
  cp -r "$TEMP_CLAUDE/.claude" .
  echo "Restored .claude to project root"
fi
```

## 2. Install dependencies

First install the base Vite/React dependencies:

```bash
npm install
```

Since you're running this skill, `@zebra-fed/zeta-web` is already accessible to you (either as a local checkout or installed). You may or may not have `@zebra-fed/zeta-icons` yet, so ensure it's present as an explicit dependency:

```bash
npm install @zebra-fed/zeta-icons
```

(zeta-icons is technically a transitive dependency of zeta-web, but consuming apps import from it directly for types like `ZetaIconName`, so it should be explicitly in your app's own `package.json`.)

**Troubleshooting**: These packages are on Zebra's private Google Artifact Registry. If you see 401/403 errors, your npm/yarn credentials need refreshing — check `~/.npmrc` or `~/.yarnrc.yml` for an unexpired auth token and ask your team for registry setup help if needed.

## 3. Confirm React version

Open `package.json` and verify `react` is at least version 19:

```json
"dependencies": {
  "react": "^19.x.x",  // ✓ Must be 19 or later
  "react-dom": "^19.x.x"
}
```

Zeta-web requires React 19+ for native web component interop in JSX. If the template somehow created React 18 or earlier, update it:

```bash
npm install react@latest react-dom@latest
```

If React is ≥19, proceed.

## 4. Wire up global styles

Edit `src/main.tsx` and add the zeta-web global stylesheet import **before** rendering:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@zebra-fed/zeta-web/index.css";     // ← Add this line
import "@zebra-fed/zeta-icons/index.css";   // ← Add this line too (see note below)
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

This loads all design tokens (colors, spacing, typography, elevation, etc.) and ensures the component library's styles are available globally.

**Why import `zeta-icons/index.css` explicitly, when zeta-web components (button, search, etc.) already pull in the icon font as a side effect of importing `zeta-icon`'s internal styles?** That transitive import is an implementation detail, not a guarantee, and it silently breaks in one common setup: if `@zebra-fed/zeta-web` is resolved through a symlink (e.g. `npm link`, or a local checkout linked in for zeta-web development), Node resolves its internal `@zebra-fed/zeta-icons` import against *that linked package's own nested `node_modules`*, not this project's. Vite's dev server enforces `server.fs.allow` and returns `403` for files outside the project root, so the icon font 404s/403s and icons render as literal text (e.g. "search") instead of glyphs — even though the font-face CSS itself loads fine.

Importing `@zebra-fed/zeta-icons/index.css` directly from this project's own `main.tsx` forces it to resolve through this project's own `node_modules` (always in-bounds for Vite), independent of how `zeta-web` itself is resolved. This matches the zeta-icons README's own documented usage ("the fonts... need to be imported via css") — treat it as an explicit dependency of the app, not something to rely on another package to load for you.

## 5. JSX typing (usually automatic)

As of zeta-web ≥0.5.3, `<zeta-*>` components are automatically typed in React JSX via the installed package's `jsx.d.ts` — no manual tsconfig merge needed. If TypeScript ever complains that a `zeta-*` component doesn't exist on `JSX.IntrinsicElements`, you can add this to your project's `src/vite-env.d.ts` or `tsconfig.json`:

```ts
import { CustomElements } from "@zebra-fed/zeta-web/jsx.d.ts";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
```

But this should not be necessary with current versions.

## 6. Create a minimal working example

Replace the boilerplate `src/App.tsx` with a real zeta-web component to prove the setup works:

```tsx
import "@zebra-fed/zeta-web/components/button/button.js";

function App() {
  return (
    <div style={{ padding: "var(--spacing-6)" }}>
      <h1>Welcome to Zeta</h1>
      <zeta-button flavor="primary">Hello Zeta Web</zeta-button>
    </div>
  );
}

export default App;
```

This demonstrates:
- Importing a specific component (not the whole library, to keep bundle size small)
- Using a component as a kebab-case HTML element
- Passing attributes (flavor="primary")
- Using a design token for spacing (`--spacing-6`)

## 7. Verify the project builds

Run the build to ensure TypeScript and Vite are both happy:

```bash
npm run build
```

This runs `tsc` type-checking and Vite's production build. Confirm the output says something like `✓ 123 modules transformed` and completes without errors.

If the build fails, check the error output carefully — it will point to missing types or syntax issues. Most common: a component import path is wrong (check against the `/use-zeta-react` skill for the exact pattern).

## Done!

The project is now ready:
- `npm run dev` starts a dev server at `http://localhost:5173/`
- The `/use-zeta-react` skill is available to guide component usage
- The `/use-zeta-react-discovery` skill lets you explore available components and tokens
- You can import more zeta-web components as needed (see `/use-zeta-react` → "Import & Basic Usage" for the import pattern)

When building new components or pages, always run `/use-zeta-react` first — it ensures you're using the library correctly and following Zebra's design system conventions.
