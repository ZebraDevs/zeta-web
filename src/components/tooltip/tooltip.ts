import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import styles from "./tooltip.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/** Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * @slot - Pass in text or an icon. If using an icon, `<zeta-icon>` is recommended.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21816-222
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tooltip--docs
 */
@customElement("zeta-tooltip")
export class ZetaTooltip extends Contourable(LitElement) {
  /** Position of the tooltip. */
  @property({ type: String, reflect: true }) point: "left" | "right" | "top" | "bottom" = "bottom";

  static styles = [styles, super.styles ?? []];

  protected render() {
    return html`
      <div class="container">
        <slot></slot>
        <svg class="point" xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4" fill="none">
          <path d="${this.rounded ? "M3.29289 3.29289C3.68342 3.68342 4.31658 3.68342 4.70711 3.29289L8 0H0L3.29289 3.29289Z" : "M4 4L8 0H0L4 4Z"}" />
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tooltip": ZetaTooltip;
  }
}
