import { html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ContourableElement } from "../../../mixins/contour.js";
import styles from "./slider-input-field.scss";
import "../slider/slider.js";
import "../../text-input/text-input.js";
import { ZetaSliderEvent } from "../slider/slider.js";
import { live } from "lit/directives/live.js";

/** ZetaSliderInputField web component.
 *
 * An input field using a Zeta Slider
 *
 * @fires change with a type of ZetaSliderEvent
 *
 * @public */
@customElement("zeta-slider-input-field")
export class ZetaSliderInputField extends ContourableElement {
  /**
   * The label displayed above the input.
   */
  @property({ type: String }) label?: string;
  /**
   * The name given to the input field.
   */
  @property({ type: String }) name?: string;
  /**
   * The value of the input field.
   */
  @property({ type: Number, reflect: true }) value?: number;
  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true }) error = false;
  /**
   * The minimum value of the slider input field.
   *
   * @defaultValue 0
   */
  @property({ type: Number }) min: number = 0;
  /**
   * The maximum value of the slider input field.
   *
   * @defaultValue 100
   */
  @property({ type: Number }) max: number = 100;
  /**
   * If set, will put steps on the slider at the given increments and the slider will snap to the nearest step.
   */
  @property({ type: Number, attribute: "step-increment" }) stepIncrement?: number;
  /**
   * Disables the input field
   */
  @property({ type: Boolean, reflect: true }) disabled?: boolean;

  @query("input") input!: HTMLInputElement;

  private getLabel() {
    if (this.label) {
      return html`<label for="slider-input">${this.label}</label>`;
    } else {
      return nothing;
    }
  }

  private sliderChange = (e: CustomEvent<ZetaSliderEvent>) => {
    this.value = e.detail.value;
    this.input.value = this.value.toString();
    this.onValueUpdated();
  };

  private onValueUpdated() {
    if (this.value) {
      this.error = this.value < this.min || this.value > this.max;

      this.dispatchEvent(
        new CustomEvent<ZetaSliderEvent>("change", {
          detail: {
            value: this.value
          }
        })
      );
    }
  }

  protected override render() {
    return html` 
    ${this.getLabel()}
    <div class="slider-input-container" id="test">
      <div class="slider-container">
        <zeta-slider id="slider" step-increment=${this.stepIncrement} .rounded=${this.rounded} .disabled=${this.disabled} value=${this.value} max-value=${
          this.max
        } min-value=${this.min} @change=${this.sliderChange}></zeta-slider>
        <div class="range-label-container">
          <div>${this.min}</div>
          <div>${this.max}</div>
        </div>
      </div>
      <input id="slider-input" aria-label=${this.label ?? "slider input"} .disabled=${this.disabled} .id=${
        this.id
      } class="contourable-target" type="number" min=${this.min} max=${this.max} .name=${this.name} .step=${this.stepIncrement} value=${live(
        this.value
      )} @input=${(e: Event) => {
        this.value = parseInt((e.target as HTMLInputElement).value);
        this.onValueUpdated();
      }}></input>
    </div> `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-slider-input-field": ZetaSliderInputField;
  }
}
