import { LitElement } from "lit";
import { Constructor } from "./_utils.js";
export declare class CondensableInterface {
    condensed: boolean;
}
export declare const Condensable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<CondensableInterface & LitElement> & T;
export declare const CondensableElement: Constructor<CondensableInterface & LitElement> & typeof LitElement;
export declare const ContourableCondensableElement: Constructor<import("./contour.js").ContourableInterface & LitElement> & Constructor<CondensableInterface & LitElement> & typeof LitElement;
//# sourceMappingURL=condense.d.ts.map