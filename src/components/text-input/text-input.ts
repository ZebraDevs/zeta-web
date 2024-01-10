import { customElement, property, query } from "lit/decorators.js";
import { html, nothing } from "lit";
import { Size } from "../../types.js";
import styles from "./text-input.scss";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import "../../index.js";
import { FocusableContourableCondensableElement } from "../../mixins/focus.js";

/**
 * Text input component with icon, affix, label and hint text
 */
@customElement("zeta-text-input")
export class ZetaTextInput extends FocusableContourableCondensableElement {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };
  static styles = [styles, super.styles ?? []];
  @query("input") private readonly inputEl!: HTMLInputElement | null;
  /**
   * Error state
   */
  @property({ type: Boolean, reflect: true }) error = false;
  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**
   * Size
   */
  @property({ type: String, reflect: true }) size: Size = "medium";
  /**
   * Placeholder
   */
  @property() placeholder = "";
  /**
   * Icon name
   */
  @property({ type: String }) icon?: ZetaIconName;
  /**
   * Icon position
   */
  @property({ attribute: "icon-position" }) iconPosition: "left" | "right" = "left";
  /**
   * Prefix text
   */
  @property({ attribute: "prefix" }) prefixText = "";
  /**
   * Suffix text
   */
  @property() suffix = "";
  /**
   * Label
   */
  @property() label = "";
  /**
   * Hint text
   */
  @property({ attribute: "hint-text" }) hintText = "";

  /**
   * Hint text
   */
  @property({ attribute: "error-text" }) errorText = "";
  /**
   * Is input required
   */
  @property({ type: Boolean }) required = false;
  /**
   * Value
   */
  @property() value = "";
  /**
   * Type of field
   */
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
      "text-area": this.type === "textarea"
    });
    return html`
      <div>
        ${this.renderLabel()}
        <div class=${containerClass}>
          ${this.renderLeftIcon()} ${this.renderPrefix()} ${this.renderField()} ${this.renderRightIcon()} ${this.renderSuffix()}
        </div>
        ${this.error ? this.renderErrorText() : this.renderHintText()}
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

  private renderHintText() {
    return this.hintText
      ? html`
          <div class="hint-text">
            <zeta-icon .rounded=${this.rounded} color=${this.getHintColor()} size="16" name="info"></zeta-icon>
            <span id="hint-text">${this.hintText}</span>
          </div>
        `
      : nothing;
  }

  private renderErrorText() {
    return this.errorText
      ? html`
          <div class="hint-text error">
            <zeta-icon .rounded=${this.rounded} color=${this.getErrorHintColor()} size="16" name="info"></zeta-icon>
            <span id="hint-text">${this.errorText}</span>
          </div>
        `
      : this.renderHintText();
  }

  private renderLeftIcon() {
    return this.iconPosition === "left" && this.icon && this.type === "text" && !this.toggled
      ? html` <zeta-icon class="left" color=${this.getIconColor()} size=${this.getIconSize()} .rounded=${this.rounded} name=${this.icon}></zeta-icon> `
      : nothing;
  }

  private renderRightIcon() {
    return this.iconPosition === "right" && this.icon && this.type === "text" && !this.toggled
      ? html` <zeta-icon class="right" color=${this.getIconColor()} size=${this.getIconSize()} .rounded=${this.rounded} name=${this.icon}></zeta-icon> `
      : this.type === "password" || this.toggled
      ? html`<zeta-icon
          @click=${() => {
            this.toggled = !this.toggled;
            this.type = this.type === "text" ? "password" : "text";
          }}
          class="right"
          color=${this.getIconColor()}
          size=${this.getIconSize()}
          .rounded=${this.rounded}
          name=${this.toggled ? "visibility" : "visibility_off"}
        ></zeta-icon>`
      : this.type === "time"
      ? html`<zeta-icon
          @click=${() => this.inputEl!.showPicker()}
          class="right"
          color=${this.getIconColor()}
          size=${this.getIconSize()}
          .rounded=${this.rounded}
          name="clock_outline"
        ></zeta-icon>`
      : this.type === "date"
      ? html`<zeta-icon
          @click=${() => this.inputEl!.showPicker()}
          class="right"
          color=${this.getIconColor()}
          size=${this.getIconSize()}
          .rounded=${this.rounded}
          name="calendar_3_day"
        ></zeta-icon>`
      : nothing;
  }

  private renderPrefix() {
    return this.prefixText && this.type === "text" && !this.toggled ? html`<span class="left affix">${this.prefixText}</span>` : nothing;
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

  private getIconColor() {
    return this.disabled ? "var(--color-cool-60)" : "var(--color-cool-70)";
  }

  private getHintColor() {
    return this.disabled ? "var(--color-cool-60)" : "var(--color-cool-70)";
  }
  private getErrorHintColor() {
    return this.disabled ? "var(--color-cool-60)" : "var(--color-red-60)";
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
