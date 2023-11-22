import { html } from "lit";
import { query } from "lit/decorators.js";
import { customElement, property } from "lit/decorators.js";
import type { Flavor, Size } from "../../types.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./button.scss"; //TODO: Vite CLI not happy about this

//TODO SCSSify
//TODO maybe remove pseudo classes from [disabled]
//TODO text overflow broken
//TODO: Flash of unstyled content

export class ButtonBase extends ContourableCondensableElement {
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

  static styles = [styles, ContourableCondensableElement.styles || []];
}

export type ButtonFlavor =
  | Flavor
  /** PrimaryVariant background color. */
  | "primary-variant"
  /** Subtle outline color, no background. */
  | "outline-subtle"
  /** Primary color text, no outline or background. */
  | "text"
  /** Inverted colors. */
  | "text-inverse";

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

  /** Disabling the button changes the style and cursor, and removes functionality. Defaults to false. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Name for the button, used if the button is in a form. TODO: Does this even work in a form? */
  @property({ type: String })
  name = "";

  /** The value of the name property When submitted as part of a form */
  @property({ type: String })
  value = "";

  /** Type of button. @see {@link ButtonFlavor | ButtonFlavor} for more details. @defaultValue `primary`.*/
  @property({ type: String, reflect: true })
  flavor: ButtonFlavor = "primary";

  /** Size of button. See {@link Size | Size}. Defaults to `"medium"`. */
  @property({ type: String, reflect: true })
  size: Size = "medium";

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

