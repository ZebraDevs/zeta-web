import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sheet-header.scss?inline";

@customElement("zeta-sheet-header")
export class ZetaSheetHeader extends LitElement {
  /** Sheet Header alignment.*/
  @property({ type: String, reflect: true }) alignment: "start" | "center" = "start";

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
