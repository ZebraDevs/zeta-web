import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { msg, str } from "@lit/localize";
import { Contourable } from "../../mixins/mixins.js";
import { menuHandlers, menuStyles, showMenu } from "./table-menu.js";
import styles from "./table-row.styles.js";
import "../checkbox/checkbox.js";
import "../icon/icon.js";

/**
 * A row of a `zeta-table`, like `<tr>`. It holds one `zeta-table-cell` per column, in column order.
 *
 * When the table is `selectable` the row leads with a checkbox. Items placed in the `actions` slot appear in a compact menu
 * opened from a more button at the end of the row.
 *
 * @slot - The row's `zeta-table-cell`s, in column order.
 * @slot actions - `zeta-dropdown-menu-item`s for the row's actions menu. Listen for `click` on them to run the action.
 * @part select - The cell holding the selection checkbox.
 * @part actions - The cell holding the more button.
 * @part menu - The row actions menu.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5302-5898
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-table--docs
 */
@customElement("zeta-table-row")
export class ZetaTableRow extends Contourable(LitElement) {
  /** An identifier for the row, for your own use, e.g. a record id. */
  @property({ type: String, reflect: true }) value = "";

  /** Whether the row is selected. The selection column shows it, and the row takes the selected fill. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Dims the row. It can't be selected or opened for actions, and its content ignores the pointer. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Set by the table: whether to draw the selection column. @internal */
  @property({ attribute: false }) selectable = false;

  /** Set by the table: whether to draw the actions column. @internal */
  @property({ attribute: false }) actionsColumn = false;

  /** Set by the table: whether the selection column is frozen. @internal */
  @property({ attribute: false }) frozen = false;

  @state() private hasActions = false;
  @state() private menuOpen = false;

  @query("[part=menu]") private readonly menu!: HTMLElement;
  @query("[part=actions] button") private readonly moreButton!: HTMLElement | null;

  connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute("role")) this.setAttribute("role", "row");
  }

  private readonly menuHandlers = menuHandlers(() => this.moreButton);

  /** The row's name for its checkbox and menu: the text of its first cell. */
  private get name() {
    return this.querySelector("zeta-table-cell")?.textContent?.trim() ?? "";
  }

  private toggleSelected = () => {
    this.selected = !this.selected;
    this.closest("zeta-table")?.notifySelection();
  };

  private openMenu = (e: Event) => showMenu(this.menu, e.currentTarget as HTMLElement, "end");

  protected render() {
    return html`
      ${
        this.selectable
          ? html`<div part="select" role="cell" class=${this.frozen ? "frozen" : ""}>
              <zeta-checkbox size="small" ?rounded=${this.rounded} .checked=${this.selected} ?disabled=${this.disabled} @change=${this.toggleSelected}
                ><span class="visually-hidden">${msg(str`Select row: ${this.name}`)}</span></zeta-checkbox
              >
            </div>`
          : nothing
      }
      <slot></slot>
      ${
        this.actionsColumn
          ? html`<div part="actions" role="cell">
              ${
                this.hasActions
                  ? html`<button
                      type="button"
                      class="icon-button"
                      aria-label=${msg(str`Actions for ${this.name}`)}
                      aria-haspopup="menu"
                      aria-expanded=${this.menuOpen ? "true" : "false"}
                      ?disabled=${this.disabled}
                      @click=${this.openMenu}
                    >
                      <zeta-icon ?rounded=${this.rounded}>more_vertical</zeta-icon>
                    </button>`
                  : nothing
              }
            </div>`
          : nothing
      }
      <div
        part="menu"
        class="menu"
        popover
        role="menu"
        aria-label=${msg(str`Actions for ${this.name}`)}
        @toggle=${(e: ToggleEvent) => (this.menuOpen = e.newState === "open")}
        @keydown=${this.menuHandlers.keydown}
        @click=${this.menuHandlers.click}
      >
        <slot name="actions" @slotchange=${(e: Event) => (this.hasActions = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], menuStyles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-table-row": ZetaTableRow;
  }
}
