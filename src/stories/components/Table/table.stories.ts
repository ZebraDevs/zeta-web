import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaTable, type ZetaTableColumn, type ZetaTableRow, type ZetaTableAction } from "../../../components/table/table.js";
import { fn } from "@storybook/test";
import { spreadGenerator, cssVarsStyle } from "../../utils.js";
// The cells and the controls slot in these stories use these components
import "../../../components/avatar/avatar.js";
import "../../../components/badges/status-label/status-label.js";
import "../../../components/button/button.js";
import "../../../components/button/icon-button/icon-button.js";
import "../../../components/icon/icon.js";
import "../../../components/progress-indicators/progress-circle/progress-circle.js";
import type { ZetaProgressCircle } from "../../../components/progress-indicators/progress-circle/progress-circle.js";

const spread = spreadGenerator(ZetaTable);

const sampleColumns: ZetaTableColumn[] = [
  { field: "id", title: "ID", width: 60, sortable: true, filterable: true, frozen: true, tooltip: true, resizable: true },
  { field: "avatar", title: "Avatar", width: 80, sortable: false, filterable: false, frozen: true, resizable: false },
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
  if (role === "Director") return [{ key: "view", label: "View Details", icon: "visibility" }];
  if (role === "Intern")
    return [
      { key: "view", label: "View Details", icon: "visibility" },
      { key: "edit", label: "Edit", icon: "edit" }
    ];
  return [
    { key: "view", label: "View Details", icon: "visibility" },
    { key: "edit", label: "Edit", icon: "edit" },
    { key: "wipe", label: "Wipe Computer", icon: "laptop" },
    { key: "delete", label: "Delete Computer", icon: "delete" }
  ];
}

type StatusLabelStatus = "info" | "positive" | "warning" | "negative" | "neutral";

/** Creates a status label from the design system, so its colours always follow the current tokens */
function createStatusLabel(text: string, status: StatusLabelStatus): HTMLElement {
  const label = document.createElement("zeta-status-label");
  label.setAttribute("status", status);
  label.textContent = text;
  return label;
}

/**
 * Creates an avatar with the initials of a name.
 * The avatar has its own column, so a Name cell holds only the name and sorts by it (the initials would otherwise be part of its text).
 */
function createAvatar(name: string): HTMLElement {
  const avatar = document.createElement("zeta-avatar");
  avatar.setAttribute("size", "xs");
  avatar.textContent = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2);
  return avatar;
}

/** Creates a person cell: an avatar with the initials, then a title and a subtitle, as in the design */
function createIconName(name: string, subtitle?: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display:flex; align-items:center; gap:var(--space-sm);";
  wrapper.appendChild(createAvatar(name));
  wrapper.appendChild(createNameText(name, subtitle));
  return wrapper;
}

/** Creates a title with an optional subtitle under it, for a Name cell */
function createNameText(name: string, subtitle?: string): HTMLElement {
  const text = document.createElement("div");
  text.style.cssText = "display:flex; flex-direction:column; min-width:0;";
  const title = document.createElement("span");
  title.textContent = name;
  text.appendChild(title);
  if (subtitle) {
    const sub = document.createElement("span");
    sub.textContent = subtitle;
    sub.style.cssText = "font:var(--body-xsmall); color:var(--foreground-secondary);";
    text.appendChild(sub);
  }
  return text;
}

/** Creates a star toggle (interactive DOM Node) from the icon set */
function createStarButton(filled: boolean): HTMLElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.style.cssText = "background:none; border:none; cursor:pointer; padding:var(--space-3xs); display:inline-flex; align-items:center;";
  const icon = document.createElement("zeta-icon");
  btn.appendChild(icon);

  let isFilled = filled;
  const applyState = () => {
    icon.textContent = isFilled ? "star" : "star_outline";
    icon.style.setProperty("--icon-color", isFilled ? "var(--foreground-warning)" : "var(--foreground-disabled)");
    btn.title = isFilled ? "Unstar" : "Star";
    btn.setAttribute("aria-pressed", String(isFilled));
  };
  applyState();

  btn.addEventListener("click", e => {
    e.stopPropagation();
    isFilled = !isFilled;
    applyState();
  });
  return btn;
}

