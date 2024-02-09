import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./switch.scss";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableInteractiveElement } from "../../mixins/interactive.js";

/**
 * Switches toggle the state of a single item ON or OFF.
 * To use with icon variant, provide both activeIcon and inactiveIcon
 */
@customElement("zeta-switch")
export class ZetaSwitch extends ContourableInteractiveElement {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };
  /**
   * State of the switch
   */
  @property({ type: Boolean, reflect: true }) active: boolean = false;
  /**
   * Is the switch disabled
   */
  @property({ type: Boolean }) disabled: boolean = false;
  /**
   * Icon name to display when switch is ON
   */
  @property({ type: String }) activeIcon?: ZetaIconName;
  /**
   * Icon name to display when switch is OFF
   */
  @property({ type: String }) inactiveIcon?: ZetaIconName;

  @query("button")
  private readonly buttonElement!: HTMLElement | null;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  static styles = [super.styles || [], styles];

  protected render() {
    return html`
      <button ?disabled=${this.disabled} class="container">
        <svg class="indicator" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" fill="none">
          <rect width="64" height="32" rx="16" />
          <circle cx="16" cy="16" r="12" />
        </svg>

        ${this.activeIcon &&
        this.inactiveIcon &&
        html`
          <zeta-icon
            color="${this.disabled ? "var(--interactive-disabled-icon)" : "var(--interactive-primary-on)"}"
            name=${this.active ? this.activeIcon : this.inactiveIcon}
            .rounded=${this.rounded}
          ></zeta-icon>
        `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-switch": ZetaSwitch;
  }
}

