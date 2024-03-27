import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Alignment, BannerStatus } from "../../types.js";
import styles from "./banner.scss?inline";
import { Contourable } from "../../mixins/contour.js";

// TODO: Update to use zeta-icon

/** Zeta system banner component. */
@customElement("zeta-system-banner")
export class ZetaSystemBanner extends Contourable(LitElement) {
  /** Type of banner.
   *
   * @defaultValue 'default' */
  @property({ type: String, reflect: true }) status: BannerStatus = "default";

  /**
   * Alignment of banner.
   *
   * Only start and center are valid options.
   *
   * @defaultValue `Alignment.start`. */
  @property({ type: String, reflect: true }) align: Alignment = "start";

  /** Text displayed on the banner.
   *
   * Can also be slotted. */
  @property({ type: String }) text: string | undefined;

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

