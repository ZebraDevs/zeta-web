import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./navigation-bar.styles.js";

export * from "../grid-menu-item/grid-menu-item.js";
//TODO this needs to share a mixin with Pagination or similar (need selected attribute/part, onSelectedChange event)
/**
 * Navigation Bars (Bottom navigation) allow movement between primary destinations in an app.
 *
 * @slot - A collection of 'zeta-grid-menu-item's to be displayed in the navigation bar.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21186-40498
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-bar--docs
 */
@customElement("zeta-navigation-bar")
export class ZetaNavigationBar extends LitElement {
  @property({ type: Boolean, reflect: true }) shrinkItems: boolean = false;

  protected render() {
    return html`<slot></slot>`;
  }

  static styles = [styles, super.styles || []];
  // static styles = [styles ContourableElement.styles || []]; //TODO: Add contourable back, check styles.
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-bar": ZetaNavigationBar;
  }
}
