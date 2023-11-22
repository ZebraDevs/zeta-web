var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";
export const Contourable = (superClass) => {
    class ContourableClass extends superClass {
        constructor() {
            super(...arguments);
            this.rounded = true;
        }
    }
    ContourableClass.styles = [
        superClass.styles ?? [],
        css `
        :host > * {
          border-radius: 0;
        }
        :host([rounded]) > * {
          border-radius: 4px;
        }
      `
    ];
    __decorate([
        property({ type: Boolean, reflect: true })
    ], ContourableClass.prototype, "rounded", void 0);
    return ContourableClass;
};
export const ContourableElement = Contourable(LitElement);
//# sourceMappingURL=contour.js.map