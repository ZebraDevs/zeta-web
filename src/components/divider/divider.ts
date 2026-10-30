import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./divider.styles.js";

type DividerOrientation = "horizontal" | "vertical";

/**
 * A thin line used to visually separate content.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8803
 */
@customElement("zeta-divider")
export class ZetaDivider extends LitElement {
  /** The direction of the divider line. Valid values are `horizontal` and `vertical`. */
  @property({ type: String, reflect: true }) orientation: DividerOrientation = "horizontal";

  static styles = [styles];

  connectedCallback(): void {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.role = "separator";
  }

  protected willUpdate(): void {
    this.ariaOrientation = this.orientation === "vertical" ? "vertical" : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-divider": ZetaDivider;
  }
}
