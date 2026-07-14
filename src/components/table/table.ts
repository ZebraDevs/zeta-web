import { LitElement, html, nothing } from "lit";
import type { PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./table.styles.js";

/**
 * Defines a single column in the table.
 * Each column maps to a `field` key in the row data objects.
 * Consumers pass an array of these to configure headers, sorting, filtering, freezing, and tooltips.
 */
export interface ZetaTableColumn {
  /** Data key — must match a property name in each ZetaTableRow object */
  field: string;
  /** Display text shown in the column header */
  title: string;
  /**
   * Initial column width (overridden by user drag-resize).
   * - **Number**: treated as pixels, e.g. `width: 200` → `200px`
   * - **String**: used as-is as a CSS value, e.g. `width: "25%"`, `width: "12rem"`
   *
   * When the user drag-resizes a column, the width is converted to pixels regardless of the original unit.
   */
  width?: number | string;
  /** Minimum width in pixels during resize (default: 60) */
  minWidth?: number;
  /** Enable sorting on this column (default: true) */
  sortable?: boolean;
  /** Enable filter input on this column (default: true) */
  filterable?: boolean;
  /** Predefined filter options for this column (shown in a dropdown when filter icon is clicked) */
  filterOptions?: string[];
  /** Freeze this column for horizontal scroll */
  frozen?: boolean;
  /** Column visibility (default: true) */
  visible?: boolean;
  /** Always show tooltip on hover regardless of overflow. When `true`, takes highest precedence. When `false` or unset, defers to `tooltipOnEllipsisOnly`. */
  tooltip?: boolean;
  /** Show tooltip only when content overflows/ellipsis is shown (default: true). Set to `false` to disable tooltip for this column. */
  tooltipOnEllipsisOnly?: boolean;
  /** Allow resizing this column (default: true) */
  resizable?: boolean;
  /** Disable all interaction on this column */
  disabled?: boolean;
}

/** Sort direction: ascending, descending, or cleared (null = unsorted) */
export type SortDirection = "asc" | "desc" | null;

/**
 * Internal sort tracking. `clickCount` drives the 3-state cycle:
 * 1st click → asc, 2nd → desc, 3rd → reset to unsorted.
 */
export interface SortState {
  field: string;
  direction: SortDirection;
  clickCount: number;
}

/**
 * Pagination strategy:
 * - "none": all data rendered at once (no pagination)
 * - "numbered": traditional page navigation with prev/next and page numbers
 * - "infinite": auto-load more data via IntersectionObserver when user scrolls to the bottom
 */
export type PaginationType = "none" | "numbered" | "infinite";

/**
 * Defines a single item in the per-row action (kebab) menu.
 * Consumers provide these via `rowActions` (global fallback) or `row._actions` (per-row override).
 */
export interface ZetaTableAction {
  /** Unique key for this action — passed to onRowAction callback to identify which action was clicked */
  key: string;
  /** Display label shown in the menu dropdown */
  label: string;
  /** Optional icon (SVG string or emoji) rendered before the label */
  icon?: string;
  /** Whether this action is disabled for a specific row (checked at render time) */
  disabled?: boolean;
}

/**
 * Represents a single row of data in the table.
 * Must have a unique `id`. All other keys map to column `field` values.
 * Supports special underscore-prefixed properties for row-level behavior.
 */
export interface ZetaTableRow {
  /** Unique identifier for this row — used for selection tracking, expansion, and action dispatch */
  id: string | number;
  /** Data fields — keys should match column `field` names. Values can be strings, numbers, or DOM Nodes (for custom cell rendering). */
  [key: string]: unknown;
  /**
   * Nested content shown when the row is expanded.
   * - `ZetaTableRow[]`: Array of child rows — columns are auto-derived from the first item's keys.
   * - `Node`: A DOM element rendered as-is, allowing consumers to provide fully custom nested views (images, components, etc.).
   */
  _nested?: ZetaTableRow[] | Node;
  /** Disable this row (grey out, no interaction unless allowDisabledSelection is set) */
  _disabled?: boolean;
  /** Disable only the checkbox for this row (row itself remains interactive) */
  _checkboxDisabled?: boolean;
  /** Per-row action menu items. Pass `null` to hide the kebab menu for this specific row, or omit to use the global `rowActions` fallback. */
  _actions?: ZetaTableAction[] | null;
}

/**
 * A full-featured, highly configurable data table component.
 *
 * ## Features
 * - **Sorting**: 3-state per-column sort indicator (asc → desc → none). Sorting is delegated to the consumer via `onSortChange`. Configurable per column via `sortable`.
 * - **Column Search**: Optional per-column search inputs. Enabled when `onColumnSearch` callback is provided.
 * - **Column Filter**: Optional per-column filter dropdown with checkboxes (Clear/Apply). Enabled when `onColumnFilter` is provided. Options via `filterOptions` on column or auto-populated from data.
 * - **Global Search**: Optional search bar in header. Enabled when `onTableSearch` callback is provided.
 * - **Selection**: Checkbox column with select-all. Optional `selectOnRowClick` for click-to-select.
 * - **Row Click**: Optional `onRowClick` callback. Rows show pointer cursor and highlight on click.
 * - **Disabled Rows**: Rows can be disabled via `disabledRows` array or `_disabled` property. Use `allowDisabledSelection` to allow selection/actions on disabled rows.
 * - **Frozen Columns**: Columns can be frozen via `frozen` property or the column configure panel.
 * - **Column Resizing**: Drag to resize. Double-click header to auto-fit.
 * - **Column Configure**: Show/hide and freeze/unfreeze columns from a dropdown panel.
 * - **Pagination**: Numbered or infinite scroll. Consumer provides paged data via `onPageChange`/`onLoadMore` callbacks. Use `totalItems` to tell the table the full dataset size for page count calculation.
 * - **Nested Rows**: Expandable child rows via `_nested` property on row data.
 * - **Export**: CSV export of visible data.
 * - **Refresh**: Optional refresh button with consumer-controlled reload.
 * - **Row Actions**: Per-row kebab menu with configurable items per row via `_actions`.
 * - **Tooltips**: Auto-shown on content overflow.
 * - **Localization**: All labels (`refreshLabel`, `columnsLabel`, `actionsLabel`, `searchPlaceholder`) are configurable.
 * - **Custom Styling**: Full theming via CSS custom properties and `::part()` selectors.
 *
 * ## Usage
 * ```html
 * <zeta-table
 *   .columns=${columns}
 *   .data=${data}
 *   .onTableSearch=${handleSearch}
 *   .onColumnSearch=${handleColumnSearch}
 *   .onColumnFilter=${handleFilter}
 *   .onRefresh=${handleRefresh}
 *   .onRowClick=${handleRowClick}
 *   .onRowAction=${handleAction}
 *   .onSortChange=${handleSort}
 *   .onSelectionChange=${handleSelection}
 *   .onPageChange=${handlePageChange}
 *   .onLoadMore=${handleLoadMore}
 *   .onExport=${handleExport}
 *   .onRowExpand=${handleExpand}
 *   selectable
 *   select-all
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
 * @fires zeta-table-selection-change - Row selection changes. Detail: { selectedIds: [] }
 * @fires zeta-table-sort-change - Column sort changes. Detail: { field, direction }
 * @fires zeta-table-column-search - Column search input changes. Detail: { field, value, searchValues }
 * @fires zeta-table-column-filter - Column filter applied. Detail: { field, selectedValues }
 * @fires zeta-table-search - Global search input changes. Detail: { searchTerm }
 * @fires zeta-table-page-change - Page changes (numbered). Detail: { page }
 * @fires zeta-table-load-more - More data needed (infinite scroll)
 * @fires zeta-table-export - Export button clicked. Detail: { data }
 * @fires zeta-table-row-expand - Row expanded/collapsed. Detail: { rowId, expanded }
 * @fires zeta-table-row-click - Row clicked. Detail: { row, rowIndex }
 * @fires zeta-table-refresh - Refresh button clicked
 * @fires zeta-table-action - Row action clicked. Detail: { actionKey, row, rowIndex }
 *
 * @cssproperty --table-width - Table width. Default: 100%
 * @cssproperty --table-max-height - Max height of scroll area. Default: none
 * @cssproperty --table-border-color - Border color. Default: #e0e3e9
 * @cssproperty --table-border-radius - Wrapper border radius. Default: 8px
 * @cssproperty --table-header-bg - Header background. Default: #ffffff
 * @cssproperty --table-header-text - Header text color. Default: #1d1e23
 * @cssproperty --table-header-height - Header row height. Default: 40px
 * @cssproperty --table-header-font-size - Header font size. Default: 12px
 * @cssproperty --table-header-font-weight - Header font weight. Default: 600
 * @cssproperty --table-header-border-bottom - Header bottom border. Default: 2px solid
 * @cssproperty --table-row-height - Data row height (includes cell padding, box-sizing: border-box). Default: 40px
 * @cssproperty --table-row-bg - Row background. Default: #fff
 * @cssproperty --table-row-hover-bg - Row hover background. Default: #f5f7fa
 * @cssproperty --table-row-selected-bg - Selected row background. Default: #e8f2ff
 * @cssproperty --table-row-active-bg - Active/clicked row background. Default: #e8f4fd
 * @cssproperty --table-row-clickable-cursor - Clickable row cursor. Default: pointer
 * @cssproperty --table-cell-padding-y - Cell vertical padding. Default: 10px
 * @cssproperty --table-cell-padding-x - Cell horizontal padding. Default: 12px
 * @cssproperty --table-cell-padding - Cell padding shorthand (computed from padding-y and padding-x). Default: 10px 12px
 * @cssproperty --table-cell-font-size - Cell font size. Default: 14px
 * @cssproperty --table-frozen-shadow - Frozen column shadow. Default: 4px 0 8px -2px rgba(0,0,0,0.08)
 * @cssproperty --table-sort-active-color - Active sort icon color. Default: #0073e6
 * @cssproperty --table-sort-inactive-color - Inactive sort icon color. Default: #c4c9d4
 * @cssproperty --table-resize-handle-color - Resize handle color. Default: #0073e6
 * @cssproperty --table-toolbar-bg - Toolbar background. Default: #fff
 * @cssproperty --table-footer-bg - Footer background. Default: #fff
 * @cssproperty --table-data-count-bg - Data count badge background. Default: #e8f2ff
 * @cssproperty --table-data-count-color - Data count badge text color. Default: #0073e6
 */
@customElement("zeta-table")
export class ZetaTable extends LitElement {
  /** Renders into Light DOM instead of Shadow DOM so global styles and consumer CSS can style table internals directly. */
  override createRenderRoot() {
    return this;
  }

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

  /** Row click callback - when provided, rows become clickable (pointer cursor + highlight on click) */
  @property({ attribute: false })
  onRowClick: ((rowData: ZetaTableRow, rowIndex: number) => void) | null = null;

  /** When provided, clicking a row also toggles its checkbox selection. Behaves like onRowClick (pointer cursor + highlight). */
  @property({ attribute: false })
  selectOnRowClick: ((rowData: ZetaTableRow, rowIndex: number) => void) | null = null;

  /** Allow checkbox selection and action menu on disabled rows (useful for operations like bulk delete). Rows still appear visually disabled. */
  @property({ type: Boolean })
  allowDisabledSelection = false;

  /** Fallback row action menu items - used for rows that don't have `_actions` defined. Set to show a kebab menu as the last column. */
  @property({ attribute: false })
  rowActions: ZetaTableAction[] = [];

  /** Callback when a row action is clicked. Receives the action key, row data, and row index. */
  @property({ attribute: false })
  onRowAction: ((actionKey: string, rowData: ZetaTableRow, rowIndex: number) => void) | null = null;

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

  /** Column search/filter callback - when provided, shows search inputs on columns and delegates filtering to the consumer. Receives the field name and current search value. When not provided, search inputs are hidden. */
  @property({ attribute: false })
  onColumnSearch: ((field: string, value: string, allFilters: Record<string, string>) => void) | null = null;

  /** Column filter callback - when provided, shows a filter icon on each column header with a dropdown menu of filter options. Consumer receives the field, selected values, and column when a filter changes. */
  @property({ attribute: false })
  onColumnFilter: ((field: string, selectedValues: string[], column: ZetaTableColumn) => void) | null = null;

  /** Global search callback - when provided, shows a global search bar above the table. Consumer handles the search and updates data. */
  @property({ attribute: false })
  onTableSearch: ((searchTerm: string) => void) | null = null;

  /** Placeholder text for the global search input (supports localization) */
  @property({ type: String, attribute: "search-placeholder" })
  searchPlaceholder = "Search...";

  /** Refresh callback - when provided, shows a refresh icon button in the toolbar. Consumer handles the data reload. */
  @property({ attribute: false })
  onRefresh: (() => void) | null = null;

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

  /** Callback when infinite scroll needs more data. Receives current data count. */
  @property({ attribute: false })
  onLoadMore: ((currentCount: number) => void) | null = null;

  /** Callback when sort state changes. Receives field and direction ('asc' | 'desc' | null). */
  @property({ attribute: false })
  onSortChange: ((field: string, direction: "asc" | "desc" | null) => void) | null = null;

  /** Callback when row selection changes. Receives array of selected row IDs. */
  @property({ attribute: false })
  onSelectionChange: ((selectedIds: (string | number)[]) => void) | null = null;

  /** Callback when page changes (numbered pagination). Receives page number and page size. */
  @property({ attribute: false })
  onPageChange: ((page: number, pageSize: number) => void) | null = null;

  /** Callback when export is triggered. Receives the exported data rows. */
  @property({ attribute: false })
  onExport: ((data: ZetaTableRow[]) => void) | null = null;

  /** Callback when a row is expanded/collapsed. Receives row ID and expanded state. */
  @property({ attribute: false })
  onRowExpand: ((rowId: string | number, expanded: boolean) => void) | null = null;

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
    return this.querySelector(".zeta-table-scroll");
  }

  /** Field name of the column currently being resized (null when not resizing) */
  private _resizingColumn: string | null = null;
  /** Mouse X position when resize drag started */
  private _resizeStartX = 0;
  /** Column width in px when resize drag started */
  private _resizeStartWidth = 0;
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
   * - Injects the component's CSS into <head> as a global <style> tag (Light DOM
   *   requires global styles since there's no shadow root to scope them).
   *   Uses a `data-zeta-table` attribute guard to prevent duplicate injection
   *   when multiple <zeta-table> instances exist on the same page.
   * - Syncs public array props (selectedRows, disabledRows) into internal Sets for O(1) lookup.
   * - Registers a document-level click listener to close dropdowns (column panel, action menu,
   *   filter panel) when clicking outside.
   */
  override connectedCallback() {
    super.connectedCallback?.();
    if (!document.querySelector("style[data-zeta-table]")) {
      const style = document.createElement("style");
      style.setAttribute("data-zeta-table", "");
      style.textContent = styles.cssText;
      document.head.appendChild(style);
    }
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
    if (changed.has("data") || changed.has("rowActions")) {
      this._showActionsColumn = this.rowActions.length > 0 || this.data.some(row => row._actions && row._actions.length > 0);
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
    const wrapper = this.querySelector(".zeta-table-column-panel-wrapper");
    if (wrapper && !path.includes(wrapper)) {
      this._columnConfigureVisible = false;
    }

    // Close action menu if click is outside the menu and not on an action button
    if (this._actionMenuRowId !== null) {
      const menu = this.querySelector(".zeta-table-action-menu--open");
      const clickedBtn = path.some(el => (el as Element).classList?.contains("zeta-table-action-btn"));
      if (!clickedBtn && (!menu || !path.includes(menu))) {
        this._actionMenuRowId = null;
      }
    }

    // Close filter panel if click is outside the panel and not on a filter icon button
    if (this._filterPanelField !== null) {
      const panel = this.querySelector(".zeta-table-filter-panel");
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

  /** Returns true if any row click handler is configured (onRowClick or selectOnRowClick) */
  private _isClickable(): boolean {
    return this.onRowClick != null || this.selectOnRowClick != null;
  }

  // ─── Row Interaction Handlers ───

  /**
   * Handles a click on a table row.
   * - Ignores clicks on disabled rows (unless allowDisabledSelection is set)
   * - Ignores clicks on <input> elements (checkboxes handle themselves)
   * - Ignores clicks on <button> elements (action buttons handle themselves)
   * - Sets the active row for visual highlighting
   * - If selectOnRowClick is configured, toggles the row's checkbox selection
   * - Dispatches both the callback and CustomEvent for framework-agnostic consumers
   */
  private _handleRowClick(row: ZetaTableRow, rowIndex: number, e: MouseEvent) {
    if (this._isRowDisabled(row) && !this.allowDisabledSelection) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") return;

    this._activeRow = row.id;

    if (target.tagName === "BUTTON" || target.closest("button")) return;
    if (!this._isClickable()) return;

    if (this.selectOnRowClick) {
      this._handleRowSelect(row);
      this.selectOnRowClick(row, rowIndex);
    }

    if (this.onRowClick) {
      this.onRowClick(row, rowIndex);
    }

    this.dispatchEvent(
      new CustomEvent("zeta-table-row-click", {
        detail: { row, rowId: row.id, rowIndex },
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
   * Notifies the consumer via callback and CustomEvent — the consumer is responsible
   * for sorting the data and updating the `data` property.
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
    if (this.onSortChange) {
      this.onSortChange(this._sortState.field, this._sortState.direction);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-sort-change", {
        detail: { field: this._sortState.field, direction: this._sortState.direction },
        bubbles: true,
        composed: true
      })
    );
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

    if (this.onColumnFilter) {
      this.onColumnFilter(
        field,
        selectedValues,
        this.columns.find(c => c.field === field)!
      );
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-column-filter", {
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

    if (this.onColumnSearch) {
      this.onColumnSearch(field, value, { ...this._searchValues });
    }

    this.dispatchEvent(
      new CustomEvent("zeta-table-column-search", {
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
    if (this.onTableSearch) {
      this.onTableSearch(value);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-search", {
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
    if (this.onSelectionChange) {
      this.onSelectionChange(selectedIds);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-selection-change", {
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

  /** Toggles expansion of a row's nested sub-rows. Notifies the consumer via callback and CustomEvent. */
  private _toggleExpand(rowId: string | number) {
    const newSet = new Set(this._expandedRows);
    if (newSet.has(rowId)) {
      newSet.delete(rowId);
    } else {
      newSet.add(rowId);
    }
    this._expandedRows = newSet;
    const expanded = newSet.has(rowId);
    if (this.onRowExpand) {
      this.onRowExpand(rowId, expanded);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-row-expand", {
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
   * fires the `onLoadMore` callback and dispatches the `zeta-table-load-more` event
   * (only if not currently loading and hasMoreData is true).
   *
   * The observer uses the scroll container as its root (not the viewport) so it only
   * triggers based on table scroll position, not page scroll.
   */
  private _setupInfiniteScrollObserver() {
    this._destroyInfiniteScrollObserver();
    void this.updateComplete.then(() => {
      const sentinel = this.querySelector(".zeta-table-infinite-sentinel");
      if (!sentinel || !this._scrollContainer) return;
      this._intersectionObserver = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry?.isIntersecting && !this.loading && this.hasMoreData) {
            if (this.onLoadMore) {
              this.onLoadMore(this.data.length);
            }
            this.dispatchEvent(
              new CustomEvent("zeta-table-load-more", {
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
    if (this.onPageChange) {
      this.onPageChange(page, this.pageSize);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-page-change", {
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
   * Generates a CSV from visible columns and filtered/sorted data,
   * notifies the consumer, and triggers a browser download.
   */
  private _handleExport = () => {
    const visibleCols = this._getVisibleColumns();
    const data = this._getFilteredSortedData();
    const csvContent = this._generateCSV(visibleCols, data);
    if (this.onExport) {
      this.onExport(data);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-export", {
        detail: { csv: csvContent, columns: visibleCols, data },
        bubbles: true,
        composed: true
      })
    );
    this._downloadCSV(csvContent);
  };

  /** Handles the refresh button click. Delegates data reload entirely to the consumer. */
  private _handleRefresh = () => {
    if (this.onRefresh) {
      this.onRefresh();
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-refresh", {
        bubbles: true,
        composed: true
      })
    );
  };

  /** Generates a CSV string with proper escaping (double-quotes for values containing quotes) */
  private _generateCSV(cols: ZetaTableColumn[], data: ZetaTableRow[]): string {
    const header = cols.map(c => `"${c.title.replace(/"/g, '""')}"`).join(",");
    const rows = data.map(row =>
      cols
        .map(c => {
          const val = row[c.field];
          const str = val == null ? "" : typeof val === "object" ? JSON.stringify(val) : String(val);
          return `"${str.replace(/"/g, '""')}"`;
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
    URL.revokeObjectURL(url);
  }

  // ─── Data Processing Pipeline ───

  /** Returns only the columns that are currently toggled visible in the column configure panel */
  private _getVisibleColumns(): ZetaTableColumn[] {
    return this.columns.filter(c => this._visibleColumns.has(c.field));
  }

  /**
   * Returns a shallow copy of the raw data array.
   * All data operations (sorting, filtering, searching, pagination) are delegated
   * to the consumer — the table renders exactly what it receives.
   */
  private _getData(): ZetaTableRow[] {
    return [...this.data];
  }

  /**
   * Returns the data as provided by the consumer.
   * Sorting is fully delegated to the consumer via `onSortChange` callback / `zeta-table-sort-change` event.
   * The consumer is responsible for sorting the data and updating the `data` property.
   */
  private _getFilteredSortedData(): ZetaTableRow[] {
    return this._getData();
  }

  /**
   * Returns the data to render on screen.
   * Pagination is fully delegated to the consumer via `onPageChange` callback / `zeta-table-page-change` event.
   * The consumer is responsible for providing the correct page of data via the `data` property.
   */
  private _getDisplayedData(): ZetaTableRow[] {
    return this._getFilteredSortedData();
  }

  // ─── Frozen Column Helpers ───

  /**
   * Calculates the CSS `left` offset for a frozen column.
   * Sums the widths of all frozen columns before this one, plus the
   * fixed-width checkbox (44px) and expand (40px) columns if present.
   */
  private _getFrozenLeftOffset(colIndex: number): number {
    const visibleCols = this._getVisibleColumns();
    let offset = 0;
    if (this.selectable) offset += 44;
    if (this.expandable) offset += 40;
    for (let i = 0; i < colIndex; i++) {
      const col = visibleCols[i];
      if (this._isColumnFrozen(col)) {
        const w = this._columnWidths[col.field] ?? (typeof col.width === "number" ? col.width : 150);
        offset += w;
      }
    }
    return offset;
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
    const hasSearch = this.onColumnSearch !== null && visibleCols.some(c => c.filterable !== false && !c.disabled);

    return html`
      <div class="zeta-table-wrapper">
        ${this._renderHeaderBar()}
        <div class="zeta-table-scroll">
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
                        ${this.noDataContent ?? "No data available"}
                      </td>
                    </tr>`
              }
              ${
                this.paginationType === "infinite" && (this.loading || this._dataLengthWhenLoadingStarted >= 0)
                  ? html`<tr class="zeta-table-loading-row">
                      <td colspan="${this._getTotalColspan(visibleCols)}" class="zeta-table-td">${this.loadingContent ?? "Loading more data..."}</td>
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
    const hasLeft = this.tableTitle || this.showDataCount || this._selectedRows.size > 0;
    const hasRight = this.onTableSearch || this.onRefresh || this.exportable || this.columnConfigure;

    if (!hasLeft && !hasRight) return nothing;

    return html`
      <div class="zeta-table-header-bar">
        <div class="zeta-table-header-bar-left">
          ${this.tableTitle ? html`<span class="zeta-table-title">${this.tableTitle}</span>` : nothing}
          ${
            this.showDataCount || this._selectedRows.size > 0
              ? html`<div class="zeta-table-header-meta">
                  ${this.showDataCount ? html`<span class="zeta-table-data-count">${displayedCount} out of ${totalData}</span>` : nothing}
                  ${this._selectedRows.size > 0 ? html`<span class="zeta-table-selection-info">${this._selectedRows.size} row(s) selected</span>` : nothing}
                </div>`
              : nothing
          }
        </div>
        <div class="zeta-table-header-bar-right">
          ${
            this.onTableSearch
              ? html`
                  <div class="zeta-table-global-search">
                    <svg class="zeta-table-global-search-icon" viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                      />
                    </svg>
                    <input
                      type="text"
                      class="zeta-table-global-search-input"
                      placeholder="${this.searchPlaceholder}"
                      .value=${this._globalSearchValue}
                      @input=${this._handleGlobalSearch}
                    />
                  </div>
                `
              : nothing
          }
          ${
            this.onRefresh
              ? html`
                  <button class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon" @click=${this._handleRefresh} title=${this.refreshLabel}>
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                      />
                    </svg>
                  </button>
                `
              : nothing
          }
          ${
            this.exportable
              ? html`
                  <button class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon" @click=${this._handleExport} title="Export to CSV">
                    <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                  </button>
                `
              : nothing
          }
          ${this.columnConfigure ? this._renderColumnConfigure() : nothing}
        </div>
      </div>
    `;
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
        <button
          class="zeta-table-toolbar-btn zeta-table-toolbar-btn--icon"
          @click=${(e: Event) => {
            e.stopPropagation();
            this._columnConfigureVisible = !this._columnConfigureVisible;
          }}
          title=${this.columnsLabel}
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            />
          </svg>
        </button>
        ${
          this._columnConfigureVisible
            ? html`
                <div class="zeta-table-column-panel">
                  <div class="zeta-table-column-panel-section">
                    <div class="zeta-table-column-panel-heading">Show / Hide</div>
                    ${this.columns.map(
                    col => html`
                      <label class="zeta-table-column-panel-item">
                        <input
                          type="checkbox"
                          .checked=${this._visibleColumns.has(col.field)}
                          ?disabled=${this._visibleColumns.has(col.field) && this._visibleColumns.size === 1}
                          @change=${() => this._toggleColumnVisibility(col.field)}
                        />
                        ${col.title}
                      </label>
                    `
                  )}
                  </div>
                  <div class="zeta-table-column-panel-section">
                    <div class="zeta-table-column-panel-heading">Freeze</div>
                    ${this.columns
                    .filter(c => this._visibleColumns.has(c.field))
                    .map(
                      col => html`
                        <label class="zeta-table-column-panel-item">
                          <input type="checkbox" .checked=${this._frozenColumns.has(col.field)} @change=${() => this._toggleColumnFreeze(col.field)} />
                          ${col.title}
                        </label>
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
    return html`<colgroup>${this.selectable ? html`<col style="width:44px">` : nothing}${this.expandable ? html`<col style="width:40px">` : nothing}${cols.map(col => {
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
                <th class="zeta-table-th zeta-table-col-checkbox zeta-table-cell--frozen" style="left:0; z-index:16;">
                  ${
                  this.selectAll
                    ? html`<input
                        type="checkbox"
                        .checked=${allSelected}
                        .indeterminate=${someSelected && !allSelected}
                        @change=${this._handleSelectAll}
                        title="Select all"
                      />`
                    : nothing
                }
                </th>
              `
            : nothing
        }
        ${
          this.expandable
            ? html`<th class="zeta-table-th zeta-table-col-expand zeta-table-cell--frozen" style="left:${this.selectable ? "44px" : "0"}"></th>`
            : nothing
        }
        ${cols.map((col, i) => this._renderHeaderCell(col, i))}
        ${this._showActionsColumn ? html`<th class="zeta-table-th zeta-table-col-actions">${this.actionsLabel}</th>` : nothing}
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
    const leftOffset = isFrozen ? this._getFrozenLeftOffset(index) : 0;
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
    if (isFrozen) cellStyles.left = `${leftOffset}px`;
    if (isDisabled) cellStyles.opacity = "0.5";

    const isFilterable = this.onColumnFilter !== null && col.filterable !== false;

    return html`
      <th class=${classMap(cellClasses)} style=${styleMap(cellStyles)}>
        <div class="zeta-table-header-content">
          <span
            class="zeta-table-header-title ${isSortable ? "zeta-table-header-title--sortable" : ""}"
            @click=${isSortable ? () => this._handleSort(col.field) : nothing}
            >${col.title}</span
          >
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
                    <svg viewBox="0 0 24 24" width="14" height="14"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>
                  </button>`
                : nothing
            }
            ${
              isSortable
                ? html`<span class="zeta-table-sort-btn" @click=${() => this._handleSort(col.field)}>${this._renderSortIcons(col.field)}</span>`
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
        <svg class="zeta-table-sort-arrow ${isAsc ? "zeta-table-sort-arrow--active" : ""}" viewBox="0 0 10 8">
          <polygon points="5,1 9,7 1,7" />
        </svg>
        <svg class="zeta-table-sort-arrow ${isDesc ? "zeta-table-sort-arrow--active" : ""}" viewBox="0 0 10 8">
          <polygon points="5,7 1,1 9,1" />
        </svg>
      </span>
    `;
  }

  /**
   * Renders the per-column search input row (second header row).
   * Only shown when `onColumnSearch` callback is provided.
   * Each column gets a text input unless disabled or filterable=false.
   */
  private _renderSearchRow(cols: ZetaTableColumn[]) {
    return html`
      <tr class="zeta-table-search-row">
        ${this.selectable ? html`<th class="zeta-table-th zeta-table-col-checkbox zeta-table-cell--frozen" style="left:0;"></th>` : nothing}
        ${
          this.expandable
            ? html`<th class="zeta-table-th zeta-table-col-expand zeta-table-cell--frozen" style="left:${this.selectable ? "44px" : "0"}"></th>`
            : nothing
        }
        ${cols.map((col, i) => {
          const isFrozen = this._isColumnFrozen(col);
          const leftOffset = isFrozen ? this._getFrozenLeftOffset(i) : 0;
          const isLastFrozen = isFrozen && this._isLastFrozen(i);
          const cellClasses = { "zeta-table-cell--frozen": isFrozen, "zeta-table-cell--frozen-last": isLastFrozen };
          const cellStyles: Record<string, string> = {};
          if (isFrozen) cellStyles.left = `${leftOffset}px`;

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
                <td class="zeta-table-td zeta-table-col-checkbox zeta-table-cell--frozen" style="left:0;">
                  <input
                    type="checkbox"
                    .checked=${isSelected}
                    ?disabled=${!!row._checkboxDisabled || (isDisabled && !this.allowDisabledSelection)}
                    @change=${() => this._handleRowSelect(row)}
                  />
                </td>
              `
            : nothing
        }
        ${
          this.expandable
            ? html`
                <td class="zeta-table-td zeta-table-col-expand zeta-table-cell--frozen" style="left:${this.selectable ? "44px" : "0"}">
                  ${
                  hasNested
                    ? html`
                        <button
                          class="zeta-table-expand-btn ${isExpanded ? "zeta-table-expand-btn--expanded" : ""}"
                          @click=${() => this._toggleExpand(row.id)}
                          title="${isExpanded ? "Collapse" : "Expand"}"
                        >
                          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                      `
                    : nothing
                }
                </td>
              `
            : nothing
        }
        ${cols.map((col, i) => this._renderDataCell(row, col, i))} ${this._showActionsColumn ? this._renderActionsCell(row) : nothing}
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
                    class="zeta-table-action-btn ${isOpen ? "zeta-table-action-btn--active" : ""}"
                    title="${this.actionsLabel}"
                    @click=${(e: MouseEvent) => {
                    e.stopPropagation();
                    this._toggleActionMenu(row.id, e);
                  }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
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
            return v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
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
              <label class="zeta-table-filter-panel-item">
                <input type="checkbox" .checked=${this._pendingFilterSelections.has(opt)} @change=${() => this._handleFilterOptionToggle(opt)} />
                <span>${opt}</span>
              </label>
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

    const row = this.data.find(r => r.id === this._actionMenuRowId);
    if (!row) return nothing;
    const rowIndex = this.data.indexOf(row);
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
              ${action.icon ? html`<span class="zeta-table-action-icon">${action.icon}</span>` : nothing}
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

      this._actionMenuPos = { top, left: rect.right - 160 };
      this._actionMenuRowId = rowId;
      this._activeRow = rowId;
    }
  }

  /** Handles click on a specific action menu item. Closes the menu and notifies the consumer. */
  private _handleActionClick(actionKey: string, row: ZetaTableRow, rowIndex: number) {
    this._actionMenuRowId = null;
    if (this.onRowAction) {
      this.onRowAction(actionKey, row, rowIndex);
    }
    this.dispatchEvent(
      new CustomEvent("zeta-table-action", {
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
   * 1. DOM Node values (e.g. React portal containers): rendered directly inside
   *    a `.zeta-table-cell-inner` wrapper without text truncation.
   * 2. Text values: wrapped in `.zeta-table-cell-inner` > `.zeta-table-cell-content`
   *    with CSS ellipsis truncation and optional tooltip on hover.
   *
   * Applies frozen column positioning if the column is pinned.
   */
  private _renderDataCell(row: ZetaTableRow, col: ZetaTableColumn, index: number) {
    const isFrozen = this._isColumnFrozen(col);
    const leftOffset = isFrozen ? this._getFrozenLeftOffset(index) : 0;
    const isLastFrozen = isFrozen && this._isLastFrozen(index);
    const rawValue = row[col.field];

    const cellClasses: Record<string, boolean> = {
      "zeta-table-td": true,
      "zeta-table-td--data": true,
      "zeta-table-cell--frozen": isFrozen,
      "zeta-table-cell--frozen-last": isLastFrozen
    };
    const cellStyles: Record<string, string> = {};
    if (isFrozen) cellStyles.left = `${leftOffset}px`;

    if (rawValue instanceof Node) {
      return html`
        <td class=${classMap(cellClasses)} style=${styleMap(cellStyles)}>
          <div class="zeta-table-cell-inner">${rawValue}</div>
        </td>
      `;
    }

    const cellValue = rawValue != null ? (typeof rawValue === "object" ? JSON.stringify(rawValue) : String(rawValue)) : "";
    const tooltipEnabled = col.tooltip === true || col.tooltipOnEllipsisOnly !== false;
    const ellipsisOnly = col.tooltip !== true;

    return html`
      <td class=${classMap(cellClasses)} style=${styleMap(cellStyles)}>
        <div class="zeta-table-cell-inner">
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
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  ${nestedKeys.map(
                    key => html`<th style="padding:6px 12px; text-align:left; font-size:11px; border-bottom:1px solid var(--table-border-color);">${key}</th>`
                  )}
                </tr>
              </thead>
              <tbody>
                ${nestedData.map(
                  child => html`
                    <tr>
                      ${nestedKeys.map(key => {
                        const val = child[key];
                        return html`<td style="padding:6px 12px; font-size:13px; border-bottom:1px solid var(--table-border-color);">
                          ${val instanceof Node ? val : val != null ? (typeof val === "object" ? JSON.stringify(val) : String(val)) : ""}
                        </td>`;
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
   * Renders the pagination footer for numbered pagination mode.
   * Includes: page info text, rows-per-page selector, and page navigation buttons
   * (first, prev, page numbers with ellipsis, next, last).
   */
  private _renderPagination() {
    const totalPages = this._getTotalPages();
    const pages = this._getPaginationRange(totalPages);

    return html`
      <div class="zeta-table-footer">
        <div class="zeta-table-page-info">
          <span>Page ${this._currentPage} of ${totalPages}</span>
          <label>
            Rows per page:
            <select
              class="zeta-table-page-size-select"
              .value=${String(this.pageSize)}
              @change=${(e: Event) => {
                this.pageSize = Number((e.target as HTMLSelectElement).value);
                this._currentPage = 1;
                this._navigateToPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
        <div class="zeta-table-pagination">
          <button class="zeta-table-page-btn" ?disabled=${this._currentPage <= 1} @click=${() => this._navigateToPage(1)} title="First page">&#171;</button>
          <button
            class="zeta-table-page-btn"
            ?disabled=${this._currentPage <= 1}
            @click=${() => this._navigateToPage(this._currentPage - 1)}
            title="Previous page"
          >
            &#8249;
          </button>
          ${pages.map(p =>
            p === "..."
              ? html`<span style="padding:0 4px;">...</span>`
              : html`<button
                  class="zeta-table-page-btn ${p === this._currentPage ? "zeta-table-page-btn--active" : ""}"
                  @click=${() => this._navigateToPage(p as number)}
                >
                  ${p}
                </button>`
          )}
          <button
            class="zeta-table-page-btn"
            ?disabled=${this._currentPage >= totalPages}
            @click=${() => this._navigateToPage(this._currentPage + 1)}
            title="Next page"
          >
            &#8250;
          </button>
          <button class="zeta-table-page-btn" ?disabled=${this._currentPage >= totalPages} @click=${() => this._navigateToPage(totalPages)} title="Last page">
            &#187;
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Generates the page number sequence for the pagination bar.
   * For 7 or fewer pages: shows all page numbers.
   * For more: shows first, last, current ±1, with "..." ellipsis gaps.
   * Example: [1, "...", 4, 5, 6, "...", 20]
   */
  private _getPaginationRange(totalPages: number): (number | string)[] {
    const current = this._currentPage;
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

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
