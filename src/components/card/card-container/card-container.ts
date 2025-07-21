import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./card-container.styles.js";
import { Contourable } from "../../../mixins/contour.js";
import "../../icon/icon.js";

/** A card component with a header and optional content that can be collapsible.
 *
 * @slot - The main content of the card. If `collapsible` is true, this content will be hidden when the card is collapsed.
 *
 * @figma - https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&m=dev
 * @storybook - https://design.zebra.com/web/storybook/index.html/?path=/story/components-cards--container
 */
@customElement("zeta-card-container")
export class ZetaCardContainer extends Contourable(LitElement) {
  /** The title of the card, displayed in the header. */
  @property({ type: String }) title: string;

  /** Description of the card, displayed in the header. */
  @property({ type: String }) description: string;

  /** Whether the card is collapsible.
   *
   * Slotted content *must* be provided for the collapsible functionality to work. */
  @property({ type: Boolean, reflect: true }) collapsible = false;

  /** Whether the card is expanded or collapsed.
   *
   * If `collapsible` is true, this property controls the initial state of the card. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Whether the card is required, indicated by a red asterisk (*) in the header.*/
  @property({ type: Boolean }) required = false;

  /** Whether the card is an AI card, which may have different styling or behavior.
   *
   * This is primarily used for AI-related components. */
  @property({ type: Boolean, reflect: true }) ai = false;

  /** Internal state to track if slot has content */
  @state() private hasSlotContent = false;

  protected override render() {
    return html`
      <div class="border">
        <div class="card ${this.hasSlotContent ? "slot-populated" : ""}">
          <div class="card-header" @click=${this.collapsible ? () => (this.expanded = !this.expanded) : null}>
            ${this.collapsible ? html`<zeta-icon name="expand_more"></zeta-icon>` : nothing}
            <div class="header-content">
              <div class="title-container">
                <h4 class="card-title">${this.title}</h4>
                ${this.required ? html`<span class="required">&nbsp;*</span>` : nothing}
              </div>
              <h5 class="card-description">${this.description}</h5>
            </div>
          </div>
          <div class="card-content">
            <div class="card-content-wrapper">
              <slot
                @slotchange=${(e: Event) => {
                  const slot = e.target as HTMLSlotElement;
                  const assignedNodes = slot.assignedNodes({ flatten: true });
                  this.hasSlotContent = assignedNodes.some(
                    node => node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
                  );
                }}
              ></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-container": ZetaCardContainer;
  }
}
