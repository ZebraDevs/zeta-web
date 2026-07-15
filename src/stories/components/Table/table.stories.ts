import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTable, type ZetaTableColumn, type ZetaTableRow, type ZetaTableAction } from "../../../components/table/table.js";
import { fn } from "@storybook/test";
import { spreadGenerator, cssVarsStyle } from "../../utils.js";

const spread = spreadGenerator(ZetaTable);

const sampleColumns: ZetaTableColumn[] = [
  { field: "id", title: "ID", width: 60, sortable: true, filterable: true, frozen: true, tooltip: true, resizable: true },
  { field: "name", title: "Name", width: 180, sortable: true, filterable: true, frozen: true, tooltip: true, resizable: true },
  { field: "email", title: "Email", width: 240, sortable: true, filterable: true, tooltip: true, resizable: true },
  {
    field: "department",
    title: "Department",
    width: 150,
    sortable: true,
    filterable: true,
    filterOptions: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"],
    tooltip: true,
    resizable: true
  },
  {
    field: "role",
    title: "Role",
    width: 140,
    sortable: true,
    filterable: true,
    filterOptions: ["Senior", "Junior", "Lead", "Manager", "Director", "Intern"],
    tooltip: true,
    resizable: true
  },
  { field: "salary", title: "Salary", width: 100, sortable: true, filterable: true, tooltip: false, resizable: true },
  {
    field: "location",
    title: "Location",
    width: 140,
    sortable: true,
    filterable: true,
    filterOptions: ["San Francisco", "London", "Berlin", "Tokyo", "Mumbai", "New York"],
    tooltip: true,
    resizable: true
  },
  { field: "startDate", title: "Start Date", width: 120, sortable: true, filterable: true, tooltip: false, resizable: true },
  { field: "favorite", title: "★", width: 50, sortable: false, filterable: false, resizable: false }
];

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
const roles = ["Manager", "Senior", "Junior", "Lead", "Director", "Intern"];
const locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo", "Mumbai"];

function getActionsForRole(role: string, disabled: boolean): ZetaTableAction[] | null | undefined {
  if (disabled) return null;
  if (role === "Director") return [{ key: "view", label: "View Details", icon: "👁" }];
  if (role === "Intern")
    return [
      { key: "view", label: "View Details", icon: "👁" },
      { key: "edit", label: "Edit", icon: "✏️" }
    ];
  return [
    { key: "view", label: "View Details", icon: "👁" },
    { key: "edit", label: "Edit", icon: "✏️" },
    { key: "wipe", label: "Wipe Computer", icon: "💻" },
    { key: "delete", label: "Delete Computer", icon: "🗑️" }
  ];
}

/** Creates a DOM element styled as a colored status badge */
function createStatusBadge(text: string, color: string, bg: string): HTMLElement {
  const badge = document.createElement("span");
  badge.textContent = text;
  badge.style.cssText = `display:inline-flex; align-items:center; padding:var(--spacing-0-5) var(--spacing-small); border-radius:var(--spacing-medium); font:var(--body-x-small); font-weight:var(--medium); color:${color}; background:${bg};`;
  return badge;
}

/** Creates a DOM element with an inline SVG user icon + name side by side */
function createIconName(name: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display:flex; align-items:center; gap:var(--spacing-small);";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "20");
  svg.setAttribute("height", "20");
  svg.style.cssText = "fill:var(--main-subtle); flex-shrink:0;";
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");
  svg.appendChild(path);
  const span = document.createElement("span");
  span.textContent = name;
  wrapper.appendChild(svg);
  wrapper.appendChild(span);
  return wrapper;
}

const STAR_FILLED_PATH = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
const STAR_OUTLINE_PATH =
  "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";

/** Creates a star rating toggle button (interactive DOM Node) */
function createStarButton(filled: boolean): HTMLElement {
  const btn = document.createElement("button");
  btn.title = filled ? "Unstar" : "Star";
  btn.style.cssText = "background:none; border:none; cursor:pointer; padding:var(--spacing-0-5); display:inline-flex; align-items:center;";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg.appendChild(path);
  btn.appendChild(svg);

  let isFilled = filled;
  const applyState = () => {
    svg.style.fill = isFilled ? "var(--main-warning)" : "var(--main-disabled)";
    path.setAttribute("d", isFilled ? STAR_FILLED_PATH : STAR_OUTLINE_PATH);
    btn.title = isFilled ? "Unstar" : "Star";
  };
  applyState();

  btn.addEventListener("click", e => {
    e.stopPropagation();
    isFilled = !isFilled;
    applyState();
  });
  return btn;
}

