import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Size } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Indicators are used to show the status of a user or any messages/notifications they might have.
 *
 * @slot - Value to be displayed inside the indicator.
 *         If the `type` is set to `notification`, this should be the number or text shown inside the indicator.
 *         If the `type` is set to `icon`, this should be an icon or any other content you want to display.
 *         There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10045&mode=design&t=6mhOcUUr3tgxxFdd-0
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10072&mode=design&t=6mhOcUUr3tgxxFdd-0
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-indicator")
export class ZetaIndicator extends Size(Contourable(LitElement)) {
  /**
   * Icon to be shown on icon type indicator.
   *
   * Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
   */
  @property({ type: String }) icon?: ZetaIconName;

  /** Whether to render as a notification or icon indicator. */
  @property({ type: String, reflect: true }) type: "icon" | "notification" = "notification";

  /**
   * Value to be displayed inside the indicator. If the value is a number, its value will be ued to determine the size of the indicator.
   * The value should not be negative.
   * If the value is above 99, it will be displayed as "99+".
   */
  @property({ type: String, reflect: true }) text?: string;

  static styles = [super.styles ?? [], styles];

  private getBody(value?: string) {
    if (this.type == "icon" && this.icon) {
      return html`<zeta-icon .name=${this.icon} .rounded=${this.rounded}></zeta-icon> `;
    } else if (this.type === "notification" && value) {
      return html`<span>${value}</span>`;
    }
    return html`<slot></slot>`;
  }

  protected override render() {
    let sizeType: "small" | "medium" | "large" | "larger" = this.size;

    let value = this.text;

    if (this.size != "small" && this.type === "notification" && this.text && !isNaN(Number(this.text))) {
      const num = Math.abs(Number(this.text));
      if (num > 99) {
        value = "99+";
        sizeType = "larger";
      } else if (num > 9) {
        sizeType = "large";
      }
    }
    return html`<div class="container   ${sizeType}">${this.size !== "small" ? this.getBody(value) : ""}</div> `;
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
