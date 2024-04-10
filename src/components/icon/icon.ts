import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.css?inline";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable } from "../../mixins/mixins.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("zeta-icon")
export class ZetaIcon extends Contourable(LitElement) {
  /** The name of the icon. Full list of icons can be found at {@link https://zeta-icons.web.app/.} */
  @property({ type: String }) name?: ZetaIconName;

  /**
   * Size of icon as css variable.
   *
   * If a Number is provided, will fallback to px.
   */
  @property() size: string | number = 24;

  /**
   * Color of icon as css variable.
   *
   */
  @property({ type: String }) color?: string;

  protected render() {
    const size = typeof this.size === "number" || /^\d+$/.test(this.size) ? this.size + "px" : this.size;

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
