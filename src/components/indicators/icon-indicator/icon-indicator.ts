import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "../indicators.scss?inline";
import { Size } from "../../../types.js";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableElement } from "../../../mixins/contour.js";

/** Zeta Icon Indicator web component.
 *
 * @public */
@customElement("zeta-icon-indicator")
export class ZetaIconIndicator extends ContourableElement {
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
  @property({ type: String }) icon: ZetaIconName = "star";

  static styles = [super.styles ?? [], styles];

  readonly sizes = {
    small: 0,
    medium: 8,
    large: 12
  };

  protected override render() {
    return html`
      <div class="container indicator-icon">
        <zeta-icon size=${this.sizes[this.size]} color="var(--on-surface-primary)" .rounded=${this.rounded}> ${this.icon}</zeta-icon>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-indicator": ZetaIconIndicator;
  }
}

