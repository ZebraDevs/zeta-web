import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./global-header.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button";
import "../search/search";
import "../avatar/avatar";
import "../dropdown/dropdown-menu/dropdown-menu-button";

/**TODO:
 * - Elements need to be able to be rounded. Icon button doesnt have rounded prop
 * - Make menu buttons/action buttons either normal text buttons/icon buttons or drop down menu buttons
 * - Change documentation
 * - Allow users to change text in buttons
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
   * Array of menu items to show on the header.
   * Each item in the array is an object with a label and an optional isDropDown property.
   * If isDropDown is true, the item will be rendered as a dropdown button.
   * If false or undefined, it will be rendered as a text button.
   * The label property is the text to display on the button.
   * Note: Only a maximum of 6 items will be rendered.
   * Example: .menuItems=${[{ label: 'Home'}, { label: 'Services', isDropDown: true }]}
   */
  @property({ type: Array }) menuItems: Array<{ label: string; isDropDown?: boolean; openDropDown?: boolean }> = [];

  /**
   * Array of action items to show on the header.
   * Each item in the array is an object with an optional icon and isDropDown property.
   * If isDropDown is true, the item will be rendered as a dropdown button.
   * If false or undefined, it will be rendered as an icon button.
   * Choose from zeta icon names for the icon property.
   * Note: Only a maximum of 6 items will be rendered.
   * Example: .actionItems=${[{ icon: 'star'}, { icon: 'settings', isDropDown: true }]}
   */
  @property({ type: Array }) actionItems: Array<{ icon?: string; isDropDown?: boolean; openDropDown?: boolean }> = [];

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
   * If true, menu and action items are rendered as dropdown buttons.
   */
  @property({ type: Boolean }) isDropDown: boolean = false;

  /**
   * Applies rounded corners to all elements on the header.
   * Set to true to round all elements.
   */
  @property({ type: Boolean }) rounded: boolean = false;

  //Handles toggling the open state of menu item dropdowns on click
  private handleMenuDropdownToggle(index: number) {
    const items = [...this.menuItems];
    items[index].openDropDown = !items[index].openDropDown;
    this.menuItems = items;
  }

  //Handles toggling the open state of action item dropdowns on click
  private handleActionDropdownToggle(index: number) {
    const items = [...this.actionItems];
    items[index].openDropDown = !items[index].openDropDown;
    this.actionItems = items;
  }

  /**
   * Renders menu buttons.
   * Checks if there are items in the array and limits to a maximum of 6.
   * Adds has-items class if items exist for styling purposes.
   * Maps through the array and renders either a button with a droppable menu, or a text button, based on the isDropDown property.
   * If no items exist, renders nothing.
   * @param items Array of menu items to render.
   * @returns HTML template for the menu buttons.
   */
  private renderMenuButtons(items: Array<{ label: string; isDropDown?: boolean; openDropDown?: boolean }>) {
    //Ensures items is defined - Set as empty array if undefined
    items = items ?? [];
    //Checks if array has items
    const hasItems = items.length > 0;
    //Max 6 items allowed, so slice to ensure no more than 6 are rendered
    const limitedItems = items.slice(0, 6);
    return html`
      <!--Add has-items class if there are items in array-->
      <div id="menu-items" class=${hasItems ? "has-items" : ""}>
        <!-- If hasItems is true, map through array and render either a dropdown button or a text button based on isDropDown property-->
        <!--If hasItems is false, render nothing-->
        ${hasItems
          ? limitedItems.map((item, index) =>
              item.isDropDown
                ? html`<zeta-button id="menu-anchor-${index}" flavor="text" @click=${() => this.handleMenuDropdownToggle(index)}
                      >${item.label}<zeta-icon>${item.openDropDown ? "expand_less" : "expand_more"}</zeta-icon>
                    </zeta-button>
                    <zeta-droppable
                      class="drop-down-menu"
                      .anchor=${this.shadowRoot?.getElementById(`menu-anchor-${index}`) ?? undefined}
                      .open=${item.openDropDown ?? false}
                    >
                      <!-- Dropdown menu content goes here -->
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                    </zeta-droppable>`
                : html`<zeta-button flavor="text">${item.label}</zeta-button>`
            )
          : nothing}
      </div>
    `;
  }

  /**
   * Renders action item buttons.
   * Checks if there are items in the array and limits to a maximum of 6.
   * Adds has-items class if items exist for styling purposes.
   * Maps through the array and renders either a button with a droppable menu, or an icon button, based on the isDropDown property.
   * If no items exist, renders nothing.
   * @param items Array of action items to render.
   * @returns HTML template for the action buttons.
   */
  private renderActionButtons(items: Array<{ icon?: string; isDropDown?: boolean; openDropDown?: boolean }>) {
    items = items ?? [];
    const hasItems = items.length > 0;
    const limitedItems = items.slice(0, 6);
    return html`
      <div id="action-items" class=${hasItems ? "has-items" : ""}>
        ${hasItems
          ? limitedItems.map((item, index) =>
              item.isDropDown
                ? html`<zeta-icon-button id="action-anchor-${index}" flavor="text" @click=${() => this.handleActionDropdownToggle(index)}
                      >more_horizontal
                    </zeta-icon-button>
                    <zeta-droppable
                      class="drop-down-menu"
                      .anchor=${this.shadowRoot?.getElementById(`action-anchor-${index}`) ?? undefined}
                      .open=${item.openDropDown ?? false}
                    >
                      <!-- Dropdown menu content goes here -->
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                      <zeta-dropdown-menu-item> Menu Item </zeta-dropdown-menu-item>
                    </zeta-droppable>`
                : html`<zeta-icon-button flavor="text">${item.icon}</zeta-icon-button>`
            )
          : nothing}
      </div>
    `;
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
              <zeta-icon-button id="hamburger-menu" flavor="text">hamburger_menu</zeta-icon-button>
              <img id="logo" src="../assets/zebra-logo.svg" alt="Zebra Technologies Logo" width="80px" height="32px" />
              <div class="platform-name">${this.platformName}</div>
            </div>
            <!--Menu items container - Holds menu items-->
            <div id="menu-items">${this.renderMenuButtons(this.menuItems)}</div>
          </div>
        </div>
        <!--Right container - Holds search bar, action items, user info and app switcher-->
        <div id="header-right">
          ${this.searchbar ? html`<zeta-search></zeta-search>` : nothing}
          <!--Action items container - Holds action items-->
          <div id="action-items">${this.renderActionButtons(this.actionItems)}</div>
          <!--User info button - Holds user name, avatar and chevron icon-->
          <zeta-button flavor="text">
            <span id="name">${this.name}</span>
            <div id="avatar">${this.initials}</div>
            <zeta-icon class="expand-icon">expand_more</zeta-icon>
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
