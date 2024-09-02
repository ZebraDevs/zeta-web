import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour";
import { customElement, property } from "lit/decorators.js";
import styles from "./segmented.item.styles.js";
/**
 * An item within a segmented control.
 *
 * @slot - The content of the item.
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
