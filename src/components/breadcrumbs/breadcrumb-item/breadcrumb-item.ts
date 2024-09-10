import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../../icon/icon.js";
import { Navigate } from "../../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
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
