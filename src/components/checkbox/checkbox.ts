import { customElement, property } from "lit/decorators.js";
import { Contourable, Interactive } from "../../index.js";
import { html, LitElement } from "lit";
import styles from "./checkbox.scss?inline";

/** Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. */
@customElement("zeta-checkbox")
export class ZetaCheckbox extends Contourable(Interactive(LitElement)) {
  /**
   * Controls the state of the checkbox.
   *
   * Can be either true, false or intermediate.
   */
  @property({ type: Boolean, reflect: true }) checked: true | false | "intermediate" = false;

  /** The name of the checkbox when used in a form. */
  @property({ type: String }) name?: string;

  /** The label displayed next to the check. */
  @property({ type: String }) label?: string;

  /** The ID given to the checkbox input. */
  @property({ type: String }) id: string = "checkbox";

  private toggleCheck() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  private getLabel() {
    if (this.label) {
      return html`<label for=${this.id}>${this.label}</label>`;
    } else {
      return undefined;
    }
  }

  protected render() {
    return html`<div class="checkbox">
      <div class='container contourable-target interactive-target' @click=${(_e: Event) => this.toggleCheck()}>
        <input type="checkbox" id=${this.id} ${this.checked ? "checked" : ""} aria-label=${this.label ?? "checkbox"} name=${this.name}></input>
        <div class='checkmark'>
          <zeta-icon size=20 rounded=${this.rounded} color=${!this.disabled ? "var(--icon-disabled)" : "var(--icon-disabled)"}>${
            this.checked == "intermediate" ? "remove" : "check_mark"
          }</zeta-icon>
        </div>
      </div>
      ${this.getLabel()}
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-checkbox": ZetaCheckbox;
  }
}
