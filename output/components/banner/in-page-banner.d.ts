import { ContourableCondensableElement } from "../../mixins/condense.js";
import { BannerStatus } from "../../types.js";
/** Zeta in page banner component.
 *
 * @public */
export declare class ZetaInPageBanner extends ContourableCondensableElement {
    /** Title of banner, displayed at top. */
    title: string;
    /** Body text of banner. */
    body: string;
    /** Status of component.
     *
     * @defaultValue `default`.*/
    status: BannerStatus;
    static styles: import("lit").CSSResultGroup[];
    private getIcon;
    private getCloseIcon;
    leadingAction: Array<Node>;
    trailingAction: Array<Node>;
    private styleButtons;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zeta-in-page-banner": ZetaInPageBanner;
    }
}
//# sourceMappingURL=in-page-banner.d.ts.map