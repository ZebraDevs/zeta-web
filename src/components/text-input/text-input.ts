import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./text-input.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";

/**
 * Text input component with icon, affix, label and hint text
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23116-92946
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/text-input--docs
 */
@customElement("zeta-text-input")
export class ZetaTextInput extends Size(Contourable(Interactive(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };

  static styles = [styles, super.styles ?? []];

  @query("input") private readonly inputEl!: HTMLInputElement | null;

  /** Whether text field is in error state. */
  @property({ type: Boolean, reflect: true }) error = false;

  /** Placeholder text shown when value is empty. */
  @property({ type: String }) placeholder = "";

  /** Leading icon name. */
  @property({ type: String }) leadingIcon?: ZetaIconName;

  /** Trailing icon name. */
  @property({ type: String }) trailingIcon?: ZetaIconName;

  /** Prefix text. */
  @property({ type: String }) prefix = "";

  /** Suffix text. */
  @property({ type: String }) suffix = "";

  /** Label displayed above text field. */
  @property({ type: String }) label = "";

  /**
   * Hint text shown below text field.
   *
   * if `error`, then `errorText` is shown instead.
   */
  @property() hintText = "";

  /**
   * Error hint text
   *
   * Shown if `error`, replaces `hintText`.
   */
  @property() errorText = "";

  /** Whether input is required. */
  @property({ type: Boolean }) required = false;

  /** Value  */
  @property() value = "";

  /** Type of field */
  @property() type: "text" | "textarea" | "password" | "time" | "date" = "text";

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  protected render() {
    const containerClass = classMap({
      "input-container": true,
      "interactive-target": true,
      "text-area": this.type === "textarea"
    });
    return html`
      <div>
        ${this.renderLabel()}
        <div class=${containerClass}>
          ${this.renderLeftIcon()} ${this.renderPrefix()} ${this.renderField()} ${this.renderRightIcon()} ${this.renderSuffix()}
        </div>
        ${this.error || this.hintText
          ? html`<div class="hint-text">
              <zeta-icon .rounded=${this.rounded} size="16" name=${this.error ? "error" : "info"}></zeta-icon>
              <span id="hint-text">${this.error ? this.errorText : this.hintText}</span>
            </div> `
          : nothing}
      </div>
    `;
  }

  private renderLabel() {
    const labelClass = classMap({
      label: true,
      required: this.required
    });
    return this.label ? html` <label for="text-input" class=${labelClass}>${this.label}</label> ` : nothing;
  }

  private renderLeftIcon() {
    return this.leadingIcon && this.type === "text" && !this.toggled
      ? html` <zeta-icon class="left subtle" size=${this.getIconSize()} .rounded=${this.rounded} name=${this.leadingIcon}></zeta-icon> `
      : nothing;
  }

  private renderRightIcon() {
    return this.trailingIcon && this.type === "text" && !this.toggled
      ? html` <zeta-icon class="right subtle" size=${this.getIconSize()} .rounded=${this.rounded} name=${this.trailingIcon}></zeta-icon> `
      : this.type === "password" || this.toggled
        ? html`<zeta-icon
            @click=${() => {
              this.toggled = !this.toggled;
              this.type = this.type === "text" ? "password" : "text";
            }}
            class="right"
            size=${this.getIconSize()}
            .rounded=${this.rounded}
            name=${this.toggled ? "visibility" : "visibility_off"}
          ></zeta-icon>`
        : this.type === "time"
          ? html`<zeta-icon
              @click=${() => this.inputEl!.showPicker()}
              class="right"
              color="var(--icon-default)"
              size=${this.getIconSize()}
              .rounded=${this.rounded}
              name="clock_outline"
            ></zeta-icon>`
          : this.type === "date"
            ? html`<zeta-icon
                @click=${() => this.inputEl!.showPicker()}
                class="right"
                size=${this.getIconSize()}
                .rounded=${this.rounded}
                name="calendar_3_day"
              ></zeta-icon>`
            : nothing;
  }

  private renderPrefix() {
    return this.prefix && this.type === "text" && !this.toggled ? html`<span class="left affix">${this.prefix}</span>` : nothing;
  }

  private renderSuffix() {
    return this.suffix && this.type === "text" && !this.toggled ? html`<span class="right affix">${this.suffix}</span>` : nothing;
  }

  private handleInput = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    this.value = target.value;
  };

  private getIconSize() {
    return this.size === "small" ? "16" : "20";
  }

  private getPlaceholder() {
    return this.type === "password" ? "Password" : this.placeholder;
  }

  private renderField() {
    return this.type === "textarea"
      ? html` <textarea
          @change=${this.handleInput}
          id=${this.id}
          aria-describedby="hint-text"
          aria-label="text input"
          .value=${live(this.value)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          autocomplete="off"
          spellcheck="false"
        ></textarea>`
      : html`
          <input
            id=${this.id}
            @change=${this.handleInput}
            aria-describedby="hint-text"
            aria-label="text input"
            .value=${live(this.value)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            placeholder=${this.getPlaceholder()}
            autocomplete="off"
            spellcheck="false"
            type=${this.type}
          />
        `;
  }

  private toggled = false;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-text-input": ZetaTextInput;
  }
}
