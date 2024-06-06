import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./more-menu.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import "../../icon/icon.js";

@customElement("zeta-more-menu")
export class ZetaMoreMenu extends Contourable(Interactive(LitElement)) {
  /**
   *  More menu icon.
   *
   * Full list of icons can be found at {@link https://zeta-icons.web.app/}.
   */
  @property({ type: String }) icon: ZetaIconName = "more_horizontal";

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
