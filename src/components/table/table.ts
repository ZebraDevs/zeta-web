import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { msg, str } from "@lit/localize";
import { Contourable } from "../../mixins/mixins.js";
import {
  ZetaTableFilterEvent,
  ZetaTablePageEvent,
  ZetaTableRowSelectEvent,
  ZetaTableSearchEvent,
  ZetaTableSortEvent,
  type ZetaPageEventDetail,
  type ZetaTableSortDirection
} from "../../events.js";
import { ZetaTableColumn } from "./table-column.js";
import { ZetaTableRow } from "./table-row.js";
import { ZetaTableCell } from "./table-cell.js";
import { menuHandlers, menuStyles, showMenu } from "./table-menu.js";
import styles from "./table.styles.js";
import type { ZetaSearch } from "../search/search.js";
import type { ZetaDropdownMenuItem } from "../dropdown/menu-item/dropdown-menu-item.js";
import "../search/search.js";
import "../badges/label/label.js";
import "../pagination/pagination.js";
import "../checkbox/checkbox.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../tooltip/tooltip.js";
import "../icon/icon.js";

export * from "./table-column.js";
export * from "./table-row.js";
export * from "./table-cell.js";

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
const nextSort: Record<ZetaTableSortDirection, ZetaTableSortDirection> = { none: "ascending", ascending: "descending", descending: "none" };
/** How long the pointer rests on a cut-off cell before its tooltip shows, in ms. */
const TOOLTIP_DELAY = 500;

/**
 * A data table: rows of content in columns, with an optional controls bar above and a footer below.
 *
 * Describe the columns with `zeta-table-column` children and the data with `zeta-table-row`s of `zeta-table-cell`s.
 * The table can select and count rows, sort, search, filter and page them, resize, show, hide and freeze columns,
 * and open a compact actions menu per row.
 *
 * The table sorts, searches, filters and pages its rows itself, without moving them in your DOM. Set `manual` to do
 * that work yourself, for example on a server: the table then only fires its events and shows the rows you give it.
 *
 * @slot - `zeta-table-column`s, then `zeta-table-row`s.
 * @slot controls - Extra actions for the controls bar, such as icon buttons, placed before the column settings button.
 *
 * @part controls - The controls bar above the content.
 * @part content - The scrolling grid of header and rows.
 * @part header - The header row.
 * @part footer - The footer with the page summary, rows per page and pagination.
 *
 * @cssproperty --table-content-max-height - Caps the content height so rows scroll under a sticky header. Defaults to `none`, so the content grows with its rows.
 * @cssproperty --table-column-min-width - The narrowest a column can be. Columns past the table width scroll horizontally.
 * @cssproperty --table-search-width - The width of the search field.
 *
 * @event {CustomEvent<ZetaTableRowSelectEventDetail>} rowselect - Fired when the user selects or deselects rows. `detail.rows` holds every selected row.
 * @event {CustomEvent<ZetaTableSortEventDetail>} sort - Fired when the user sorts a column. `detail` holds the `column` and its new `direction`.
 * @event {CustomEvent<ZetaTableFilterEventDetail>} filter - Fired when the user changes a column filter. `detail` holds the `column` and the chosen `values`.
 * @event {CustomEvent<ZetaTableSearchEventDetail>} search - Fired as the user types in the search field. `detail.query` holds the text.
 * @event {CustomEvent<ZetaTablePageEventDetail>} pagechange - Fired when the user changes the page or the rows per page. `detail` holds `page` and `pageSize`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6717-3146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */
