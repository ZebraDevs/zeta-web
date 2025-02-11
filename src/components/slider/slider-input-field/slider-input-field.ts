import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./slider-input-field.styles.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { type ZetaSliderEventDetail, ZetaSliderEvent } from "../../../events.js";
import "../../text-input/text-input.js";
import "../slider.js";
import { FormField, type InputType } from "../../../mixins/form-field.js";

//TODO: min / max dont seem to change values of slider correctly.

/**
 * An input field using a Zeta Slider
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=875-11860&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/slider--docs
 */
@customElement("zeta-slider-input-field")
export class ZetaSliderInputField extends FormField(Contourable(LitElement)) {
  /** The label displayed above the input. */
  @property({ type: String }) label?: string;

  /** The name given to the input field. */
  @property({ type: String }) name: string;

  /** The value of the input field. */
  @property({ type: Number, reflect: true }) initialValue: number = 50;

  /** Error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** The minimum value of the slider input field. */
  @property({ type: Number }) min: number = 0;

  /** The maximum value of the slider input field. */
  @property({ type: Number }) max: number = 100;

  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  @property({ type: Number }) stepIncrement?: number;

  /**  Disables the input field. */
  @property({ type: Boolean, reflect: true }) disabled: boolean;

  id = "hidden-slider-input";

  type: InputType = "slider";

  @query("input#hidden-slider-input") hiddenInput!: HTMLInputElement;
  @query("input.contourable-target") input!: HTMLInputElement;

  /**
   * @listens ZetaSliderEvent:change
   */
  private sliderChange = (e: CustomEvent<ZetaSliderEventDetail>) => {
    this.initialValue = e.detail.value;
    this.updateVisibleInputs(this.initialValue);

    this.onValueUpdated();
  };

  /**
   * @fires ZetaSliderEvent:change
   */
  private onValueUpdated() {
    if (this.initialValue != undefined) {
      this.error = this.initialValue < this.min || this.initialValue > this.max || isNaN(this.initialValue);

      if (!this.error) {
        this.updateHiddenInput();
      }
      this.dispatchEvent(new ZetaSliderEvent({ value: this.initialValue }).toEvent());
    }
  }

  private handleInputChange = (e: Event) => {
    this.initialValue = parseInt((e.target as HTMLInputElement).value);

    this.onValueUpdated();
  };

  private updateVisibleInputs(value: number) {
    this.input.value = value.toString();
  }

  private updateHiddenInput() {
    if (this.hiddenInput) {
      this.hiddenInput.value = `${this.initialValue}`;
      this.hiddenInput.dispatchEvent(new Event("input"));
    }
  }

  override handleChange(event: Event): void {
    this.dispatchEvent(new Event(event.type, event));
  }

  protected firstUpdated() {
    this.updateHiddenInput();
  }

  private getLabel() {
    if (this.label) {
      return html`<label for=${this.id}>${this.label}</label>`;
    } else {
      return nothing;
    }
  }

  protected override render() {
    return html`
      ${this.getLabel()}
      <div class="slider-input-container">
        ${super.render()}
        <div class="slider-container">
          <zeta-slider
            stepIncrement=${ifDefined(this.stepIncrement)}
            .rounded=${this.rounded}
            .disabled=${this.disabled}
            value=${ifDefined(this.initialValue)}
            min=${this.min}
            max=${this.max}
            @zeta-slider-change=${this.sliderChange}
          >
          </zeta-slider>
          <div class="range-label-container">
            <p>${this.min}</p>
            <p>${this.max}</p>
          </div>
        </div>
        <input
          aria-label=${this.label ?? "slider input"}
          ?disabled=${this.disabled}
          class="contourable-target"
          type="number"
          min=${this.min}
          max=${this.max}
          name=${ifDefined(this.name)}
          step=${ifDefined(this.stepIncrement)}
          value=${ifDefined(live(this.initialValue))}
          @input=${this.handleInputChange}
        />
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-slider-input-field": ZetaSliderInputField;
  }
}
