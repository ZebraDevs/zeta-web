import { ContourableCondensableElement } from "../../mixins/condense.js";
/** ZetaPriorityPill web component.
 *
 * This badge is used to indicate the order of importance.
 *
 * Slotted children:
 *    * Number
 *    * Text
 *
 * @public */
export declare class ZetaPriorityPill extends ContourableCondensableElement {
    /** Text of Priority.
     *
     * Can also be slotted. */
    text: string | undefined;
    /** Number shown at start of component.
     *
     * Can also be slotted. */
    number: string | number | undefined;
    static styles: import("lit").CSSResultGroup[];
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zeta-priority-pill": ZetaPriorityPill;
    }
}
//# sourceMappingURL=priority-pill.d.ts.map