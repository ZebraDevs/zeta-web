## Directory structure {#directory-structure-web}

Test files are stored in the `src/tests` folder. Each test file should replicate the directory structure of the corresponding component in the `src/components` directory to ensure consistency and easy navigation.
For example, if your component is located at `src/components/button/button.ts`, the test should be placed at `src/test/button/button.test.ts`.

## Test groups {#test-groups-web}

Each test file should follow a consistent pattern, organizing tests into groups for Accessibility, Content, Dimensions, Styling, Interaction, Golden, and Performance.
While not every group needs to be populated for each component, they should be included as necessary to thoroughly validate the component's behavior and quality.

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
  Animation performance, rendering performance, data manipulation performance, etc.

## Testing file template {#testing-file-template-web}

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

## Golden testing {#golden-testing-web}

Golden testing is not currently implemented in Zeta Web; however, it is a feature we are actively working on and plan to introduce in the near future to enhance our testing capabilities.

## Helper functions {#helper-functions-web}

To streamline and enhance the testing process, we’ve developed a set of utility functions designed to handle common testing tasks efficiently. These functions simplify operations such as converting CSS variables to their computed values, retrieving slotted elements, managing coordinates, and executing various mouse interactions. By leveraging these utilities, developers can focus on writing more meaningful tests without getting bogged down by repetitive tasks.

See [utils.ts](https://github.com/ZebraDevs/zeta-web/blob/main/src/test/utils.ts) for all utility functions.

## Guidelines {#guidelines-web}

- Test group describe blocks must be nested in "component" describe blocks `describe("replace-with-zeta-tag", () => {`.
- You can have multiple "component" describe blocks.
- Aim to keep nesting to a minimum. Use only the "component" and "category" describe blocks. Do not nest any further.
- Comment out unused describe blocks.
- You may need to reinitialize the component within the nested category describe block if you find peculiar results.
  ```
  beforeEach(async () => {
    subject = await createComponent();
  });
  ```
  Put this at the top of the troublesome category describe block.
