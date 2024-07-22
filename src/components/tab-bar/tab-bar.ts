import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";

export * from "./tab-item/tab-item.js";

/**
 * A bar used to display a collection of zeta-tab-items.
 * @cssproperty --tab-bar-background-color The background color of the tab-bar.
 * @slot - The tab items displayed in the header. Should be a list of zeta-tab-item.
 */
@customElement("zeta-tab-bar")
export class ZetaTabBar extends LitElement {
  protected override render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tab-bar": ZetaTabBar;
  }
}
