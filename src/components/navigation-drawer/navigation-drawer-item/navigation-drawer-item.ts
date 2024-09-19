import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";

/**
 * A navigation item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 * @slot badge - Content to be placed in the badge.
 * @slot leading - Content to be placed before the headline.
 * @slot trailing - Content to be placed after the headline.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer-item")
export class ZetaNavigationDrawerItem extends Contourable(Interactive(LitElement)) {
  /** The headline text. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** Sets the item to active. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected override render() {
    return html`
      <div class="leading">
        <slot name="leading"></slot>
        <h1>${this.headline}<slot></slot></h1>
      </div>
      <div class="trailing">
        <slot name="badge"></slot>
        <slot name="trailing"></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-item": ZetaNavigationDrawerItem;
  }
}
