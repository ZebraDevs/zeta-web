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

async function make(overrides: Partial<ZetaTable> = {}): Promise<ZetaTable> {
  const el = await fixture<ZetaTable>(html`<zeta-table></zeta-table>`);
  el.columns = (overrides.columns as ZetaTableColumn[]) ?? cols3;
  el.data = (overrides.data as ZetaTableRow[]) ?? rows3;
  const { columns: _c, data: _d, ...rest } = overrides;
  Object.assign(el, rest);
  await el.updateComplete;
  return el;
}

function shadow(el: ZetaTable) {
  return el.shadowRoot!;
}

describe("zeta-table additional coverage", () => {
  describe("Content", () => {
    it("renders expand toggle for expandable rows", async () => {
      const data: ZetaTableRow[] = [{ id: 1, name: "Alice", age: 30, email: "alice@t.com", _nested: [{ id: 11, name: "Child", age: 5, email: "c@t.com" }] }];
      const el = await make({ data, expandable: true });
      expect(shadow(el).querySelector(".zeta-table-col-expand")).to.exist;
      expect(shadow(el).querySelector(".zeta-table-expand-btn")).to.exist;
    });

    it("renders nested row content after expansion", async () => {
      const data: ZetaTableRow[] = [{ id: 1, name: "Alice", age: 30, email: "alice@t.com", _nested: [{ id: 11, name: "Child", age: 5, email: "c@t.com" }] }];
      const el = await make({ data, expandable: true });
      const btn = shadow(el).querySelector(".zeta-table-expand-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-nested-row")).to.exist;
    });

    it("dispatches tableExport event with CSV data", async () => {
      const el = await make({ exportable: true });
      const exportBtn = shadow(el).querySelector("[title='Export to CSV']") as HTMLElement;
      setTimeout(() => exportBtn.click());
      const ev = await oneEvent(el, "tableExport");
      assert.isString(ev.detail.csv as string);
      assert.isArray(ev.detail.columns);
      assert.isArray(ev.detail.data);
      assert.include(ev.detail.csv as string, "Name");
      assert.include(ev.detail.csv as string, "Alice");
    });

    it("renders sentinel when paginationType is infinite", async () => {
      const el = await make({ paginationType: "infinite" });
      expect(shadow(el).querySelector(".zeta-table-infinite-sentinel")).to.exist;
    });

    it("shows loading row when loading is true", async () => {
      const el = await make({ paginationType: "infinite", loading: true });
      expect(shadow(el).querySelector(".zeta-table-loading-row")).to.exist;
    });

    it("does not show loading row when loading is false", async () => {
      const el = await make({ paginationType: "infinite", loading: false });
      expect(shadow(el).querySelector(".zeta-table-loading-row")).to.not.exist;
    });

    it("tooltip element is present but hidden", async () => {
      const el = await make();
      const tooltip = shadow(el).querySelector(".zeta-table-tooltip");
      expect(tooltip).to.exist;
      assert.isFalse(tooltip!.classList.contains("zeta-table-tooltip--visible"));
    });

    it("renders JSON objects as stringified text", async () => {
      const el = await make({ data: [{ id: 1, name: { x: 1 }, age: 20, email: "e@t.com" }] });
      const cells = shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row .zeta-table-cell-content");
      const found = Array.from(cells).some(c => c.textContent?.includes('{"x":1}'));
      assert.isTrue(found);
    });

    it("renders null cells as empty", async () => {
      const el = await make({ data: [{ id: 1, name: null, age: 20, email: "e@t.com" }] });
      const cells = shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row .zeta-table-cell-content");
      const firstCell = cells[0];
      assert.equal(firstCell?.textContent?.trim(), "");
    });

    it("shows global search when searchable is true", async () => {
      const el = await make({ searchable: true });
      expect(shadow(el).querySelector(".zeta-table-global-search-input")).to.exist;
    });

    it("does not show global search when searchable is false", async () => {
      const el = await make({ searchable: false });
      expect(shadow(el).querySelector(".zeta-table-global-search-input")).to.not.exist;
    });

    it("shows refresh button when refreshable is true", async () => {
      const el = await make({ refreshable: true });
      expect(shadow(el).querySelector("[title='Refresh']")).to.exist;
    });

    it("does not show refresh button when refreshable is false", async () => {
      const el = await make({ refreshable: false });
      expect(shadow(el).querySelector("[title='Refresh']")).to.not.exist;
    });

    it("shows all columns in configure panel", async () => {
      const el = await make({ columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      const items = shadow(el).querySelectorAll(".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item");
      assert.equal(items.length, 3);
    });
  });

  describe("Interaction", () => {
    it("dispatches rowClick event when clickableRows is true", async () => {
      const el = await make({ clickableRows: true });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      setTimeout(() => row.click());
      const ev = await oneEvent(el, "rowClick");
      assert.equal(ev.detail.row.id, 1);
      assert.equal(ev.detail.rowIndex, 0);
      assert.deepEqual(ev.detail.row, rows3[0]);
    });

    it("does not dispatch rowClick when clickableRows is false", async () => {
      let called = false;
      const el = await make();
      el.addEventListener("rowClick", () => {
        called = true;
      });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      row.click();
      await el.updateComplete;
      assert.isFalse(called);
    });

    it("does not dispatch rowClick for disabled rows", async () => {
      let called = false;
      const data: ZetaTableRow[] = [{ id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true }];
      const el = await make({ data, clickableRows: true });
      el.addEventListener("rowClick", () => {
        called = true;
      });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      row.click();
      await el.updateComplete;
      assert.isFalse(called);
    });

    it("dispatches rowClick for disabled rows when allowDisabledSelection is true", async () => {
      const data: ZetaTableRow[] = [{ id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true }];
      const el = await make({ data, clickableRows: true, allowDisabledSelection: true });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      setTimeout(() => row.click());
      const ev = await oneEvent(el, "rowClick");
      assert.equal(ev.detail.row.id, 1);
    });

    it("toggles selection when selectOnRowClick is true", async () => {
      const el = await make({ selectable: true, selectOnRowClick: true });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      setTimeout(() => row.click());
      const ev = await oneEvent(el, "selectionChange");
      assert.include(ev.detail.selectedIds as (string | number)[], 1);
    });

    it("deselects on second click with selectOnRowClick", async () => {
      const el = await make({ selectable: true, selectOnRowClick: true, selectedRows: [1] });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      setTimeout(() => row.click());
      const ev = await oneEvent(el, "selectionChange");
      assert.notInclude(ev.detail.selectedIds as (string | number)[], 1);
    });

    it("dispatches rowExpand event on toggle", async () => {
      const data: ZetaTableRow[] = [{ id: 1, name: "Alice", age: 30, email: "alice@t.com", _nested: [{ id: 11, name: "Child", age: 5, email: "c@t.com" }] }];
      const el = await make({ data, expandable: true });
      const btn = shadow(el).querySelector(".zeta-table-expand-btn") as HTMLElement;
      setTimeout(() => btn.click());
      const ev = await oneEvent(el, "rowExpand");
      assert.equal(ev.detail.rowId, 1);
      assert.isTrue(ev.detail.expanded);
    });

    it("collapses on second expand click", async () => {
      const data: ZetaTableRow[] = [{ id: 1, name: "Alice", age: 30, email: "alice@t.com", _nested: [{ id: 11, name: "Child", age: 5, email: "c@t.com" }] }];
      const el = await make({ data, expandable: true });
      const btn = shadow(el).querySelector(".zeta-table-expand-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      setTimeout(() => btn.click());
      const ev = await oneEvent(el, "rowExpand");
      assert.equal(ev.detail.rowId, 1);
      assert.isFalse(ev.detail.expanded);
    });

    it("does not sort disabled columns", async () => {
      let called = false;
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", disabled: true },
        { field: "age", title: "Age" }
      ];
      const el = await make({ columns: cols });
      el.addEventListener("sortChange", () => {
        called = true;
      });
      const headers = shadow(el).querySelectorAll(".zeta-table-header-title");
      (headers[0] as HTMLElement).click();
      await el.updateComplete;
      assert.isFalse(called);
    });

    it("navigates to a specific page number on click", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      const pageButtons = shadow(el).querySelectorAll<HTMLButtonElement>(".zeta-table-page-btn:not([title])");
      const page2Btn = Array.from(pageButtons).find(b => b.textContent?.trim() === "2");
      assert.exists(page2Btn);
      setTimeout(() => page2Btn?.click());
      const ev = await oneEvent(el, "pageChange");
      assert.equal(ev.detail.page, 2);
    });

    it("sets active row class on click", async () => {
      const el = await make({ clickableRows: true });
      const row = shadow(el).querySelector(".zeta-table-tbody .zeta-table-row") as HTMLElement;
      row.click();
      await el.updateComplete;
      assert.isTrue(row.classList.contains("zeta-table-row--active"));
    });
  });
});
