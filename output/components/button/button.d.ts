import type { Flavor, Size } from "../../types.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
export declare class ButtonBase extends ContourableCondensableElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResultGroup[];
}
export type ButtonFlavor = Flavor
/** PrimaryVariant background color. */
 | "primary-variant"
/** Subtle outline color, no background. */
 | "outline-subtle"
/** Primary color text, no outline or background. */
 | "text"
/** Inverted colors. */
 | "text-inverse";
export declare class ZetaButton extends ButtonBase {
    static shadowRootOptions: ShadowRootInit;
    private readonly buttonElement;
    focus(): void;
    blur(): void;
    /** Disabling the button changes the style and cursor, and removes functionality. Defaults to false. */
    disabled: boolean;
    /** Name for the button, used if the button is in a form. TODO: Does this even work in a form? */
    name: string;
    /** The value of the name property When submitted as part of a form */
    value: string;
    /** Type of button. @see {@link ButtonFlavor | ButtonFlavor} for more details. @defaultValue `primary`.*/
    flavor: ButtonFlavor;
    /** Size of button. See {@link Size | Size}. Defaults to `"medium"`. */
    size: Size;
    static get styles(): import("lit").CSSResultGroup[][];
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zeta-button": ZetaButton;
    }
}
//# sourceMappingURL=button.d.ts.map