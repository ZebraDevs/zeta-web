import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./breadcrumb-truncated.scss?inline";
import { Contourable } from "../../../mixins/mixins.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
 */
// TODO revisit this component
@customElement("zeta-breadcrumb-truncated")
export class ZetaBreadcrumbTruncated extends Contourable(LitElement) {
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
