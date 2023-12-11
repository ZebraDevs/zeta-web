import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../../mixins/condense.js";
import styles from "./sheet-handle.scss";

/** Zeta Sheet Handle web component.
 *
 * @public */
@customElement("zeta-sheet-handle")
export class ZetaSheetHandle extends ContourableCondensableElement {
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

