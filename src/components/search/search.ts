/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./search.styles.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField, type InputType } from "../../mixins/form-field.js";

/**
 * Supports speech recognition search on Chrome.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21286-35997
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/search--docs
 *
 * @slot leading - Leading icon
 */
@customElement("zeta-search")
export class ZetaSearch extends FormField(Size(Contourable(Interactive(LitElement)))) {
  type: InputType = "search";

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

  override handleChange(_event: Event): void {
    this.dispatchEvent(new Event(_event.type, _event));
  }

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  /** Show microphone icon. */
  @property({ type: Boolean, reflect: true }) hasIcon = false;

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
      return html` ${this.value ? html`<div class="divider"></div>` : nothing}
        <zeta-icon @click=${() => this.handleSpeechRecognition()} .rounded=${this.rounded} class="right">microphone</zeta-icon>`;
    } else {
      return nothing;
    }
  };

  private renderCancelIcon = () => {
    return this.value ? html`<zeta-icon @click=${this.resetInput} .rounded=${this.rounded}>cancel</zeta-icon>` : nothing;
  };

  protected render() {
    return html`
      <form class="contourable-target">
        <zeta-icon id="search-icon" .rounded=${this.rounded}>search</zeta-icon>
        ${super.render()} ${this.renderCancelIcon()} ${this.renderRightIcon()}
      </form>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-search": ZetaSearch;
  }
}
