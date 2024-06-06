<h1 class='sbdocs-title'>@zebra-fed/zeta-web</h1>

Zeta Web is a native web component library created by Zebra Technologies written in TypeScript.  
The Zeta Design System includes foundations, components, and best practices that can be used when building UX.

> 🚧 **Note**: This package is in pre-release, and so many aspects are incomplete.

## How to Use

Zeta Web Components can be directly used in many web frameworks.

> ⚛️ **Note**: Using React? Zeta is not ready just yet. Whilst you wait, you can use [zds_react](https://www.npmjs.com/package/@zebra-fed/zds-react).

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
