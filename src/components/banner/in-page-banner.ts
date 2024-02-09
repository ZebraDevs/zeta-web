import { html } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./in-page-banner.scss";
import { BannerStatus } from "../../types.js";
import { ZetaButton } from "../button/button.js";
import "../../index.js";
import { ContourableElement } from "../../mixins/contour.js";

/** Zeta in page banner component.
 *
 * @public */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends ContourableElement {
  /** Title of banner, displayed at top. */
  @property({ type: String }) title: string = "";

  /** Body text of banner. */
  @property({ type: String }) body: string = "";

  /** Status of component.
   *
   * @defaultValue `default`.*/
  @property({ type: String, reflect: true }) status: BannerStatus = "default";

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
          <zeta-icon size="20" .rounded=${this.rounded} color="var(--icon-${this.status})">${this.getIcon()}</zeta-icon>
        </div>
        <div class="trailing">
          <div class="header">
            <div class="title">${this.title}</div>
            <zeta-icon id="close" .rounded=${this.rounded} .onclick=${() => this.remove()}>close </zeta-icon>
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

