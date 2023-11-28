import { html } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./in-page-banner.scss";
import { BannerStatus } from "../../types.js";
import { ZetaButton } from "../button/button.js";
import "../../index.js";

/** Zeta in page banner component.
 *
 * @public */
@customElement("zeta-in-page-banner")
export class ZetaInPageBanner extends ContourableCondensableElement {
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

  private getCloseIcon = () => {
    return html`<svg id="close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
      <g clip-path="url(#clip0_1016_14731)">
        <path
          d="M15.2496 4.75834C14.9246 4.43334 14.3996 4.43334 14.0746 4.75834L9.99961 8.82501L5.92461 4.75001C5.59961 4.42501 5.07461 4.42501 4.74961 4.75001C4.42461 5.07501 4.42461 5.60001 4.74961 5.92501L8.82461 10L4.74961 14.075C4.42461 14.4 4.42461 14.925 4.74961 15.25C5.07461 15.575 5.59961 15.575 5.92461 15.25L9.99961 11.175L14.0746 15.25C14.3996 15.575 14.9246 15.575 15.2496 15.25C15.5746 14.925 15.5746 14.4 15.2496 14.075L11.1746 10L15.2496 5.92501C15.5663 5.60834 15.5663 5.07501 15.2496 4.75834Z"
        />
      </g>
    </svg>`;
  };

  @queryAssignedElements({ slot: "leading-action", flatten: true }) leadingAction!: Array<Node>;
  @queryAssignedElements({ slot: "trailing-action", flatten: true }) trailingAction!: Array<Node>;

  private styleButtons = () => {
    this.requestUpdate();
    if (this.leadingAction[0] && this.leadingAction[0] instanceof ZetaButton) {
      const s: ZetaButton = this.leadingAction[0];
      s.flavor = "outline-subtle";
      s.rounded = this.rounded;
      s.condensed = this.condensed;
    }
    if (this.trailingAction[0] && this.trailingAction[0] instanceof ZetaButton) {
      const s: ZetaButton = this.trailingAction[0];
      s.flavor = "outline-subtle";
      s.rounded = this.rounded;
      s.condensed = this.condensed;
    }
  };

  protected render() {
    this.styleButtons();
    return html`
      <div class="banner">
        <div class="leading">
          <zeta-icon size="20" color="var(--icon-${this.status})">${this.getIcon()}</zeta-icon>
        </div>
        <div class="trailing">
          <div class="header">
            <div class="title">${this.title}</div>
            <zeta-icon id="close" .onclick=${() => this.remove()}>close </zeta-icon>
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

