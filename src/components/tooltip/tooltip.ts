import { customElement, property } from "lit/decorators.js";
import { html, svg } from "lit";
import styles from "./tooltip.scss?inline";
import { ContourableElement } from "../../mixins/contour.js";

/**
 * Tooltips display informative text when users hover over, focus on, or tap an element.
 */
@customElement("zeta-tooltip")
export class ZetaTooltip extends ContourableElement {
  constructor() {
    super();
  }

  /**
   * Position of the tooltip
   */
  @property({ type: String, reflect: true }) point: "left" | "right" | "top" | "bottom" = "bottom";
  /**
   * Text content of the tooltip
   */
  @property({ type: String }) label: string | undefined;

  static styles = [styles, super.styles ?? []];

  protected render() {
    // default is bottom point
    const point = html` <svg class="point" xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none">
      ${this.rounded
        ? svg`<path d="M3.29289 3.29289C3.68342 3.68342 4.31658 3.68342 4.70711 3.29289L8 0H0L3.29289 3.29289Z" />
`
        : svg`<path d="M4 4L8 0H0L4 4Z" />
`}
    </svg>`;

    return html`
      <div class="container">
        <span class="label">${this.label}</span>
        ${point}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tooltip": ZetaTooltip;
  }
}

