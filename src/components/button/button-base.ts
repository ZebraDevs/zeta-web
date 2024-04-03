import { query } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import { Flavored } from "../../mixins/mixins.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import { LitElement } from "lit";

export class ButtonBase extends Size(Contourable(Flavored(Interactive(LitElement)))) {
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: true
  };

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
