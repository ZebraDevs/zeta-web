import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Zeta Filter Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14112
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/chips--docs
 */
@customElement("zeta-filter-chip")
export class ZetaFilterChip extends Contourable(Interactive(LitElement)) {
  /** Text displayed in the chip. */
  @property({ type: String }) text: string = "Label";

  /** Chips' types.*/
  @property({ type: String, reflect: true }) type: "unselected" | "selected" = "unselected";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    let icon;

    switch (this.type) {
      case "unselected":
        icon = html`<span>${this.text}</span>`;
        break;

      case "selected":
        icon = html`<zeta-icon class="icon">check_mark</zeta-icon>
          <span>${this.text}</span>`;
        break;

      default:
        break;
    }

    return html`<label for="" class="container"> ${icon} </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-filter-chip": ZetaFilterChip;
  }
}
