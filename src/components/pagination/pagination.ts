import { customElement, property } from "lit/decorators.js";
import styles from "./pagination.styles.js";
import { html, LitElement, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaPageEvent } from "../../events.js";
import { msg, str } from "@lit/localize";
import "../icon/icon.js";

/** Buttons for navigating between pages.
 *
 * The current page is exposed to assistive technology with `aria-current="page"`.
 *
 * @event {CustomEvent<ZetaPageEventDetail>} pagechange - Fired when the user picks a different page. Bubbles and is composed. `detail: { page: number }`.
 * @event {CustomEvent<ZetaPageEventDetail>} pageChange - Deprecated: listen for `pagechange` instead. Fired alongside `pagechange` with the same detail.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4489-1925&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-pagination--docs
 */

/** Boolean attribute converter for properties that default to `true`: only `="false"` turns them off. */
const booleanDefaultTrue = {
  fromAttribute: (value: string | null) => value !== "false",
  toAttribute: (value: boolean) => (value ? "" : "false")
};

@customElement("zeta-pagination")
export class ZetaPagination extends Contourable(LitElement) {
  static styles = [super.styles || [], styles];

  /** Total number of pages. Attribute: `totalpages`. */
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
   * Whether the First Page, Chevron Left, Chevron Right and Last Page jump controls are shown as a group.
   *
   * Set to `false` (or the attribute `showcontrols="false"`) to hide all four jump controls at once, leaving only direct page number navigation.
   *
   * @defaultValue true
   */
  @property({ converter: booleanDefaultTrue }) showControls = true;

  /**
   * Whether the overflow ("...") control is shown when the page range doesn't fit in full.
   *
   * Set to `false` (or the attribute `showmore="false"`) to always render the full range of page numbers without ever collapsing it behind an overflow control.
   *
   * @defaultValue true
   */
  @property({ converter: booleanDefaultTrue }) showMore = true;

  /**
   * Current active page, clamped to `1`–`totalPages`. Attribute: `currentpage`.
   *
   * Setting it programmatically does not fire `pagechange`.
   */
  @property({ type: Number })
  get currentPage() {
    // Clamp on read, so attribute order (`currentpage` before `totalpages`) and later `totalPages` changes don't matter.
    return Math.max(1, Math.min(this.page, this.totalPages));
  }

  set currentPage(page: number) {
    this.page = Number.isFinite(page) ? page : 1;
  }

  private range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  private handlePageChange = (page: number) => {
    if (page === this.currentPage) return;
    this.currentPage = page;
    const event = new ZetaPageEvent({ page });
    this.dispatchEvent(event.toEvent());
    event.name = "pagechange";
    this.dispatchEvent(event.toEvent());
  };

  private page = 1;

  private result = () => {
    if (!this.showMore) {
      return this.range(1, this.totalPages);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, this.totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = this.totalPages;

    // The branches below show `3 + 2 * siblingCount` consecutive pages next to the one remaining
    // boundary page. If that count reaches totalPages, range() would generate pages past the end
    // (or below 1) and duplicate the boundary page, so fall back to the full range instead.
    if (3 + 2 * this.siblingCount >= this.totalPages) {
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

  private control(icon: string, label: string, page: number, disabled: boolean) {
    return html`<button type="button" class="control ${icon}" aria-label=${label} ?disabled=${disabled} @click=${() => this.handlePageChange(page)}>
      <zeta-icon>${icon}</zeta-icon>
    </button>`;
  }

  protected render() {
    const current = this.currentPage;
    const atStart = current === 1;
    const atEnd = current === this.totalPages;

    return html`
      <nav class="pagination" aria-label=${msg("Pagination")}>
        ${
          this.showControls
            ? html`${this.control("first_page", msg("First page"), 1, atStart)} ${this.control("chevron_left", msg("Previous page"), current - 1, atStart)}`
            : nothing
        }
        ${this.result().map(page =>
          typeof page === "string"
            ? html`<span class="control more" role="img" aria-label=${msg("More pages")}><zeta-icon>more_horizontal</zeta-icon></span>`
            : html`<button
                type="button"
                class="page ${page === current ? "selected" : ""}"
                aria-label=${msg(str`Page ${page}`)}
                aria-current=${ifDefined(page === current ? "page" : undefined)}
                @click=${() => this.handlePageChange(page)}
              >
                ${page}
              </button>`
        )}
        ${
          this.showControls
            ? html`${this.control("chevron_right", msg("Next page"), current + 1, atEnd)} ${this.control("last_page", msg("Last page"), this.totalPages, atEnd)}`
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
