import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./card-footer.styles.js";

/**
 * Used at the bottom of a card. Typically contains button elements.
 *
 * @slot - The content displayed in the footer. Should be one or two 'zeta-button's.
 */
@customElement("zeta-card-footer")
export class ZetaCardFooter extends LitElement {
  protected render() {
    return html`<div class="card-footer"><slot></slot></div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-footer": ZetaCardFooter;
  }
}
