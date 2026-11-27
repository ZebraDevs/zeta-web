import { fixture, html, expect, assert, oneEvent } from "@open-wc/testing";
import { sendMouse } from "@web/test-runner-commands";
import type { ZetaTable, ZetaTableColumn, ZetaTableRow } from "../../components/table/table.js";
import type { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
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

/** The zeta-checkbox matching the selector, inside the table. */
function checkbox(el: ZetaTable, selector: string) {
  return shadow(el).querySelector<ZetaCheckbox>(selector)!;
}

/** The native input inside a zeta-checkbox, which is what a user clicks. */
function nativeInput(cb: Element) {
  return cb.shadowRoot!.querySelector<HTMLInputElement>("input")!;
}

describe("zeta-table interactions", () => {
  describe("Content", () => {
    it("creates element and renders structure", async () => {
      const el = document.createElement("zeta-table");
      assert.equal("ZETA-TABLE", el.nodeName);
      const el2 = await make({ selectable: false });
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

    // Regression: a custom element that points back to itself (like zeta-avatar) made JSON.stringify throw in the row label
    it("renders custom cells that point back to themselves, and names the row checkbox from the first text", async () => {
      const avatar = Object.assign(document.createElement("span"), { textContent: "AB" });
      Object.assign(avatar, { renderOptions: { host: avatar } });
      const name = document.createElement("span");
      name.textContent = "Alice";
      const el = await make({
        selectable: true,
        columns: [
          { field: "avatar", title: "Avatar" },
          { field: "name", title: "Name" }
        ],
        data: [{ id: 1, avatar, name }]
      });
      assert.equal(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row").length, 1);
      assert.equal(shadow(el).querySelector(".zeta-table-tbody zeta-checkbox")!.textContent.trim(), "Select row: AB");
    });

    it("renders header bar with title, count, and toolbar", async () => {
      const el = await make({ tableTitle: "T", showDataCount: true, selectable: true, selectedRows: [1, 2] });
      assert.equal(shadow(el).querySelector(".zeta-table-title")?.textContent?.trim(), "T");
      assert.include(shadow(el).querySelector(".zeta-table-data-count")?.textContent, "3 out of 3");
      assert.include(shadow(el).querySelector(".zeta-table-selection-info")?.textContent, "2 selected");
    });
  });

  describe("Interaction", () => {
    it("renders checkboxes and pre-selects rows", async () => {
      const el = await make({ selectable: true, selectedRows: [1, 3] });
      expect(shadow(el).querySelectorAll(".zeta-table-col-checkbox").length).to.be.greaterThan(0);
      const cbs = shadow(el).querySelectorAll<ZetaCheckbox>(".zeta-table-tbody .zeta-table-col-checkbox zeta-checkbox");
      assert.isTrue(cbs[0]?.checked);
      assert.isFalse(cbs[1]?.checked);
      assert.isTrue(cbs[2]?.checked);
    });

    it("toggles selection and dispatches event", async () => {
      const el = await make({ selectable: true });
      const cb = checkbox(el, ".zeta-table-tbody .zeta-table-col-checkbox zeta-checkbox");
      setTimeout(() => nativeInput(cb).click());
      const ev = await oneEvent(el, "rowselect");
      const selectedIds: (string | number)[] = ev.detail.selectedIds;
      assert.include(selectedIds, 1);
    });

    it("select-all toggles all", async () => {
      const el = await make({ selectable: true });
      const sa = nativeInput(checkbox(el, ".zeta-table-header-row .zeta-table-col-checkbox zeta-checkbox"));
      setTimeout(() => sa.click());
      const ev1 = await oneEvent(el, "rowselect");
      assert.equal(ev1.detail.selectedIds.length, 3);
      setTimeout(() => sa.click());
      const ev2 = await oneEvent(el, "rowselect");
      assert.equal(ev2.detail.selectedIds.length, 0);
    });

    it("handles disabled rows and _checkboxDisabled", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true },
        { id: 2, name: "B", age: 25, email: "b@t.com", _checkboxDisabled: true },
        { id: 3, name: "C", age: 35, email: "c@t.com" }
      ];
      const el = await make({ data, selectable: true });
      const cbs = shadow(el).querySelectorAll<ZetaCheckbox>(".zeta-table-tbody .zeta-table-col-checkbox zeta-checkbox");
      assert.isTrue(cbs[0]?.disabled);
      assert.isTrue(cbs[1]?.disabled);
      assert.isFalse(cbs[2]?.disabled);
    });

    it("cycles sort asc -> desc -> null", async () => {
      const el = await make();
      const t = shadow(el).querySelector(".zeta-table-header-title--sortable") as HTMLElement;
      setTimeout(() => t.click());
      const ev1 = await oneEvent(el, "sortchange");
      assert.equal(ev1.detail.direction, "asc");
      setTimeout(() => t.click());
      const ev2 = await oneEvent(el, "sortchange");
      assert.equal(ev2.detail.direction, "desc");
      setTimeout(() => t.click());
      const ev3 = await oneEvent(el, "sortchange");
      assert.equal(ev3.detail.direction, null);
    });

    it("sort arrow click dispatches event", async () => {
      const el = await make();
      const arrow = shadow(el).querySelector(".zeta-table-sort-arrow") as HTMLElement;
      setTimeout(() => arrow.dispatchEvent(new MouseEvent("click", { bubbles: true })));
      const ev = await oneEvent(el, "sortchange");
      assert.equal(ev.detail.direction, "asc");
    });

    const many: ZetaTableRow[] = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}`, age: (i * 7) % 25, email: `r${i + 1}@t.com` }));
    /** The text of the first column on the rows that are on screen. */
    const names = (el: ZetaTable) =>
      Array.from(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row")).map(r =>
        r.querySelector(".zeta-table-td--data .zeta-table-cell-content")!.textContent.trim()
      );
    const sortBy = async (el: ZetaTable, index: number) => {
      shadow(el).querySelectorAll<HTMLElement>(".zeta-table-header-title--sortable")[index].click();
      await el.updateComplete;
    };

    it("sorts every row, not only the rows of the current page, and then shows the page", async () => {
      const el = await make({ data: many, paginationType: "numbered", pageSize: 10 });
      await sortBy(el, 1);
      assert.equal(names(el).length, 10);
      // age is (i * 7) % 25, so 0..24 once each: the first page of an ascending sort holds the ten smallest of all 25 rows
      const ages = Array.from(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row")).map(r =>
        Number(r.querySelectorAll(".zeta-table-td--data .zeta-table-cell-content")[1].textContent)
      );
      assert.deepEqual(ages, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      await sortBy(el, 1);
      const desc = Array.from(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row")).map(r =>
        Number(r.querySelectorAll(".zeta-table-td--data .zeta-table-cell-content")[1].textContent)
      );
      assert.deepEqual(desc, [24, 23, 22, 21, 20, 19, 18, 17, 16, 15]);
    });

    it("goes back to the first page when the sort changes", async () => {
      const el = await make({ data: many, paginationType: "numbered", pageSize: 10, currentPage: 3 });
      assert.equal(names(el).length, 5);
      await sortBy(el, 0);
      assert.equal(shadow(el).querySelector(".zeta-table-page-details")!.textContent.trim(), "Showing 1-10 of 25");
      assert.equal(names(el).length, 10);
    });

    it("puts the original order back when the sort is cleared", async () => {
      const el = await make({ data: many, paginationType: "numbered", pageSize: 5 });
      await sortBy(el, 1);
      await sortBy(el, 1);
      await sortBy(el, 1);
      assert.deepEqual(names(el), ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"]);
    });

    it("orders text naturally, so Row 2 comes before Row 10", async () => {
      const el = await make({ data: many, paginationType: "numbered", pageSize: 12 });
      await sortBy(el, 0);
      assert.deepEqual(names(el).slice(0, 3), ["Row 1", "Row 2", "Row 3"]);
      assert.equal(names(el)[9], "Row 10");
    });

    it("sorts the text of custom cells, and leaves empty cells last in both directions", async () => {
      const cell = (text: string) => {
        const span = document.createElement("span");
        span.textContent = text;
        return span;
      };
      const data: ZetaTableRow[] = [
        { id: 1, name: cell("b"), age: 1, email: "" },
        { id: 2, name: cell("a"), age: 1, email: "" },
        { id: 3, name: "", age: 1, email: "" }
      ];
      const el = await make({ data });
      const first = () =>
        Array.from(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row")).map(r => r.querySelector(".zeta-table-td--data")!.textContent.trim());
      await sortBy(el, 0);
      assert.deepEqual(first(), ["a", "b", ""]);
      await sortBy(el, 0);
      assert.deepEqual(first(), ["b", "a", ""]);
    });

    it("leaves the order to the consumer when data is one page of a larger collection", async () => {
      const page = many.slice(0, 5);
      const el = await make({ data: page, paginationType: "numbered", pageSize: 5, totalItems: 25 });
      await sortBy(el, 1);
      assert.deepEqual(names(el), ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"]);
    });

    it("leaves the order to the consumer when it cancels sortchange", async () => {
      const el = await make({ data: many.slice(0, 5) });
      el.addEventListener("sortchange", e => e.preventDefault());
      await sortBy(el, 1);
      assert.deepEqual(names(el), ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"]);
    });

    it("filters rows by the global search across every visible cell", async () => {
      const el = await make({ searchable: true });
      const input = shadow(el).querySelector(".zeta-table-global-search")!.shadowRoot!.querySelector("input")!;
      input.value = "bob@";
      input.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      await el.updateComplete;
      const rows = shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row");
      assert.equal(rows.length, 1);
      assert.include(rows[0].textContent, "Bob");
    });

    it("leaves global search filtering to the consumer when data is one page of a larger collection", async () => {
      const el = await make({ searchable: true, paginationType: "numbered", totalItems: 100 });
      const input = shadow(el).querySelector(".zeta-table-global-search")!.shadowRoot!.querySelector("input")!;
      input.value = "bob@";
      input.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row").length, 3);
    });

    it("filters rows by the column filter and returns to page 1 under numbered pagination", async () => {
      const statusRows: ZetaTableRow[] = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}`, status: i % 2 ? "Closed" : "Open" }));
      const el = await make({
        columns: [
          { field: "name", title: "Name" },
          { field: "status", title: "Status" }
        ],
        data: statusRows,
        paginationType: "numbered",
        pageSize: 10,
        currentPage: 3,
        columnFilterable: true
      });
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 21-30 of 30");
      (shadow(el).querySelectorAll(".zeta-table-header-icon-btn")[1] as HTMLElement).click();
      await el.updateComplete;
      nativeInput(checkbox(el, ".zeta-table-filter-panel-item")).click();
      await el.updateComplete;
      (shadow(el).querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click();
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row").length, 10);
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 1-10 of 15");
    });

    it('shows the selection column by default, and hides it with selectable="false"', async () => {
      const el = await make();
      assert.isTrue(el.selectable);
      expect(shadow(el).querySelector(".zeta-table-col-checkbox")).to.exist;
      const el2 = await fixture<ZetaTable>(html`<zeta-table selectable="false"></zeta-table>`);
      assert.isFalse(el2.selectable);
      expect(shadow(el2).querySelector(".zeta-table-col-checkbox")).to.not.exist;
    });
    it("dispatches tablesearch event on global search input", async () => {
      const el = await make({ searchable: true });
      const input = shadow(el).querySelector(".zeta-table-global-search")!.shadowRoot!.querySelector("input")!;
      setTimeout(() => {
        input.value = "Alice";
        input.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
      const ev = await oneEvent(el, "tablesearch");
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
      nativeInput(checkbox(el, ".zeta-table-filter-panel-item")).click();
      await el.updateComplete;
      setTimeout(() => (shadow(el).querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click());
      const ev = await oneEvent(el, "columnfilter");
      assert.equal(ev.detail.field, "name");
      assert.isAbove((ev.detail.selectedValues as string[]).length, 0);
    });

    it("clears filter on empty apply", async () => {
      const el = await make({ columnFilterable: true });
      (shadow(el).querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      setTimeout(() => (shadow(el).querySelector(".zeta-table-filter-panel-btn--apply") as HTMLElement).click());
      const ev = await oneEvent(el, "columnfilter");
      assert.equal(ev.detail.selectedValues.length, 0);
    });

    it("opens/closes column configure panel and toggles visibility", async () => {
      const el = await make({ columnConfigure: true });
      const btn = shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-column-panel")).to.exist;
      const initial = shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length;
      nativeInput(checkbox(el, ".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item")).click();
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length, initial - 1);
    });

    it("toggles column visibility when clicking the row outside the box and label", async () => {
      const el = await make({ columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      const initial = shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length;
      const item = checkbox(el, ".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item");
      const rect = item.getBoundingClientRect();
      // A real (trusted) click on the empty area to the right of the label text
      await sendMouse({ type: "click", position: [Math.round(rect.right - 5), Math.round(rect.top + rect.height / 2)] });
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length, initial - 1);
      assert.isFalse(item.checked);
    });

    it("prevents hiding last column", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name" }], data: [{ id: 1, name: "A" }], columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      assert.isTrue(checkbox(el, ".zeta-table-column-panel-section:first-child .zeta-table-column-panel-item").disabled);
    });

    it("toggles column freeze", async () => {
      const el = await make({ columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      nativeInput(checkbox(el, ".zeta-table-column-panel-section:last-child .zeta-table-column-panel-item")).click();
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
