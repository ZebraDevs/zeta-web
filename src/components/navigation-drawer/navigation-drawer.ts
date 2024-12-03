import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer.styles.js";
import { Popup } from "../../mixins/mixins.js";

export * from "./navigation-drawer-footer/navigation-drawer-footer.js";
export * from "./navigation-drawer-header/navigation-drawer-header.js";
export * from "./navigation-drawer-item/navigation-drawer-item.js";
export * from "./navigation-drawer-sub-item/navigation-drawer-sub-item.js";

// TODO: When anchored to the right, the drawer causes page overflow when animating away.

/**
 * Navigation drawers provide access to destinations and app functionality, such as switching accounts.
 * They can either be permanently on-screen or controlled by a navigation menu icon
 *
 *
 * @slot - The main content of the drawer.
 * @slot header - The drawer header.
 * @slot footer - The drawer footer.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer")
export class ZetaNavigationDrawer extends Popup(LitElement) {
  /** The side of the screen that the drawer is anchored on. */
  @property({ type: String, reflect: true }) anchor: "left" | "right" = "left";

  /** Toggles the animation for the navigation drawer. */
  @property({ type: Boolean, reflect: true }) showAnimation: boolean = true;

  /**  Whether the modal is initially open. */
  @property({ type: Boolean }) initialOpen: boolean = false;

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  protected override render() {
    return html`
      <dialog class="navigation-drawer" @click=${this.onBarrierClicked} id=${this.id} .open=${this.initialOpen}>
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
