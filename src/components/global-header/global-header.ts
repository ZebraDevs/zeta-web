import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./global-header.scss?inline";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";

/**
 * A header with support for displaying a zeta-navigation-menu
 *
 * @slot - The main content of the header.
 * @slot leading - The leading content on the header.
 * @slot navigation-menu - The navigation menu. The position is based on the 'menu-position' property.
 * @slot trailing - The trailing content on the header.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23144-118110
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/global-header--docs
 */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends Contourable(LitElement) {
  /** The headline text on the header. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** The position of the navigation. */
  @property({ type: String, attribute: "menu-position" }) menuPosition: "inline" | "below" = "inline";

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
