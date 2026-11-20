import { customElement, property, query } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import { msg } from "@lit/localize";
import styles from "./search.styles.js";
import { Interactive, Size } from "../../mixins/mixins.js";
import "../icon/icon.js";
import { FormField, type ZetaInputType } from "../../mixins/form-field.js";
import { ContourableThree } from "../../mixins/contourable-three.js";

//TODO onsubmit

export type SearchFlavor = "default" | "gradient" | "ghost";

/** A text input field for entering search queries.
 *
 * Supports speech recognition search on Chrome.
 *
 * @event {FocusEvent} focus - Fired when the search field is focused
 * @event {FocusEvent} blur - Fired when the search field is blurred
 * @event {Event} change - Fired when the search value changes and is committed
 * @event {Event} submit - Fired when the enter is pressed within the search box
 * @event {InputEvent} input - Fired when the search value changes
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8811
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-search--docs
 *
 * @slot leading - Leading icon
 *
 * @cssproperty --search-border-color - Border color of the field at rest. Defaults to `--interactive-neutral-border-default`.
 * @cssproperty --search-icon-display - CSS `display` of the leading search icon. Set to `none` to hide it.
 */
@customElement("zeta-search")
export class ZetaSearch extends FormField(Size(ContourableThree(Interactive(LitElement)))) {
  override type: Extract<ZetaInputType, "search"> = "search";

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: "open"
  };

  @query("input") private readonly inputEl!: HTMLElement | null;
  _round: false | true | "full" = false;

  override handleChange(_event: Event) {
    return _event;
    // this.dispatchEvent(new ZetaInputChangeEvent().toEvent());
  }

  override focus() {
    this.inputEl?.focus();
  }

  override blur() {
    this.inputEl?.blur();
  }

  /** Show microphone icon. */
  @property({ type: Boolean, reflect: true }) hasIcon = false;

  /**
   * Visual flavor of the field.
   *  - `default`: bordered field on a neutral surface; use inside forms.
   *  - `gradient`: gradient border, for a special interaction highlight such as an AI companion search.
   *  - `ghost`: no visible border at rest, for a field on a surface that already bounds it, such as a header.
   */
  @property({ type: String, reflect: true }) flavor: SearchFlavor = "default";

  /**
   * Hide the focus outline when `flavor` is `ghost`, so the container can show focus instead.
   * The container must then surface focus itself.
   */
  @property({ type: Boolean, reflect: true }) hideFocusOutline = false;

  private resetInput = () => {
    this.value = "";
    this.dispatchEvent(new InputEvent("input", { inputType: "deleteContent" }));
  };

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

  private renderTrailing() {
    const hasMic = ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) && this.hasIcon;
    if (!this.value && !hasMic) return nothing;
    return html`<div class="trailing">
      ${
        this.value
          ? html`<button type="button" aria-label=${msg("Clear search")} @click=${this.resetInput}>
              <zeta-icon .rounded=${this.shape != "sharp"}>cancel</zeta-icon>
            </button>`
          : nothing
      }${this.value && hasMic ? html`<div class="divider"></div>` : nothing}${
        hasMic
          ? html`<button type="button" aria-label=${msg("Voice search")} @click=${() => this.handleSpeechRecognition()}>
              <zeta-icon .rounded=${this.shape != "sharp"} class="right">microphone</zeta-icon>
            </button>`
          : nothing
      }
    </div>`;
  }

  protected render() {
    return html`
      <form
        class="contourable-target"
        @submit=${(e: Event) => {
          e.preventDefault();
          return e;
        }}
      >
        <zeta-icon id="search-icon" .rounded=${this.shape != "sharp"}>search</zeta-icon>
        ${super.render()} ${this.renderTrailing()}
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
