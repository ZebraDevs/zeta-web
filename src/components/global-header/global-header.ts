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
 * - Change documentation
 * - Ensure disabled works
 * - Ensure buttons return functions when clicked
 */

/**
 * A header component which can contain branding, navigation, search, and user profile actions.
 *
 * @property {string} platformName - The platform name text on the header.
 * @property {Array<{ label: string; isDropDown?: boolean; openDropDown?: boolean; dropDownMenuOptions?: Array<{ label: string; action?: () => void }> }>} menuItems - Array of menu items to show on the header. Menu items can either be normal buttons or dropdown buttons. Note: Only a maximum of 6 items will be rendered.
 * @property {Array<{ icon?: string; isDropDown?: boolean; openDropDown?: boolean; dropDownMenuOptions?: Array<{ label: string; action?: () => void }> }>} actionItems - Array of action items to show on the header. Action items can either be normal buttons or dropdown buttons. Note: Only a maximum of 6 items will be rendered.
 * @property {string} name - The name to show in the header, next to the user icon.
 * @property {string} initials - The initials to display within the user icon.
 * @property {boolean} appSwitcher - Shows the app switcher icon. Make true to show the app switcher icon.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23144-118110
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-global-header--docs
 *
 * @example <zeta-global-header
 *  platformName="Platform Name"
 *  .menuItems=${[{ label: 'Home'}, { label: 'Services', isDropDown: true, dropDownMenuOptions: [{ label: 'Menu Item', action: () => console.log('Menu Item clicked') }] }]}
 *  .actionItems=${[{ icon: 'star'}, { icon: 'settings', isDropDown: true, dropDownMenuOptions: [{ label: 'Menu Item', action: () => console.log('Menu Item clicked') }] }]}
 *  name="Name"
 *  initials="RK"
 *  appSwitcher
 *  searchbar
 *  rounded
 * ></zeta-global-header>
 */
@customElement("zeta-global-header")
export class ZetaGlobalHeader extends Contourable(LitElement) {
  /** The platform name text on the header. */
  @property({ type: String }) platformName: string;

  /**
   * Array of menu items to show on the header. Menu items can either be normal buttons or dropdown buttons. Note: Only a maximum of 6 items will be rendered.
   * @property {string} label - The text to display on the button.
   * @property {boolean} isDropDown - If true, the item will be rendered as a dropdown button. If false or undefined, it will be rendered as a text button.
   * @property {boolean} openDropDown - Controls the open state of the dropdown. This is handled internally when the button is clicked. Only applicable if isDropDown is true.
   * @property {Array<{ label: string; action?: () => void }>} dropDownMenuOptions - An array of menu options to display in the dropdown. Each option is an object with a label and an optional action function to be called when the option is clicked. Only applicable if isDropDown is true.
   * @example .menuItems=${[{ label: 'Home'}, { label: 'Services', isDropDown: true, dropDownMenuOptions: [{ label: 'Menu Item', action: () => console.log('Menu Item clicked') }] }]}
   */
  @property({ type: Array }) menuItems: Array<{
    label: string;
    isDropDown?: boolean;
    openDropDown?: boolean;
    dropDownMenuOptions?: Array<{ label: string; action?: () => void }>;
  }> = [];

  /**
   * Array of action items to show on the header. Action items can either be normal buttons or dropdown buttons.
   * Note: Only a maximum of 6 items will be rendered.
   *
   * @property {string} icon - The name of the icon to display on the button. This should correspond to a valid icon name in the Zeta Icons library.
   * @property {boolean} isDropDown - If true, the item will be rendered as a dropdown button. If false or undefined, it will be rendered as an icon button.
   * @property {boolean} openDropDown - Controls the open state of the dropdown. This is handled internally when the button is clicked. Only applicable if isDropDown is true.
   * @property {Array<{ label: string; action?: () => void }>} dropDownMenuOptions - An array of menu options to display in the dropdown. Each option is an object with a label and an optional action function to be called when the option is clicked. Only applicable if isDropDown is true.
   * @example .actionItems=${[{ icon: 'star'}, { icon: 'settings', isDropDown: true, dropDownMenuOptions: [{ label: 'Menu Item', action: () => console.log('Menu Item clicked') }] }]}
   */
  @property({ type: Array }) actionItems: Array<{
    icon?: string;
    isDropDown?: boolean;
    openDropDown?: boolean;
    dropDownMenuOptions?: Array<{ label: string; action?: () => void }>;
  }> = [];

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
  private renderMenuButtons(
    items: Array<{ label: string; isDropDown?: boolean; openDropDown?: boolean; dropDownMenuOptions?: Array<{ label: string; action?: () => void }> }>
  ) {
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
                      ${item.dropDownMenuOptions?.map(
                        option => html` <zeta-dropdown-menu-item @click=${option.action}>${option.label}</zeta-dropdown-menu-item> `
                      )}
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
  private renderActionButtons(
    items: Array<{ icon?: string; isDropDown?: boolean; openDropDown?: boolean; dropDownMenuOptions?: Array<{ label: string; action?: () => void }> }>
  ) {
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
                      ${item.dropDownMenuOptions?.map(
                        option => html` <zeta-dropdown-menu-item @click=${option.action}>${option.label}</zeta-dropdown-menu-item> `
                      )}
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
