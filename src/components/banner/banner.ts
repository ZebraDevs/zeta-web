import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./banner.scss?inline";
import { Contourable } from "../../mixins/mixins.js";

// TODO: Update to use zeta-icon

/** A banner displays an important, succinct message, and provides action for users to address. It draws the attention to the message by displaying it at the top in various colors.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22195-43965
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/banner--docs
 */
@customElement("zeta-system-banner")
export class ZetaSystemBanner extends Contourable(LitElement) {
  /** Type of banner.*/
  @property({ type: String, reflect: true }) status: "default" | "positive" | "warning" | "negative" = "default";

  /** Alignment of banner.*/
  @property({ type: String, reflect: true }) align: "start" | "center" = "start";

  /**
   * Text displayed on the banner.
   *
   * Can also be slotted.
   */
  @property({ type: String }) text?: string;

  static styles = [super.styles || [], styles];

  protected render() {
    const leadingIcon = html`<slot name="leading icon" class="leading icon"> </slot>`;
    const text = this.text ? html`<div class="text">${this.text}</div>` : html`<slot name="text"></slot>`;

    return html`
      <div class="system-banner">
        <div>${this.align == "start" ? [leadingIcon, text] : nothing}</div>
        <div>${this.align != "start" ? [leadingIcon, text] : nothing}</div>
        <div><slot name="trailing icon" class="trailing icon"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-system-banner": ZetaSystemBanner;
  }
}
