import { fixture, html, expect, assert, oneEvent } from "@open-wc/testing";
import type { ZetaTable, ZetaTableColumn, ZetaTableRow } from "../../components/table/table.js";
import "../../components/table/table.js";
import "../../index.css";

const cols3: ZetaTableColumn[] = [
  { field: "name", title: "Name", width: 200 },
  { field: "age", title: "Age", width: 100 },
  { field: "email", title: "Email", width: 250 }
];
const rows3: ZetaTableRow[] = [
  { id: 1, name: "Alice", age: 30, email: "alice@test.com" },
  { id: 2, name: "Bob", age: 25, email: "bob@test.com" },
  { id: 3, name: "Charlie", age: 35, email: "charlie@test.com" }
];

/**
 * Creates a ZetaTable fixture. Pass any public property of ZetaTable as an override.
 * New properties added to ZetaTable in the future are automatically supported
 * without modifying this function.
 */
async function make(overrides: Partial<ZetaTable> = {}): Promise<ZetaTable> {
  const el = await fixture<ZetaTable>(html`<zeta-table></zeta-table>`);
  el.columns = (overrides.columns as ZetaTableColumn[]) ?? cols3;
  el.data = (overrides.data as ZetaTableRow[]) ?? rows3;
  const { columns: _c, data: _d, ...rest } = overrides;
  Object.assign(el, rest);
  await el.updateComplete;
  return el;
}

