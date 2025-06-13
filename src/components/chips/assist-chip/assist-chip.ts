import { customElement, property } from "lit/decorators.js";
import "../../icon/icon.js";
import { html, nothing } from "lit";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { BaseChip } from "../base-chips/base-chip.js";

/** Zeta assist Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14215
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 *
 * @slot - The content of the chip.
 */
@customElement("zeta-assist-chip")
export class ZetaAssistChip extends BaseChip {
  @property({ type: String }) icon?: ZetaIconName;

  static styles = [super.styles || []];

  getIcon() {
    if (this.icon) {
      return html`<zeta-icon size="18">${this.icon}</zeta-icon>`;
    } else {
      return nothing;
    }
  }

  protected override render() {
    return html` <button class="container interactive-target">${this.getIcon()}<slot></slot></button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-assist-chip": ZetaAssistChip;
  }
}
