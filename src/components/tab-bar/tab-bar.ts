import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";

export * from "./tab-item/tab-item.js";

/**
 * A bar used to display a collection of zeta-tab-items.
 * @cssproperty --tab-bar-background-color The background color of the tab-bar.
 * @slot - The tab items displayed in the header. Should be a list of zeta-tab-item.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-18&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tab-bar--docs
 */
@customElement("zeta-tab-bar")
export class ZetaTabBar extends LitElement {
  protected override render() {
    return html` <slot></slot> `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tab-bar": ZetaTabBar;
  }
}
