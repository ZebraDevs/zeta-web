import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";

/**
 * A tab item to be used in a zeta-tab-bar
 *
 * @slot - The content of the menu item.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-18&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tab-bar--docs
 */
@customElement("zeta-tab-item")
export class ZetaTabItem extends Contourable(Interactive(LitElement)) {
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  protected override render() {
    // TODO: dropdown variant
    return html`<slot></slot>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tab-item": ZetaTabItem;
  }
}
