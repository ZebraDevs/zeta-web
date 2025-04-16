import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./slider-input-field.styles.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../text-input/text-input.js";
import "../slider.js";
import { FormField, type InputType } from "../../../mixins/form-field.js";
import { ZetaSlider } from "../slider.js";

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
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  /** The label displayed above the input. */
  @property({ type: String }) label?: string;

  /** Error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** The minimum value of the slider input field. */
  @property({ type: Number, reflect: true }) min: number = 0;

  /** The maximum value of the slider input field. */
  @property({ type: Number, reflect: true }) max: number = 100;

  @property({ type: String }) value: string = "50";

  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  @property({ type: Number }) stepIncrement?: number;

  /**  Disables the input field. */
  @property({ type: Boolean, reflect: true }) disabled: boolean;

  type: InputType = "slider";

  @query("input.contourable-target") input!: HTMLInputElement;

  update(_changedProperties: PropertyValues) {
    super.update(_changedProperties);
    this.internals.setFormValue(this.value);
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | ZetaSlider;
    const intValue = Number(target.value);
    this.value = intValue.toString();
    this.error = intValue < this.min || intValue > this.max || isNaN(intValue);

    if (target instanceof ZetaSlider) this.internals.setFormValue(this.value);
  }

  private getLabel() {
    if (this.label) return html`<label for=${this.id}>${this.label}</label>`;
    else return nothing;
  }

  protected override render() {
    return html`
      ${this.getLabel()}
      <div class="slider-input-container">
        <div class="slider-container">
          <zeta-slider
            stepIncrement=${ifDefined(this.stepIncrement)}
            .rounded=${this.rounded}
            .disabled=${this.disabled}
            value=${parseInt(this.value)}
            min=${this.min}
            max=${this.max}
            @change=${(e: Event) => this.handleChange(e)}
          >
          </zeta-slider>
          <div class="range-label-container">
            <p>${this.min}</p>
            <p>${this.max}</p>
          </div>
        </div>
        ${super.render()}
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
