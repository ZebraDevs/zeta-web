import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Indicators are used to show the status of a user or any messages/notifications they might have.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10045&mode=design&t=6mhOcUUr3tgxxFdd-0
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10072&mode=design&t=6mhOcUUr3tgxxFdd-0
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
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
   * Full list of icons can be found at {@link https://zeta-icons.web.app/ Zeta Icons}.
   */
  @property({ type: String }) icon: ZetaIconName = "star";

  /** Whether to render as a notification or icon indicator. */
  @property({ type: String }) type: "icon" | "notification" = "notification";

  @property({ type: String, reflect: true }) value: string | true | false = false;

  static styles = [super.styles ?? [], styles];

  private getBody(value: string | boolean) {
    if (this.type == "icon") {
      return html`<zeta-icon .rounded=${this.rounded}>${this.icon}</zeta-icon> `;
    } else {
      return html`${value}`;
    }
  }

  protected override render() {
    const value = this.value === true || !this.value ? "" : this.value;
    return html` <div class="container ${this.type} ${value.length ? "expand" : ""}">${this.size !== "small" ? this.getBody(value) : ""}</div> `;
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
