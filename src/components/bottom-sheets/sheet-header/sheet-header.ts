import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "./sheet-header.scss";
import { Alignment } from "../../../types.js";
import { ContourableElement } from "../../../mixins/contour.js";

/** Zeta Sheet Header web component.
 *
 * @public */
@customElement("zeta-sheet-header")
export class ZetaSheetHeader extends ContourableElement {
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

