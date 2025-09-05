import { html, LitElement, nothing } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./global-header.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button";
import "../search/search";
import "../avatar/avatar";
import "../dropdown/dropdown-menu/dropdown-menu-button";

/**
 * TODO: UX-1513 Limiting the number of menu and action items to 6 each.
 */

/**
 * A header component which can contain branding, navigation, search, and user profile actions.
 * It is recommended to enter a maximum of 6 menu items and 6 action items.
 *
 * @property {string} platformName - The platform name text on the header.
 * @property {string} name - The name to show in the header, next to the user icon.
 * @property {string} initials - The initials to display within the user icon.
 * @property {boolean} appSwitcher - Shows the app switcher icon. Make true to show the app switcher icon.
 * @property {boolean} searchbar - Shows the search bar. Make true to show the search bar.
 * @property {boolean} rounded - Applies rounded corners to all elements on the header. Set to true to round all elements.
 * @slot menu-items - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
 * @slot action-items - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23144-118110
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-global-header--docs
 *
 * @example <zeta-global-header
 *  platformName="Platform Name"
 *  name="Name"
 *  initials="RK"
 *  appSwitcher
 *  searchbar
 *  rounded
 * >
 * <zeta-button slot="menu-items">
 * </zeta-button> <zeta-icon-button slot="action-items">
 * </zeta-icon-button></zeta-global-header>
 */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends Contourable(LitElement) {
  /** The platform name text on the header. */
  @property({ type: String }) platformName: string;

  /** The name to show in the header, next to the user icon. */
  @property({ type: String }) name: string = "Name";

  /** The initials to display within the user icon. */
  @property({ type: String }) initials: string = "RK";

  /**
   * Shows the app switcher icon.
   * Make true to show the app switcher icon.
   */
  @property({ type: Boolean }) appSwitcher: boolean = false;

  /**
   * Shows the search bar.
   * Make true to show the search bar.
   */
  @property({ type: Boolean }) searchbar: boolean = false;

  /**
   * Applies rounded corners to all elements on the header.
   * Set to true to round all elements.
   */
  @property({ type: Boolean }) rounded: boolean = false;

  /**
   * Slot for menu items on the left side of the header.
   * Expects elements of type zeta-button or zeta-dropdown-menu-button.
   */
  @queryAssignedElements({ slot: "menu-items" }) menuItems!: Array<Node>;

  /**
   * Slot for action items on the right side of the header.
   * Expects elements of type zeta-icon-button or zeta-action-menu-button.
   */
  @queryAssignedElements({ slot: "action-items" }) actionItems!: Array<Node>;

  /**
   * Tracks whether there are any menu items present.
   */
  private hasMenuItems: Boolean = true;

  /**
   * Tracks whether there are any action items present.
   */
  private hasActionItems: Boolean = true;

  /**
   * Checks the number of items in a slot and updates the corresponding boolean property.
   * @param items - array of nodes to check
   * @param type - "menu" or "action" to specify which type of items are being checked
   */
  private itemCheck(items: Array<Node>, type: "menu" | "action") {
    items = items ?? [];
    if (type === "menu") {
      items.length > 0 ? (this.hasMenuItems = true) : (this.hasMenuItems = false);
    }
    if (type === "action") {
      items.length > 0 ? (this.hasActionItems = true) : (this.hasActionItems = false);
    }
  }

  /**
   * Checks the slots for items after the component has been updated.
   * This ensures that any changes to the slotted content are detected and the state is updated accordingly.
   */
  protected override updated() {
    this.itemCheck(this.menuItems, "menu");
    this.itemCheck(this.actionItems, "action");
  }

  protected override render() {
    return html`
      <!--Main container - Holds all items-->
      <div id="header-main">
        <!--Left container - Holds header info and menu items-->
        <div id="header-left">
          <!--Could be unnecessary div-->
          <div>
            <!--Header info container - Holds logo, platform name, and menu items-->
            <div id="header-info">
              <zeta-icon-button shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle">hamburger_menu</zeta-icon-button>
              <img id="logo" src="../assets/zebra-logo.svg" alt="Zebra Technologies Logo" width="80px" height="32px" />
              <div class="platform-name">${this.platformName}</div>
            </div>
            <!--Menu items container - Holds menu items-->
            <div id="menu-items" class=${this.hasMenuItems ? "has-items" : ""}><slot name="menu-items"></slot></div>
          </div>
        </div>
        <!--Right container - Holds search bar, action items, user info and app switcher-->
        <div id="header-right">
          ${this.searchbar ? html`<zeta-search shape=${this.rounded ? "rounded" : "sharp"}></zeta-search>` : nothing}
          <!--Action items container - Holds action items-->
          <div id="action-items" class=${this.hasActionItems ? "has-items" : ""}><slot name="action-items"></slot></div>
          <!--User info button - Holds user name, avatar and chevron icon-->
          <zeta-button id="user-info-button" shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle">
            <span id="name">${this.name}</span>
            <div id="avatar">${this.initials}</div>
            <zeta-icon id="user-info-icon" .rounded=${this.rounded}>expand_more</zeta-icon>
          </zeta-button>
          ${this.appSwitcher ? html`<zeta-icon-button shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle">apps</zeta-icon-button>` : nothing}
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
