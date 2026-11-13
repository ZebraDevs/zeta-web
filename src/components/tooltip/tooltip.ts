import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import styles from "./tooltip.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/** Tooltips display informative text when users hover over, focus on, or tap an element.
 *
 * The tooltip only draws the bubble. Showing, hiding and positioning belong to whatever owns the trigger.
 * To float it, add the native `popover` attribute (e.g. `popover="manual"`), call `showPopover()`/`hidePopover()`,
 * and place it with inline `left`/`top` (or CSS anchor positioning). It fades in while sliding toward the trigger,
 * fades out on close, and does not move under `prefers-reduced-motion`.
 *
 * It has `role="tooltip"`. When it only repeats text that is already visible (e.g. a truncated table cell),
 * set `aria-hidden="true"` on it so assistive technology does not announce it twice.
 *
 * @slot - The label. Keep it to a short run of text. An icon (`<zeta-icon>`) is still supported for backwards compatibility.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5508-57
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tooltip--docs
 */
@customElement("zeta-tooltip")
export class ZetaTooltip extends Contourable(LitElement) {
  /**
   * The edge the pointer sits on, which is the edge facing the trigger. `bottom` places the bubble above its trigger,
   * `top` below, `left` to the right and `right` to the left.
   */
  @property({ type: String, reflect: true }) point: "left" | "right" | "top" | "bottom" = "bottom";

  static styles = [super.styles ?? [], styles];

  constructor() {
    super();
    this.attachInternals().role = "tooltip";
  }

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
