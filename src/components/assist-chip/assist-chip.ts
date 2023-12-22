import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./assist-chip.scss";

export class BaseChip extends ContourableCondensableElement {
  static override styles = [ContourableCondensableElement.styles || []];

  protected icon: unknown;

  protected renderChipLabel(): unknown {
    return null;
  }

  protected override render() {
    const icon = this.renderChipLabel();

    return html`<label for="" class="container" ${this.condensed ? "condensed" : "standard"}>${icon}</label>`;
  }
}

/** Zeta assist Chip web component.
 *
 * @public */
@customElement("zeta-assist-chip")
export class ZetaAssistChip extends BaseChip {
  constructor() {
    super();
    this.text = "Label";
    this.type = "label-only";
  }

  /**
   * Text displayed in the chip
   */
  @property({ type: String }) text: string = "Label";

  /** Chips' types.*/
  @property({ type: String, reflect: true }) type: "label-only" | "label-with-icon";

  static styles = [BaseChip.styles ?? [], styles];

  /** Override the method in the subclass */
  protected override renderChipLabel() {
    let icon;

    switch (this.type) {
      case "label-only":
        icon = html`<span>${this.text}</span>`;
        break;

      case "label-with-icon":
        icon = html`<zeta-icon name="star" size="20"></zeta-icon> <span>${this.text}</span>`;
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

