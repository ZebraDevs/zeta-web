import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ZetaTableSortDirection } from "../../events.js";

/**
 * Describes one column of a `zeta-table`, like `<col>` and `<th>` combined. Its text content is the column heading.
 *
 * The element itself never renders; the table draws the header cell from it. Columns pair with the `zeta-table-cell`s of each row by position.
 * Set the global `hidden` attribute to hide the column; the column settings panel does the same.
 *
 * @slot - The column heading, as plain text.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5238-5166
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */
@customElement("zeta-table-column")
export class ZetaTableColumn extends LitElement {
  /** Lets the user sort the table by this column from its header. */
  @property({ type: Boolean, reflect: true }) sortable = false;

  /**
   * The column's sort direction: `none`, `ascending` or `descending`. Only one column of a table is sorted at a time.
   *
   * @defaultValue `"none"`
   */
  @property({ type: String, reflect: true }) sort: ZetaTableSortDirection = "none";

  /** Adds a filter button to the header that opens a checkbox menu of the column's values. */
  @property({ type: Boolean, reflect: true }) filterable = false;

  /** Lets the user resize the column by dragging the trailing edge of its header, or with the arrow keys. */
  @property({ type: Boolean, reflect: true }) resizable = false;

  /**
   * The column's share of the table width, relative to the other columns. Columns share the width equally when it isn't set.
   * Resizing sets it on every visible column, so the table width never changes.
   */
  @property({ type: Number, reflect: true }) width?: number;

  /** The column heading. */
  get label() {
    return this.textContent?.trim() ?? "";
  }

  /** Columns are data for the table, so they render nothing. */
  protected createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-table-column": ZetaTableColumn;
  }
}
