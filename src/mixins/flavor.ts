import { LitElement } from "lit";
import { type Constructor } from "./utils.js";
import { property } from "lit/decorators.js";
import styles from "./flavor.styles.js";

export declare class FlavoredInterface {
  flavor: "primary" | "secondary" | "positive" | "negative" | "outline" | "outline-subtle" | "text";
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
    @property({ type: String, reflect: true }) flavor: "primary" | "secondary" | "positive" | "negative" | "outline" | "outline-subtle" | "text" = "primary";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }

  return FlavoredClass as Constructor<FlavoredInterface & LitElement> & T;
};
