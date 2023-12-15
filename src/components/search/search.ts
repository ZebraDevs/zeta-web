/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { customElement, property, query } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import { html, nothing } from "lit";
import styles from "./search.scss";
import { live } from "lit/directives/live.js";

/**
 * Zeta search field component
 * Supports speech recognition search on Chrome
 */
@customElement("zeta-search")
export class ZetaSearch extends ContourableCondensableElement {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };
  constructor() {
    super();
  }
  @query("input") private readonly inputEl!: HTMLElement | null;

  static styles = [styles, super.styles || []];

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  /**
   * Search value
   */
  @property() value = "";
  /**
   * Form action
   */
  @property({ attribute: "form-action" }) formAction: string = "";
  /**
   * Size
   */
  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**
   * Onsubmit callback
   */
  @property({ type: Object, attribute: "on-submit" }) onSubmit?: (query?: string) => void;
  /**
   * Show microphone icon
   */
  @property({ type: Boolean, attribute: "has-icon" }) hasIcon = false;

  private handleInput = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    this.value = target.value;
  };

  private getIconSize = () => {
    switch (this.size) {
      case "small":
        return "16";
      case "large":
        return "24";
      case "medium":
        return "20";
    }
  };

  private getIconColor = () => {
    return this.disabled ? "var(--color-cool-60)" : "var(--color-cool-70)";
  };

  private resetInput = () => {
    this.value = "";
  };

  private handleSpeechRecognition = () => {
    const SpeechRecognition = (<any>window).SpeechRecognition || (<any>window).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const s = new SpeechRecognition();

      s.onspeechend = () => {
        s.stop();
      };

      s.onresult = (e: any) => {
        this.value = e.results[0][0].transcript;
      };

      s.start();
    }
  };

  private renderRightIcon = () => {
    if (("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && this.hasIcon) {
      return html` <div class="divider"></div>
        <zeta-icon @click=${() => this.handleSpeechRecognition()} size=${this.getIconSize()} name="microphone" color="var(--icon-default)"></zeta-icon>`;
    } else {
      return nothing;
    }
  };

  private renderCancelIcon = () => {
    return this.value
      ? html` <zeta-icon color=${this.getIconColor()} size=${this.getIconSize()} @click=${this.resetInput} .rounded=${this.rounded} name="cancel"></zeta-icon> `
      : nothing;
  };

  private handleSubmit = (e: Event) => {
    if (this.onSubmit) {
      e.preventDefault();
      this.onSubmit(this.value);
    }
  };

  protected render() {
    return html`
      <form @submit=${this.handleSubmit} action=${this.formAction}>
        <div class="search-container">
          <zeta-icon size=${this.getIconSize()} color=${this.getIconColor()} .rounded=${this.rounded} name="search"></zeta-icon>
          <input
            @change=${this.handleInput}
            placeholder="Search"
            autocomplete="off"
            spellcheck="false"
            type="search"
            name="q"
            .value=${live(this.value)}
            .disabled=${this.disabled}
          />
          ${this.renderCancelIcon()} ${this.renderRightIcon()}
        </div>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-search": ZetaSearch;
  }
}

