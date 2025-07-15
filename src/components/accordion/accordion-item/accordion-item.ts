import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import styles from "./accordion-item.styles.js";
import "../../icon/icon";

//   /// Callback triggered when the accordion item is tapped.
//   final VoidCallback? onTap;

/**
 * The accordion is a control element comprising a vertically stacked list of items, such as labels or thumbnails. Each item can be "expanded" or "collapsed" to reveal the content associated with that item. There can be zero expanded items, exactly one, or more than one item expanded at a time, depending on the configuration.
 *
 * @slot - content displayed when the accordion item is expanded.
 * @slot header - content displayed in the header of the accordion item.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=3427-67874
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */
@customElement("zeta-accordion-item")
export class ZetaAccordionItem extends Contourable(Interactive(LitElement)) {
  /**  Title of the accordion item. */
  @property({ type: String, reflect: true }) title: string;

  /** Whether the accordion item is initially open. */
  @property({ type: Boolean, reflect: true }) isExpanded = false;

  /** Whether the accordion item is initially selected. */
  @property({ type: Boolean, reflect: true }) isSelected = false;

  /** Whether the item is selectable */
  @property({ type: Boolean, reflect: true }) isSelectable = false;

  /** Whether the accordion item is a navigation item. */
  @property({ type: Boolean, reflect: true }) isNavigation = false;

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
    this.isExpanded = !this.isExpanded;
    this.requestUpdate();
  }

  protected render() {
    let wholeTileTap: (() => void) | null = null;
    let leftTap: (() => void) | null = null;
    let rightTap: (() => void) | null = null;

    if (this.isSelectable && this.hasDefaultSlot) {
      // Split behavior: left for expansion, right for selection
      wholeTileTap = null;
      leftTap = () => this.toggle();
      rightTap = () => {
        this.isSelected = !this.isSelected;
        this.requestUpdate();
      };
    } else if (this.isSelectable) {
      // Selectable without child: whole tile toggles selection
      wholeTileTap = () => {
        this.isSelected = !this.isSelected;
        this.requestUpdate();
      };
      leftTap = null;
      rightTap = null;
    } else if (this.isNavigation) {
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
      <div class="accordion-item-header interactive-target" @click=${() => wholeTileTap && wholeTileTap()}>
        <div class="row">
          ${this.isSelectable && this.hasDefaultSlot
            ? html`<div class="chevron-wrapper"><zeta-icon class="chevron" @click=${() => leftTap && leftTap()}>chevron_right</zeta-icon></div>`
            : nothing}
          <div @click=${() => rightTap && rightTap()} class="title-wrapper">
            <h4 class="title">${this.title}</h4>
            ${this.isSelectable && this.isSelected ? html`<zeta-icon class="check">check_mark</zeta-icon>` : nothing}
            ${this.isNavigation ? html`<zeta-icon class="navigation">chevron_right</zeta-icon>` : nothing}
          </div>
        </div>

        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot></slot>
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
