var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./priority-pill.scss";
/** ZetaPriorityPill web component.
 *
 * This badge is used to indicate the order of importance.
 *
 * Slotted children:
 *    * Number
 *    * Text
 *
 * @public */
let ZetaPriorityPill = class ZetaPriorityPill extends ContourableCondensableElement {
    render() {
        return html `
      <div class="container">
        <div class="number">${this.number}</div>
        <div class="text">${this.text}</div>
      </div>
    `;
    }
};
ZetaPriorityPill.styles = [styles, (void 0).styles ?? []];
__decorate([
    property({ type: String })
], ZetaPriorityPill.prototype, "text", void 0);
__decorate([
    property({ type: String || Number })
], ZetaPriorityPill.prototype, "number", void 0);
ZetaPriorityPill = __decorate([
    customElement("zeta-priority-pill")
], ZetaPriorityPill);
export { ZetaPriorityPill };
//# sourceMappingURL=priority-pill.js.map