import { customElement } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./navigation-bar.scss?inline";

export * from "./navigation-bar-item/navigation-bar-item.js";
/**
 * Navigation Bars (Bottom navigation) allow movement between primary destinations in an app.
 *
 * @slot - A collection of 'zeta-navigation-bar-item's to be displayed in the navigation bar.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21186-40498
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/navigation-bar--docs
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

  static styles = [styles, super.styles || []];
  // static styles = [styles, ContourableElement.styles || []]; //TODO: Add contourable back, check styles.
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar": ZetaNavigationBar;
  }
}
