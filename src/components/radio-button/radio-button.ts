import { customElement } from "lit/decorators.js";
import { type InputType } from "../../mixins/form-field.js";

import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import styles from "./radio-button.styles.js";
import { RadioButtonController } from "./radio-button-controller.js";

/** Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
 *
 * @event {Event} change - Fired when the radio button becomes checked (but not when unchecked)
 * @event {InputEvent} input - Fired when the radio button value changes
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21510-54345
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-radio-button--docs
 */
@customElement("zeta-radio-button")
export class ZetaRadioButton extends BaseToggleFormElement {
  private readonly radioButtonController = new RadioButtonController(this);
  constructor() {
    super();
    this.internals.role = "radio";
    this.addController(this.radioButtonController);
  }
  override type: InputType = "radio";
  override handleChange(event: Event): void {
    if (this.checked) super.handleChange(event); //Fires change Event only if checked.
    this.radioButtonController.handleChange();
  }
  static styles = [styles, super.styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-radio-button": ZetaRadioButton;
  }
}
