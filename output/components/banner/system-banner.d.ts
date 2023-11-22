import { Alignment, BannerStatus } from "../../types.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
/** Zeta system banner component.
 *
 * @public */
export declare class ZetaSystemBanner extends ContourableCondensableElement {
    /** Type of banner.
     *
     * @defaultValue 'default' */
    status: BannerStatus;
    /**
     * Alignment of banner.
     *
     * Only start and center are valid options.
     *
     * @defaultValue `Alignment.start`. */
    align: Alignment;
    /** Text displayed on the banner.
     *
     * Can also be slotted. */
    text: string | undefined;
    static styles: import("lit").CSSResultGroup[];
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zeta-system-banner": ZetaSystemBanner;
    }
}
//# sourceMappingURL=system-banner.d.ts.map