const roleStatuses: Record<string, StatusLabelStatus> = {
  Manager: "positive",
  Senior: "info",
  Junior: "warning",
  Lead: "info",
  Director: "negative",
  Intern: "neutral"
};

function generateData(count: number): ZetaTableRow[] {
  const data: ZetaTableRow[] = [];
  for (let i = 1; i <= count; i++) {
    const role = roles[i % roles.length];
    const isDisabled = i === 7;
    data.push({
      id: i,
      avatar: createAvatar(`Employee ${i}`),
      name: createNameText(`Employee ${i}`),
      email: `employee${i}@company.com`,
      department: departments[i % departments.length],
      role: createStatusLabel(role, roleStatuses[role] ?? "neutral"),
      salary: `$${50000 + i * 1500}`,
      location: locations[i % locations.length],
      startDate: `2020-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      favorite: createStarButton(i % 4 === 0),
      _nested:
        i % 5 === 0
          ? (() => {
              const el = document.createElement("div");
              el.style.cssText = "padding:var(--space-md); display:flex; gap:var(--space-lg); align-items:center;";
              const avatar = document.createElement("zeta-avatar");
              avatar.setAttribute("size", "md");
              avatar.textContent = `E${i}`.slice(0, 2);
              const info = document.createElement("div");
              const strong = document.createElement("strong");
              strong.textContent = `Employee ${i} — Custom View`;
              info.appendChild(strong);
              info.appendChild(document.createElement("br"));
              const desc = document.createElement("span");
              desc.style.color = "var(--foreground-secondary)";
              desc.textContent = "This nested content is a DOM Node. Consumers can render anything here: icons, charts, forms, etc.";
              info.appendChild(desc);
              el.appendChild(avatar);
              el.appendChild(info);
              return el;
            })()
          : i % 3 === 0
            ? [
                {
                  id: `${i}-1`,
                  task: "Sub-task 1",
                  status: createStatusLabel("Done", "positive"),
                  priority: createStatusLabel("High", "negative")
                },
                {
                  id: `${i}-2`,
                  task: "Sub-task 2",
                  status: createStatusLabel("In Progress", "info"),
                  priority: createStatusLabel("Medium", "warning")
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

/** The four columns of the Figma frame: a person, a status, plain text and an action button */
const figmaColumns: ZetaTableColumn[] = [
  { field: "avatar", title: "Avatar", width: 90, sortable: false, filterable: false, resizable: false },
  { field: "name", title: "Name", width: 220, sortable: true },
  { field: "status", title: "Status", width: 210, sortable: true },
  { field: "department", title: "Department", width: 210, sortable: true },
  { field: "details", title: "Details", sortable: true }
];

const figmaStatuses: StatusLabelStatus[] = ["neutral", "info", "positive", "warning", "negative"];
const figmaStatusText: Record<StatusLabelStatus, string> = {
  neutral: "Draft",
  info: "In review",
  positive: "Approved",
  warning: "Pending",
  negative: "Rejected"
};

/** Creates the outline "Button" cell of the Figma frame */
function createDetailsButton(): HTMLElement {
  const button = document.createElement("zeta-button");
  button.setAttribute("flavor", "outline");
  button.setAttribute("size", "small");
  button.textContent = "Open";
  button.addEventListener("click", e => e.stopPropagation());
  return button;
}

/** Nested content for the Figma rows: a custom DOM view (every 5th row) or a sub-table (every 3rd row) */
function createFigmaNested(id: number): ZetaTableRow["_nested"] {
  if (id % 5 === 0) {
    const el = document.createElement("div");
    el.style.cssText = "padding:var(--space-md); display:flex; gap:var(--space-lg); align-items:center;";
    el.appendChild(createIconName(`Employee ${id}`, "Custom View"));
    const desc = document.createElement("span");
    desc.style.color = "var(--foreground-secondary)";
    desc.textContent = "This nested content is a DOM Node. Consumers can render anything here: icons, charts, forms, etc.";
    el.appendChild(desc);
    return el;
  }
  if (id % 3 === 0) {
    return [
      { id: `${id}-1`, task: "Sub-task 1", status: createStatusLabel("Done", "positive"), priority: createStatusLabel("High", "negative") },
      { id: `${id}-2`, task: "Sub-task 2", status: createStatusLabel("In Progress", "info"), priority: createStatusLabel("Medium", "warning") }
    ];
  }
  return undefined;
}

/** Rows shaped like the Figma frame: every row has the same four cells and a more menu */
function generateFigmaData(count: number): ZetaTableRow[] {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const status = figmaStatuses[index % figmaStatuses.length];
    return {
      id,
      avatar: createAvatar(`Employee ${id}`),
      name: createNameText(`Employee ${id}`, "Subtitle"),
      status: createStatusLabel(figmaStatusText[status], status),
      department: departments[index % departments.length],
      details: createDetailsButton(),
      _nested: createFigmaNested(id),
      _actions: [
        { key: "view", label: "View Details", icon: "visibility" },
        { key: "edit", label: "Edit", icon: "edit" },
        { key: "delete", label: "Delete", icon: "delete" }
      ]
    };
  });
}

type TableStory = ZetaTable & {
  onselectionchange: () => void;
  onsortchange: () => void;
  oncolumnsearch: () => void;
  onpagechange: () => void;
  onloadmore: () => void;
  ontableexport: () => void;
  onrowexpand: () => void;
  onrowclick: () => void;
  onrowaction: () => void;
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
    // Rows hold DOM nodes (cells), which can't be serialized into args (circular structure), so each story builds its own rows
    selectedRows: [1, 3],
    disabledRows: [7],
    onselectionchange: fn(),
    onsortchange: fn(),
    oncolumnsearch: fn(),
    onpagechange: fn(),
    onloadmore: fn(),
    ontableexport: fn(),
    onrowexpand: fn(),
    onrowclick: fn(),
    onrowaction: fn()
  },
  argTypes: {
    hasControl: {
      control: "boolean",
      description: 'Show the controls bar above the content (search and the controls slot). On by default; `hascontrol="false"` turns it off from markup.'
    },
    hasFooter: { control: "boolean", description: "Show the footer with the page summary, rows per page and pagination. On by default." },
    hasSelectedCount: {
      control: "boolean",
      description: "Show the selected count label at the start of the controls bar while rows are selected. On by default."
    },
    hasRowsPerPage: { control: "boolean", description: "Show the rows per page select in the footer. On by default." },
    hasRowActions: { control: "boolean", description: "Show the actions column with a more button per row. On by default." },
    verticalScroll: { control: "boolean", description: "Cap the content height so rows scroll under a sticky header" },
    shape: { control: { type: "select" }, options: ["rounded", "sharp"], description: "Shape of the table and of every component inside it" },
    searchable: { control: "boolean", description: "Show the global search field in the controls bar" },
    refreshable: { control: "boolean", description: "Show the refresh button in the controls bar" },
    columnSearchable: { control: "boolean", description: "Show a search input under each column header" },
    columnFilterable: { control: "boolean", description: "Show a filter button in each column header" },
    selectOnRowClick: { control: "boolean", description: "Clicking a row toggles its selection" },
    clickableRows: { control: "boolean", description: "Rows show a pointer cursor and fire `rowclick`" },
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
      url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6717-3146&m=dev"
    },
    status: {
      type: "beta"
    }
  }
};

export default meta;

/** The default story. It matches the Figma frame: a selected count, search and controls above the content, and a footer below. */
export const TableAll: StoryObj<TableStory> = {
  args: {
    // The Figma frame has no title, no data count, and no column search or filter. Expandable shows the nested rows (every 3rd and 5th row)
    tableTitle: "",
    showDataCount: false,
    expandable: true,
    searchable: true,
    refreshable: true,
    columnSearchable: false,
    columnFilterable: false,
    selectOnRowClick: true,
    clickableRows: true,
    hasControl: true,
    hasFooter: true,
    hasSelectedCount: true,
    hasRowsPerPage: true,
    hasRowActions: true,
    verticalScroll: false,
    pageSize: 5,
    columns: figmaColumns,
    selectedRows: [2],
    disabledRows: [4]
  },
  render: args => {
    const {
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      oncolumnsearch: onColumnSearch,
      onpagechange: onPageChange,
      onloadmore: onLoadMore,
      ontableexport: onExport,
      onrowexpand: onExpand,
      onrowclick: onRowClick,
      onrowaction: onAction,
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
      searchable,
      refreshable,
      columnSearchable,
      columnFilterable,
      selectOnRowClick,
      clickableRows,
      hasControl,
      hasFooter,
      hasSelectedCount,
      hasRowsPerPage,
      hasRowActions,
      verticalScroll,
      shape,
      ...rest
    } = args;

    const masterData = (data as ZetaTableRow[] | undefined) ?? generateFigmaData(21);
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
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
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

    const handleRowAction = (e: CustomEvent<{ actionKey: string; row: unknown; rowIndex: number }>) => {
      const { actionKey, row, rowIndex } = e.detail;
      console.log("Row action:", { actionKey, rowIndex, row });
      (onAction as Function)?.();
    };

    const handleSortChange = function (this: ZetaTable, e: CustomEvent<{ field: string; direction: "asc" | "desc" | null }>) {
      const { field, direction } = e.detail;
      currentSort = { field, direction };
      currentPageNum = 1;
      updateTable(this);
      console.log("Sort changed:", { field, direction });
      (onSortChange as Function)?.();
    };

    const handleSelectionChange = (e: CustomEvent<{ selectedIds: (string | number)[] }>) => {
      const { selectedIds } = e.detail;
      console.log("Selection changed:", selectedIds);
      (onSelChange as Function)?.();
    };

    const handlePageChange = function (this: ZetaTable, e: CustomEvent<{ page: number; pageSize: number }>) {
      const { page, pageSize: pgSize } = e.detail;
      currentPageNum = page;
      updateTable(this);
      console.log("Page changed:", { page, pageSize: pgSize });
      (onPageChange as Function)?.();
    };

    const handleLoadMore = (e: CustomEvent<{ currentCount: number }>) => {
      const { currentCount } = e.detail;
      console.log("Load more requested, current count:", currentCount);
      (onLoadMore as Function)?.();
    };

    const handleExport = (e: CustomEvent<{ csv: string; columns: ZetaTableColumn[]; data: ZetaTableRow[] }>) => {
      console.log("Export triggered, rows:", e.detail.data.length);
      (onExport as Function)?.();
    };

    const handleRowExpand = (e: CustomEvent<{ rowId: string | number; expanded: boolean }>) => {
      const { rowId, expanded } = e.detail;
      console.log("Row expand toggled:", { rowId, expanded });
      (onExpand as Function)?.();
    };

    const handleTableSearch = function (this: ZetaTable, e: CustomEvent<{ value: string }>) {
      const searchTerm = e.detail.value;
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

    const handleColumnSearch = function (this: ZetaTable, e: CustomEvent<{ field: string; value: string; searchValues: Record<string, string> }>) {
      const { field, value, searchValues: allSearchValues } = e.detail;
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

    const handleColumnFilter = function (this: ZetaTable, e: CustomEvent<{ field: string; selectedValues: string[] }>) {
      const { field, selectedValues } = e.detail;
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

    // The table fills this container, so the footer floats to the bottom of the window. The rows scroll under the sticky header when they don't fit
    return html`
      <div style="height: calc(100vh - var(--space-xl) * 2); min-height: 480px;">
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
          .searchable=${searchable ?? false}
          .refreshable=${refreshable ?? false}
          .columnSearchable=${columnSearchable ?? false}
          .columnFilterable=${columnFilterable ?? false}
          .selectOnRowClick=${selectOnRowClick ?? false}
          .clickableRows=${clickableRows ?? false}
          .hasControl=${hasControl ?? true}
          .hasFooter=${hasFooter ?? true}
          .hasSelectedCount=${hasSelectedCount ?? true}
          .hasRowsPerPage=${hasRowsPerPage ?? true}
          .hasRowActions=${hasRowActions ?? true}
          .verticalScroll=${verticalScroll ?? false}
          .shape=${shape ?? "rounded"}
          @rowaction=${handleRowAction}
          @tablesearch=${handleTableSearch}
          @columnsearch=${handleColumnSearch}
          @columnfilter=${handleColumnFilter}
          @tablerefresh=${handleRefresh}
          @sortchange=${handleSortChange}
          @rowselect=${handleSelectionChange}
          @pagechange=${handlePageChange}
          @loadmore=${handleLoadMore}
          @tableexport=${handleExport}
          @rowexpand=${handleRowExpand}
          @rowclick=${onRowClick}
          style=${cssVarsStyle(args)}
        >
          <zeta-icon-button slot="controls" flavor="outline-subtle" size="small" title="More" aria-label="More">more_vertical</zeta-icon-button>
        </zeta-table>
      </div>
    `;
  }
};

export const InfiniteScrollWithAPI: StoryObj<TableStory> = {
  args: {
    paginationType: "infinite",
    expandable: false,
    showDataCount: false,
    tableTitle: "Infinite Scroll",
    selectable: true,
    selectAll: true,
    columnConfigure: true,
    exportable: false
  },
  render: args => {
    const { columns, selectable, selectAll, columnConfigure, showDataCount, tableTitle } = args;
    const totalRecords = 100;
    let currentData = generateData(20);
    let isLoading = false;
    let hasMoreData = true;

    const handleLoadMore = function (e: CustomEvent) {
      const table = e.target as ZetaTable;
      const { currentCount } = e.detail;
      if (isLoading || !hasMoreData) return;
      isLoading = true;
      table.loading = true;

      setTimeout(() => {
        const nextBatch = generateData(currentCount + 20).slice(currentCount);
        currentData = [...currentData, ...nextBatch];
        isLoading = false;
        hasMoreData = currentData.length < totalRecords;
        table.data = [...currentData];
        table.loading = false;
        table.hasMoreData = hasMoreData;
        console.log(`Loaded ${currentData.length} of ${totalRecords} rows`);
      }, 2000);
    };

    // Use the design-system spinner. A hand-rolled SVG needs its @keyframes inside the table's
    // shadow root (document-level keyframes don't reach it), so it never rotated and only
    // showed a static partial arc.
    const loadingEl = document.createElement("div");
    loadingEl.style.cssText = "display:flex; align-items:center; justify-content:center; gap:var(--space-sm); padding:var(--space-md);";
    const spinner = document.createElement("zeta-progress-circle") as ZetaProgressCircle;
    spinner.size = 24;
    spinner.indeterminate = true;
    spinner.hideTrack = true;
    const loadingText = document.createElement("span");
    loadingText.style.cssText = "color:var(--foreground-cursor); font:var(--label-small);";
    loadingText.textContent = "Fetching more records...";
    loadingEl.appendChild(spinner);
    loadingEl.appendChild(loadingText);

    return html`
      <zeta-table
        .paginationType=${"infinite"}
        .selectable=${selectable ?? false}
        .selectAll=${selectAll ?? false}
        .columnConfigure=${columnConfigure ?? false}
        .showDataCount=${showDataCount ?? false}
        .tableTitle=${tableTitle ?? ""}
        .columns=${columns}
        .data=${currentData}
        .totalItems=${totalRecords}
        @loadmore=${handleLoadMore}
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
    const { columns, pageSize, selectable, selectAll, columnConfigure, showDataCount, tableTitle } = args;
    const totalRecords = 55;
    const allData = generateData(totalRecords);

    const handlePageChange = function (e: CustomEvent) {
      const table = e.target as ZetaTable;
      const { page, pageSize: pgSize } = e.detail;
      table.loading = true;

      setTimeout(() => {
        const start = (page - 1) * pgSize;
        const pageData = allData.slice(start, start + pgSize);
        table.data = pageData;
        table.loading = false;
        console.log(`Fetched page ${page}: rows ${start + 1}-${start + pageData.length} of ${totalRecords}`);
      }, 500);
    };

    const handleRefresh = function (e: CustomEvent) {
      const table = e.target as ZetaTable;
      table.loading = true;
      console.log("Refreshing data...");

      setTimeout(() => {
        table.data = allData.slice(0, 10);
        table.loading = false;
        console.log("Data refreshed!");
      }, 800);
    };

    return html`
      <zeta-table
        .paginationType=${"numbered"}
        .pageSize=${pageSize ?? 10}
        .selectable=${selectable ?? false}
        .selectAll=${selectAll ?? false}
        .columnConfigure=${columnConfigure ?? false}
        .showDataCount=${showDataCount ?? false}
        .tableTitle=${tableTitle ?? ""}
        .columns=${columns}
        .data=${allData.slice(0, 10)}
        .totalItems=${totalRecords}
        refreshable
        @tablerefresh=${handleRefresh}
        @pagechange=${handlePageChange}
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
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      oncolumnsearch: onColumnSearch,
      onpagechange: onPageChange,
      onloadmore: onLoadMore,
      ontableexport: onExport,
      onrowexpand: onExpand,
      onrowclick: onRowClick,
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
        @rowselect=${onSelChange}
        @sortchange=${onSortChange}
        @columnsearch=${onColumnSearch}
        @pagechange=${onPageChange}
        @loadmore=${onLoadMore}
        @tableexport=${onExport}
        @rowexpand=${onExpand}
        @rowclick=${onRowClick}
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
    exportable: false
  },
  render: args => {
    const {
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      oncolumnsearch: onColumnSearch,
      onpagechange: onPageChange,
      onloadmore: onLoadMore,
      ontableexport: onExport,
      onrowexpand: onExpand,
      onrowclick: onRowClick,
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
          border-radius: var(--radius-md);
        }
        .custom-table .zeta-table-thead {
          background: var(--interactive-inverse-background-default);
        }
        .custom-table .zeta-table-th {
          background: var(--interactive-inverse-background-default);
          color: var(--foreground-inverse);
        }
        .custom-table .zeta-table-row:hover .zeta-table-td {
          background: var(--interactive-neutral-background-hover);
        }
      </style>
      <zeta-table
        class="custom-table"
        ${spread(rest)}
        .columns=${columns}
        .data=${data ?? generateData(25)}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${"Styled Table"}
        @rowselect=${onSelChange}
        @sortchange=${onSortChange}
        @columnsearch=${onColumnSearch}
        @pagechange=${onPageChange}
        @loadmore=${onLoadMore}
        @tableexport=${onExport}
        @rowexpand=${onExpand}
        @rowclick=${onRowClick}
        style=${cssVarsStyle(args, {
          "--table-header-bg": "var(--interactive-inverse-background-default)",
          "--table-header-text": "var(--foreground-inverse)",
          "--table-header-height": "calc(var(--space-md) * 2 + var(--control-sm))",
          "--table-row-height": "calc(var(--space-sm) * 2 + var(--control-sm))",
          "--table-row-hover-bg": "var(--interactive-neutral-background-hover)",
          "--table-row-selected-bg": "var(--interactive-neutral-background-selected)",
          "--table-row-active-bg": "var(--interactive-neutral-background-pressed)",
          "--table-border-radius": "var(--radius-md)",
          "--table-max-height": "400px"
        })}
      ></zeta-table>
    `;
  }
};

/** Expandable rows. `_nested` is either a DOM Node (custom content, every 5th row) or an array of rows (a sub-table, every 3rd row). */
export const NestedRows: StoryObj<TableStory> = {
  args: {
    paginationType: "numbered",
    pageSize: 10,
    expandable: true,
    selectable: true,
    selectAll: true,
    showDataCount: true,
    tableTitle: "Nested rows",
    columnConfigure: true,
    exportable: true
  },
  render: args => {
    const {
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      oncolumnsearch: onColumnSearch,
      onpagechange: onPageChange,
      onloadmore: onLoadMore,
      ontableexport: onExport,
      onrowexpand: onExpand,
      onrowclick: onRowClick,
      onrowaction: onAction,
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
        .data=${data ?? generateData(50)}
        .selectedRows=${selectedRows || []}
        .disabledRows=${disabledRows || []}
        .showDataCount=${showDataCount}
        .tableTitle=${tableTitle}
        @rowselect=${onSelChange}
        @sortchange=${onSortChange}
        @columnsearch=${onColumnSearch}
        @pagechange=${onPageChange}
        @loadmore=${onLoadMore}
        @tableexport=${onExport}
        @rowexpand=${onExpand}
        @rowclick=${onRowClick}
        @rowaction=${onAction}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
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
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      oncolumnsearch: onColumnSearch,
      onpagechange: onPageChange,
      onrowaction: onAction,
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
          { key: "view", label: "View Details", icon: "visibility" },
          { key: "audit", label: "View Audit Log", icon: "assignment" }
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
          { key: "view", label: "View Details", icon: "visibility" },
          { key: "edit", label: "Edit", icon: "edit" },
          { key: "wipe", label: "Wipe Computer", icon: "laptop" },
          { key: "delete", label: "Delete Computer", icon: "delete" }
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
          { key: "view", label: "View Details", icon: "visibility" },
          { key: "edit", label: "Edit", icon: "edit" },
          { key: "promote", label: "Promote", icon: "upload" }
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
        _actions: [{ key: "view", label: "View Details", icon: "visibility" }]
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
          { key: "view", label: "View Details", icon: "visibility" },
          { key: "edit", label: "Edit", icon: "edit" },
          { key: "delete", label: "Delete Computer", icon: "delete", disabled: true }
        ]
      }
    ];

    const handleRowAction = (e: CustomEvent<{ actionKey: string; row: unknown; rowIndex: number }>) => {
      const { actionKey, row, rowIndex } = e.detail;
      console.log("Row action:", { actionKey, rowIndex, row });
      (onAction as Function)?.();
    };

    return html`
      <p style="margin-bottom:var(--space-md); font:var(--body-xsmall); color:var(--foreground-secondary);">
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
        @rowaction=${handleRowAction}
        @rowselect=${onSelChange}
        @sortchange=${onSortChange}
        @columnsearch=${onColumnSearch}
        @pagechange=${onPageChange}
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
      onselectionchange: onSelChange,
      onsortchange: onSortChange,
      onpagechange: onPageChange,
      columns,
      selectedRows,
      disabledRows,
      showDataCount,
      tableTitle,
      ...rest
    } = args;

    const allData = generateData(50);

    const handleTableSearch = function (this: ZetaTable, e: CustomEvent<{ value: string }>) {
      const searchTerm = e.detail.value;
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

    const handleColumnSearch = function (this: ZetaTable, e: CustomEvent<{ field: string; value: string; searchValues: Record<string, string> }>) {
      const { field, value, searchValues: allFilters } = e.detail;
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

    const handleColumnFilter = function (this: ZetaTable, e: CustomEvent<{ field: string; selectedValues: string[] }>) {
      const { field, selectedValues } = e.detail;
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

    const handleRowAction = (e: CustomEvent<{ actionKey: string; row: unknown; rowIndex: number }>) => {
      const { actionKey, row, rowIndex } = e.detail;
      console.log("Action:", { actionKey, rowIndex, row });
    };

    const handleRefresh = function (this: ZetaTable) {
      this.data = [...allData];
      this.totalItems = allData.length;
      console.log("Data refreshed");
    };

    return html`
      <p style="margin-bottom:var(--space-md); font:var(--body-xsmall); color:var(--foreground-secondary);">
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
        searchable
        column-searchable
        column-filterable
        refreshable
        @tablesearch=${handleTableSearch}
        @columnsearch=${handleColumnSearch}
        @columnfilter=${handleColumnFilter}
        @rowaction=${handleRowAction}
        @tablerefresh=${handleRefresh}
        search-placeholder="Search all columns..."
        @rowselect=${onSelChange}
        @sortchange=${onSortChange}
        @pagechange=${onPageChange}
        style=${cssVarsStyle(args, { "--table-max-height": "500px" })}
      ></zeta-table>
    `;
  }
};
