import { LitElement, html } from "lit";
import styles from "./button-group.styles.js";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";

export * from "./button-group-item/button-group-item.js";

/**
 * Takes in Zeta Button Group Items as children and groups them by applying styling to them.
 *
 * Does not render any other types of children.
 *
 * @slot - Children must be of type `zeta-group-button` otherwise they will not be displayed.
 */
@customElement("zeta-button-group")
export class ZetaButtonGroup extends Contourable(LitElement) {
  /** Size of button. */
  @property({ type: String, reflect: true }) size: "medium" | "large" = "medium";

  protected override render() {
    return html`
      <div ?rounded=${this.rounded} size=${this.size} class="group">
        <slot></slot>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group": ZetaButtonGroup;
  }
}
