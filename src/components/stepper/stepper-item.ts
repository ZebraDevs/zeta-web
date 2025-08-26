import { customElement, property } from "lit/decorators.js";

import { html, LitElement, nothing } from "lit";
import styles from "./stepper-item.styles.js";
import { classMap } from "lit/directives/class-map.js";
import "../icon/icon";

//TODO:
// - Make flavours for items for active, completed, etc

//Make a type for flavor
export type StepperItemFlavor = "completed" | "partial" | "success" | "active" | "default";

/** The step items that the stepper uses to convey progress through numbered steps.
 *
 * For the steps, pass `li` elements with `data-title` and `data-label` attributes as children
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11408
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11531
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper-item")
export class ZetaStepperItem extends LitElement {
  /** Set flavor for the step item. */
  @property({ type: String, reflect: true }) flavor: StepperItemFlavor = "default";

  /**Set to true when page is being edited. Shows pen icon on step. */
  @property({ type: Boolean }) editing = false;

  protected render() {
    const classes = {
      active: this.flavor === "active",
      partial: this.flavor === "partial",
      success: this.flavor === "success",
      default: this.flavor === "default",
      editing: this.editing
    };

    return html`
      <li class="step-container">
        <div class="step ${classMap(classes)}">
          <span>
            <span class="step-number">
              ${this.flavor === "success" ? html`<zeta-icon name="check_mark"></zeta-icon>` : html`<span class="number"></span>`}
              ${this.editing ? html`<zeta-icon name="edit"></zeta-icon>` : nothing}
            </span>
            <span class="bar"></span>
          </span>
          <div class="step-content">
            <span class="step-title"><slot></slot></span>
          </div>
        </div>
      </li>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-item": ZetaStepperItem;
  }
}
