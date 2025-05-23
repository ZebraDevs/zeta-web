This guide outlines the process and expectations for contributors looking to enhance the Zeta Libraries open-source project.

These components are open source, and we warmly welcome contributions from the community. All collaborators are expected to adhere to [Zebra's contributing guidelines](https://github.com/ZebraDevs/About/blob/master/CONTRIBUTING.md) and agree to the [Contributor Covenant Code of Conduct](https://github.com/ZebraDevs/About/blob/master/Code_of_Conduct.md).

Contributions to the Zeta libraries are encouraged; however, new components _must_ be defined in the [Figma designs](https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components) before proceeding.

## Component creation and contribution process {#component-creation-web}

For both Zeta libraries, the process for component creation follows the same steps:

1. **Internal design completion in Figma (new components only)**: For new designs, the initial design phase is conducted internally by the Zebra Technologies Customer Experience Design team using Figma. This step is exclusive to the internal team to ensure that the new component aligns with our project’s standards and goals. The design undergoes a rigorous internal review process before being approved for further development.
   **Note that this step does not apply to bug fixes or quality of life improvements**.

2. **Ticket creation**: If you’ve noticed a bug or have a suggestion for a new feature, please open an issue in this project and include as much information as possible. Before undertaking substantial work, it’s important to file issues to avoid duplicate efforts and to allow for discussion of any design concerns. Once a design is approved, create a development ticket either on the [Zebra internal Jira - UX board](https://jira.zebra.com/browse/UX) or by raising an issue on the relevant GitHub repository.

3. **Component development**: We’re always open to pull requests; they should be clearly described and adhere to our project’s style guide for consistency. When you’re ready to start coding, fork the necessary repository to your own GitHub account and create your changes in a new branch. If you’re an external collaborator without write access to ZebraDevs, forking the repository is essential to push your changes. Focus on writing clean, maintainable, and efficient code following best practices, including modular, well-documented code. Once satisfied, open a pull request, explaining the changes and their purpose. If your change addresses a bug, try to include a test that aligns with it. All contributions will undergo an internal peer review to ensure quality and consistency.

   We want the designs to be the source of truth for this repository, so new components will only be accepted if they align with the design files. New components should use all tokens matching the design and avoid hardcoded values for color, spacing, or radius, ensuring that changes to these fundamental tokens are reflected consistently throughout the library.

4. **Integration and Testing**: The newly developed component should be integrated into the example app (such as Storybook or Widgetbook). This step involves writing comprehensive tests to assess the component’s functionality and quality. It is crucial to address any lint or static analysis issues, rather than ignoring them, to maintain code quality. Additionally, ensure that code lines do not exceed 120 characters to enhance readability and maintainability throughout the project. This practice helps maintain a consistent coding style that is easy for all team members to follow and review.

5. **Commit Guidelines**: When committing changes, adhere to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) guidelines to ensure accurate release note generation. For a full list of the commit keywords we support, see the `release-please-config.json` file in the repository. We recommend using Git Rebase (rather than merging BASE) to keep your branch updated, facilitating easier merges without complex branching.

6. **Pull Request submission**: Once the component is ready, submit a PR. This can be done from a fork or a branch within the repository. Ensure your branch is fully up-to-date with the target branch, typically `main`. However, if requested by the authors, you might need to merge into `develop`, especially if the PR includes breaking changes that shouldn’t be released immediately.

   When creating the PR, the title should follow the format keyword(ticket number): description. For example, `feat(UX-101): Create button`. This ensures consistency with our versioning and release processes.

   In the PR description, any changes that should be included in the changelog or release notes should be clearly outlined at the top. Use the same conventional commit formatting for these entries. This section can span multiple lines if needed, providing a detailed overview of significant changes, features, or bug fixes. Additional information or context can be included below this section. Furthermore, supplementary details or clarifications can also be added as comments on the PR itself, ensuring that all relevant information is easily accessible for reviewers.

7. **PR Checks**: Once you submit your PR, it will undergo a series of automated checks to verify code quality and functionality. These checks include running tests, static analysis, and linting to ensure that the code meets our project’s standards. The results of these checks will be automatically commented on the PR, providing clear feedback on any issues that need to be addressed. For your PR to be eligible for merging, all tests must pass, and there should be no outstanding linting or formatting errors. Be sure to review these comments carefully and make the necessary adjustments to resolve any issues.

8. **Code Review**: A member of the `Front-end Devs` GitHub team must review your PR before it can be merged. Our team aims to review pull requests within one week of their opening to ensure timely feedback and progress. If you require more immediate attention or have specific questions, feel free to tag relevant authors or team members directly in the GitHub issue or PR comments to expedite the process. All comments and suggestions provided during the review must be addressed to ensure the highest quality and alignment with project standards.

9. **Merging**: Once the review is complete and all checks have passed, your PR will be merged. We utilize squash merging for all PRs, which means that the title and description of the PR will be used as the commit title and body. This helps maintain a clean and concise commit history. Note that the merged changes will not be immediately distributed until a formal release is conducted.

## Package specific overview {#package-specific-overview-web}

Before contributing code to the project, it is essential to be well-acquainted with both [TypeScript](https://www.typescriptlang.org/) and the [Lit library](https://lit.dev/). TypeScript, a superset of JavaScript, offers strong typing and other features that enhance code quality and maintainability, which are crucial for collaborative development. Understanding its syntax and best practices will enable you to write more robust and error-resistant code. Similarly, familiarity with Lit is vital, as it provides the framework for creating efficient, lightweight web components. Knowing how Lit manages templates, styles, and reactive properties will help you contribute effectively and ensure that your code integrates seamlessly with the existing codebase. By mastering both TypeScript and Lit, you’ll be better prepared to develop high-quality, reusable components that adhere to the project’s standards.

For a better developer experience, we recommend [`ts-lit-plugin`](https://www.npmjs.com/package/ts-lit-plugin)' this typescript plugin adds type checking and code completion for components built with Lit.

When contributing new code to Zeta Web, ensure that you do not edit files that are automatically generated. Currently that is `primitives.css` and `semantics.css`, but we hope to utilize automation in the future to generate code directly from figma designs.

### Creating a new component {#creating-a-new-component-web}

When creating a new component, it’s crucial first to determine if your component can extend an existing class, such as `Rounded` or `Flavor`, to leverage reusable functionality and maintain consistency across the project. Start by creating two files: `component.ts` and `component.styles.js`. In `component.ts`, you’ll define the structure and logic of your component using TypeScript. Import the necessary elements from Lit and your styles from `component.styles.js`. The component should be annotated with TSDoc to provide comprehensive documentation, including details about supported slots, custom CSS properties, parts, events, and links to associated Figma designs and Storybook instances. Use the @customElement decorator to register your component, and extend it from the base class, such as `Rounded(LitElement)`. Define properties with appropriate decorators and implement the render method to output your component’s template.

In `component.styles.js`, define your component’s styles using Lit’s `css` function. This file should include custom CSS variables and styling for slots and parts, ensuring the component’s visual aspects are well-defined and customizable. By following this structured approach, you can create a robust, documented, and visually consistent component ready for integration into the broader project.

`component.ts` should look like this:

```ts
import { html } from "lit";
import styles from "./component.styles.js";

/**
 * TSDoc about component
 *
 * @slot - Provide details about any supported slots
 * @cssproperty --property - Provide details about any supported custom css properties
 * @part - Provide details about any parts of the component
 * @event - Provide details about any events emitted
 * @figma - Provide the link to the associated Figma design
 * @storybook - Provide the link to the hosted storybook instance
 **/
@customElement("zeta-component")
export class ZetaComponent extends Rounded(LitElement) {
  /** Provide detailed documentation for all properties **/
  @property({ type: String, reflect: true }) property: string = "property";

  static get styles() {
    return [super.styles ?? [], styles];
  }

  protected render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-component": ZetaComponent;
  }
}
```

`component.styles.js` should look like this:

```js
import { css } from "lit";
export default css`
  :host {
    --_property: var(--property, fallback);
  }
  div[part="part"] {
    ...
  }
  ::slotted(component) {
    ...
  }

`;
```

### Adding examples {#adding-examples-web}

When developing components, it’s crucial to ensure that all arguments and argTypes are thoroughly filled in Storybook, as this practice enhances the clarity and usability of your stories and ensures that components are fully documented and easily understood by other developers. If additional documentation is needed to explain component behaviors, interactions, or usage guidelines, we encourage creating a Docs.mdx file, which can be rendered by Storybook to provide rich documentation alongside your stories, offering a more complete view of your components. It is also essential that the stories you create in Storybook accurately match the designs provided in Figma, ensuring consistency between design and implementation, facilitating a seamless user experience, and maintaining visual integrity across the application. By following these guidelines, you can contribute to a robust and well-documented component library that enhances both development efficiency and product quality. If you have any questions or need further guidance, please feel free to reach out to the team or consult our documentation resources.

## Releasing {#releasing-web}

Our repositories utilize [Release-Please](https://github.com/googleapis/release-please) to streamline release management. This tool automates the generation of release notes and version bumping, based on keywords in the pull requests that are merged. These keywords are defined in the repository’s `release-please-config.json` file. When code is merged, Release-Please automatically generates pull requests (PRs) that, once merged, will create a release and distribute the updated code.

We follow a flexible release schedule, deploying updates as necessary rather than adhering to a strict timetable. If a pull request includes a bug marked as “urgent” in its body, it will trigger an immediate release upon merging. Should a specific release be required outside of our usual process, contributors are encouraged to tag the authors in the relevant Release-Please PR to expedite the release.
