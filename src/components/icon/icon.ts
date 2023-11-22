import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.scss";
import { ZetaIconName } from "@zebra-fed/zeta-icons/build_files/icon-types.js";
import { ContourableElement } from "../../mixins/contour.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("zeta-icon")
export class ZetaIcon extends ContourableElement {
  /**The name of the icon. Full list of icons can be found at https://zeta-icons.web.app/. */
  @property({ type: String }) name: ZetaIconName | ZetaIconName[] | undefined = undefined;

  /** Size of icon as css variable.
   *
   * If a Number is provided, will fallback to px.
   *
   * @defaultValue `24px`. */
  @property({ type: Number || String }) size: string | number = 24;

  /** Color of icon as css variable.
   *
   * @defaultValue `black`. */
  @property({ type: String }) color: string = "black";

  protected render() {
    const styles = styleMap({
      color: this.color,
      fontSize: typeof this.size === "number" ? this.size + "px" : this.size
    });

    return html` <span class="icon ${this.rounded ? "rounded" : "sharp"}" style=${styles}>
      <slot @slotchange=${() => this.requestUpdate()}></slot>
      ${this.name}
    </span>`;
  }

  static styles = [styles];
}

