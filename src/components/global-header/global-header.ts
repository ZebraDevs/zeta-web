import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./global-header.scss";
import "../icon/icon.js";

export type MenuPosition = "inline" | "below";

/** ZetaGlobalHeader web component.
 *
 * A header with support for displaying a zeta-navigation-menu
 *
 * @slot The main content of the header.
 * @slot leading - The leading content on the header.
 * @slot navigation-menu - The navigation menu. The position is based on the 'menu-position' property.
 * @slot trailing - The trailing content on the header.
 *
 * @public */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends ContourableCondensableElement {
  /**
   * The headline text on the header. Can also be slotted.
   */
  @property({ type: String }) headline?: string;

  /**
   * The position of the navigation. Can either be 'inline' or 'below.
   *
   * @defaultValue 'inline'
   */
  @property({ type: String, attribute: "menu-position" }) menuPosition: MenuPosition = "inline";

  protected override render() {
    return html`
      <div class="global-header">
        <div class="global-header-content">
          <div class="leading">
            <div class="slotted-content">
              <slot name="leading"></slot>
              <div class="header">${this.headline}<slot></slot></div>
            </div>
            ${this.menuPosition == "inline" ? html`<slot name="navigation-menu"></slot>` : nothing}
          </div>
          <div class="slotted-content">
            <slot name="trailing"></slot>
          </div>
        </div>
        ${this.menuPosition == "below" ? html`<div class="navigation-menu"><slot name="navigation-menu"></slot></div>` : nothing}
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-global-header": ZetaGlobalHeader;
  }
}
