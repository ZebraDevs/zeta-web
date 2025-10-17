import { customElement, property } from "lit/decorators.js";
import { type InputType } from "../../mixins/form-field.js";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./checkbox.styles.js";
import "../icon/icon.js";
import { LitElement } from "lit";

export type CheckboxType = Extract<InputType, "checkbox">;

// TODO: When should change event fire? Does not seem to fire at all? Unless it needs to be in a form?

/**
 * Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off.
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @cssproperty --checkbox-background - Background colour of the checkbox in its default/unchecked state
 * @cssproperty --checkbox-checked-background - Background colour when the checkbox is checked or indeterminate
 * @cssproperty --checkbox-hover-background - Background colour when hovering over a checked/indeterminate checkbox
 * @cssproperty --checkbox-border-color - Border colour of the checkbox container
 * @cssproperty --checkbox-icon-color - Colour of the checkmark or indeterminate icon inside the checkbox
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21510-54003
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-checkbox--docs
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

  override type: CheckboxType = "checkbox";

  override value = "on";

  /**
   * Whether the order of the checkbox and its label should be reversed.
   */
  @property({ type: Boolean, reflect: true }) reverse: boolean = false;

  static styles = [super.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-checkbox": ZetaCheckbox;
  }
}
