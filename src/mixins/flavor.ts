import { LitElement } from "lit";
import { Flavor } from "../types.js";
import { Constructor } from "./_utils.js";
import { property } from "lit/decorators.js";
import styles from "./flavor.scss?inline";
import { Interactive } from "./interactive.js";
import { Contourable } from "./contour.js";

export declare class FlavoredInterface {
  flavor: Flavor;
}

export const Flavored = <T extends Constructor<LitElement>>(superClass: T) => {
  class FlavoredClass extends superClass {
    /** Flavor of component. @see {@link Flavor} for more details.
     *
     * @defaultValue `primary`*/
    @property({ type: String, reflect: true }) flavor: Flavor = "primary";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }

  return FlavoredClass as Constructor<FlavoredInterface & LitElement> & T;
};

export const FlavoredElement = Flavored(Interactive(LitElement));

export const ContourableFlavoredElement = Contourable(Flavored(Interactive(LitElement)));
