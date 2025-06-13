import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../../icon/icon.js";
import { Navigate } from "../../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-5&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-breadcrumb--docs
 */
// TODO revisit this component
@customElement("zeta-breadcrumb-item")
export class ZetaBreadcrumbItem extends Navigate(LitElement) {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`
      <a href=${ifDefined(this.href)}>
        <slot name="icon"></slot>
        <span><slot></slot></span>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb-item": ZetaBreadcrumbItem;
  }
}
