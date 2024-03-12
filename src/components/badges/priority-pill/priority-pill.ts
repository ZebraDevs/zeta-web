import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./priority-pill.scss?inline";
import { ContourableElement } from "../../../mixins/contour.js";

/** ZetaPriorityPill web component.
 *
 * This badge is used to indicate the order of importance.
 *
 * Slotted children:
 *    * Number
 *    * Text
 *
 * @public */
@customElement("zeta-priority-pill")
export class ZetaPriorityPill extends ContourableElement {
  /** Text of Priority.
   *
   * Can also be slotted. */
  @property({ type: String }) text: string | undefined;

  /** Number shown at start of component.
   *
   * Can also be slotted. */
  @property({ type: String || Number }) number: string | number | undefined;

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

