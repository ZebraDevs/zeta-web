import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-header.scss?inline";

/** ZetaNavigationHeader web component.
 *
 * A header used to display a collection of zeta-navigaiton-items.
 *
 * @slot The navigation items displayed in the header. Should be a list of zeta-navigation-item.
 *
 * @public */
@customElement("zeta-navigation-header")
export class ZetaNavigationHeader extends LitElement {
  protected override render() {
    return html`
      <div class="navigation-header">
        <slot></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-header": ZetaNavigationHeader;
  }
}
