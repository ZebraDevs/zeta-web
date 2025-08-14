import { html, LitElement, svg } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./tag.styles.js";
import { Contourable } from "../../../mixins/mixins.js";
import { makeIntegerWidth } from "../../../utils/utils.js";
import { ifDefined } from "lit/directives/if-defined.js";

/** Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.
 *
 * @slot - The text to display in the tag.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-13170
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */
@customElement("zeta-tag")
export class ZetaTag extends Contourable(LitElement) {
  /** Text displayed in the tag.
   *
   * Currently, it is best to use this property instead of the slot, as the slot does not provide an aria label.
   */
  @property({ type: String }) label?: string;

  /** Direction of the tag point.  */
  @property({ type: String, reflect: true }) direction: "right" | "left" = "right";

  @query(".text") textSpan!: HTMLElement;

  static styles = [styles, super.styles ?? []];

  protected render() {
    const point = html` <svg class="point" xmlns="http://www.w3.org/2000/svg" width="12" height="32" viewBox="0 0 12 32" fill="none">
      ${this.rounded ? svg`<path d="M11.1 14.8 0 0v32l11.1-14.8a2 2 0 0 0 0-2.4Z"/>` : svg`<path d="M12 16L0 0V32L12 16Z" />`}
    </svg>`;

    return html`
      <div class="tag" role="note" aria-label=${ifDefined(this.label)}>
        <span class="text">${this.label ?? html`<slot></slot>`}</span>
        ${point}
      </div>
    `;
  }

  protected updated() {
    if (this.textSpan) {
      makeIntegerWidth(this.textSpan);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tag": ZetaTag;
  }
}
