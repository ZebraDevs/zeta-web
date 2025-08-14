import { LitElement, html } from "lit";
import styles from "./button-group.styles.js";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";

export * from "./button-group-item/button-group-item.js";

/** Button groups are used to group related buttons together. They can be used to create a toolbar or a set of related actions.
 *
 * Takes in Zeta Button Group Items as children and groups them by applying styling to them.
 *
 * Does not render any other types of children.
 *
 * @slot - Children must be of type `zeta-group-button` otherwise they will not be displayed.
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-45&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-button-group--docs
 */
@customElement("zeta-button-group")
export class ZetaButtonGroup extends Contourable(LitElement) {
  /** Size of button. */
  @property({ type: String, reflect: true }) size: "medium" | "large" = "medium";

  protected override render() {
    return html`<slot></slot>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group": ZetaButtonGroup;
  }
}
