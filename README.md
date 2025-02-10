<details class="repo-header">
    <summary>Zebra Repository Information</summary>
    <ul>
        <li> Zebra Business Unit : DMO - Innovation & Design</li> 
        <li> Zebra Manager : ncvt73 </li>
        <li> Zebra Repo Admin: ncvt73 </li>
        <li> Zebra Jira Project ID: UX </li>
        <li> Product: Zebra Design System (Zeta) - Web Components Library </li>
        <li> Topics: none </li>
    </ul>
</details>

<h1 class='sbdocs-title'>@zebra-fed/zeta-web</h1>

Zeta Web is a native web component library created by Zebra Technologies written in TypeScript.  
The Zeta Design System includes foundations, components, and best practices that can be used when building UX.

> 🚧 **Note**: This package is in pre-release, and so many aspects are incomplete.

## Previewing the components

To view examples of all the components in the library, you can pull this repo and run the Storybook instance.

You can also view the latest release at [Zeta](https://zeta-ds.web.app/) or the latest commits to main [here](https://zeta-web-main.web.app/).

## How to Use

Zeta Web Components can be directly used in many web frameworks including Angular, React.

1. Install `@zebra-fed/zeta-web`

   ```sh
   # NPM
   npm install git+https://github.com/zebratechnologies/zeta-web.git
   # YARN
   yarn add git+https://github.com/zebratechnologies/zeta-web.git
   ```

   <details>
   <summary>🚧 <b>Note</b>: Public npm / yarn links coming soon.</summary>

   ```sh
   # Future install instructions
   # NPM
   npm install @zebra-fed/zeta-web
   # YARN
   yarn add @zebra-fed/zeta-web
   ```

   </details>

2. Import the desired Zeta Web Component into your app:

   ```js
   /* Import the component in the JS/TS file where it is used */
   import "@zebra-fed/zeta-web/dist/components/button/button.js";

   /* Import the Global Styles into the main App file */
   import "@zebra-fed/zeta-web/index.css";
   ```

   or in HTML,

   ```html
   <link
     rel="stylesheet"
     href="./node_modules/@zebra-fed/zeta-web/dist/style.css"
   />
   <script
     type="module"
     src="./node_modules/@zebra-fed/zeta-web/dist/components/button/button.js"
   ></script>
   ```

   You can also import the full package:

   ```js
   import "@zebra-fed/zeta-web";
   ```

3. If you use any element that uses icons, you will also need to import the index.css from [@zebra-fed/zeta-web](https://www.npmjs.com/package/@zebra-fed/zeta-icons)
   This is a temporary step for now. This will be automatically imported where needed in the future.

   ```html
   <link
     rel="stylesheet"
     href="./node_modules/@zebra-fed/zeta-icons/dist/style.css"
   />
   ```

4. Use the Web Component like any HTML element

   ```html
   <zeta-button>Hello world!</zeta-button>
   ```

### React

From React 19 web-components work natively. `zeta-web` can be imported into your React project and used directly in JSX.

#### TypeScript and "JSX.IntrinsicElements" errors.

If you find TypeScript complains that `Property 'zeta-*' does not exist on type 'JSX.IntrinsicElements'`, you need to add the declared zeta components into React's JSX.IntrinsicElements namespace. To do this:

```ts
import { CustomElements } from "@zebra-fed/zeta-web/jsx";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
```

## Developer Experience

To improve the development experience while using the zeta web-components, the following packages can be useful:

1. [`ts-lit-plugin`](https://www.npmjs.com/package/ts-lit-plugin)

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
