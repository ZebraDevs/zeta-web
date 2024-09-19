export * from "./breadcrumb-item/breadcrumb-item.js";
import { html, LitElement, type TemplateResult } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";

/**
 * The breadcrumb is a secondary navigation patten that helps a user understand the hierarchy among levels and navigate back through them.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-5&node-type=canvas&m=dev
 * @storybook https://zeta-ds.web.app/web/storybook/index.html?path=/docs/breadcrumb--docs
 */
@customElement("zeta-breadcrumb")
export class ZetaBreadcrumb extends Contourable(Interactive(LitElement)) {
  static styles = [super.styles ?? [], styles];

  /**
   * The maximum number of items to display in the breadcrumb.
   * For example, if the value is 3 and there are 5 items in the breadcrumb:
   * * The first item will always be displayed.
   * * The last 2 items will always be displayed.
   * * The rest of the items will be truncated and displayed in a more menu.
   */
  @property({ type: Number }) maxItems: number = 0;

  @state() itemsTruncated: (TemplateResult | HTMLElement)[] = [];

  @queryAssignedElements() items!: HTMLElement[];

  private handleClick = () => {
    if (this.maxItems == 1) {
      this.itemsTruncated = [...this.itemsTruncated.slice(0, 1), ...this.items];
    } else {
      this.itemsTruncated = [...this.itemsTruncated.slice(0, 1), ...this.items, ...this.itemsTruncated.slice(-(this.maxItems - 1))];
    }
  };

  private handleSlotChange = () => {
    // Only truncate items if maxItems is set
    if (this.maxItems != undefined && this.maxItems >= 1 && this.itemsTruncated.length == 0) {
      // Minimum number of items to display is 2
      if (this.maxItems == 1) this.maxItems = 2;

      const moreMenu =
        this.maxItems < this.items.length
          ? html`<div class="more-menu">
              <button class="contourable-target" @click="${this.handleClick}"><zeta-icon>more_horizontal</zeta-icon></button>
            </div>`
          : html``;

      const leadingItem: HTMLElement[] = [];
      const trailingItems: HTMLElement[] = [];

      this.items.map((item, index) => {
        if (index == 0) leadingItem.push(item);
        if (index > this.items.length - this.maxItems) trailingItems.push(item);
      });

      this.itemsTruncated = [...leadingItem, moreMenu, ...trailingItems];

      const slot = this.shadowRoot?.querySelector("slot");
      slot!.style.display = "none";
    }
  };

  protected override render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div class="container">${this.itemsTruncated}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb": ZetaBreadcrumb;
  }
}
