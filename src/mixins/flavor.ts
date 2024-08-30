import type { LitElement } from "lit";
import type { Constructor } from "./utils.js";
import { property } from "lit/decorators.js";
import styles from "./flavor.styles.js";

export type Flavor = "primary" | "secondary" | "positive" | "negative" | "outline" | "outline-subtle" | "text" | "inverse";

export declare class FlavoredInterface {
  flavor: Flavor;
}

/**
 * Mixin to add flavor to component.
 *
 * Adds flavor attribute and associated styles.
 * @cssproperty --flavor-background-color  an override to set the background color of the element.
 * @cssproperty --flavor-disabled-background-color an override to set the background color of the element when it is disabled.
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
    @property({ type: String, reflect: true }) flavor: Flavor = "primary";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }

  return FlavoredClass as Constructor<FlavoredInterface & LitElement> & T;
};
