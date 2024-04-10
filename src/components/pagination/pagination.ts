import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.scss?inline";
import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import "../button/icon-button/icon-button.js";
import { Contourable } from "../../mixins/mixins.js";

export interface ZetaPageEvent {
  page: number;
}

/**
 * Pagination needs a description.
 *
 *  @event {CustomEvent<zeta-page-change>} zeta-page-change - Fired when page change. Contains a single value in details: `page: number`.
 */

@customElement("zeta-pagination")
export class ZetaPagination extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Total number of pages. */
  @property({ type: Number, attribute: "total-pages" }) totalPages = 10;

  /** Number of pages on both sides of current active page. */
  @property({ type: Number, attribute: "sibling-count" }) siblingCount = 1;

  /** Current active page. */
  @property({ type: Number, attribute: "current-page" })
  get currentPage() {
    return this.page;
  }

  set currentPage(page: number) {
    if (page >= this.totalPages) {
      this.page = this.totalPages;
    } else if (page <= 1) {
      this.page = 1;
    } else {
      this.page = page;
    }
  }

  private range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  private handlePageChange = (page: number) => {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent<ZetaPageEvent>("zeta-page-change", {
        bubbles: true,
        composed: true,
        detail: {
          page: page
        }
      })
    );
  };

  private page = 1;

  private result = () => {
    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = this.totalPages;

    if (this.siblingCount + 5 >= this.totalPages) {
      return this.range(1, this.totalPages);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * this.siblingCount;
      const leftRange = this.range(1, leftItemCount);
      return [...leftRange, "dots", this.totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * this.siblingCount;
      const rightRange = this.range(this.totalPages - rightItemCount + 1, this.totalPages);
      return [firstPageIndex, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }

    return this.range(1, this.totalPages);
  };

  getIconButton(iconName: string, pageNumber: number, disabled: boolean) {
    return html`<zeta-icon-button
      .disabled=${disabled}
      .rounded=${this.rounded}
      @click=${() => this.handlePageChange(pageNumber)}
      flavor="text"
      iconname=${iconName}
      size="small"
    >
    </zeta-icon-button>`;
  }

  protected render() {
    const disabledLeftControl = this.currentPage === 1;
    const disabledRightControl = this.currentPage === this.totalPages;
    const result = this.result();

    return html`
      <div class="pagination">
        ${this.getIconButton("first_page", 1, disabledLeftControl)} ${this.getIconButton("chevron_left", this.currentPage - 1, disabledLeftControl)}
        ${result.map(page => {
          const pageClass = classMap({
            selected: this.currentPage === page
          });
          if (typeof page === "string") {
            return html`<zeta-icon color="var(--color-cool-90)" size="20" name="more_horizontal"></zeta-icon>`;
          } else {
            return html` <button @click=${() => this.handlePageChange(page)} class="page ${pageClass}">${page}</button> `;
          }
        })}
        ${this.getIconButton("chevron_right", this.currentPage + 1, disabledRightControl)}
        ${this.getIconButton("last_page", this.totalPages, disabledRightControl)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-pagination": ZetaPagination;
  }
}
