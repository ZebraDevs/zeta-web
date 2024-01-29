import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.scss";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableElement } from "../../mixins/contour.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("zeta-icon")
export class ZetaIcon extends ContourableElement {
  /**The name of the icon. Full list of icons can be found at https://zeta-icons.web.app/. */
  @property({ type: String }) name?: ZetaIconName;

  /** Size of icon as css variable.
   *
   * If a Number is provided, will fallback to px.
   *
   * @defaultValue `24px`. */
  @property({ type: Number || String }) size: string | number = 24;

  /** Color of icon as css variable.
   *
   * @defaultValue `black`. */
  @property({ type: String }) color?: string;

  protected render() {
    const size = typeof this.size === "number" ? this.size + "px" : this.size;

    const styles = styleMap({
      fontSize: size,
      lineHeight: size
    });

    return html` <style>
        :host {
          height: ${size};
          width: ${size};
          color: ${this.color};
        }
      </style>
      <span class="icon ${this.rounded ? "rounded" : "sharp"}" style=${styles}>
        <slot @slotchange=${() => this.requestUpdate()}></slot>
        ${this.name}
      </span>`;
  }

  static styles = [styles];
}
