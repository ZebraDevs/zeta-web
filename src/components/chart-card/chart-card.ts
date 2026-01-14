import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./chart-card.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../../icon/icon.js";

/** A flexible card component specifically designed for dashboard charts and visualizations.
 *
 * @slot header - The header content of the chart card. If not provided, title and subtitle props will be used.
 * @slot - The main content of the card, typically containing chart visualizations.
 * @slot footer - Footer content, typically containing action buttons or additional information.
 *
 * @cssproperty --chart-card-border-color - The color of the card border
 * @cssproperty --chart-card-border-width - The width of the card border
 * @cssproperty --chart-card-background - The background color of the card
 * @cssproperty --chart-card-min-height - The minimum height of the card content area
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chart-card--docs
 */
@customElement("zeta-chart-card")
export class ZetaChartCard extends Contourable(LitElement) {
  /** The title of the chart card, displayed in the header when no header slot is provided. */
  @property({ type: String }) title: string = "";

  /** The subtitle of the chart card, displayed below the title in the header when no header slot is provided. */
  @property({ type: String }) subtitle: string = "";

  /** Error message to display in the content area.
   *
   * When provided, the error message will be displayed instead of the slotted content.
   */
  @property({ type: String }) error?: string;

  /** Whether the card is clickable.
   *
   * When true, the card will have hover effects and can be clicked.
   * Use the `click` event to handle clicks.
   */
  @property({ type: Boolean, reflect: true }) clickable = false;

  @state() private hasHeaderSlot = false;
  @state() private hasFooterSlot = false;

  protected override render() {
    return html`
      <div
        class="card"
        role="${this.clickable ? "button" : "article"}"
        tabindex="${this.clickable ? "0" : nothing}"
        @click=${this.clickable ? this.handleClick : nothing}
        @keydown=${this.clickable ? this.handleKeyDown : nothing}
      >
        ${this.renderHeader()}${this.renderContent()}${this.renderFooter()}
      </div>
    `;
  }

  private renderHeader() {
    if (this.hasHeaderSlot) {
      return html`
        <div part="header" class="header">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
      `;
    }

    if (!this.title && !this.subtitle) {
      return nothing;
    }

    return html`
      <div part="header" class="header">
        <div class="header-left">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing} ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
        </div>
      </div>
    `;
  }

  private renderContent() {
    return html`
      <div part="content" class="content">
        ${this.error
          ? html`<div class="error">
              <zeta-icon .rounded=${this.rounded}>warning</zeta-icon>
              <span>${this.error}</span>
            </div>`
          : html`<slot></slot>`}
      </div>
    `;
  }

  private renderFooter() {
    if (!this.hasFooterSlot) {
      return nothing;
    }

    return html`
      <div part="footer" class="footer">
        <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
      </div>
    `;
  }

  private handleClick = (e: Event): void => {
    if (!this.clickable) return;

    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("click", {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: { originalEvent: e }
      })
    );
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.clickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleClick(e);
    }
  };

  private handleHeaderSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasHeaderSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
    this.updateSlotStates();
  };

  private handleFooterSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasFooterSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
    this.updateSlotStates();
  };

  connectedCallback() {
    super.connectedCallback?.();
    this.updateSlotStates();

    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach(slot => {
      slot.addEventListener("slotchange", this.updateSlotStates);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach(slot => {
      slot.removeEventListener("slotchange", this.updateSlotStates);
    });
  }

  private updateSlotStates = () => {
    this.hasHeaderSlot = !!this.querySelector('[slot="header"]');
    this.hasFooterSlot = !!this.querySelector('[slot="footer"]');
    this.requestUpdate();
  };

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-chart-card": ZetaChartCard;
  }
}
