import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.scss?inline";
import { Contourable } from "../../../mixins/mixins.js";

/**
 * This badge is used to indicate the order of importance.
 *
 * Slotted children:
 *    * Number
 *    * Text
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-15955
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/badges--docs
 */
@customElement("zeta-priority-pill")
export class ZetaPriorityPill extends Contourable(LitElement) {
  /** Text of Priority.
   *
   * Can also be slotted. */
  @property({ type: String }) text?: string;

  /** Number shown at start of component.
   *
   * Can also be slotted. */
  @property() number?: string | number;

  static styles = [styles, super.styles ?? []];

  protected override render() {
    return html`
      <div class="container">
        <div class="number">${this.number}</div>
        <div class="text">${this.text}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-priority-pill": ZetaPriorityPill;
  }
}
