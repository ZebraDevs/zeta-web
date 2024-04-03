import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-chip.scss?inline";
import { Contourable } from "../../../mixins/mixins.js";

@customElement("zeta-status-chip")
export class ZetaStatusChip extends Contourable(LitElement) {
  /** Text displayed in the chip.  */
  @property({ type: String }) text: string = "";

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<label for="" class="container">${this.text}</label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-status-chip": ZetaStatusChip;
  }
}
