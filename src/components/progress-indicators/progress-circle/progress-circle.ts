import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import styles from "./progress-circle.styles.js";
import "../../icon/icon.js";
import { ZetaCancelUploadEvent } from "../../../events.js";
import { styleMap } from "lit/directives/style-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button is clicked.
 *
 * @cssproperty --progress-circle-color The color of the progress circle.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4416-77&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-progress--docs
 */
@customElement("zeta-progress-circle")
export class ZetaProgressCircle extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Size. */
  @property({ type: Number }) size: 20 | 24 | 36 | 40 | 48 | 64 = 64;

  /** Progress (0-100). */
  @property({ type: Number }) get progress() {
    return this.progressValue;
  }

  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  @property({ type: Boolean, reflect: true }) indeterminate?: boolean;

  /** The type of the progress circle. */
  @property({ type: String }) type: "default" | "upload" = "default";

  /** Hides the unfilled track behind the arc. */
  @property({ type: Boolean, reflect: true, attribute: "hide-track" }) hideTrack?: boolean;

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
  private spin?: Animation;
  private readonly strokeWidth = 4; // matches --stroke-heavy (SVG geometry needs a number)

  private getStrokeDasharray = () => {
    if (this.indeterminate) return 2 * 3.14 * (this.size / 2.5 - this.strokeWidth);
    // circumference = 2 × π × radius
    return 2 * 3.14 * (this.size / 2 - this.strokeWidth);
  };

  private getStrokeDashoffset = () => {
    if (this.indeterminate) return `${(this.getStrokeDasharray() * this.size) / 100}`;
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
            ${this.size > 24 ? html`<span class="percentage"> ${this.progress}% </span>` : nothing}
            <button
              aria-label="Cancel upload"
              @click=${() => {
                this.dispatchEvent(new ZetaCancelUploadEvent().toEvent());
              }}
              style=${styleMap({
                padding: `${this.size / 12}px`
              })}
              class="cancel"
            >
              <zeta-icon>close</zeta-icon>
            </button>
          </div>
        `
      : nothing;
  };

  protected updated(changed: PropertyValues<this>) {
    if (!changed.has("indeterminate")) return;
    this.spin?.cancel();
    this.spin = this.indeterminate
      ? this.animate([{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: 1500, iterations: Infinity })
      : undefined;
  }

  protected render() {
    const r = this.size / 2 - this.strokeWidth;
    const cx = this.size / 2;
    const cy = this.size / 2;
    const trackColor = this.hideTrack ? "transparent" : "var(--border-subtle)";

    return html`
      <div class="container">
        <svg
          width="${this.size}"
          height="${this.size}"
          viewBox="0 0 ${this.size} ${this.size}"
          style="transform:rotate(-90deg)"
          role="progressbar"
          aria-label=${this.type == "upload" ? "Upload progress" : "Progress"}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow=${this.indeterminate ? nothing : this.progress}
        >
          <circle r=${r} cx=${cx} cy=${cy} fill="transparent" stroke="${trackColor}" stroke-width="${this.strokeWidth}px"></circle>
          <circle
            r=${r}
            cx=${cx}
            cy=${cy}
            stroke="var(--progress-circle-color)"
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
