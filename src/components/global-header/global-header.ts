import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./global-header.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button";
import "../search/search";
import "../avatar/avatar";

/**Requirements:
 * - 0-6 action items
 * - If there are action items, a grey bar appears separating the user icon and action items
 * - 0-6 menu items
 * - App switcher can be displayed or not displayed (before user icons)
 * - Platform name, menu items, action items, username and app switcher are all props that can be adjusted
 * - Elements need to be able to be rounded. Icon button doesnt have rounded prop
 * - Make menu buttons/action buttons either normal text buttons/icon buttons or drop down buttons
 */

/**
 * A header with support for displaying a zeta-navigation-menu
 *
 * @slot - The main content of the header.
 * @slot leading - The leading content on the header.
 * @slot navigation-menu - The navigation menu. The position is based on the 'menuPosition' property.
 * @slot trailing - The trailing content on the header.
 * @part global-header - Styles the header container
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23144-118110
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-global-header--docs
 */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends Contourable(LitElement) {
  /** The platform name text on the header. */
  @property({ type: String }) platformName: string;

  /**
   * Number of menu items to show on the header.
   * Can be any number between 0 - 6.
   */
  @property({ type: Number }) menuItems: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  /**
   * Number of action items to show on the header.
   * Can be any number between 0 - 6.
   */
  @property({ type: Number }) actionItems: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  /** The name to show in the header, next to the user icon. */
  @property({ type: String }) name: string = "Name";

  /** The initials to display within the user icon. */
  @property({ type: String }) initials: string = "RK";

  /**
   * Shows the app switcher icon or not.
   * Make true if you'd like the app switcher to be shown.
   */
  @property({ type: Boolean }) appSwitcher: boolean = false;

  /**
   * Shows the search bar or not.
   * Make true to show the search bar.
   */
  @property({ type: Boolean }) searchbar: boolean = false;

  /**
   * Applies rounded corners to all elements on the header.
   * Set to true to round all elements.
   */
  @property({ type: Boolean }) rounded: boolean = false;

  protected override render() {
    return html`
      <div id="header-main">
        <div id="header-left">
          <div>
            <div id="header-info">
              <zeta-icon-button id="hamburger-menu" flavor="text">hamburger_menu</zeta-icon-button>
              <img id="logo" src="../assets/zebra-logo.svg" alt="Zebra Technologies Logo" width="80px" height="32px" />
              <div>${this.platformName}</div>
            </div>
            <div id="menu-items" class=${this.menuItems > 0 ? "has-items" : ""}>
              ${this.menuItems > 0 ? Array.from({ length: this.menuItems }, () => html`<zeta-button flavor="text">Nav Item</zeta-button>`) : nothing}
            </div>
          </div>
        </div>
        <div id="header-right">
          ${this.searchbar ? html`<zeta-search></zeta-search>` : nothing}
          <div id="action-items" class=${this.actionItems > 0 ? "has-items" : ""}>
            ${this.actionItems > 0 ? Array.from({ length: this.actionItems }, () => html`<zeta-icon-button flavor="text">star</zeta-icon-button>`) : nothing}
          </div>
          <zeta-button flavor="text" trailingIcon="expand_more">
            <span id="name">${this.name}</span>
            <zeta-avatar .showClose=${false}>${this.initials}</zeta-avatar>
            <!-- <zeta-icon-button flavor="text">expand_more</zeta-icon-button> -->
          </zeta-button>
          ${this.appSwitcher ? html`<zeta-icon-button flavor="text">apps</zeta-icon-button>` : nothing}
        </div>
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
