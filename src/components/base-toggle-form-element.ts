import { html, LitElement } from "lit";
import { Contourable, Interactive } from "../mixins/mixins.js";
import styles from "./base-toggle-form-element.styles.js";
import { FormField } from "../mixins/form-field.js";
import "./icon/icon";

/**
 * Base Class for Form Elements that toggle (i.e. Checkbox, Radio, Switch)
 *
 * @event {InputEvent} input - Fired when the value of the element changes.
 * @event {Event} change - Fired when the value of the element changes and is committed.
 *
 * @part icon - The icon of the element.
 */
export abstract class BaseToggleFormElement extends FormField(Interactive(Contourable(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  override handleChange(_event: Event): Event | void {
    return _event;
    // this.dispatchEvent(new ZetaInputChangeEvent().toEvent());
  }

  key(e: KeyboardEvent, type: "down" | "up") {
    if (type === "up") {
      if (e.key === " ") {
        // console.log("key", typeof e);
        this.input.click();
      }
    }
  }

  protected render() {
    return this.internals.role == "switch"
      ? super.render()
      : html`
          <label>
            <div
              class="container interactive-target"
              tabindex="${this.disabled ? " - 1" : this.tabIndex}"
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
