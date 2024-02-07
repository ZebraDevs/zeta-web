import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./progress-bar.scss";
import { ContourableElement } from "../../mixins/contour.js";
import { styleMap } from "lit-html/directives/style-map.js";

export type ProgressBarSize = "thin" | "medium";

/** ZetaProgressBar web component.
 *
 * Progress indicators express an unspecified wait time or display the length of a process.
 *
 * @public */
@customElement("zeta-progress-bar")
export class ZetaProgressBar extends ContourableElement {
  /**
   * The size of the progress indicator. Can either be 'medium' or 'thin'.
   *
   * @defaultValue 'medium'
   */
  @property({ type: String, reflect: true }) size: ProgressBarSize = "medium";
  /**
   * Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored.
   */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;
  /**
   * The % complete of the progess indicator.
   *
   * @defaultValue 0
   */
  @property({ type: Number }) value: number = 0;
  /**
   * The label for the progess indicator.
   */
  @property({ type: String }) label?: string;
  /**
   * Displays the buffering dots at the end of the progress indicator.
   * Setting this will pause the animation if 'indeterminate' is set to true.
   */
  @property({ type: Boolean, reflect: true }) buffering?: boolean;

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
    const barStyle = styleMap({
      width: `${Math.max(0, Math.min(100, this.value))}%`
    });

    return html`<div class="progress-bar">
      ${this.label ? html`<label for="progress-indicator">${this.label}</label>` : nothing}
      <div class="wrapper">
        <div class="track" id="progress=indicator">
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
