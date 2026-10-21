import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./avatar-status-indicator.styles.js";
import "../../icon/icon.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { STATUS_INDICATOR_ICONS } from "./status-indicator-icons.js";

export type AvatarStatusIndicatorStatus = "available" | "away" | "busy" | "dnd" | "on-shift" | "offline" | "close" | "icon";

const STATUS_LABEL: Record<AvatarStatusIndicatorStatus, string> = {
  available: "Available",
  away: "Away",
  busy: "Busy",
  dnd: "Do not disturb",
  "on-shift": "On shift",
  offline: "Offline",
  close: "Close",
  icon: ""
};

/**
 * A small colored circle used to show a user's presence, or as the dismiss badge on `zeta-avatar`.
 * Sized to match whichever avatar it's placed on via the `--avatar-status-indicator-size` CSS custom
 * property, which `zeta-avatar` sets automatically based on its own `size`.
 *
 * @cssproperty --avatar-status-indicator-size - The width/height of the indicator. Set automatically when used inside `zeta-avatar`, defaults to 12px standalone.
 * @cssproperty --avatar-status-indicator-ring-color - The color of the ring around the indicator, used to separate it from whatever surface it sits on.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2699-17716&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar--docs
 */
@customElement("zeta-avatar-status-indicator")
export class ZetaAvatarStatusIndicator extends LitElement {
  /**
   * The presence/purpose the indicator represents.
   * Possible values:
   * - available, away, busy, dnd, on-shift, offline - presence states
   * - close - the dismiss badge used by `zeta-avatar`'s `show-close`
   * - icon - a generic badge for a custom icon, set via the `icon` property
   *
   * Default value: available
   */
  @property({ type: String, reflect: true }) status: AvatarStatusIndicatorStatus = "available";

  /** Icon shown when `status` is "icon". Ignored for every other status, which use their own fixed icon. */
  @property({ type: String }) icon?: ZetaIconName;

  /**
   * Accessible name for the indicator, since presence/purpose is otherwise conveyed by color alone.
   * Defaults to a label matching `status` (e.g. "Available", "Close"). Required when `status` is "icon",
   * since its meaning can't be inferred.
   */
  @property({ type: String }) label?: string;

  protected render() {
    const icon = this.status === "icon" ? this.icon : STATUS_INDICATOR_ICONS[this.status];
    const label = this.label ?? STATUS_LABEL[this.status];
    const iconSize = this.status === "icon" ? "calc(var(--avatar-status-indicator-size, 16px) * 0.75)" : "var(--avatar-status-indicator-size)";
    return html`
      <div class="indicator" role=${label ? "img" : nothing} aria-label=${label || nothing}>
        ${icon ? html`<zeta-icon style="--icon-size: ${iconSize}">${icon}</zeta-icon>` : nothing}
      </div>
    `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar-status-indicator": ZetaAvatarStatusIndicator;
  }
}
