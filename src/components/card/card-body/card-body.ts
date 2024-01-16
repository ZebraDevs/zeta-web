import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-body.scss";

/**
 * Used to display the text in a card body.
 *
 * @slot - The content of the card body.
 */
@customElement("zeta-card-body")
export class ZetaCardBody extends LitElement {
  protected render() {
    return html` <div class="card-body"><slot></slot></div> `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-body": ZetaCardBody;
  }
}
