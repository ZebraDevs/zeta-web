import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/**
 * @cssproperty --icon-size the width/height of the icon
 * @cssproperty --icon-color the color of the icon
 * @slot - {ZetaIconName} Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}
 */
@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  protected render() {
    return html`<slot @slotchange=${() => this.requestUpdate()}></slot>`;
  }
  static styles = [styles, super.styles || []];
}
