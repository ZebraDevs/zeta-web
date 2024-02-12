import { customElement } from "lit/decorators.js";
import { ContourableElement } from "../../mixins/contour.js";
import { LitElement, html } from "lit";
import styles from "./navigation-bar.scss?inline";

/**
 * Navigation Bars (Bottom navigation) allow movement between primary destinations in an app.
 *
 * @slot - A collection of 'zeta-navigation-bar-item's to be displayed in the navigation bar.
 */
@customElement("zeta-navigation-bar")
export class ZetaNavigationBar extends LitElement {
  protected render() {
    return html`
      <div class="nav-bar">
        <slot></slot>
      </div>
    `;
  }

  static styles = [styles, ContourableElement.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar": ZetaNavigationBar;
  }
}
