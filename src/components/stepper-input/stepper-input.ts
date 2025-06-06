import { customElement, property, query } from "lit/decorators.js";
import { FormField, type InputType } from "../../mixins/form-field.js";
import { html, LitElement, nothing } from "lit";
import { live } from "lit/directives/live.js";
import styles from "./stepper-input.styles.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";
import { ZetaStepperChangeEvent } from "../../events.js";

//TODO: Disable buttons when at min or max
//TODO: disabled prop changes size of box

/** ZetaStepperInput web component.
 * A stepper input, also called numeric stepper, is a common UI element that allows users to input a number or value simply by clicking the plus and minus buttons.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-9963
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/stepper-input--docs
 */
@customElement("zeta-stepper-input")
export class ZetaStepperInput extends FormField(Contourable(LitElement)) {
  static styles = [super.styles || [], styles];

  @property({ type: Boolean }) disabled: boolean = false; //TODO: Use interactive, check styles beforehand
  @property({ reflect: true }) size: "medium" | "large" = "medium";

  /**
   * Hint text shown below text field.
   *
   * if `error`, then `errorText` is shown instead.
   */
  @property() hintText?: string;

  /** Whether text field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /**
   * Error hint text
   *
   * Shown if `error`, replaces `hintText`.
   */
  @property() errorText?: string;

  type: InputType = "stepper";

  id = "hidden-stepper-input";

  @query("input#hidden-stepper-input") hiddenInput!: HTMLInputElement;

  @query(".input-container input") inputEl!: HTMLInputElement;

  handleChange(event: Event) {
    return event;
  }

  protected firstUpdated() {
    this.value = this.validateValue(this.value);
  }

  private validateValue(value: string): string {
    const valueToNumber = Number(value);
    if (isNaN(valueToNumber) || valueToNumber === undefined) {
      value = "0";
    } else if (this.max && valueToNumber >= this.max) {
      value = this.max.toString();
    } else if (this.min !== undefined && valueToNumber <= this.min) {
      value = this.min.toString();
    } else {
      value = valueToNumber.toString();
    }
    this.value = value;
    this.inputEl.value = value;
    this.hiddenInput.value = value;

    return value;
  }

  protected render() {
    return html`
      ${super.render()}
      <div>
        <div class="container">
          <zeta-icon-button
            .disabled=${this.disabled}
            .rounded=${this.rounded}
            size=${this.size}
            flavor="outline-subtle"
            @click=${() => {
              this.handleChange(new ZetaStepperChangeEvent({ value: this.validateValue((Number(this.value) - 1).toString()) }).toEvent());
            }}
          >
            remove
          </zeta-icon-button>
          <div class="input-container contourable-target">
            <input
              min=${ifDefined(this.min?.toString())}
              max=${ifDefined(this.max?.toString())}
              type="number"
              @change=${(e: Event) => {
                this.handleChange(new ZetaStepperChangeEvent({ value: this.validateValue((e.currentTarget as HTMLInputElement).value) }).toEvent());
              }}
              .value=${live(this.value)}
              .disabled=${this.disabled}
            />
          </div>
          <zeta-icon-button
            .disabled=${this.disabled}
            .rounded=${this.rounded}
            size=${this.size}
            flavor="outline-subtle"
            @click=${() => {
              this.handleChange(new ZetaStepperChangeEvent({ value: this.validateValue((Number(this.value) + 1).toString()) }).toEvent());
            }}
          >
            add
          </zeta-icon-button>
        </div>
        ${this.error || this.hintText
          ? html`<div class="hint-text">
              <zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>
              <span id="hint-text">${this.error ? this.errorText : this.hintText}</span>
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-stepper-input": ZetaStepperInput;
  }
}
