import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-drawer-header.styles.js";

/**
 * The header used on a navigation drawer.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline.
 * @slot trailing - Content placed after the headline.
 * 
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer-header")
export class ZetaNavigationDrawerHeader extends LitElement {
  /** The headline text. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** The sub headline text.*/
  @property({ type: String }) subHeadline?: string;

  /** Shows a divider below the header. */
  @property({ type: Boolean, reflect: true }) divide: boolean = false;

  protected override render() {
    return html`<header class="drawer-header">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}<slot></slot></h1>
          <h2>${this.subHeadline}</h2>
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </header>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-header": ZetaNavigationDrawerHeader;
  }
}
