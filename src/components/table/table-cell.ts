import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./table-cell.styles.js";

/**
 * A data cell in a `zeta-table-row`, like `<td>`. It pairs with the `zeta-table-column` in the same position.
 *
 * Text that doesn't fit is cut off with an ellipsis, and the table shows it in full in a tooltip on hover.
 *
 * @slot - The cell content: text, or components such as an avatar, a status label or a button.
 * @part content - The wrapper that holds the content and truncates it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5203-3689
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */
@customElement("zeta-table-cell")
export class ZetaTableCell extends LitElement {
  private readonly internals = this.attachInternals();

  connectedCallback() {
    super.connectedCallback?.();
    // A role attribute rather than ElementInternals ARIA: axe can't see internals roles and would report the table's rows as empty.
    if (!this.hasAttribute("role")) this.setAttribute("role", "cell");
  }

  /** Whether the content is cut off. @internal */
  get truncated() {
    const content = this.renderRoot.querySelector<HTMLElement>("[part=content]");
    return !!content && content.scrollWidth > content.clientWidth;
  }

  /**
   * Places the cell for the table: hidden with its column, or frozen at an offset from the start.
   * The table sets this rather than attributes, so it never edits the consumer's markup. @internal
   */
  place(hidden: boolean, frozenLeft?: number, frozenEdge = false) {
    this.toggleState("hidden", hidden);
    this.toggleState("frozen", frozenLeft !== undefined);
    this.toggleState("frozen-edge", frozenEdge);
    if (frozenLeft === undefined) this.style.removeProperty("--_frozen-left");
    else this.style.setProperty("--_frozen-left", `${frozenLeft}px`);
  }

  private toggleState(name: string, on: boolean) {
    if (on) this.internals.states.add(name);
    else this.internals.states.delete(name);
  }

  protected render() {
    return html`<div part="content"><slot></slot></div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-table-cell": ZetaTableCell;
  }
}
