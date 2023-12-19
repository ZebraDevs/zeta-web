import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import { html, nothing } from "lit";
import styles from "./stepper.scss";
import { classMap } from "lit/directives/class-map.js";

/**
 * Steppers convey progress through numbered steps.
 * For the steps, pass `li` elements with `data-title` and `data-label` attributes as children
 */
@customElement("zeta-stepper")
export class ZetaStepper extends ContourableCondensableElement {
  constructor() {
    super();
  }
  /**
   * Stepper direction
   */
  @property({ reflect: true }) variant: "vertical" | "horizontal" = "horizontal";
  /**
   * Current active step
   */
  @property({
    type: Number,
    attribute: "active-step"
  })
  activeStep = 0;
  /**
   * Show bar separator
   */

  @property({ type: Boolean }) bar = true;

  private renderSteps = () => {
    const steps = Array.from(this.querySelectorAll<HTMLLIElement>("li"));
    return html`${steps.map((step, index) => {
      const classes = {
        completed: index < this.activeStep,
        active: this.activeStep === index
      };

      const barClass = {
        show: this.bar,
        completed: index < this.activeStep && this.bar,
        active: this.activeStep === index && this.bar
      };

      return html`
        <li class="step-container">
          <div class="step ${classMap(classes)}">
            <span class="step-number">${index + 1}</span>
            <div class="step-content">
              ${step.childNodes[0]} ${step.dataset.label ? html`<span class="step-label">${step.dataset.label}</span>` : nothing}
              <span class="step-title">${step.dataset.title}</span>
            </div>
          </div>
          <span class="bar ${classMap(barClass)}"></span>
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

