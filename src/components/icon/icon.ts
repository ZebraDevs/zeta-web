import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";

/**
 *
 * The Zeta icon component has first class integration with the Zeta icon library.
 * To see the built in icons, please visit [Zeta Icons](https://design.zebra.com/icons).
 * These icons can be rendered as rounded or sharp; and the size and color can be customized using CSS variables.
 *
 * To use this component, you can either use the `name` prop or place an icon in the slot.
 * Using the name prop allows for better typescript integration, whereas using the slot allows for more flexibility in terms of custom icons.
 *
 * ```html
 * <zeta-icon name="home"></zeta-icon>
 * ```
 * or
 * ```html
 * <zeta-icon>home</zeta-icon>
 * ```
 *
 *
 * Custom icons can be created by placing an SVG in the slot:
 *
 * ```html
 * <zeta-icon>
 *   <svg>
 *   ...
 *   </svg>
 * </zeta-icon>
 * ```
 *
 * @cssproperty --icon-size The width/height of the icon
 * @cssproperty --icon-color The color of the icon
 * @slot {ZetaIconName} - Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}. If this value and the name prop are both populated, the name prop will take precedence.
 */
@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  /** Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
   *
   * If this value and the slot are both populated, this will take precedence.
   */
  @property({ type: String }) name: ZetaIconName;

  protected render() {
    return html`${this.name ?? html`<slot @slotchange=${() => this.requestUpdate()}></slot>`}`;
  }
  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon": ZetaIcon;
  }
}
