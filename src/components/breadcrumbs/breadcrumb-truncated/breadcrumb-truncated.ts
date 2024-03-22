import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./breadcrumb-truncated.scss?inline";
import { ContourableElement } from "../../../mixins/contour.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
 */
// TODO revisit this component
@customElement("zeta-breadcrumb-truncated")
export class ZetaBreadcrumbTruncated extends ContourableElement {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`
      <div class="truncated-container">
        <zeta-icon name="chevron_right" .rounded=${this.rounded}></zeta-icon>
        <zeta-more-menu .rounded=${this.rounded}></zeta-more-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb-truncated": ZetaBreadcrumbTruncated;
  }
}

