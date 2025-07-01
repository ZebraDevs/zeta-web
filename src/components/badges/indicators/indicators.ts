import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Size, type SizeType } from "../../../mixins/mixins.js";
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
   * Value to be displayed inside the indicator.
   * The value should not be negative.
   * If the value is above 99, it will be displayed as "99+".
   * The value will determine the size of the indicator when the type is set to "notification".
   * If the value is above 99, the size will be set to "large".
   * If the value is a number, it will be displayed as a number.s
   */
  @property({ type: Number, reflect: true }) value?: number;

  static styles = [super.styles ?? [], styles];

  private getBody(value?: string | number) {
    if (this.type == "icon" && this.icon) {
      return html`<zeta-icon .name=${this.icon} .rounded=${this.rounded}></zeta-icon> `;
    } else if (this.type === "notification" && value) {
      return html`<span>${value}</span>`;
    }
    return html`<slot></slot>`;
  }

  protected override render() {
    let enforcedSize: SizeType = this.size;

    let value: number | string | undefined = this.value;

    if (this.type === "notification" && this.value && !isNaN(Number(this.value))) {
      const num = Math.abs(this.value);
      if (num > 99) {
        value = "99+";
      }
      if (num > 10) {
        enforcedSize = "large";
      }
    }
    // TODO: Fix tests. Ensure size matches figma
    return html`<div class="container ${enforcedSize}">${this.size !== "small" ? this.getBody(value) : ""}</div> `;
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
