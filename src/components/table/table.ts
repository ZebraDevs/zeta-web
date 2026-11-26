import { LitElement, html, nothing } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { styleMap } from "lit/directives/style-map.js";
import { msg, str } from "@lit/localize";
import styles from "./table.styles.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
import "../icon/icon.js";
import "../badges/label/label.js";
import "../button/icon-button/icon-button.js";
import "../checkbox/checkbox.js";
import type { ZetaCheckbox } from "../checkbox/checkbox.js";
import "../pagination/pagination.js";
import "../search/search.js";
import "../select-input/select-input.js";
import type { ZetaSelectInput } from "../select-input/select-input.js";
import type { ZetaTableColumn, SortState, PaginationType, ZetaTableAction, ZetaTableRow } from "./table.types.js";

export type { ZetaTableColumn, SortDirection, SortState, PaginationType, ZetaTableAction, ZetaTableRow } from "./table.types.js";

/**
 * Converter for options that are on by default.
 * An attribute turns the option off when its value is `"false"`, so `hasfooter="false"` works from markup and from React 18.
 * Any other value, or removing the attribute, turns it on.
 */
const defaultTrueConverter = {
  fromAttribute: (value: string | null) => value !== "false"
};

/** Orders text for the built-in sort: natural numeric order ("Row 2" before "Row 10"), ignoring case and accents. */
const SORT_COLLATOR = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

/**
 * A full-featured, highly configurable data table component.
 *
 * ## Features
 * - **Sorting**: 3-state per-column sort indicator (asc → desc → none). The table sorts the whole `data` collection, not only the rows on the current page. When `data` is one page of a larger collection (`totalItems` is larger than `data`), the consumer sorts it from the `sortchange` event instead. Calling `preventDefault()` on `sortchange` also turns the built-in sort off. Configurable per column via `sortable`.
 * - **Column Search**: Optional per-column search inputs. Enabled via `column-searchable` attribute.
 * - **Column Filter**: Optional per-column filter dropdown with checkboxes (Clear/Apply). Enabled via `column-filterable` attribute. Options via `filterOptions` on column or auto-populated from data.
 * - **Global Search**: Optional search bar in header. Enabled via `searchable` attribute.
 * - **Selection**: Checkbox column with select-all. Optional `select-on-row-click` for click-to-select.
 * - **Row Click**: Optional via `clickable-rows` attribute. Rows show pointer cursor and highlight on click.
 * - **Disabled Rows**: Rows can be disabled via `disabledRows` array or `_disabled` property. Use `allowDisabledSelection` to allow selection/actions on disabled rows.
 * - **Frozen Columns**: Columns can be frozen via `frozen` property or the column configure panel.
 * - **Column Resizing**: Drag to resize. Double-click resize handle to reset width.
 * - **Column Configure**: Show/hide and freeze/unfreeze columns from a dropdown panel.
 * - **Pagination**: Numbered or infinite scroll. With numbered pagination the footer always stays at the bottom: the table fills a parent that has a height (for example `height: 100vh`, or a flex or grid cell), and the rows scroll under the sticky header. With a height cap (`--table-max-height` or `verticalscroll`) the content takes that height whatever the number of rows. If `data` holds the whole collection the table shows the current page of it itself. If the consumer fetches pages, it listens to `pagechange`/`loadmore` events and sets `totalItems` to the full dataset size.
 * - **Nested Rows**: Expandable child rows via `_nested` property on row data.
 * - **Export**: CSV export of visible data.
 * - **Refresh**: Optional refresh button via `refreshable` attribute.
 * - **Row Actions**: Per-row kebab menu with configurable items per row via `_actions`.
 * - **Tooltips**: Auto-shown on content overflow.
 * - **Localization**: All labels (`refreshLabel`, `columnsLabel`, `actionsLabel`, `searchPlaceholder`) are configurable.
 * - **Shape**: `shape="rounded"` (default) or `shape="sharp"`. Every component inside the table (search, buttons, checkboxes, selected count, pagination, rows per page) and the table's own corners follow it. `full` is treated as `rounded`.
 * - **Layout toggles**: `hascontrol`, `hasfooter`, `hasselectedcount`, `hasrowsperpage` and `hasrowactions` are on by default. Turn one off with `hasfooter="false"` (attribute) or `.hasFooter=${false}` (property). `verticalscroll` caps the content height so rows scroll under a sticky header.
 * - **Custom Styling**: Full theming via CSS custom properties (see `@cssproperty` list below).
 *
 * ## Usage
 * ```html
 * <zeta-table
 *   .columns=${columns}
 *   .data=${data}
 *   searchable
 *   column-searchable
 *   column-filterable
 *   refreshable
 *   clickable-rows
 *   selectable
 *   select-all
 *   @sortchange=${handleSort}
 *   @rowselect=${handleSelection}
 *   @pagechange=${handlePageChange}
 *   @loadmore=${handleLoadMore}
 *   @tableexport=${handleExport}
 *   @rowexpand=${handleExpand}
 *   @rowclick=${handleRowClick}
 *   @rowaction=${handleAction}
 *   @columnsearch=${handleColumnSearch}
 *   @columnfilter=${handleFilter}
 *   @tablesearch=${handleSearch}
 *   @tablerefresh=${handleRefresh}
 *   exportable
 *   column-configure
 *   show-data-count
 *   table-title="My Table"
 *   pagination-type="numbered"
 *   page-size="10"
 *   style="--table-max-height: 500px; --table-header-bg: #f8fafc;"
 * ></zeta-table>
 * ```
 *
 * ## Column Definition (ZetaTableColumn)
 * ```typescript
 * {
 *   field: string;          // Data key
 *   title: string;          // Display header text
 *   width?: number | string; // Initial width — number for px (e.g. 200), string for CSS (e.g. "25%", "12rem")
 *   minWidth?: number;      // Minimum width for resize (default: 60)
 *   sortable?: boolean;     // Enable sorting (default: true)
 *   filterable?: boolean;   // Enable search/filter (default: true)
 *   filterOptions?: string[]; // Predefined filter dropdown options
 *   frozen?: boolean;       // Freeze this column
 *   visible?: boolean;      // Column visibility (default: true)
 *   tooltip?: boolean;      // true = always show tooltip (highest precedence)
 *   tooltipOnEllipsisOnly?: boolean; // true (default) = show on overflow only | false = disable tooltip
 *   resizable?: boolean;    // Allow column resize (default: true)
 *   disabled?: boolean;     // Disable all interaction on column
 * }
 * ```
 *
 * ## Row Data (ZetaTableRow)
 * ```typescript
 * {
 *   id: string | number;        // Unique row identifier (required)
 *   [key: string]: unknown;     // Data fields matching column `field` names
 *   _disabled?: boolean;        // Disable row (grey out, no interaction)
 *   _checkboxDisabled?: boolean; // Disable only the checkbox (row still interactive)
 *   _nested?: ZetaTableRow[] | Node; // Nested content: array of child rows (auto-columns) or a DOM Node (custom view)
 *   _actions?: ZetaTableAction[] | null; // Per-row kebab menu items (null = hide menu)
 * }
 * ```
 *
 * ## Row Action (ZetaTableAction)
 * ```typescript
 * { key: string; label: string; icon?: string; disabled?: boolean; }
 * ```
 *
 *
 * @event {CustomEvent} rowselect - Row selection changes. Detail: { selectedIds: [] }
 * @event {CustomEvent} sortchange - Column sort changes. Cancelable: call `preventDefault()` to sort the data yourself. Detail: { field, direction }
 * @event {CustomEvent} columnsearch - Column search input changes. Detail: { field, value, searchValues }
 * @event {CustomEvent} columnfilter - Column filter applied. Detail: { field, selectedValues }
 * @event {CustomEvent} tablesearch - Global search input changes. Detail: { value }
 * @event {CustomEvent} pagechange - Page changes (numbered). Detail: { page, pageSize }
 * @event {CustomEvent} loadmore - More data needed (infinite scroll)
 * @event {CustomEvent} tableexport - Export button clicked. Cancelable: call `preventDefault()` to skip the built-in CSV download and export the data yourself. Detail: { csv, columns, data }
 * @event {CustomEvent} rowexpand - Row expanded/collapsed. Detail: { rowId, expanded }
 * @event {CustomEvent} rowclick - Row clicked. Detail: { row, rowIndex }
 * @event {CustomEvent} tablerefresh - Refresh button clicked
 * @event {CustomEvent} rowaction - Row action clicked. Detail: { actionKey, row, rowIndex }
 *
 * @slot cell-{field}-row-{rowId} - Projects custom content into a specific data cell, found by the column's `field` and the row's `id` (e.g. `cell-status-row-42`). It stays with that row when the table sorts, filters or changes page. Slotted content replaces the default text for that cell.
 * @slot cell-{field}-{rowIndex} - Projects custom content into a data cell by the row's index among the rows currently displayed (e.g. `cell-status-0` is the status cell of the first visible row). The index changes when the table sorts, filters or changes page, so prefer `cell-{field}-row-{rowId}`. It is used only when there is no content in the id slot.
 * @slot controls - Extra actions in the controls bar, after the refresh and export buttons and before the column settings button. Slot icon buttons or other small controls here.
 * @slot loading - Custom loading indicator shown during infinite scroll. Falls back to "Loading more data..." text.
 * @slot no-data - Custom empty state content shown when the table has no data. Falls back to "No data available" text.
 *
 * @cssproperty --table-width - Table width. Default: 100%
 * @cssproperty --table-max-height - Max height of scroll area. Default: none, or a cap of a header and seven rows when `verticalscroll` is set.
 * @cssproperty --table-border-color - Border color of the table, header cells, controls bar, footer and menus. Defaults to `--border-default`.
 * @cssproperty --table-row-border-color - Border color between data rows. Defaults to `--border-subtle`.
 * @cssproperty --table-border-radius - Wrapper border radius. Defaults to `--radius-element-md`, or `--radius-none` when the table is not rounded.
 * @cssproperty --table-header-bg - Header background. Defaults to `--interactive-neutral-background-default`.
 * @cssproperty --table-header-text - Header text color. Defaults to `--foreground-primary`.
 * @cssproperty --table-header-height - Header row content height, not counting its top and bottom borders. Defaults to two `--space-md` plus the `--label-medium` line height.
 * @cssproperty --table-header-font-size - Header font size. Defaults to `--label-medium-font-size`.
 * @cssproperty --table-header-font-weight - Header font weight. Defaults to `--label-medium-font-weight`.
 * @cssproperty --table-header-border-bottom - Header bottom border. Defaults to `--stroke-thin solid --table-border-color`.
 * @cssproperty --table-row-height - Data row height (includes cell padding, box-sizing: border-box). Defaults to two `--space-md` plus `--control-sm` (60px at the desktop size).
 * @cssproperty --table-row-bg - Row background. Defaults to `--interactive-neutral-background-default`.
 * @cssproperty --table-row-hover-bg - Row hover background. Defaults to `--interactive-neutral-background-hover`.
 * @cssproperty --table-row-selected-bg - Selected row background. Defaults to `--interactive-neutral-background-selected`.
 * @cssproperty --table-row-active-bg - Active/clicked row background. Defaults to `--interactive-neutral-background-selected`.
 * @cssproperty --table-row-clickable-cursor - Clickable row cursor. Default: pointer
 * @cssproperty --table-cell-padding-y - Cell vertical padding. Defaults to `--space-md`.
 * @cssproperty --table-cell-padding-x - Cell horizontal padding. Defaults to `--space-lg`.
 * @cssproperty --table-cell-padding - Cell padding shorthand (computed from padding-y and padding-x).
 * @cssproperty --table-cell-font-size - Cell font size. Defaults to `--body-small-font-size`.
 * @cssproperty --table-frozen-shadow - Frozen column shadow. Defaults to `--elevation-2`.
 * @cssproperty --table-sort-active-color - Color of the active sort direction's caret. Defaults to `--foreground-cursor`.
 * @cssproperty --table-sort-inactive-color - Inactive sort icon color. Defaults to `--foreground-tertiary`.
 * @cssproperty --table-resize-handle-color - Resize handle color while hovered. Defaults to `--interactive-neutral-border-hover`.
 * @cssproperty --table-toolbar-bg - Controls bar background. Defaults to `--surface-section`.
 * @cssproperty --table-search-min-width - Minimum width of the controls bar search field (280px at the desktop size).
 * @cssproperty --table-footer-bg - Footer background. Defaults to `--surface-section`.
 * @cssproperty --table-data-count-bg - Data count badge background. Defaults to `--feedback-info-background-subtle`.
 * @cssproperty --table-data-count-color - Data count badge text color. Defaults to `--feedback-info-foreground`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6717-3146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */
