import { html, LitElement } from "lit";
import { Contourable, Interactive } from "../mixins/mixins.js";
import styles from "./base-toggle-form-element.styles.js";
import { FormField } from "../mixins/form-field.js";
import "./icon/icon";

export abstract class BaseToggleFormElement extends FormField(Interactive(Contourable(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  override handleChange(event: Event): void {
    this.dispatchEvent(new Event(event.type, event));
  }

  override focus() {
    this.input.focus();
  }

  override blur() {
    this.input.blur();
  }

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "up") {
      if (e.key === " ") {
        this.input.click();
      }
    }
  }

  protected render() {
    return html`
      <label>
        <div
          class="container interactive-target"
          tabindex="${this.disabled ? "-1" : this.tabIndex}"
          @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
          @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
        >
          ${this.type === "checkbox"
            ? html`<zeta-icon part="icon" ?rounded=${this.rounded}> ${this.indeterminate ? "remove" : "check_mark"} </zeta-icon>`
            : html`<div part="icon"></div>`}
        </div>
        <slot></slot>
        ${super.render()}
      </label>
    `;
  }

  static styles = [styles, super.styles || []];
}
