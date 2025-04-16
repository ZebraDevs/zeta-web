import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

/**
 * @cssproperty --icon-size the width/height of the icon
 * @cssproperty --icon-color the color of the icon
 * @slot {ZetaIconName} Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}. If this value and the name prop are both populated, the name prop will take precedence.
 */
@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  /** Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
   *
   * If this value and the slot are both populated, this will take precedence.
   */
  @property({ type: String }) name: ZetaIconName;

  protected render() {
    return html`${this.name ?? html`<slot @slotchange=${() => this.requestUpdate()} />`}`;
  }
  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon": ZetaIcon;
  }
}
