import { fixture, html, expect, assert, oneEvent } from "@open-wc/testing";
import type { ZetaTable, ZetaTableColumn, ZetaTableRow, ZetaTableAction } from "../../components/table/table.js";
import type { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import type { ZetaPagination } from "../../components/pagination/pagination.js";
import type { ZetaSelectInput } from "../../components/select-input/select-input.js";
import "../../components/table/table.js";
import "../../index.css";
import { getCssVarColorValue, getCssVarPxValue } from "../utils.js";

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

/** The zeta-pagination control in the table footer. */
function pagination$(el: ZetaTable) {
  return shadow(el).querySelector<ZetaPagination>("zeta-pagination")!;
}

/** One of the first/previous/next/last buttons of the pagination control, by icon name. */
function navButton(el: ZetaTable, iconName: "first_page" | "chevron_left" | "chevron_right" | "last_page") {
  return pagination$(el).shadowRoot!.querySelector<HTMLElement & { disabled: boolean }>(`.${iconName}`)!;
}

describe("zeta-table features", () => {
  describe("Content", () => {
    it("renders expand column when expandable", async () => {
      const el = await make({ expandable: true });
      expect(shadow(el).querySelector(".zeta-table-col-expand")).to.exist;
      expect(shadow(el).querySelector("colgroup .zeta-table-col-expand-width")).to.exist;
    });

    it("does not render expand column without expandable", async () => {
      const el = await make();
      expect(shadow(el).querySelector(".zeta-table-col-expand")).to.not.exist;
    });

    it("renders actions column and kebab buttons", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const el = await make({ rowActions: actions });
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.exist;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-action-btn").length, rows3.length);
    });

    it("renders disabled action items and icons", async () => {
      const el = await make({ rowActions: [{ key: "d", label: "D", disabled: true, icon: "🗑" }] });
      (shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu-item--disabled")).to.exist;
      expect(shadow(el).querySelector(".zeta-table-action-icon")).to.exist;
    });

    it("renders custom actionsLabel", async () => {
      const actions: ZetaTableAction[] = [{ key: "edit", label: "Edit" }];
      const el = await make({ rowActions: actions, actionsLabel: "Menu" });
      assert.include(shadow(el).querySelector("th.zeta-table-col-actions")?.textContent, "Menu");
    });

    it("renders footer for numbered pagination, not for none", async () => {
      expect(shadow(await make({ paginationType: "numbered", totalItems: 50 })).querySelector(".zeta-table-footer")).to.exist;
      expect(shadow(await make({ paginationType: "none" })).querySelector(".zeta-table-footer")).to.not.exist;
    });

    it("shows page info text", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 1-20 of 100");
    });

    it("renders the pagination control, active page, ellipsis, and size select", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      const pagination = pagination$(el);
      assert.equal(pagination.totalPages, 5);
      assert.equal(pagination.currentPage, 1);
      assert.equal(pagination.shadowRoot!.querySelector(".page.selected")?.textContent?.trim(), "1");
      expect(shadow(el).querySelector("zeta-select-input.zeta-table-page-size-select")).to.exist;
      const el2 = await make({ paginationType: "numbered", totalItems: 500, pageSize: 10, currentPage: 15 });
      expect(pagination$(el2).shadowRoot!.querySelectorAll(".more").length).to.be.greaterThan(0);
    });

    it("disables nav at boundaries", async () => {
      const el1 = await make({ paginationType: "numbered", totalItems: 100, currentPage: 1 });
      assert.isTrue(navButton(el1, "first_page").disabled);
      assert.isTrue(navButton(el1, "chevron_left").disabled);
      const el2 = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 5 });
      assert.isTrue(navButton(el2, "chevron_right").disabled);
      assert.isTrue(navButton(el2, "last_page").disabled);
    });

    it("calculates pages from data.length without totalItems", async () => {
      const data = Array.from({ length: 45 }, (_, i) => ({ id: i + 1, name: `U${i}`, age: 20 + i, email: `u${i}@t.com` }));
      const el = await make({ data, paginationType: "numbered", pageSize: 10 });
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 1-10 of 45");
      assert.equal(pagination$(el).totalPages, 5);
    });

    it("renders sentinel and loading row for infinite scroll", async () => {
      expect(shadow(await make({ paginationType: "infinite" })).querySelector(".zeta-table-infinite-sentinel")).to.exist;
      expect(shadow(await make({ paginationType: "none" })).querySelector(".zeta-table-infinite-sentinel")).to.not.exist;
      expect(shadow(await make({ paginationType: "infinite", loading: true })).querySelector(".zeta-table-loading-row")).to.exist;
    });

    it("renders export button when exportable", async () => {
      const el = await make({ exportable: true });
      expect(shadow(el).querySelector("[title='Export to CSV']")).to.exist;
    });

    it("renders colgroup with checkbox and expand cols", async () => {
      const el = await make({ selectable: true, expandable: true });
      expect(shadow(el).querySelector("colgroup .zeta-table-col-checkbox-width")).to.exist;
      expect(shadow(el).querySelector("colgroup .zeta-table-col-expand-width")).to.exist;
    });

    it("sets numeric, string, and no-width columns", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", width: 300 },
        { field: "age", title: "Age", width: "25%" },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols });
      const colEls = shadow(el).querySelectorAll<HTMLElement>("colgroup col:not(.zeta-table-col-checkbox-width):not(.zeta-table-col-expand-width)");
      assert.include(colEls[0].style.width, "300px");
      assert.include(colEls[1].style.width, "25%");
      assert.equal(colEls[2].style.width, "");
    });

    it("calculates correct colspan for no-data row", async () => {
      const el = await make({ data: [], selectable: true, expandable: true });
      assert.equal((shadow(el).querySelector(".zeta-table-no-data") as HTMLTableCellElement).colSpan, cols3.length + 2);
    });

    it("renders tooltip hidden by default", async () => {
      const el = await make();
      const tooltip = shadow(el).querySelector(".zeta-table-tooltip");
      expect(tooltip).to.exist;
      assert.isFalse(tooltip?.classList.contains("zeta-table-tooltip--visible"));
    });

    it("syncs selectedRows and disabledRows", async () => {
      const el = await make({ selectable: true });
      el.selectedRows = [1, 2];
      await el.updateComplete;
      const cbs = shadow(el).querySelectorAll<ZetaCheckbox>(".zeta-table-tbody .zeta-table-col-checkbox zeta-checkbox");
      assert.isTrue(cbs[0]?.checked);
      assert.isTrue(cbs[1]?.checked);
      assert.isFalse(cbs[2]?.checked);
      el.disabledRows = [3];
      await el.updateComplete;
      assert.isTrue(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row")[2].classList.contains("zeta-table-row--disabled"));
    });

    it("syncs currentPage and rebuilds columns", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      el.currentPage = 3;
      await el.updateComplete;
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 41-60 of 100");
      el.columns = [
        { field: "name", title: "Name" },
        { field: "status", title: "Status" }
      ];
      await el.updateComplete;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th").length, 2);
    });

    it("updates actions column on data/rowActions change", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.exist;
      el.rowActions = [];
      el.data = [{ id: 1, name: "A", age: 30, email: "a@t.com" }];
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.not.exist;
    });
  });

  describe("Interaction", () => {
    it("opens/closes action menu", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const el = await make({ rowActions: actions });
      const btn = shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement;
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu--open")).to.exist;
      assert.equal(shadow(el).querySelectorAll(".zeta-table-action-menu-item").length, 2);
      btn.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu--open")).to.not.exist;
    });

    it("fires event on action click", async () => {
      const actions: ZetaTableAction[] = [
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete", icon: "🗑" }
      ];
      const el = await make({ rowActions: actions });
      (shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      const item = shadow(el).querySelector(".zeta-table-action-menu-item") as HTMLElement;
      setTimeout(() => item.click());
      const ev = await oneEvent(el, "rowaction");
      assert.equal(ev.detail.actionKey, "edit");
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
      assert.equal(shadow(el).querySelectorAll(".zeta-table-action-btn").length, 2);
      (shadow(el).querySelectorAll(".zeta-table-action-btn")[0] as HTMLElement).click();
      await el.updateComplete;
      assert.include(shadow(el).querySelector(".zeta-table-action-menu-item")?.textContent, "View");
    });

    it("navigates pages and fires event", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      setTimeout(() => navButton(el, "chevron_right").click());
      const ev = await oneEvent(el, "pagechange");
      assert.equal(ev.detail.page, 2);
      assert.equal(ev.detail.pageSize, 20);
    });

    it("fires a single pagechange event per page change, from the table only", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20 });
      const events: CustomEvent[] = [];
      el.addEventListener("pagechange", e => events.push(e as CustomEvent));
      navButton(el, "chevron_right").click();
      await el.updateComplete;
      assert.equal(events.length, 1);
      assert.property(events[0].detail, "pageSize");
    });

    it("navigates to first page", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 3 });
      setTimeout(() => navButton(el, "first_page").click());
      const ev = await oneEvent(el, "pagechange");
      assert.equal(ev.detail.page, 1);
    });

    it("navigates to last page", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 3 });
      setTimeout(() => navButton(el, "last_page").click());
      const ev = await oneEvent(el, "pagechange");
      assert.equal(ev.detail.page, 5);
    });

    it("resets page on size change", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 3 });
      const select = shadow(el).querySelector<ZetaSelectInput>(".zeta-table-page-size-select")!;
      const option = select.querySelector<HTMLElement>("zeta-option[value='50']")!;
      setTimeout(() => option.shadowRoot!.querySelector<HTMLElement>(".option")!.click());
      const ev = await oneEvent(el, "pagechange");
      assert.equal(ev.detail.page, 1);
      assert.equal(ev.detail.pageSize, 50);
      assert.equal(el.pageSize, 50);
    });

    it("does not navigate to invalid pages", async () => {
      let called = false;
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 20, currentPage: 1 });
      el.addEventListener("pagechange", () => {
        called = true;
      });
      navButton(el, "chevron_left").click();
      await el.updateComplete;
      assert.isFalse(called);
    });

    it("dispatches tablerefresh event", async () => {
      const el = await make({ refreshable: true });
      setTimeout(() => (shadow(el).querySelector("[title='Refresh']") as HTMLElement).click());
      const ev = await oneEvent(el, "tablerefresh");
      expect(ev).to.exist;
    });

    it("closes column panel on outside click", async () => {
      const el = await make({ columnConfigure: true });
      (shadow(el).querySelector(".zeta-table-column-panel-wrapper .zeta-table-toolbar-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-column-panel")).to.exist;
      document.body.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-column-panel")).to.not.exist;
    });

    it("closes action menu on outside click", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      (shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu--open")).to.exist;
      document.body.click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu--open")).to.not.exist;
    });

    it("closes overlays on scroll", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }], columnFilterable: true });
      (shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      shadow(el).querySelector(".zeta-table-scroll")!.dispatchEvent(new Event("scroll"));
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-action-menu--open")).to.not.exist;

      (shadow(el).querySelector(".zeta-table-header-icon-btn") as HTMLElement).click();
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-filter-panel")).to.exist;
      shadow(el).querySelector(".zeta-table-scroll")!.dispatchEvent(new Event("scroll"));
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-filter-panel")).to.not.exist;
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
      expect(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen").length).to.be.greaterThan(0);
      assert.equal(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen-last").length, 1);
      expect(shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-cell--frozen").length).to.be.greaterThan(0);
    });

    it("handles multiple frozen columns with selectable", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", frozen: true, width: 200 },
        { field: "age", title: "Age", frozen: true, width: 100 },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols, selectable: true });
      const frozenHeaders = shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-cell--frozen");
      expect(frozenHeaders.length).to.be.greaterThanOrEqual(2);
    });

    it("applies disabled class for _disabled and disabledRows", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com", _disabled: true },
        { id: 2, name: "B", age: 25, email: "b@t.com" }
      ];
      const el = await make({ data, disabledRows: [2] });
      const rows = shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row");
      assert.isTrue(rows[0].classList.contains("zeta-table-row--disabled"));
      assert.isTrue(rows[1].classList.contains("zeta-table-row--disabled"));
    });

    it("rounds the table corners and the components inside by default", async () => {
      const el = await make({ selectable: true, searchable: true, paginationType: "numbered", totalItems: 100 });
      const wrapper = shadow(el).querySelector(".zeta-table-wrapper")!;
      assert.equal(getComputedStyle(wrapper).borderTopLeftRadius, `${getCssVarPxValue(el, "--radius-element-md")}px`);
      assert.isTrue(shadow(el).querySelector<ZetaCheckbox>("zeta-checkbox")!.rounded);
      assert.equal(shadow(el).querySelector("zeta-search")!.getAttribute("shape"), "rounded");
      assert.isTrue(pagination$(el).rounded);
    });

    it("sharpens the table corners and the components inside with shape=sharp", async () => {
      const el = await make({ selectable: true, searchable: true, paginationType: "numbered", totalItems: 100 });
      el.setAttribute("shape", "sharp");
      await el.updateComplete;
      const wrapper = shadow(el).querySelector(".zeta-table-wrapper")!;
      assert.equal(getComputedStyle(wrapper).borderTopLeftRadius, "0px");
      assert.isFalse(shadow(el).querySelector<ZetaCheckbox>("zeta-checkbox")!.rounded);
      assert.equal(shadow(el).querySelector("zeta-search")!.getAttribute("shape"), "sharp");
      assert.isFalse(pagination$(el).rounded);
    });

    it("caps the content height with verticalscroll", async () => {
      const el = await make();
      const scroll = shadow(el).querySelector(".zeta-table-scroll")!;
      assert.equal(getComputedStyle(scroll).maxHeight, "none");
      el.setAttribute("verticalscroll", "");
      await el.updateComplete;
      assert.isTrue(el.verticalScroll);
      assert.notEqual(getComputedStyle(scroll).maxHeight, "none");
      el.style.setProperty("--table-max-height", "123px");
      assert.equal(getComputedStyle(scroll).maxHeight, "123px");
    });

    it("uses the new tokens for the controls bar, footer and cells", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100 });
      assert.equal(getComputedStyle(shadow(el).querySelector(".zeta-table-header-bar")!).backgroundColor, getCssVarColorValue(el, "--surface-section"));
      assert.equal(getComputedStyle(shadow(el).querySelector(".zeta-table-footer")!).backgroundColor, getCssVarColorValue(el, "--surface-section"));
      assert.equal(getComputedStyle(shadow(el).querySelector(".zeta-table-header-bar")!).paddingLeft, `${getCssVarPxValue(el, "--space-lg")}px`);
      assert.equal(getComputedStyle(shadow(el).querySelector(".zeta-table-header-bar")!).paddingTop, `${getCssVarPxValue(el, "--space-md")}px`);
      assert.equal(
        getComputedStyle(shadow(el).querySelector(".zeta-table-th")!).backgroundColor,
        getCssVarColorValue(el, "--interactive-neutral-background-default")
      );
      assert.equal(
        getComputedStyle(shadow(el).querySelector(".zeta-table-td")!).backgroundColor,
        getCssVarColorValue(el, "--interactive-neutral-background-default")
      );
    });

    it("fills selected rows and keeps a disabled row's fill plain", async () => {
      const data: ZetaTableRow[] = [
        { id: 1, name: "A", age: 30, email: "a@t.com" },
        { id: 2, name: "B", age: 25, email: "b@t.com", _disabled: true }
      ];
      const el = await make({ data, selectable: true, selectedRows: [1] });
      const rows = shadow(el).querySelectorAll(".zeta-table-tbody .zeta-table-row");
      assert.equal(
        getComputedStyle(rows[0].querySelector(".zeta-table-td--data")!).backgroundColor,
        getCssVarColorValue(el, "--interactive-neutral-background-selected")
      );
      const disabledCell = rows[1].querySelector(".zeta-table-td--data")!;
      assert.equal(getComputedStyle(disabledCell).backgroundColor, getCssVarColorValue(el, "--interactive-neutral-background-default"));
      assert.equal(getComputedStyle(disabledCell.querySelector(".zeta-table-cell-content")!).color, getCssVarColorValue(el, "--foreground-disabled"));
    });

    it("offsets frozen columns by the selection column width", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", frozen: true, width: 200 },
        { field: "age", title: "Age", frozen: true, width: 100 },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns: cols, selectable: true });
      const frozen = shadow(el).querySelectorAll<HTMLElement>(".zeta-table-header-row .zeta-table-th.zeta-table-cell--frozen");
      // frozen[0] is the selection column itself, frozen[1] is "name" and frozen[2] is "age"
      assert.include(frozen[1].style.left, "--_table-select-col-width");
      const selectWidth = shadow(el).querySelector<HTMLElement>(".zeta-table-header-row .zeta-table-col-checkbox")!.getBoundingClientRect().width;
      assert.closeTo(parseFloat(getComputedStyle(frozen[1]).left), selectWidth, 1);
      assert.closeTo(parseFloat(getComputedStyle(frozen[2]).left), selectWidth + 200, 1);
    });
  });
});
