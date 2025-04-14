<h1 class='sbdocs-title'>@zebra-fed/zeta-web</h1>

Zeta Web is a native web component library created by Zebra Technologies written in TypeScript.  
The Zeta Design System includes foundations, components, and best practices that can be used when building UX.

> 🚧 **Note**: This package is in pre-release, and so many aspects are incomplete.

## Previewing the components

To view examples of all the components in the library, you can pull this repo and run the Storybook instance.

You can also view the latest release at [Zeta](https://design.zebra.com/) or the latest commits to main [here](https://zeta-web-main.web.app/).

## How to Use

Zeta Web Components can be directly used in many web frameworks including Angular and React (from v19).

1. Install `@zebra-fed/zeta-web`

   ```sh
   # NPM
   npm install @zebra-fed/zeta-web
   # YARN
   yarn add @zebra-fed/zeta-web
   ```

2. Import the global styles into the main app file

   ```js
   import "@zebra-fed/zeta-web/index.css";
   ```

   or in HTML,

   ```html
   <link rel="stylesheet" href="./node_modules/@zebra-fed/zeta-web/dist/style.css" />
   ```

3. Import the desired Zeta Web Component, or the full package into your app:

   ```js
   // Individual button component
   import "@zebra-fed/zeta-web/dist/components/button/button.js";

   // or full package
   import "@zebra-fed/zeta-web";
   ```

   or in HTML,

   ```html
   <!-- Individual button component -->
   <script type="module" src="./node_modules/@zebra-fed/zeta-web/dist/components/button/button.js"></script>

   <!-- or full package-->
   <script type="module" src="./node_modules/@zebra-fed/zeta-web/dist/index.js"></script>
   ```

   To reduce bloat, we recommend only importing the components you will actually use into your project.

4. If you use any element that uses icons, you will also need to import the index.css from [@zebra-fed/zeta-icons](https://www.npmjs.com/package/@zebra-fed/zeta-icons).

   > 🚧 **Note**: This is a temporary step for now. This will be automatically imported where needed in the future.

   ```js
   import "@zebra-fed/zeta-icons/index.css";
   ```

   or in HTML,

   ```html
   <link rel="stylesheet" href="./node_modules/@zebra-fed/zeta-icons/index.css" />
   ```

   Full list of icons can be found at [Zeta Icons](https://design.zebra.com/icons/).

5. Use the Web Component like any HTML element

   ```html
   <zeta-button>Hello world!</zeta-button>
   ```

### React

From React 19 web-components work natively. `zeta-web` can be imported into your React project and used directly in JSX.

#### TypeScript and "JSX.IntrinsicElements" errors.

As of v0.5.3 this issue should no longer occur.

If you find TypeScript complains that `Property 'zeta-*' does not exist on type 'JSX.IntrinsicElements'`, you need to add the declared zeta components into React's JSX.IntrinsicElements namespace. To do this:

```ts
import { CustomElements } from "@zebra-fed/zeta-web/jsx.d.ts";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
```

## Developer Experience

To improve the development experience while using the zeta web-components, the following packages can be useful:

### [`ts-lit-plugin`](https://www.npmjs.com/package/ts-lit-plugin)

ts-lit-plugin adds type checking and code completion to lit-html. To install, first setup typescript in your project, then run:

```bash
# NPM
npm install ts-lit-plugin -D

# Yarn
yarn add -D ts-lit-plugin
```

and add the plugin to your tsconfig.json:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "ts-lit-plugin"
      }
    ]
  }
}
```

### [CSS Variable Autocomplete](https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables)

This extension makes working with CSS variables easier by showing the values of variables when you hover over them and displaying colors inline in the IDE.
To use this, install it in VSCode, and add the following into .vscode/settings.json:

```json
{
  ...
  "cssVariables.lookupFiles": [
    "node_modules/@zebra-fed/zeta-web/primitives.css",
    "node_modules/@zebra-fed/zeta-web/semantics.css",
    // Add other css files here
  ]
}
```

This configuration will show light mode / regular contrast tokens on hover.

> **Note:** The primitives.css file and semantics.css files should **not** be used in your app as these only contain a subset of the styles; rather import **index.css**, as this contains all rules.

## Licensing

This software is licensed with the MIT license (see [LICENSE](./LICENSE) and [THIRD PARTY LICENSES](./LICENSE-3RD-PARTY)).
