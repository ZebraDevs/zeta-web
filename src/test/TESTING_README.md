# Testing Conventions Web Components

### Groups

- **Accessibility Tests**  
  Semantic labels, touch areas, contrast ratios, etc.

- **Content Tests**  
  Finds the component, parameter statuses, etc.  
  Checking for the value of props and attributes of the component. Checking for the presence of sub-element.

- **Dimensions Tests**  
  Size, padding, margin, alignment, etc.

- **Styling Tests**  
  Rendered colors, fonts, borders, radii etc.
  Checking the style of elements and child elements.

- **Interaction Tests**  
  Gesture recognizers, taps, drags, etc.
  For example, using a boolean to check if the elements interaction function runs.

- **Golden Tests**  
  Compares the rendered component with the golden file.

- **Performance Tests**  
  Animation performance, rendering performance, data manupulation performance, etc.

### Rules

- Test group describe blocks must be nested in "component" describe blocks `describe("replace-with-zeta-tag", () => {`.
- You can have multiple "component" describe blocks.
- Aim to keep nesting to a minimum. Use only the "component" and "category" describe blocks. Do not nest any further.
- Comment out unused describe blocks.

### Keep in mind

- You may need to reinitialise the component within the nested category describe block if you find percular results.
  ```
  beforeEach(async () => {
    subject = await createComponent();
  });
  ```
  Put this at the top of the troublesome category describe block.

### Testing file template

```ts
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZETA_TYPE } from "PATH_TO_COMPONENT";
import "PATH_TO_COMPONENT";

describe("replace-with-zeta-tag", () => {
  let subject: REPLACE_WITH_ZETA_TYPE;

  const createComponent = (template = `<zeta-element></zeta-element>`) => {
    // prettier-ignore
    return fixture<REPLACE_WITH_ZETA_TYPE>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  // Keep unnecessary
  // describe("Accessibility Tests", () => {});

  // describe("Content Tests", () => {});

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
```
