import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./sheet-handle.styles.js";

/** A handle for a zeta-bottom-sheet
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21541-2258
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/bottom-sheet--docs
 */
@customElement("zeta-sheet-handle")
export class ZetaSheetHandle extends LitElement {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container"></div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-sheet-handle": ZetaSheetHandle;
  }
}
