import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement } from "lit/decorators.js";
import styles from "./card.scss?inline";

export * from "./card-body/card-body.js";
export * from "./card-footer/card-footer.js";
export * from "./card-header/card-header.js";

/**
 * Cards are used to display content.
 *
 * @slot - The content of the card.
 */
@customElement("zeta-card")
export class ZetaCard extends Contourable(LitElement) {
  protected render() {
    return html` <div class="card"><slot></slot></div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card": ZetaCard;
  }
}

