import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ZetaTable } from "../../../components/table/table.js";
import "../../../components/table/table.js";
import "../../../components/avatar/avatar.js";
import "../../../components/badges/status-label/status-label.js";
import "../../../components/button/button.js";
import "../../../components/button/icon-button/icon-button.js";
import "../../../components/dropdown/menu-item/dropdown-menu-item.js";

type Args = Pick<ZetaTable, "caption" | "selectable" | "searchable" | "columnSettings" | "frozen" | "pageSize" | "pageSizes" | "rounded" | "emptyLabel"> & {
  rowCount: number;
  "--table-content-max-height"?: string;
};

const meta: Meta<Args> = {
  component: "zeta-table",
  title: "Components/Table",
  args: {
    caption: "Team members",
    selectable: true,
    searchable: true,
    columnSettings: true,
    frozen: 0,
    pageSize: 5,
    pageSizes: "5,10,25",
    rounded: true,
    rowCount: 21,
    emptyLabel: "No team members match"
  },
  argTypes: {
    frozen: { control: { type: "number", min: 0, max: 4 } },
    pageSize: { control: { type: "number", min: 0 } },
    rowCount: { control: { type: "number", min: 0, max: 100 }, description: "Story only: how many rows to generate." },
    "--table-content-max-height": { control: "text", description: "Caps the content height so rows scroll under a sticky header, e.g. `300px`." }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=6717-3146" },
    status: { type: "ready" }
  }
};
export default meta;

const people = ["Ada Lovelace", "Alan Turing", "Grace Hopper", "Katherine Johnson", "Linus Torvalds", "Margaret Hamilton", "Tim Berners-Lee"];
const roles = ["Engineer", "Designer", "Product owner"];
const statuses = [
  { label: "Active", status: "positive" },
  { label: "Away", status: "warning" },
  { label: "Offline", status: "neutral" }
] as const;

const rows = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const name = people[i % people.length];
    const status = statuses[i % statuses.length];
    return html`<zeta-table-row value=${i} ?disabled=${i % 7 === 3}>
      <zeta-table-cell>
        <span style=${styleMap({ display: "flex", alignItems: "center", gap: "var(--space-sm)" })}>
          <zeta-avatar size="xs">${name.split(" ").map(part => part[0])}</zeta-avatar>
          <span style=${styleMap({ display: "flex", flexDirection: "column" })}>
            <span>${name}</span>
            <span style=${styleMap({ color: "var(--foreground-secondary)", font: "var(--body-xsmall)" })}>${roles[i % roles.length]}</span>
          </span>
        </span>
      </zeta-table-cell>
      <zeta-table-cell><zeta-status-label status=${status.status}>${status.label}</zeta-status-label></zeta-table-cell>
      <zeta-table-cell>${`Team ${(i % 4) + 1}`}</zeta-table-cell>
      <zeta-table-cell>${`${name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`}</zeta-table-cell>
      <zeta-table-cell><zeta-button flavor="outline" size="small">View</zeta-button></zeta-table-cell>
      <zeta-dropdown-menu-item slot="actions">Edit</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item slot="actions">Duplicate</zeta-dropdown-menu-item>
      <zeta-dropdown-menu-item slot="actions">Delete</zeta-dropdown-menu-item>
    </zeta-table-row>`;
  });

export const Table: StoryObj<Args> = {
  render: args => html`
    <zeta-table
      caption=${args.caption}
      ?selectable=${args.selectable}
      ?searchable=${args.searchable}
      ?columnsettings=${args.columnSettings}
      frozen=${args.frozen}
      pagesize=${args.pageSize}
      pagesizes=${args.pageSizes}
      emptylabel=${ifDefined(args.emptyLabel)}
      .rounded=${args.rounded}
      style=${styleMap({ "--table-content-max-height": args["--table-content-max-height"] })}
    >
      <zeta-icon-button slot="controls" flavor="outline-subtle" size="small" aria-label="Refresh">refresh</zeta-icon-button>
      <zeta-icon-button slot="controls" flavor="outline-subtle" size="small" aria-label="Download">download</zeta-icon-button>
      <zeta-table-column sortable resizable>Name</zeta-table-column>
      <zeta-table-column sortable filterable resizable>Status</zeta-table-column>
      <zeta-table-column sortable filterable resizable>Team</zeta-table-column>
      <zeta-table-column resizable>Email</zeta-table-column>
      <zeta-table-column>Profile</zeta-table-column>
      ${rows(args.rowCount)}
    </zeta-table>
  `
};

/** The minimum: columns and rows, with no controls bar, footer, selection or actions. */
export const Plain: StoryObj<Args> = {
  render: args => html`
    <zeta-table caption="Plain table" .rounded=${args.rounded}>
      <zeta-table-column>Name</zeta-table-column>
      <zeta-table-column>Team</zeta-table-column>
      ${people.map(
        (name, i) =>
          html`<zeta-table-row>
            <zeta-table-cell>${name}</zeta-table-cell>
            <zeta-table-cell>${`Team ${(i % 4) + 1}`}</zeta-table-cell>
          </zeta-table-row>`
      )}
    </zeta-table>
  `
};

/** With `--table-content-max-height`, rows scroll under a sticky header, and frozen columns stay put when scrolling sideways. */
export const ScrollingAndFrozen: StoryObj<Args> = {
  args: { frozen: 1, pageSize: 0, "--table-content-max-height": "320px" },
  render: Table.render
};

/** In `manual` mode the table only fires events; your code sorts, filters and pages the rows, e.g. on a server. */
export const Manual: StoryObj<Args> = {
  render: () => html`
    <zeta-table
      caption="Server-side table"
      manual
      searchable
      pagesize="5"
      total="42"
      @sort=${(e: CustomEvent) => console.log("sort", e.detail)}
      @search=${(e: CustomEvent) => console.log("search", e.detail)}
      @pagechange=${(e: CustomEvent) => console.log("pagechange", e.detail)}
    >
      <zeta-table-column sortable>Name</zeta-table-column>
      <zeta-table-column>Team</zeta-table-column>
      ${people.slice(0, 5).map(
        (name, i) =>
          html`<zeta-table-row>
            <zeta-table-cell>${name}</zeta-table-cell>
            <zeta-table-cell>${`Team ${(i % 4) + 1}`}</zeta-table-cell>
          </zeta-table-row>`
      )}
    </zeta-table>
  `
};
