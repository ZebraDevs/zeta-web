import React, { isValidElement, type ReactNode, type ComponentProps } from "react";
import { createComponent, type EventName } from "@lit/react";
import { ZetaTable as ZetaTableElement } from "./table.js";
import type { ZetaTableRow, ZetaTableColumn, SortDirection } from "./table.js";

export type { ZetaTableColumn, ZetaTableRow, ZetaTableAction, PaginationType, SortDirection } from "./table.js";

type SortChangeEvent = CustomEvent<{ field: string; direction: SortDirection }>;
type LoadMoreEvent = CustomEvent<{ currentCount: number }>;
type RowActionEvent = CustomEvent<{ actionKey: string; row: ZetaTableRow; rowIndex: number }>;
type RowClickEvent = CustomEvent<{ row: ZetaTableRow; rowIndex: number }>;
type SelectionChangeEvent = CustomEvent<{ selectedIds: (string | number)[] }>;
type PageChangeEvent = CustomEvent<{ page: number; pageSize: number }>;
type TableExportEvent = CustomEvent<{ csv: string; columns: ZetaTableColumn[]; data: ZetaTableRow[] }>;
type RowExpandEvent = CustomEvent<{ rowId: string | number; expanded: boolean }>;
type ColumnSearchEvent = CustomEvent<{ field: string; value: string; searchValues: Record<string, string> }>;
type ColumnFilterEvent = CustomEvent<{ field: string; selectedValues: string[] }>;
type TableSearchEvent = CustomEvent<{ value: string }>;
type TableRefreshEvent = CustomEvent<void>;

const ZetaTableBase = createComponent({
  tagName: "zeta-table",
  elementClass: ZetaTableElement,
  react: React,
  events: {
    onSortChange: "sortChange" as EventName<SortChangeEvent>,
    onLoadMore: "loadMore" as EventName<LoadMoreEvent>,
    onRowAction: "rowAction" as EventName<RowActionEvent>,
    onRowClick: "rowClick" as EventName<RowClickEvent>,
    onSelectionChange: "selectionChange" as EventName<SelectionChangeEvent>,
    onPageChange: "pageChange" as EventName<PageChangeEvent>,
    onTableExport: "tableExport" as EventName<TableExportEvent>,
    onRowExpand: "rowExpand" as EventName<RowExpandEvent>,
    onColumnSearch: "columnSearch" as EventName<ColumnSearchEvent>,
    onColumnFilter: "columnFilter" as EventName<ColumnFilterEvent>,
    onTableSearch: "tableSearch" as EventName<TableSearchEvent>,
    onTableRefresh: "tableRefresh" as EventName<TableRefreshEvent>,
  },
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
 * React wrapper for `<zeta-table>` with automatic slot handling.
 *
 * Detects React elements in `data` cell values, extracts them,
 * and renders them as slotted children projected into Shadow DOM cells.
 * All other props are passed through to the base createComponent wrapper.
 */
export const ZetaTableReact = React.forwardRef<ZetaTableElement, ZetaTableReactProps>(function ZetaTableReact(
  { data, loadingContent, noDataContent, ...rest },
  ref
) {
  const slots: { field: string; rowIdx: number; element: ReactNode; key: string }[] = [];

  const cleanData: ZetaTableRow[] = data.map((row, rowIdx) => {
    const cleanRow: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(row)) {
      if (isValidElement(value)) {
        slots.push({ field, rowIdx, element: value, key: `${row.id ?? rowIdx}-${field}` });
        cleanRow[field] = "";
      } else {
        cleanRow[field] = value;
      }
    }
    return cleanRow as ZetaTableRow;
  });

  return (
    <ZetaTableBase ref={ref} data={cleanData} loadingContent={loadingContent as unknown} noDataContent={noDataContent as unknown} {...rest}>
      {loadingContent && <div slot="loading">{loadingContent}</div>}
      {noDataContent && <div slot="no-data">{noDataContent}</div>}
      {slots.map(({ field, rowIdx, element, key }) => (
        <div slot={`cell-${field}-${rowIdx}`} key={key}>
          {element}
        </div>
      ))}
    </ZetaTableBase>
  );
});
