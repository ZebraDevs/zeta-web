### Create component file {#create-component-file-web}

This file contains the implementation of the component and should follow the structure below:

`/src/components/x/x.ts`

```ts
// ...
import styles from "./x.styles.js";

/**
 * Description from Figma
 *
 * Web specific description (optional)
 *
 * @slot - Description of default (unnamed) slot
 * @slot a - Description of slot a
 * @cssproperty --b - Description of CSS property b
 * @part c - Description of part c
 */
@customElement("zeta-x")
export class ZetaX extends Contourable(LitElement) {
  /** Description of property y */
  @property({ type: Y, reflect: true }) y;

  /** Combine y styles with any super- styles */
  static styles = [styles, super.styles || []];

  protected render() {
    return html`<div part="c">
      // Component content goes here
      <slot> </slot>
      <slot name="a"> </slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-x": ZetaX;
  }
}
```

We have a number of mixins that can be used to mix in extra functionality

- Contourable - adds rounded (boolean) prop, and styles either the parent or any nodes with class `.contourable-target`
- ContourableThree - adds rounded (sharp | rounded | full) prop, and styles either the parent or any nodes with class `.contourable-target`
- Flavored - adds flavor prop and respected styles.
- FormField - adds form field logic
- Interactive - adds styles for interactive component, applied either to the parent or any nodes with class `.interactive-target`.
- Navigate - adds href to a given attribute
- Popup - makes component popup like a dialog
- Size - adds Size property

You can also create a stylesheet to apply css styles to your component. For this, we are using the lit css function within js:

`/src/components/x/x.styles.js`

```js
import { css } from "lit";
export default css`
  /* CSS Styles go here */

  :host {
    --b: 4px;
  }
`;
```

### Export the component {#export-the-component-web}

`src/index.ts`

```ts
// ...
import { ZetaX } from "./components/x/x.js";
// ...
export {
  ZetaX,
  //   ...
};
// ...
```

Only export the main component from the component file (for example, ZetaX). Avoid exporting internal helper classes, private widgets, or subcomponents that are not intended for public use. Exporting only the main component keeps the public API clean and prevents users from relying on internal implementation details, which may change without notice. This approach also reduces confusion and makes it easier for users to discover and use the intended component.

### Create the \*book file {#create-the-book-file-web}

We use storybook for web and should typically include a single story. This stroy should demonstrate every variant of the component. If this is not feasible, you may create multiple stories.

`src/stories/components/x/x.stories.ts`

```ts
...
import { ZetaX } from "../../../components/x/x.js";
import "../../../components/x/x.js";
import { spreadGenerator } from "../../utils.js";

const spread = spreadGenerator(ZetaX);


const meta: Meta<ZetaX> = {
  component: "zeta-x",
  title: "Components/X",
  tags: ["autodocs"],
  args: {
    // ...
  },
  argTypes: {
   // ...
  },
  parameters: {
    design: {
      url: "https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?x",
    },
    status: {type: "ready" },
  },
};

export default meta;

export const X: StoryObj<X> = {
  // Optionally, override the render method
  render: args => html`<zeta-x ${spread(args)}>${args.slot}</zeta-x>`
};
```

Learn more about [Storybook](https://storybook.js.org/docs).

### Create the example file {#create-the-example-file-web}

This file should contain a simple example of how to use the component. If possible, replicate the default version of the component shown in Figma. This example will also be used for demonstrating the component on design.zebra.com/docs/components/x. This file must be structured as shown in the example below:

`example/public/components/X.html`

```html
<style>
    /* Optional styling for the example */
<style>
<zeta-x>
    /* ... */
</zeta-x>
```

### Link example page {#link-example-page-web}

To add the example page to the example app, add it to the list of components:

`example/src/components.json`

```json
[
  "X"
  // ...
]
```
