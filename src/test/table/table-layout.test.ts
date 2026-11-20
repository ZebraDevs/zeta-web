import { fixture, html, expect, assert } from "@open-wc/testing";
import type { ZetaTable, ZetaTableColumn, ZetaTableRow } from "../../components/table/table.js";
import "../../components/table/table.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

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

describe("zeta-table layout", () => {
  // The Accessibility block comes first, then Content, matching the other test files
  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      const el = await make({ selectable: true, searchable: true, rowActions: [{ key: "e", label: "E" }], selectedRows: [1] });
      await expect(el).to.be.accessible();
    });

    it("has sufficient contrast in the header and data cells", async () => {
      const el = await make();
      const th = shadow(el).querySelector(".zeta-table-th")!;
      const td = shadow(el).querySelector(".zeta-table-td")!;
      await contrastTest("Table header cell", th, th);
      await contrastTest("Table data cell", td, td);
    });

    it("exposes the sort state with aria-sort", async () => {
      const cols: ZetaTableColumn[] = [
        { field: "name", title: "Name", sortable: true },
        { field: "age", title: "Age", sortable: false }
      ];
      const el = await make({ columns: cols });
      const [nameTh, ageTh] = Array.from(shadow(el).querySelectorAll(".zeta-table-header-row .zeta-table-th"));
      assert.equal(nameTh.getAttribute("aria-sort"), "none");
      assert.isFalse(ageTh.hasAttribute("aria-sort"));
      const title = nameTh.querySelector<HTMLElement>(".zeta-table-header-title--sortable")!;
      title.click();
      await el.updateComplete;
      assert.equal(nameTh.getAttribute("aria-sort"), "ascending");
      title.click();
      await el.updateComplete;
      assert.equal(nameTh.getAttribute("aria-sort"), "descending");
      title.click();
      await el.updateComplete;
      assert.equal(nameTh.getAttribute("aria-sort"), "none");
    });

    it("names the selection checkboxes", async () => {
      const el = await make({ selectable: true });
      // zeta-checkbox is named by text slotted into its <label>, since aria-label is prohibited on a host without a role attribute
      assert.equal(shadow(el).querySelector(".zeta-table-header-row zeta-checkbox")!.textContent.trim(), "Select all rows");
      const rowLabels = Array.from(shadow(el).querySelectorAll(".zeta-table-tbody zeta-checkbox")).map(cb => cb.textContent.trim());
      assert.deepEqual(rowLabels, ["Select row: Alice", "Select row: Bob", "Select row: Charlie"]);
    });

    it("names the sort buttons", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name", sortable: true }] });
      assert.equal(shadow(el).querySelector(".zeta-table-sort-btn")!.getAttribute("aria-label"), "Sort by Name");
    });

    it("names the icon buttons and announces the selected count as a status", async () => {
      const el = await make({ refreshable: true, exportable: true, rowActions: [{ key: "e", label: "E" }] });
      const names = Array.from(shadow(el).querySelectorAll(".zeta-table-header-bar zeta-icon-button")).map(b => b.getAttribute("aria-label"));
      assert.deepEqual(names, ["Refresh", "Export to CSV", "Columns"]);
      assert.equal(shadow(el).querySelector(".zeta-table-action-btn")!.getAttribute("aria-label"), "Actions");
      assert.equal(shadow(el).querySelector(".zeta-table-selected-count")!.getAttribute("role"), "status");
    });
  });

  describe("Content", () => {
    it("shows the controls bar by default and removes it with hasControl off", async () => {
      expect(shadow(await make()).querySelector(".zeta-table-header-bar")).to.exist;
      expect(shadow(await make({ hasControl: false, searchable: true, tableTitle: "T" })).querySelector(".zeta-table-header-bar")).to.not.exist;
    });

    it("shows the footer by default and removes it with hasFooter off", async () => {
      expect(shadow(await make({ paginationType: "numbered", totalItems: 100 })).querySelector(".zeta-table-footer")).to.exist;
      expect(shadow(await make({ paginationType: "numbered", totalItems: 100, hasFooter: false })).querySelector(".zeta-table-footer")).to.not.exist;
    });

    it("turns the on-by-default options off from attributes, and back on", async () => {
      // A plain string, not an html template: this tests the `="false"` markup that lit-analyzer rejects on a boolean attribute
      const el = await fixture<ZetaTable>(
        `<zeta-table hascontrol="false" hasfooter="false" hasselectedcount="false" hasrowsperpage="false" hasrowactions="false"></zeta-table>`
      );
      assert.isFalse(el.hasControl);
      assert.isFalse(el.hasFooter);
      assert.isFalse(el.hasSelectedCount);
      assert.isFalse(el.hasRowsPerPage);
      assert.isFalse(el.hasRowActions);
      el.removeAttribute("hasfooter");
      await el.updateComplete;
      assert.isTrue(el.hasFooter);
      el.setAttribute("hasfooter", "");
      await el.updateComplete;
      assert.isTrue(el.hasFooter);
    });

    it("hides rows per page but keeps the footer with hasRowsPerPage off", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, hasRowsPerPage: false });
      expect(shadow(el).querySelector(".zeta-table-footer")).to.exist;
      expect(shadow(el).querySelector(".zeta-table-page-size-select")).to.not.exist;
      expect(shadow(el).querySelector("zeta-pagination")).to.exist;
    });

    it("lists the current page size even when it is not a standard choice", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100, pageSize: 25 });
      const options = Array.from(shadow(el).querySelectorAll("zeta-option")).map(o => o.getAttribute("value"));
      assert.deepEqual(options, ["10", "20", "25", "50", "100"]);
    });

    it("counts selected rows in an info label only while rows are selected", async () => {
      const el = await make({ selectable: true });
      const region = shadow(el).querySelector(".zeta-table-selected-count")!;
      expect(region).to.exist;
      expect(region.querySelector("zeta-label")).to.not.exist;
      el.selectedRows = [1, 2];
      await el.updateComplete;
      const label = region.querySelector("zeta-label")!;
      assert.equal(label.getAttribute("status"), "info");
      assert.include(label.textContent, "2 selected");
    });

    it("removes the selected count with hasSelectedCount off", async () => {
      const el = await make({ selectable: true, selectedRows: [1], hasSelectedCount: false });
      expect(shadow(el).querySelector(".zeta-table-selected-count")).to.not.exist;
      expect(shadow(el).querySelector(".zeta-table-selection-info")).to.not.exist;
    });

    it("removes the actions column with hasRowActions off even when actions are defined", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.exist;
      el.hasRowActions = false;
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.not.exist;
      el.hasRowActions = true;
      await el.updateComplete;
      expect(shadow(el).querySelector(".zeta-table-col-actions")).to.exist;
    });

    it("composes the controls from zeta components", async () => {
      const el = await make({ selectable: true, searchable: true, refreshable: true, exportable: true, rowActions: [{ key: "e", label: "E" }] });
      expect(shadow(el).querySelector("zeta-search")).to.exist;
      expect(shadow(el).querySelectorAll(".zeta-table-header-bar zeta-icon-button").length).to.equal(3);
      expect(shadow(el).querySelectorAll(".zeta-table-tbody zeta-checkbox").length).to.equal(rows3.length);
      expect(shadow(el).querySelectorAll(".zeta-table-tbody button.zeta-table-action-btn").length).to.equal(rows3.length);
    });

    it("shows the microphone in the search field when speech recognition is available", async () => {
      const el = await make({ searchable: true });
      const search = shadow(el).querySelector<HTMLElement & { hasIcon: boolean }>("zeta-search")!;
      assert.isTrue(search.hasIcon);
    });

    it("draws the filter button with the filter icon", async () => {
      const el = await make({ columnFilterable: true });
      assert.equal(shadow(el).querySelector(".zeta-table-header-icon-btn zeta-icon")!.textContent.trim(), "filter");
    });

    it("draws an action's icon from its icon name, and shows other text as it is", async () => {
      const actions = [
        { key: "edit", label: "Edit", icon: "edit" },
        { key: "star", label: "Star", icon: "★" }
      ];
      const el = await make({ rowActions: actions });
      (shadow(el).querySelector(".zeta-table-action-btn") as HTMLElement).click();
      await el.updateComplete;
      const icons = Array.from(shadow(el).querySelectorAll(".zeta-table-action-icon"));
      assert.equal(icons[0].querySelector("zeta-icon")!.textContent.trim(), "edit");
      assert.isNull(icons[1].querySelector("zeta-icon"));
      assert.equal(icons[1].textContent.trim(), "★");
    });

    it("places slotted controls in the controls bar before the column settings button", async () => {
      const el = await fixture<ZetaTable>(
        html`<zeta-table .columns=${cols3} .data=${rows3} .columnConfigure=${true} .refreshable=${true}
          ><button slot="controls" id="extra">More</button></zeta-table
        >`
      );
      const slot = shadow(el).querySelector<HTMLSlotElement>(".zeta-table-header-bar slot[name='controls']")!;
      assert.equal(slot.assignedElements()[0].id, "extra");
      const bar = shadow(el).querySelector(".zeta-table-header-bar-right")!;
      const children = Array.from(bar.children);
      assert.isBelow(children.indexOf(slot), children.indexOf(shadow(el).querySelector(".zeta-table-column-panel-wrapper")!));
    });

    it("shows the controls bar for slotted controls alone", async () => {
      const el = await fixture<ZetaTable>(html`<zeta-table .columns=${cols3} .data=${rows3}><button slot="controls">More</button></zeta-table>`);
      expect(shadow(el).querySelector(".zeta-table-header-bar")).to.exist;
    });

    it("uses the outlined pagination in the footer", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 100 });
      assert.isTrue(shadow(el).querySelector<HTMLElement & { outline: boolean }>("zeta-pagination")!.outline);
    });

    it("puts the sort button right after the column title and the filter button after it", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name", sortable: true }], columnFilterable: true });
      const th = shadow(el).querySelector(".zeta-table-header-row .zeta-table-th")!;
      const title = th.querySelector(".zeta-table-header-title")!;
      assert.isTrue(title.nextElementSibling?.classList.contains("zeta-table-sort-btn"), "sort button follows the title");
      assert.isNotNull(th.querySelector(".zeta-table-header-icons .zeta-table-header-icon-btn"), "filter button is in the trailing icons");
      assert.isNull(th.querySelector(".zeta-table-header-icons .zeta-table-sort-btn"), "sort button is not in the trailing icons");
    });

    it("keeps an accessible name on the actions column header without showing text", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }] });
      const th = shadow(el).querySelector("th.zeta-table-col-actions")!;
      assert.equal(th.textContent.trim(), "Actions");
      assert.isNotNull(th.querySelector(".zeta-table-visually-hidden"));
    });

    it("shows the range as 'Showing a-b of n' and clamps the end to the total", async () => {
      const el = await make({ paginationType: "numbered", totalItems: 21, pageSize: 5, currentPage: 5 });
      assert.include(shadow(el).querySelector(".zeta-table-page-info span")?.textContent, "Showing 21-21 of 21");
      const empty = await make({ paginationType: "numbered", totalItems: 0, data: [] });
      assert.include(shadow(empty).querySelector(".zeta-table-page-info span")?.textContent, "Showing 0-0 of 0");
    });

    it("renders the selected count as a strong info label", async () => {
      const el = await make({ selectable: true, selectedRows: [1] });
      const label = shadow(el).querySelector<HTMLElement & { bold: boolean }>(".zeta-table-selected-count zeta-label")!;
      assert.isTrue(label.bold);
      assert.include(label.textContent, "1 selected");
    });
  });

  describe("Dimensions", () => {
    // Size tokens change with the viewport, so expected sizes are resolved from the tokens instead of being hard-coded in px
    function resolve(el: ZetaTable, expression: string): number {
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;height:${expression}`;
      shadow(el).querySelector(".zeta-table-wrapper")!.appendChild(probe);
      const height = probe.getBoundingClientRect().height;
      probe.remove();
      return height;
    }

    it("sizes a data row to two --space-md plus --control-sm, plus its bottom border", async () => {
      const el = await make();
      const row = shadow(el).querySelector(".zeta-table-tbody tr")!;
      const expected = resolve(el, "calc(var(--space-md) * 2 + var(--control-sm))");
      const height = row.getBoundingClientRect().height;
      assert.isAtLeast(height, expected);
      assert.isAtMost(height, expected + resolve(el, "calc(var(--stroke-thin) * 2)"));
    });

    it("sizes the header row to its content height plus the border above and below", async () => {
      const el = await make();
      const th = shadow(el).querySelector(".zeta-table-header-row .zeta-table-th")!;
      assert.approximately(th.getBoundingClientRect().height, resolve(el, "calc(var(--table-header-height) + var(--stroke-thin) * 2)"), 0.5);
    });

    it("sizes the select and actions columns to the control target plus --space-md on each side", async () => {
      // One column without a width absorbs the free space, as in a real table, so the fixed columns keep their size
      const columns: ZetaTableColumn[] = [
        { field: "name", title: "Name", width: 200 },
        { field: "email", title: "Email" }
      ];
      const el = await make({ columns, selectable: true, rowActions: [{ key: "e", label: "E" }] });
      const expected = resolve(el, "calc(var(--control-target-min) + var(--space-md) * 2)");
      const selectTh = shadow(el).querySelector(".zeta-table-header-row .zeta-table-col-checkbox")!;
      const actionsTh = shadow(el).querySelector(".zeta-table-header-row .zeta-table-col-actions")!;
      assert.approximately(selectTh.getBoundingClientRect().width, expected, 0.5);
      assert.approximately(actionsTh.getBoundingClientRect().width, expected, 0.5);
    });

    it("sizes the controls bar and the footer to --control-sm plus --space-md above and below", async () => {
      const el = await make({ searchable: true, paginationType: "numbered", totalItems: 100 });
      const expected = resolve(el, "calc(var(--control-sm) + var(--space-md) * 2)");
      const bar = shadow(el).querySelector(".zeta-table-header-bar")!;
      const footer = shadow(el).querySelector(".zeta-table-footer")!;
      assert.isAtLeast(bar.getBoundingClientRect().height, expected - 0.5);
      assert.isAtLeast(footer.getBoundingClientRect().height, expected - 0.5);
    });

    const makeRows = (count: number): ZetaTableRow[] => Array.from({ length: count }, (_, i) => ({ id: i + 1, name: `N${i + 1}`, age: i, email: "e@t.com" }));
    /** Where the footer is, measured from the top of the table, and the table's own height. */
    const measure = async (rowCount: number, style: Record<string, string>, props: Partial<ZetaTable> = {}) => {
      const el = await make({ data: makeRows(rowCount), paginationType: "numbered", pageSize: 50, ...props });
      Object.entries(style).forEach(([name, value]) => el.style.setProperty(name, value));
      await el.updateComplete;
      const footer = shadow(el).querySelector(".zeta-table-footer")!.getBoundingClientRect();
      const host = el.getBoundingClientRect();
      return { footerTop: footer.top - host.top, footerBottom: footer.bottom - host.top, height: host.height };
    };

    it("stays at the same place whatever the number of rows, when a height cap is set", async () => {
      const few = await measure(2, { "--table-max-height": "300px" });
      const many = await measure(40, { "--table-max-height": "300px" });
      assert.approximately(few.footerTop, many.footerTop, 0.5);
      assert.approximately(few.height, many.height, 0.5);
    });

    it("stays at the same place whatever the number of rows, with verticalscroll", async () => {
      const few = await measure(2, {}, { verticalScroll: true });
      const many = await measure(40, {}, { verticalScroll: true });
      assert.approximately(few.footerTop, many.footerTop, 0.5);
    });

    it("fills a parent that has a height, so the footer floats to the bottom of it", async () => {
      const parent = await fixture<HTMLDivElement>(html`<div style="height: 650px"><zeta-table paginationtype="numbered"></zeta-table></div>`);
      const el = parent.querySelector("zeta-table")!;
      el.columns = cols3;
      el.data = rows3;
      el.paginationType = "numbered";
      await el.updateComplete;
      const footer = shadow(el).querySelector(".zeta-table-footer")!;
      assert.approximately(el.getBoundingClientRect().height, 650, 0.5);
      assert.approximately(footer.getBoundingClientRect().bottom, parent.getBoundingClientRect().bottom, 0.5);
      // A short page keeps the footer there, and a longer one scrolls under the sticky header instead of pushing it down
      el.data = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, name: `N${i + 1}`, age: i, email: "e@t.com" }));
      el.pageSize = 50;
      await el.updateComplete;
      assert.approximately(footer.getBoundingClientRect().bottom, parent.getBoundingClientRect().bottom, 0.5);
    });

    it("sits at the bottom of a table that has its own height", async () => {
      const result = await measure(2, { height: "700px" });
      assert.approximately(result.height, 700, 0.5);
      assert.approximately(result.footerBottom, 700, 0.5);
    });
  });

  describe("Styling", () => {
    // Regression: the checkbox column's body cells had a higher z-index than the sticky header, so they scrolled over it
    it("keeps the select column's body cells under the sticky header while scrolling", async () => {
      const data = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, name: `N${i + 1}`, age: i, email: "e@t.com" }));
      const el = await make({ data, selectable: true, selectAll: false });
      el.style.setProperty("--table-max-height", "300px");
      await el.updateComplete;
      const scroll = shadow(el).querySelector<HTMLElement>(".zeta-table-scroll")!;
      scroll.scrollTop = 200;
      await new Promise(resolve => setTimeout(resolve, 50));
      const headerCell = shadow(el).querySelector(".zeta-table-header-row .zeta-table-col-checkbox")!;
      const rect = headerCell.getBoundingClientRect();
      // Whatever is topmost in the header's select cell must be the header cell, from its top edge to its bottom edge
      [rect.top + 2, rect.top + rect.height / 2, rect.bottom - 2].forEach(y => {
        const top = shadow(el).elementsFromPoint(rect.left + 10, y)[0];
        assert.isTrue(headerCell.contains(top), `the header covers the select column at y=${Math.round(y)}`);
      });
    });

    it("has no outer border or shadow around the table", async () => {
      const el = await make();
      const style = getComputedStyle(shadow(el).querySelector(".zeta-table-wrapper")!);
      assert.equal(style.borderTopWidth, "0px");
      assert.equal(style.boxShadow, "none");
    });

    it("dims the content of a disabled row to half opacity", async () => {
      const el = await make({ data: [{ id: 1, name: "A", age: 1, email: "a@t.com", _disabled: true }, rows3[1]] });
      const [disabled, enabled] = Array.from(shadow(el).querySelectorAll(".zeta-table-tbody tr"));
      assert.equal(getComputedStyle(disabled.querySelector(".zeta-table-cell-inner")!).opacity, "0.5");
      assert.equal(getComputedStyle(enabled.querySelector(".zeta-table-cell-inner")!).opacity, "1");
    });

    it("draws the row's more button with no fill, so a selected row's fill shows through", async () => {
      const el = await make({ rowActions: [{ key: "e", label: "E" }], selectable: true, selectedRows: [1] });
      const button = shadow(el).querySelector<HTMLElement>(".zeta-table-action-btn")!;
      assert.equal(button.tagName, "BUTTON");
      assert.equal(getComputedStyle(button).backgroundColor, "rgba(0, 0, 0, 0)");
    });

    it("draws the active sort direction's caret in the cursor colour and the other in the tertiary colour", async () => {
      const el = await make({ columns: [{ field: "name", title: "Name", sortable: true }] });
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden";
      shadow(el).querySelector(".zeta-table-wrapper")!.appendChild(probe);
      const colour = (token: string) => {
        probe.style.color = `var(${token})`;
        return getComputedStyle(probe).color;
      };
      const fill = (arrow: Element) => getComputedStyle(arrow.querySelector("path")!).fill;
      const [up, down] = Array.from(shadow(el).querySelectorAll(".zeta-table-sort-arrow"));
      assert.equal(fill(up), colour("--foreground-tertiary"));
      // The caret fill eases in, so switch the transition off to read the final colour straight away
      [up, down].forEach(arrow => (arrow.querySelector("path")!.style.transition = "none"));
      shadow(el).querySelector<HTMLElement>(".zeta-table-header-title--sortable")!.click();
      await el.updateComplete;
      assert.equal(fill(up), colour("--foreground-cursor"));
      assert.equal(fill(down), colour("--foreground-tertiary"));
      probe.remove();
    });

    it("lets the search min-width be set with --table-search-min-width", async () => {
      const el = await make({ searchable: true });
      el.style.setProperty("--table-search-min-width", "321px");
      await el.updateComplete;
      const search = shadow(el).querySelector<HTMLElement>("zeta-search.zeta-table-global-search")!;
      assert.equal(getComputedStyle(search).minWidth, "321px");
    });
  });
});
