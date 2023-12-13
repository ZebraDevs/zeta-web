import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./input-chip.scss";

/** Zeta Input Chip web component.
 *
 * @public */
@customElement("zeta-input-chip")
export class ZetaInputChip extends ContourableCondensableElement {
  constructor() {
    super();
    this.text = "Label";
    this.type = "label-only";
  }

  /**
   * Text displayed in the chip
   */
  @property({ type: String }) text: string;

  /** Chips' types.*/
  @property({ type: String, reflect: true }) type: "label-only" | "label-with-close-icon" | "label-with-avatar-icon" | "label-with-both-icons";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    let icon;

    switch (this.type) {
      case "label-only":
        icon = html`<span>${this.text}</span>`;
        break;

      case "label-with-close-icon":
        icon = html` <span>${this.text}</span>
          <button onclick=${() => this.handleClose()}"><zeta-icon name="close" size="18"></zeta-icon></button>`;
        break;

      case "label-with-avatar-icon":
        icon = html`<button onclick=${() => this.handleUser()}"><zeta-icon name="user" size="24"></zeta-icon></button> <span>${this.text}</span>`;
        break;

      case "label-with-both-icons":
        icon = html`
          <button onclick=${() => this.handleUser()}"><zeta-icon name="user" size="24"></zeta-icon></button>
          <span>${this.text}</span>
          <button onclick=${() => this.handleClose()}">
            <zeta-icon name="close" size="18"></zeta-icon>
          </button>
        `;
        break;

      default:
        break;
    }

    return html`<label for="" class="container" ${this.condensed ? "condensed" : "standard"}> ${icon} </label>`;
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

