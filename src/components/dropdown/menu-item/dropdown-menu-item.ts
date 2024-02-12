import { customElement, property } from "lit/decorators.js";
import styles from "./dropdown-menu-item.scss?inline";
import { html } from "lit";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

@customElement("zeta-dropdown-menu-item")
export class ZetaDropdownMenuItem extends ContourableInteractiveElement {
  /**
   * Disables the menu item.
   */
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  /**
   * Changes the type of the menu item.
   *
   * Can be 'default', 'checkbox' or 'radio'.
   */
  @property({ type: String, reflect: true }) type: "default" | "checkbox" | "radio" = "default";

  /**
   * The name of the icon to be shown.
   *
   * Will only be dislayed if 'type' is set to 'default'.
   */
  @property({ type: String }) icon?: ZetaIconName;

  /**
   * Controls the state of the dropdown menu item.
   */
  @property({ type: Boolean }) checked: boolean = false;

  private toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  private getLeadingContent() {
    switch (this.type) {
      case "default":
        return html`<zeta-icon
          size="20"
          name=${this.icon}
          .rounded=${this.rounded}
          color=${!this.disabled ? "var(--icon-subtle)" : "var(--icon-disabled)"}
        ></zeta-icon>`;
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
