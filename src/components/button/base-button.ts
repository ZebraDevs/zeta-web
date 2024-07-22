import { query, state } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import { Flavored } from "../../mixins/mixins.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import { LitElement } from "lit";

export class BaseButton extends Size(Contourable(Flavored(Interactive(LitElement)))) {
  static formAssociated = true;
  /** @internal */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };
  /** The type of the button when used in a form */
  @property({ type: String }) type?: "submit" | "reset" | "button";
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super();
    this.internals = this.attachInternals();
  }
  @state() protected internals: ElementInternals;
  @query("button") private button?: HTMLButtonElement;

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

  override click() {
    !this.disabled && this.button?.click();
  }

  //TODO do i need to change the target of on click events?
  protected _handleClick(event: Event) {
    if (this.type === 'submit') {
      const form = this.internals.form as HTMLFormElement;
      form?.dispatchEvent(new Event("submit"));
    }
    else if (this.type === 'reset') {
      const form = this.internals.form as HTMLFormElement;
      form?.reset();
    }
    return event;
  }
  /** @internal */
  @query("button") private readonly buttonElement!: HTMLElement;
}