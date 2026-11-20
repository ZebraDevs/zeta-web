import { customElement, property } from "lit/decorators.js";
import "../../icon/icon.js";
import { html, nothing } from "lit";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { classMap } from "lit/directives/class-map.js";
import { DraggableChip } from "../base-chips/draggable-chip.js";
import styles from "./assist-chip.styles.js";

/** Chips that are clickable, selectable and draggable.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14215
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 *
 * @slot - The content of the chip.
 *
 * @cssproperty --assist-chip-foreground-color Overrides the label and icon colour. Defaults to the `color` variant's foreground.
 * @cssproperty --assist-chip-background-color Overrides the fill at rest. Defaults to `--interactive-neutral-background-default`.
 * @cssproperty --assist-chip-border-color Overrides the border colour. Defaults to the `color` variant's border.
 */
@customElement("zeta-assist-chip")
export class ZetaAssistChip extends DraggableChip {
  @property({ type: String }) icon?: ZetaIconName;

  /** Colour of the border and label, used to mark a state or a kind of item (e.g. red for PDFs).
   *
   * Values:
   * * neutral - default, no state or kind to mark.
   * * green - success colours.
   * * orange - warning colours.
   * * blue - info colours.
   * * red - error colours.
   */
  @property({ type: String, reflect: true }) color: "neutral" | "green" | "orange" | "blue" | "red" = "neutral";

  static styles = [super.styles || [], styles];

  getIcon() {
    if (this.icon) {
      return html`<zeta-icon>${this.icon}</zeta-icon>`;
    } else {
      return nothing;
    }
  }

  protected override render() {
    return html`<button class=${classMap({ container: true, "interactive-target": true, dragging: this.dragging })} ?disabled=${this.disabled}>
      ${this.getIcon()}<span class="label"><slot></slot></span>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-assist-chip": ZetaAssistChip;
  }
}
