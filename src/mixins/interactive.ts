import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./_utils.js";
import { Contourable } from "./contour.js";
import styles from "./interactive.scss";
import { Condensable } from "./condense.js";

// Define the interface for the mixin
export declare class InteractiveInterface {
  disabled: boolean;
}

export const Interactive = <T extends Constructor<LitElement>>(superClass: T) => {
  class InteractiveClass extends superClass {
    /** Boolean for if component is disabled.
     *
     * @defaultValue `false` */
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return InteractiveClass as Constructor<InteractiveInterface & LitElement> & T;
};

/** Extendable class for creating an interactive Zeta element. */
export const InteractiveElement = Interactive(LitElement);

/** Extendable class for creating an interactive and contourable Zeta element. */
export const ContourableInteractiveElement = Contourable(Interactive(LitElement));

/** Extendable class for creating an interactive, contourable, condesable Zeta element. */
export const ContourableCondensableInteractiveElement = Condensable(Contourable(Interactive(LitElement)));
