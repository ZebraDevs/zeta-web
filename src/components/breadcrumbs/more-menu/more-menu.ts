import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./more-menu.scss?inline";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** Zeta Breadcrumbs- More menu.
 *
 * @public
 */

@customElement("zeta-more-menu")
export class ZetaMoreMenu extends ContourableInteractiveElement {
  /** More menu icon.*/
  @property({ type: String }) icon = "more_horizontal";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`
      <button class="container" ?disabled=${this.disabled} .onclick=${() => this.handleOpen()}>
        <zeta-icon size="16" color=${this.disabled ? "var(--color-cool-50)" : "var(--color-cool-90)"} class="icon"> ${this.icon}</zeta-icon>
      </button>
    `;
  }
  handleOpen() {
    //To implement
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-more-menu": ZetaMoreMenu;
  }
}

