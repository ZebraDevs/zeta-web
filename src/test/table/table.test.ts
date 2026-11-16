import { fixture, html, unsafeStatic, expect, elementUpdated, oneEvent, waitUntil } from "@open-wc/testing";
import { sendKeys } from "@web/test-runner-commands";
import type { ZetaTable, ZetaTableCell, ZetaTableColumn, ZetaTableRow } from "../../components/table/table.js";
import type { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import type { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaPagination } from "../../components/pagination/pagination.js";
import "../../components/table/table.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue, getCssVarPxValue, MouseActions } from "../utils.js";
import "../../index.css";

const people = ["Cara", "Ada", "Bea", "Eve", "Dot", "Fay", "Gus"];
const teams = ["Blue", "Red", "Blue", "Green", "Red", "Blue", "Red"];

const rowsMarkup = (count = people.length, actions = false) =>
  people
    .slice(0, count)
    .map(
      (name, i) =>
        `<zeta-table-row value="${i}"><zeta-table-cell>${name}</zeta-table-cell><zeta-table-cell>${teams[i]}</zeta-table-cell>${
          actions ? `<zeta-dropdown-menu-item slot="actions">Edit</zeta-dropdown-menu-item>` : ""
        }</zeta-table-row>`
    )
    .join("");

const columnsMarkup = `<zeta-table-column sortable resizable>Name</zeta-table-column><zeta-table-column filterable resizable>Team</zeta-table-column>`;

describe("zeta-table", () => {
  let subject: ZetaTable;

  const createComponent = async (attributes = "", body = `${columnsMarkup}${rowsMarkup()}`) => {
    // prettier-ignore
    const el = await fixture<ZetaTable>(html`${unsafeStatic(`<zeta-table caption="People" ${attributes}>${body}</zeta-table>`)}`);
    await elementUpdated(el);
    return el;
  };

  const $ = <T extends Element = HTMLElement>(selector: string) => subject.shadowRoot!.querySelector<T>(selector)!;
  const $$ = <T extends Element = HTMLElement>(selector: string) => [...subject.shadowRoot!.querySelectorAll<T>(selector)];
  /** The rows on show, in the order the table shows them. */
  const shownNames = () =>
    $<HTMLSlotElement>("slot:not([name])")
      .assignedElements()
      .map(row => row.querySelector("zeta-table-cell")!.textContent);
  const rows = () => [...subject.querySelectorAll<ZetaTableRow>("zeta-table-row")];
  const columns = () => [...subject.querySelectorAll<ZetaTableColumn>("zeta-table-column")];
  const rowCheckbox = (row: ZetaTableRow) => row.shadowRoot!.querySelector<ZetaCheckbox>("zeta-checkbox")!;
  /** Clicks a zeta-checkbox the way a user does, on its native input. */
  const tick = (checkbox: ZetaCheckbox) => checkbox.shadowRoot!.querySelector("input")!.click();
  const settle = async () => {
    await elementUpdated(subject);
    await Promise.all(rows().map(r => elementUpdated(r)));
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements with every feature on", async () => {
      subject = await createComponent(`selectable searchable columnsettings pagesize="3" pagesizes="3,5"`, `${columnsMarkup}${rowsMarkup(7, true)}`);
      await settle();
      await expect(subject).to.be.accessible();
    });

    it("meets contrast requirements for header and cell text", async () => {
      const header = $("[data-column]");
      await contrastTest("Header label", header.querySelector(".label")!, header);
      const cell = subject.querySelector<ZetaTableCell>("zeta-table-cell")!;
      await contrastTest("Cell text", cell, cell);
    });

    it("is a named table of rows, column headers and cells", () => {
      const table = $("[part=content]");
      expect(table.getAttribute("role")).to.equal("table");
      expect(table.getAttribute("aria-label")).to.equal("People");
      expect($("[part=header]").getAttribute("role")).to.equal("row");
      expect($$("[role=columnheader]")).to.have.length(2);
      expect(rows()[0].getAttribute("role")).to.equal("row");
      expect(subject.querySelector("zeta-table-cell")!.getAttribute("role")).to.equal("cell");
    });

    it("sets aria-sort on sortable columns only", async () => {
      const [name, team] = $$("[role=columnheader]");
      expect(name.getAttribute("aria-sort")).to.equal("none");
      expect(team.hasAttribute("aria-sort")).to.be.false;
      $<HTMLButtonElement>("button.sort").click();
      await settle();
      expect($("[role=columnheader]").getAttribute("aria-sort")).to.equal("ascending");
    });

    it("names the selection checkboxes", async () => {
      subject = await createComponent("selectable");
      await settle();
      expect($("[part=header] zeta-checkbox").textContent).to.equal("Select all rows");
      expect(rowCheckbox(rows()[0]).textContent).to.equal("Select row: Cara");
    });

    it("makes resize grips focusable separators with a name and a value", () => {
      const grip = $(".grip");
      expect(grip.getAttribute("role")).to.equal("separator");
      expect(grip.getAttribute("tabindex")).to.equal("0");
      expect(grip.getAttribute("aria-label")).to.equal("Resize Name");
      expect(Number(grip.getAttribute("aria-valuenow"))).to.be.greaterThan(0);
    });

    it("announces the selected count in a live region", async () => {
      subject = await createComponent("selectable");
      await settle();
      const status = $("[part=controls] [role=status]");
      expect(status.textContent.trim()).to.equal("");
      rows()[0].selected = true;
      await settle();
      expect(status.textContent.trim()).to.equal("1 selected");
    });

    it("names the row actions button and its menu", async () => {
      subject = await createComponent("", `${columnsMarkup}${rowsMarkup(2, true)}`);
      await settle();
      const button = rows()[0].shadowRoot!.querySelector("[part=actions] button")!;
      expect(button.getAttribute("aria-label")).to.equal("Actions for Cara");
      expect(button.getAttribute("aria-haspopup")).to.equal("menu");
      expect(rows()[0].shadowRoot!.querySelector("[part=menu]")!.getAttribute("role")).to.equal("menu");
    });

    it("hides the truncation tooltip from assistive technology", () => {
      expect($("zeta-tooltip").getAttribute("aria-hidden")).to.equal("true");
    });
  });

  describe("Content", () => {
    it("draws a header cell per visible column", () => {
      expect($$("[data-column] .label").map(l => l.textContent)).to.deep.equal(["Name", "Team"]);
    });

    it("shows the rows in document order by default", () => {
      expect(shownNames()).to.deep.equal(people);
    });

    it("shows the empty label when no rows match", async () => {
      subject = await createComponent(`emptylabel="Nobody here"`, columnsMarkup);
      expect($(".empty [role=cell]").textContent).to.equal("Nobody here");
      subject.emptyLabel = undefined;
      await settle();
      expect($(".empty [role=cell]").textContent).to.equal("No results");
    });

    it("only draws the controls bar when it has something to hold", async () => {
      expect($("[part=controls]")).to.be.null;
      subject = await createComponent("searchable");
      expect($("[part=controls] zeta-search")).to.exist;
      subject = await createComponent("", `<button slot="controls">Refresh</button>${columnsMarkup}${rowsMarkup(2)}`);
      expect($<HTMLSlotElement>("slot[name=controls]").assignedElements()[0].textContent).to.equal("Refresh");
    });

    it("only draws the footer when paged", async () => {
      expect($("[part=footer]")).to.be.null;
      subject = await createComponent(`pagesize="3"`);
      expect($("[part=footer] .summary").textContent).to.equal("Showing 1-3 of 7");
      expect($<ZetaPagination>("zeta-pagination").totalPages).to.equal(3);
    });

    it("hides pagination when everything fits on one page", async () => {
      subject = await createComponent(`pagesize="10"`);
      expect($("zeta-pagination")).to.be.null;
      expect($("[part=footer] .summary").textContent).to.equal("Showing 1-7 of 7");
    });

    it("offers the rows-per-page choices", async () => {
      subject = await createComponent(`pagesize="3" pagesizes="10,3,5"`);
      expect($$<HTMLOptionElement>("select option").map(o => o.value)).to.deep.equal(["3", "5", "10"]);
      expect($<HTMLSelectElement>("select").value).to.equal("3");
    });

    it("only draws the actions column when a row has actions", async () => {
      expect($("[role=columnheader].actions")).to.be.null;
      subject = await createComponent("", `${columnsMarkup}${rowsMarkup(2, true)}`);
      await settle();
      expect($("[role=columnheader].actions")).to.exist;
      expect(rows()[0].shadowRoot!.querySelector("[part=actions] button")).to.exist;
    });

    it("updates when the consumer adds rows", async () => {
      subject.insertAdjacentHTML("beforeend", `<zeta-table-row><zeta-table-cell>Hal</zeta-table-cell><zeta-table-cell>Red</zeta-table-cell></zeta-table-row>`);
      await waitUntil(() => shownNames().includes("Hal"));
    });
  });

  describe("Dimensions", () => {
    it("pads the controls bar and footer with space.md and space.lg", async () => {
      subject = await createComponent(`searchable pagesize="3"`);
      for (const part of ["[part=controls]", "[part=footer]"]) {
        const style = getComputedStyle($(part));
        expect(parseFloat(style.paddingTop)).to.equal(getCssVarPxValue(subject, "--space-md"));
        expect(parseFloat(style.paddingLeft)).to.equal(getCssVarPxValue(subject, "--space-lg"));
      }
    });

    it("pads cells with space.md and space.lg", () => {
      const style = getComputedStyle(subject.querySelector("zeta-table-cell")!);
      expect(parseFloat(style.paddingTop)).to.equal(getCssVarPxValue(subject, "--space-md"));
      expect(parseFloat(style.paddingLeft)).to.equal(getCssVarPxValue(subject, "--space-lg"));
    });

    it("caps the content height with --table-content-max-height", async () => {
      subject.style.setProperty("--table-content-max-height", "120px");
      await settle();
      expect($("[part=content]").getBoundingClientRect().height).to.equal(120);
      expect(getComputedStyle($("[part=header]")).position).to.equal("sticky");
    });
  });

  describe("Styling", () => {
    it("rounds the table with radius.element-md, or squares it when sharp", async () => {
      expect(parseFloat(getComputedStyle(subject).borderTopLeftRadius)).to.equal(getCssVarPxValue(subject, "--radius-element-md"));
      subject.rounded = false;
      await settle();
      expect(getComputedStyle(subject).borderTopLeftRadius).to.equal("0px");
    });

    it("fills selected rows with the selected fill across every column", async () => {
      rows()[0].selected = true;
      await settle();
      const fill = getCssVarColorValue(subject, "--interactive-neutral-background-selected");
      for (const cell of rows()[0].querySelectorAll("zeta-table-cell")) expect(getComputedStyle(cell).backgroundColor).to.equal(fill);
    });

    it("keeps the plain fill on a disabled row and dims its content", async () => {
      rows()[0].disabled = true;
      await settle();
      const cell = rows()[0].querySelector<ZetaTableCell>("zeta-table-cell")!;
      expect(getComputedStyle(cell).backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-neutral-background-default"));
      expect(Number(getComputedStyle(cell.shadowRoot!.querySelector("[part=content]")!).opacity)).to.be.lessThan(1);
      expect(getComputedStyle(cell).pointerEvents).to.equal("none");
    });

    it("borders the header with border.default and cells with border.subtle", () => {
      expect(getComputedStyle($("[data-column]")).borderBottomColor).to.equal(getCssVarColorValue(subject, "--border-default"));
      expect(getComputedStyle(subject.querySelector("zeta-table-cell")!).borderBottomColor).to.equal(getCssVarColorValue(subject, "--border-subtle"));
    });

    it("colours a filtered column's glyph with foreground.cursor", async () => {
      $<HTMLButtonElement>("button.filter").click();
      await settle();
      $<ZetaDropdownMenuItem>(".filter-menu zeta-dropdown-menu-item").click();
      await settle();
      expect(getComputedStyle($("button.filter")).color).to.equal(getCssVarColorValue(subject, "--foreground-cursor"));
    });

    it("uses surface.section for the controls bar and footer", async () => {
      subject = await createComponent(`searchable pagesize="3"`);
      expect(getComputedStyle($("[part=controls]")).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-section"));
      expect(getComputedStyle($("[part=footer]")).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-section"));
    });
  });

  describe("Interaction", () => {
    it("cycles a sortable header through ascending, descending and none, firing sort", async () => {
      const button = $<HTMLButtonElement>("button.sort");
      setTimeout(() => button.click());
      const event = await oneEvent<CustomEvent>(subject, "sort");
      expect(event.bubbles && event.composed).to.be.true;
      expect(event.detail.direction).to.equal("ascending");
      expect(event.detail.column).to.equal(columns()[0]);
      await settle();
      expect(shownNames()).to.deep.equal([...people].sort());
      button.click();
      await settle();
      expect(shownNames()).to.deep.equal([...people].sort().reverse());
      button.click();
      await settle();
      expect(shownNames()).to.deep.equal(people);
    });

    it("sorts without moving the consumer's DOM", async () => {
      $<HTMLButtonElement>("button.sort").click();
      await settle();
      expect(rows().map(r => r.querySelector("zeta-table-cell")!.textContent)).to.deep.equal(people);
    });

    it("searches every cell's text and fires search, keeping the field's own input inside", async () => {
      subject = await createComponent("searchable");
      let inputs = 0;
      subject.addEventListener("input", () => inputs++);
      const search = $<HTMLElement>("zeta-search");
      search.focus();
      setTimeout(() => void sendKeys({ type: "gre" }));
      const event = await oneEvent<CustomEvent>(subject, "search");
      expect(event.bubbles && event.composed).to.be.true;
      await waitUntil(() => subject.query === "gre");
      await settle();
      expect(shownNames()).to.deep.equal(["Eve"]);
      expect(inputs).to.equal(0);
    });

    it("filters a column from its checkbox menu and fires filter", async () => {
      $<HTMLButtonElement>("button.filter").click();
      await settle();
      const items = $$<ZetaDropdownMenuItem>(".filter-menu zeta-dropdown-menu-item");
      expect(items.map(i => i.textContent)).to.deep.equal(["Blue", "Green", "Red"]);
      expect($(".filter-menu").matches(":popover-open")).to.be.true;
      setTimeout(() => items[2].click());
      const event = await oneEvent<CustomEvent>(subject, "filter");
      expect(event.detail.values).to.deep.equal(["Red"]);
      await settle();
      expect(shownNames()).to.deep.equal(["Ada", "Dot", "Gus"]);
    });

    it("closes a menu on Escape and returns focus to its trigger", async () => {
      const trigger = $<HTMLButtonElement>("button.filter");
      trigger.focus();
      trigger.click();
      await settle();
      expect(subject.shadowRoot!.activeElement?.localName).to.equal("zeta-dropdown-menu-item");
      await sendKeys({ press: "Escape" });
      expect($(".filter-menu").matches(":popover-open")).to.be.false;
      expect(subject.shadowRoot!.activeElement).to.equal(trigger);
    });

    it("selects rows, counts them and fires rowselect", async () => {
      subject = await createComponent("selectable");
      await settle();
      setTimeout(() => tick(rowCheckbox(rows()[1])));
      const event = await oneEvent<CustomEvent>(subject, "rowselect");
      expect(event.bubbles && event.composed).to.be.true;
      expect(event.detail.rows).to.deep.equal([rows()[1]]);
      expect(rows()[1].selected).to.be.true;
      await settle();
      const all = $<ZetaCheckbox>("[part=header] zeta-checkbox");
      expect(all.indeterminate).to.be.true;
      expect($("zeta-label").textContent).to.equal("1 selected");
    });

    it("select-all covers only the enabled rows on show", async () => {
      subject = await createComponent(`selectable pagesize="3"`);
      rows()[2].disabled = true;
      await settle();
      tick($<ZetaCheckbox>("[part=header] zeta-checkbox"));
      await settle();
      expect(rows().map(r => r.selected)).to.deep.equal([true, true, false, false, false, false, false]);
      expect($<ZetaCheckbox>("[part=header] zeta-checkbox").checked).to.be.true;
      tick($<ZetaCheckbox>("[part=header] zeta-checkbox"));
      await settle();
      expect(rows().some(r => r.selected)).to.be.false;
    });

    it("can't select a disabled row or open its actions", async () => {
      subject = await createComponent("selectable", `${columnsMarkup}${rowsMarkup(2, true)}`);
      rows()[0].disabled = true;
      await settle();
      expect(rowCheckbox(rows()[0]).disabled).to.be.true;
      expect(rows()[0].shadowRoot!.querySelector<HTMLButtonElement>("[part=actions] button")!.disabled).to.be.true;
    });

    it("pages the rows and fires pagechange from pagination", async () => {
      subject = await createComponent(`pagesize="3"`);
      const pagination = $<ZetaPagination>("zeta-pagination");
      let legacy = 0;
      subject.addEventListener("pageChange", () => legacy++);
      setTimeout(() => pagination.shadowRoot!.querySelectorAll<HTMLButtonElement>("button.page")[1].click());
      const event = await oneEvent<CustomEvent>(subject, "pagechange");
      expect(event.bubbles && event.composed).to.be.true;
      expect(event.detail).to.deep.equal({ page: 2, pageSize: 3 });
      await settle();
      expect(shownNames()).to.deep.equal(people.slice(3, 6));
      expect($("[part=footer] .summary").textContent).to.equal("Showing 4-6 of 7");
      expect(legacy).to.equal(0);
    });

    it("changes rows per page from the select and returns to page 1", async () => {
      subject = await createComponent(`pagesize="3" pagesizes="3,5" page="2"`);
      const select = $<HTMLSelectElement>("select");
      select.value = "5";
      setTimeout(() => select.dispatchEvent(new Event("change")));
      const event = await oneEvent<CustomEvent>(subject, "pagechange");
      expect(event.detail).to.deep.equal({ page: 1, pageSize: 5 });
      await settle();
      expect(shownNames()).to.deep.equal(people.slice(0, 5));
    });

    it("returns to page 1 when sorting", async () => {
      subject = await createComponent(`pagesize="3" page="3"`);
      $<HTMLButtonElement>("button.sort").click();
      await settle();
      expect(subject.page).to.equal(1);
    });

    it("leaves rows alone in manual mode, only firing events", async () => {
      subject = await createComponent(`manual pagesize="3" total="30"`);
      $<HTMLButtonElement>("button.sort").click();
      await settle();
      expect(shownNames()).to.deep.equal(people);
      expect($("[part=footer] .summary").textContent).to.equal("Showing 1-3 of 30");
      expect($<ZetaPagination>("zeta-pagination").totalPages).to.equal(10);
    });

    it("hides a column from the settings panel, but never the last one", async () => {
      subject = await createComponent("columnsettings");
      $<HTMLButtonElement>("button.settings").click();
      await settle();
      const [name, team] = $$<ZetaDropdownMenuItem>(".settings-menu zeta-dropdown-menu-item[type=checkbox]");
      team.click();
      await settle();
      expect(columns()[1].hidden).to.be.true;
      expect($$("[data-column]")).to.have.length(1);
      const teamCell = rows()[0].querySelectorAll<ZetaTableCell>("zeta-table-cell")[1];
      expect(getComputedStyle(teamCell).display).to.equal("none");
      expect(name.disabled).to.be.true;
    });

    it("freezes columns up to a chosen one", async () => {
      subject = await createComponent(`frozen="1"`);
      await settle();
      const cell = rows()[0].querySelector<ZetaTableCell>("zeta-table-cell")!;
      expect(getComputedStyle(cell).position).to.equal("sticky");
      expect(getComputedStyle($("[data-column]")).position).to.equal("sticky");
      expect(getComputedStyle(rows()[0].querySelectorAll("zeta-table-cell")[1]).position).not.to.equal("sticky");
    });

    it("resizes with the arrow keys by trading width, so the table width holds", async () => {
      const before = $("[part=content]").scrollWidth;
      const name = $("[data-column]").getBoundingClientRect().width;
      $(".grip").focus();
      await sendKeys({ press: "ArrowRight" });
      await settle();
      expect($("[data-column]").getBoundingClientRect().width).to.be.closeTo(name + getCssVarPxValue(subject, "--space-lg"), 1);
      expect($("[part=content]").scrollWidth).to.be.closeTo(before, 1);
    });

    it("resets a column's width on double-click", async () => {
      $(".grip").focus();
      await sendKeys({ press: "ArrowRight" });
      await sendKeys({ press: "ArrowRight" });
      await settle();
      $(".grip").dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
      await settle();
      const [a, b] = $$("[data-column]").map(c => c.getBoundingClientRect().width);
      expect(a).to.be.closeTo(b, 1);
    });

    it("opens the row actions menu and closes it after choosing an action", async () => {
      subject = await createComponent("", `${columnsMarkup}${rowsMarkup(2, true)}`);
      await settle();
      const row = rows()[0];
      const button = row.shadowRoot!.querySelector<HTMLButtonElement>("[part=actions] button")!;
      button.click();
      await elementUpdated(row);
      const menu = row.shadowRoot!.querySelector<HTMLElement>("[part=menu]")!;
      expect(menu.matches(":popover-open")).to.be.true;
      // The popover's toggle event arrives a task later.
      await waitUntil(() => button.getAttribute("aria-expanded") === "true");
      row.querySelector<HTMLElement>("[slot=actions]")!.click();
      expect(menu.matches(":popover-open")).to.be.false;
    });

    it("shows cut-off text in full in a tooltip after a short hover", async () => {
      subject = await createComponent(
        `style="width: 300px"`,
        `${columnsMarkup}<zeta-table-row><zeta-table-cell>A very long name that cannot possibly fit in this narrow column</zeta-table-cell><zeta-table-cell>Red</zeta-table-cell></zeta-table-row>`
      );
      const cell = subject.querySelector<ZetaTableCell>("zeta-table-cell")!;
      expect(cell.truncated).to.be.true;
      await MouseActions.hover(cell);
      await waitUntil(() => $("zeta-tooltip").matches(":popover-open"), "tooltip did not open", { timeout: 2000 });
      expect($("zeta-tooltip").textContent).to.equal("A very long name that cannot possibly fit in this narrow column");
      await MouseActions.reset();
    });
  });

  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
