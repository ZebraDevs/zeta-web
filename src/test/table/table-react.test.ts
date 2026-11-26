import { expect, assert } from "@open-wc/testing";
import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { ZetaTableReact, type ZetaTableReactProps } from "../../components/table/ZetaTableReact.js";
import type { ZetaTable, ZetaTableColumn } from "../../components/table/table.js";
import "../../index.css";

const columns: ZetaTableColumn[] = [
  { field: "name", title: "Name", width: 200, sortable: true },
  { field: "badge", title: "Badge", width: 200 }
];

/** A row whose badge cell is a React element showing the same name, so a cell on the wrong row is easy to see. */
const row = (id: number, name: string) => ({ id, name, badge: React.createElement("b", { className: "badge" }, `badge-${name}`) });

let host: HTMLElement;
let root: Root;

/** Polls until the check passes. React renders and the table updates asynchronously, so the table may not exist on the first tries. */
async function until(check: () => boolean, message: string) {
  for (let i = 0; i < 40; i++) {
    if (check()) return;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  assert.fail(`${message}. Rendered rows: ${JSON.stringify(renderedRows())}; host html: ${host.innerHTML.slice(0, 300)}`);
}

/** Mounts the React wrapper with the shared columns. The rows and children are fixed test fixtures, never user input. */
function renderTable(props: Omit<ZetaTableReactProps, "columns">, ...children: React.ReactNode[]) {
  root.render(React.createElement(ZetaTableReact, { columns, ...props }, ...children));
}

function table(): ZetaTable {
  return host.querySelector("zeta-table") as ZetaTable;
}

/** The text of each rendered body row's name cell and badge cell. Empty until the table has rendered. */
function renderedRows(): { name: string; badge: string }[] {
  const root = table()?.shadowRoot;
  if (!root) return [];
  return Array.from(root.querySelectorAll(".zeta-table-tbody .zeta-table-row")).map(tr => {
    const cells = tr.querySelectorAll(".zeta-table-td--data");
    return { name: cellText(cells[0]), badge: cellText(cells[1]) };
  });
}

/** The text a cell shows. Slotted content is in the light DOM, so it is read from the cell's slot, not from the cell. */
function cellText(cell: Element | undefined): string {
  const slot = cell?.querySelector("slot");
  if (!slot) return cell?.textContent?.trim() ?? "";
  return slot
    .assignedNodes({ flatten: true })
    .map(node => node.textContent)
    .join("")
    .trim();
}

describe("zeta-table react wrapper", () => {
  beforeEach(() => {
    host = document.createElement("div");
    document.body.appendChild(host);
    root = createRoot(host);
  });

  afterEach(() => {
    root.unmount();
    host.remove();
  });

  describe("Content", () => {
    it("renders React elements from data inside their cells", async () => {
      renderTable({ data: [row(1, "Alice"), row(2, "Bob")] });
      await until(() => renderedRows().length === 2, "rows did not render");
      await until(() => renderedRows().every(r => r.badge !== ""), "React cells did not render");
      assert.deepEqual(renderedRows(), [
        { name: "Alice", badge: "badge-Alice" },
        { name: "Bob", badge: "badge-Bob" }
      ]);
    });

    // Regression: cells were slotted by their index in `data`, which is not the row's index on screen once the table pages
    it("keeps React cells with their row on page 2", async () => {
      const data = [row(1, "Alice"), row(2, "Bob"), row(3, "Carol"), row(4, "Dave")];
      renderTable({ data, paginationType: "numbered", pageSize: 2, currentPage: 2 });
      await until(() => renderedRows().length === 2 && renderedRows().every(r => r.badge !== ""), "page 2 did not render");
      assert.deepEqual(renderedRows(), [
        { name: "Carol", badge: "badge-Carol" },
        { name: "Dave", badge: "badge-Dave" }
      ]);
    });

    it("forwards children into the controls slot", async () => {
      renderTable({ data: [row(1, "Alice")] }, React.createElement("button", { slot: "controls", id: "extra" }, "More"));
      await until(() => !!table()?.shadowRoot?.querySelector("slot[name='controls']"), "controls slot did not render");
      const slot = table().shadowRoot!.querySelector<HTMLSlotElement>("slot[name='controls']")!;
      expect(slot.assignedElements().map(el => el.id)).to.deep.equal(["extra"]);
    });
  });

  describe("Interaction", () => {
    // Regression: the rows are sorted by the table, so a cell slotted by its index in `data` ended up on the wrong row
    it("keeps React cells with their row after the table sorts", async () => {
      const data = [row(1, "Carol"), row(2, "Alice"), row(3, "Bob")];
      renderTable({ data });
      await until(() => renderedRows().length === 3 && renderedRows().every(r => r.badge !== ""), "rows did not render");

      table().shadowRoot!.querySelector<HTMLButtonElement>(".zeta-table-sort-btn")!.click();
      await until(() => renderedRows()[0]?.name === "Alice", "table did not sort");
      assert.deepEqual(renderedRows(), [
        { name: "Alice", badge: "badge-Alice" },
        { name: "Bob", badge: "badge-Bob" },
        { name: "Carol", badge: "badge-Carol" }
      ]);
    });

    // Regression: React elements in a row were replaced with "" in rowclick/rowaction detail.row
    it("passes the original row, with its React elements, to onRowClick", async () => {
      const data = [row(1, "Alice")];
      let clicked: Record<string, unknown> | undefined;
      renderTable({
        data,
        clickableRows: true,
        onRowClick: e => {
          clicked = e.detail.row;
        }
      });
      await until(() => renderedRows().length === 1, "rows did not render");
      table().shadowRoot!.querySelector<HTMLElement>(".zeta-table-tbody .zeta-table-row")!.click();
      await until(() => clicked !== undefined, "onRowClick did not fire");
      assert.strictEqual(clicked!.badge, data[0].badge);
      assert.equal(clicked!.name, "Alice");
    });
  });
});
