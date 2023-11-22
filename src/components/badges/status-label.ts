import { html, nothing, svg } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { BadgeStatus } from "../../types.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import  styles  from "./status-label.scss";

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
export class ZetaStatusLabel extends ContourableCondensableElement {
  /** Type of status label.
   *
   * @defaultValue `BannerType.default` */
  @property({ type: String, reflect: true }) status: BadgeStatus = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) text: string | undefined;

  /** Link to slotted icon. */
  @queryAssignedElements({ slot: "icon" }) hasIcon: Array<HTMLElement> | undefined;

  static styles = [super.styles ?? [], styles];

  protected override render() {
    const noIcon = svg`
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 8 8" >
    <circle cx="4" cy="4" r="4" />
    </svg>`;
    return html`
      <div class="container">
        <div class="icon-container">
          ${this.hasIcon == undefined || this.hasIcon.length == 0 ? noIcon : nothing}
          <slot name="icon" @slotchange=${() => this.requestUpdate()}></slot>
        </div>
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

