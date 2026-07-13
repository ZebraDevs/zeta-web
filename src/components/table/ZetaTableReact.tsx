import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Import TypeScript interfaces and types from the Lit web component definition
import type {
  ZetaTableColumn,
  ZetaTableRow,
  ZetaTableAction,
  PaginationType,
  SortDirection
} from "./table.js";

// Side-effect import: registers the <zeta-table> custom element in the browser
import "./table.js";

// Re-export types so consumers can import everything from this React wrapper
export type { ZetaTableColumn, ZetaTableRow, ZetaTableAction, PaginationType, SortDirection };

/**
 * Props accepted by the ZetaTableReact wrapper.
 *
 * - Table configuration (columns, data, pagination, selection, etc.) maps 1:1
 *   to the Lit component's public properties.
 * - Event callbacks (onSortChange, onLoadMore, etc.) are forwarded as function
 *   references to the Lit component so it can call them directly.
 * - `loadingContent` and `noDataContent` accept React elements that will be
 *   portal-rendered into the Lit component's DOM.
 * - `style` allows passing CSS custom properties for theming (e.g. --table-row-height).
 */
export interface ZetaTableReactProps {
  columns: ZetaTableColumn[];
  data: ZetaTableRow[];
  paginationType?: PaginationType;
  loading?: boolean;
  hasMoreData?: boolean;
  selectable?: boolean;
  selectAll?: boolean;
  selectedRows?: (string | number)[];
  expandable?: boolean;
  exportable?: boolean;
  columnConfigure?: boolean;
  showDataCount?: boolean;
  tableTitle?: string;
  pageSize?: number;
  currentPage?: number;
  totalItems?: number;
  actionsLabel?: string;
  searchPlaceholder?: string;
  refreshLabel?: string;
  columnsLabel?: string;
  rowActions?: ZetaTableAction[];
  disabledRows?: (string | number)[];
  allowDisabledSelection?: boolean;
  loadingContent?: React.ReactNode;
  noDataContent?: React.ReactNode;
  onSortChange?: (field: string, direction: SortDirection) => void;
  onLoadMore?: (currentCount: number) => void;
  onRowAction?: (actionKey: string, rowData: ZetaTableRow, rowIndex: number) => void;
  onRowClick?: (rowData: ZetaTableRow, rowIndex: number) => void;
  selectOnRowClick?: (rowData: ZetaTableRow, rowIndex: number) => void;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onExport?: (data: ZetaTableRow[]) => void;
  onRowExpand?: (rowId: string | number, expanded: boolean) => void;
  onColumnSearch?: (field: string, value: string, allFilters: Record<string, string>) => void;
  onColumnFilter?: (field: string, selectedValues: string[], column: ZetaTableColumn) => void;
  onTableSearch?: (searchTerm: string) => void;
  onRefresh?: () => void;
  style?: React.CSSProperties;
  className?: string;
  "data-id"?: string;
}

/**
 * Represents a single React portal that renders a React element into a
 * container DOM node owned by the Lit component's Light DOM.
 */
interface PortalEntry {
  container: HTMLElement;
  element: React.ReactNode;
  key: string;
}

/**
 * React wrapper for the `zeta-table` Lit web component (Light DOM).
 *
 * Why this wrapper exists:
 * React cannot natively set complex properties (objects, arrays, functions) on
 * custom elements — it only sets HTML attributes (strings). This wrapper
 * bridges the gap by imperatively assigning JS properties to the underlying
 * <zeta-table> DOM element.
 *
 * React element → DOM portal pipeline:
 * When a cell value in `data` is a React element (e.g. <CollapsibleItems />),
 * it's rendered via `createPortal` into a stable container <div> that is handed
 * to the Lit component as a DOM Node. This keeps the React element inside the
 * React tree so it inherits context providers (theme, router, i18n, etc.).
 *
 * All DOM mutations (container creation, Lit property assignment) happen inside
 * `useLayoutEffect` (commit phase) to be safe with React 18 concurrent mode,
 * which may call the render function multiple times before committing.
 */
