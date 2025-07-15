import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./accordion.styles.js";
import type { ZetaAccordionItem } from "./accordion-item/accordion-item.js";

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * @slot - children should be `zeta-accordion-item` elements.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=3427-67874
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
@customElement("zeta-accordion")
export class ZetaAccordion extends Contourable(LitElement) {
  /** Determines if the ZetaAccordion should be in a card container. */
  @property({ type: Boolean, reflect: true }) inCard = false;

  /** Determines if multiple items can be open at the same time.
  When `false`, only one accordion item can be open at a time. */
  @property({ type: Boolean, reflect: true }) expandMultiple = false;

  /** Determines if multiple accordion items can be selected. */
  @property({ type: Boolean, reflect: true }) selectMultiple = false;

  protected firstUpdated() {
    this.addEventListener("item-expanded", this.handleItemExpanded as EventListener);
    this.addEventListener("item-selected", this.handleItemSelected as EventListener);
  }

  private handleItemExpanded = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (!this.expandMultiple) {
      const expandedItem = customEvent.target as ZetaAccordionItem;
      const items = this.getAccordionItems();

      items.forEach(item => {
        if (item !== expandedItem && item.expanded) {
          item.expanded = false;
        }
      });
    }
  };

  private handleItemSelected = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (!this.selectMultiple) {
      const selectedItem = customEvent.target as ZetaAccordionItem;
      const items = this.getAccordionItems();

      items.forEach(item => {
        if (item !== selectedItem && item.selected) {
          item.selected = false;
        }
      });
    }
  };

  private getAccordionItems(): ZetaAccordionItem[] {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return [];

    return slot.assignedElements({ flatten: true }).filter(element => element.tagName.toLowerCase() === "zeta-accordion-item") as ZetaAccordionItem[];
  }

  protected render() {
    return html` <div class="accordion contourable-target">
      <slot> </slot>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion": ZetaAccordion;
  }
}
