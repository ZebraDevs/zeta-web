import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { html, LitElement, nothing } from "lit";
import styles from "./progress-circle.styles.js";
import "../../icon/icon.js";
import { ZetaCancelUploadEvent } from "../../../events.js";
import { styleMap } from "lit/directives/style-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 *  @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button is clicked.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-22&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/progress--docs
 */
@customElement("zeta-progress-circle")
export class ZetaProgressCircle extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Size. */
  @property({ type: Number }) size: 24 | 36 | 40 | 48 | 64 = 64;

  /** Progress (0-100). */
  @property({ type: Number }) get progress() {
    return this.progressValue;
  }

  /** The type of the progress circle. */
  @property({ type: String }) type: "default" | "upload" = "default";

  set progress(value: number) {
    if (value <= 0 || !value) {
      this.progressValue = 0;
      return;
    }

    if (value >= 100) {
      this.progressValue = 100;
      return;
    }

    this.progressValue = value;
  }

  private progressValue = 0;
  private readonly strokeWidth = 3;

  private getStrokeDasharray = () => {
    // circumference = 2 × π × radius
    return 2 * 3.14 * (this.size / 2 - this.strokeWidth);
  };

  private getStrokeDashoffset = () => {
    // circumference × ((100 - progress)/100)
    return `${(this.getStrokeDasharray() * (100 - this.progress)) / 100}`;
  };

  private renderUploading = () => {
    return this.type == "upload"
      ? html`
          <div
            class="uploading"
            style=${styleMap({
        width: `${this.size}px`,
        height: `${this.size}px`
      })}
          >
            ${this.size > 24
          ? html`<span
                  class="percentage"
                  style=${styleMap({
            fontSize: `${this.size / 4}px`
          })}
                >
                  ${this.progress}%
                </span>`
          : nothing}
            <div
              @click=${() => {
          this.dispatchEvent(new ZetaCancelUploadEvent().toEvent());
        }}
              style=${styleMap({
          padding: `${this.size / 12}px`
        })}
              class="cancel"
            >
              <zeta-icon size=${this.size / 2}>close</zeta-icon>
            </div>
          </div>
        `
      : nothing;
  };

  protected render() {
    const r = this.size / 2 - this.strokeWidth;
    const cx = this.size / 2;
    const cy = this.size / 2;
    const trackColor = this.type == "upload" ? "var(--main-light)" : "transparent";

    return html`
      <div class="container">
        <svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" style="transform:rotate(-90deg)">
          <circle r=${r} cx=${cx} cy=${cy} fill="transparent" stroke="${trackColor}" stroke-width="${this.strokeWidth}px"></circle>
          <circle
            r=${r}
            cx=${cx}
            cy=${cy}
            stroke="var(--main-primary)"
            stroke-linecap=${this.rounded ? "round" : "square"}
            fill="transparent"
            stroke-width="${this.strokeWidth}px"
            stroke-dasharray="${this.getStrokeDasharray()}px"
            stroke-dashoffset="${this.getStrokeDashoffset()}px"
          ></circle>
        </svg>
        ${this.renderUploading()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-progress-circle": ZetaProgressCircle;
  }
}
