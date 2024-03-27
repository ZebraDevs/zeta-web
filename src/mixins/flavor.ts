import { LitElement } from "lit";
import { ButtonFlavor, Size } from "../types.js";
import { Constructor } from "./_utils.js";
import { property, query } from "lit/decorators.js";
import styles from "./flavor.scss?inline";

export declare class FlavoredInterface {
  flavor: ButtonFlavor;
}

/**
 * Mixin to add flavor to component.
 *
 * Adds flavor attribute and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Flavored = <T extends Constructor<LitElement>>(superClass: T) => {
  class FlavoredClass extends superClass {
    /** Flavor of component.
     *
     * Values:
     * * primary - blue background.
     * * secondary - yellow background.
     * * positive - green background.
     * * negative - red background.
     * * outline - primary outline only.
     * * outline-subtle - grey outline only.
     * * text - primary text only.
     */
    @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

    /** Size of button.
     * Values:
     *
     * * small - height: 24px.
     * * medium - height: 40px.
     * * large - height: 48px.
     */
    @property({ type: String, reflect: true }) size: Size = "medium";

    /** Name for the button, used if the button is in a form. */
    //TODO: Does this even work in a form?
    @property({ type: String }) name?: string;

    /** The value of the name property When submitted as part of a form */
    @property({ type: String }) value?: string;

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];

    static shadowRootOptions: ShadowRootInit = {
      mode: "open",
      delegatesFocus: true
    };

    override focus() {
      this.buttonElement?.focus();
    }

    override blur() {
      this.buttonElement?.blur();
    }
    /** @internal */
    @query("button") private readonly buttonElement!: HTMLElement | null;
  }

  return FlavoredClass as Constructor<FlavoredInterface & LitElement> & T;
};

