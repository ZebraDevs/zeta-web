import React, { isValidElement, type ReactNode, type ComponentProps } from "react";
import { createComponent, type EventName } from "@lit/react";
import { ZetaTable as ZetaTableElement } from "./table.js";
import type { ZetaTableRow, ZetaTableColumn, SortDirection } from "./table.js";

export type { ZetaTableColumn, ZetaTableRow, ZetaTableAction, PaginationType, SortDirection } from "./table.js";

type SortChangeEvent = CustomEvent<{ field: string; direction: SortDirection }>;
type LoadMoreEvent = CustomEvent<{ currentCount: number }>;
type RowActionEvent = CustomEvent<{ actionKey: string; row: ZetaTableRow; rowIndex: number }>;
type RowClickEvent = CustomEvent<{ row: ZetaTableRow; rowIndex: number }>;
type RowSelectEvent = CustomEvent<{ selectedIds: (string | number)[] }>;
type PageChangeEvent = CustomEvent<{ page: number; pageSize: number }>;
type TableExportEvent = CustomEvent<{ csv: string; columns: ZetaTableColumn[]; data: ZetaTableRow[] }>;
type RowExpandEvent = CustomEvent<{ rowId: string | number; expanded: boolean }>;
type ColumnFilterEvent = CustomEvent<{ field: string; selectedValues: string[] }>;
type TableSearchEvent = CustomEvent<{ value: string }>;
type TableRefreshEvent = CustomEvent<void>;

const ZetaTableBase = createComponent({
  tagName: "zeta-table",
  elementClass: ZetaTableElement,
  react: React,
  events: {
    onSortChange: "sortchange" as EventName<SortChangeEvent>,
    onLoadMore: "loadmore" as EventName<LoadMoreEvent>,
    onRowAction: "rowaction" as EventName<RowActionEvent>,
    onRowClick: "rowclick" as EventName<RowClickEvent>,
    onRowSelect: "rowselect" as EventName<RowSelectEvent>,
    onPageChange: "pagechange" as EventName<PageChangeEvent>,
    onTableExport: "tableexport" as EventName<TableExportEvent>,
    onRowExpand: "rowexpand" as EventName<RowExpandEvent>,
    onColumnFilter: "columnfilter" as EventName<ColumnFilterEvent>,
    onTableSearch: "tablesearch" as EventName<TableSearchEvent>,
    onTableRefresh: "tablerefresh" as EventName<TableRefreshEvent>
  }
});

type ZetaTableBaseProps = ComponentProps<typeof ZetaTableBase>;

/** Row data where cell values can be React elements (auto-slotted) or primitives */
type ReactTableRow = { id: string | number; [field: string]: unknown };

export interface ZetaTableReactProps extends Omit<ZetaTableBaseProps, "data" | "ref" | "loadingContent" | "noDataContent"> {
  data: ReactTableRow[];
  loadingContent?: ReactNode;
  noDataContent?: ReactNode;
}

/**
 * Returns a view of an event whose `detail` is replaced. Everything else (target, preventDefault, ...) still comes from the real event.
 * Used so handlers get the consumer's original rows, with their React elements, rather than the sanitised rows sent to the element.
 */
function withDetail<E extends CustomEvent>(event: E, detail: E["detail"]): E {
  return new Proxy(event, {
    get(target, prop) {
      if (prop === "detail") return detail;
      const value = Reflect.get(target, prop, target) as unknown;
      return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(target) : value;
    }
  });
}

/**
 * React wrapper for `<zeta-table>` with automatic slot handling.
 *
 * Detects React elements in `data` cell values, extracts them,
 * and renders them as slotted children projected into Shadow DOM cells.
 * Each one goes to the `cell-{field}-row-{id}` slot, so it stays with its row when the table sorts, filters or changes page.
 * Children are passed on as slotted content, so `<zeta-icon-button slot="controls" />` reaches the `controls` slot.
 * All other props are passed through to the base createComponent wrapper.
 */
export const ZetaTableReact = React.forwardRef<ZetaTableElement, ZetaTableReactProps>(function ZetaTableReact(
  { data, loadingContent, noDataContent, children, onRowClick, onRowAction, onTableExport, ...rest },
  ref
) {
  const slots: { slotName: string; element: ReactNode; key: string }[] = [];
  const originalRows = new Map<string | number, ReactTableRow>(data.map(row => [row.id, row]));
  const original = (row: ZetaTableRow): ZetaTableRow => (originalRows.get(row.id) ?? row) as ZetaTableRow;

  const cleanData: ZetaTableRow[] = data.map(row => {
    const cleanRow: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(row)) {
      if (isValidElement(value)) {
        slots.push({ slotName: `cell-${field}-row-${row.id}`, element: value, key: `${row.id}-${field}` });
        cleanRow[field] = "";
      } else {
        cleanRow[field] = value;
      }
    }
    return cleanRow as ZetaTableRow;
  });

  return (
    <ZetaTableBase
      ref={ref}
      data={cleanData}
      onRowClick={onRowClick && (e => onRowClick(withDetail(e, { ...e.detail, row: original(e.detail.row) })))}
      onRowAction={onRowAction && (e => onRowAction(withDetail(e, { ...e.detail, row: original(e.detail.row) })))}
      onTableExport={onTableExport && (e => onTableExport(withDetail(e, { ...e.detail, data: e.detail.data.map(original) })))}
      {...rest}
    >
      {loadingContent && <div slot="loading">{loadingContent}</div>}
      {noDataContent && <div slot="no-data">{noDataContent}</div>}
      {children}
      {slots.map(({ slotName, element, key }) => (
        <div slot={slotName} key={key}>
          {element}
        </div>
      ))}
    </ZetaTableBase>
  );
});
