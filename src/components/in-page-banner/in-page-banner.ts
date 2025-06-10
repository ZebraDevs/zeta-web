import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./in-page-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import { ZetaCloseEvent } from "../../events.js";

/**
 * Zeta in page banner component.
 *
 * In page banners display an important, succinct message, and may provide actions for users to address. Banners should be displayed at the top of the screen,below a top app bar. Only one banner should be shown at a time.
 *
 * This component represents a banner that can be displayed within a page.
 * It can have a title, body text, and various status options.
 *
 * @slot - The main content of the banner.
 * @slot action - The action buttons.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the close icon is clicked.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21156-27071
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-in-page-banner--docs
 */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends Contourable(LitElement) {
  /**
   * Title of the banner, displayed at the top.
   */
  @property({ type: String }) title: string = "";

  /**
   * Status of the component.
   */
  @property({ type: String, reflect: true }) status: "default" | "info" | "positive" | "warning" | "negative" = "default";

  close() {
    this.remove();
    this.dispatchEvent(new ZetaCloseEvent().toEvent());
  }
  static styles = [styles, super.styles ?? []];

  private getIcon = () => {
    switch (this.status) {
      case "positive":
        return "check_circle";
      case "negative":
        return "error";
      case "default":
        return "info";
      default:
        return this.status;
    }
  };

  protected render() {
    return html`
      <div class="leading"><zeta-icon .rounded=${this.rounded}>${this.getIcon()}</zeta-icon></div>
      <div class="trailing">
        <div class="header">
          <div class="title">${this.title}</div>
          <zeta-icon-button flavor="text" size="small" .rounded=${this.rounded} @click=${() => this.close()}>close</zeta-icon-button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-in-page-banner": ZetaInPageBanner;
  }
}
