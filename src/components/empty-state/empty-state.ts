import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./empty-state.styles.js";
import { Contourable } from "../../mixins/contour.js";

/** Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.
 *
 * @slot primaryAction - Primary Action Button. Should be a `zeta-button`.
 * @slot secondaryAction - Secondary Action Button. Should be a `zeta-button`.
 * @slot illustration - Illustration to be displayed in the empty state. Should be a `zeta-illustration`.
 * @slot title - Title of the empty state. Should be a `h4` element.
 * @slot description - Description of the empty state. Should be a `p` element.
 *
 * @cssproperty --empty-state-max-width - Max width of the empty state. Default is 375px.
 *
 * @part container - The container of the empty state.
 * @part content - The content of the empty state (title, description, actions).
 * @part actions - The container for the action buttons.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38470-1055
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-empty-state--docs
 */
@customElement("zeta-empty-state")
export class ZetaEmptyState extends Contourable(LitElement) {
  /** Title of the empty state.
   *
   * @deprecated - The title should be slotted in using the `title` slot. This property will be removed in a future release.
   */
  @property({ type: String }) title: string;

  /** Description of the empty state
   *
   * @deprecated - The description should be slotted in using the `description` slot. This property will be removed in a future release.
   */
  @property({ type: String }) description: string;

  protected override render() {
    return html`
      <div part="container">
        <slot name="illustration"></slot>
        <div part="content">
          <slot name="title"><h4 class="title">${this.title}</h4></slot>
          <slot name="description">
            <p class="description">${this.description}</p>
          </slot>
          <div part="actions">
            <slot name="secondaryAction"></slot>
            <slot name="primaryAction"></slot>
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
