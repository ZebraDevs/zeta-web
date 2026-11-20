import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./progress-bar.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * @slot details - Supporting content at the trailing end of the label row.
 *
 * @cssproperty --progress-bar-color The color of the progress bar.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4275-1997&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-progress--docs
 */
@customElement("zeta-progress-bar")
export class ZetaProgressBar extends Contourable(LitElement) {
  /**
   * The size of the progress indicator. Can either be 'small' or 'large'.
   *
   * Deprecated: 'thin' and 'medium' are aliases for 'small' and 'large' respectively; use 'small' or 'large' instead.
   */
  @property({ type: String, reflect: true }) size: "small" | "large" | "thin" | "medium" = "large";

  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;

  /**
   * The % complete of the process indicator.
   * Input a floating point number to represent a percentage. Values must be between 0.0-1.0.
   * If maxValue is set, value can be any number between 0 and maxValue.
   */
  @property({ type: Number }) value: number = 0;

  /** If maxValue is null treat value as a percentage */
  @property({ type: Number }) maxValue?: number;

  /** The label for the progress indicator. */
  @property({ type: String }) label?: string;

  /**
   * Displays the buffering dots at the end of the progress indicator.
   *
   * Setting this will pause the animation if 'indeterminate' is set to true.
   */
  @property({ type: Boolean, reflect: true }) buffering?: boolean;

  /** Hides the unfilled track behind the indicator. */
  @property({ type: Boolean, reflect: true, attribute: "hide-track" }) hideTrack?: boolean;

  @state() private hasDetails = false;

  private getBufferingDots() {
    if (this.buffering) {
      return html`
        <div class="buffering-dot"></div>
        <div class="buffering-dot"></div>
        <div class="buffering-dot"></div>
      `;
    } else {
      return nothing;
    }
  }

  protected override render() {
    const percent = Math.max(0, Math.min(100, this.maxValue ? (this.value / this.maxValue) * 100 : this.value * 100));
    const barStyle = styleMap({ width: `${percent}%` });

    return html`<div class="progress-bar">
      <div class="details" ?hidden=${!this.label && !this.hasDetails}>
        ${this.label ? html`<label id="label">${this.label}</label>` : nothing}
        <slot name="details" @slotchange=${(e: Event) => (this.hasDetails = (e.target as HTMLSlotElement).assignedNodes().length > 0)}></slot>
      </div>
      <div class="wrapper">
        <div
          class="track"
          role="progressbar"
          aria-labelledby=${this.label ? "label" : nothing}
          aria-label=${this.label ? nothing : "Progress"}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this.indeterminate ? nothing : Math.round(percent)}
        >
          <div class="bar" style=${!this.indeterminate ? barStyle : nothing}></div>
        </div>
        ${this.getBufferingDots()}
      </div>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-progress-bar": ZetaProgressBar;
  }
}
