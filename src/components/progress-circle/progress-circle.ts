import { customElement, property } from "lit/decorators.js";
import { ContourableElement } from "../../mixins/contour.js";
import { html } from "lit";
import styles from "./progress-circle.scss";
import { classMap } from "lit/directives/class-map.js";

/**
 * Progress indicators express an unspecified wait time or display the length of a process.
 */
@customElement("zeta-progress-circle")
export class ZetaProgressCircle extends ContourableElement {
  constructor() {
    super();
  }

  static styles = [super.styles || [], styles];

  /**
   * Size
   */
  @property({ type: Number })
  size: 24 | 36 | 40 | 48 | 64 = 64;
  /**
   * Progress (0-100)
   */
  @property({ type: Number }) get progress() {
    return this.progressValue;
  }
  /**
   * Animated state
   */
  @property({ type: Boolean }) loading = false;

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
    return 2 * 3.14 * (Number(this.size) / 2 - this.strokeWidth);
  };

  private getStrokeDashoffset = () => {
    // circumference × ((100 - progress)/100)
    const offset = this.loading ? 75 : this.progress;
    return `${(this.getStrokeDasharray() * (100 - offset)) / 100}`;
  };

  protected render() {
    const animateClass = classMap({
      loading: this.loading
    });
    return html`
      <svg class=${animateClass} width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" style="transform:rotate(-90deg)">
        <circle
          r=${Number(this.size) / 2 - this.strokeWidth}
          cx=${Number(this.size) / 2}
          cy=${Number(this.size) / 2}
          fill="transparent"
          stroke="#FFF"
          stroke-width="${this.strokeWidth}px"
        ></circle>
        <circle
          r=${Number(this.size) / 2 - this.strokeWidth}
          cx=${Number(this.size) / 2}
          cy=${Number(this.size) / 2}
          stroke="var(--foundation-accent)"
          stroke-linecap=${this.rounded ? "round" : "square"}
          fill="transparent"
          stroke-width="${this.strokeWidth}px"
          stroke-dasharray="${this.getStrokeDasharray()}px"
          stroke-dashoffset="${this.getStrokeDashoffset()}px"
        ></circle>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-progress-circle": ZetaProgressCircle;
  }
}

