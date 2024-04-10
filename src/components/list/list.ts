import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./list.scss?inline";

export * from "./list-item/list-item.js";
/**
 * Lists display lists of list items.
 *
 * @slot - The list items. Should be a collection of `zeta-list-item`s.
 */
@customElement("zeta-list")
export class ZetaList extends LitElement {
  /** Adds dividers in between the list items.*/
  @property({ type: Boolean, reflect: true }) divide: boolean = false;

  protected render() {
    return html` <div class="list"><slot></slot></div> `;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-list": ZetaList;
  }
}
