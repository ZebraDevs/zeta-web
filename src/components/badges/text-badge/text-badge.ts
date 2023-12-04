import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BadgeStatus } from "../../../types.js";
import { ContourableCondensableElement } from "../../../mixins/condense.js";

/** ZetaTextLabel web component.
 *
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * children:
 *    * Text
 *
 * @public */
@customElement("zeta-text-badge")
export class ZetaTextBadge extends ContourableCondensableElement {
  /** Type of text label.
   *
   * @defaultValue `BannerStatus.default` */
  @property({ type: String, reflect: true }) status: BadgeStatus = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) text: string | undefined;

  protected override render() {
    console.log(this.status);

    return html`
      <div class="container">
        <div class="text">${this.text && this.text}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-text-badge": ZetaTextBadge;
  }
}

