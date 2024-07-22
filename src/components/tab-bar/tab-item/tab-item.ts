import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";

/**
 * A tab item to be used in a zeta-tab-bar
 *
 * @slot - The content of the menu item.
 */
@customElement("zeta-tab-item")
export class ZetaTabItem extends Contourable(Interactive(LitElement)) {
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  @property({ type: Boolean, reflect: true }) selected: boolean = false;

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
    "zeta-tab-item": ZetaTabItem;
  }
}
