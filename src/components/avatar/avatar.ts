import { customElement, property } from "lit/decorators.js";
import { LitElement, html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import styles from "./avatar.styles.js";
import sizeStyles from "./avatar-size.styles.js";
import "./status-indicator/avatar-status-indicator.js";
import "../badges/indicators/indicators.js";
import { ZetaCloseEvent } from "../../events.js";
import type { AvatarSize } from "./avatar-size.js";
import type { AvatarStatusIndicatorStatus } from "./status-indicator/avatar-status-indicator.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

/**
 * An avatar is a visual representation of a user or entity.
 *
 * @cssproperty --avatar-color - The color of the avatar. Defaults to purple. Recommended colors (backed by the chart/series design tokens): --avatar-blue, --avatar-green, --avatar-yellow, --avatar-orange, --avatar-purple, --avatar-sea, --avatar-burgundy
 * @cssproperty --avatar-initials-color - The color of the initials
 * @cssproperty --avatar-border-color - The color of the avatar border.
 * @slot - The content of the avatar. Should be an img element, a zeta-icon, or text.
 * @slot status - The content of the status slot. Defaults to a `zeta-avatar-status-indicator` with the status specified by the `status` property when set and nothing else is slotted; slot in any other content to override it.
 * @attr {boolean} show-ring - Shows the ring around the avatar.
 * @attr {boolean} show-close - Shows the close icon, rendered as a `zeta-avatar-status-indicator` with `status="close"`.
 * @attr {string} status - The presence/purpose state for the status badge. When set, displays a status indicator. Possible values: "available", "away", "busy", "dnd", "on-shift", "offline", "icon".
 * @attr {string} status-icon - The icon to display when `status` is "icon". Ignored for other status values.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the close icon is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar--docs
 */

@customElement("zeta-avatar")
export class ZetaAvatar extends LitElement {
  /**
   * The size of the avatar.
   * Possible values:
   * - xxxs: 24px
   * - xxs: 32px
   * - xs: 36px
   * - s: 40px
   * - m: 48px
   * - l: 64px
   * - xl: 80px
   * - xxl: 120px
   * - xxxl: 200px
   *
   * Long-form aliases are also accepted: xxxsmall, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge.
   *
   * Default value: m
   */
  @property({ type: String, reflect: true }) size?: AvatarSize;

  /**
   * Shows the ring around the avatar.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-ring" }) showRing: boolean = false;

  /**
   * Shows the close icon.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose: boolean = false;

  /**
   * The presence/purpose state for the status badge. When set, displays a status indicator
   * in the status slot. If the `status` slot already has content, that content takes precedence.
   *
   * Possible values: "available", "away", "busy", "dnd", "on-shift", "offline", "icon"
   */
  @property({ type: String, reflect: true }) status?: AvatarStatusIndicatorStatus;

  /**
   * The icon to display when `status` is "icon". Ignored for other status values.
   */
  @property({ type: String, reflect: true, attribute: "status-icon" }) statusIcon?: ZetaIconName;

  protected render() {
    return html`
      <div class=${classMap({ avatar: true, ring: this.showRing })}>
        <slot id="CONTENT_SLOT"></slot>
      </div>
      ${
        this.showClose
          ? html`
              <div
                class="close"
                @click=${() => {
                  this.dispatchEvent(new ZetaCloseEvent().toEvent());
                }}
              >
                <zeta-avatar-status-indicator status="close"></zeta-avatar-status-indicator>
              </div>
            `
          : nothing
      }
      <div class="status">
        <slot name="status" id="STATUS_SLOT">
          ${
            this.status
              ? html`<zeta-avatar-status-indicator
                  status=${this.status}
                  icon=${this.statusIcon || nothing}
                  label=${this.statusIcon || nothing}
                ></zeta-avatar-status-indicator>`
              : nothing
          }
        </slot>
      </div>
    `;
  }

  static styles = [sizeStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar": ZetaAvatar;
  }
}
