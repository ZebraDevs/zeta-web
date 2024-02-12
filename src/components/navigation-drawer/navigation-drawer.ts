import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer.scss?inline";
import { Side } from "../../types.js";
import { PopupElement } from "../../mixins/popup.js";

/** ZetaNavigationDrawer web component.
 *
 * Navigation drawers provide access to destinations and app functionality, such as switching accounts.
 * They can either be permanently on-screen or controlled by a navigation menu icon
 *
 * TODO: When anchored to the right, the drawer causes page overflow when animating away.
 *
 * @slot - The main content of the drawer.
 * @slot header - The drawer header.
 * @slot footer - The drawer footer.
 *
 * @public */
@customElement("zeta-navigation-drawer")
export class ZetaNavigationDrawer extends PopupElement {
  /** The side of the screen that the drawer is anchored on.
   *
   * Defaults to 'left'.
   */
  @property({ type: String, reflect: true }) anchor: Side = "left";

  /** Toggles the animation for the navigaiton drawer.
   *
   * Defaults to true.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-animation" }) showAnimation?: boolean;

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  protected override render() {
    return html`
      <dialog class="navigation-drawer" @click=${this.onBarrierClicked} id=${this.id}>
        <slot name="header"></slot>
        <div class="scrollable-content">
          <div class="content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer": ZetaNavigationDrawer;
  }
}
