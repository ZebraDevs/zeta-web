import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.scss?inline";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Size } from "../../../mixins/mixins.js";

/** Indicators are used to show the status of a user or any messages/notifications they might have. */
@customElement("zeta-indicator")
export class ZetaIndicator extends Size(Contourable(LitElement)) {
  /**
   *  Whether indicator is to be on an inverse background.
   *
   * Adds an inverse color border to the indicator.
   */
  @property({ type: Boolean, reflect: true }) inverse: boolean = false;

  /**
   * Icon to be shown on icon type indicator.
   *
   * Full list of icons can be found at {@link https://zeta-icons.web.app/}.
   */
  @property({ type: String }) icon: ZetaIconName = "star";

  /** Whether to render as a notification or icon indicator. */
  @property({ type: String }) type: "icon" | "notification" = "notification";

  static styles = [super.styles ?? [], styles];

  readonly sizes = {
    small: 0,
    medium: 8,
    large: 12
  };

  private getBody() {
    if (this.type == "icon") {
      return html`<zeta-icon size=${this.sizes[this.size]} color="var(--icon-inverse)" .rounded=${this.rounded}> ${this.icon} </zeta-icon> `;
    } else {
      return html` <span class="count"><slot></slot></span> `;
    }
  }

  protected override render() {
    return html` <div class="container ${this.type}">${this.getBody()}</div> `;
  }
}

/** Indicator with error red background, and an icon foreground. */
@customElement("zeta-icon-indicator")
export class ZetaIconIndicator extends ZetaIndicator {
  constructor() {
    super();
    this.type = "icon";
  }
}

/** Indicator with primary blue background and text / number foreground. */
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

