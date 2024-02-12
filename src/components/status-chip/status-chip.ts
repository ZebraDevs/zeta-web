import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./status-chip.scss?inline";
import { ContourableElement } from "../../mixins/contour.js";

/** Zeta Status Chip web component.
 *
 * @public */
@customElement("zeta-status-chip")
export class ZetaStatusChip extends ContourableElement {
  constructor() {
    super();
    this.text = "Input Custom";
  }

  /**
   * Text displayed in the chip
   */
  @property({ type: String }) text: string;

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

