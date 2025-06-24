import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.styles.js";
import { Contourable } from "../../../mixins/mixins.js";

/** This badge is used to indicate the order of importance.
 *
 * @slot - Main text of the priority pill.
 *
 * @cssproperty --priority-pill-index-background-color - Color of the index character.
 * @cssproperty --priority-pill-index-text-color - Background color of the index.
 * @cssproperty --priority-pill-text-color - Color of the text.
 * @cssproperty --priority-pill-background-color - Background color of the pill.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-15955
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-priority-pill")
export class ZetaPriorityPill extends Contourable(LitElement) {
  /** Text of Priority.
   *
   * Can also be slotted. */
  @property({ type: String }) text?: string;

  /** Character shown at start of component. Will be truncated to a single character if longer.
   *
   * Can also be slotted.
   *
   * The value of this property is usually a single digit number that indicates the priority level. */
  @property() index?: string | number;

  /**
   * (Optional) Status of the priority pill.
   *
   * This changes the color and content of the pill.
   *
   * If not provided, the primary color will be used. */
  @property({ type: String }) status?: "urgent" | "high" | "medium" | "low";

  /** Size of the priority pill */
  @property({ type: String, reflect: true }) size: "small" | "large" = "large";

  /** Type of the priority pill
   *
   * Lozenge shows the whole badge, including the text, while badge only shows the index character.  */
  @property({ type: String }) type: "badge" | "lozenge" = "lozenge";

  static styles = [styles, super.styles ?? []];

  getIndex = () => {
    if (this.index) {
      return String(this.index)[0];
    }
    if (this.status) {
      return { urgent: "U", high: "1", medium: "2", low: "3" }[this.status];
    }
    if (this.text) {
      return this.text[0];
    }
    return "";
  };

  getText = () => {
    if (this.text) {
      return this.text;
    }
    if (this.status) {
      return { urgent: "Urgent", high: "High", medium: "Medium", low: "Low" }[this.status];
    }
    return "";
  };

  protected override render() {
    return html`
      <div class="container contourable-target">
        <div class="number contourable-target">${this.getIndex()}</div>
        ${this.type === "lozenge" ? html`<div class="text">${this.getText()}</div>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-priority-pill": ZetaPriorityPill;
  }
}
