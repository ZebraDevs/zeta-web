import { html, LitElement, nothing } from "lit";
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
 */

/**
 * A header component which can contain branding, navigation, search, and user profile actions.
 * Header will only allow a maximum of 6 menu items and 6 action items. Any additional items will be hidden.
 * If you have a maximum amount (6) of menu and action items, the search bar will be hidden at a screen size of 1440px or smaller.
 *
 * @property {String} name - The name to show in the header, next to the user icon.
 * @property {String} initials - The initials to display within the user icon.
 * @property {Boolean} appSwitcher - Shows the app switcher icon. Make true to show the app switcher icon.
 * @property {Boolean} searchbar - Shows the search bar. Make true to show the search bar.
 *
 * @event user-info-click - Fired when the user info button is clicked.
 * @event hamburger-menu-click - Fired when the hamburger menu button is clicked.
 *
 * @slot platform-name - Slot for the platform name in the header. Falls back to the platformName property if not provided.
 * @slot menu-items - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
 * @slot action-items - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
 * @slot user-avatar - Slot for user avatar. Input should be of type zeta-avatar. You must set the size prop to xxs.
 * @slot logo - Slot for a custom logo to replace the default Zebra logo.
 *
 * @part logo - The container for the logo in the header. By default, this will contain the Zebra logo, but if you use the "logo" slot, your custom logo will be placed here instead.
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

  /** The platform name text on the header.
   * @deprecated The 'platformName' property is deprecated. Please use the default slot to set the platform name instead.
   */
  @property({ type: String })
  platformName: string = "Platform Name";

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
   */
  private _handleUserInfoClick = () => {
    this.dispatchEvent(new CustomEvent("user-info-click", { bubbles: true, composed: true }));
  };

  /**
   * Handles the click event on the hamburger menu button.
   */
  private _handleHamburgerMenuClick = () => {
    this.dispatchEvent(new CustomEvent("hamburger-menu-click", { bubbles: true, composed: true }));
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
            <span part="logo">
              <slot name="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 40" width="80" height="32" fill="none">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 792h1224V0H0Z" />
                    </clipPath>
                  </defs>
                  <path d="M25.94 20.55 23.2 17.8v7.79h2.75Z" />
                  <g clip-path="url(#a)" transform="matrix(.2222 0 0 -.2222 -75.5 107.79)">
                    <path
                      d="M407.08 429.98h30.17l-12.34 12.33-.05.06H409a20.4 20.4 0 0 1-1.92 40.7v-40.75l-33.9 33.79a61 61 0 0 1-10.56-6.97l32.08-31.95v-70.17l24.77-24.77v17.51l-12.39 12.39Z"
                    />
                    <path
                      d="m419.47 429.9-.06-59.82h12.38l.06 47.38zm42.5-24.84-12.39 12.38h-17.73l12.37-12.38Zm-79.66-26.39v53.29l-28.45 28.45a62 62 0 0 1-6.98-10.55l23.04-23.04V409.3l-27.95 27.97a62 62 0 0 1-2.1-15.42s41.05-41.74 42.44-43.18m-42.23 25.46v-17.51l79.4-79.39v17.51zm141.32-18.48h-12.39v-15.66h-12.38a20.4 20.4 0 1 1 40.8 0zm100.88-15.92-9.3-17.67h-57.87l37.63 72.3h-33.32l9.3 17.67h57.88l-37.64-72.3Zm33.61 36.28h29.68v-17.67h-29.68v-18.61h29.68v-17.67h-51.53v89.97h51.53v-17.67h-29.68Zm62.24-38.31h7.96c9.17 0 13.09 3.1 13.09 10.4 0 4.3-1.62 7.41-4.86 9.17-2.43 1.34-4.59 1.61-11.2 1.61h-4.99Zm0 37.1h5.4c9.98 0 14.16 3.1 14.16 10.52 0 7.29-4.18 10.39-14.43 10.39h-5.13Zm8.9 37.23c11.47 0 18.08-1.22 22.94-4.32 6.2-3.77 9.98-11.46 9.98-20.1 0-6.33-2.03-11.6-6.07-15.64-2.57-2.7-4.59-3.92-9.44-5.26 5.53-1.22 7.95-2.43 10.79-5.13 4.04-3.77 6.07-9.04 6.07-15.65 0-8.36-3.38-15.78-9.18-19.69-4.45-2.97-9.84-4.18-19.01-4.18h-36.83v89.97zm71.62-42.89c8.9 0 14.3 4.58 14.3 12.4 0 7.42-5.27 12.55-12.95 12.55h-8.37v-24.95Zm-7.02-47.08h-21.85v89.97h29.14c11.87 0 20.5-2.16 26.43-6.74 6.2-4.86 9.72-12.95 9.72-22.8 0-13.76-5.8-22.8-17.4-27.38l19.82-33.05h-26.16l-19.7 34.8zm80.01 35.39 9.04 28.8 9.02-28.8Zm29.15-35.4h23.71l-29.54 89.98h-27.79l-29.67-89.97h23.04l5.55 17.7h29.16z"
                    />
                  </g>
                </svg>
              </slot>
            </span>
            <slot name="platform-name">
              <div id="platform-name">${this.platformName}</div>
            </slot>
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