@customElement("zeta-table")
export class ZetaTable extends ContourableThree(LitElement) {
  static override styles = [super.styles ?? [], styles];

  /**
   * Shows the controls bar above the content, holding the selected count, the search field and the column settings.
   * Turn it off when the table doesn't need its own search or extra actions above it.
   * Attribute `hascontrol`; set `hascontrol="false"` to turn it off from markup.
   */
  @property({ converter: defaultTrueConverter })
  hasControl = true;

  /**
   * Shows the footer below the content, holding the page summary, rows per page and the pagination control (numbered pagination only).
   * Turn it off for a table short enough that pagination has nothing to do.
   * Attribute `hasfooter`; set `hasfooter="false"` to turn it off from markup.
   */
  @property({ converter: defaultTrueConverter })
  hasFooter = true;

  /**
   * Shows a count of the selected rows at the start of the controls bar. It only shows while rows are selected and is announced as a live region.
   * Attribute `hasselectedcount`; set `hasselectedcount="false"` to turn it off from markup.
   */
  @property({ converter: defaultTrueConverter })
  hasSelectedCount = true;

  /**
   * Shows a compact select after the page summary that sets how many rows each page shows (numbered pagination only).
   * Attribute `hasrowsperpage`; set `hasrowsperpage="false"` to turn it off from markup.
   */
  @property({ converter: defaultTrueConverter })
  hasRowsPerPage = true;

  /**
   * Shows the trailing more button per row that opens the row's actions menu, when any row has actions.
   * Turn it off to hide the actions column even though actions are defined.
   * Attribute `hasrowactions`; set `hasrowactions="false"` to turn it off from markup.
   */
  @property({ converter: defaultTrueConverter })
  hasRowActions = true;

  /**
   * Caps the content height so rows scroll under a sticky header.
   * The cap defaults to a header and seven rows, and `--table-max-height` overrides it.
   */
  @property({ type: Boolean, reflect: true })
  verticalScroll = false;

  /** Column definitions */
  @property({ type: Array })
  columns: ZetaTableColumn[] = [];

  /** Row data - each row must have a unique `id` field */
  @property({ type: Array })
  data: ZetaTableRow[] = [];

  /** Enable checkbox selection column */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /** Show select-all checkbox in header */
  @property({ type: Boolean, reflect: true, attribute: "select-all" })
  selectAll = true;

  /** Initially selected row IDs */
  @property({ type: Array, attribute: "selected-rows" })
  selectedRows: (string | number)[] = [];

  /** When true, rows become clickable (pointer cursor + highlight on click). Emits `rowclick` event. */
  @property({ type: Boolean, attribute: "clickable-rows" })
  clickableRows = false;

  /** When true, clicking a row also toggles its checkbox selection. Emits `rowselect` event. */
  @property({ type: Boolean, attribute: "select-on-row-click" })
  selectOnRowClick = false;

  /** Allow checkbox selection and action menu on disabled rows (useful for operations like bulk delete). Rows still appear visually disabled. */
  @property({ type: Boolean })
  allowDisabledSelection = false;

  /** Fallback row action menu items - used for rows that don't have `_actions` defined. Set to show a kebab menu as the last column. */
  @property({ attribute: false })
  rowActions: ZetaTableAction[] = [];

  /** Tooltip/label for the actions column header (supports localization) */
  @property({ type: String, attribute: "actions-label" })
  actionsLabel = "Actions";

  /** Show data count as a highlighted badge (e.g. "5 out of 51") */
  @property({ type: Boolean, attribute: "show-data-count" })
  showDataCount = false;

  /** Optional title shown next to the data count badge */
  @property({ type: String, attribute: "table-title" })
  tableTitle = "";

  /** Pagination type: 'none', 'numbered', or 'infinite' */
  @property({ type: String, attribute: "pagination-type" })
  paginationType: PaginationType = "none";

  /** Number of rows per page */
  @property({ type: Number, attribute: "page-size" })
  pageSize = 20;

  /** Initial current page number (1-based, for numbered pagination) */
  @property({ type: Number, attribute: "current-page" })
  currentPage = 1;

  @state() private _currentPage = 1;

  /** Total number of items (for server-side pagination) */
  @property({ type: Number, attribute: "total-items" })
  totalItems = -1;

  /** Enable nested/expandable rows */
  @property({ type: Boolean, reflect: true })
  expandable = false;

  /** Show export button in toolbar */
  @property({ type: Boolean, reflect: true })
  exportable = false;

  /** When true, shows search inputs on columns. Emits `columnsearch` event. */
  @property({ type: Boolean, attribute: "column-searchable" })
  columnSearchable = false;

  /** When true, shows a filter icon on each column header with a dropdown menu. Emits `columnfilter` event. */
  @property({ type: Boolean, attribute: "column-filterable" })
  columnFilterable = false;

  /** When true, shows a global search bar above the table. Emits `tablesearch` event. */
  @property({ type: Boolean, attribute: "searchable" })
  searchable = false;

  /** Placeholder text for the global search input (supports localization) */
  @property({ type: String, attribute: "search-placeholder" })
  searchPlaceholder = "Search...";

  /** When true, shows a refresh icon button in the toolbar. Emits `tablerefresh` event. */
  @property({ type: Boolean, attribute: "refreshable" })
  refreshable = false;

  /** Tooltip/label for the refresh button (supports localization) */
  @property({ type: String, attribute: "refresh-label" })
  refreshLabel = "Refresh";

  /** Show column configure button in toolbar */
  @property({ type: Boolean, reflect: true, attribute: "column-configure" })
  columnConfigure = true;

  /** Tooltip/label for the columns button (supports localization) */
  @property({ type: String, attribute: "columns-label" })
  columnsLabel = "Columns";

  /** Loading state (for infinite scroll) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Whether there is more data to load (infinite scroll). Set to false when all data has been fetched. */
  @property({ type: Boolean, attribute: "has-more-data" })
  hasMoreData = true;

  /** IDs of rows that should be disabled */
  @property({ type: Array, attribute: "disabled-rows" })
  disabledRows: (string | number)[] = [];

  /** Custom content to display when the table has no data. Accepts a DOM node or string. */
  @property({ attribute: false }) noDataContent: unknown = null;

  /** Custom loading indicator content for infinite scroll. Accepts a DOM node or string. */
  @property({ attribute: false }) loadingContent: unknown = null;

  // ─── Internal Reactive State (@state) ───
  // These trigger a re-render when changed but are NOT exposed as public attributes.

  /** Set of currently selected row IDs — drives checkbox states and selection count */
  @state() private _selectedRows: Set<string | number> = new Set();

  /** Current sort state: which field, which direction, and click count for the 3-state cycle */
  @state() private _sortState: SortState = { field: "", direction: null, clickCount: 0 };

  /** Per-column search input values, keyed by field name */
  @state() private _searchValues: Record<string, string> = {};

  /** Current value of the global (toolbar) search input */
  @state() private _globalSearchValue = "";

  /** User-adjusted column widths (from drag resize), keyed by field name */
  @state() private _columnWidths: Record<string, number> = {};

  /** Set of field names for columns currently visible (column configure panel toggles these) */
  @state() private _visibleColumns: Set<string> = new Set();

  /** Set of field names for columns currently frozen (pinned to the left during horizontal scroll) */
  @state() private _frozenColumns: Set<string> = new Set();

  /** Set of row IDs whose nested sub-rows are currently expanded */
  @state() private _expandedRows: Set<string | number> = new Set();

  /** Whether the column configure dropdown panel is currently visible */
  @state() private _columnConfigureVisible = false;

  /** Field name of the column whose filter dropdown panel is currently open (null = closed) */
  @state() private _filterPanelField: string | null = null;

  /** Viewport-relative position for the filter dropdown panel */
  @state() private _filterPanelPos: { top: number; left: number } = { top: 0, left: 0 };

  /** Currently applied filters per column — keyed by field, value is the set of selected filter options */
  @state() private _activeFilters: Record<string, Set<string>> = {};

  /** Temporary filter selections in the open filter panel (committed to _activeFilters on "Apply") */
  @state() private _pendingFilterSelections: Set<string> = new Set();

  /** Tooltip content and position state */
  @state() private _tooltipText = "";
  @state() private _tooltipX = 0;
  @state() private _tooltipY = 0;
  @state() private _tooltipVisible = false;

  /** Set of disabled row IDs (synced from the `disabledRows` public property for O(1) lookup) */
  @state() private _disabledRows: Set<string | number> = new Set();

  /** ID of the row that was last clicked (drives the active/highlight style) */
  @state() private _activeRow: string | number | null = null;

  /** ID of the row whose action (kebab) menu is currently open (null = no menu open) */
  @state() private _actionMenuRowId: string | number | null = null;

  /** Viewport-relative position for the action menu dropdown */
  @state() private _actionMenuPos: { top: number; left: number } = { top: 0, left: 0 };

  /** Whether to render the actions column (true if any row has actions defined) */
  @state() private _showActionsColumn = false;

  // ─── Non-reactive Private Fields ───
  // These do NOT trigger re-renders when changed — used for imperative DOM tracking.

  /** Getter for the scrollable container element (used for scroll listeners and IntersectionObserver root) */
  private get _scrollContainer(): HTMLElement | null {
    return this.shadowRoot!.querySelector(".zeta-table-scroll");
  }

  /** Field name of the column currently being resized (null when not resizing) */
  private _resizingColumn: string | null = null;
  /** Mouse X position when resize drag started */
  private _resizeStartX = 0;
  /** Column width in px when resize drag started */
  private _resizeStartWidth = 0;
  /** True when the consumer called `preventDefault()` on the last `sortchange`, so it sorts the data itself and the built-in sort stays off */
  private _consumerSorts = false;
  /** The rows of the last built-in sort, with what they were sorted from */
  private _sortedCache?: { source: ZetaTableRow[]; length: number; field: string; direction: string; rows: ZetaTableRow[] };
  /** Set of field names that the user has manually drag-resized */
  private _manuallyResizedColumns: Set<string> = new Set();

  /** IntersectionObserver instance for infinite scroll sentinel detection */
  private _intersectionObserver: IntersectionObserver | null = null;

  /** Debounce timer for tooltip show delay (400ms) */
  private _tooltipTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Saved scroll position before data updates (infinite scroll).
   * Captured in willUpdate, restored in updated to prevent scroll jumping
   * when new rows are appended to the DOM.
   */
  private _savedScrollTop?: number;

  /**
   * Number of data rows at the time loading started.
   * Used to keep the loading row visible during the gap between `loading=false`
   * and new data arriving (prevents a flash of empty space). Reset to -1 when idle.
   */
  private _dataLengthWhenLoadingStarted = -1;

