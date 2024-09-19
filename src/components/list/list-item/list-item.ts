import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./list-item.styles.js";

/**
 * List items are used in lists.
 *
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-17&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/list--docs
 */
@customElement("zeta-list-item")
export class ZetaListItem extends LitElement {
  /** The headline text of the list element. */
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
