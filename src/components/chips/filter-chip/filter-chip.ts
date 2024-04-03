import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./filter-chip.scss?inline";
import { Contourable, Interactive } from "../../../index.js";

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

