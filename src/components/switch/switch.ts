import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./switch.scss?inline";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { Contourable, Interactive } from "../../index.js";

/**
 * Switches toggle the state of a single item ON or OFF.
 * To use with icon variant, provide both activeIcon and inactiveIcon
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1153-26923
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/switch--docs
 */
@customElement("zeta-switch")
export class ZetaSwitch extends Contourable(Interactive(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = { delegatesFocus: true, mode: "open" };
  /** State of the switch. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  /** Icon name to display when switch is ON. */
  @property({ type: String }) activeIcon?: ZetaIconName;

  /** Icon name to display when switch is OFF. */
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
          <rect class="track" width="64" height="32" rx="16" />
          <circle class="thumb" cx="16" cy="16" r="12" />
        </svg>

        ${this.activeIcon &&
        this.inactiveIcon &&
        html`
          <zeta-icon
            color="${this.disabled ? "var(--icon-disabled)" : "var(--icon-inverse)"}"
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
