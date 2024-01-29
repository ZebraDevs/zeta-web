import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-sub-item.scss";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** ZetaNavigationDrawerSubItem web component.
 *
 * //TODO: Add description
 * //TODO: Add slot description
 *
 * @public */
@customElement("zeta-navigation-drawer-sub-item")
export class ZetaNavigationDrawerSubItem extends ContourableInteractiveElement {
  /**
   * The headline text. Can also be slotted.
   */
  @property({ type: String }) headline?: string;

  /**
   * Sets the item to active.
   */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected override render() {
    return html`
      <div class="container">
        <div class="border"></div>
        <h1 class="sub-item interactive-target contourable-target" ?active=${this.active} ?disabled=${this.disabled}>${this.headline}<slot></slot></h1>
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
