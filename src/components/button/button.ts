import { html } from "lit";
import { query } from "lit/decorators.js";
import { customElement, property } from "lit/decorators.js";
import type { ButtonFlavor } from "../../types.js";
import styles from "./button.scss"; //TODO: Vite CLI not happy about this
import { ContourableCondensableInteractiveElement } from "../../mixins/interactive.js";

//TODO text overflow broken

export class ButtonBase extends ContourableCondensableInteractiveElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

  static styles = [styles, ContourableCondensableInteractiveElement.styles || []];
}

@customElement("zeta-button")
export class ZetaButton extends ButtonBase {
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

  @query("button") private readonly buttonElement!: HTMLElement | null;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  /** Name for the button, used if the button is in a form. TODO: Does this even work in a form? */
  @property({ type: String }) name = "";

  /** The value of the name property When submitted as part of a form */
  @property({ type: String }) value = "";

  /** Type of button. @see {@link ButtonFlavor | ButtonFlavor} for more details. @defaultValue `primary`.*/
  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  static get styles() {
    return [super.styles ?? []];
  }

  protected render() {
    return html`
      <button ?disabled=${this.disabled} value=${this.value} name=${this.name}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}

