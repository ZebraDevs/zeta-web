var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./system-banner.scss";
/** Zeta system banner component.
 *
 * @public */
let ZetaSystemBanner = class ZetaSystemBanner extends ContourableCondensableElement {
    constructor() {
        super(...arguments);
        /** Type of banner.
         *
         * @defaultValue 'default' */
        this.status = "default";
        /**
         * Alignment of banner.
         *
         * Only start and center are valid options.
         *
         * @defaultValue `Alignment.start`. */
        this.align = "start";
    }
    render() {
        const leadingIcon = html `<slot name="leading icon" class="leading icon"> </slot>`;
        const text = this.text ? html `<div class="text">${this.text}</div>` : html `<slot name="text"></slot>`;
        return html `
      <div class="system-banner">
        <div>${this.align == "start" ? [leadingIcon, text] : nothing}</div>
        <div>${this.align != "start" ? [leadingIcon, text] : nothing}</div>
        <div><slot name="trailing icon" class="trailing icon"></slot></div>
      </div>
    `;
    }
};
ZetaSystemBanner.styles = [(void 0).styles || [], styles];
__decorate([
    property({ type: String, reflect: true })
], ZetaSystemBanner.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSystemBanner.prototype, "align", void 0);
__decorate([
    property({ type: String })
], ZetaSystemBanner.prototype, "text", void 0);
ZetaSystemBanner = __decorate([
    customElement("zeta-system-banner")
], ZetaSystemBanner);
export { ZetaSystemBanner };
//# sourceMappingURL=system-banner.js.map