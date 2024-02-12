import { html } from "lit";
import { ContourableElement } from "../../mixins/contour.js";
import { customElement } from "lit/decorators.js";
import styles from "./card.scss?inline";

/**
 * Cards are used to display content. //TODO update this
 *
 * @slot - The content of the card.
 */
@customElement("zeta-card")
export class ZetaCard extends ContourableElement {
  protected render() {
    return html` <div class="card"><slot></slot></div>`;
  }

  static styles = [styles, ContourableElement.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card": ZetaCard;
  }
}
