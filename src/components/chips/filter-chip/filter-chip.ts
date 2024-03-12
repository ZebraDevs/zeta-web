import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.scss?inline";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** Zeta Filter Chip web component.
 *
 * @public */
@customElement("zeta-filter-chip")
export class ZetaFilterChip extends ContourableInteractiveElement {
  constructor() {
    super();
    this.text = "Label";
    this.type = "unselected";
  }

  /**
   * Text displayed in the chip
   */
  @property({ type: String }) text: string;

  /** Chips' types.*/
  @property({ type: String, reflect: true }) type: "unselected" | "selected";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    let icon;

    switch (this.type) {
      case "unselected":
        icon = html`<span>${this.text}</span>`;
        break;

      case "selected":
        icon = html`<zeta-icon color=${this.type === "selected" ? "var(--color-cool-90)" : ""} name="check_mark" class="icon" size="20"></zeta-icon>
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

