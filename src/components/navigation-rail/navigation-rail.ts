import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-rail.styles.js";

/**
 * Navigation rails allow navigation between sections of an app.
 *
 * @slot {zeta-navigation-rail-item[]} - The navigation items.
 */
@customElement("zeta-navigation-rail")
export class ZetaNavigationRail extends Contourable(LitElement) {
  protected render() {
    return html`<slot id="content-slot"> </slot>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-rail": ZetaNavigationRail;
  }
}
