import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./text-input.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { classMap } from "lit/directives/class-map.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField } from "../../mixins/form-field.js";

/**
 * Text input component with icon, affix, label and hint text.
 *
 * To change the width of the input field, either wrap it in a div with a fixed width, or you can apply display: block to the input field, and then provide a width.
 *
 * @event {FocusEvent} focus - Fired when the input field is focused
 * @event {FocusEvent} blur - Fired when the input field is blurred
 * @event {Event} change - Fired when the input value changes and is committed
 * @event {InputEvent} input - Fired when the input value changes
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23116-92946
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-text-input--docs
 */
@customElement("zeta-text-input")
export class ZetaTextInput extends FormField(Size(Contourable(Interactive(LitElement)))) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };

  static styles = [styles, super.styles ?? []];

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.internals.role = "input";
    this.role = "input";
  }

  @query("input") private readonly inputEl!: HTMLInputElement;

  /** Whether text field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** Leading icon name. */
  @property({ type: String }) leadingIcon?: ZetaIconName;

  /** Trailing icon name. */
  @property({ type: String }) trailingIcon?: ZetaIconName;

  /** Prefix text. */
  @property({ type: String }) prefix: string = "";

  /** Suffix text. */
  @property({ type: String }) suffix?: string;

  /**
   * Label shown above text field.
   *
   */
  @property() label = "";

  /**
   * Hint text shown below text field.
   *
   * if `error`, then `errorText` is shown instead.
   */
  @property() hintText?: string;

  /**
   * Error hint text
   *
   * Shown if `error`, replaces `hintText`.
   */
  @property() errorText?: string;

  /** Type of field */
  @property({ type: String, reflect: true }) type: "text" | "textarea" | "password" | "time" | "date" | "number" | "integer" = "text";

  private _valueOnLastFocus: string | null = null;

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  override handleChange(_event: Event): void {
    //Ignore Change Events, we calculate this on blur;
    return;
  }

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

  /* INTEGER MODE */
  increment() {
    if (this.type === "integer") {
      this.value = ((parseFloat(this.value) || 0) + 1).toString();
      this.dispatchEvent(new Event("change"));
    }
  }

  decrement() {
    if (this.type === "integer") {
      this.value = ((parseFloat(this.value) || 0) - 1).toString();
      this.dispatchEvent(new Event("change"));
    }
  }

  private _incId: number | null = null;
  private _decId: number | null = null;

  private _startHold(isIncrement: boolean) {
    this._stopHold(isIncrement);
    const fn = isIncrement ? () => this.increment() : () => this.decrement();
    const id = window.setTimeout(() => {
      const intervalId = window.setInterval(fn, 50);
      isIncrement ? (this._incId = intervalId) : (this._decId = intervalId);
    }, 300);
    isIncrement ? (this._incId = id) : (this._decId = id);
  }

  private _stopHold(isIncrement: boolean) {
    const id = isIncrement ? this._incId : this._decId;
    if (id !== null) {
      clearTimeout(id);
      clearInterval(id);
      isIncrement ? (this._incId = null) : (this._decId = null);
    }
  }
  /* INTEGER MODE */
  
  protected render() {
    if (this.label) {
      return html`<label class="container"> ${this.label} ${this.renderInput()} </label>`;
    } else {
      return html`<div class="container">${this.renderInput()}</div>`;
    }
  }

  private renderInput() {
    const containerClass = classMap({
      "input-container": true,
      "interactive-target": true,
      "text-area": this.type === "textarea"
    });
    return html`
      <div class=${containerClass}>${this.renderLeftIcon()} ${this.renderPrefix()} ${super.render()} ${this.renderRightIcon()} ${this.renderSuffix()}</div>
      ${this.error || this.hintText
        ? html`<div class="hint-text">
            <zeta-icon .rounded=${this.rounded}>${this.error ? "error" : "info"}</zeta-icon>
            <span id="hint-text">${this.error ? this.errorText : this.hintText}</span>
          </div> `
        : nothing}
    `;
  }

  private renderLeftIcon() {
    return this.leadingIcon && this.type === "text" && !this.toggled
      ? html`<zeta-icon class="left" .rounded=${this.rounded}>${this.leadingIcon}</zeta-icon> `
      : nothing;
  }

  private renderRightIcon() {
    return this.trailingIcon && this.type === "text" && !this.toggled
      ? html`<zeta-icon class="right" .rounded=${this.rounded}>${this.trailingIcon}</zeta-icon>`
      : this.type === "password" || this.toggled
        ? html`<zeta-icon
            @click=${() => {
              this.toggled = !this.toggled;
              this.type = this.type === "text" ? "password" : "text";
            }}
            class="right"
            .rounded=${this.rounded}
          >
            ${this.toggled ? "visibility" : "visibility_off"}
          </zeta-icon>`
        : this.type === "time" || this.type === "date"
          ? html`<zeta-icon @click=${() => this.inputEl.showPicker()} class="right" .rounded=${this.rounded}
              >${this.type === "time" ? "clock_outline" : "calendar_3_day"}</zeta-icon
            >`
          : this.type === "integer"
            ? html`<div class="arrows-container right">
                <div
                  class="arrow up"
                  @click=${() => this.increment()}
                  @mousedown=${() => this._startHold(true)}
                  @mouseup=${() => this._stopHold(true)}
                  @mouseleave=${() => this._stopHold(true)}
                >
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true">
                    <polygon points="3.5,0 7,5 0,5" />
                  </svg>
                </div>
                <div
                  class="arrow down"
                  @click=${() => this.decrement()}
                  @mousedown=${() => this._startHold(false)}
                  @mouseup=${() => this._stopHold(false)}
                  @mouseleave=${() => this._stopHold(false)}
                >
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none" aria-hidden="true" style="transform: rotate(180deg);">
                    <polygon points="3.5,0 7,5 0,5" />
                  </svg>
                </div>
              </div>`
            : nothing;
  }

  private renderPrefix() {
    return this.prefix && (this.type === "text" || this.type === "number") && !this.toggled ? html`<span class="left affix">${this.prefix}</span>` : nothing;
  }

  private renderSuffix() {
    return this.suffix && (this.type === "text" || this.type === "number") && !this.toggled ? html`<span class="right affix">${this.suffix}</span>` : nothing;
  }

  private toggled = false;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-text-input": ZetaTextInput;
  }
}