const roleStyles: Record<string, { color: string; bg: string }> = {
  Manager: { color: "var(--main-positive)", bg: "var(--surface-positive-subtle)" },
  Senior: { color: "var(--main-primary)", bg: "var(--surface-primary-subtle)" },
  Junior: { color: "var(--main-warning)", bg: "var(--surface-warning-subtle)" },
  Lead: { color: "var(--surface-info)", bg: "var(--surface-info-subtle)" },
  Director: { color: "var(--main-negative)", bg: "var(--surface-negative-subtle)" },
  Intern: { color: "var(--main-subtle)", bg: "var(--surface-hover)" }
};

function generateData(count: number): ZetaTableRow[] {
  const data: ZetaTableRow[] = [];
  for (let i = 1; i <= count; i++) {
    const role = roles[i % roles.length];
    const isDisabled = i === 7;
    const rs = roleStyles[role] || { color: "var(--main-default)", bg: "var(--surface-hover)" };
    data.push({
      id: i,
      name: createIconName(`Employee ${i}`),
      email: `employee${i}@company.com`,
      department: departments[i % departments.length],
      role: createStatusBadge(role, rs.color, rs.bg),
      salary: `$${50000 + i * 1500}`,
      location: locations[i % locations.length],
      startDate: `2020-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      favorite: createStarButton(i % 4 === 0),
      _nested:
        i % 5 === 0
          ? (() => {
              const el = document.createElement("div");
              el.style.cssText = "padding:var(--spacing-medium); display:flex; gap:var(--spacing-large); align-items:center;";
              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              svg.setAttribute("viewBox", "0 0 24 24");
              svg.setAttribute("width", "48");
              svg.setAttribute("height", "48");
              svg.style.cssText = "fill:var(--main-subtle); flex-shrink:0;";
              const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
              p.setAttribute("d", "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");
              svg.appendChild(p);
              const info = document.createElement("div");
              const strong = document.createElement("strong");
              strong.textContent = `Employee ${i} — Custom View`;
              info.appendChild(strong);
              info.appendChild(document.createElement("br"));
              const desc = document.createElement("span");
              desc.style.color = "var(--main-subtle)";
              desc.textContent = "This nested content is a DOM Node. Consumers can render anything here: icons, charts, forms, etc.";
              info.appendChild(desc);
              el.appendChild(svg);
              el.appendChild(info);
              return el;
            })()
          : i % 3 === 0
            ? [
                {
                  id: `${i}-1`,
                  task: "Sub-task 1",
                  status: createStatusBadge("Done", "var(--main-positive)", "var(--surface-positive-subtle)"),
                  priority: createStatusBadge("High", "var(--main-negative)", "var(--surface-negative-subtle)")
                },
                {
                  id: `${i}-2`,
                  task: "Sub-task 2",
                  status: createStatusBadge("In Progress", "var(--main-primary)", "var(--surface-primary-subtle)"),
                  priority: createStatusBadge("Medium", "var(--main-warning)", "var(--surface-warning-subtle)")
                }
              ]
            : undefined,
      _disabled: isDisabled,
      _checkboxDisabled: i === 4,
      _actions: getActionsForRole(role, isDisabled)
    });
  }
  return data;
}

type TableStory = ZetaTable & {
  "onzeta-table-selection-change": () => void;
  "onzeta-table-sort-change": () => void;
  "onzeta-table-column-search": () => void;
  "onzeta-table-page-change": () => void;
  "onzeta-table-load-more": () => void;
  "onzeta-table-export": () => void;
  "onzeta-table-row-expand": () => void;
  "onzeta-table-row-click": () => void;
  "onzeta-table-select-on-row-click": () => void;
  "onzeta-table-action": () => void;
};

const meta: Meta<TableStory> = {
  component: "zeta-table",
  title: "Components/Table",
  args: {
    selectable: true,
    selectAll: true,
    expandable: true,
    exportable: true,
    columnConfigure: true,
    showDataCount: true,
    tableTitle: "Summary",
    paginationType: "numbered",
    pageSize: 10,
    currentPage: 1,
    loading: false,
    hasMoreData: true,
    columns: sampleColumns,
    data: generateData(50),
    selectedRows: [1, 3],
    disabledRows: [7],
    "onzeta-table-selection-change": fn(),
    "onzeta-table-sort-change": fn(),
    "onzeta-table-column-search": fn(),
    "onzeta-table-page-change": fn(),
    "onzeta-table-load-more": fn(),
    "onzeta-table-export": fn(),
    "onzeta-table-row-expand": fn(),
    "onzeta-table-row-click": fn(),
    "onzeta-table-select-on-row-click": fn(),
    "onzeta-table-action": fn()
  },
  argTypes: {
    selectable: { control: "boolean", description: "Show checkbox selection column" },
    selectAll: { control: "boolean", description: "Show select-all checkbox in header" },
    expandable: { control: "boolean", description: "Enable nested/expandable rows" },
    exportable: { control: "boolean", description: "Show export button" },
    columnConfigure: { control: "boolean", description: "Show column configure (show/hide + freeze) button" },
    showDataCount: { control: "boolean", description: "Show data count badge (e.g. 50 out of 50)" },
    allowDisabledSelection: { control: "boolean", description: "Allow checkbox/actions on disabled rows" },
    loading: { control: "boolean", description: "Loading state (for infinite scroll)" },
    hasMoreData: { control: "boolean", description: "Whether there is more data to load (infinite scroll)" },
    tableTitle: { control: "text", description: "Title displayed in header bar" },
    searchPlaceholder: { control: "text", description: "Placeholder for global search input" },
    refreshLabel: { control: "text", description: "Tooltip text for refresh button (localization)" },
    columnsLabel: { control: "text", description: "Tooltip text for columns button (localization)" },
    actionsLabel: { control: "text", description: "Header label for actions column (localization)" },
    paginationType: {
      control: { type: "select" },
      options: ["none", "numbered", "infinite"],
      description: "Pagination type"
    },
    pageSize: {
      control: { type: "select" },
      options: [5, 10, 20, 50, 100],
      description: "Rows per page"
    },
    currentPage: { control: "number", description: "Initial page number (1-based)" },
    totalItems: { control: "number", description: "Total items for server-side pagination (-1 for auto)" },
    columns: {
      control: "object",
      description:
        "Column definitions. Per-column options: sortable, filterable, filterOptions, frozen, visible, tooltip, tooltipOnEllipsisOnly, resizable, disabled, width, minWidth"
    },
    data: { control: "object", description: "Row data array. Per-row options: _disabled, _checkboxDisabled, _nested (ZetaTableRow[] | Node), _actions" },
    selectedRows: { control: "object", description: "Array of initially selected row IDs" },
    disabledRows: { control: "object", description: "Array of disabled row IDs" }
  },
  parameters: {
    design: {
      url: "https://www.figma.com/design/WRSQZYj9aiXyxEHSZcRHol/Antuit---Predictive-Ordering?node-id=728-210&m=dev"
    },
    status: {
      type: "beta"
    }
  }
};

export default meta;

export const TableAll: StoryObj<TableStory> = {
  render: args => {
    const {
      "onzeta-table-selection-change": onSelChange,
      "onzeta-table-sort-change": onSortChange,
      "onzeta-table-column-search": onColumnSearch,
      "onzeta-table-page-change": onPageChange,
      "onzeta-table-load-more": onLoadMore,
      "onzeta-table-export": onExport,
      "onzeta-table-row-expand": onExpand,
      "onzeta-table-row-click": onRowClick,
      "onzeta-table-select-on-row-click": onSelectOnRowClick,
      "onzeta-table-action": onAction,
      columns,
      data,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      allowDisabledSelection,
      selectable,
      selectAll,
      expandable,
      exportable,
      columnConfigure,
      paginationType,
      pageSize,
      ...rest
    } = args;

    const masterData = data as ZetaTableRow[];
    let filteredData = [...masterData];
    let currentSort: { field: string; direction: "asc" | "desc" | null } = { field: "", direction: null };
    let currentPageNum = 1;

    function toSortable(val: unknown): string | number | null {
      if (val == null) return null;
      if (typeof val === "number") return val;
      if (val instanceof Node) return (val as HTMLElement).textContent?.trim().toLowerCase() ?? "";
      return String(val).toLowerCase();
    }

    function sortData(rows: ZetaTableRow[]): ZetaTableRow[] {
      if (!currentSort.field || !currentSort.direction) return [...rows];
      const { field, direction } = currentSort;
      return [...rows].sort((a, b) => {
        const aVal = toSortable(a[field]);
        const bVal = toSortable(b[field]);
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (typeof aVal === "number" && typeof bVal === "number") {
          return direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        const cmp = String(aVal).localeCompare(String(bVal));
        return direction === "asc" ? cmp : -cmp;
      });
    }

    function updateTable(table: ZetaTable) {
      const sorted = sortData(filteredData);
      if (table.paginationType === "numbered") {
        const pgSize = table.pageSize || 10;
        const start = (currentPageNum - 1) * pgSize;
        table.data = sorted.slice(start, start + pgSize);
      } else {
        table.data = sorted;
      }
      table.totalItems = filteredData.length;
    }

    const handleSelectOnRowClick = (rowData: unknown, rowIndex: number) => {
      console.log("Row clicked & selected:", { rowIndex, rowData });
      (onSelectOnRowClick as Function)?.();
    };

    const handleRowAction = (actionKey: string, rowData: unknown, rowIndex: number) => {
      console.log("Row action:", { actionKey, rowIndex, rowData });
      (onAction as Function)?.();
    };

    const handleSortChange = function (this: ZetaTable, field: string, direction: "asc" | "desc" | null) {
      currentSort = { field, direction };
      currentPageNum = 1;
      updateTable(this);
      console.log("Sort changed:", { field, direction });
      (onSortChange as Function)?.();
    };

    const handleSelectionChange = (selectedIds: (string | number)[]) => {
      console.log("Selection changed:", selectedIds);
      (onSelChange as Function)?.();
    };

    const handlePageChange = function (this: ZetaTable, page: number, pgSize: number) {
      currentPageNum = page;
      updateTable(this);
      console.log("Page changed:", { page, pageSize: pgSize });
      (onPageChange as Function)?.();
    };

    const handleLoadMore = (currentCount: number) => {
      console.log("Load more requested, current count:", currentCount);
      (onLoadMore as Function)?.();
    };

    const handleExport = (exportedData: ZetaTableRow[]) => {
      console.log("Export triggered, rows:", exportedData.length);
      (onExport as Function)?.();
    };

    const handleRowExpand = (rowId: string | number, expanded: boolean) => {
      console.log("Row expand toggled:", { rowId, expanded });
      (onExpand as Function)?.();
    };

    const handleTableSearch = function (this: ZetaTable, searchTerm: string) {
      if (!searchTerm.trim()) {
        filteredData = [...masterData];
      } else {
        const term = searchTerm.toLowerCase();
        filteredData = masterData.filter(row =>
          Object.values(row).some(val => val != null && typeof val !== "object" && String(val).toLowerCase().includes(term))
        );
      }
      currentPageNum = 1;
      updateTable(this);
      console.log("Global search:", searchTerm);
    };

    const handleColumnSearch = function (this: ZetaTable, field: string, value: string, allSearchValues: Record<string, string>) {
      const filterKeys = Object.keys(allSearchValues);
      if (filterKeys.length === 0) {
        filteredData = [...masterData];
      } else {
        filteredData = masterData.filter(row =>
          filterKeys.every(f =>
            String(row[f] ?? "")
              .toLowerCase()
              .includes(allSearchValues[f].toLowerCase())
          )
        );
      }
      currentPageNum = 1;
      updateTable(this);
      console.log("Column search:", { field, value, allSearchValues });
    };

    const handleColumnFilter = function (this: ZetaTable, field: string, selectedValues: string[]) {
      if (selectedValues.length === 0) {
        filteredData = [...masterData];
      } else {
        filteredData = masterData.filter(row => selectedValues.includes(String(row[field] ?? "")));
      }
      currentPageNum = 1;
      updateTable(this);
      console.log("Column filter:", { field, selectedValues });
    };

    const handleRefresh = function (this: ZetaTable) {
      filteredData = [...masterData];
      currentSort = { field: "", direction: null };
      currentPageNum = 1;
      updateTable(this);
      console.log("Data refreshed");
    };

    const initialPageSize = pageSize || 10;
    const initialData = paginationType === "numbered" ? masterData.slice(0, initialPageSize) : [...masterData];

    return html`
      <p style="margin-bottom:var(--spacing-medium); font:var(--body-x-small); color:var(--main-subtle);">
        <strong>All features enabled:</strong> Global search, per-column search, column filter dropdown, sorting, pagination, checkbox selection, row click,
        expandable rows, kebab actions (per-row), refresh, export, column configure (show/hide + freeze), disabled rows, allowDisabledSelection. Use the
        <strong>Controls</strong> panel below to toggle features and adjust styling.
      </p>
      <p style="margin-bottom:var(--spacing-medium); font:var(--body-x-small); color:var(--main-disabled)">
        <strong>CSS Variables:</strong> Override via inline style — e.g. <code>--table-header-height</code>, <code>--table-row-height</code>,
        <code>--table-row-bg</code>, <code>--table-row-hover-bg</code>, <code>--table-row-selected-bg</code>, <code>--table-header-bg</code>,
        <code>--table-header-text</code>, <code>--table-cell-padding</code>, <code>--table-cell-font-size</code>, <code>--table-max-height</code>,
        <code>--table-width</code>, <code>--table-border-color</code>, <code>--table-border-radius</code>, <code>--table-sort-active-color</code>,
        <code>--table-frozen-shadow</code>.
      </p>
      <zeta-table
        ${spread(rest)}
        .columns=${columns}
        .data=${initialData}
        .totalItems=${masterData.length}
        .selectedRows=${selectedRows}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${tableTitle}
        .allowDisabledSelection=${allowDisabledSelection || false}
        .selectable=${selectable || false}
        .selectAll=${selectAll || false}
        .expandable=${expandable || false}
        .exportable=${exportable || false}
        .columnConfigure=${columnConfigure || false}
        .paginationType=${paginationType || "none"}
        .pageSize=${pageSize || 10}
        .selectOnRowClick=${handleSelectOnRowClick}
        .onRowAction=${handleRowAction}
        .onTableSearch=${handleTableSearch}
        .onColumnSearch=${handleColumnSearch}
        .onColumnFilter=${handleColumnFilter}
        .onRefresh=${handleRefresh}
        .onSortChange=${handleSortChange}
        .onSelectionChange=${handleSelectionChange}
        .onPageChange=${handlePageChange}
        .onLoadMore=${handleLoadMore}
        .onExport=${handleExport}
        .onRowExpand=${handleRowExpand}
        @zeta-table-row-click=${onRowClick}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};

export const InfiniteScrollWithAPI: StoryObj<TableStory> = {
  args: {
    paginationType: "infinite",
    expandable: false,
    showDataCount: true,
    tableTitle: "Infinite Scroll",
    selectable: true,
    selectAll: true,
    columnConfigure: true,
    exportable: false
  },
  render: args => {
    const { columns } = args;
    const totalRecords = 100;
    let currentData = generateData(20);
    let isLoading = false;
    let hasMoreData = true;

    const handleLoadMore = function (this: ZetaTable, currentCount: number) {
      if (isLoading || !hasMoreData) return;
      isLoading = true;
      this.loading = true;

      setTimeout(() => {
        const nextBatch = generateData(currentCount + 20).slice(currentCount);
        currentData = [...currentData, ...nextBatch];
        isLoading = false;
        hasMoreData = currentData.length < totalRecords;
        this.data = [...currentData];
        this.loading = false;
        this.hasMoreData = hasMoreData;
        console.log(`Loaded ${currentData.length} of ${totalRecords} rows`);
      }, 2000);
    };

    if (!document.querySelector("style[data-zeta-table-spin]")) {
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-zeta-table-spin", "");
      styleEl.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
      document.head.appendChild(styleEl);
    }

    const loadingEl = document.createElement("div");
    loadingEl.style.cssText = "display:flex; align-items:center; justify-content:center; gap:var(--spacing-small); padding:var(--spacing-medium);";
    const spinnerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    spinnerSvg.setAttribute("width", "20");
    spinnerSvg.setAttribute("height", "20");
    spinnerSvg.setAttribute("viewBox", "0 0 24 24");
    spinnerSvg.style.animation = "spin 1s linear infinite";
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "10");
    circle.setAttribute("stroke", "var(--main-primary)");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-dasharray", "31.4 31.4");
    circle.setAttribute("stroke-linecap", "round");
    spinnerSvg.appendChild(circle);
    const loadingText = document.createElement("span");
    loadingText.style.cssText = "color:var(--main-primary); font:var(--body-x-small); font-weight:var(--medium);";
    loadingText.textContent = "Fetching more records...";
    loadingEl.appendChild(spinnerSvg);
    loadingEl.appendChild(loadingText);

    return html`
      <zeta-table
        pagination-type="infinite"
        selectable
        select-all
        column-configure
        show-data-count
        table-title="Infinite Scroll"
        .columns=${columns}
        .data=${currentData}
        .totalItems=${totalRecords}
        .onLoadMore=${handleLoadMore}
        .loadingContent=${loadingEl}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};

export const PaginationWithAPI: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 10,
    expandable: false,
    showDataCount: true,
    tableTitle: "Server Pagination",
    selectable: true,
    selectAll: true,
    columnConfigure: true,
    exportable: false
  },
  render: args => {
    const { columns } = args;
    const totalRecords = 55;
    const allData = generateData(totalRecords);

    const handlePageChange = function (this: ZetaTable, page: number, pgSize: number) {
      this.loading = true;

      setTimeout(() => {
        const start = (page - 1) * pgSize;
        const pageData = allData.slice(start, start + pgSize);
        this.data = pageData;
        this.loading = false;
        console.log(`Fetched page ${page}: rows ${start + 1}-${start + pageData.length} of ${totalRecords}`);
      }, 500);
    };

    const handleRefresh = function (this: ZetaTable) {
      this.loading = true;
      console.log("Refreshing data...");

      const self = this;
      setTimeout(() => {
        self.data = allData.slice(0, 10);
        self.loading = false;
        console.log("Data refreshed!");
      }, 800);
    };

    return html`
      <zeta-table
        pagination-type="numbered"
        page-size="10"
        selectable
        select-all
        column-configure
        show-data-count
        table-title="Server Pagination"
        .columns=${columns}
        .data=${allData.slice(0, 10)}
        .totalItems=${totalRecords}
        .onRefresh=${handleRefresh}
        .onPageChange=${handlePageChange}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};

export const DisabledRowsAndColumns: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 10,
    showDataCount: true,
    tableTitle: "Users",
    columns: [
      { field: "id", title: "ID", width: 60, sortable: true, filterable: true, frozen: true },
      { field: "name", title: "Name", width: 200, sortable: true, filterable: true },
      { field: "status", title: "Status", width: 120, sortable: true, filterable: true },
      { field: "locked", title: "Locked (Disabled Col)", width: 180, disabled: true }
    ] as ZetaTableColumn[],
    data: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "Pending",
      locked: "—",
      _disabled: i === 2 || i === 5,
      _checkboxDisabled: i === 8
    })) as ZetaTableRow[],
    disabledRows: [3, 6]
  },
  render: args => {
    const {
      "onzeta-table-selection-change": onSelChange,
      "onzeta-table-sort-change": onSortChange,
      "onzeta-table-column-search": onColumnSearch,
      "onzeta-table-page-change": onPageChange,
      "onzeta-table-load-more": onLoadMore,
      "onzeta-table-export": onExport,
      "onzeta-table-row-expand": onExpand,
      "onzeta-table-row-click": onRowClick,
      columns,
      data,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      ...rest
    } = args;
    return html`
      <zeta-table
        ${spread(rest)}
        .columns=${columns}
        .data=${data}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${tableTitle}
        @zeta-table-selection-change=${onSelChange}
        @zeta-table-sort-change=${onSortChange}
        @zeta-table-column-search=${onColumnSearch}
        @zeta-table-page-change=${onPageChange}
        @zeta-table-load-more=${onLoadMore}
        @zeta-table-export=${onExport}
        @zeta-table-row-expand=${onExpand}
        @zeta-table-row-click=${onRowClick}
        style=${cssVarsStyle(args, { "--table-max-height": "450px" })}
      ></zeta-table>
    `;
  }
};

