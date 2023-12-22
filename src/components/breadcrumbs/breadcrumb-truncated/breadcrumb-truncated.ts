import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./breadcrumb-truncated.scss";
import { ContourableCondensableElement } from "../../../mixins/condense.js";

@customElement("zeta-breadcrumb-truncated")
export class ZetaBreadcrumbTruncated extends ContourableCondensableElement {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`
      <div class="truncated-container">
        <zeta-icon name="chevron_right"></zeta-icon>
        <zeta-more-menu></zeta-more-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb-truncated": ZetaBreadcrumbTruncated;
  }
}

