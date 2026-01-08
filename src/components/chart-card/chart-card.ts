import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./chart-card.styles.js";
import { Contourable } from "../../mixins/contour.js";

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
  private _title: string = "";
  /** The title of the chart card, displayed in the header when no header slot is provided. */
  @property({ type: String })
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value ?? "";
  }

  private _subtitle: string = "";
  /** The subtitle of the chart card, displayed below the title in the header when no header slot is provided. */
  @property({ type: String })
  get subtitle(): string {
    return this._subtitle;
  }
  set subtitle(value: string) {
    this._subtitle = value ?? "";
  }

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

  /** Internal state to track if header slot has content */
  @state() private hasHeaderSlot = false;

  /** Internal state to track if footer slot has content */
  @state() private hasFooterSlot = false;

  protected override render() {
    return html`
      <div
        class="card ${this.clickable ? "clickable" : ""}"
        role="${this.clickable ? "button" : "article"}"
        tabindex="${this.clickable ? "0" : nothing}"
        @click=${this.clickable ? this.handleClick : nothing}
        @keydown=${this.clickable ? this.handleKeyDown : nothing}
      >
        ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()}
      </div>
    `;
  }

  /**
   * Renders the card header.
   * Uses header slot if provided, otherwise uses title and subtitle props.
   */
  private renderHeader() {
    if (this.hasHeaderSlot) {
      return html`
        <div part="header" class="header">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
      `;
    }

    if (!this._title && !this._subtitle) {
      return nothing;
    }

    return html`
      <div part="header" class="header">
        <div class="header-left">
          ${this._title ? html`<div class="title">${this._title}</div>` : nothing}
          ${this._subtitle ? html`<div class="subtitle">${this._subtitle}</div>` : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Renders the card content area.
   * Displays error message if error property is set, otherwise renders slotted content.
   */
  private renderContent() {
    return html` <div part="content" class="content">${this.error ? html`<div class="error"><span>${this.error}</span></div>` : html`<slot></slot>`}</div> `;
  }

  /**
   * Renders the card footer with footer slot.
   * Returns nothing if footer slot has no content.
   */
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

  /**
   * Handles click events when card is clickable.
   * Dispatches a custom click event with the original event in detail.
   */
  private handleClick(e: Event) {
    if (!this.clickable) return;
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("click", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      })
    );
  }

  /**
   * Handles keyboard events for accessibility.
   * Triggers click on Enter or Space key when card is clickable.
   */
  private handleKeyDown(e: KeyboardEvent) {
    if (!this.clickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  /**
   * Handles header slot changes.
   * Updates hasHeaderSlot state based on whether header slot has content.
   */
  private handleHeaderSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasHeaderSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
    this.updateSlotStates();
  };

  /**
   * Handles footer slot changes.
   * Updates hasFooterSlot state based on whether footer slot has content.
   */
  private handleFooterSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasFooterSlot = assignedNodes.some(node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()));
    this.updateSlotStates();
  };

  /**
   * Lifecycle hook called when element is connected to DOM.
   * Initializes slot state tracking and sets up slot change listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    this.updateSlotStates();

    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach(slot => {
      slot.addEventListener("slotchange", this.updateSlotStates);
    });
  }

  /**
   * Lifecycle hook called when element is disconnected from DOM.
   * Cleans up slot change listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    const slots = this.shadowRoot?.querySelectorAll("slot");
    slots?.forEach(slot => {
      slot.removeEventListener("slotchange", this.updateSlotStates);
    });
  }

  /**
   * Updates internal state tracking for all slots.
   * Checks for presence of header and footer slots.
   */
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
