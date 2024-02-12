import { html } from "lit";
import { query } from "lit/decorators.js";
import { customElement, property } from "lit/decorators.js";
import type { Size } from "../../types.js";
import styles from "./button.scss?inline"; //TODO: Vite CLI not happy about this
import { ContourableFlavoredElement } from "../../mixins/flavor.js";

//TODO text overflow broken
//TODO: Fix icon button
export class ButtonBase extends ContourableFlavoredElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

  static styles = [styles, super.styles || []];
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

  /** Size of button. @see {@link Size} for more details. @defaultValue `medium` */
  @property({ type: String, reflect: true }) size: Size = "medium";

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
