import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaPageEvent } from "../../events.js";
import { msg } from "@lit/localize";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";

/** Buttons or a dropdown for navigating between pages.
 *
 *  @event {CustomEvent<ZetaPageEventDetail>} pageChange - Fired when page change. Contains a single value in details: `page: number`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4489-1925&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-pagination--docs
 */

@customElement("zeta-pagination")
export class ZetaPagination extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Total number of pages. */
  @property({ type: Number }) totalPages = 10;

  /** Number of pages on both sides of current active page. */
  @property({ type: Number }) siblingCount = 1;

  /**
   * Whether every control and page indicator renders with a visible border.
   *
   * Applies to the whole bar at once; there is no per-control override.
   *
   * @defaultValue false
   */
  @property({ type: Boolean, reflect: true }) outline = false;

  /**
   * Hides the First Page, Chevron Left, Chevron Right and Last Page jump controls as a group,
   * leaving only direct page number navigation.
   *
   * @defaultValue false
   */
  @property({ type: Boolean }) hideControls = false;

  /**
   * Hides the overflow ("...") indicator, so the full range of page numbers is always rendered
   * instead of being collapsed.
   *
   * @defaultValue false
   */
  @property({ type: Boolean }) hideMore = false;

  /** Current active page. */
  @property({ type: Number })
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

  /**
   * @fires ZetaPageEvent:pageChange
   */
  private handlePageChange = (page: number) => {
    this.currentPage = page;
    this.dispatchEvent(new ZetaPageEvent({ page }).toEvent());
  };

  private page = 1;

  private result = () => {
    if (this.hideMore) {
      return this.range(1, this.totalPages);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = this.totalPages;

    // A collapsed layout needs `5 + 2 * siblingCount` slots (pages, siblings, boundary pages and dots).
    // With fewer pages than that, the dots would hide nothing, or range() would run past the ends
    // and duplicate a boundary page, so render the full range instead.
    if (4 + 2 * this.siblingCount >= this.totalPages) {
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
      class=${iconName}
      .disabled=${disabled}
      shape=${this.rounded ? "rounded" : "sharp"}
      @click=${() => this.handlePageChange(pageNumber)}
      flavor=${this.outline ? "outline-subtle" : "subtle"}
      size="small"
    >
      ${iconName}
    </zeta-icon-button>`;
  }

  protected render() {
    const disabledLeftControl = this.currentPage === 1;
    const disabledRightControl = this.currentPage === this.totalPages;
    const result = this.result();

    return html`
      <div class="pagination">
        ${
          !this.hideControls
            ? html`${this.getIconButton("first_page", 1, disabledLeftControl)} ${this.getIconButton("chevron_left", this.currentPage - 1, disabledLeftControl)}`
            : nothing
        }
        ${result.map(page => {
          const pageClass = classMap({
            selected: this.currentPage === page
          });
          if (typeof page === "string") {
            return html`<zeta-icon class="more" role="img" aria-label=${msg("More pages")} size="small">more_horizontal</zeta-icon>`;
          } else {
            return html`
              <button
                type="button"
                aria-current=${this.currentPage === page ? "page" : nothing}
                @click=${() => this.handlePageChange(page)}
                class="page ${pageClass}"
              >
                ${page}
              </button>
            `;
          }
        })}
        ${
          !this.hideControls
            ? html`${this.getIconButton("chevron_right", this.currentPage + 1, disabledRightControl)}
              ${this.getIconButton("last_page", this.totalPages, disabledRightControl)}`
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-pagination": ZetaPagination;
  }
}
