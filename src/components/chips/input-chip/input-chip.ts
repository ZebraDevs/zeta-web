import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./input-chip.styles.js";
import "../../icon/icon.js";
import { BaseChip } from "../base-chips/base-chip.js";

/** Zeta Input Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-2159
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */
@customElement("zeta-input-chip")
export class ZetaInputChip extends BaseChip {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container">
      <slot name="leading"></slot>
      <slot></slot>
      <zeta-icon>close</zeta-icon>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-input-chip": ZetaInputChip;
  }
}