export const ZetaTableReact = forwardRef<HTMLElement, ZetaTableReactProps>(function ZetaTableReact(
  {
    columns,
    data,
    paginationType,
    loading,
    hasMoreData,
    selectable,
    selectAll,
    selectedRows,
    expandable,
    exportable,
    columnConfigure,
    showDataCount,
    tableTitle,
    pageSize,
    currentPage,
    totalItems,
    actionsLabel,
    searchPlaceholder,
    refreshLabel,
    columnsLabel,
    rowActions,
    disabledRows,
    allowDisabledSelection,
    loadingContent,
    noDataContent,
    onSortChange,
    onLoadMore,
    onRowAction,
    onRowClick,
    selectOnRowClick,
    onSelectionChange,
    onPageChange,
    onExport,
    onRowExpand,
    onColumnSearch,
    onColumnFilter,
    onTableSearch,
    onRefresh,
    style,
    className,
    "data-id": dataId
  },
  ref
) {
  // Ref to the actual <zeta-table> DOM element for imperative property access
  const tableRef = useRef<HTMLElement>(null);

  // Persistent cache: maps "rowId-columnKey" → container <div>.
  // Reusing containers across renders prevents the Lit component from
  // re-creating DOM nodes on every data update, which avoids flicker.
  const containerCacheRef = useRef(new Map<string, HTMLElement>());

  // Portal entries drive createPortal calls in the JSX return.
  // Stored in state so updating them triggers a re-render that actually
  // mounts the React elements into their container nodes.
  const [portals, setPortals] = useState<PortalEntry[]>([]);

  // Dedicated containers for the loading and no-data slot content.
  // Stored in state because their creation is a side-effect that needs
  // to trigger a re-render to mount the portal.
  const [loadingContainer, setLoadingContainer] = useState<HTMLElement | null>(null);
  const [noDataContainer, setNoDataContainer] = useState<HTMLElement | null>(null);

  // Expose the underlying <zeta-table> DOM element when a parent uses ref
  useImperativeHandle(ref, () => tableRef.current as HTMLElement);

  /**
   * Main synchronization effect — runs after every commit where any prop changes.
   *
   * useLayoutEffect (not useEffect) ensures DOM mutations happen synchronously
   * before the browser paints, preventing visual flicker. This is critical
   * because we're setting properties on a custom element that immediately
   * re-renders its Light DOM.
   */
  useLayoutEffect(() => {
    const table = tableRef.current as any;
    if (!table) return;

    const cache = containerCacheRef.current;
    const portalEntries: PortalEntry[] = [];
    const usedKeys = new Set<string>();

    // --- Phase 1: Process cell data ---
    // Walk every row and cell. If a cell value is a React element, swap it
    // with a container <div> that will be portal-rendered. Plain values
    // (strings, numbers) pass through unchanged.
    const processedData = data.map((row) => {
      const rowId = row.id;
      const processedRow: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(row)) {
        if (React.isValidElement(value)) {
          const cacheKey = `${rowId}-${key}`;
          usedKeys.add(cacheKey);

          // Reuse existing container or create a new one.
          // display:contents makes the container invisible in layout so
          // the React element renders as if it were a direct child.
          let container = cache.get(cacheKey);
          if (!container) {
            container = document.createElement("div");
            container.style.display = "contents";
            cache.set(cacheKey, container);
          }
          portalEntries.push({ container, element: value, key: cacheKey });
          // The Lit component receives a DOM Node and renders it directly
          processedRow[key] = container;
        } else {
          processedRow[key] = value;
        }
      }
      return processedRow;
    });

    // Evict stale containers for rows/cells that no longer exist (e.g. after
    // filtering or data refresh) to prevent memory leaks.
    for (const [key] of cache) {
      if (!usedKeys.has(key)) cache.delete(key);
    }

    // --- Phase 2: Handle loadingContent slot ---
    // If loadingContent is a React element, portal-render it into a container;
    // otherwise pass the raw value (string/null) directly to the Lit component.
    let lc = loadingContainer;
    if (loadingContent && React.isValidElement(loadingContent)) {
      if (!lc) {
        lc = document.createElement("div");
        lc.style.display = "contents";
        setLoadingContainer(lc);
      }
      portalEntries.push({ container: lc, element: loadingContent, key: "__loading__" });
      table.loadingContent = lc;
    } else {
      table.loadingContent = loadingContent ?? null;
    }

    // --- Phase 3: Handle noDataContent slot ---
    let nc = noDataContainer;
    if (noDataContent && React.isValidElement(noDataContent)) {
      if (!nc) {
        nc = document.createElement("div");
        nc.style.display = "contents";
        setNoDataContainer(nc);
      }
      portalEntries.push({ container: nc, element: noDataContent, key: "__nodata__" });
      table.noDataContent = nc;
    } else {
      table.noDataContent = noDataContent ?? null;
    }

    // --- Phase 4: Set complex properties (objects/arrays) ---
    // These must be set as JS properties, not HTML attributes, because
    // HTML attributes can only carry strings.
    table.columns = columns;
    table.data = processedData;

    // --- Phase 5: Set simple scalar properties ---
    // Only set when defined to avoid overwriting Lit component defaults
    // with undefined (which would clear the value).
    if (paginationType !== undefined) table.paginationType = paginationType;
    if (loading !== undefined) table.loading = loading;
    if (hasMoreData !== undefined) table.hasMoreData = hasMoreData;
    if (selectable !== undefined) table.selectable = selectable;
    if (selectAll !== undefined) table.selectAll = selectAll;
    if (selectedRows !== undefined) table.selectedRows = selectedRows;
    if (expandable !== undefined) table.expandable = expandable;
    if (exportable !== undefined) table.exportable = exportable;
    if (columnConfigure !== undefined) table.columnConfigure = columnConfigure;
    if (showDataCount !== undefined) table.showDataCount = showDataCount;
    if (tableTitle !== undefined) table.tableTitle = tableTitle;
    if (pageSize !== undefined) table.pageSize = pageSize;
    if (currentPage !== undefined) table.currentPage = currentPage;
    if (totalItems !== undefined) table.totalItems = totalItems;
    if (actionsLabel !== undefined) table.actionsLabel = actionsLabel;
    if (searchPlaceholder !== undefined) table.searchPlaceholder = searchPlaceholder;
    if (refreshLabel !== undefined) table.refreshLabel = refreshLabel;
    if (columnsLabel !== undefined) table.columnsLabel = columnsLabel;
    if (rowActions !== undefined) table.rowActions = rowActions;
    if (disabledRows !== undefined) table.disabledRows = disabledRows;
    if (allowDisabledSelection !== undefined) table.allowDisabledSelection = allowDisabledSelection;

    // --- Phase 6: Set callback function references ---
    // Nullify when the consumer doesn't provide a handler so the Lit
    // component doesn't call a stale closure from a previous render.
    table.onSortChange = onSortChange ?? null;
    table.onLoadMore = onLoadMore ?? null;
    table.onRowAction = onRowAction ?? null;
    table.onRowClick = onRowClick ?? null;
    table.selectOnRowClick = selectOnRowClick ?? null;
    table.onSelectionChange = onSelectionChange ?? null;
    table.onPageChange = onPageChange ?? null;
    table.onExport = onExport ?? null;
    table.onRowExpand = onRowExpand ?? null;
    table.onColumnSearch = onColumnSearch ?? null;
    table.onColumnFilter = onColumnFilter ?? null;
    table.onTableSearch = onTableSearch ?? null;
    table.onRefresh = onRefresh ?? null;

    // Trigger a React re-render so createPortal calls below mount the
    // React elements into their container nodes.
    setPortals(portalEntries);
  }, [
    // All props are listed as dependencies so the effect re-runs whenever
    // the consumer passes new values. This is the single source of truth
    // for syncing React props → Lit element properties.
    columns, data, paginationType, loading, hasMoreData,
    selectable, selectAll, selectedRows, expandable, exportable,
    columnConfigure, showDataCount, tableTitle, pageSize, currentPage,
    totalItems, actionsLabel, searchPlaceholder, refreshLabel, columnsLabel,
    rowActions, disabledRows, allowDisabledSelection,
    loadingContent, noDataContent, loadingContainer, noDataContainer,
    onSortChange, onLoadMore, onRowAction, onRowClick, selectOnRowClick,
    onSelectionChange, onPageChange, onExport, onRowExpand,
    onColumnSearch, onColumnFilter, onTableSearch, onRefresh
  ]);

  // Cleanup: clear the container cache when the component unmounts to
  // release DOM references and allow garbage collection.
  useEffect(() => {
    return () => {
      containerCacheRef.current.clear();
    };
  }, []);

  return (
    <>
      {/* Render the bare <zeta-table> custom element.
          Properties are set imperatively in useLayoutEffect above;
          only HTML-safe attributes (style, className, data-id) are set here. */}
      <zeta-table
        ref={tableRef}
        style={style}
        className={className}
        data-id={dataId}
      />

      {/* Render React elements into their container DOM nodes via portals.
          Each portal mounts a React element (e.g. <CollapsibleItems />) into
          the <div> that the Lit component received as a cell Node value.
          The key ensures React reconciles portals correctly across re-renders. */}
      {portals.map((p) => createPortal(p.element, p.container, p.key))}
    </>
  );
});

/**
 * TypeScript module augmentation: tells the React JSX type system that
 * <zeta-table> is a valid intrinsic element, suppressing "Property does not
 * exist on type 'JSX.IntrinsicElements'" errors.
 */
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "zeta-table": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