export const CustomStyling: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 5,
    expandable: false,
    exportable: false,
    data: generateData(25)
  },
  render: args => {
    const {
      "onzeta-table-selection-change": onSelChange,
      "onzeta-table-sort-change": onSortChange,
      "onzeta-table-column-search": onColumnSearch,
      "onzeta-table-page-change": onPageChange,
      "onzeta-table-load-more": onLoadMore,
      "onzeta-table-export": onExport,
      "onzeta-table-row-expand": onExpand,
      "onzeta-table-row-click": onRowClick,
      columns,
      data,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      ...rest
    } = args;
    return html`
      <style>
        .custom-table .zeta-table-wrapper {
          border-radius: var(--spacing-medium);
        }
        .custom-table .zeta-table-thead {
          background: var(--main-default);
        }
        .custom-table .zeta-table-th {
          background: var(--main-default);
          color: var(--state-default-enabled);
        }
        .custom-table .zeta-table-row:hover .zeta-table-td {
          background: var(--surface-hover);
        }
      </style>
      <zeta-table
        class="custom-table"
        ${spread(rest)}
        .columns=${columns}
        .data=${data}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${"Styled Table"}
        @zeta-table-selection-change=${onSelChange}
        @zeta-table-sort-change=${onSortChange}
        @zeta-table-column-search=${onColumnSearch}
        @zeta-table-page-change=${onPageChange}
        @zeta-table-load-more=${onLoadMore}
        @zeta-table-export=${onExport}
        @zeta-table-row-expand=${onExpand}
        @zeta-table-row-click=${onRowClick}
        style=${cssVarsStyle(args, {
          "--table-header-bg": "var(--main-default)",
          "--table-header-text": "var(--state-default-enabled)",
          "--table-header-height": "var(--spacing-8xl)",
          "--table-row-height": "var(--spacing-7xl)",
          "--table-row-hover-bg": "var(--surface-hover)",
          "--table-row-selected-bg": "var(--surface-selected)",
          "--table-row-active-bg": "var(--surface-selected-hover)",
          "--table-border-radius": "var(--spacing-medium)",
          "--table-max-height": "400px"
        })}
      ></zeta-table>
    `;
  }
};

