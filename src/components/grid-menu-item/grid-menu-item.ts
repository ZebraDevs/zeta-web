import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import { html, LitElement } from "lit";
import styles from "./grid-menu-item.styles.js";
import "../badges/indicators/indicators";

// TODO(UX-1335): Grid items are not working in storybook
/**
 * An item to be used in a grid menu. Current usecases include the navigation bar and bottom sheet.
 *
 * @slot - Label to be displayed.
 * @slot {zeta-icon} icon - Icon to be displayed. Full list of icons can be found at https://zeta-icons.web.app/.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21186-41419
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/navigation-bar--docs
 */
@customElement("zeta-grid-menu-item")
export class ZetaGridMenuItem extends Contourable(LitElement) {
  @property({ type: String, reflect: true }) notificationValue?: string | boolean;
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected render() {
    return html`
      <div class="icon-container">
        ${this.notificationValue ? html`<zeta-notification-indicator .value=${this.notificationValue}></zeta-notification-indicator>` : ""}
        <slot name="icon"></slot>
      </div>
      <div class="label">
        <slot></slot>
      </div>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-grid-menu-item": ZetaGridMenuItem;
  }
}
