import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented.item.styles.js";
/** A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * @slot - The content of the item.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1046-20148&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-segmented-control--docs
 */
@customElement("zeta-segmented-item")
export class ZetaSegmentedItem extends Contourable(LitElement) {
  /**
   * Whether the item is active.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`<div><slot></slot></div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-segmented-item": ZetaSegmentedItem;
  }
}
