import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./list-item.scss";

/**
 * List items are used in lists.
 *
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 */
@customElement("zeta-list-item")
export class ZetaListItem extends LitElement {
  /**
   * The headline text of the list element.
   */
  @property({ type: String }) headline?: string;

  protected render() {
    return html`
      <div class="list-item">
        <div class="leading">
          <slot name="leading"></slot>
          <h1>${this.headline}</h1>
        </div>
        <div class="trailing">
          <slot name="trailing"></slot>
        </div>
      </div>
    `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-list-item": ZetaListItem;
  }
}
