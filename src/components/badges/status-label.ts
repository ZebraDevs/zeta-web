import { html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BadgeStatus } from "../../types.js";
import styles from "./status-label.scss?inline";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableElement } from "../../mixins/contour.js";

/** ZetaStatusLabel web component.
 *
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * Slotted children:
 *    * Text
 *    * Icon
 *
 * @public */
@customElement("zeta-status-label")
export class ZetaStatusLabel extends ContourableElement {
  /** Type of status label.
   *
   * @defaultValue `BannerType.default` */
  @property({ type: String, reflect: true }) status: BadgeStatus = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) text: string | undefined;

  /** Icon leading the component. @see {ZetaIconName}.
   *
   * @defaultValue `undefined`. This will render an indicator circle.
   */
  @property({ type: String }) icon?: ZetaIconName;
  static styles = [super.styles ?? [], styles];

  protected override render() {
    const icon = this.icon
      ? html`<zeta-icon size="20" color="var(--icon-" + ${this.status} + ")" .rounded=${this.rounded}>${this.icon}</zeta-icon> `
      : svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 8 8" >
    <circle cx="4" cy="4" r="4" />
    </svg>`;
    return html`
      <div class="container">
        <div class="icon-container">${icon}</div>
        <div class="text">${this.text ? this.text : html`<slot class="text" name="text"></slot>`}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-status-label": ZetaStatusLabel;
  }
}

