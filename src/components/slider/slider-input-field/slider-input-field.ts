import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./slider-input-field.styles.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { type ZetaSliderEventDetail, ZetaSliderEvent } from "../../../events.js";
import "../../text-input/text-input.js";
import "../slider.js";

//TODO: min / max dont seem to change values of slider correctly.

/**
 * An input field using a Zeta Slider
 *
 * @event {CustomEvent<ZetaSliderEvent>} ZetaSliderEvent:zeta-slider-change - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
 */
@customElement("zeta-slider-input-field")
export class ZetaSliderInputField extends Contourable(LitElement) {
  /** The label displayed above the input. */
  @property({ type: String }) label?: string;

  /** The name given to the input field. */
  @property({ type: String }) name?: string;

  /** The value of the input field. */
  @property({ type: Number, reflect: true }) value?: number;

  /** Error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** The minimum value of the slider input field. */
  @property({ type: Number }) min: number = 0;

  /** The maximum value of the slider input field. */
  @property({ type: Number }) max: number = 100;

  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  @property({ type: Number }) stepIncrement?: number;

  /**  Disables the input field. */
  @property({ type: Boolean, reflect: true }) disabled?: boolean;

  @query("input") input!: HTMLInputElement;

  private getLabel() {
    if (this.label) {
      return html`<label for="slider-input">${this.label}</label>`;
    } else {
      return nothing;
    }
  }

  /**
   * @listens ZetaSliderEvent:zeta-slider-change
   */
  private sliderChange = (e: CustomEvent<ZetaSliderEventDetail>) => {
    this.value = e.detail.value;
    this.input.value = this.value.toString();
    this.onValueUpdated();
  };

  /**
   * @fires ZetaSliderEvent:zeta-slider-change
   */
  private onValueUpdated() {
    if (this.value) {
      this.error = this.value < this.min || this.value > this.max;
      this.dispatchEvent(new ZetaSliderEvent({ value: this.value }).toEvent());
    }
  }

  protected override render() {
    return html` 
    ${this.getLabel()}
    <div class="slider-input-container" id="test">
      <div class="slider-container">
        <zeta-slider id="slider" stepIncrement=${ifDefined(this.stepIncrement)} .rounded=${this.rounded} .disabled=${this.disabled} value=${ifDefined(this.value)} max-value=${
          this.max
        } min-value=${this.min} @change=${this.sliderChange}></zeta-slider>
        <div class="range-label-container">
          <div>${this.min}</div>
          <div>${this.max}</div>
        </div>
      </div>
      <input 
        id="slider-input" 
        aria-label=${this.label ?? "slider input"} 
        ?disabled=${this.disabled} 
        .id=${this.id} 
        class="contourable-target" 
        type="number" 
        min=${this.min} 
        max=${this.max} 
        name=${ifDefined(this.name)} 
        step=${ifDefined(this.stepIncrement)} 
        value=${ifDefined(live(this.value))}
        @input=${(e: Event) => {
          this.value = parseInt((e.target as HTMLInputElement).value);
          this.onValueUpdated();
        }}>
      </input>
    </div> `;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-slider-input-field": ZetaSliderInputField;
  }
}
