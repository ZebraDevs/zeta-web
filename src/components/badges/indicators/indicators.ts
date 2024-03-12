import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.scss?inline";
import { Size } from "../../../types.js";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableElement } from "../../../mixins/contour.js";

/** ZetaIndicator.
 *
 * @public
 */
@customElement("zeta-indicator")
export class ZetaIndicator extends ContourableElement {
  /** Indicators sizes.
   *
   * @defaultValue 'medium'
   */
  @property({ type: String, reflect: true }) size: Size = "medium";

  /** Indicators' inverse.
   *
   * @defaultValue 'false'
   */
  @property({ type: Boolean, reflect: true }) inverse: boolean = false;

  /** Indicators' icon.
   *
   * @defaultValue 'star'
   */
  @property({ type: String }) icon: ZetaIconName = "star";

  /** Whether to render as a notification or icon indicator.
   *
   * @defaultValue 'notification'
   */
  @property({ type: String }) type: "icon" | "notification" = "notification";

  static styles = [super.styles ?? [], styles];

  readonly sizes = {
    small: 0,
    medium: 8,
    large: 12
  };

  private getBody() {
    if (this.type == "icon") {
      return html`<zeta-icon size=${this.sizes[this.size]} color="var(--on-surface-primary)" .rounded=${this.rounded}> ${this.icon} </zeta-icon> `;
    } else {
      return html` <span class="count"><slot></slot></span> `;
    }
  }

  protected override render() {
    return html` <div class="container ${this.type}">${this.getBody()}</div> `;
  }
}

/** Zeta Icon Indicator web component.
 *
 * @public */
@customElement("zeta-icon-indicator")
export class ZetaIconIndicator extends ZetaIndicator {
  constructor() {
    super();
    this.type = "icon";
  }
}

/** Zeta Notification Indicator web component.
 *
 * @public */
@customElement("zeta-notification-indicator")
export class ZetaNotificationIndicator extends ZetaIndicator {
  constructor() {
    super();
    this.type = "notification";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-notification-indicator": ZetaNotificationIndicator;
    "zeta-icon-indicator": ZetaIconIndicator;
    "zeta-indicator": ZetaIndicator;
  }
}

