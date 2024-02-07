import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

import styles from "../indicators.scss";
import { Size } from "../../../types.js";
import { ContourableInteractiveElement } from "../../../mixins/interactive.js";

/** Zeta Notification Indicator web component.
 *
 * @public */
@customElement("zeta-notification-indicator")
export class ZetaNotificationIndicator extends ContourableInteractiveElement {
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

  static styles = [super.styles ?? [], styles];

  protected override render() {
    return html`<div class="container notification">
      <span class="count"><slot></slot></span>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-notification-indicator": ZetaNotificationIndicator;
  }
}

