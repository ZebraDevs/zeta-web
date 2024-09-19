import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour";
import { Interactive } from "../../mixins/interactive";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-rail-item.styles.js";
import { Navigate } from "../../mixins/navigate";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * Defines an item in a navigation rail.
 *
 * @slot - The label of the navigation item.
 * @slot {zeta-icon} icon - The icon of the navigation item.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-43&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/navigation-rail--docs
 */
@customElement("zeta-navigation-rail-item")
export class ZetaNavigationRailItem extends Navigate(Contourable(Interactive(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  /**
   * Sets the navigation item as selected.
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  protected render() {
    return html`
      <a class="interactive-target" href=${ifDefined(this.href)}>
        <slot name="icon"></slot>
        <slot></slot>
      </a>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-rail-item": ZetaNavigationRailItem;
  }
}
