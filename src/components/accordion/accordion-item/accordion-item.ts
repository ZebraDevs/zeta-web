import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../../mixins/mixins.js";
import styles from "./accordion-item.styles.js";
import "../../icon/icon";

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * @slot - content displayed when the accordion item is expanded.
 * @slot header - content displayed in the header of the accordion item.
 *
 * @part item-header - The header of the accordion item.
 * @part item-content - The content area of the accordion item.
 * @part header-content - The content area of the accordion item header.
 *
 * @fires item-expanded - Dispatched when the accordion item is expanded or collapsed.
 * @fires item-selected - Dispatched when the accordion item is selected or deselected.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=3427-67874
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
@customElement("zeta-accordion-item")
export class ZetaAccordionItem extends Contourable(LitElement) {
  /**  Title of the accordion item. */
  @property({ type: String }) title: string;

  /** Whether the accordion item is initially open. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Whether the accordion item is initially selected. */
  @property({ type: Boolean }) selected = false;

  /** Whether the item is selectable */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Whether the accordion item is a navigation item. */
  @property({ type: Boolean, reflect: true }) navigation = false;

  protected hasDefaultSlot = false;

  protected firstUpdated() {
    const slot = this.shadowRoot?.querySelector("slot:not([name])") as HTMLSlotElement | null;

    if (slot) {
      const updateHasDefaultSlot = () => {
        this.hasDefaultSlot = slot.assignedElements({ flatten: true }).length > 0;
        this.requestUpdate();
      };
      updateHasDefaultSlot();
      slot.addEventListener("slotchange", updateHasDefaultSlot);
    }
  }

  toggle() {
    this.expanded = !this.expanded;
    this.requestUpdate();

    // Dispatch event to parent accordion
    if (this.expanded) {
      this.dispatchEvent(new CustomEvent("item-expanded", { bubbles: true, detail: { item: this } }));
    }
  }

  private toggleSelection() {
    this.selected = !this.selected;
    this.requestUpdate();

    // Dispatch event to parent accordion
    if (this.selected) {
      this.dispatchEvent(new CustomEvent("item-selected", { bubbles: true, detail: { item: this } }));
    }
  }

  protected render() {
    let wholeTileTap: (() => void) | null = null;
    let leftTap: (() => void) | null = null;
    let rightTap: (() => void) | null = null;

    if (this.selectable && this.hasDefaultSlot) {
      // Split behavior: left for expansion, right for selection
      wholeTileTap = null;
      leftTap = () => this.toggle();
      rightTap = () => this.toggleSelection();
    } else if (this.selectable) {
      // Selectable without child: whole tile toggles selection
      wholeTileTap = () => this.toggleSelection();
      leftTap = null;
      rightTap = null;
    } else if (this.navigation) {
      // Navigation: whole tile triggers navigation
      wholeTileTap = () => {
        // handleNavigation logic here
      };
      leftTap = null;
      rightTap = null;
    } else {
      // Default expandable: whole tile toggles expansion
      wholeTileTap = () => this.toggle();
      leftTap = null;
      rightTap = null;
    }

    return html`<div>
      <div class="accordion-item-header" part="item-header">
        <div class="row" @click=${() => wholeTileTap && wholeTileTap()}>
          ${this.selectable && this.hasDefaultSlot
            ? html`<div class="chevron-wrapper" @click=${() => leftTap && leftTap()}><zeta-icon class="chevron">chevron_right</zeta-icon></div>`
            : nothing}
          <div @click=${() => rightTap && rightTap()} class="title-wrapper">
            <h4 class="title">${this.title}</h4>
            ${this.selectable && this.selected ? html`<zeta-icon class="check trailing">check_mark</zeta-icon>` : nothing}
            ${this.navigation ? html`<zeta-icon class="navigation trailing">chevron_right</zeta-icon>` : nothing}
            ${this.hasDefaultSlot && !this.navigation && !this.selectable ? html`<zeta-icon class="expand trailing">expand_more</zeta-icon>` : nothing}
          </div>
        </div>
        <div class="header-slot" part="header-content">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="body" part="item-content" .hidden=${!this.expanded}>
        <div class="body-content">
          <slot></slot>
        </div>
      </div>
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion-item": ZetaAccordionItem;
  }
}
