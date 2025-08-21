import { customElement, property } from "lit/decorators.js";

import { html, LitElement, nothing } from "lit";
import styles from "./stepper.styles.js";
import { classMap } from "lit/directives/class-map.js";
import "../icon/icon";

/** Steppers convey progress through numbered steps.
 *
 * For the steps, pass `li` elements with `data-title` and `data-label` attributes as children
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11408
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-11531
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */
@customElement("zeta-stepper")
export class ZetaStepper extends LitElement {
  /** Stepper direction. Defaults to horizontal. */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";

  /** Current active step. */
  @property({ type: Number }) activeStep = 0;

  /** Set to true when page filling is in progress and uncompleted. */
  @property({ type: Boolean }) partial = false;

  /** Choose to show progress bar or not on horizontal orientation. */
  @property({ type: Boolean }) progressBar = false;

  private renderSteps = () => {
    // prettier-ignore
    const steps = Array.from(this.querySelectorAll<HTMLLIElement>("li"));
    return html`${steps.map((step, index) => {
      const classes = {
        completed: index < this.activeStep,
        active: this.activeStep === index,
        partial: this.partial && this.activeStep !== index
      };

      return html`
        <li class="step-container">
          <div class="step ${classMap(classes)}">
            <span>
              <span class="step-number">
                ${classes.completed ? html`<zeta-icon name="check_mark"></zeta-icon>` : index + 1}
                ${classes.completed ? html`<zeta-icon name="edit"></zeta-icon>` : nothing}
              </span>
              <span class="bar "></span>
            </span>
            <div class="step-content">
              <span class="step-title">Label</span>
            </div>
          </div>
        </li>
      `;
    })}`;
  };

  protected render() {
    return html`
      <ul class="steps">
        ${this.renderSteps()}
      </ul>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper": ZetaStepper;
  }
}
