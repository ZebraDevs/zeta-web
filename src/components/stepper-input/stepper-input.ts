import { customElement, property, query } from "lit/decorators.js";
import { FormField, type InputType } from "../../mixins/form-field.js";
import { html, LitElement, nothing } from "lit";
import styles from "./stepper-input.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";

//TODO: Disable buttons when at min or max
//TODO: disabled prop changes size of box

/** ZetaStepperInput web component.
 * A stepper input, also called numeric stepper, is a common UI element that allows users to input a number or value simply by clicking the plus and minus buttons.
 *
 * @event {Event} change - Fired when the value of the stepper input changes.
 * @event {FocusEvent} focus - Fired when the stepper input receives focus.
 * @event {FocusEvent} blur - Fired when the stepper input loses focus.
 * @event {InputEvent} input - Fired when the value of the stepper input changes.
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21529-9963
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper-input--docs
 */
@customElement("zeta-stepper-input")
export class ZetaStepperInput extends FormField(Contourable(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };

  static styles = [super.styles || [], styles];

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.internals.role = "input";
    this.role = "input";
  }

  @query("input") private readonly inputEl!: HTMLInputElement;

  private _valueOnLastFocus: string | null = null;

  override handleFocus(_event: FocusEvent): void {
    super.handleFocus(_event);
    this._valueOnLastFocus = this.value;
  }

  override handleBlur(_event: FocusEvent): void {
    super.handleBlur(_event);
    //Fire the onChange event if and only if the value has changed
    if (this._valueOnLastFocus !== this.value) {
      this.dispatchEvent(new Event("change"));
      this._valueOnLastFocus = null;
    }
  }

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

  handleChange(_event: Event) {
    this.value = this.validateValue(this.value);
    return;
  }

  protected firstUpdated() {
    this.value = this.validateValue(this.value);
  }

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
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
    return value;
  }

  protected render() {
    return html`
      <div>
        <div class="container">
          <zeta-icon-button
            .disabled=${this.disabled || (this.min !== undefined && Number(this.value) <= this.min)}
            .rounded=${this.rounded}
            size=${this.size}
            flavor="outline-subtle"
            @blur=${(e: FocusEvent) => this.handleBlur(e)}
            @focus=${(e: FocusEvent) => this.handleFocus(e)}
            @click=${() => {
              this.value = this.validateValue((Number(this.value) - 1).toString());
            }}
          >
            remove
          </zeta-icon-button>
          <div class="input-container contourable-target">${super.render()}</div>
          <zeta-icon-button
            .disabled=${this.disabled || (this.max !== undefined && Number(this.value) >= this.max)}
            .rounded=${this.rounded}
            size=${this.size}
            @blur=${(e: FocusEvent) => this.handleBlur(e)}
            @focus=${(e: FocusEvent) => this.handleFocus(e)}
            flavor="outline-subtle"
            @click=${() => {
              this.value = this.validateValue((Number(this.value) + 1).toString());
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
