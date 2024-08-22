import { customElement, property } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import styles from "./avatar.styles.js";
import "../icon/icon.js";
import "../badges/indicators/indicators.js";
import { ZetaCloseEvent } from "../../events.js";

/**
 * An avatar is a visual representation of a user or entity.
 *
 * @cssproperty --avatar-color - The color of the avatar
 * @cssproperty --avatar-initials-color - The color of the initials
 * @slot - The content of the avatar. Should be an img element, a zeta-icon, or text.
 * @slot status - The content of the status slot. Usually used for indicators or badges.
 * @event {CustomEvent<ZetaCloseEvent>} ZetaCloseEvent:close- Fired when the close icon is clicked.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=20816-388
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/avatar--docs
 */
@customElement("zeta-avatar")
export class ZetaAvatar extends LitElement {
  /**
   * The size of the avatar.
   */
  @property({ type: String, reflect: true }) size: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl" = "m";

  /**
   * Shows the ring around the avatar.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-ring" }) showRing: boolean = false;

  /**
   * Shows the close icon.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose: boolean = false;

  protected render() {
    return html`
      <div class="avatar">
        <slot id="CONTENT_SLOT"></slot>
      </div>
      ${this.showClose
        ? html`<div
            class="close"
            @click=${() => {
              this.dispatchEvent(new ZetaCloseEvent().toEvent());
            }}
          >
            <zeta-icon>close</zeta-icon>
          </div>`
        : nothing}
      <div class="status"><slot name="status" id="STATUS_SLOT"></slot></div>
    `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar": ZetaAvatar;
  }
}
