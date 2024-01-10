import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./_utils.js";
import { Contourable } from "./contour.js";
import styles from "./interactive.scss";
import { Flavor, Size } from "../types.js";
import { Focusable } from "./focus.js";
import { Condensable } from "./condense.js";

// Define the interface for the mixin
export declare class InteractiveInterface {
  flavor: Partial<Flavor>;
  disabled: boolean;
  size: Partial<Size>;
}

export const Interactive = <T extends Constructor<LitElement>>(superClass: T) => {
  class InteractiveClass extends superClass {
    /** Boolean for if component is disabled.
     *
     * @defaultValue `false` */
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    /** Flavor of component. @see {@link Flavor} for more details.
     *
     * @defaultValue `primary`*/
    @property({ type: String, reflect: true }) flavor: Flavor = "primary";

    /** Size of component. @see {@link Size} for more details.
     *
     * @defaultValue `small`*/
    @property({ type: String, reflect: true }) size: Size = "small";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return InteractiveClass as Constructor<InteractiveInterface & LitElement> & T;
};

/** Extendable class for creating an interactive Zeta element. */
export const InteractiveElement = Interactive(Focusable(LitElement));

/** Extendable class for creating an interactive and contourable Zeta element. */
export const CondensableInteractiveElement = Contourable(Interactive(Focusable(LitElement)));

/** Extendable class for creating an interactive, contourable, condesable Zeta element. */
export const ContourableCondensableInteractiveElement = Condensable(Contourable(Interactive(Focusable(LitElement))));
