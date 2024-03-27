import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./sheet-handle.scss?inline";
import { Contourable } from "../../../mixins/contour.js";

/** Zeta Sheet Handle web component. */
@customElement("zeta-sheet-handle")
export class ZetaSheetHandle extends Contourable(LitElement) {
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