  /**
   * Lit lifecycle: called when the element is added to the DOM.
   *
   * - Syncs public array props (selectedRows, disabledRows) into internal Sets for O(1) lookup.
   * - Registers a document-level click listener to close dropdowns (column panel, action menu,
   *   filter panel) when clicking outside.
   */
  override connectedCallback() {
    super.connectedCallback?.();
    this._syncSelectedRows();
    this._syncDisabledRows();
    document.addEventListener("click", this._closeOverlaysOnOutsideClick);
  }

  /**
   * Lit lifecycle: called when the element is removed from the DOM.
   * Cleans up all external listeners and observers to prevent memory leaks.
   */
  override disconnectedCallback() {
    super.disconnectedCallback?.();
    document.removeEventListener("click", this._closeOverlaysOnOutsideClick);
    document.removeEventListener("mousemove", this._handleResizeMove);
    document.removeEventListener("mouseup", this._handleResizeEnd);
    this._scrollContainer?.removeEventListener("scroll", this._handleScrollClose);
    this._destroyInfiniteScrollObserver();
  }

  /**
   * Lit lifecycle: called before each render when reactive properties change.
   * Handles scroll position preservation and state synchronization.
   *
   * Scroll preservation for infinite scroll:
   * 1. When `data` changes → save current scroll position (before DOM updates)
   * 2. When `loading` becomes true → record how many rows existed (to keep loading row visible)
   * 3. When `loading` becomes false but data hasn't arrived yet → wait 150ms before hiding
   *    the loading row (prevents flash of empty space during async data propagation)
   * 4. When new data arrives (length > saved length) → clear the loading guard
   * 5. When `hasMoreData` becomes false → clear loading guard (all data loaded)
   */
  override willUpdate(changed: PropertyValues) {
    // Save scroll position before new data causes a DOM re-render
    if (changed.has("data") && this.paginationType === "infinite") {
      const sc = this._scrollContainer;
      if (sc) this._savedScrollTop = sc.scrollTop;
    }

    // Track loading transitions to keep the loading row visible during data fetch gaps
    if (changed.has("loading") && this.paginationType === "infinite") {
      if (this.loading) {
        this._dataLengthWhenLoadingStarted = this.data.length;
      } else if (!changed.has("data") && this._dataLengthWhenLoadingStarted >= 0) {
        // Loading ended but data hasn't changed yet — keep loading row visible briefly
        setTimeout(() => {
          if (this._dataLengthWhenLoadingStarted >= 0) {
            this._dataLengthWhenLoadingStarted = -1;
            this.requestUpdate();
          }
        }, 150);
      }
    }

    // New data arrived while loading guard is active → clear it
    if (changed.has("data") && this._dataLengthWhenLoadingStarted >= 0 && this.data.length > this._dataLengthWhenLoadingStarted) {
      this._dataLengthWhenLoadingStarted = -1;
    }

    // All data loaded → no need for the loading guard anymore
    if (changed.has("hasMoreData") && !this.hasMoreData) {
      this._dataLengthWhenLoadingStarted = -1;
    }

    // Sync column visibility and widths when column definitions change
    if (changed.has("columns")) {
      this._syncVisibleColumns();
      this._syncColumnWidths();
    }

    // Sync public array props to internal Sets when they change externally
    if (changed.has("selectedRows")) {
      this._syncSelectedRows();
    }
    if (changed.has("disabledRows")) {
      this._syncDisabledRows();
    }

    // Sync external currentPage to internal state
    if (changed.has("currentPage")) {
      this._currentPage = this.currentPage;
    }

    // Determine if the actions column should be shown (if any row has actions)
    if (changed.has("data") || changed.has("rowActions") || changed.has("hasRowActions")) {
      this._showActionsColumn = this.hasRowActions && (this.rowActions.length > 0 || this.data.some(row => row._actions && row._actions.length > 0));
    }
  }

  /**
   * Lit lifecycle: called once after the first render.
   * Sets up the IntersectionObserver for infinite scroll and attaches the
   * scroll listener to close dropdowns on scroll.
   */
  override firstUpdated() {
    if (this.paginationType === "infinite") {
      this._setupInfiniteScrollObserver();
    }
    this._scrollContainer?.addEventListener("scroll", this._handleScrollClose);
  }

  /**
   * Lit lifecycle: called after every render (including first).
   *
   * - Manages IntersectionObserver lifecycle when paginationType changes at runtime.
   * - Restores saved scroll position after data-driven DOM updates to prevent
   *   the viewport from jumping when new rows are appended.
   */
  override updated(changed: PropertyValues) {
    if (changed.has("paginationType")) {
      if (this.paginationType === "infinite") {
        this._setupInfiniteScrollObserver();
      } else {
        this._destroyInfiniteScrollObserver();
      }
    }

    // Restore scroll position after data update (captured in willUpdate)
    if (changed.has("data") && this._savedScrollTop !== undefined) {
      const sc = this._scrollContainer;
      if (sc) sc.scrollTop = this._savedScrollTop;
      this._savedScrollTop = undefined;
    }
  }

  // ─── State Synchronization Helpers ───
  // Convert public array/object properties to internal Sets for O(1) lookups during rendering.

  /** Converts the public `selectedRows` array to an internal Set */
  private _syncSelectedRows() {
    this._selectedRows = new Set(this.selectedRows);
  }

  /** Converts the public `disabledRows` array to an internal Set */
  private _syncDisabledRows() {
    this._disabledRows = new Set(this.disabledRows);
  }

  /** Rebuilds visible and frozen column Sets from column definitions */
  private _syncVisibleColumns() {
    this._visibleColumns = new Set(this.columns.filter(c => c.visible !== false).map(c => c.field));
    this._frozenColumns = new Set(this.columns.filter(c => c.frozen).map(c => c.field));
  }

  /**
   * Reads initial numeric column widths from column definitions into the width tracking map.
   * String widths (e.g. "25%", "12rem") are not stored here — they flow directly from
   * `col.width` in the colgroup template until the user drag-resizes (which converts to px).
   */
  private _syncColumnWidths() {
    const widths: Record<string, number> = {};
    for (const col of this.columns) {
      if (typeof col.width === "number") {
        widths[col.field] = col.width;
      }
    }
    this._columnWidths = widths;
  }

  // ─── Global Event Handlers ───

  /**
   * Document-level click handler (arrow function to preserve `this`).
   * Closes open dropdown panels (column configure, action menu, filter panel)
   * when the user clicks outside of them.
   */
  private _closeOverlaysOnOutsideClick = (e: Event) => {
    const path = e.composedPath();

    // Close column configure panel if click is outside its wrapper
    const wrapper = this.shadowRoot!.querySelector(".zeta-table-column-panel-wrapper");
    if (wrapper && !path.includes(wrapper)) {
      this._columnConfigureVisible = false;
    }

    // Close action menu if click is outside the menu and not on an action button
    if (this._actionMenuRowId !== null) {
      const menu = this.shadowRoot!.querySelector(".zeta-table-action-menu--open");
      const clickedBtn = path.some(el => (el as Element).classList?.contains("zeta-table-action-btn"));
      if (!clickedBtn && (!menu || !path.includes(menu))) {
        this._actionMenuRowId = null;
      }
    }

    // Close filter panel if click is outside the panel and not on a filter icon button
    if (this._filterPanelField !== null) {
      const panel = this.shadowRoot!.querySelector(".zeta-table-filter-panel");
      const clickedFilterBtn = path.some(el => (el as Element).classList?.contains("zeta-table-header-icon-btn"));
      if (!clickedFilterBtn && (!panel || !path.includes(panel))) {
        this._filterPanelField = null;
      }
    }
  };

  /**
   * Scroll handler: closes any open dropdown overlays (action menu, filter panel)
   * when the table scrolls, since their fixed positions would become stale.
   */
  private _handleScrollClose = () => {
    if (this._actionMenuRowId !== null) {
      this._actionMenuRowId = null;
    }
    if (this._filterPanelField !== null) {
      this._filterPanelField = null;
    }
  };

  // ─── Row State Helpers ───

  /** Checks if a row is disabled — either via row._disabled flag or the disabledRows property */
  private _isRowDisabled(row: ZetaTableRow): boolean {
    return !!row._disabled || this._disabledRows.has(row.id);
  }

  /** Returns true if rows are clickable (clickableRows or selectOnRowClick) */
  private _isClickable(): boolean {
    return this.clickableRows || this.selectOnRowClick;
  }

  // ─── Row Interaction Handlers ───

  /**
   * Handles a click on a table row.
   * - Ignores clicks on disabled rows (unless allowDisabledSelection is set)
   * - Ignores clicks on <input> elements (checkboxes handle themselves)
   * - Ignores clicks on <button> elements (action buttons handle themselves)
   * - Sets the active row for visual highlighting
   * - If selectOnRowClick is configured, toggles the row's checkbox selection
   * - Dispatches `rowclick` CustomEvent
   */
  private _handleRowClick(row: ZetaTableRow, rowIndex: number, e: MouseEvent) {
    if (this._isRowDisabled(row) && !this.allowDisabledSelection) return;
    // Controls inside the row sit behind their own shadow roots, so look through the whole event path (up to this row)
    const path = e.composedPath();
    const inRow = path.slice(0, Math.max(0, path.indexOf(e.currentTarget as EventTarget)));
    const pathHas = (...tags: string[]) => inRow.some(node => node instanceof HTMLElement && tags.includes(node.tagName));
    if (pathHas("INPUT", "ZETA-CHECKBOX")) return;

    // Only highlight the row when clicking a row does something
    const clickable = this._isClickable();
    if (clickable) this._activeRow = row.id;

    if (pathHas("BUTTON", "ZETA-ICON-BUTTON")) return;
    if (!clickable) return;

    if (this.selectOnRowClick) {
      this._handleRowSelect(row);
    }

    this.dispatchEvent(
      new CustomEvent("rowclick", {
        detail: { row, rowIndex },
        bubbles: true,
        composed: true
      })
    );
  }

  // ─── Sorting ───

  /**
   * Handles column header sort click.
   * Implements a 3-state UI cycle: unsorted → ascending → descending → unsorted.
   * Tracks click count per field to determine the current state in the cycle.
   * Dispatches the `sortchange` event. The table sorts the whole `data` collection itself (see `_getFilteredSortedData`),
   * unless `data` is only one page of a larger collection, or the consumer cancels the event.
   */
  private _handleSort(field: string) {
    const col = this.columns.find(c => c.field === field);
    if (col?.disabled) return;

    if (this._sortState.field === field) {
      const count = this._sortState.clickCount + 1;
      if (count >= 3) {
        this._sortState = { field: "", direction: null, clickCount: 0 };
      } else {
        this._sortState = {
          field,
          direction: count === 1 ? "asc" : "desc",
          clickCount: count
        };
      }
    } else {
      this._sortState = { field, direction: "asc", clickCount: 1 };
    }
    this._emitSortChange();
  }

  /**
   * Handles clicking an individual sort arrow icon.
   * Sets the column to the specified direction, or clears sorting if already active.
   */
  private _handleSortArrowClick(field: string, direction: "asc" | "desc") {
    const col = this.columns.find(c => c.field === field);
    if (col?.disabled) return;

    if (this._sortState.field === field && this._sortState.direction === direction) {
      this._sortState = { field: "", direction: null, clickCount: 0 };
    } else {
      this._sortState = { field, direction, clickCount: direction === "asc" ? 1 : 2 };
    }
    this._emitSortChange();
  }

