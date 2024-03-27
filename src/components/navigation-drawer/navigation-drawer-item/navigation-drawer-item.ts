import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-item.scss?inline";
import { Contourable, Interactive } from "../../../index.js";

/** ZetaNavigationDrawerItem web component.
 *
 * A navigation item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 */
@customElement("zeta-navigation-drawer-item")
export class ZetaNavigationDrawerItem extends Contourable(Interactive(LitElement)) {
  /**
   * The headline text. Can also be slotted.
   */
  @property({ type: String }) headline?: string;

  /**
   * Sets the item to active.
   */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected override render() {
    return html`<div class="drawer-item" ?active=${this.active} ?disabled=${this.disabled}>
      <div class="leading">
        <slot name="leading"></slot>
        <h1>${this.headline}<slot></slot></h1>
      </div>
      <div class="trailing">
        <slot name="badge"></slot>
        <slot name="trailing"></slot>
      </div>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-item": ZetaNavigationDrawerItem;
  }
}

