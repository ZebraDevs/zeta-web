import { query, state } from "lit/decorators.js";
import { property } from "lit/decorators.js";
import { Contourable, Interactive, Size } from "../../mixins/mixins.js";
import { LitElement } from "lit";
import styles from "./base-button.styles.js";

export class BaseButton extends Size(Contourable(Interactive(LitElement))) {
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
    super();
    this.internals = this.attachInternals();
  }
  @state() protected internals: ElementInternals;

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
    if (!this.disabled) this.buttonElement?.click();
  }

  //TODO do i need to change the target of on click events?
  protected _handleClick(event: Event) {
    if (this.type === "submit") {
      const form = this.internals.form as HTMLFormElement;
      form?.dispatchEvent(new Event("submit")); //Triggers the form to submit, this doesnt need to be defined in events.ts
    } else if (this.type === "reset") {
      const form = this.internals.form as HTMLFormElement;
      form?.reset();
    }
    return event;
  }
  /** @internal */
  @query("button") private readonly buttonElement!: HTMLElement;

  static styles = [super.styles ?? [], styles];
}
