import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour";
import { customElement } from "lit/decorators.js";
import styles from "./navigation-rail.styles.js";

/**
 * Navigation rails allow navigation between sections of an app.
 *
 * @slot {zeta-navigation-rail-item[]} - The navigation items.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-43&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/navigation-rail--docs
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
