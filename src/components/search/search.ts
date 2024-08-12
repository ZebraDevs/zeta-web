/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./search.styles.js";
import { live } from "lit/directives/live.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import { msg } from "@lit/localize";
import "../icon/icon.js";

/**
 * Supports speech recognition search on Chrome.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21286-35997
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/search--docs
 */
@customElement("zeta-search")
export class ZetaSearch extends Size(Contourable(Interactive(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: "open"
  };

  @query("input") private readonly inputEl!: HTMLElement | null;
  _round: false | true | "full" = false;

  @property({ type: String, reflect: true })
  get round(): boolean | string {
    return this._round;
  }
  set round(value: boolean | string) {
    const translatedValue: boolean | "full" = `${value}`.toLowerCase() === "true" ? true : `${value}`.toLowerCase() === "full" ? "full" : false;
    this.rounded = !!translatedValue;
    this._round = translatedValue;
  }

  static styles = [styles, super.styles || []];

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  /** Search value. */
  @property() value = "";

  /** Form action. */
  @property() formAction: string = "";

  /** Onsubmit callback. */
  @property({ type: Object }) onSubmit?: (query?: string) => void;

  /** Show microphone icon. */
  @property({ type: Boolean }) hasIcon = false;

  private handleInput = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    this.value = target.value;
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
        <zeta-icon @click=${() => this.handleSpeechRecognition()} .rounded=${this.rounded} class="right">microphone</zeta-icon>`;
    } else {
      return nothing;
    }
  };

  private renderCancelIcon = () => {
    return this.value ? html`<zeta-icon @click=${this.resetInput} .rounded=${this.rounded}>cancel</zeta-icon>` : nothing;
  };

  private handleSubmit = (e: Event) => {
    if (this.onSubmit) {
      e.preventDefault();
      this.onSubmit(this.value);
    }
  };

  protected render() {
    return html`
      <form @submit=${this.handleSubmit} action=${this.formAction} class="contourable-target">
        <zeta-icon .rounded=${this.rounded}>search</zeta-icon>
        <input
          @change=${this.handleInput}
          placeholder=${msg("Search")}
          autocomplete="off"
          spellcheck="false"
          type="search"
          name="q"
          .value=${live(this.value)}
          .disabled=${this.disabled}
        />
        ${this.renderCancelIcon()} ${this.renderRightIcon()}
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-search": ZetaSearch;
  }
}
