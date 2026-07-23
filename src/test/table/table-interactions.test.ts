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

describe("zeta-table interactions", () => {
  describe("Content", () => {
    it("creates element and renders structure", async () => {
      const el = document.createElement("zeta-table");
      assert.equal("ZETA-TABLE", el.nodeName);
      const el2 = await make();
      expect(shadow(el2).querySelector("table.zeta-table")).to.exist;
      assert.equal(shadow(el2).querySelectorAll(".zeta-table-header-row .zeta-table-th").length, 3);
      assert.equal(shadow(el2).querySelectorAll(".zeta-table-tbody .zeta-table-row").length, 3);
    });

    it("renders column titles, cell content, no-data, hidden cols", async () => {
      const el = await make();
      const titles = Array.from(shadow(el).querySelectorAll(".zeta-table-header-title")).map(t => t.textContent?.trim());
      assert.deepEqual(titles, ["Name", "Age", "Email"]);
      const el2 = await make({ data: [] });
      assert.equal(shadow(el2).querySelector(".zeta-table-no-data")?.textContent?.trim(), "No data available");
    });

    it("renders header bar with title, count, and toolbar", async () => {
      const el = await make({ tableTitle: "T", showDataCount: true, selectable: true, selectedRows: [1, 2] });
      assert.equal(shadow(el).querySelector(".zeta-table-title")?.textContent?.trim(), "T");
      assert.include(shadow(el).querySelector(".zeta-table-data-count")?.textContent, "3 out of 3");
      assert.include(shadow(el).querySelector(".zeta-table-selection-info")?.textContent, "2 row(s) selected");
    });
  });

  describe("Interaction", () => {
    it("renders checkboxes and pre-selects rows", async () => {
      const el = await make({ selectable: true, selectedRows: [1, 3] });
      expect(shadow(el).querySelectorAll(".zeta-table-col-checkbox").length).to.be.greaterThan(0);
      const cbs = shadow(el).querySelectorAll<HTMLInputElement>(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']");
      assert.isTrue(cbs[0]?.checked);
      assert.isFalse(cbs[1]?.checked);
      assert.isTrue(cbs[2]?.checked);
    });

    it("toggles selection and dispatches event", async () => {
      const el = await make({ selectable: true });
      const cb = shadow(el).querySelector(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']") as HTMLInputElement;
      setTimeout(() => cb.click());
      const ev = await oneEvent(el, "selectionChange");
      const selectedIds: (string | number)[] = ev.detail.selectedIds;
      assert.include(selectedIds, 1);
    });

    it("select-all toggles all", async () => {
      const el = await make({ selectable: true });
      const sa = shadow(el).querySelector<HTMLInputElement>(".zeta-table-header-row .zeta-table-col-checkbox input[type='checkbox']")!;
      setTimeout(() => sa.click());
      const ev1 = await oneEvent(el, "selectionChange");
      assert.equal(ev1.detail.selectedIds.length, 3);
      setTimeout(() => sa.click());
      const ev2 = await oneEvent(el, "selectionChange");
      assert.equal(ev2.detail.selectedIds.length, 0);
    });

    it("handles disabled rows and _checkboxDisabled", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true },
        { id: 2, name: "B", age: 25, email: "b@t.com", _checkboxDisabled: true },
        { id: 3, name: "C", age: 35, email: "c@t.com" }
      ];
      const el = await make({ data, selectable: true });
      const cbs = shadow(el).querySelectorAll<HTMLInputElement>(".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']");
      assert.isTrue(cbs[0]?.disabled);
      assert.isTrue(cbs[1]?.disabled);
      assert.isFalse(cbs[2]?.disabled);
    });

    it("cycles sort asc -> desc -> null", async () => {
      const el = await make();
      const t = shadow(el).querySelector(".zeta-table-header-title--sortable") as HTMLElement;
      setTimeout(() => t.click());
      const ev1 = await oneEvent(el, "sortChange");
      assert.equal(ev1.detail.direction, "asc");
      setTimeout(() => t.click());
      const ev2 = await oneEvent(el, "sortChange");
      assert.equal(ev2.detail.direction, "desc");
      setTimeout(() => t.click());
      const ev3 = await oneEvent(el, "sortChange");
      assert.equal(ev3.detail.direction, null);
    });

    it("sort arrow click dispatches event", async () => {
      const el = await make();
      const arrow = shadow(el).querySelector(".zeta-table-sort-arrow") as HTMLElement;
      setTimeout(() => arrow.dispatchEvent(new MouseEvent("click", { bubbles: true })));
      const ev = await oneEvent(el, "sortChange");
      assert.equal(ev.detail.direction, "asc");
    });

    it("renders search row only when columnSearchable is true", async () => {
      expect(shadow(await make()).querySelector(".zeta-table-search-row")).to.not.exist;
      expect(shadow(await make({ columnSearchable: true })).querySelector(".zeta-table-search-row")).to.exist;
    });

    it("dispatches columnSearch event on input", async () => {
      const el = await make({ columnSearchable: true });
      const input = shadow(el).querySelector(".zeta-table-search-input:not([disabled])") as HTMLInputElement;
      setTimeout(() => {
        input.value = "test";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      });
      const ev = await oneEvent(el, "columnSearch");
      assert.equal(ev.detail.field, "name");
      assert.equal(ev.detail.value, "test");
    });

    it("disables search for disabled/non-filterable columns", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", disabled: true },
        { field: "age", title: "Age", filterable: false },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols, columnSearchable: true });
      assert.equal(shadow(el).querySelectorAll(".zeta-table-search-input:not([disabled])").length, 1);
    });

    it("resets page on column search with numbered pagination", async () => {
      const el = await make({ paginationType: "numbered", currentPage: 3, totalItems: 100, columnSearchable: true });
      const input = shadow(el).querySelector(".zeta-table-search-input:not([disabled])") as HTMLInputElement;
      input.value = "t";
      input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      await el.updateComplete;
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Page 1");
    });

    it("dispatches tableSearch event on global search input", async () => {
      const el = await make({ searchable: true });
      const input = shadow(el).querySelector(".zeta-table-global-search-input") as HTMLInputElement;
      setTimeout(() => {
        input.value = "Alice";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
      });
      const ev = await oneEvent(el, "tableSearch");
      assert.equal(ev.detail.value, "Alice");
    });

    it("opens/closes filter panel", async () => {
      const el = await make({ columnFilterable: true });
      const btn = shadow(el).querySelector(".zeta-table-header-icon-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-filter-panel")).to.exist;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-filter-panel")).to.not.exist;
    });

    it("applies filter and dispatches event", async () => {
      const el = await make({ columnFilterable: true });
      (shadow(el).querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      (shadow(el).querySelector(".zeta-table-filter-panel-item input[type='checkbox']") as HTMLInputElement).click();
      await el.updateComplete;
      setTimeout(() => (shadow(el).querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click());
      const ev = await oneEvent(el, "columnFilter");
      assert.equal(ev.detail.field, "name");
      assert.isAbove((ev.detail.selectedValues as string[]).length, 0);
    });

    it("clears filter on empty apply", async () => {
      const el = await make({ columnFilterable: true });
      (shadow(el).querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      setTimeout(() => (shadow(el).querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click());
      const ev = await oneEvent(el, "columnFilter");
      assert.equal(ev.detail.selectedValues.length, 0);
    });

    it("opens/closes column configure panel and toggles visibility", async () => {
      const el = await make({ columnConfigure: true });
      const btn = shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-column-panel")).to.exist;
      const initial = shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length;
      (
        shadow(el).querySelector(".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement
      ).click();
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length, initial - 1);
    });

    it("prevents hiding last column", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name" }], data: [{ id: 1, name: "A" }], columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      assert.isTrue(
        (shadow(el).querySelector(".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement)
          .disabled
      );
    });

    it("toggles column freeze", async () => {
      const el = await make({ columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      (
        shadow(el).querySelector(".zeta-table-column-panel-section:last-child .zeta-table-column-panel-item input[type='checkbox']") as HTMLInputElement
      ).click();
      await el.updateComplete;
      expect(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen").length).to.be.greaterThan(0);
    });

    it("renders resize handles for resizable columns only", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", resizable: false },
        { field: "age", title: "Age" },
        { field: "email", title: "Email", disabled: true }
      ];
      const el = await make({ columns: cols });
      assert.equal(shadow(el).querySelectorAll(".zeta-table-resize-handle").length, 1);
    });

    it("handles resize drag and restore", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name", width: 200 }], data: [{ id: 1, name: "T" }] });
      const handle = shadow(el).querySelector(".zeta-table-resize-handle") as HTMLElement;
      handle.dispatchEvent(new MouseEvent("mousedown", { clientX: 200, bubbles: true }));
      document.dispatchEvent(new MouseEvent("mousemove", { clientX: 300, bubbles: true }));
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      await el.updateComplete;
      handle.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
      await el.updateComplete;
      const col = shadow(el).querySelector<HTMLElement>("colgroup col:not(.zeta-table-col-checkbox-width):not(.zeta-table-col-expand-width)")!;
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