export const PerRowActions: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 10,
    expandable: false,
    exportable: false,
    selectable: true,
    selectAll: true,
    columnConfigure: true,
    showDataCount: true,
    tableTitle: "Per-Row Actions"
  },
  render: args => {
    const {
      "onzeta-table-selection-change": onSelChange,
      "onzeta-table-sort-change": onSortChange,
      "onzeta-table-column-search": onColumnSearch,
      "onzeta-table-page-change": onPageChange,
      "onzeta-table-action": onAction,
      columns,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      ...rest
    } = args;

    const customData: ZetaTableRow[] = [
      {
        id: 1,
        name: "Alice",
        email: "alice@co.com",
        department: "Engineering",
        role: "Lead",
        salary: "$95000",
        location: "NYC",
        startDate: "2021-01-15",
        _actions: [
          { key: "view", label: "View Details", icon: "👁" },
          { key: "audit", label: "View Audit Log", icon: "📋" }
        ]
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@co.com",
        department: "Marketing",
        role: "Senior",
        salary: "$82000",
        location: "London",
        startDate: "2020-06-10",
        _actions: [
          { key: "view", label: "View Details", icon: "👁" },
          { key: "edit", label: "Edit", icon: "✏️" },
          { key: "wipe", label: "Wipe Computer", icon: "💻" },
          { key: "delete", label: "Delete Computer", icon: "🗑️" }
        ]
      },
      {
        id: 3,
        name: "Charlie",
        email: "charlie@co.com",
        department: "Sales",
        role: "Intern",
        salary: "$45000",
        location: "Berlin",
        startDate: "2023-03-01",
        _actions: [
          { key: "view", label: "View Details", icon: "👁" },
          { key: "edit", label: "Edit", icon: "✏️" },
          { key: "promote", label: "Promote", icon: "⬆️" }
        ]
      },
      {
        id: 4,
        name: "Diana",
        email: "diana@co.com",
        department: "HR",
        role: "Director",
        salary: "$120000",
        location: "Tokyo",
        startDate: "2019-09-20",
        _actions: [{ key: "view", label: "View Details", icon: "👁" }]
      },
      {
        id: 5,
        name: "Eve",
        email: "eve@co.com",
        department: "Finance",
        role: "Manager",
        salary: "$98000",
        location: "Mumbai",
        startDate: "2020-11-05",
        _actions: null
      },
      {
        id: 6,
        name: "Frank",
        email: "frank@co.com",
        department: "Operations",
        role: "Senior",
        salary: "$87000",
        location: "NYC",
        startDate: "2021-04-18",
        _actions: [
          { key: "view", label: "View Details", icon: "👁" },
          { key: "edit", label: "Edit", icon: "✏️" },
          { key: "delete", label: "Delete Computer", icon: "🗑️", disabled: true }
        ]
      }
    ];

    const handleRowAction = (actionKey: string, rowData: unknown, rowIndex: number) => {
      console.log("Row action:", { actionKey, rowIndex, rowData });
      (onAction as Function)?.();
    };

    return html`
      <p style="margin-bottom:var(--spacing-medium); font:var(--body-x-small); color:var(--main-subtle);">
        <strong>Per-row _actions:</strong> Each row defines its own menu options via <code>_actions</code>. Row 5 (Eve) has <code>_actions: null</code> so no
        menu is shown. Row 6 has "Delete" disabled.
      </p>
      <zeta-table
        ${spread(rest)}
        .columns=${columns}
        .data=${customData}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${tableTitle}
        .onRowAction=${handleRowAction}
        @zeta-table-selection-change=${onSelChange}
        @zeta-table-sort-change=${onSortChange}
        @zeta-table-column-search=${onColumnSearch}
        @zeta-table-page-change=${onPageChange}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};

export const GlobalAndColumnSearch: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 10,
    expandable: false,
    exportable: true,
    selectable: true,
    selectAll: true,
    columnConfigure: true,
    showDataCount: true,
    tableTitle: "Search Demo"
  },
  render: args => {
    const {
      "onzeta-table-selection-change": onSelChange,
      "onzeta-table-sort-change": onSortChange,
      "onzeta-table-page-change": onPageChange,
      columns,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      ...rest
    } = args;

    const allData = generateData(50);

    const handleTableSearch = function (this: ZetaTable, searchTerm: string) {
      if (!searchTerm.trim()) {
        this.data = [...allData];
        this.totalItems = allData.length;
      } else {
        const term = searchTerm.toLowerCase();
        const filtered = allData.filter(row =>
          Object.values(row).some(val => val != null && typeof val !== "object" && String(val).toLowerCase().includes(term))
        );
        this.data = filtered;
        this.totalItems = filtered.length;
      }
      console.log(`Global search "${searchTerm}": ${this.data.length} results`);
    };

    const handleColumnSearch = function (this: ZetaTable, field: string, value: string, allFilters: Record<string, string>) {
      const filterKeys = Object.keys(allFilters);
      if (filterKeys.length === 0) {
        this.data = [...allData];
        this.totalItems = allData.length;
      } else {
        const filtered = allData.filter(row =>
          filterKeys.every(f =>
            String(row[f] ?? "")
              .toLowerCase()
              .includes(allFilters[f].toLowerCase())
          )
        );
        this.data = filtered;
        this.totalItems = filtered.length;
      }
      console.log(`Column search "${field}=${value}": ${this.data.length} results`, allFilters);
    };

    const handleColumnFilter = function (this: ZetaTable, field: string, selectedValues: string[]) {
      if (selectedValues.length === 0) {
        this.data = [...allData];
        this.totalItems = allData.length;
      } else {
        const filtered = allData.filter(row => selectedValues.includes(String(row[field] ?? "")));
        this.data = filtered;
        this.totalItems = filtered.length;
      }
      console.log("Column filter applied:", { field, selectedValues });
    };

    const handleRowAction = (actionKey: string, rowData: unknown, rowIndex: number) => {
      console.log("Action:", { actionKey, rowIndex, rowData });
    };

    const handleRefresh = function (this: ZetaTable) {
      this.data = [...allData];
      this.totalItems = allData.length;
      console.log("Data refreshed");
    };

    return html`
      <p style="margin-bottom:var(--spacing-medium); font:var(--body-x-small); color:var(--main-subtle);">
        <strong>Features demonstrated:</strong> Global search bar (top-left), per-column search inputs, column filter icons (header), kebab actions menu
        (per-row), refresh, export, column configure, pagination.
      </p>
      <zeta-table
        ${spread(rest)}
        .columns=${columns}
        .data=${allData}
        .totalItems=${allData.length}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${tableTitle}
        .onTableSearch=${handleTableSearch}
        .onColumnSearch=${handleColumnSearch}
        .onColumnFilter=${handleColumnFilter}
        .onRowAction=${handleRowAction}
        .onRefresh=${handleRefresh}
        search-placeholder="Search all columns..."
        @zeta-table-selection-change=${onSelChange}
        @zeta-table-sort-change=${onSortChange}
        @zeta-table-page-change=${onPageChange}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};
