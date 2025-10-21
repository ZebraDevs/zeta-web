import { html, LitElement, nothing } from "lit";
import zebraLogoSvg from "../../../assets/zebra-logo.svg?raw";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./global-header.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import "../search/search.js";
import "../avatar/avatar.js";
import "../dropdown/dropdown-menu/dropdown-menu-button.js";
import "../../index.css";

/**
 * TODO:
 * UX(1516) - Work with designers to make the component more dynamically responsive on a wider range of screen sizes.
 * UX(1517) - Fix the logo SVG not loading properly in Storybook.
 */

/**
 * A header component which can contain branding, navigation, search, and user profile actions.
 * Header will only allow a maximum of 6 menu items and 6 action items. Any additional items will be hidden.
 * If you have a maximum amount (6) of menu and action items, the search bar will be hidden at a screen size of 1440px or smaller.
 *
 * @property {String} platformName - The platform name text on the header.
 * @property {String} name - The name to show in the header, next to the user icon.
 * @property {String} initials - The initials to display within the user icon.
 * @property {Boolean} appSwitcher - Shows the app switcher icon. Make true to show the app switcher icon.
 * @property {Boolean} searchbar - Shows the search bar. Make true to show the search bar.
 * @property {Function} onUserInfoClick - Function to be called when the user info button is clicked. You can also listen for the 'user-info-click' event.
 * @property {Function} onHamburgerMenuClick - Function to be called when the hamburger menu button is clicked. You can also listen for the 'hamburger-menu-click' event.
 * @slot menu-items - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
 * @slot action-items - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
 * @slot user-avatar - Slot for user avatar. Input should be of type zeta-avatar. You must set the size prop to xxs.
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
 * <zeta-button slot="menu-items"></zeta-button>
 * <zeta-icon-button slot="action-items"></zeta-icon-button>
 * <zeta-avatar slot="user-avatar" size="xxs">${this.initials}</zeta-avatar>
 * </zeta-icon-button></zeta-global-header>
 */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends Contourable(LitElement) {
  /**
   * Autoset the theme to dark mode for this component.
   */
  @property({ type: String, attribute: "data-theme", reflect: true }) theme = "dark";

  /** The platform name text on the header. */
  @property({ type: String }) platformName: string = "Platform Name";

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
   * Function to be called when the user info button is clicked.
   */
  @property({ attribute: false }) onUserInfoClick: () => void | undefined;

  /**
   * Function to be called when the hamburger menu button is clicked.
   */
  @property({ attribute: false }) onHamburgerMenuClick: () => void | undefined;

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
   * Tracks whether there are any menu items present. Used for styling purposes.
   */
  private hasMenuItems: boolean = true;

  /**
   * Tracks whether there are any action items present. Used for styling purposes.
   */
  private hasActionItems: boolean = true;

  /**
   * Checks the number of items in a slot and updates the corresponding boolean property.
   * @param items - array of nodes to check
   * @param type - "menu" or "action" to specify which type of items are being checked
   */
  private itemCheck(items: Array<Node>, type: "menu" | "action") {
    items = items ?? [];
    if (type === "menu") this.hasMenuItems = items.length > 0;
    if (type === "action") this.hasActionItems = items.length > 0;
  }

  /**
   * Limits the number of visible items in the menu-items and action-items slots to 6 each.
   * Any items beyond the sixth will have their display style set to 'none'.
   * This method is called during the updated lifecycle to ensure it runs after any slot content changes.
   */
  private limitSlotItems() {
    const menuSlot = this.shadowRoot?.querySelector('slot[name="menu-items"]') as HTMLSlotElement | null;
    const menuNodes = menuSlot?.assignedElements() ?? [];
    //Apply display none to any menu items over index 5
    menuNodes.forEach((el, index) => {
      (el as HTMLElement).style.display = index < 6 ? "" : "none";
    });

    const actionSlot = this.shadowRoot?.querySelector('slot[name="action-items"]') as HTMLSlotElement | null;
    const actionNodes = actionSlot?.assignedElements() ?? [];
    //Apply display none to any action items over index 5
    actionNodes.forEach((el, index) => {
      (el as HTMLElement).style.display = index < 6 ? "" : "none";
    });
  }

  /**
   * Applies or removes the 'six-menu-action-items' class to the header-right container
   * based on whether there are exactly 6 menu items and 6 action items.
   * Used to start hiding components in CSS when the header gets smaller.
   */
  private checkMaxSlotItems() {
    const headerRightContainer = this.shadowRoot?.getElementById("header-right");
    if (headerRightContainer) {
      if (this.menuItems.length === 6 && this.actionItems.length === 6) {
        headerRightContainer.classList.add("six-menu-action-items");
      } else {
        headerRightContainer.classList.remove("six-menu-action-items");
      }
    }
  }

  /**
   * Handles the click event on the user info button.
   * Calls the onUserInfoClick function if it is defined.
   */
  private _handleUserInfoClick = () => {
    this.dispatchEvent(
      new CustomEvent("user-info-click", {
        bubbles: true,
        composed: true
      })
    );

    if (this.onUserInfoClick) {
      this.onUserInfoClick();
    }
  };

  /**
   * Handles the click event on the hamburger menu button.
   * Calls the onHamburgerMenuClick function if it is defined.
   */
  private _handleHamburgerMenuClick = () => {
    this.dispatchEvent(
      new CustomEvent("hamburger-menu-click", {
        bubbles: true,
        composed: true
      })
    );

    if (this.onHamburgerMenuClick) {
      this.onHamburgerMenuClick();
    }
  };

  /**
   * Checks the slots for items after the component has been updated.
   * This ensures that any changes to the slotted content are detected and the state is updated accordingly.
   */
  protected override updated() {
    this.itemCheck(this.menuItems, "menu");
    this.itemCheck(this.actionItems, "action");

    //Check if there are 6 menu and 6 action items to apply special class
    this.checkMaxSlotItems();

    //Limiting the number of menu and action items to 6 each
    this.limitSlotItems();
  }

  protected override render() {
    return html`
      <!--Main container - Holds all items-->
      <div id="header-main">
        <!--Left container - Holds header info and menu items-->
        <div id="header-left">
          <!--Header info container - Holds logo, platform name, and menu items-->
          <div id="header-info">
            <zeta-icon-button shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle" @click=${this._handleHamburgerMenuClick}>
              hamburger_menu
            </zeta-icon-button>
            <span class="logo">${unsafeSVG(zebraLogoSvg)}</span>
            <div id="platform-name">${this.platformName}</div>
          </div>
          <!--Menu items container - Holds menu items-->
          <div id="menu-items" class=${this.hasMenuItems ? "has-items" : ""}><slot name="menu-items"></slot></div>
        </div>
        <!--Right container - Holds search bar, action items, user info and app switcher-->
        <div id="header-right">
          ${this.searchbar ? html`<zeta-search id="search-bar" shape=${this.rounded ? "rounded" : "sharp"}></zeta-search>` : nothing}
          <!--Action items container - Holds action items-->
          <div id="action-items" class=${this.hasActionItems ? "has-items" : ""}><slot name="action-items"></slot></div>
          <!--User info button - Holds user name, avatar and chevron icon-->
          <zeta-button id="user-info-button" shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle" @click=${this._handleUserInfoClick}>
            <span id="name">${this.name}</span>
            <slot id="avatar" name="user-avatar"></slot>
            <zeta-icon id="user-info-icon" .rounded=${this.rounded}>expand_more</zeta-icon>
          </zeta-button>
          ${this.appSwitcher
            ? html`<zeta-icon-button id="app-switcher" shape=${this.rounded ? "rounded" : "sharp"} flavor="subtle">apps</zeta-icon-button>`
            : nothing}
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
