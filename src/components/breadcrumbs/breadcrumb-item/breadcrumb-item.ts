import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../../icon/icon.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
 */
// TODO revisit this component
@customElement("zeta-breadcrumb-item")
export class ZetaBreadcrumbItem extends LitElement {
  static styles = [super.styles ?? [], styles];

  /**
   * The href attribute specifies the URL of the page the breadcrumb item navigates to when clicked.
   */
  @property({ type: String }) href = "";

  protected override render() {
    return html`
      <a href=${this.href}>
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
