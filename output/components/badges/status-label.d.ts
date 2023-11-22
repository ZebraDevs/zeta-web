import { BadgeStatus } from "../../types.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
/** ZetaStatusLabel web component.
 *
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * Slotted children:
 *    * Text
 *    * Icon
 *
 * @public */
export declare class ZetaStatusLabel extends ContourableCondensableElement {
    /** Type of status label.
     *
     * @defaultValue `BannerType.default` */
    status: BadgeStatus;
    /** Text displayed on label.
     *
     * Can also be slotted. */
    text: string | undefined;
    /** Link to slotted icon. */
    hasIcon: Array<HTMLElement> | undefined;
    static styles: import("lit").CSSResultGroup[];
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zeta-status-label": ZetaStatusLabel;
    }
}
//# sourceMappingURL=status-label.d.ts.map