import { html, LitElement } from "lit";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import styles from "./base-chip.styles.js";

export class BaseChip extends Interactive(Contourable(LitElement)) {
  static override styles = [styles, super.styles || []];

  protected override render() {
    return html`<div class="container"><slot></slot></div>`;
  }
}
