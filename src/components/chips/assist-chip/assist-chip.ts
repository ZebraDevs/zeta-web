import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./assist-chip.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

export class BaseChip extends Contourable(LitElement) {
  static override styles = [super.styles || []];

  protected icon: unknown;

  protected renderChipLabel(): unknown {
    return null;
  }

  protected override render() {
    const icon = this.renderChipLabel();

    return html`<label for="" class="container">${icon}</label>`;
  }
}

/** Zeta assist Chip web component.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14215
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/chips--docs
 */
@customElement("zeta-assist-chip")
export class ZetaAssistChip extends BaseChip {
  /** Text displayed in the chip */
  @property({ type: String }) text: string = "Label";

  /** Chips' types.*/
  @property({ type: String, reflect: true }) type: "label-only" | "label-with-icon" = "label-only";

  static styles = [BaseChip.styles ?? [], styles];

  /** Override the method in the subclass */
  protected override renderChipLabel() {
    let icon;

    switch (this.type) {
      case "label-only":
        icon = html`<span>${this.text}</span>`;
        break;

      case "label-with-icon":
        icon = html`<zeta-icon>star</zeta-icon> <span>${this.text}</span>`;
        break;

      default:
        break;
    }

    return icon;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-assist-chip": ZetaAssistChip;
  }
}
