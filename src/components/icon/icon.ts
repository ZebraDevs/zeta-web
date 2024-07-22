import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";

/**
 * @cssproperty --icon-size the width/height of the icon
 * @cssproperty --icon-color the color of the icon
 * @slot - The name of the icon. Full list of icons can be found at {@link https://zeta-icons.web.app/.}
 */
@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  /**
   * Size of icon as css variable.
   *
   * If a Number is provided, will fallback to px.
   * @deprecated Use the CSS Variable "--icon-size" instead
   */
  @property() size?: string | number;

  /**
   * Color of icon as css value
   * @deprecated Use the CSS Variable "--icon-color" instead
   */
  @property({ type: String }) color?: string;

  protected render() {
    return html`
      <style>:host {
        ${this.size ? `--icon-size: ${this.size}` : nothing};
        ${this.color ? `--icon-color: ${this.color}` : nothing};
      }</style>
      <slot @slotchange=${() => this.requestUpdate()}></slot>`;
  }
  static styles = [styles, super.styles || []];

}
