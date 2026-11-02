import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./switch.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { BaseToggleFormElement } from "../base-toggle-form-element.js";
import "../icon/icon.js";
import type { ZetaInputType } from "../../mixins/form-field.js";

/**
 * Switches toggle the state of a single item ON or OFF.
 * To use with icon variant, provide both activeIcon and inactiveIcon.
 * The active icon sits at the left end of the track and the inactive icon at the right; the thumb covers whichever is behind it.
 *
 * @cssproperty --switch-track-color Color of the switch track
 * @cssproperty --switch-track-active-color Color of the switch track when switch is ON
 * @cssproperty --switch-track-disabled-color Color of the switch track when switch is disabled
 * @cssproperty --switch-icon-color Color of the activeIcon & inactiveIcon
 * @cssproperty --switch-icon-disabled-color Color of the activeIcon & inactiveIcon when disabled
 * @cssproperty --switch-thumb-color Color of the switch thumb
 * @cssproperty --switch-thumb-disabled-color Color of the switch thumb when disabled
 * @cssproperty --switch-height Height of the switch. Defaults to the thumb size plus 4px padding on each side (32px)
 * @cssproperty --switch-width Width of the switch. Defaults to twice the height (64px)
 * @cssproperty --switch-thumb-size Height & Width of the switch thumb. Defaults to `--control-xs` (24px)
 * @cssproperty --switch-icon-size Height & Width of the activeIcon & inactiveIcon. Defaults to `--control-icon-md` (20px)
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

  override type: Extract<ZetaInputType, "checkbox"> = "checkbox";

  //TODO aria-checked -> on=true, off|mixed=false?
  //TODO aria-readonly

  /** Icon name to display when switch is ON. */
  @property({ type: String }) activeIcon?: ZetaIconName;

  /** Icon name to display when switch is OFF. */
  @property({ type: String }) inactiveIcon?: ZetaIconName;

  @query('[part="thumb"]') private readonly thumb?: HTMLElement;

  override handleChange(event: Event) {
    super.handleChange(event);
    event.stopPropagation();
    this.internals.ariaChecked = this.input.checked ? "true" : "false";
    // Thumb stretches to 1.3x width and settles while it slides; skipped with reduced motion (state change stays instant)
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.thumb?.animate([{ scale: "1 1" }, { scale: "1.3 1" }, { scale: "1 1" }], {
        duration: 250,
        easing: "cubic-bezier(0.34, 1.36, 0.64, 1)"
      });
    }
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
        ${
          this.activeIcon &&
          html`
            <zeta-icon part="icon active" .rounded=${this.rounded}> ${this.activeIcon} </zeta-icon>
          `
        }
        ${
          this.inactiveIcon &&
          html`
            <zeta-icon part="icon inactive" .rounded=${this.rounded}>
              ${this.inactiveIcon}
            </zeta-icon>
          `
        }
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