@customElement("zeta-table")
export class ZetaTable extends Contourable(LitElement) {
  // Manual slot assignment lets the table show rows sorted, filtered and paged without reordering the consumer's DOM.
  static shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, slotAssignment: "manual" };

  /** The table's accessible name. */
  @property({ type: String }) caption = "";

  /** Adds the selection column: select-all in the header and a checkbox per row. While rows are selected, the controls bar counts them. */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Adds a search field to the controls bar. Search matches the text of every cell. */
  @property({ type: Boolean, reflect: true }) searchable = false;

  /** The search text. */
  @property({ type: String }) query = "";

  /** Adds a settings button to the controls bar that opens a panel to show, hide and freeze columns. */
  @property({ type: Boolean, reflect: true }) columnSettings = false;

  /** How many leading data columns stay put when the content scrolls sideways. `0` freezes none. */
  @property({ type: Number, reflect: true }) frozen = 0;

  /** Rows per page. Setting it adds the footer with the page summary and pagination. `0` shows every row with no footer. */
  @property({ type: Number, reflect: true }) pageSize = 0;

  /** The rows-per-page choices, comma-separated, e.g. `"5,10,25"`. Setting it adds a rows-per-page select to the footer. */
  @property({ type: String }) pageSizes = "";

  /** The current page, starting at 1. */
  @property({ type: Number, reflect: true }) page = 1;

  /** Leaves sorting, searching, filtering and paging to you. The table fires its events and shows exactly the rows it holds. */
  @property({ type: Boolean, reflect: true }) manual = false;

  /** With `manual`, the total number of rows across every page, for the footer. Defaults to the number of rows the table holds. */
  @property({ type: Number }) total?: number;

  /** The text shown when no rows match. Defaults to "No results". */
  @property({ type: String }) emptyLabel?: string;

  @state() private filters = new Map<ZetaTableColumn, Set<string>>();
  @state() private filterColumn?: ZetaTableColumn;
  @state() private openMenu?: "filter" | "settings";
  @state() private tipText = "";

  @query("[part=content]") private readonly content!: HTMLElement;
  @query("slot:not([name])") private readonly rowSlot!: HTMLSlotElement;
  @query("slot[name=controls]") private readonly controlsSlot!: HTMLSlotElement | null;
  @query(".filter-menu") private readonly filterMenu!: HTMLElement;
  @query(".settings-menu") private readonly settingsMenu!: HTMLElement;
  @query("zeta-tooltip") private readonly tooltip!: HTMLElement;

  /** The rows on show after searching, filtering, sorting and paging, in order. */
  private shown: ZetaTableRow[] = [];
  private filterTrigger?: HTMLElement;
  private readonly filterMenuHandlers = menuHandlers(() => this.filterTrigger);
  private readonly settingsMenuHandlers = menuHandlers(() => this.renderRoot.querySelector<HTMLElement>(".settings"));
  private tipTimer?: ReturnType<typeof setTimeout>;
  private tipCell?: ZetaTableCell;

  // Re-render when the consumer changes rows, cells, columns or the attributes the table reads.
  private readonly observer = new MutationObserver(() => this.requestUpdate());
  private readonly resizeObserver = new ResizeObserver(() => this.layout());

  constructor() {
    super();
    this.addEventListener("pointerover", this.onPointerOver);
    this.addEventListener("pointerout", this.onPointerOut);
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["hidden", "selected", "disabled", "sort", "sortable", "filterable", "resizable", "width", "slot"]
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.observer.disconnect();
    this.resizeObserver.disconnect();
    clearTimeout(this.tipTimer);
  }

  protected firstUpdated() {
    this.resizeObserver.observe(this.content);
    // Pagination still fires its deprecated pageChange too; keep it inside the table.
    this.renderRoot.addEventListener("pageChange", e => e.stopPropagation());
  }

  private get columns() {
    return [...this.children].filter((el): el is ZetaTableColumn => el instanceof ZetaTableColumn);
  }

  private get rows() {
    return [...this.children].filter((el): el is ZetaTableRow => el instanceof ZetaTableRow);
  }

  private get visibleColumns() {
    return this.columns.filter(c => !c.hidden);
  }

  private cells(row: Element) {
    return [...row.children].filter((el): el is ZetaTableCell => el instanceof ZetaTableCell);
  }

  private cellText(row: Element, column: ZetaTableColumn) {
    return this.cells(row)[this.columns.indexOf(column)]?.textContent?.trim() ?? "";
  }

  private get pageCount() {
    return this.pageSize > 0 ? Math.max(1, Math.ceil(this.matchedCount / this.pageSize)) : 1;
  }

  private get currentPage() {
    return Math.min(Math.max(1, this.page), this.pageCount);
  }

  private matchedCount = 0;

  /** Searches, filters, sorts and pages the rows, unless the table is `manual`. */
  private process() {
    const rows = this.rows;
    if (this.manual) {
      this.matchedCount = this.total ?? rows.length;
      return rows;
    }
    const query = this.query.trim().toLocaleLowerCase();
    let matched = rows.filter(
      row =>
        (!query || this.cells(row).some(cell => cell.textContent?.toLocaleLowerCase().includes(query))) &&
        [...this.filters].every(([column, values]) => values.size === 0 || values.has(this.cellText(row, column)))
    );
    const sorted = this.columns.find(c => c.sortable && c.sort !== "none");
    if (sorted) {
      const direction = sorted.sort === "ascending" ? 1 : -1;
      matched = matched.sort((a, b) => direction * collator.compare(this.cellText(a, sorted), this.cellText(b, sorted)));
    }
    this.matchedCount = matched.length;
    if (this.pageSize <= 0) return matched;
    const start = (this.currentPage - 1) * this.pageSize;
    return matched.slice(start, start + this.pageSize);
  }

  /** Called by a row when the user toggles its checkbox. @internal */
  notifySelection() {
    this.requestUpdate();
    this.dispatchEvent(new ZetaTableRowSelectEvent({ rows: this.rows.filter(r => r.selected) }).toEvent());
  }

  private get selectableShown() {
    return this.shown.filter(r => !r.disabled);
  }

  private toggleAll = () => {
    const rows = this.selectableShown;
    const select = !rows.every(r => r.selected);
    rows.forEach(r => (r.selected = select));
    this.notifySelection();
  };

  private toggleSort(column: ZetaTableColumn) {
    const direction = nextSort[column.sort];
    this.columns.forEach(c => (c.sort = c === column ? direction : "none"));
    this.page = 1;
    this.dispatchEvent(new ZetaTableSortEvent({ column, direction }).toEvent());
  }

  private onSearch = (e: Event) => {
    // The search field's own input event would escape the table looking like the table's; the table fires `search` instead.
    e.stopPropagation();
    this.query = (e.currentTarget as ZetaSearch).value ?? "";
    this.page = 1;
    this.dispatchEvent(new ZetaTableSearchEvent({ query: this.query }).toEvent());
  };

  private openFilter(e: Event, column: ZetaTableColumn) {
    this.filterColumn = column;
    this.filterTrigger = e.currentTarget as HTMLElement;
    void this.updateComplete.then(() => showMenu(this.filterMenu, this.filterTrigger!));
  }

  private onFilterChange = (e: Event) => {
    const column = this.filterColumn;
    if (!column) return;
    const item = e.target as ZetaDropdownMenuItem;
    const value = item.textContent?.trim() ?? "";
    const values = new Set(this.filters.get(column));
    if (item.checked) values.add(value);
    else values.delete(value);
    this.filters = new Map(this.filters).set(column, values);
    this.page = 1;
    this.dispatchEvent(new ZetaTableFilterEvent({ column, values: [...values] }).toEvent());
  };

  private setPage(page: number, pageSize = this.pageSize) {
    this.page = page;
    this.pageSize = pageSize;
    this.dispatchEvent(new ZetaTablePageEvent({ page, pageSize }).toEvent());
  }

  private onPaginationChange = (e: CustomEvent<ZetaPageEventDetail>) => {
    // Pagination's own event stops here; the table fires `pagechange` with the page size as well.
    e.stopPropagation();
    this.setPage(e.detail.page);
  };

  private onPageSizeChange = (e: Event) => this.setPage(1, Number((e.target as HTMLSelectElement).value));

  // ---- Column resizing: dragging trades width with the following resizable columns, so the table width holds. ----

  private headerCell(column: ZetaTableColumn) {
    return this.renderRoot.querySelector<HTMLElement>(`[data-column="${this.columns.indexOf(column)}"]`);
  }

  /** The current pixel width of each visible column. */
  private measureWidths() {
    return new Map(this.visibleColumns.map(c => [c, this.headerCell(c)?.getBoundingClientRect().width ?? 0]));
  }

  private get minWidth() {
    const cell = this.renderRoot.querySelector<HTMLElement>("[data-column]");
    return cell ? parseFloat(getComputedStyle(cell).minWidth) || 0 : 0;
  }

  /** Widens `column` by `delta` px, taking the width from the resizable columns after it (or gives it to the next one when narrowing). */
  private trade(widths: Map<ZetaTableColumn, number>, column: ZetaTableColumn, delta: number) {
    const result = new Map(widths);
    const columns = [...widths.keys()];
    const after = columns.slice(columns.indexOf(column) + 1).filter(c => c.resizable);
    const min = this.minWidth;
    if (after.length === 0) return result;
    if (delta > 0) {
      let left = delta;
      for (const c of after) {
        const take = Math.min(left, Math.max(0, result.get(c)! - min));
        result.set(c, result.get(c)! - take);
        left -= take;
      }
      result.set(column, result.get(column)! + delta - left);
    } else {
      const give = Math.min(-delta, Math.max(0, result.get(column)! - min));
      result.set(column, result.get(column)! - give);
      result.set(after[0], result.get(after[0])! + give);
    }
    return result;
  }

  private applyWidths(widths: Map<ZetaTableColumn, number>) {
    widths.forEach((width, column) => (column.width = Math.round(width)));
  }

  private startResize(e: PointerEvent, column: ZetaTableColumn) {
    const grip = e.currentTarget as HTMLElement;
    grip.setPointerCapture(e.pointerId);
    const start = this.measureWidths();
    const x = e.clientX;
    const move = (ev: PointerEvent) => this.applyWidths(this.trade(start, column, ev.clientX - x));
    const end = () => {
      grip.removeEventListener("pointermove", move);
      grip.removeEventListener("pointerup", end);
      grip.removeEventListener("pointercancel", end);
    };
    grip.addEventListener("pointermove", move);
    grip.addEventListener("pointerup", end);
    grip.addEventListener("pointercancel", end);
  }

  private resizeKey(e: KeyboardEvent, column: ZetaTableColumn) {
    const step = parseFloat(getComputedStyle(this).getPropertyValue("--space-lg")) || 1;
    const delta = e.key === "ArrowRight" ? step : e.key === "ArrowLeft" ? -step : 0;
    if (!delta) return;
    e.preventDefault();
    this.applyWidths(this.trade(this.measureWidths(), column, delta));
  }

  /** Double-click resets a column to an equal share of the width, trading the difference with the columns after it. */
  private resetWidth(column: ZetaTableColumn) {
    const widths = this.measureWidths();
    const share = [...widths.values()].reduce((a, b) => a + b, 0) / widths.size;
    this.applyWidths(this.trade(widths, column, share - widths.get(column)!));
  }

  // ---- Layout that depends on rendered sizes: frozen offsets and resize grip values. ----

  private layout() {
    const columns = this.visibleColumns;
    const frozen = Math.min(this.frozen, columns.length);
    const offsets = columns.map(c => this.headerCell(c)?.offsetLeft ?? 0);
    const allColumns = this.columns;
    columns.forEach((column, i) => {
      const header = this.headerCell(column);
      if (!header) return;
      header.style.left = i < frozen ? `${offsets[i]}px` : "";
      header.classList.toggle("frozen", i < frozen);
      header.classList.toggle("frozen-edge", i === frozen - 1);
      const grip = header.querySelector(".grip");
      grip?.setAttribute("aria-valuenow", String(Math.round(header.getBoundingClientRect().width)));
      grip?.setAttribute("aria-valuemin", String(Math.round(this.minWidth)));
    });
    for (const row of this.rows) {
      row.frozen = frozen > 0;
      this.cells(row).forEach((cell, index) => {
        const column = allColumns[index];
        const i = column ? columns.indexOf(column) : -1;
        cell.place(!!column?.hidden, i >= 0 && i < frozen ? offsets[i] : undefined, i >= 0 && i === frozen - 1);
      });
    }
  }

  protected updated() {
    this.rowSlot.assign(...this.shown);
    this.controlsSlot?.assign(...[...this.children].filter(el => el.slot === "controls"));
    const actionsColumn = this.hasActionsColumn;
    for (const row of this.rows) {
      row.selectable = this.selectable;
      row.actionsColumn = actionsColumn;
      row.rounded = this.rounded;
    }
    this.layout();
  }

  // ---- Truncated text tooltip ----

  private onPointerOver = (e: PointerEvent) => {
    const cell = (e.target as Element).closest?.("zeta-table-cell");
    if (!cell || cell === this.tipCell) return;
    this.hideTip();
    if (!cell.truncated) return;
    this.tipCell = cell;
    this.tipTimer = setTimeout(() => void this.showTip(cell), TOOLTIP_DELAY);
  };

  private onPointerOut = (e: PointerEvent) => {
    if (this.tipCell && !this.tipCell.contains(e.relatedTarget as Node | null)) this.hideTip();
  };

  private async showTip(cell: ZetaTableCell) {
    this.tipText = cell.textContent?.trim() ?? "";
    await this.updateComplete;
    this.tooltip.showPopover();
    const c = cell.getBoundingClientRect();
    const t = this.tooltip.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(this).getPropertyValue("--space-2xs")) || 0;
    this.tooltip.style.left = `${Math.max(0, c.left + c.width / 2 - t.width / 2)}px`;
    this.tooltip.style.top = `${Math.max(0, c.top - t.height - gap)}px`;
  }

  private hideTip() {
    clearTimeout(this.tipTimer);
    this.tipCell = undefined;
    if (this.tooltip?.matches(":popover-open")) this.tooltip.hidePopover();
  }

  // ---- Rendering ----

  /** The actions column shows when any row has actions. */
  private get hasActionsColumn() {
    return this.rows.some(r => r.querySelector(":scope > [slot=actions]"));
  }

  private get gridTemplate() {
    const columns = this.visibleColumns;
    const set = columns.filter(c => c.width).map(c => c.width!);
    const fallback = set.length ? set.reduce((a, b) => a + b, 0) / set.length : 1;
    const tracks = columns.map(c => `minmax(var(--_column-min-width), ${c.width || fallback}fr)`);
    if (this.selectable) tracks.unshift("auto");
    if (this.hasActionsColumn) tracks.push("auto");
    return tracks.join(" ");
  }

  private renderControls() {
    const hasControls = [...this.children].some(el => el.slot === "controls");
    if (!this.searchable && !this.columnSettings && !this.selectable && !hasControls) return nothing;
    const count = this.rows.filter(r => r.selected).length;
    return html`<div part="controls">
      <div class="count" role="status">
        ${this.selectable && count > 0 ? html`<zeta-label status="info">${msg(str`${count} selected`)}</zeta-label>` : nothing}
      </div>
      ${
        this.searchable
          ? html`<zeta-search
              size="small"
              shape=${this.rounded ? "rounded" : "sharp"}
              placeholder=${msg("Search")}
              .value=${this.query}
              @input=${this.onSearch}
            ></zeta-search>`
          : nothing
      }
      <slot name="controls"></slot>
      ${
        this.columnSettings
          ? html`<button
                type="button"
                class="icon-button settings"
                aria-label=${msg("Column settings")}
                aria-haspopup="menu"
                aria-expanded=${this.openMenu === "settings" ? "true" : "false"}
                @click=${(e: Event) => showMenu(this.settingsMenu, e.currentTarget as HTMLElement, "end")}
              >
                <zeta-icon ?rounded=${this.rounded}>settings</zeta-icon>
              </button>
              ${this.renderSettingsMenu()}`
          : nothing
      }
    </div>`;
  }

  private renderSettingsMenu() {
    const visible = this.visibleColumns;
    return html`<div
      class="menu settings-menu"
      popover
      role="menu"
      aria-label=${msg("Column settings")}
      @toggle=${this.onMenuToggle("settings")}
      @keydown=${this.settingsMenuHandlers.keydown}
      @click=${this.settingsMenuHandlers.click}
    >
      ${this.columns.map(
        column =>
          html`<zeta-dropdown-menu-item
            type="checkbox"
            ?rounded=${this.rounded}
            .checked=${!column.hidden}
            ?disabled=${!column.hidden && visible.length === 1}
            @change=${(e: Event) => (column.hidden = !(e.target as ZetaDropdownMenuItem).checked)}
            >${column.label}</zeta-dropdown-menu-item
          >`
      )}
      <div role="separator"></div>
      <zeta-dropdown-menu-item type="radio" ?rounded=${this.rounded} .checked=${this.frozen <= 0} @change=${() => (this.frozen = 0)}
        >${msg("No frozen columns")}</zeta-dropdown-menu-item
      >
      ${visible.map(
        (column, i) =>
          html`<zeta-dropdown-menu-item type="radio" ?rounded=${this.rounded} .checked=${this.frozen === i + 1} @change=${() => (this.frozen = i + 1)}
            >${msg(str`Freeze up to ${column.label}`)}</zeta-dropdown-menu-item
          >`
      )}
    </div>`;
  }

  private onMenuToggle = (menu: "filter" | "settings") => (e: ToggleEvent) => {
    if (e.newState === "open") this.openMenu = menu;
    else if (this.openMenu === menu) this.openMenu = undefined;
  };

  private renderFilterMenu() {
    const column = this.filterColumn;
    const values = column ? [...new Set(this.rows.map(r => this.cellText(r, column)))].sort(collator.compare) : [];
    const chosen = (column && this.filters.get(column)) ?? new Set<string>();
    return html`<div
      class="menu filter-menu"
      popover
      role="menu"
      aria-label=${column ? msg(str`Filter ${column.label}`) : msg("Filter")}
      @toggle=${this.onMenuToggle("filter")}
      @keydown=${this.filterMenuHandlers.keydown}
      @click=${this.filterMenuHandlers.click}
      @change=${this.onFilterChange}
    >
      ${values.map(
        value => html`<zeta-dropdown-menu-item type="checkbox" ?rounded=${this.rounded} .checked=${chosen.has(value)}>${value}</zeta-dropdown-menu-item>`
      )}
    </div>`;
  }

  private renderHeader() {
    const all = this.columns;
    const enabled = this.selectableShown;
    const selected = enabled.filter(r => r.selected).length;
    return html`<div part="header" role="row">
      ${
        this.selectable
          ? html`<div role="columnheader" class="select ${this.frozen > 0 ? "frozen" : ""}">
              <zeta-checkbox
                size="small"
                ?rounded=${this.rounded}
                .checked=${enabled.length > 0 && selected === enabled.length}
                .indeterminate=${selected > 0 && selected < enabled.length}
                ?disabled=${enabled.length === 0}
                @change=${this.toggleAll}
                ><span class="visually-hidden">${msg("Select all rows")}</span></zeta-checkbox
              >
            </div>`
          : nothing
      }
      ${this.visibleColumns.map(column => {
        const filtered = (this.filters.get(column)?.size ?? 0) > 0;
        const open = this.openMenu === "filter" && this.filterColumn === column;
        return html`<div
          role="columnheader"
          class="data ${column.sortable ? "sortable" : ""}"
          data-column=${all.indexOf(column)}
          aria-sort=${column.sortable ? column.sort : nothing}
        >
          ${
            column.sortable
              ? html`<button type="button" class="sort" @click=${() => this.toggleSort(column)}>
                  <span class="label">${column.label}</span>
                  <zeta-icon class="sort-icon" ?rounded=${this.rounded}
                    >${column.sort === "ascending" ? "caret_up" : column.sort === "descending" ? "caret_down" : "caret_sort"}</zeta-icon
                  >
                </button>`
              : html`<span class="label">${column.label}</span>`
          }
          ${
            column.filterable
              ? html`<button
                  type="button"
                  class="icon-button filter ${filtered ? "filtered" : ""}"
                  aria-label=${msg(str`Filter ${column.label}`)}
                  aria-haspopup="menu"
                  aria-expanded=${open ? "true" : "false"}
                  @click=${(e: Event) => this.openFilter(e, column)}
                >
                  <zeta-icon ?rounded=${this.rounded}>filter</zeta-icon>
                </button>`
              : nothing
          }
          ${
            column.resizable
              ? html`<div
                  class="grip"
                  role="separator"
                  tabindex="0"
                  aria-orientation="vertical"
                  aria-label=${msg(str`Resize ${column.label}`)}
                  aria-valuenow="0"
                  @pointerdown=${(e: PointerEvent) => this.startResize(e, column)}
                  @keydown=${(e: KeyboardEvent) => this.resizeKey(e, column)}
                  @dblclick=${() => this.resetWidth(column)}
                ></div>`
              : nothing
          }
        </div>`;
      })}
      ${this.hasActionsColumn ? html`<div role="columnheader" class="actions"><span class="visually-hidden">${msg("Actions")}</span></div>` : nothing}
    </div>`;
  }

  private renderFooter() {
    if (this.pageSize <= 0) return nothing;
    const total = this.matchedCount;
    const page = this.currentPage;
    const first = total === 0 ? 0 : (page - 1) * this.pageSize + 1;
    const last = Math.min(page * this.pageSize, total);
    const sizes = [...new Set(this.pageSizes.split(",").map(Number))].filter(n => n > 0);
    if (sizes.length && !sizes.includes(this.pageSize)) sizes.push(this.pageSize);
    return html`<div part="footer">
      <div class="footer-start">
        <span class="summary">${msg(str`Showing ${first}-${last} of ${total}`)}</span>
        ${
          sizes.length
            ? html`<label class="page-size">
                ${msg("Rows per page")}
                <select @change=${this.onPageSizeChange}>
                  ${sizes.sort((a, b) => a - b).map(n => html`<option value=${n} ?selected=${n === this.pageSize}>${n}</option>`)}
                </select>
              </label>`
            : nothing
        }
      </div>
      ${
        this.pageCount > 1
          ? html`<zeta-pagination
              totalpages=${this.pageCount}
              currentpage=${page}
              outline
              ?rounded=${this.rounded}
              @pagechange=${this.onPaginationChange}
            ></zeta-pagination>`
          : nothing
      }
    </div>`;
  }

  protected render() {
    this.shown = this.process();
    const empty = this.shown.length === 0;
    return html`
      ${this.renderControls()}
      <div part="content" role="table" aria-label=${this.caption || nothing} style=${styleMap({ gridTemplateColumns: this.gridTemplate })}>
        ${this.renderHeader()}
        <slot></slot>
        ${empty ? html`<div class="empty" role="row"><div role="cell">${this.emptyLabel ?? msg("No results")}</div></div>` : nothing}
      </div>
      ${this.renderFooter()} ${this.renderFilterMenu()}
      <zeta-tooltip popover="manual" aria-hidden="true" point="bottom" ?rounded=${this.rounded}>${this.tipText}</zeta-tooltip>
    `;
  }

  static styles = [super.styles ?? [], menuStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-table": ZetaTable;
  }
}
