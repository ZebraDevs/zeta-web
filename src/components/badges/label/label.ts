import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./label.styles.js";
import { Contourable } from "../../../mixins/mixins.js";

/** Text badges notify users of line items that need attention.
 *
 * @slot  - Text displayed on the label. If not provided, the `label` property will be used.
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=21926-2099
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-label")
export class ZetaLabel extends Contourable(LitElement) {
  /** Type of text label.
   *
   * @defaultValue `"neutral"` */
  @property({ type: String, reflect: true }) status: "info" | "positive" | "warning" | "negative" | "neutral" = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) label?: string;

  /** Whether the label has a solid, strong fill with light text.
   *
   * When false, the label has a tinted fill with dark text.
   *
   * @defaultValue `true` */
  @property({ type: Boolean, reflect: true }) bold = true;

  /** Whether the label has a 1px border around a tinted fill.
   *
   * Only applies when `bold` is false; ignored when `bold` is true.
   *
   * @defaultValue `false` */
  @property({ type: Boolean, reflect: true }) outlined = false;

  static styles = [styles, super.styles ?? []];

  protected override render() {
    return html`
      <div class="container">
        <div class="text">${this.label}<slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-label": ZetaLabel;
  }
}
