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
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/text-input--docs
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
  @property({ type: String, reflect: true }) type: "text" | "textarea" | "password" | "time" | "date" | "number" = "text";

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
