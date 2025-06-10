import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-chip.styles.js";
import { Contourable } from "../../../mixins/mixins.js";

/** Zeta Status Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14282
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */
@customElement("zeta-status-chip")
export class ZetaStatusChip extends Contourable(LitElement) {
  /** Text displayed in the chip.  */
  @property({ type: String }) text: string = "";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<label for="" class="container">${this.text}</label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-status-chip": ZetaStatusChip;
  }
}
