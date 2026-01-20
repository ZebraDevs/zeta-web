import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./in-page-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../button/icon-button/icon-button.js";
import { ZetaCloseEvent } from "../../events.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

/** In page banners display an important, succinct message, and may provide actions for users to address. Banners should be displayed at the top of the screen,below a top app bar. Only one banner should be shown at a time.
 *
 * This component represents a banner that can be displayed within a page.
 * It can have a title, body text, and various status options.
 *
 * @slot - The main content of the banner.
 * @slot action - The action buttons.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the close icon is clicked.
 *
 * @cssproperty --banner-border-color - The border color of the banner.
 * @cssproperty --banner-background-color - The background color of the banner.
 * @cssproperty --banner-foreground-color - The foreground color of the banner.
 * @cssproperty --banner-icon-color - The icon color of the banner.
 *
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21156-27071
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-in-page-banner--docs
 */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends Contourable(LitElement) {
  /** Title of the banner, displayed at the top.  */
  @property({ type: String }) title: string = "";

  /** Status of the component. */
  @property({ type: String, reflect: true }) status: "default" | "info" | "positive" | "warning" | "negative" = "default";

  /** Whether the banner can be closed by the user. */
  @property({ type: Boolean }) canClose: boolean = true;

  /** Whether the icon should be displayed. */
  @property({ type: Boolean }) showIcon: boolean = true;

  /** Custom icon to replace default.
   *
   * Default icons are:
   * - positive: check_circle
   * - negative: error
   * - warning: warning
   * - info: info
   * - default: info
   */
  @property({ type: String }) icon?: ZetaIconName;

  close() {
    this.remove();
    this.dispatchEvent(new ZetaCloseEvent().toEvent());
  }
  static styles = [styles, super.styles ?? []];

  private getIcon = () => {
    if (this.icon) {
      return this.icon;
    }
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
      <div class="container">
        ${this.showIcon ? html` <div class="leading"><zeta-icon .rounded=${this.rounded}>${this.getIcon()}</zeta-icon></div>` : nothing}
        <div class="center">
          <div class="header">${this.title && this.title.length > 0 ? html`<div class="title">${this.title}</div>` : nothing}</div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
        <div class="trailing">
          ${this.canClose
            ? html`<zeta-icon-button name="close" flavor="text" size="small" shape=${this.rounded ? "rounded" : "sharp"} @click=${() => this.close()}>
              </zeta-icon-button>`
            : nothing}
        </div>
      </div>
      <div class="footer">
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-in-page-banner": ZetaInPageBanner;
  }
}
