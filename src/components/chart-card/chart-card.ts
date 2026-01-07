import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./chart-card.styles.js";
import { Contourable } from "../../mixins/contour.js";

/** A flexible card component specifically designed for dashboard charts and visualizations.
 *
 * @slot title - The title of the chart card, displayed in the header.
 * @slot subtitle - The subtitle of the chart card, displayed below the title in the header.
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
  /** The minimum height of the card content area. */
  @property({ type: String }) minHeight?: string;

  /** Whether the card is in a loading state, showing a skeleton. */
  @property({ type: Boolean, reflect: true }) loading = false;

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

  /** Internal state to track if title slot has content */
  @state() private hasTitleSlot = false;

  /** Internal state to track if subtitle slot has content */
  @state() private hasSubtitleSlot = false;

  /** Internal state to track if footer slot has content */
  @state() private hasFooterSlot = false;

  protected override render() {
    if (this.loading) {
      return html`
        <div part="skeleton" class="card skeleton">
          <div class="skeleton-header"></div>
          <div class="skeleton-content"></div>
          <div class="skeleton-footer"></div>
        </div>
      `;
    }

    return html`
      <div
        class="card ${this.clickable ? "clickable" : ""}"
        style="${this.minHeight ? `--chart-card-min-height: ${this.minHeight}` : nothing}"
        role="${this.clickable ? "button" : "article"}"
        tabindex="${this.clickable ? "0" : nothing}"
        @click=${this.clickable ? this.handleClick : nothing}
        @keydown=${this.clickable ? this.handleKeyDown : nothing}
      >
        ${this.renderHeader()}
        ${this.renderContent()}
        ${this.renderFooter()}
      </div>
    `;
  }

  /**
   * Renders the card header with title and subtitle slots.
   * Returns nothing if neither title nor subtitle slots have content.
   */
  private renderHeader() {
    if (!this.hasTitleSlot && !this.hasSubtitleSlot) {
      return nothing;
    }

    return html`
      <div part="header" class="header">
        <div class="header-left">
          ${this.hasTitleSlot
            ? html`<div class="title"><slot name="title"></slot></div>`
            : nothing}
          ${this.hasSubtitleSlot
            ? html`<div class="subtitle"><slot name="subtitle"></slot></div>`
            : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Renders the card content area.
   * Displays error message if error property is set, otherwise renders slotted content.
   */
  private renderContent() {
    return html`
      <div part="content" class="content">
        ${this.error
          ? html`<div class="error"><span>${this.error}</span></div>`
          : html`<slot @slotchange=${this.handleContentSlotChange}></slot>`}
      </div>
    `;
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
   * Handles content slot changes.
   * Updates slot states to reflect current slot content.
   */
  private handleContentSlotChange = () => {
    this.updateSlotStates();
  };

  /**
   * Handles footer slot changes.
   * Updates hasFooterSlot state based on whether footer slot has content.
   */
  private handleFooterSlotChange = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasFooterSlot = assignedNodes.some(
      node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );
    this.updateSlotStates();
  };

  /**
   * Lifecycle hook called when element is connected to DOM.
   * Initializes slot state tracking and sets up slot change listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    this.updateSlotStates();

    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach(slot => {
      slot.addEventListener('slotchange', this.updateSlotStates);
    });
  }

  /**
   * Lifecycle hook called when element is disconnected from DOM.
   * Cleans up slot change listeners.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach(slot => {
      slot.removeEventListener('slotchange', this.updateSlotStates);
    });
  }

  /**
   * Updates internal state tracking for all slots.
   * Checks for presence of title, subtitle, and footer slots.
   */
  private updateSlotStates = () => {
    this.hasTitleSlot = !!this.querySelector('[slot="title"]');
    this.hasSubtitleSlot = !!this.querySelector('[slot="subtitle"]');
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
