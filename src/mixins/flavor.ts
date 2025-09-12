import type { LitElement } from "lit";
import type { Constructor } from "./utils.js";
import { property } from "lit/decorators.js";
import styles from "./flavor.styles.js";

export type Flavor = "primary" | "positive" | "negative" | "outline" | "outline-subtle" | "text" | "inverse" | "subtle";

export declare class FlavoredInterface {
  flavor: Flavor;
}

/**
 * A mixin class that adds a `flavor` property to components, allowing them to be styled with predefined visual variants.
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
     * * positive - green background.
     * * negative - red background.
     * * outline - primary outline only.
     * * outline-subtle - grey outline only.
     * * text - primary text only.
     * * inverse - black/white background. Note that this flavor is not supported in all components.
     * * subtle - white background with grey text. Same action colors as 'text' flavor.
     *
     * @remarks The value `"secondary"` is no longer supported and should not be used.
     */
    @property({ type: String, reflect: true }) flavor: Flavor = "primary";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }

  return FlavoredClass as Constructor<FlavoredInterface & LitElement> & T;
};
