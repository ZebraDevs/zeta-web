import { html, LitElement } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import { ZetaGridMenuItem } from "../grid-menu-item/grid-menu-item.js";
import { ZetaListItem } from "../list/list.js";

/** Bottom sheets are surfaces containing supplementary content that are anchored to the bottom of the screen.
 *
 * @slot - Content to be displayed in the bottom sheet. Either `zeta-list-item` or `zeta-grid-menu-item`.
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21541-2225
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-bottom-sheet--docs
 */
@customElement("zeta-bottom-sheet")
export class ZetaBottomSheet extends LitElement {
  /** Sheet Header alignment.*/
  @property({ type: String, reflect: true }) headerAlignment: "start" | "center" = "start";

  /** Sheet Header text content.*/
  @property({ type: String, reflect: true }) headerText: string = "Title";

  /** If the items are list items or grid items */
  @state() isGrid: boolean = false;

  /** If the content is generic. E.g. not list or grid items. */
  @state() isGenericContent: boolean = false;

  /** If the bottom sheet is collapsed or not */
  @property({ type: Boolean, reflect: true }) isExpanded: boolean = true;

  /** Default slot */
  @queryAssignedElements({ flatten: true }) items: NodeList | undefined;

  static styles = [super.styles ?? [], styles];

  private setLayout = () => {
    this.requestUpdate();
    if (this.items && this.items[0] && this.items[0] instanceof ZetaGridMenuItem) {
      this.isGrid = true;
      this.isGenericContent = false;
    } else if (this.items && this.items[0] && this.items[0] instanceof ZetaListItem) {
      this.isGrid = false;
      this.isGenericContent = false;
    } else {
      this.isGenericContent = true;
    }
  };

  protected override render() {
    this.setLayout();
    return html`
      <div class="container">
        <div class="handle"></div>
        <div class="header">${this.headerText}</div>
        <div class="content ${this.isGenericContent ? "isGenericContent" : ""}${this.isGrid ? "isGrid" : ""}" tabindex="0">
          <slot @slotchange=${this.setLayout}></slot>
        </div>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-bottom-sheet": ZetaBottomSheet;
  }
}
