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
