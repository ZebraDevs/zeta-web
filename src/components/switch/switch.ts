import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./switch.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import "../icon/icon.js";
import type { CheckboxType } from "../checkbox/checkbox.js";

//TODO we dont have focus styles for switch
//TODO Having icons smaller than the thumb is difficult to position
/**
 * Switches toggle the state of a single item ON or OFF.
 * To use with icon variant, provide both activeIcon and inactiveIcon
 *
 * @cssproperty --switch-track-color Color of the switch track
 * @cssproperty --switch-track-active-color Color of the switch track when switch is ON
 * @cssproperty --switch-track-disabled-color Color of the switch track when switch is disabled
 * @cssproperty --switch-icon-color Color of the activeIcon & inactiveIcon
 * @cssproperty --switch-icon-disabled-color Color of the activeIcon & inactiveIcon when disabled
 * @cssproperty --switch-thumb-color Color of the switch thumb
 * @cssproperty --switch-thumb-disabled-color Color of the switch thumb when disabled
 * @cssproperty --switch-height Height of the switch
 * @cssproperty --switch-width Width of the switch
 * @cssproperty --switch-thumb-size Height & Width of the switch thumb
 * @cssproperty --switch-icon-size Height & Width of the activeIcon & inactiveIcon
 *
 * @part track - The switch track
 * @part thumb - The switch thumb
 * @part icon active - The active icon
 * @part icon inactive - The inactive icon
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1153-26923
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-switch--docs
 */
@customElement("zeta-switch")
export class ZetaSwitch extends BaseToggleFormElement {
  constructor() {
    super();
    this.internals.role = "switch";
  }
  override type: CheckboxType = "checkbox";

  //TODO aria-checked -> on=true, off|mixed=false?
  //TODO aria-readonly

  /** Icon name to display when switch is ON. */
  @property({ type: String }) activeIcon?: ZetaIconName;

  /** Icon name to display when switch is OFF. */
  @property({ type: String }) inactiveIcon?: ZetaIconName;

  override handleChange(event: Event) {
    super.handleChange(event);
    event.stopPropagation();
    this.internals.ariaChecked = this.input.checked ? "true" : "false";
  }

  static styles = [super.styles || [], styles];

  protected render() {
    return html`
      <div
        part="track"
        @click=${(_e: Event) => {
          _e.stopPropagation(); //TODO BK: is this the click problem?
          this.input.click();
        }}
        @keydown=${(e: KeyboardEvent) => this.key(e, "down")}
        @keyup=${(e: KeyboardEvent) => this.key(e, "up")}
        tabindex="${this.disabled ? "-1" : this.tabIndex}"
      >
        <div part="thumb"></div>
        ${this.activeIcon &&
        html`
          <zeta-icon part="icon active" size=${"var(--switch-icon-size, var(--_switch-thumb-size))"} .rounded=${this.rounded}> ${this.activeIcon} </zeta-icon>
        `}
        ${this.inactiveIcon &&
        html`
          <zeta-icon part="icon inactive" size=${"var(--switch-icon-size, var(--_switch-thumb-size))"} .rounded=${this.rounded}>
            ${this.inactiveIcon}
          </zeta-icon>
        `}
      </div>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-switch": ZetaSwitch;
  }
}
