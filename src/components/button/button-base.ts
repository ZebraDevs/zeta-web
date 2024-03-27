import { query } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import type { Size } from "../../types.js";
import styles from "./button.scss?inline";
import { Flavored } from "../../mixins/flavor.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { LitElement } from "lit";

export class ButtonBase extends Contourable(Flavored(Interactive(LitElement))) {
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

  /** Size of button.
   * Values:
   *
   * * small - height: 24px.
   * * medium - height: 40px.
   * * large - height: 48px.
   */
  @property({ type: String, reflect: true }) size: Size = "medium";

  static styles = [styles, super.styles || []];

  /** Name for the button, used if the button is in a form. */
  //TODO: Does this even work in a form?
  @property({ type: String }) name?: string;

  /** The value of the name property When submitted as part of a form */
  @property({ type: String }) value?: string;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }
  /** @internal */
  @query("button") private readonly buttonElement!: HTMLElement | null;
}

