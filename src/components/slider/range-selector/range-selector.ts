import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "../slider-input-field/slider-input-field.styles.js";
import { live } from "lit/directives/live.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { type ZetaRangeSliderEventDetail, ZetaRangeSliderEvent } from "../../../events.js";
import "../../text-input/text-input.js";
import "../slider.js";
import { FormField, type InputType } from "../../../mixins/form-field.js";

export type ZetaRangeValues = { min: number; max: number };

/**
 * A ranged input field using a Zeta Slider
 *
 * The "name" is required when in a form.
 *
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=980-16448&m=dev
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/story/components-range-selector--range-slider
 */
@customElement("zeta-range-selector")
export class ZetaRangeSelector extends FormField(Contourable(LitElement)) {
  /** The label displayed above the input. */
  @property({ type: String }) label?: string;

  /** The name given to the input field. This is required when in a form.*/
  @property({ type: String }) name: string;

  /** The initial values of the range selector  */
  @property({ type: Object }) initialValues: ZetaRangeValues = { min: 10, max: 90 };

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

  id = "hidden-range-selector-input";

  type: InputType = "range-selector";

  @query("input#hidden-range-selector-input") hiddenInput!: HTMLInputElement;
  @query(".lower-input") lowerInput!: HTMLInputElement;
  @query(".upper-input") upperInput!: HTMLInputElement;

  /**
   * @listens ZetaRangeSliderEvent:change
   */
  private sliderChange = (e: ZetaRangeSliderEvent<ZetaRangeSliderEventDetail>) => {
    this.initialValues = { min: e.detail.min, max: e.detail.max };
    this.updateVisibleInputs(this.initialValues);

    this.onValueUpdated(true);
  };

  /**
   * @fires ZetaRangeSliderEvent:change
   */
  private onValueUpdated(sliderChange: boolean = false) {
    if (this.initialValues.min != undefined && this.initialValues.max != undefined) {
      this.error = this.isError(this.initialValues);

      if (!this.isError(this.initialValues)) {
        this.updateHiddenInput();
      }
      if (!sliderChange) {
        this.dispatchEvent(new ZetaRangeSliderEvent({ min: this.initialValues.min, max: this.initialValues.max }).toEvent());
      }
    }
  }

  private isError(values: ZetaRangeValues): boolean {
    return values.min < this.min || values.min > this.max || values.max > this.max || values.min > values.max || isNaN(values.min) || isNaN(values.max);
  }

  private handleInputChange(e: Event, isLower: boolean) {
    const target = e.target as HTMLInputElement;
    if (isLower) {
      this.initialValues.min = parseInt(target.value);
    } else {
      this.initialValues.max = parseInt(target.value);
    }
    this.onValueUpdated();
  }

  private updateVisibleInputs(values: ZetaRangeValues) {
    this.lowerInput.value = values.min.toString();
    this.upperInput.value = values.max.toString();
  }

  private updateHiddenInput() {
    if (this.hiddenInput) {
      this.hiddenInput.value = `${this.initialValues.min}-${this.initialValues.max}`;
      this.hiddenInput.dispatchEvent(new Event("input"));
    }
  }

  override handleChange(event: Event) {
    return event;
    // this.dispatchEvent(new Event(event.type, event)); //TODO something dont work here
  }

  protected firstUpdated() {
    this.updateHiddenInput();
  }

  private getLabel() {
    if (this.label) {
      return html`<label for=${this.id} class="range-selector-label">${this.label}</label>`;
    } else {
      return nothing;
    }
  }

  private getInput(isLower: boolean) {
    return html`
      <input
        aria-label=${this.label ?? "slider input"}
        ?disabled=${this.disabled}
        class="contourable-target ${isLower ? "lower-input" : "upper-input"}"
        type="number"
        min=${isLower ? this.min : live(this.initialValues.min.toString())}
        max=${isLower ? live(this.initialValues.max?.toString()) : this.max}
        name=${(ifDefined(this.name), isLower ? "-lower" : "-upper")}
        step=${ifDefined(this.stepIncrement)}
        value=${ifDefined(isLower ? live(this.initialValues.min) : live(this.initialValues.max))}
        @input=${(e: Event) => this.handleInputChange(e, isLower)}
      />
    `;
  }

  protected override render() {
    return html`
      ${this.getLabel()}
      <div class="slider-input-container center">
        ${super.render()} ${this.getInput(true)}
        <div class="slider-container">
          <zeta-slider
            type="range"
            stepIncrement=${ifDefined(this.stepIncrement)}
            .rounded=${this.rounded}
            .disabled=${this.disabled}
            lowerValue=${ifDefined(this.initialValues.min)}
            upperValue=${ifDefined(this.initialValues.max)}
            min=${this.min}
            max=${this.max}
            @change=${this.sliderChange}
          >
          </zeta-slider>
        </div>
        ${this.getInput(false)}
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-range-selector": ZetaRangeSelector;
  }
}
