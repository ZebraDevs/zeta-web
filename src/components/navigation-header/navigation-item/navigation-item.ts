import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";

/**
 * A navigation item to be used in a zeta-navigation-header
 *
 * @slot - The content of the menu item.
 */
@customElement("zeta-navigation-item")
export class ZetaNavigationItem extends Contourable(Interactive(LitElement)) {
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected override render() {
    // TODO: dropdown variant
    return html`
      <div class="navigation-item" ?active=${this.active} ?disabled=${this.disabled}>
        <slot></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-item": ZetaNavigationItem;
  }
}
