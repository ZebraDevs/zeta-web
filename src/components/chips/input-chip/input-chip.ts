import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./input-chip.scss?inline";
import { Contourable, Interactive } from "../../../index.js";

/** Zeta Input Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-2159
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/chips--docs
 */
@customElement("zeta-input-chip")
export class ZetaInputChip extends Contourable(Interactive(LitElement)) {
  /** Text displayed in the chip. */
  @property({ type: String }) text: string = "Label";

  /** Chips' types. */
  @property({ type: String, reflect: true }) type: "label-only" | "label-with-close-icon" | "label-with-avatar-icon" | "label-with-both-icons" = "label-only";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    let icon;

    switch (this.type) {
      case "label-only":
        icon = html`<span>${this.text}</span>`;
        break;

      case "label-with-close-icon":
        icon = html`<span>${this.text}</span> <button onclick="${() => this.handleClose()}"><zeta-icon name="close" size="18"></zeta-icon></button>`;
        break;

      case "label-with-avatar-icon":
        icon = html`<button onclick="${() => this.handleUser()}"><zeta-icon name="user" size="24"></zeta-icon></button> <span>${this.text}</span>`;
        break;

      case "label-with-both-icons":
        icon = html`
          <button onclick="${() => this.handleUser()}"><zeta-icon name="user" size="24"></zeta-icon></button>
          <span>${this.text}</span>
          <button onclick="${() => this.handleClose()}">
            <zeta-icon name="close" size="18"></zeta-icon>
          </button>
        `;
        break;

      default:
        break;
    }

    return html`<label for="" class="container"> ${icon} </label>`;
  }

  handleClose = () => {
    // To implement
  };
  handleUser = () => {
    // To implement
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-input-chip": ZetaInputChip;
  }
}
