import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import styles from "./radio-button.scss?inline";
import { Interactive } from "../../index.js";

/** Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. */
@customElement("zeta-radio-button")
export class ZetaRadioButton extends Interactive(LitElement) {
  /** Controls the state of the radio button. */
  @property({ type: Boolean, reflect: true }) checked: boolean = false;

  /** The name of the radio button when used in a form. */
  @property({ type: String }) name?: string;

  /** The ID given to the radio input. */
  @property({ type: String }) id: string = "radio";

  /** The label displayed next to the check. */
  @property({ type: String }) label?: string;

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
    return html`<div class="radio">
      <div class='container interactive-target' @click=${(_e: Event) => this.toggleCheck()}>
        <input type="radio" id=${this.id} ${this.checked ? "checked" : ""} name=${this.name} aria-label=${this.label ?? "checkbox"}></input>
        <div class='checkmark'>
        </div>
      </div>
      ${this.getLabel()} 
    </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-radio-button": ZetaRadioButton;
  }
}
