# Testing Conventions Web Components

### Groups

- **Accessibility**  
  Semantic labels, touch areas, contrast ratios, etc.

- **Content**  
  Finds the component, parameter statuses, etc.  
  Checking for the value of props and attributes of the component. Checking for the presence of sub-element.

- **Dimensions**  
  Size, padding, margin, alignment, etc.

- **Styling**  
  Rendered colors, fonts, borders, radii etc.
  Checking the style of elements and child elements.

- **Interaction**  
  Gesture recognizers, taps, drags, etc.
  For example, using a boolean to check if the elements interaction function runs.

- **Golden**  
  Compares the rendered component with the golden file.

- **Performance**  
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
import type { Zeta_replacecap_ } from "PATH_TO_COMPONENT";
import "PATH_TO_COMPONENT";

import "../../index.css";

describe("zeta-_replacelower_", () => {
  let subject: Zeta_replacecap_;

  const createComponent = (template = `<zeta-_replacelower_></zeta-_replacelower_>`) => {
    // prettier-ignore
    return fixture<Zeta_replacecap_>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
```

### New Group Checklist

- Update TESTING_README
- Update `scripts\assets\web.test.categories.json`