describe("zeta-table interactions", () => {
  describe("Content", () => {
    it("creates element and renders structure", async () => {
      const el = document.createElement("zeta-table");
      assert.equal("ZETA-TABLE", el.nodeName);
      const el2 = await make();
      expect(el2.querySelector("table.zeta-table")).to.exist;
      assert.equal(el2.querySelectorAll(".zeta-table-header-row .zeta-table-th").length, 3);
      assert.equal(el2.querySelectorAll(".zeta-table-tbody .zeta-table-row").length, 3);
    });

    it("renders column titles, cell content, no-data, hidden cols", async () => {
      const el = await make();
      const titles = Array.from(el.querySelectorAll(".zeta-table-header-title")).map(t => t.textContent?.trim());
      assert.deepEqual(titles, ["Name", "Age", "Email"]);
      const el2 = await make({ data: [] });
      assert.equal(el2.querySelector(".zeta-table-no-data")?.textContent?.trim(), "No data available");
    });

    it("renders DOM nodes, null, and JSON values", async () => {
      const span = document.createElement("span");
      span.textContent = "Node";
      span.className = "custom-node";
      const el = await make({ data: [{ id: 1, name: span, age: { x: 1 }, email: null }] });
      expect(el.querySelector(".custom-node")?.textContent).to.equal("Node");
      const cells = el.querySelectorAll(".zeta-table-tbody .zeta-table-row .zeta-table-cell-content");
      assert.equal(cells[0]?.textContent?.trim(), JSON.stringify({ x: 1 }));
    });

    it("renders header bar with title, count, and toolbar", async () => {
      const el = await make({ tableTitle: "T", showDataCount: true, selectable: true, selectedRows: [1, 2] });
      assert.equal(el.querySelector(".zeta-table-title")?.textContent?.trim(), "T");
      assert.include(el.querySelector(".zeta-table-data-count")?.textContent, "3 out of 3");
      assert.include(el.querySelector(".zeta-table-selection-info")?.textContent, "2 row(s) selected");
    });
  });

  describe("Interaction", () => {
    it("renders checkboxes and pre-selects rows", async () => {
      const el = await make({ selectable: true, selectedRows: [1, 3] });
      expect(el.querySelectorAll(".zeta-table-col-checkbox").length).to.be.greaterThan(0);
      const cbs = el.querySelectorAll<HTMLInputElement>(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']");
      assert.isTrue(cbs[0]?.checked);
      assert.isFalse(cbs[1]?.checked);
      assert.isTrue(cbs[2]?.checked);
    });

    it("toggles selection and dispatches event", async () => {
      const el = await make({ selectable: true, onSelectionChange: () => {} });
      const cb = el.querySelector(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']") as HTMLInputElement;
      setTimeout(() => cb.click());
      const ev = await oneEvent(el, "zeta-table-selection-change");
      assert.include((ev as CustomEvent).detail.selectedIds, 1);
    });

    it("select-all toggles all", async () => {
      let ids: (string | number)[] = [];
      const el = await make({
        selectable: true,
        onSelectionChange: (s: (string | number)[]) => {
          ids = s;
        }
      });
      const sa = el.querySelector<HTMLInputElement>(".zeta-table-header-row .zeta-table-col-checkbox input[type='checkbox']")!;
      sa.click();
      await el.updateComplete;
      assert.equal(ids.length, 3);
      sa.click();
      await el.updateComplete;
      assert.equal(ids.length, 0);
    });

    it("handles disabled rows and _checkboxDisabled", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true },
        { id: 2, name: "B", age: 25, email: "b@t.com", _checkboxDisabled: true },
        { id: 3, name: "C", age: 35, email: "c@t.com" }
      ];
      const el = await make({ data, selectable: true });
      const cbs = el.querySelectorAll<HTMLInputElement>(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']");
      assert.isTrue(cbs[0]?.disabled);
      assert.isTrue(cbs[1]?.disabled);
      assert.isFalse(cbs[2]?.disabled);
    });

    it("cycles sort asc -> desc -> null", async () => {
      const dirs: (string | null)[] = [];
      const el = await make({
        onSortChange: (_f: string, d: string | null) => {
          dirs.push(d);
        }
      });
      const t = el.querySelector(".zeta-table-header-title--sortable") as HTMLElement;
      setTimeout(() => t.click());
      await oneEvent(el, "zeta-table-sort-change");
      t.click();
      await el.updateComplete;
      t.click();
      await el.updateComplete;
      assert.deepEqual(dirs, ["asc", "desc", null]);
    });

    it("sort arrow click and toggle", async () => {
      let dir: string | null = null;
      const el = await make({
        onSortChange: (_f: string, d: string | null) => {
          dir = d;
        }
      });
      const arrow = el.querySelector(".zeta-table-sort-arrow") as HTMLElement;
      arrow.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await el.updateComplete;
      assert.equal(dir, "asc");
      arrow.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await el.updateComplete;
      assert.equal(dir, null);
    });

    it("renders search row only when onColumnSearch is provided", async () => {
      expect((await make()).querySelector(".zeta-table-search-row")).to.not.exist;
      expect((await make({ onColumnSearch: () => {} })).querySelector(".zeta-table-search-row")).to.exist;
    });

    it("calls column search callback and dispatches event", async () => {
      let f = "",
        v = "";
      const el = await make({
        onColumnSearch: (field: string, val: string) => {
          f = field;
          v = val;
        }
      });
      const input = el.querySelector(".zeta-table-search-input:not([disabled])") as HTMLInputElement;
      setTimeout(() => {
        input.value = "test";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      });
      const ev = await oneEvent(el, "zeta-table-column-search");
      assert.equal(f, "name");
      assert.equal(v, "test");
      assert.equal((ev as CustomEvent).detail.field, "name");
    });

    it("disables search for disabled/non-filterable columns", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", disabled: true },
        { field: "age", title: "Age", filterable: false },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols, onColumnSearch: () => {} });
      assert.equal(el.querySelectorAll(".zeta-table-search-input:not([disabled])").length, 1);
    });

    it("resets page on column search with numbered pagination", async () => {
      const el = await make({ paginationType: "numbered", currentPage: 3, totalItems: 100, onColumnSearch: () => {} });
      const input = el.querySelector(".zeta-table-search-input:not([disabled])") as HTMLInputElement;
      input.value = "t";
      input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      await el.updateComplete;
      assert.include(el.querySelector(".zeta-table-page-info span")?.textContent, "Page 1");
    });

    it("calls global search callback and dispatches event", async () => {
      let term = "";
      const el = await make({
        onTableSearch: (v: string) => {
          term = v;
        }
      });
      const input = el.querySelector(".zeta-table-global-search-input") as HTMLInputElement;
      setTimeout(() => {
        input.value = "Alice";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      });
      const ev = await oneEvent(el, "zeta-table-search");
      assert.equal(term, "Alice");
      assert.equal((ev as CustomEvent).detail.value, "Alice");
    });

    it("opens/closes filter panel", async () => {
      const el = await make({ onColumnFilter: () => {} });
      const btn = el.querySelector(".zeta-table-header-icon-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-filter-panel")).to.exist;
      btn.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-filter-panel")).to.not.exist;
    });

    it("applies filter and dispatches event", async () => {
      let f = "",
        vals: string[] = [];
      const el = await make({
        onColumnFilter: (field: string, v: string[]) => {
          f = field;
          vals = v;
        }
      });
      (el.querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      (el.querySelector(".zeta-table-filter-panel-item input[type='checkbox']") as HTMLInputElement).click();
      await el.updateComplete;
      setTimeout(() => (el.querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click());
      await oneEvent(el, "zeta-table-column-filter");
      assert.equal(f, "name");
      assert.isAbove(vals.length, 0);
    });

    it("clears filter and removes active on empty apply", async () => {
      let vals: string[] = ["x"];
      const el = await make({
        onColumnFilter: (_f: string, v: string[]) => {
          vals = v;
        }
      });
      (el.querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      (el.querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click();
      await el.updateComplete;
      assert.equal(vals.length, 0);
    });

    it("opens/closes column configure panel and toggles visibility", async () => {
      const el = await make({ columnConfigure: true });
      const btn = el.querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-column-panel")).to.exist;
      const initial = el.querySelectorAll(".zeta-table-header-row .zeta-table-th").length;
      (el.querySelector(".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement).click();
      await el.updateComplete;
      assert.equal(el.querySelectorAll(".zeta-table-header-row .zeta-table-th").length, initial - 1);
    });

    it("prevents hiding last column", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name" }], data: [{ id: 1, name: "A" }], columnConfigure: true });
      (el.querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      assert.isTrue(
        (el.querySelector(".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement).disabled
      );
    });

    it("toggles column freeze", async () => {
      const el = await make({ columnConfigure: true });
      (el.querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      (el.querySelector(".zeta-table-column-panel-section:last-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement).click();
      await el.updateComplete;
      expect(el.querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen").length).to.be.greaterThan(0);
    });

    it("renders resize handles for resizable columns only", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", resizable: false },
        { field: "age", title: "Age" },
        { field: "email", title: "Email", disabled: true }
      ];
      const el = await make({ columns: cols });
      assert.equal(el.querySelectorAll(".zeta-table-resize-handle").length, 1);
    });

    it("handles resize drag and restore", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name", width: 200 }], data: [{ id: 1, name: "T" }] });
      const handle = el.querySelector(".zeta-table-resize-handle") as HTMLElement;
      handle.dispatchEvent(new MouseEvent("mousedown", { clientX: 200, bubbles: true }));
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 300, bubbles: true }));
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      await el.updateComplete;
      handle.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
      await el.updateComplete;
      const col = el.querySelector<HTMLElement>("colgroup col:not(.zeta-table-col-checkbox-width):not(.zeta-table-col-expand-width)")!;
      assert.include(col.style.width, "200px");
    });

    it("ignores mousemove without active resize", async () => {
      const el = await make();
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 300, bubbles: true }));
      await el.updateComplete;
      expect(el).to.exist;
    });
  });
});
