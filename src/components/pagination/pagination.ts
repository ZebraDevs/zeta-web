import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import { html, LitElement, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { msg, str } from "@lit/localize";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaPageEvent } from "../../events.js";
import "../icon/icon.js";

/**
 * Converter for options that are on by default.
 * An attribute turns the option off when its value is `"false"`, so `showcontrols="false"` works from markup and from React 18.
 * Any other value, or removing the attribute, turns it on.
 */
const defaultTrueConverter = {
  fromAttribute: (value: string | null) => value !== "false"
};

/**
 * Buttons for navigating between pages: first, previous, next and last jump controls around a row of page numbers.
 *
 * Every control and page number is a native `<button>`, so each is focusable and keyboard-operable.
 * The bar is a `nav` landmark and the current page carries `aria-current="page"`.
 *
 * @event {CustomEvent<ZetaPageEventDetail>} pageChange - Fired when page change. Contains a single value in details: `page: number`.
 *
 * @part control - Each of the first, previous, next and last jump buttons.
 * @part page - Each page number button.
 * @part more - The overflow marker shown in place of hidden pages.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3853-1209&m=dev
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
   * Shows the first, previous, next and last jump buttons as one group.
   * Turn it off when only direct page number navigation is offered. Set `showcontrols="false"` from markup.
   */
  @property({ converter: defaultTrueConverter, reflect: false }) showControls = true;

  /**
   * Shows the overflow marker, together with the page number that follows it, when the page range is collapsed.
   * Turn it off to show only the page numbers around the current page. Set `showmore="false"` from markup.
   */
  @property({ converter: defaultTrueConverter, reflect: false }) showMore = true;

  /** Gives every button a 1px border. Applies to the whole bar at once. */
  @property({ type: Boolean, reflect: true }) outline = false;

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

  private result = (): (number | "dots")[] => {
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

  /** The pages to show. With `showMore` off, each overflow marker and the page paired with it (the first or last page) are dropped. */
  private visiblePages() {
    const pages = this.result();
    if (this.showMore) return pages;
    // The first/last page sits right before/after its marker, so it is the entry next to a marker at the list's edge.
    const last = pages.length - 1;
    return pages.filter((page, index) => {
      if (page === "dots") return false;
      if (index === 0 && pages[1] === "dots") return false;
      if (index === last && pages[last - 1] === "dots") return false;
      return true;
    });
  }

  /** Renders one of the jump buttons. The icon is the button's class name, so each stays addressable. */
  private renderControl(iconName: string, label: string, pageNumber: number, disabled: boolean) {
    return html`<button
      type="button"
      part="control"
      class="control ${iconName}"
      aria-label=${label}
      ?disabled=${disabled}
      @click=${() => this.handlePageChange(pageNumber)}
    >
      <zeta-icon>${iconName}</zeta-icon>
    </button>`;
  }

  protected render() {
    const disabledLeftControl = this.currentPage === 1;
    const disabledRightControl = this.currentPage === this.totalPages;

    return html`
      <nav class="pagination" aria-label=${msg("Pagination")}>
        ${
          this.showControls
            ? html`${this.renderControl("first_page", msg("First page"), 1, disabledLeftControl)}${this.renderControl(
                "chevron_left",
                msg("Previous page"),
                this.currentPage - 1,
                disabledLeftControl
              )}`
            : nothing
        }
        ${this.visiblePages().map(page => {
          if (page === "dots") {
            return html`<span part="more" class="more-control" role="img" aria-label=${msg("More pages")}
              ><zeta-icon class="more">more_horizontal</zeta-icon></span
            >`;
          }
          const isCurrent = this.currentPage === page;
          return html`<button
            type="button"
            part="page"
            class=${classMap({ page: true, selected: isCurrent })}
            aria-label=${msg(str`Page ${page}`)}
            aria-current=${ifDefined(isCurrent ? "page" : undefined)}
            @click=${() => this.handlePageChange(page)}
          >
            ${page}
          </button>`;
        })}
        ${
          this.showControls
            ? html`${this.renderControl("chevron_right", msg("Next page"), this.currentPage + 1, disabledRightControl)}${this.renderControl(
                "last_page",
                msg("Last page"),
                this.totalPages,
                disabledRightControl
              )}`
            : nothing
        }
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-pagination": ZetaPagination;
  }
}
