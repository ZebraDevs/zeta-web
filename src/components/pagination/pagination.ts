import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./pagination.scss";
import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

/**
 * Zeta pagination component
 */
@customElement("zeta-pagination")
export class ZetaPagination extends ContourableCondensableElement {
  constructor() {
    super();
  }
  static styles = [super.styles || [], styles];

  /**
   * total number of pages
   */
  @property({ type: Number, attribute: "total-pages" }) totalPages = 10;
  /**
   * current active page
   */
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

  /**
   * number of pages on both sides of current active page
   */
  @property({ type: Number, attribute: "sibling-count" }) siblingCount = 1;

  private range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  private handlePageChange = (page: number) => {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent("page-change", {
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

  protected render() {
    const controlSize = "20";
    const controlColor = "var(--color-cool-90)";
    const disabledControlColor = "var(--color-cool-50)";
    const disabledLeftControl = this.currentPage === 1;
    const disabledRightControl = this.currentPage === this.totalPages;
    const leftControlColor = disabledLeftControl ? disabledControlColor : controlColor;
    const rightControlColor = disabledRightControl ? disabledControlColor : controlColor;
    const result = this.result();

    return html`
      <div class="pagination">
        <button .disabled=${disabledLeftControl} @click=${() => this.handlePageChange(1)} class="pagination-control">
          <zeta-icon color=${leftControlColor} name="first_page" size=${controlSize}></zeta-icon>
        </button>
        <button .disabled=${disabledLeftControl} @click=${() => this.handlePageChange(this.currentPage - 1)} class="pagination-control">
          <zeta-icon color=${leftControlColor} name="chevron_left" size=${controlSize}></zeta-icon>
        </button>
        ${result.map(page => {
          const pageClass = classMap({
            selected: this.currentPage === page
          });
          if (typeof page === "string") {
            return html`<zeta-icon color=${controlColor} size=${controlSize} name="more_horizontal"></zeta-icon>`;
          } else {
            return html` <button @click=${() => this.handlePageChange(page)} class="page ${pageClass}">${page}</button> `;
          }
        })}
        <button .disabled=${disabledRightControl} @click=${() => this.handlePageChange(this.currentPage + 1)} class="pagination-control">
          <zeta-icon color=${rightControlColor} name="chevron_right" size=${controlSize}></zeta-icon>
        </button>
        <button .disabled=${disabledRightControl} @click=${() => this.handlePageChange(this.totalPages)} class="pagination-control">
          <zeta-icon color=${rightControlColor} name="last_page" size=${controlSize}></zeta-icon>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-pagination": ZetaPagination;
  }
}

