import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./list.styles.js";

export * from "./list-item/list-item.js";
/**
 * Lists display lists of list items.
 *
 * @slot - The list items. Should be a collection of `zeta-list-item`s.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-list--docs
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
