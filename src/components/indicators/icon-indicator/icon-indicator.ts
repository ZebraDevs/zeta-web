import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../../mixins/condense.js";
import styles from "../indicators.scss";
import { Size } from "../../../types.js";

/** Zeta Icon Indicator web component.
 *
 * @public */
@customElement("zeta-icon-indicator")
export class ZetaIconIndicator extends ContourableCondensableElement {
  constructor() {
    super();
    /** Default size for indicators. */
    this.size = "medium";
    /** Whether indicators are in inverse mode. */
    this.inverse = false;
  }

  /** Indicators' sizes.*/
  @property({ type: String, reflect: true }) size: Size = "medium";

  /** Indicators' inverse.*/
  @property({ type: Boolean, reflect: true }) inverse: boolean = false;

  /** Indicators' icon.*/
  @property({ type: String }) icon = "star";

  static styles = [super.styles ?? [], styles];

  readonly sizes = {
    small: "0",
    medium: "12",
    large: "18"
  };

  protected override render() {
    return html`
      <div class="container icon">
        <zeta-icon size=${this.sizes[this.size]} color="#ffffff" class="icon" .rounded=${this.rounded}> ${this.icon}</zeta-icon>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-indicator": ZetaIconIndicator;
  }
}

