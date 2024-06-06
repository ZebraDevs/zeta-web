import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-menu-item.styles.js";
import { html, LitElement } from "lit";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import "../../checkbox/checkbox.js";
import "../../radio-button/radio-button.js";

/** ZetaDropdownMenuItem web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/dropdown--docs
 */
@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends Contourable(Interactive(LitElement)) {
  /** Changes the type of the menu item. */
  @property({ type: String, reflect: true }) type: "default" | "checkbox" | "radio" = "default";

  /**
   * The name of the icon to be shown.
   *
   * Will only be displayed if 'type' is set to 'default'.
   */
  @property({ type: String }) icon?: ZetaIconName;

  /** Controls the state of the dropdown menu item. */
  @property({ type: Boolean }) checked: boolean = false;

  private toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  private getLeadingContent() {
    switch (this.type) {
      case "default":
        return html`<zeta-icon size="20" .rounded=${this.rounded} color=${!this.disabled ? "var(--icon-subtle)" : "var(--icon-disabled)"}>
          ${this.icon}
        </zeta-icon>`;
      case "checkbox":
        return html`<zeta-checkbox .rounded=${this.rounded} .checked=${this.checked} .disabled=${this.disabled}></zeta-checkbox>`;
      case "radio":
        return html`<zeta-radio-button .checked=${this.checked} .disabled=${this.disabled}></zeta-radio-button>`;
    }
  }

  protected render() {
    return html`<div ?disabled=${this.disabled} type=${this.type} class="menu-item" @click=${(_e: Event) => this.toggleCheck()}>
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
