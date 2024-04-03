import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import { html, LitElement, nothing } from "lit";
import styles from "./progress-circle.scss?inline";
import { classMap } from "lit/directives/class-map.js";

/** Progress indicators express an unspecified wait time or display the length of a process. */
@customElement("zeta-progress-circle")
export class ZetaProgressCircle extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Size. */
  @property({ type: Number }) size: 24 | 36 | 40 | 48 | 64 = 64;

  /** Progress (0-100). */
  @property({ type: Number }) get progress() {
    return this.progressValue;
  }
  /** Animated state. */
  @property({ type: Boolean }) loading = false;

  /** Uploading state. */
  @property({ type: Boolean }) uploading = false;

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
    const size = this.uploading ? 48 : this.size;
    return 2 * 3.14 * (size / 2 - this.strokeWidth);
  };

  private getStrokeDashoffset = () => {
    // circumference × ((100 - progress)/100)
    const offset = this.loading ? 75 : this.progress;
    return `${(this.getStrokeDasharray() * (100 - offset)) / 100}`;
  };

  private renderUploading = () => {
    return this.uploading
      ? html`
          <div class="uploading">
            <span class="percentage"> ${this.progress}% </span>
            <div
              @click=${() => {
                this.dispatchEvent(new CustomEvent("cancel-upload", { bubbles: true, composed: true }));
                this.uploading = false;
              }}
              class="cancel"
            >
              <zeta-icon name="close" size="20" color="var(--color-cool-90)"></zeta-icon>
            </div>
          </div>
        `
      : nothing;
  };

  protected render() {
    const animateClass = classMap({
      loading: this.loading && !this.uploading
    });

    const size = this.uploading ? 48 : this.size;
    const r = size / 2 - this.strokeWidth;
    const cx = size / 2;
    const cy = size / 2;
    const trackColor = this.uploading ? "var(--color-cool-30)" : "transparent";

    return html`
      <div class="container">
        <svg class=${animateClass} width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
          <circle r=${r} cx=${cx} cy=${cy} fill="transparent" stroke="${trackColor}" stroke-width="${this.strokeWidth}px"></circle>
          <circle
            r=${r}
            cx=${cx}
            cy=${cy}
            stroke="var(--icon-flavor-primary)"
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