  private _emitSortChange() {
    // A sort changes the order of every row, so the first page shows its start (like a search does)
    if (this.paginationType === "numbered") {
      this._currentPage = 1;
    }
    const notPrevented = this.dispatchEvent(
      new CustomEvent("sortchange", {
        detail: { field: this._sortState.field, direction: this._sortState.direction },
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    // The consumer calls `preventDefault()` to say it sorts the data itself
    this._consumerSorts = !notPrevented;
  }

  // ─── Column Filtering ───

  /**
   * Toggles the filter dropdown panel for a column.
   * Positions the panel below the filter icon button using getBoundingClientRect.
   * Initializes pending selections from the currently active filter state.
   */
  private _handleColumnFilter(col: ZetaTableColumn, e: MouseEvent) {
    if (this._filterPanelField === col.field) {
      this._filterPanelField = null;
    } else {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      this._filterPanelPos = { top: rect.bottom + 4, left: rect.left };
      this._filterPanelField = col.field;
      this._pendingFilterSelections = new Set(this._activeFilters[col.field] || []);
    }
  }

  /** Toggles a single filter option in the pending selections (before "Apply" is clicked) */
  private _handleFilterOptionToggle(value: string) {
    const updated = new Set(this._pendingFilterSelections);
    if (updated.has(value)) {
      updated.delete(value);
    } else {
      updated.add(value);
    }
    this._pendingFilterSelections = updated;
  }

  /** Clears all pending filter selections in the open filter panel (the "Clear" button) */
  private _clearColumnFilter() {
    this._pendingFilterSelections = new Set();
  }

  /**
   * Commits the pending filter selections as the active filter for the column.
   * Closes the filter panel and notifies the consumer via callback and CustomEvent.
   * The consumer is responsible for actually filtering the data and updating the `data` property.
   */
  private _applyColumnFilter() {
    const field = this._filterPanelField!;
    const selectedValues = [...this._pendingFilterSelections];

    if (selectedValues.length > 0) {
      this._activeFilters = { ...this._activeFilters, [field]: new Set(selectedValues) };
    } else {
      const updated = { ...this._activeFilters };
      delete updated[field];
      this._activeFilters = updated;
    }

    this._filterPanelField = null;

    this.dispatchEvent(
      new CustomEvent("columnfilter", {
        detail: { field, selectedValues },
        bubbles: true,
        composed: true
      })
    );
  }

  // ─── Column Resize ───

  /**
   * Restores the original column width on resize-handle double-click.
   * Only acts if the user has previously drag-resized this column —
   * resets to the width from the column definition (or removes the override).
   * If the column hasn't been manually resized, does nothing.
   */
  private _handleResizeDoubleClick(field: string) {
    if (!this._manuallyResizedColumns.has(field)) return;

    const col = this.columns.find(c => c.field === field);
    const updated = { ...this._columnWidths };
    if (typeof col?.width === "number") {
      updated[field] = col.width;
    } else {
      delete updated[field];
    }
    this._columnWidths = updated;
    this._manuallyResizedColumns.delete(field);
  }

  // ─── Column Search ───

  /**
   * Handles per-column search input changes.
   * Updates internal search values, resets pagination to page 1,
   * and delegates the actual filtering to the consumer via callback and CustomEvent.
   */
  private _handleColumnSearch(field: string, value: string) {
    if (value) {
      this._searchValues = { ...this._searchValues, [field]: value };
    } else {
      const s = { ...this._searchValues };
      delete s[field];
      this._searchValues = s;
    }
    if (this.paginationType === "numbered") {
      this._currentPage = 1;
    }

    this.dispatchEvent(
      new CustomEvent("columnsearch", {
        detail: { field, value, searchValues: { ...this._searchValues } },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handles global (toolbar) search input changes.
   * Resets pagination to page 1 and delegates filtering to the consumer.
   */
  private _handleGlobalSearch = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    this._globalSearchValue = value;
    if (this.paginationType === "numbered") {
      this._currentPage = 1;
    }
    this.dispatchEvent(
      new CustomEvent("tablesearch", {
        detail: { value },
        bubbles: true,
        composed: true
      })
    );
  };

  // ─── Row Selection ───

  /** Toggles selection for a single row. Respects _checkboxDisabled and disabled row guards. */
  private _handleRowSelect(row: ZetaTableRow) {
    if (row._checkboxDisabled) return;
    if (this._isRowDisabled(row) && !this.allowDisabledSelection) return;
    const newSet = new Set(this._selectedRows);
    if (newSet.has(row.id)) {
      newSet.delete(row.id);
    } else {
      newSet.add(row.id);
    }
    this._selectedRows = newSet;
    this._dispatchSelectionChange();
  }

  /**
   * Toggles selection for all displayed rows.
   * If all eligible rows are selected → deselects all. Otherwise → selects all.
   * Rows with _checkboxDisabled or disabled state (without allowDisabledSelection) are excluded.
   */
  private _handleSelectAll = () => {
    const displayed = this._getDisplayedData().filter(row => !row._checkboxDisabled && (!this._isRowDisabled(row) || this.allowDisabledSelection));
    const allSelected = displayed.every(row => this._selectedRows.has(row.id));
    const newSet = new Set(this._selectedRows);
    if (allSelected) {
      displayed.forEach(row => newSet.delete(row.id));
    } else {
      displayed.forEach(row => newSet.add(row.id));
    }
    this._selectedRows = newSet;
    this._dispatchSelectionChange();
  };

  /** Notifies the consumer of selection changes via both the callback and CustomEvent */
  private _dispatchSelectionChange() {
    const selectedIds = [...this._selectedRows];
    this.dispatchEvent(
      new CustomEvent("rowselect", {
        detail: { selectedIds },
        bubbles: true,
        composed: true
      })
    );
  }

  // ─── Column Configure Panel ───

  /** Toggles visibility of a column. Prevents hiding the last visible column. */
  private _toggleColumnVisibility(field: string) {
    const newSet = new Set(this._visibleColumns);
    if (newSet.has(field)) {
      if (newSet.size <= 1) return;
      newSet.delete(field);
    } else {
      newSet.add(field);
    }
    this._visibleColumns = newSet;
  }

  /**
   * Makes the whole column panel row clickable. The checkbox's inner label is only as wide as its
   * content, so clicks on the rest of the row land on the `<zeta-checkbox>` host itself and would
   * otherwise do nothing. Clicks on the box or label text are handled natively (via `change`).
   *
   * Only trusted clicks are forwarded: the checkbox re-dispatches a synthetic `click` on its own host
   * for every click it receives, and forwarding that too would toggle the column a second time.
   */
  private _handleColumnConfigureItemClick = (e: MouseEvent) => {
    const checkbox = e.currentTarget as ZetaCheckbox;
    if (!e.isTrusted || e.composedPath()[0] !== checkbox || checkbox.disabled) return;
    checkbox.input?.click();
  };

  /** Toggles the frozen (pinned) state of a column */
  private _toggleColumnFreeze(field: string) {
    const newSet = new Set(this._frozenColumns);
    if (newSet.has(field)) {
      newSet.delete(field);
    } else {
      newSet.add(field);
    }
    this._frozenColumns = newSet;
  }

  /** Returns whether the given column is currently frozen */
  private _isColumnFrozen(col: ZetaTableColumn): boolean {
    return this._frozenColumns.has(col.field);
  }

  // ─── Column Drag Resize ───

  /**
   * Phase 1 of 3: Initiates column drag-to-resize.
   *
   * Triggered on `mousedown` of the thin resize handle (<div>) rendered at the
   * right edge of each resizable column header.
   *
   * Captures a snapshot of the starting state (mouse X, current column width)
   * and attaches document-level listeners for the drag (Phase 2) and release (Phase 3).
   * Document-level listeners are used because the mouse can move outside the handle
   * (or even outside the table/browser) during a fast drag.
   *
   * This is a regular method (not arrow function) because it's called from the
   * template with an inline wrapper: `@mousedown=${(e) => this._handleResizeStart(e, col.field)}`.
   */
  private _handleResizeStart(e: MouseEvent, field: string) {
    // Prevent text selection and click event propagation (e.g. sort) during resize
    e.preventDefault();
    e.stopPropagation();

    this._resizingColumn = field;
    this._resizeStartX = e.clientX;

    const storedWidth = this._columnWidths[field];
    if (typeof storedWidth === "number") {
      this._resizeStartWidth = storedWidth;
    } else {
      const th = (e.target as HTMLElement).closest("th");
      this._resizeStartWidth = th ? th.offsetWidth : 150;
    }

    // Attach drag tracking listeners on document (not the handle element)
    document.addEventListener("mousemove", this._handleResizeMove);
    document.addEventListener("mouseup", this._handleResizeEnd);
  }

  /**
   * Phase 2 of 3: Tracks mouse movement during column resize drag.
   *
   * On each mousemove, calculates the pixel difference from the start position,
   * adds it to the starting width, clamps the result to the column's minimum width
   * (col.minWidth or 60px default), and updates `_columnWidths` which triggers
   * a Lit re-render to reflect the new width in the <colgroup> and header cell.
   *
   * Arrow function to preserve `this` context and to provide a stable reference
   * for addEventListener/removeEventListener (same function object for both calls).
   */
  private _handleResizeMove = (e: MouseEvent) => {
    if (!this._resizingColumn) return;
    // Calculate how many pixels the mouse has moved horizontally since drag start
    const diff = e.clientX - this._resizeStartX;
    const col = this.columns.find(c => c.field === this._resizingColumn);
    const minWidth = col?.minWidth || 60;
    // New width = starting width + drag delta, clamped to minimum
    const newWidth = Math.max(minWidth, this._resizeStartWidth + diff);
    // Immutable update triggers Lit reactive re-render
    this._columnWidths = { ...this._columnWidths, [this._resizingColumn]: newWidth };
  };

  /**
   * Phase 3 of 3: Ends the column resize drag on mouseup.
   *
   * Clears the resizing state and removes the document-level listeners
   * to stop tracking mouse movement. The final column width persists in
   * `_columnWidths` until the user resizes again or the component is destroyed.
   *
   * Arrow function for the same reasons as _handleResizeMove (stable reference + `this`).
   */
  private _handleResizeEnd = () => {
    if (this._resizingColumn) {
      this._manuallyResizedColumns.add(this._resizingColumn);
    }
    this._resizingColumn = null;
    document.removeEventListener("mousemove", this._handleResizeMove);
    document.removeEventListener("mouseup", this._handleResizeEnd);
  };

  // ─── Row Expand/Collapse ───

  /** Toggles expansion of a row's nested sub-rows. Dispatches `rowexpand` event. */
  private _toggleExpand(rowId: string | number) {
    // A disabled row takes no interaction unless allowDisabledSelection is set
    const row = this.data.find(r => r.id === rowId);
    if (row && this._isRowDisabled(row) && !this.allowDisabledSelection) return;
    const newSet = new Set(this._expandedRows);
    if (newSet.has(rowId)) {
      newSet.delete(rowId);
    } else {
      newSet.add(rowId);
    }
    this._expandedRows = newSet;
    const expanded = newSet.has(rowId);
    this.dispatchEvent(
      new CustomEvent("rowexpand", {
        detail: { rowId, expanded },
        bubbles: true,
        composed: true
      })
    );
  }

  // ─── Infinite Scroll ───

  /**
   * Creates an IntersectionObserver watching a sentinel <div> at the bottom of the table body.
   * When the sentinel enters the viewport (user has scrolled to the bottom),
   * dispatches the `loadmore` event
   * (only if not currently loading and hasMoreData is true).
   *
   * The observer uses the scroll container as its root (not the viewport) so it only
   * triggers based on table scroll position, not page scroll.
   */
  private _setupInfiniteScrollObserver() {
    this._destroyInfiniteScrollObserver();
    void this.updateComplete.then(() => {
      const sentinel = this.shadowRoot!.querySelector(".zeta-table-infinite-sentinel");
      if (!sentinel || !this._scrollContainer) return;
      this._intersectionObserver = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry?.isIntersecting && !this.loading && this.hasMoreData) {
            this.dispatchEvent(
              new CustomEvent("loadmore", {
                detail: { currentCount: this.data.length },
                bubbles: true,
                composed: true
              })
            );
          }
        },
        { root: this._scrollContainer, threshold: 0.1 }
      );
      this._intersectionObserver.observe(sentinel);
    });
  }

  /** Disconnects and cleans up the IntersectionObserver */
  private _destroyInfiniteScrollObserver() {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
  }

  // ─── Numbered Pagination ───

  /**
   * Navigates to a specific page number.
   * Validates bounds, updates internal UI state, and notifies the consumer.
   * The consumer is responsible for fetching/slicing the data for the requested page
   * and updating the `data` property.
   */
  private _navigateToPage(page: number) {
    const totalPages = this._getTotalPages();
    if (page < 1 || page > totalPages) return;
    this._currentPage = page;
    this.dispatchEvent(
      new CustomEvent("pagechange", {
        detail: { page, pageSize: this.pageSize },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Calculates total page count.
   * Uses `totalItems` if provided (recommended), otherwise falls back to `data.length`.
   * Since pagination is consumer-driven, `totalItems` should be set so the pagination
   * UI can render the correct number of pages even when `data` contains only the current page.
   */
  private _getTotalPages(): number {
    const total = this.totalItems >= 0 ? this.totalItems : this._getData().length;
    // A zero, negative or non-numeric pageSize would give Infinity/NaN pages, so fall back to one page
    if (!Number.isFinite(this.pageSize) || this.pageSize < 1) return 1;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }

  // ─── Tooltip ───

  /**
   * Shows a tooltip near the mouse cursor after a 400ms delay.
   * If ellipsisOnly is true (default), only shows when the content overflows
   * (scrollWidth > clientWidth indicates text is being truncated by CSS ellipsis).
   */
  private _showTooltip(e: MouseEvent, text: string, ellipsisOnly = true) {
    if (ellipsisOnly) {
      const target = e.currentTarget as HTMLElement;
      if (target.scrollWidth <= target.clientWidth) return;
    }
    if (this._tooltipTimer) clearTimeout(this._tooltipTimer);
    this._tooltipTimer = setTimeout(() => {
      this._tooltipText = text;
      this._tooltipX = e.clientX + 8;
      this._tooltipY = e.clientY - 30;
      this._tooltipVisible = true;
    }, 400);
  }

  /** Hides the tooltip and cancels any pending show timer */
  private _hideTooltip() {
    if (this._tooltipTimer) {
      clearTimeout(this._tooltipTimer);
      this._tooltipTimer = null;
    }
    this._tooltipVisible = false;
  }

  // ─── Export ───

  /**
   * Handles the export button click.
   * Generates a CSV from visible columns and the sorted rows in `data`, then dispatches the cancelable `tableexport` event.
   * The built-in browser download runs only if the consumer did not call `preventDefault()`, so the consumer can export its own data instead.
   */
  private _handleExport = () => {
    const visibleCols = this._getVisibleColumns();
    const data = this._getFilteredSortedData();
    const csvContent = this._generateCSV(visibleCols, data);
    const notPrevented = this.dispatchEvent(
      new CustomEvent("tableexport", {
        detail: { csv: csvContent, columns: visibleCols, data },
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (notPrevented) this._downloadCSV(csvContent);
  };

  /** Handles the refresh button click. Delegates data reload entirely to the consumer. */
  private _handleRefresh = () => {
    this.dispatchEvent(
      new CustomEvent("tablerefresh", {
        bubbles: true,
        composed: true
      })
    );
  };

  /** The name a row's checkbox is given: the text of the first column that has any, or else the row's id. */
  private _getRowLabel(row: ZetaTableRow, cols: ZetaTableColumn[]): string {
    for (const col of cols) {
      const text = this._fieldToString(row[col.field]);
      if (text) return text;
    }
    return String(row.id);
  }

  /**
   * Converts an unknown cell value to a display string. Uses the text of a DOM node (a custom cell), JSON for other objects, String() for primitives.
   * A node is never serialized: custom elements such as `zeta-avatar` point back to themselves, which JSON cannot handle.
   */
  private _fieldToString(val: unknown): string {
    if (val == null) return "";
    if (val instanceof Node) return val.textContent?.trim() ?? "";
    if (typeof val === "object") {
      try {
        return JSON.stringify(val);
      } catch {
        return "";
      }
    }
    return `${val as string | number | boolean | bigint}`;
  }

  /**
   * Quotes one CSV field. Double-quotes are escaped, and a value that a spreadsheet would read as a formula
   * (it starts with `=`, `+`, `-`, `@`, a tab or a carriage return) gets a leading `'` so it stays plain text (CSV/formula injection).
   * Pass `neutralise = false` for real numbers, so a value like `-5` is exported unchanged.
   */
  private _escapeCSVField(value: string, neutralise = true): string {
    const safe = neutralise && /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
    return `"${safe.replace(/"/g, '""')}"`;
  }

  /** Generates a CSV string with proper escaping (double-quotes for values containing quotes, formula-like values neutralised) */
  private _generateCSV(cols: ZetaTableColumn[], data: ZetaTableRow[]): string {
    const header = cols.map(c => this._escapeCSVField(c.title)).join(",");
    const rows = data.map(row =>
      cols
        .map(c => {
          const val = row[c.field];
          const str = this._fieldToString(val);
          return this._escapeCSVField(str, typeof val !== "number");
        })
        .join(",")
    );
    return [header, ...rows].join("\n");
  }

  /** Triggers a browser file download for the given CSV content using a temporary <a> element */
  private _downloadCSV(csv: string) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `table-export-${Date.now()}.csv`;
    link.click();
    // Delay revocation so the browser can initiate the download before the blob URL is freed
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // ─── Data Processing Pipeline ───

  /** Returns only the columns that are currently toggled visible in the column configure panel */
  private _getVisibleColumns(): ZetaTableColumn[] {
    return this.columns.filter(c => this._visibleColumns.has(c.field));
  }

  /**
   * Returns a shallow copy of the raw data array.
   * This is the starting point of the pipeline: sorting, searching, filtering and paging run on the copy
   * (see `_getFilteredSortedData`), unless `data` is one page of a larger collection (`totalItems`),
   * in which case the consumer does them and the table renders the page it receives.
   */
  private _getData(): ZetaTableRow[] {
    return [...this.data];
  }

  /**
   * True when `data` holds the whole collection, so the table can sort and page it itself.
   * It is false when `totalItems` is larger than `data`: then `data` is one page that the consumer fetched,
   * and the consumer sorts the whole collection (from the `sortchange` event) before it cuts out that page.
   */
  private get _holdsWholeCollection(): boolean {
    return this.totalItems < 0 || this.totalItems <= this.data.length;
  }

  /**
   * Returns the rows in the current sort order, before pagination.
   *
   * The sort covers every row in `data`, not only the rows on the current page, like the global search does.
   * It is skipped when there is no sort, when `data` is only one page of a larger collection (see `_holdsWholeCollection`),
   * or when the consumer took over the sort by calling `preventDefault()` on `sortchange`.
   */
  private _getFilteredSortedData(): ZetaTableRow[] {
    const { field, direction } = this._sortState;
    if (!field || !direction || this._consumerSorts || !this._holdsWholeCollection) return this._getData();
    // Render asks for the rows several times, so the sorted rows are kept until the data or the sort changes
    const cache = this._sortedCache;
    if (cache && cache.source === this.data && cache.length === this.data.length && cache.field === field && cache.direction === direction) return cache.rows;
    const rows = this._getData().sort((a, b) => this._compareRows(a, b, field, direction));
    this._sortedCache = { source: this.data, length: this.data.length, field, direction, rows };
    return rows;
  }

  /** Reduces a cell value to something comparable. Nodes (custom cells) compare by their text, empty values compare as `null`. */
  private _toSortable(val: unknown): string | number | null {
    if (val == null || val === "") return null;
    if (typeof val === "number") return Number.isNaN(val) ? null : val;
    if (typeof val === "boolean") return val ? 1 : 0;
    if (val instanceof Date) return val.getTime();
    if (val instanceof Node) return val.textContent?.trim() || null;
    return this._fieldToString(val);
  }

  /** Compares two rows by a column. Numbers compare as numbers, text compares by natural order ("Row 2" before "Row 10"), and empty cells always go last. */
  private _compareRows(a: ZetaTableRow, b: ZetaTableRow, field: string, direction: "asc" | "desc"): number {
    const aVal = this._toSortable(a[field]);
    const bVal = this._toSortable(b[field]);
    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;
    const result = typeof aVal === "number" && typeof bVal === "number" ? aVal - bVal : SORT_COLLATOR.compare(String(aVal), String(bVal));
    return direction === "asc" ? result : -result;
  }

  /**
   * Returns the data to render on screen.
   * With numbered pagination, and the whole collection in `data`, this is the current page of the sorted rows.
   * When `data` is one page from the consumer (`totalItems` is larger), it is rendered as it is.
   */
  private _getDisplayedData(): ZetaTableRow[] {
    const rows = this._getFilteredSortedData();
    if (this.paginationType !== "numbered" || !this._holdsWholeCollection) return rows;
    const page = Math.min(Math.max(this._currentPage, 1), this._getTotalPages());
    const start = (page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  // ─── Frozen Column Helpers ───

  /**
   * Calculates the CSS `left` offset for a frozen column.
   * Sums the widths of all frozen columns before this one, plus the
   * fixed-width checkbox and expand columns if present. The fixed-width columns are
   * token-driven (`--_table-select-col-width`, `--_table-expand-col-width`), so the offset is a CSS `calc()`.
   */
  private _getFrozenLeftOffset(colIndex: number): string {
    const visibleCols = this._getVisibleColumns();
    let pixels = 0;
    const parts: string[] = [];
    if (this.selectable) parts.push("var(--_table-select-col-width)");
    if (this.expandable) parts.push("var(--_table-expand-col-width)");
    for (let i = 0; i < colIndex; i++) {
      const col = visibleCols[i];
      if (!this._isColumnFrozen(col)) continue;
      const resized = this._columnWidths[col.field];
      if (typeof resized === "number") {
        pixels += resized;
      } else if (typeof col.width === "number") {
        pixels += col.width;
      } else if (typeof col.width === "string" && /^\d*\.?\d+(px|rem|em|vw|ch)$/.test(col.width.trim())) {
        // An absolute CSS length can go straight into calc()
        parts.push(col.width.trim());
      } else {
        // A percentage or an unset width depends on the table's layout, so use the rendered header cell's width
        const th = this.shadowRoot?.querySelector<HTMLElement>(`th[data-field="${CSS.escape(col.field)}"]`);
        pixels += th?.offsetWidth || 150;
      }
    }
    parts.push(`${pixels}px`);
    return `calc(${parts.join(" + ")})`;
  }

  /**
   * Returns true if this is the rightmost frozen column.
   * Used to apply a shadow on the right edge to visually separate
   * frozen columns from the scrollable area.
   */
  private _isLastFrozen(colIndex: number): boolean {
    const visibleCols = this._getVisibleColumns();
    for (let i = colIndex + 1; i < visibleCols.length; i++) {
      if (this._isColumnFrozen(visibleCols[i])) return false;
    }
    return true;
  }

  // ─── Render Methods ───

  /**
   * Main render method — assembles the complete table DOM structure.
   *
   * Layout hierarchy:
   *   .zeta-table-wrapper
   *     ├── Header bar (title, data count, search, toolbar buttons)
   *     ├── .zeta-table-scroll (scrollable container)
   *     │     ├── <table>
   *     │     │     ├── <colgroup> (column widths)
   *     │     │     ├── <thead> (header row + optional search row)
   *     │     │     └── <tbody> (data rows or no-data message + optional loading row)
   *     │     └── Infinite scroll sentinel (hidden <div> observed by IntersectionObserver)
   *     ├── Pagination footer (numbered mode only)
   *     ├── Tooltip overlay
   *     ├── Action menu overlay
   *     └── Filter panel overlay
   */
  protected override render() {
    const visibleCols = this._getVisibleColumns();
    const displayedData = this._getDisplayedData();
    const hasSearch = this.columnSearchable && visibleCols.some(c => c.filterable !== false && !c.disabled);

    return html`
      <div class="zeta-table-wrapper">
        ${this._renderHeaderBar()}
        <div class=${classMap({ "zeta-table-scroll": true, "zeta-table-scroll--paginated": this.paginationType === "numbered" && this.hasFooter })}>
          <table class="zeta-table">
            ${this._renderColgroup(visibleCols)}
            <thead class="zeta-table-thead">
              ${this._renderHeaderRow(visibleCols)} ${hasSearch ? this._renderSearchRow(visibleCols) : nothing}
            </thead>
            <tbody class="zeta-table-tbody">
              ${
                displayedData.length > 0
                  ? displayedData.map((row, idx) => this._renderDataRow(row, visibleCols, idx))
                  : html`<tr class="zeta-table-row">
                      <td colspan="${this._getTotalColspan(visibleCols)}" class="zeta-table-td zeta-table-no-data">
                        <slot name="no-data">${this.noDataContent ?? "No data available"}</slot>
                      </td>
                    </tr>`
              }
              ${
                this.paginationType === "infinite" && (this.loading || this._dataLengthWhenLoadingStarted >= 0)
                  ? html`<tr class="zeta-table-loading-row">
                      <td colspan="${this._getTotalColspan(visibleCols)}" class="zeta-table-td">
                        <slot name="loading">${this.loadingContent ?? "Loading more data..."}</slot>
                      </td>
                    </tr>`
                  : nothing
              }
            </tbody>
          </table>
          ${this.paginationType === "infinite" ? html`<div class="zeta-table-infinite-sentinel"></div>` : nothing}
        </div>
        ${this.paginationType === "numbered" ? this._renderPagination() : nothing} ${this._renderTooltip()} ${this._renderActionMenuOverlay()}
        ${this._renderFilterPanel()}
      </div>
    `;
  }

  /**
   * Renders the toolbar bar above the table.
   * Left side: table title, data count badge ("5 out of 51"), selection info.
   * Right side: global search input, refresh button, export button, column configure button.
   * Only renders if at least one left or right element is configured.
   */
  private _renderHeaderBar() {
    const displayedCount = this._getDisplayedData().length;
    const totalData = this.totalItems >= 0 ? this.totalItems : this.data.length;
    const selectedCount = this._selectedRows.size;
    const hasLeft = this.tableTitle || this.showDataCount || (this.hasSelectedCount && selectedCount > 0);
    const hasControlsSlot = !!this.querySelector(":scope > [slot='controls']");
    const hasRight = this.searchable || this.refreshable || this.exportable || this.columnConfigure || hasControlsSlot;

    if (!this.hasControl || (!hasLeft && !hasRight)) return nothing;

    return html`
      <div class="zeta-table-header-bar">
        <div class="zeta-table-header-bar-left">
          ${this.tableTitle ? html`<span class="zeta-table-title">${this.tableTitle}</span>` : nothing}
          ${
            this.showDataCount || this.hasSelectedCount
              ? html`<div class="zeta-table-header-meta">
                  ${this.showDataCount ? html`<span class="zeta-table-data-count">${displayedCount} out of ${totalData}</span>` : nothing}
                  ${
                    this.hasSelectedCount
                      ? html`<span class="zeta-table-selected-count" role="status" aria-live="polite" aria-atomic="true">
                          ${
                            selectedCount > 0
                              ? html`<zeta-label class="zeta-table-selection-info" status="info" .rounded=${this._isRounded}>
                                  ${msg(str`${selectedCount} selected`)}
                                </zeta-label>`
                              : nothing
                          }
                        </span>`
                      : nothing
                  }
                </div>`
              : nothing
          }
        </div>
        <div class="zeta-table-header-bar-right">
          ${
            this.searchable
              ? html`<zeta-search
                  class="zeta-table-global-search"
                  size="small"
                  hasIcon
                  shape=${this._isRounded ? "rounded" : "sharp"}
                  placeholder=${this.searchPlaceholder}
                  .value=${this._globalSearchValue}
                  @input=${this._handleGlobalSearch}
                ></zeta-search>`
              : nothing
          }
          ${
            this.refreshable
              ? html`<zeta-icon-button
                  class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon"
                  flavor="outline-subtle"
                  size="small"
                  shape=${this._isRounded ? "rounded" : "sharp"}
                  title=${this.refreshLabel}
                  aria-label=${this.refreshLabel}
                  @click=${this._handleRefresh}
                  >refresh</zeta-icon-button
                >`
              : nothing
          }
          ${
            this.exportable
              ? html`<zeta-icon-button
                  class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon"
                  flavor="outline-subtle"
                  size="small"
                  shape=${this._isRounded ? "rounded" : "sharp"}
                  title=${msg("Export to CSV")}
                  aria-label=${msg("Export to CSV")}
                  @click=${this._handleExport}
                  >download</zeta-icon-button
                >`
              : nothing
          }
          <slot name="controls"></slot>
          ${this.columnConfigure ? this._renderColumnConfigure() : nothing}
        </div>
      </div>
    `;
  }

  /** Whether the table and the components inside it use their rounded option. Any shape other than `sharp` is rounded. */
  private get _isRounded(): boolean {
    return this.shape !== "sharp";
  }

  /**
   * Renders the column configure dropdown panel.
   * Contains two sections:
   *   1. Show/Hide: checkboxes to toggle column visibility (at least one must remain)
   *   2. Freeze: checkboxes to pin columns to the left during horizontal scroll
   */
  private _renderColumnConfigure() {
    return html`
      <div class="zeta-table-column-panel-wrapper">
        <zeta-icon-button
          class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon"
          flavor="outline-subtle"
          size="small"
          shape=${this._isRounded ? "rounded" : "sharp"}
          title=${this.columnsLabel}
          aria-label=${this.columnsLabel}
          aria-haspopup="true"
          aria-expanded=${this._columnConfigureVisible ? "true" : "false"}
          @click=${(e: Event) => {
            e.stopPropagation();
            this._columnConfigureVisible = !this._columnConfigureVisible;
          }}
          >settings</zeta-icon-button
        >
        ${
          this._columnConfigureVisible
            ? html`
                <div class="zeta-table-column-panel">
                  <div class="zeta-table-column-panel-section">
                    <div class="zeta-table-column-panel-heading">${msg("Show / Hide")}</div>
                    ${this.columns.map(
                      col => html`
                        <zeta-checkbox
                          class="zeta-table-column-panel-item"
                          size="small"
                          .rounded=${this._isRounded}
                          .checked=${live(this._visibleColumns.has(col.field))}
                          ?disabled=${this._visibleColumns.has(col.field) && this._visibleColumns.size === 1}
                          @change=${() => this._toggleColumnVisibility(col.field)}
                          @click=${this._handleColumnConfigureItemClick}
                          >${col.title}</zeta-checkbox
                        >
                      `
                    )}
                  </div>
                  <div class="zeta-table-column-panel-section">
                    <div class="zeta-table-column-panel-heading">${msg("Freeze")}</div>
                    ${this.columns
                      .filter(c => this._visibleColumns.has(c.field))
                      .map(
                        col => html`
                          <zeta-checkbox
                            class="zeta-table-column-panel-item"
                            size="small"
                            .rounded=${this._isRounded}
                            .checked=${live(this._frozenColumns.has(col.field))}
                            @change=${() => this._toggleColumnFreeze(col.field)}
                            @click=${this._handleColumnConfigureItemClick}
                            >${col.title}</zeta-checkbox
                          >
                        `
                      )}
                  </div>
                </div>
              `
            : nothing
        }
      </div>
    `;
  }

  /** Renders <colgroup> to set initial column widths. Includes fixed-width cols for checkbox and expand columns. */
  private _renderColgroup(cols: ZetaTableColumn[]) {
    // prettier-ignore
    return html`<colgroup>${this.selectable ? html`<col class="zeta-table-col-checkbox-width">` : nothing}${this.expandable ? html`<col class="zeta-table-col-expand-width">` : nothing}${cols.map(col => {
      const w = this._columnWidths[col.field] ?? col.width;
      if (w == null) return html`<col>`;
      const cssWidth = typeof w === "number" ? `${w}px` : w;
      return html`<col style="width:${cssWidth}">`;
    })}</colgroup>`;
  }

  /**
   * Renders the primary header row (<tr>) containing:
   * - Select-all checkbox (if selectable)
   * - Expand column placeholder (if expandable)
   * - One <th> per visible column (with sort icons, filter icons, resize handles)
   * - Actions column header (if any row has actions)
   */
  private _renderHeaderRow(cols: ZetaTableColumn[]) {
    const displayedData = this._getDisplayedData().filter(row => !row._checkboxDisabled && (!this._isRowDisabled(row) || this.allowDisabledSelection));
    const allSelected = displayedData.length > 0 && displayedData.every(row => this._selectedRows.has(row.id));
    const someSelected = displayedData.some(row => this._selectedRows.has(row.id));

    return html`
      <tr class="zeta-table-header-row">
        ${
          this.selectable
            ? html`
                <th class="zeta-table-th zeta-table-col-checkbox zeta-table-cell--frozen zeta-table-cell--frozen-start">
                  ${
                    this.selectAll
                      ? html`<div class="zeta-table-select-cell">
                          <zeta-checkbox
                            size="small"
                            .rounded=${this._isRounded}
                            .checked=${live(allSelected)}
                            .indeterminate=${live(someSelected && !allSelected)}
                            title=${msg("Select all")}
                            @change=${this._handleSelectAll}
                            ><span class="zeta-table-visually-hidden">${msg("Select all rows")}</span></zeta-checkbox
                          >
                        </div>`
                      : nothing
                  }
                </th>
              `
            : nothing
        }
        ${
          this.expandable
            ? html`<th
                class="zeta-table-th zeta-table-col-expand zeta-table-cell--frozen ${
                  this.selectable ? "zeta-table-cell--frozen-after-checkbox" : "zeta-table-cell--frozen-start"
                }"
              ></th>`
            : nothing
        }
        ${cols.map((col, i) => this._renderHeaderCell(col, i))}
        ${
          this._showActionsColumn
            ? html`<th class="zeta-table-th zeta-table-col-actions" scope="col"><span class="zeta-table-visually-hidden">${this.actionsLabel}</span></th>`
            : nothing
        }
      </tr>
    `;
  }

  /**
   * Renders a single column header cell (<th>).
   * Includes: title text, sort icons (if sortable), filter button (if filterable),
   * and a resize handle (if resizable). Applies frozen positioning styles if the column is frozen.
   */
  private _renderHeaderCell(col: ZetaTableColumn, index: number) {
    const isFrozen = this._isColumnFrozen(col);
    const leftOffset = isFrozen ? this._getFrozenLeftOffset(index) : "";
    const isLastFrozen = isFrozen && this._isLastFrozen(index);
    const isSortable = col.sortable !== false && !col.disabled;
    const isResizable = col.resizable !== false && !col.disabled;
    const isDisabled = !!col.disabled;

    const cellClasses: Record<string, boolean> = {
      "zeta-table-th": true,
      "zeta-table-cell--frozen": isFrozen,
      "zeta-table-cell--frozen-last": isLastFrozen
    };

    const cellStyles: Record<string, string> = {};
    if (isFrozen) cellStyles.left = leftOffset;
    if (isDisabled) cellStyles.opacity = "0.5";

    const isFilterable = this.columnFilterable && col.filterable !== false && !isDisabled;

    // A sortable header exposes its sort state to assistive technology
    const sortDirection = this._sortState.field === col.field ? this._sortState.direction : null;
    const ariaSort = isSortable ? (sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : "none") : undefined;

    return html`
      <th class=${classMap(cellClasses)} style=${styleMap(cellStyles)} scope="col" data-field=${col.field} aria-sort=${ifDefined(ariaSort)}>
        <div class="zeta-table-header-content">
          ${
            isSortable
              ? html`<button type="button" class="zeta-table-header-title zeta-table-header-title--sortable" @click=${() => this._handleSort(col.field)}>
                  ${col.title}
                </button>`
              : html`<span class="zeta-table-header-title">${col.title}</span>`
          }
          ${
            isSortable
              ? html`<button type="button" class="zeta-table-sort-btn" aria-label=${msg(str`Sort by ${col.title}`)} @click=${() => this._handleSort(col.field)}>
                  ${this._renderSortIcons(col.field)}
                </button>`
              : nothing
          }
          <span class="zeta-table-header-icons">
            ${
              isFilterable
                ? html`<button
                    class="zeta-table-header-icon-btn ${this._activeFilters[col.field]?.size ? "zeta-table-header-icon-btn--active" : ""}"
                    title="Filter"
                    @click=${(e: MouseEvent) => {
                      e.stopPropagation();
                      this._handleColumnFilter(col, e);
                    }}
                  >
                    <zeta-icon class="zeta-table-filter-icon">filter</zeta-icon>
                  </button>`
                : nothing
            }
          </span>
        </div>
        ${
          isResizable
            ? html`<div
                class="zeta-table-resize-handle ${this._resizingColumn === col.field ? "zeta-table-resize-handle--active" : ""}"
                @mousedown=${(e: MouseEvent) => this._handleResizeStart(e, col.field)}
                @dblclick=${(e: MouseEvent) => {
                  e.stopPropagation();
                  this._handleResizeDoubleClick(col.field);
                }}
              ></div>`
            : nothing
        }
      </th>
    `;
  }

  /** Renders the up/down sort arrow pair. The active direction's arrow gets a highlighted CSS class. */
  private _renderSortIcons(field: string) {
    const isAsc = this._sortState.field === field && this._sortState.direction === "asc";
    const isDesc = this._sortState.field === field && this._sortState.direction === "desc";

    return html`
      <span class="zeta-table-sort-icons">
        <svg
          class="zeta-table-sort-arrow ${isAsc ? "zeta-table-sort-arrow--active" : ""}"
          viewBox="0 0 16 8"
          aria-hidden="true"
          @click=${(e: MouseEvent) => {
            e.stopPropagation();
            this._handleSortArrowClick(field, "asc");
          }}
        >
          <path
            d="M4.94193 5.17728L7.34659 2.92143C7.70869 2.58175 8.2936 2.58175 8.6557 2.92143L11.0604 5.17728C11.6453 5.726 11.2275 6.66667 10.4012 6.66667H5.59184C4.76552 6.66667 4.35701 5.726 4.94193 5.17728Z"
          />
        </svg>
        <svg
          class="zeta-table-sort-arrow ${isDesc ? "zeta-table-sort-arrow--active" : ""}"
          viewBox="0 8 16 8"
          aria-hidden="true"
          @click=${(e: MouseEvent) => {
            e.stopPropagation();
            this._handleSortArrowClick(field, "desc");
          }}
        >
          <path
            d="M4.94193 10.8227L7.34659 13.0786C7.70869 13.4183 8.2936 13.4183 8.6557 13.0786L11.0604 10.8227C11.6453 10.274 11.2275 9.33333 10.4012 9.33333H5.59184C4.76552 9.33333 4.35701 10.274 4.94193 10.8227Z"
          />
        </svg>
      </span>
    `;
  }

  /**
   * Renders the per-column search input row (second header row).
   * Only shown when `columnSearchable` is true.
   * Each column gets a text input unless disabled or filterable=false.
   */
  private _renderSearchRow(cols: ZetaTableColumn[]) {
    return html`
      <tr class="zeta-table-search-row">
        ${this.selectable ? html`<th class="zeta-table-th zeta-table-col-checkbox zeta-table-cell--frozen zeta-table-cell--frozen-start"></th>` : nothing}
        ${
          this.expandable
            ? html`<th
                class="zeta-table-th zeta-table-col-expand zeta-table-cell--frozen ${
                  this.selectable ? "zeta-table-cell--frozen-after-checkbox" : "zeta-table-cell--frozen-start"
                }"
              ></th>`
            : nothing
        }
        ${cols.map((col, i) => {
          const isFrozen = this._isColumnFrozen(col);
          const leftOffset = isFrozen ? this._getFrozenLeftOffset(i) : "";
          const isLastFrozen = isFrozen && this._isLastFrozen(i);
          const cellClasses = { "zeta-table-cell--frozen": isFrozen, "zeta-table-cell--frozen-last": isLastFrozen };
          const cellStyles: Record<string, string> = {};
          if (isFrozen) cellStyles.left = leftOffset;

          const isSearchable = col.filterable !== false && !col.disabled;

          return html`
            <th class="zeta-table-th ${classMap(cellClasses)}" style=${styleMap(cellStyles)}>
              ${
                isSearchable
                  ? html`<input
                      type="text"
                      class="zeta-table-search-input"
                      placeholder="Search..."
                      .value=${this._searchValues[col.field] || ""}
                      @input=${(e: InputEvent) => this._handleColumnSearch(col.field, (e.target as HTMLInputElement).value)}
                    />`
                  : col.filterable !== false
                    ? html`<input type="text" class="zeta-table-search-input" disabled placeholder="—" />`
                    : nothing
              }
            </th>
          `;
        })}
        ${this._showActionsColumn ? html`<th class="zeta-table-th zeta-table-col-actions"></th>` : nothing}
      </tr>
    `;
  }

  /**
   * Renders a single data row (<tr>) with conditional CSS classes for:
   * clickable, selected, active (last-clicked), and disabled states.
   * Includes checkbox cell, expand button cell, data cells, and actions cell.
   * If the row is expanded and has nested data, renders nested sub-rows below it.
   */
  private _renderDataRow(row: ZetaTableRow, cols: ZetaTableColumn[], rowIndex: number) {
    const isSelected = this._selectedRows.has(row.id);
    const isExpanded = this._expandedRows.has(row.id);
    const hasNested = this.expandable && row._nested != null && (row._nested instanceof Node || (Array.isArray(row._nested) && row._nested.length > 0));
    const isDisabled = this._isRowDisabled(row);
    const isActive = this._activeRow === row.id;
    const clickable = this._isClickable();

    const rowClasses: Record<string, boolean> = {
      "zeta-table-row": true,
      "zeta-table-row--clickable": clickable && (!isDisabled || this.allowDisabledSelection),
      "zeta-table-row--selected": isSelected,
      "zeta-table-row--active": isActive,
      "zeta-table-row--disabled": isDisabled
    };

    return html`
      <tr class=${classMap(rowClasses)} @click=${(e: MouseEvent) => this._handleRowClick(row, rowIndex, e)}>
        ${
          this.selectable
            ? html`
                <td class="zeta-table-td zeta-table-col-checkbox zeta-table-cell--frozen zeta-table-cell--frozen-start">
                  <div class="zeta-table-select-cell">
                    <zeta-checkbox
                      size="small"
                      .rounded=${this._isRounded}
                      .checked=${live(isSelected)}
                      ?disabled=${!!row._checkboxDisabled || (isDisabled && !this.allowDisabledSelection)}
                      @change=${() => this._handleRowSelect(row)}
                      ><span class="zeta-table-visually-hidden">${msg(str`Select row: ${this._getRowLabel(row, cols)}`)}</span></zeta-checkbox
                    >
                  </div>
                </td>
              `
            : nothing
        }
        ${
          this.expandable
            ? html`
                <td
                  class="zeta-table-td zeta-table-col-expand zeta-table-cell--frozen ${this.selectable ? "zeta-table-cell--frozen-after-checkbox" : "zeta-table-cell--frozen-start"}"
                >
                  ${
                    hasNested
                      ? html`
                          <button
                            class="zeta-table-expand-btn ${isExpanded ? "zeta-table-expand-btn--expanded" : ""}"
                            ?disabled=${isDisabled && !this.allowDisabledSelection}
                            @click=${() => this._toggleExpand(row.id)}
                            title="${isExpanded ? "Collapse" : "Expand"}"
                          >
                            <zeta-icon>chevron_right</zeta-icon>
                          </button>
                        `
                      : nothing
                  }
                </td>
              `
            : nothing
        }
        ${cols.map((col, i) => this._renderDataCell(row, col, i, rowIndex))} ${this._showActionsColumn ? this._renderActionsCell(row) : nothing}
      </tr>
      ${isExpanded && hasNested ? this._renderNestedRows(row, cols) : nothing}
    `;
  }

  /**
   * Resolves the action menu items for a specific row.
   * Priority: row._actions (explicit null hides menu) → row._actions array → global rowActions fallback.
   */
  private _getActionsForRow(row: ZetaTableRow): ZetaTableAction[] | null {
    if (row._actions === null) return null;
    if (row._actions && row._actions.length > 0) return row._actions;
    return this.rowActions.length > 0 ? this.rowActions : null;
  }

  /** Renders the actions (kebab menu) cell for a row. Shows a three-dot button if the row has actions. */
  private _renderActionsCell(row: ZetaTableRow) {
    const actions = this._getActionsForRow(row);
    const hasActions = actions && actions.length > 0;
    const isOpen = this._actionMenuRowId === row.id;

    return html`
      <td class="zeta-table-td zeta-table-col-actions">
        ${
          hasActions
            ? html`
                <div class="zeta-table-action-wrapper">
                  <button
                    type="button"
                    class="zeta-table-action-btn ${isOpen ? "zeta-table-action-btn--active" : ""}"
                    title=${this.actionsLabel}
                    aria-label=${this.actionsLabel}
                    aria-haspopup="menu"
                    aria-expanded=${isOpen ? "true" : "false"}
                    ?disabled=${this._isRowDisabled(row) && !this.allowDisabledSelection}
                    @click=${(e: MouseEvent) => {
                      e.stopPropagation();
                      this._toggleActionMenu(row.id, e);
                    }}
                  >
                    <zeta-icon>more_vertical</zeta-icon>
                  </button>
                </div>
              `
            : nothing
        }
      </td>
    `;
  }

  /**
   * Renders the column filter dropdown panel (positioned absolutely near the filter icon).
   * Shows a list of checkboxes for each filter option, plus Clear and Apply buttons.
   * Options come from column.filterOptions or are auto-populated from the data.
   */
  private _renderFilterPanel() {
    if (!this._filterPanelField) return nothing;

    const col = this.columns.find(c => c.field === this._filterPanelField);
    if (!col) return nothing;

    const options = col.filterOptions || [
      ...new Set(
        this.data
          .map(row => {
            const v = row[col.field];
            return this._fieldToString(v);
          })
          .filter(v => v)
      )
    ];

    return html`
      <div class="zeta-table-filter-panel" style="top:${this._filterPanelPos.top}px; left:${this._filterPanelPos.left}px;">
        <div class="zeta-table-filter-panel-header">
          <span>Filter: ${col.title}</span>
        </div>
        <div class="zeta-table-filter-panel-list">
          ${options.map(
            opt => html`
              <zeta-checkbox
                class="zeta-table-filter-panel-item"
                size="small"
                .rounded=${this._isRounded}
                .checked=${live(this._pendingFilterSelections.has(opt))}
                @change=${() => this._handleFilterOptionToggle(opt)}
                >${opt}</zeta-checkbox
              >
            `
          )}
        </div>
        <div class="zeta-table-filter-panel-footer">
          <button class="zeta-table-filter-panel-btn zeta-table-filter-panel-btn--clear" @click=${() => this._clearColumnFilter()}>Clear</button>
          <button class="zeta-table-filter-panel-btn zeta-table-filter-panel-btn--apply" @click=${() => this._applyColumnFilter()}>Apply</button>
        </div>
      </div>
    `;
  }

  /**
   * Renders the action menu dropdown overlay (positioned absolutely near the kebab button).
   * Contains a list of action buttons for the active row.
   */
  private _renderActionMenuOverlay() {
    if (this._actionMenuRowId === null) return nothing;

    const displayed = this._getDisplayedData();
    const row = displayed.find(r => r.id === this._actionMenuRowId);
    if (!row) return nothing;
    const rowIndex = displayed.indexOf(row);
    const actions = this._getActionsForRow(row);
    if (!actions || actions.length === 0) return nothing;

    return html`
      <div class="zeta-table-action-menu zeta-table-action-menu--open" style="top:${this._actionMenuPos.top}px; left:${this._actionMenuPos.left}px;">
        ${actions.map(
          action => html`
            <button
              class="zeta-table-action-menu-item ${action.disabled ? "zeta-table-action-menu-item--disabled" : ""}"
              ?disabled=${action.disabled}
              @click=${(e: MouseEvent) => {
                e.stopPropagation();
                this._handleActionClick(action.key, row, rowIndex);
              }}
            >
              ${
                action.icon
                  ? html`<span class="zeta-table-action-icon" aria-hidden="true"
                      >${/^[a-z0-9_]+$/.test(action.icon) ? html`<zeta-icon>${action.icon}</zeta-icon>` : action.icon}</span
                    >`
                  : nothing
              }
              <span class="zeta-table-action-label">${action.label}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  /**
   * Toggles the action menu for a row.
   * Calculates viewport-aware positioning: prefers below the button, falls back
   * to above if there isn't enough space below, or uses a safe fallback position.
   */
  private _toggleActionMenu(rowId: string | number, e: MouseEvent) {
    if (this._actionMenuRowId === rowId) {
      this._actionMenuRowId = null;
    } else {
      const btn = e.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const row = this.data.find(r => r.id === rowId);
      // A disabled row takes no actions unless allowDisabledSelection is set
      if (row && this._isRowDisabled(row) && !this.allowDisabledSelection) return;
      const actions = row ? this._getActionsForRow(row) : this.rowActions;
      const itemCount = actions?.length || 0;
      const menuHeight = itemCount * 36 + 8;
      const maxMenuHeight = 200;
      const estimatedHeight = Math.min(menuHeight, maxMenuHeight);

      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      let top: number;
      if (spaceBelow >= estimatedHeight) {
        top = rect.bottom + 4;
      } else if (spaceAbove >= estimatedHeight) {
        top = rect.top - estimatedHeight - 4;
      } else {
        top = Math.max(8, viewportHeight - maxMenuHeight - 8);
      }

      // Keep the menu (about 160px wide) inside the viewport
      const menuWidth = 160;
      const left = Math.max(8, Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 8));
      this._actionMenuPos = { top, left };
      this._actionMenuRowId = rowId;
      this._activeRow = rowId;
    }
  }

  /** Handles click on a specific action menu item. Closes the menu and notifies the consumer. */
  private _handleActionClick(actionKey: string, row: ZetaTableRow, rowIndex: number) {
    this._actionMenuRowId = null;
    this.dispatchEvent(
      new CustomEvent("rowaction", {
        detail: { actionKey, row, rowIndex },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Renders a single data cell (<td>).
   *
   * Two rendering paths:
   * 1. DOM Node values: rendered directly inside
   *    a `.zeta-table-cell-inner` wrapper without text truncation.
   * 2. Text values: wrapped in `.zeta-table-cell-inner` > `.zeta-table-cell-content`
   *    with CSS ellipsis truncation and optional tooltip on hover.
   *
   * Applies frozen column positioning if the column is pinned.
   */
  private _renderDataCell(row: ZetaTableRow, col: ZetaTableColumn, index: number, rowIndex: number) {
    const isFrozen = this._isColumnFrozen(col);
    const leftOffset = isFrozen ? this._getFrozenLeftOffset(index) : "";
    const isLastFrozen = isFrozen && this._isLastFrozen(index);
    const rawValue = row[col.field];
    const slotName = `cell-${col.field}-${rowIndex}`;
    const rowSlotName = `cell-${col.field}-row-${row.id}`;

    const cellClasses: Record<string, boolean> = {
      "zeta-table-td": true,
      "zeta-table-td--data": true,
      "zeta-table-cell--frozen": isFrozen,
      "zeta-table-cell--frozen-last": isLastFrozen
    };
    const cellStyles: Record<string, string> = {};
    if (isFrozen) cellStyles.left = leftOffset;

    if (rawValue instanceof Node) {
      return html`
        <td class=${classMap(cellClasses)} style=${styleMap(cellStyles)}>
          <div class="zeta-table-cell-inner">${rawValue}</div>
        </td>
      `;
    }

    const cellValue = this._fieldToString(rawValue);
    const tooltipEnabled = col.tooltip === true || col.tooltipOnEllipsisOnly !== false;
    const ellipsisOnly = col.tooltip !== true;

    return html`
      <td class=${classMap(cellClasses)} style=${styleMap(cellStyles)}>
        <div class="zeta-table-cell-inner">
          <slot name=${rowSlotName}>
            <slot name=${slotName}>
              <span
                class="zeta-table-cell-content"
                @mouseenter=${tooltipEnabled ? (e: MouseEvent) => this._showTooltip(e, cellValue, ellipsisOnly) : nothing}
                @mouseleave=${tooltipEnabled ? () => this._hideTooltip() : nothing}
                @mousemove=${
                  tooltipEnabled
                    ? (e: MouseEvent) => {
                        if (this._tooltipVisible) {
                          this._tooltipX = e.clientX + 8;
                          this._tooltipY = e.clientY - 30;
                        }
                      }
                    : nothing
                }
              >
                ${cellValue}
              </span>
            </slot>
          </slot>
        </div>
      </td>
    `;
  }

  /**
   * Renders nested/expandable content inside a full-width <td> below the parent row.
   *
   * Two rendering modes:
   * 1. **DOM Node**: If `_nested` is a Node (e.g. a React portal container, an <img>,
   *    or any custom element), it is rendered directly as-is. This gives consumers
   *    full control over the nested view.
   * 2. **Array of ZetaTableRow**: Columns are derived from the keys of the first item
   *    in the array (excluding underscore-prefixed internal keys like _nested, _disabled).
   *    This means nested rows can have entirely different columns from the parent table.
   */
  private _renderNestedRows(row: ZetaTableRow, cols: ZetaTableColumn[]) {
    const nested = row._nested;
    const colSpan = this._getTotalColspan(cols);

    // Mode 1: Consumer-provided DOM Node — render as-is
    if (nested instanceof Node) {
      return html`
        <tr class="zeta-table-nested-row">
          <td class="zeta-table-td" colspan="${colSpan}">
            <div class="zeta-table-nested-content">${nested}</div>
          </td>
        </tr>
      `;
    }

    // Mode 2: Array of row objects — derive columns from the first item's keys
    const nestedData = nested || [];
    if (nestedData.length === 0) return nothing;

    const nestedKeys = Object.keys(nestedData[0]).filter(k => !k.startsWith("_"));

    return html`
      <tr class="zeta-table-nested-row">
        <td class="zeta-table-td" colspan="${colSpan}">
          <div class="zeta-table-nested-content">
            <table class="zeta-table-nested-table">
              <thead>
                <tr>
                  ${nestedKeys.map(key => html`<th class="zeta-table-nested-th">${key}</th>`)}
                </tr>
              </thead>
              <tbody>
                ${nestedData.map(
                  child => html`
                    <tr>
                      ${nestedKeys.map(key => {
                        const val = child[key];
                        return html`<td class="zeta-table-nested-td">${val instanceof Node ? val : this._fieldToString(val)}</td>`;
                      })}
                    </tr>
                  `
                )}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    `;
  }

  /**
   * Renders the footer for numbered pagination mode.
   * Includes: the page summary text, the rows-per-page select (`hasRowsPerPage`) and a `zeta-pagination` control.
   * Not rendered when `hasFooter` is off.
   */
  private _renderPagination() {
    if (!this.hasFooter) return nothing;

    const rounded = this._isRounded;
    const totalPages = this._getTotalPages();
    const totalItems = this.totalItems >= 0 ? this.totalItems : this._getData().length;
    const rangeStart = totalItems === 0 ? 0 : (this._currentPage - 1) * this.pageSize + 1;
    const rangeEnd = Math.min(this._currentPage * this.pageSize, totalItems);
    const pageSizes = [...new Set([10, 20, 50, 100, this.pageSize])].sort((a, b) => a - b);

    return html`
      <div class="zeta-table-footer">
        <div class="zeta-table-page-info">
          <span class="zeta-table-page-details">${msg(str`Showing ${rangeStart}-${rangeEnd} of ${totalItems}`)}</span>
          ${
            this.hasRowsPerPage
              ? html`<div class="zeta-table-rows-per-page">
                  <span>${msg("Rows per page")}</span>
                  <zeta-select-input
                    class="zeta-table-page-size-select"
                    size="small"
                    .rounded=${rounded}
                    .fixedDropdown=${true}
                    dropdownplacement="auto"
                    .value=${String(this.pageSize)}
                    aria-label=${msg("Rows per page")}
                    @change=${this._handlePageSizeChange}
                  >
                    ${pageSizes.map(size => html`<zeta-option value=${String(size)} ?selected=${size === this.pageSize}>${size}</zeta-option>`)}
                  </zeta-select-input>
                </div>`
              : nothing
          }
        </div>
        <zeta-pagination
          class="zeta-table-pagination"
          outline
          .rounded=${rounded}
          .totalPages=${totalPages}
          .currentPage=${this._currentPage}
          @pageChange=${this._handlePaginationChange}
        ></zeta-pagination>
      </div>
    `;
  }

  /**
   * Handles the pagination control changing page.
   * The control's own `pageChange` event is stopped here, so consumers only get the table's `pagechange` event (with `page` and `pageSize`).
   */
  private _handlePaginationChange = (e: Event) => {
    e.stopPropagation();
    this._navigateToPage((e as CustomEvent<{ page: number }>).detail.page);
  };

  /** Handles the rows-per-page select changing. Returns to page 1 and notifies the consumer via `pagechange`. */
  private _handlePageSizeChange = (e: Event) => {
    e.stopPropagation();
    const size = Number((e.target as ZetaSelectInput).value);
    if (!Number.isFinite(size) || size <= 0) return;
    this.pageSize = size;
    this._currentPage = 1;
    this._navigateToPage(1);
  };

  /** Renders the floating tooltip element. Visibility and position are controlled by state. */
  private _renderTooltip() {
    const tooltipStyles = {
      left: `${this._tooltipX}px`,
      top: `${this._tooltipY}px`
    };
    return html`
      <div class="zeta-table-tooltip ${this._tooltipVisible ? "zeta-table-tooltip--visible" : ""}" style=${styleMap(tooltipStyles)}>${this._tooltipText}</div>
    `;
  }

  /** Calculates the total colspan needed for full-width rows (no-data, loading). Accounts for checkbox, expand, and actions columns. */
  private _getTotalColspan(cols: ZetaTableColumn[]): number {
    let count = cols.length;
    if (this.selectable) count++;
    if (this.expandable) count++;
    if (this._showActionsColumn) count++;
    return count;
  }
}

/**
 * TypeScript global augmentation: registers "zeta-table" in the HTMLElementTagNameMap
 * so that document.createElement("zeta-table") and querySelector("zeta-table")
 * return the correct ZetaTable type.
 */
declare global {
  interface HTMLElementTagNameMap {
    "zeta-table": ZetaTable;
  }
}
