import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./sheet-header.scss?inline";
import { Alignment } from "../../../types.js";
import { Contourable } from "../../../mixins/contour.js";

/** Zeta Sheet Header web component. */
@customElement("zeta-sheet-header")
export class ZetaSheetHeader extends Contourable(LitElement) {
  /** Sheet Header alignment.*/
  @property({ type: String, reflect: true }) alignment: Alignment = "start";

  /** Sheet Header text content.*/
  @property({ type: String, reflect: true }) text: string = "Title";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container">${this.text}</div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-sheet-header": ZetaSheetHeader;
  }
}

