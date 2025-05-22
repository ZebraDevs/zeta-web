import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./progress-bar.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process.
 * 
 * @cssproperty --progress-bar-color The color of the progress bar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-22&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/progress--docs
 */
@customElement("zeta-progress-bar")
export class ZetaProgressBar extends Contourable(LitElement) {
  /** The size of the progress indicator. Can either be 'medium' or 'thin'. */
  @property({ type: String, reflect: true }) size: "thin" | "medium" = "medium";

  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;

  /** The % complete of the process indicator. */
  @property({ type: Number }) value: number = 0;

  /** The label for the progress indicator. */
  @property({ type: String }) label?: string;

  /**
   * Displays the buffering dots at the end of the progress indicator.
   *
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
