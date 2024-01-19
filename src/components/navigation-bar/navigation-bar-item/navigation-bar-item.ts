import { customElement, property } from "lit/decorators.js";
import { ContourableElement } from "../../../mixins/contour.js";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { html, nothing } from "lit";
import styles from "./navigation-bar-item.scss";
import "../../icon/icon.js";

/**
 * A nav item to be used in a zeta-navigation-bar
 *
 * @slot badge - Displayed overlaying the icon. Should be a 'zeta-notification-indicator';
 */
@customElement("zeta-navigation-bar-item")
export class ZetaNavigationBarItem extends ContourableElement {
  @property({ type: String }) icon?: ZetaIconName;

  @property({ type: String, reflect: true }) label?: string;

  @property({ type: Boolean, reflect: true }) active: boolean = false;

  private getLabel() {
    if (this.label) {
      return html`<div class="label">${this.label}</div>`;
    } else {
      return nothing;
    }
  }

  private getIconColor() {
    if (this.active) {
      return "var(--icon-primary)";
    } else {
      return "var(--icon-disabled)";
    }
  }

  protected render() {
    return html`
      <div class="nav-item" ?label=${this.label}>
        <div class="icon-container">
          <zeta-icon .rounded=${this.rounded} color=${this.getIconColor()} name=${this.icon}></zeta-icon>
          <div class="badge">
            <slot name="badge"></slot>
          </div>
        </div>
        ${this.getLabel()}
      </div>
    `;
  }

  static styles = [styles, ContourableElement.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar-item": ZetaNavigationBarItem;
  }
}
