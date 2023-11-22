var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, nothing, svg } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./status-label.scss";
/** ZetaStatusLabel web component.
 *
 * To help some information, labels, or errors stand out, we present them with badges. They can look like buttons, but users can’t select them. They just guide users to things they should pay attention to.
 *
 * Slotted children:
 *    * Text
 *    * Icon
 *
 * @public */
let ZetaStatusLabel = class ZetaStatusLabel extends ContourableCondensableElement {
    constructor() {
        super(...arguments);
        /** Type of status label.
         *
         * @defaultValue `BannerType.default` */
        this.status = "neutral";
    }
    render() {
        const noIcon = svg `
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="20" viewBox="0 0 8 8" >
    <circle cx="4" cy="4" r="4" />
    </svg>`;
        return html `
      <div class="container">
        <div class="icon-container">
          ${this.hasIcon == undefined || this.hasIcon.length == 0 ? noIcon : nothing}
          <slot name="icon" @slotchange=${() => this.requestUpdate()}></slot>
        </div>
        <div class="text">${this.text ? this.text : html `<slot class="text" name="text"></slot>`}</div>
      </div>
    `;
    }
};
ZetaStatusLabel.styles = [(void 0).styles ?? [], styles];
__decorate([
    property({ type: String, reflect: true })
], ZetaStatusLabel.prototype, "status", void 0);
__decorate([
    property({ type: String })
], ZetaStatusLabel.prototype, "text", void 0);
__decorate([
    queryAssignedElements({ slot: "icon" })
], ZetaStatusLabel.prototype, "hasIcon", void 0);
ZetaStatusLabel = __decorate([
    customElement("zeta-status-label")
], ZetaStatusLabel);
export { ZetaStatusLabel };
//# sourceMappingURL=status-label.js.map