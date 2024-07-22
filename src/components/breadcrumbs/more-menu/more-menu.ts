import { customElement, property } from "lit/decorators.js";
import styles from "./more-menu.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import "../../icon/icon.js";
import { ZetaIconButton } from "../../button/icon-button/icon-button.js";

@customElement("zeta-more-menu")
export class ZetaMoreMenu extends ZetaIconButton {
  /**
   *  More menu icon.
   *
   * Full list of icons can be found at {@link https://zeta-icons.web.app/}.
   */
  @property({ type: String })
  set icon(value: ZetaIconName) {
    this._slotContent = value;
  }
  get icon() {
    return this._slotContent || "more_horizontal";
  }
  _slotContent = "more_horizontal";

  static get styles() { return [super.styles || [], styles]; }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-more-menu": ZetaMoreMenu;
  }
}
