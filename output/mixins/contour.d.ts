import { LitElement } from "lit";
import { Constructor } from "./_utils.js";
export declare class ContourableInterface {
    rounded: boolean;
}
export declare const Contourable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ContourableInterface & LitElement> & T;
export declare const ContourableElement: Constructor<ContourableInterface & LitElement> & typeof LitElement;
//# sourceMappingURL=contour.d.ts.map