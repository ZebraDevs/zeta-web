import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../../mixins/condense.js";
import styles from "../indicators.scss";

/** Zeta Notification Indicator web component.
 *
 * @public */
@customElement("zeta-notification-indicator")
export class ZetaNotificationIndicator extends ContourableCondensableElement {
  constructor() {
    super();
    /** Default size for indicators. */
    this.size = "medium";
    /** Whether indicators are in inverse mode. */
    this.inverse = false;
  }

  /** Indicators' sizes.*/
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large";

  /** Indicators' inverse.*/
  @property({ type: Boolean, reflect: true }) inverse: boolean = false;

  /** Indicators' count.*/
  @property({ type: Number, reflect: true }) count: string | number | undefined = 5;

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container notification"><span class="count" ${this.condensed ? "condensed" : "standard"}>${this.count}</span></div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-notification-indicator": ZetaNotificationIndicator;
  }
}

