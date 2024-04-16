<h1 class='sbdocs-title'>Zeta Web</h1>

Zeta Web is a native web component library created by Zebra Technologies written in TypeScript.  
The Zeta Design System includes foundations, components, and best practices that can be used when building UX.

> 🚧 **Note**: This package is in pre-release, and so many aspects are incomplete.

## How to Use

Zeta Web Components can be directly used in many web frameworks.

> ⚛️ **Note**: Using React? Zeta is not ready just yet. Whilst you wait, you can use [zds_react](https://www.npmjs.com/package/@zebra-fed/zds-react).

1. Install zeta-web

```
git clone git@github.com:zebratechnologies/zeta-web.git
```

> 🚧 **Note**: Public npm / yarn links coming soon.

<s>

```
npm install @zebra-fed/zeta-web
```

or

```
yarn add @zebra-fed/zeta-web
```

</s>

1. Import the desired Zeta Web Component into your app:

```
import "@zebra-fed/zeta-web/src/components/button/button.js";
```

or

```
<script type="module" src="@zebra-fed/zeta-web/src/components/button/button.ts"></script>
```

You can also import the full package:

```
import "@zebra-fed/zeta-web/src/index.js";
```

3. Use the Web Component like any HTML element

```
<zeta-button>Hello world!</zeta-button>
```
