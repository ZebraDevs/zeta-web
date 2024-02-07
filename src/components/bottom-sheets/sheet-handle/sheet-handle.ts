import { html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./sheet-handle.scss";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** Zeta Sheet Handle web component.
 *
 * @public */
@customElement("zeta-sheet-handle")
export class ZetaSheetHandle extends ContourableInteractiveElement {
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

