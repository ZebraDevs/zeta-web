import { html, LitElement } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./in-page-banner.styles.js";
import { ZetaButton } from "../button/button.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";

/**
 * Zeta in page banner component.
 * 
 * This component represents a banner that can be displayed within a page.
 * It can have a title, body text, and various status options.
 * 
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21156-27071
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/in-page-banner--docs
 */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends Contourable(LitElement) {
  /**
   * Title of the banner, displayed at the top.
   */
  @property({ type: String }) title: string = "";

  /**
   * Body text of the banner.
   */
  @property({ type: String }) body: string = "";

  /**
   * Status of the component.
   */
  @property({ type: String, reflect: true }) status: "default" | "info" | "positive" | "warning" | "negative" = "default";

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

  @queryAssignedElements({ slot: "leading-action", flatten: true }) leadingAction!: Array<Node>;
  @queryAssignedElements({ slot: "trailing-action", flatten: true }) trailingAction!: Array<Node>;

  private styleButtons = () => {
    this.requestUpdate();
    if (this.leadingAction[0] && this.leadingAction[0] instanceof ZetaButton) {
      const s: ZetaButton = this.leadingAction[0];
      s.flavor = "outline-subtle";
      s.rounded = this.rounded;
    }
    if (this.trailingAction[0] && this.trailingAction[0] instanceof ZetaButton) {
      const s: ZetaButton = this.trailingAction[0];
      s.flavor = "outline-subtle";
      s.rounded = this.rounded;
    }
  };

  protected render() {
    this.styleButtons();
    return html`
      <div class="banner">
        <div class="leading">
          <zeta-icon .rounded=${this.rounded}>${this.getIcon()}</zeta-icon>
        </div>
        <div class="trailing">
          <div class="header">
            <div class="title">${this.title}</div>
            <zeta-icon id="close" .rounded=${this.rounded} .onclick=${() => this.remove()}>close</zeta-icon>
          </div>
          <div class="body">${this.body}</div>
          <div class="footer ">
            <slot name="leading-action" @slotchange=${this.styleButtons}></slot>
            <slot name="trailing-action" @slotchange=${this.styleButtons}></slot>
          </div>
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
