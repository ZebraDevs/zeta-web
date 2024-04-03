import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./label.scss?inline";
import { Contourable } from "../../../mixins/mixins.js";

/**
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * children:
 *    * Text
 */
@customElement("zeta-label")
export class ZetaLabel extends Contourable(LitElement) {
  /** Type of text label.
   *
   * @defaultValue `BannerStatus.default` */
  @property({ type: String, reflect: true }) status: "info" | "positive" | "warning" | "negative" | "neutral" = "neutral";

  /** Text displayed on label.
   *
   * Can also be slotted. */
  @property({ type: String }) text?: string;

  static styles = [styles, super.styles ?? []];

  protected override render() {
    return html`
      <div class="container">
        <div class="text">${this.text && this.text}<slot></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-label": ZetaLabel;
  }
}

