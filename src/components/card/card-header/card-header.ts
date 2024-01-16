import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./card-header.scss";

/**
 * Card headers are used at the top of cards.
 *
 * @element zeta-card-header
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 */
@customElement("zeta-card-header")
export class ZetaCardHeader extends LitElement {
  /**
   * The headline text.
   */
  @property({ type: String }) headline?: string;
  /**
   * The sub headline text.
   */
  @property({ type: String, attribute: "sub-headline" }) subHeadline?: string;

  protected render() {
    return html`<div class="card-header">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}</h1>
          <h2>${this.subHeadline}</h2>
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-header": ZetaCardHeader;
  }
}
