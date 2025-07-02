import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./empty-state.styles.js";
import { Contourable } from "../../mixins/contour.js";

/** Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared
 *
 * @slot primaryAction - Primary Action Button. Should be of type {ZetaButton}.
 * @slot secondaryAction - Secondary Action Button. Should be of type {ZetaButton}.
 * @slot illustration - Illustration to be displayed in the empty state. Should be of type {ZetaIllustration}.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38470-1055
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-empty-state--docs
 */
@customElement("zeta-empty-state")
export class ZetaEmptyState extends Contourable(LitElement) {
  /** Title of the empty state */
  @property({ type: String }) title: string;

  /** Description of the empty state */
  @property({ type: String }) description: string;

  protected override render() {
    return html`
      <div class="container">
        <div class="illustration">
          <slot name="illustration"></slot>
        </div>
        <div class="content">
          <h4 class="title">${this.title}</h4>
          <p class="description">${this.description}</p>
          <div class="actions">
            <slot name="primaryAction"></slot>
            <slot name="secondaryAction"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-empty-state": ZetaEmptyState;
  }
}
