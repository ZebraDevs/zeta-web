import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./sheet-handle.scss";
import { ContourableElement } from "../../../mixins/contour.js";

/** Zeta Sheet Handle web component.
 *
 * @public */
@customElement("zeta-sheet-handle")
export class ZetaSheetHandle extends ContourableElement {
  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container" />`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-sheet-handle": ZetaSheetHandle;
  }
}

