import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-sub-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";

/**
 * A navigation sub item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer-sub-item")
export class ZetaNavigationDrawerSubItem extends Contourable(Interactive(LitElement)) {
  /** The headline text. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** Sets the item to active. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected override render() {
    return html`
      <div class="container">
        <div class="border"></div>
        <h1 class="sub-item interactive-target contourable-target">${this.headline}<slot></slot></h1>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-sub-item": ZetaNavigationDrawerSubItem;
  }
}
