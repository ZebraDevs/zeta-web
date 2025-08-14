import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaPageEvent } from "../../events.js";
import "../button/icon-button/icon-button.js";
import "../icon/icon.js";

/** Buttons or a dropdown for navigating between pages.
 *
 *  @event {CustomEvent<ZetaPageEventDetail>} pageChange - Fired when page change. Contains a single value in details: `page: number`.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-24&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-pagination--docs
 */

@customElement("zeta-pagination")
export class ZetaPagination extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Total number of pages. */
  @property({ type: Number }) totalPages = 10;

  /** Number of pages on both sides of current active page. */
  @property({ type: Number }) siblingCount = 1;

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
    // TODO: need to migrate away from icon button, the icon colour and size is now incorrect on the text flavour
    return html`<zeta-icon-button
      class=${iconName}
      .disabled=${disabled}
      .rounded=${this.rounded}
      @click=${() => this.handlePageChange(pageNumber)}
      flavor="text"
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
        ${this.getIconButton("first_page", 1, disabledLeftControl)} ${this.getIconButton("chevron_left", this.currentPage - 1, disabledLeftControl)}
        ${result.map(page => {
          const pageClass = classMap({
            selected: this.currentPage === page
          });
          if (typeof page === "string") {
            return html`<zeta-icon class="more">more_horizontal</zeta-icon>`;
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
