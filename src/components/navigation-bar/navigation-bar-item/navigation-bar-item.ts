import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { html, LitElement, nothing } from "lit";
import styles from "./navigation-bar-item.styles.js";
import "../../badges/badges.js";
import "../../icon/icon.js";

/**
 * A nav item to be used in a zeta-navigation-bar
 *
 * @slot badge - Displayed overlaying the icon. Should be a 'zeta-notification-indicator'.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21186-41419
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/navigation-bar--docs
 */
@customElement("zeta-navigation-bar-item")
export class ZetaNavigationBarItem extends Contourable(LitElement) {
  @property({ type: String }) icon?: ZetaIconName;

  @property({ type: String, reflect: true }) label?: string;

  @property({ type: String, reflect: true }) notificationValue?: string | boolean;

  @property({ type: Boolean, reflect: true }) active: boolean = false;

  private getLabel() {
    if (this.label) {
      return html`<div class="label">${this.label}</div>`;
    } else {
      return nothing;
    }
  }

  protected render() {
    return html`
      <div class="icon-container">
        ${this.notificationValue ? html`<zeta-notification-indicator .value=${this.notificationValue}></zeta-notification-indicator>` : ""}
        <zeta-icon .rounded=${this.rounded}>${this.icon}</zeta-icon>
      </div>
      ${this.getLabel()}
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar-item": ZetaNavigationBarItem;
  }
}
