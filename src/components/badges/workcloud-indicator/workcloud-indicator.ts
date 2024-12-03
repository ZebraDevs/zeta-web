import { customElement, property } from "lit/decorators.js";
import type { LitElement } from "lit";
import { html } from "lit";
import { type Constructor } from "../../../mixins/mixins.js";
import styles from "./workcloud-indicator.styles.js";
import { ZetaPriorityPill } from "../priority-pill/priority-pill.js";

const OverwriteStyles = <T extends Constructor<LitElement>>(superClass: T) => {
  class OverwriteStylesClass extends superClass {
    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return OverwriteStylesClass as Constructor<LitElement> & T;
};

const ZetaWorkcloudIndicatorBase = OverwriteStyles(ZetaPriorityPill);

@customElement("zeta-workcloud-indicator")
export class ZetaWorkcloudIndicator extends ZetaWorkcloudIndicatorBase {
  /**
   * Size variant
   */
  @property({ type: String, reflect: true }) size: "medium" | "small" | "xs" = "medium";
  /**
   * Priority level
   */
  @property({ type: String, reflect: true }) priority: "urgent" | "high" | "medium" | "low" = "low";
  /**
   * Number of indications
   */
  @property({ type: Number }) number: number = 0;

  protected render() {
    // In case there are more than 2 symbols, otherwise value overflows
    const formattedNumber = this.number > 99 ? "99+" : this.number;
    return html`
      <div class="container">
        <span aria-label="number" role="note" class="number">${this.priority === "urgent" ? "U" : formattedNumber}</span>
        <span aria-label=${this.priority} role="status" class="text">${this.priority}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-workcloud-indicator": ZetaWorkcloudIndicator;
  }
}
