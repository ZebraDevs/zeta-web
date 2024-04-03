import { html, LitElement, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tag.scss?inline";
import { Contourable } from "../../../mixins/mixins.js";

@customElement("zeta-tag")
export class ZetaTag extends Contourable(LitElement) {
  /** Text displayed in the tag. */
  @property({ type: String }) text: string = "";

  /** Direction of the tag point.  */
  @property({ type: String, reflect: true }) point: "right" | "left" = "right";

  static styles = [styles, super.styles ?? []];

  protected render() {
    const point = html` <svg class="point" xmlns="http://www.w3.org/2000/svg" width="12" height="28" viewBox="0 0 12 28" fill="none">
      ${this.rounded
        ? svg`<path d="M10.8844 12.6984L0 0V28L10.8844 15.3016C11.5263 14.5526 11.5263 13.4474 10.8844 12.6984Z" />
`
        : svg`<path d="M12 14L0 0V28L12 14Z" />`}
    </svg>`;

    return html`
      <div class="tag" role="text" aria-label=${this.text}>
        <span class="text">${this.text}</span>
        ${point}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tag": ZetaTag;
  }
}

