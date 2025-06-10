import { html, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-label.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable } from "../../../mixins/mixins.js";
import "../../icon/icon.js";
import { styleMap } from "lit/directives/style-map.js";
/**
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * Slotted children:
 *    * Text
 *    * Icon
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21836-37274
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-status-label")
export class ZetaStatusLabel extends Contourable(LitElement) {
  /** Type of status label.*/
  @property({ type: String, reflect: true }) status: "info" | "positive" | "warning" | "negative" | "neutral" = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) text?: string;

  /** Icon leading the component. @see {ZetaIconName}.
   *
   * @defaultValue `undefined`. This will render an indicator circle.
   */
  @property({ type: String }) icon?: ZetaIconName;
  static styles = [super.styles ?? [], styles];

  protected override render() {
    const icon = this.icon
      ? html`<zeta-icon
          .rounded=${this.rounded}
          style=${styleMap({
            "--icon-color": `var(--icon-" + ${this.status} + ")`
          })}
          >${this.icon}</zeta-icon
        >`
      : svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 8 8" >
    <circle cx="4" cy="4" r="4" />
    </svg>`;
    return html`
      <div class="container">
        <div class="icon-container">${icon}</div>
        <div class="text">${this.text ? this.text : html`<slot class="text" name="text"></slot>`}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-status-label": ZetaStatusLabel;
  }
}
