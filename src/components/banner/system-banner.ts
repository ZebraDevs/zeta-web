import { html, LitElement, nothing } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./system-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../../components/icon/icon.js";

/** 
 * A banner displays an important, succinct message, and provides action for users to address.
 * It draws the attention to the message by displaying it at the top in various colors.
 *
 * @slot - Text displayed on label.
 * @slot {zeta-icon} leadingIcon - Icon at leading side of text.
 * @slot {zeta-icon} trailingIcon - Icon at trailing end of component.
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
   * Can also be slotted with default (unnamed) slot.
   * If both are present, text prop will be displayed and slot will not
   */
  @property({ type: String }) text?: string;

  @queryAssignedElements({ slot: "leadingIcon", flatten: true }) leading?: Array<Node>;
  @queryAssignedElements({ slot: "trailingIcon", flatten: true }) trailing?: Array<Node>;

  static styles = [super.styles || [], styles];

  protected render() {
    const leadingIcon = html`<div class="leading icon ${this.leading && this.leading.length > 0 ? "" : "none"}">
      <slot name="leadingIcon"></slot>
    </div>`;
    const trailingIcon = html`<div class="trailing ${this.trailing && this.trailing.length > 0 ? "" : "none"}">
      <slot name="trailingIcon"></slot>
    </div>`;
    const text = html`<div class="text">${this.text ?? html`<slot></slot>`}</div>`;

    return html`
      <div class="system-banner">
        <div>${this.align == "start" ? [leadingIcon, text] : nothing}</div>
        <div>${this.align != "start" ? [leadingIcon, text] : nothing}</div>
        ${trailingIcon}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-system-banner": ZetaSystemBanner;
  }
}
