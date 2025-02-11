import { customElement } from "lit/decorators.js";
import { type InputType } from "../../mixins/form-field.js";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./checkbox.styles.js";
import "../icon/icon.js";
import { LitElement } from "lit";

/**
 * Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off.
 *
 * @event {Event} change - Fired when the checkbox value changes 
 * @event {InputEvent} input - Fired when the checkbox value changes
 * 
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21510-54003
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/checkbox--docs
 */
@customElement("zeta-checkbox")
export class ZetaCheckbox extends BaseToggleFormElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  constructor() {
    super();
    this.internals.role = "checkbox";
  }

  override type = "checkbox" as InputType;
  override value = "on";

  static styles = [styles, super.styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-checkbox": ZetaCheckbox;
  }
}
