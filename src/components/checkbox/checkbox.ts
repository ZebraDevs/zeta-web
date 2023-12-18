import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableInteractiveElement } from "../../mixins/interactive.js";
import { html } from "lit";
import styles from "./checkbox.scss";

@customElement("zeta-checkbox")
/**
 * Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off.
 */
export class ZetaCheckbox extends ContourableCondensableInteractiveElement {
  /**
   * Controls the state of the checkbox.
   *
   * Can be either true, false or intermediate.
   */
  @property({ type: Boolean, reflect: true }) checked: true | false | "intermediate" = false;

  private toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  protected render() {
    return html`<div class='container' @click=${(_e: Event) => this.toggleCheck()}>
      <input type="checkbox" ${this.checked ? "checked" : ""}></input>
      <div class='checkmark'>
        <zeta-icon size=20 rounded=${this.rounded} color=${!this.disabled ? "var(--on-surface-primary)" : "var(--icon-disabled)"}>${
          this.checked == "intermediate" ? "remove" : "check"
        }</zeta-icon>
      </div>
    </div>`;
  }

  static styles = [styles, ContourableCondensableInteractiveElement.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-checkbox": ZetaCheckbox;
  }
}
