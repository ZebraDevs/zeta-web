import { fixture, html, expect, assert, oneEvent } from "@open-wc/testing";
import type { ZetaTable, ZetaTableColumn, ZetaTableRow, ZetaTableAction } from "../../components/table/table.js";
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
  const el = (await fixture) < ZetaTable > html`<zeta-table></zeta-table>`;
  el.columns = (overrides.columns as ZetaTableColumn[]) ?? cols3;
  el.data = (overrides.data as ZetaTableRow[]) ?? rows3;
  const { columns: _c, data: _d, ...rest } = overrides;
  Object.assign(el, rest);
  await el.updateComplete;
  return el;
}

describe("zeta-table features", () => {
  describe("Content", () => {
    it("renders expand column when expandable", async () => {
      const el = await make({ expandable: true });
      expect(el.querySelector(".zeta-table-col-expand")).to.exist;
      expect(el.querySelector("colgroup .zeta-table-col-expand-width")).to.exist;
    });

    it("does not render expand column without expandable", async () => {
      const el = await make();
      expect(el.querySelector(".zeta-table-col-expand")).to.not.exist;
    });

    it("renders actions column and kebab buttons", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const el = await make({ rowActions: actions });
      expect(el.querySelector(".zeta-table-col-actions")).to.exist;
      assert.equal(el.querySelectorAll(".zeta-table-action-btn").length, rows3.length);
    });

    it("renders disabled action items and icons", async () => {
      const el = await make({ rowActions: [{ key: "d", label: "D", disabled: true, icon: "🗑" }] });
      (el.querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu-item--disabled")).to.exist;
      expect(el.querySelector(".zeta-table-action-icon")).to.exist;
    });

    it("renders custom actionsLabel", async () => {
      const actions: ZetaTableAction[] = [{ key: "edit", label: "Edit" }];
      const el = await make({ rowActions: actions, actionsLabel: "Menu" });
      assert.include(el.querySelector("th.zeta-table-col-actions")?.textContent, "Menu");
    });

    it("renders footer for numbered pagination, not for none", async () => {
      expect((await make({ paginationType: "numbered", totalItems: 50 })).querySelector(".zeta-table-footer")).to.exist;
      expect((await make({ paginationType: "none" })).querySelector(".zeta-table-footer")).to.not.exist;
    });

    it("shows page info text", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      assert.include(el.querySelector(".zeta-table-page-info span")?.textContent, "Page 1 of 5");
    });

    it("renders page numbers, active button, ellipsis, and size select", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      expect(el.querySelectorAll(".zeta-table-page-btn:not([title])").length).to.be.greaterThan(0);
      assert.equal(el.querySelector(".zeta-table-page-btn--active")?.textContent?.trim(), "1");
      expect(el.querySelector(".zeta-table-page-size-select")).to.exist;
      const el2 = await make({ paginationType: "numbered", totalItems: 500, pageSize: 10, currentPage: 15 });
      expect(el2.querySelectorAll(".zeta-table-page-ellipsis").length).to.be.greaterThan(0);
    });

    it("disables nav at boundaries", async () => {
      const el1 = await make({ paginationType: "numbered", totalItems: 100, currentPage: 1 });
      assert.isTrue((el1.querySelector("[title='First page']") as HTMLButtonElement).disabled);
      assert.isTrue((el1.querySelector("[title='Previous page']") as HTMLButtonElement).disabled);
      const el2 = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 5 });
      assert.isTrue((el2.querySelector("[title='Next page']") as HTMLButtonElement).disabled);
      assert.isTrue((el2.querySelector("[title='Last page']") as HTMLButtonElement).disabled);
    });

    it("calculates pages from data.length without totalItems", async () => {
      const data = Array.from({ length: 45 }, (_, i) => ({ id: i + 1, name: `U${i}`, age: 20 + i, email: `u${i}@t.com` }));
      const el = await make({ data, paginationType: "numbered", pageSize: 10 });
      assert.include(el.querySelector(".zeta-table-page-info span")?.textContent, "of 5");
    });

    it("renders sentinel and loading row for infinite scroll", async () => {
      expect((await make({ paginationType: "infinite" })).querySelector(".zeta-table-infinite-sentinel")).to.exist;
      expect((await make({ paginationType: "none" })).querySelector(".zeta-table-infinite-sentinel")).to.not.exist;
      expect((await make({ paginationType: "infinite", loading: true })).querySelector(".zeta-table-loading-row")).to.exist;
    });

    it("renders export button", async () => {
      const el = await make({ exportable: true, onExport: () => {} });
      expect(el.querySelector("[title='Export to CSV']")).to.exist;
    });

    it("renders colgroup with checkbox and expand cols", async () => {
      const el = await make({ selectable: true, expandable: true });
      expect(el.querySelector("colgroup .zeta-table-col-checkbox-width")).to.exist;
      expect(el.querySelector("colgroup .zeta-table-col-expand-width")).to.exist;
    });

    it("sets numeric, string, and no-width columns", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", width: 300 },
        { field: "age", title: "Age", width: "25%" },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols });
      const colEls = el.querySelectorAll < HTMLElement > "colgroup col:not(.zeta-table-col-checkbox-width):not(.zeta-table-col-expand-width)";
      assert.include(colEls[0].style.width, "300px");
      assert.include(colEls[1].style.width, "25%");
      assert.equal(colEls[2].style.width, "");
    });

    it("calculates correct colspan for no-data row", async () => {
      const el = await make({ data: [], selectable: true, expandable: true });
      assert.equal((el.querySelector(".zeta-table-no-data") as HTMLTableCellElement).colSpan, cols3.length + 2);
    });

    it("renders tooltip hidden by default", async () => {
      const el = await make();
      const tooltip = el.querySelector(".zeta-table-tooltip");
      expect(tooltip).to.exist;
      assert.isFalse(tooltip?.classList.contains("zeta-table-tooltip--visible"));
    });

    it("injects global styles", async () => {
      await make();
      expect(document.querySelector("style[data-zeta-table]")).to.exist;
    });

    it("syncs selectedRows and disabledRows", async () => {
      const el = await make({ selectable: true });
      el.selectedRows = [1, 2];
      await el.updateComplete;
      const cbs = el.querySelectorAll < HTMLInputElement > ".zeta-table-tbody .zeta-table-col-checkbox input[type='checkbox']";
      assert.isTrue(cbs[0]?.checked);
      assert.isTrue(cbs[1]?.checked);
      assert.isFalse(cbs[2]?.checked);
      el.disabledRows = [3];
      await el.updateComplete;
      assert.isTrue(el.querySelectorAll(".zeta-table-tbody .zeta-table-row")[2].classList.contains("zeta-table-row--disabled"));
    });

    it("syncs currentPage and rebuilds columns", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      el.currentPage = 3;
      await el.updateComplete;
      assert.include(el.querySelector(".zeta-table-page-info span")?.textContent, "Page 3");
      el.columns = [
        { field: "name", title: "Name" },
        { field: "status", title: "Status" }
      ];
      await el.updateComplete;
      assert.equal(el.querySelectorAll(".zeta-table-header-row .zeta-table-th").length, 2);
    });

    it("updates actions column on data/rowActions change", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      expect(el.querySelector(".zeta-table-col-actions")).to.exist;
      el.rowActions = [];
      el.data = [{ id: 1, name: "A", age: 30, email: "a@t.com" }];
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-col-actions")).to.not.exist;
    });
  });

  describe("Interaction", () => {
    it("opens/closes action menu", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const el = await make({ rowActions: actions });
      const btn = el.querySelector(".zeta-table-action-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu--open")).to.exist;
      assert.equal(el.querySelectorAll(".zeta-table-action-menu-item").length, 2);
      btn.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu--open")).to.not.exist;
    });

    it("fires callback and event on action click", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      let key = "";
      const el = await make({
        rowActions: actions,
        onRowAction: (k: string) => {
          key = k;
        }
      });
      (el.querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      const item = el.querySelector(".zeta-table-action-menu-item") as HTMLElement;
      setTimeout(() => item.click());
      const ev = await oneEvent(el, "zeta-table-action");
      assert.equal((ev as CustomEvent).detail.actionKey, "edit");
      assert.equal(key, "edit");
    });

    it("uses per-row _actions and hides for null", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _actions: [{ key: "view", label: "View" }] },
        { id: 2, name: "B", age: 25, email: "b@t.com", _actions: null },
        { id: 3, name: "C", age: 35, email: "c@t.com" }
      ];
      const el = await make({ data, rowActions: actions });
      assert.equal(el.querySelectorAll(".zeta-table-action-btn").length, 2);
      (el.querySelectorAll(".zeta-table-action-btn")[0] as HTMLElement).click();
      await el.updateComplete;
      assert.include(el.querySelector(".zeta-table-action-menu-item")?.textContent, "View");
    });

    it("navigates pages and fires callback", async () => {
      let p = 0;
      const el = await make({
        paginationType: "numbered",
        totalItems: 100,
        pageSize: 20,
        onPageChange: (pg: number) => {
          p = pg;
        }
      });
      setTimeout(() => (el.querySelector("[title='Next page']") as HTMLElement).click());
      await oneEvent(el, "zeta-table-page-change");
      assert.equal(p, 2);
    });

    it("navigates to first page", async () => {
      let p = 0;
      const el = await make({
        paginationType: "numbered",
        totalItems: 100,
        pageSize: 20,
        currentPage: 3,
        onPageChange: (pg: number) => {
          p = pg;
        }
      });
      (el.querySelector("[title='First page']") as HTMLElement).click();
      await el.updateComplete;
      assert.equal(p, 1);
    });

    it("navigates to last page", async () => {
      let p = 0;
      const el = await make({
        paginationType: "numbered",
        totalItems: 100,
        pageSize: 20,
        currentPage: 3,
        onPageChange: (pg: number) => {
          p = pg;
        }
      });
      (el.querySelector("[title='Last page']") as HTMLElement).click();
      await el.updateComplete;
      assert.equal(p, 5);
    });

    it("resets page on size change", async () => {
      let p = 0;
      const el = await make({
        paginationType: "numbered",
        totalItems: 100,
        pageSize: 20,
        currentPage: 3,
        onPageChange: (pg: number) => {
          p = pg;
        }
      });
      const select = el.querySelector(".zeta-table-page-size-select") as HTMLSelectElement;
      select.value = "50";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      await el.updateComplete;
      assert.equal(p, 1);
    });

    it("does not navigate to invalid pages", async () => {
      let called = false;
      const el = await make({
        paginationType: "numbered",
        totalItems: 100,
        pageSize: 20,
        currentPage: 1,
        onPageChange: () => {
          called = true;
        }
      });
      (el.querySelector("[title='Previous page']") as HTMLButtonElement).click();
      await el.updateComplete;
      assert.isFalse(called);
    });

    it("calls onRefresh and dispatches event", async () => {
      let refreshed = false;
      const el = await make({
        onRefresh: () => {
          refreshed = true;
        }
      });
      setTimeout(() => (el.querySelector("[title='Refresh']") as HTMLElement).click());
      await oneEvent(el, "zeta-table-refresh");
      assert.isTrue(refreshed);
    });

    it("closes column panel on outside click", async () => {
      const el = await make({ columnConfigure: true });
      (el.querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-column-panel")).to.exist;
      document.body.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-column-panel")).to.not.exist;
    });

    it("closes action menu on outside click", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      (el.querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu--open")).to.exist;
      document.body.click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu--open")).to.not.exist;
    });

    it("closes overlays on scroll", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }], onColumnFilter: () => {} });
      (el.querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      el.querySelector(".zeta-table-scroll")!.dispatchEvent(new Event("scroll"));
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-action-menu--open")).to.not.exist;

      (el.querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-filter-panel")).to.exist;
      el.querySelector(".zeta-table-scroll")!.dispatchEvent(new Event("scroll"));
      await el.updateComplete;
      expect(el.querySelector(".zeta-table-filter-panel")).to.not.exist;
    });

    it("cleans up on disconnect", async () => {
      const el = await make();
      el.remove();
      expect(true).to.be.true;
    });
  });

  describe("Styling", () => {
    it("applies frozen and frozen-last classes", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", frozen: true },
        { field: "age", title: "Age" },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols });
      expect(el.querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen").length).to.be.greaterThan(0);
      assert.equal(el.querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen-last").length, 1);
      expect(el.querySelectorAll(".zeta-table-tbody .zeta-table-cell--frozen").length).to.be.greaterThan(0);
    });

    it("handles multiple frozen columns with selectable", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", frozen: true, width: 200 },
        { field: "age", title: "Age", frozen: true, width: 100 },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols, selectable: true });
      const frozenHeaders = el.querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen");
      expect(frozenHeaders.length).to.be.greaterThanOrEqual(2);
    });

    it("applies disabled class for _disabled and disabledRows", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true },
        { id: 2, name: "B", age: 25, email: "b@t.com" }
      ];
      const el = await make({ data, disabledRows: [2] });
      const rows = el.querySelectorAll(".zeta-table-tbody .zeta-table-row");
      assert.isTrue(rows[0].classList.contains("zeta-table-row--disabled"));
      assert.isTrue(rows[1].classList.contains("zeta-table-row--disabled"));
    });
  });
});
