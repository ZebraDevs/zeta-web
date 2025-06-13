import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented.item.styles.js";
/**
 * An item within a segmented control.
 *
 * @slot - The content of the item.
 *
 * @fimga https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1046-20148&node-type=canvas&m=dev
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
