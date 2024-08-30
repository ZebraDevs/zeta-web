import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement } from "lit";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";

/**
 * Menu item used in `zeta-dropdown`
 *
 * @slot - Content of menu item; typically text.
 * @slot  {zeta-icon} icon - A `zeta-icon` element shown on leading side of item. Only shown if `type` is `default`.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/dropdown--docs
 */
@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends Contourable(Interactive(LitElement)) {
  /** Changes the type of the menu item. */
  @property({ type: String, reflect: true }) type: "default" | "checkbox" | "radio" = "default";

  /** Controls the state of the dropdown menu item. */
  @property({ type: Boolean }) checked: boolean = false;

  @queryAssignedElements({ slot: "icon", flatten: true }) icon?: Array<Node>;

  private toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  private getLeadingContent() {
    switch (this.type) {
      case "default":
        return html`<slot name="icon"></slot>`;
      case "checkbox":
        return html`<zeta-checkbox .rounded=${this.rounded} .checked=${this.checked} .disabled=${this.disabled}></zeta-checkbox>`;
      case "radio":
        return html`<zeta-radio-button .checked=${this.checked} .disabled=${this.disabled}></zeta-radio-button>`;
    }
  }

  protected render() {
    return html`<div class="menu-item" @click=${(_e: Event) => this.toggleCheck()}>
      <div class="leading">${this.getLeadingContent()}</div>
      <div class="header">
        <slot></slot>
      </div>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-item": ZetaDropdownMenuItem;
  }
}
