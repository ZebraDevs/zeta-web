var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { Contourable } from "./contour.js";
export const Condensable = (superClass) => {
    class CondensableClass extends superClass {
        constructor() {
            super(...arguments);
            this.condensed = false;
        }
    }
    CondensableClass.styles = [
        superClass.styles ?? [],
        //TODO extract string to global file TOKENS
        css `
        :host,
        :host * {
          font-family: var(--type-family-regular);
        }
        :host([condensed]),
        :host([condensed]) * {
          font-family: var(--type-family-condensed);
        }
      `
    ];
    __decorate([
        property({ type: Boolean, reflect: true })
    ], CondensableClass.prototype, "condensed", void 0);
    return CondensableClass;
};
export const CondensableElement = Condensable(LitElement);
export const ContourableCondensableElement = Contourable(Condensable(LitElement));
//# sourceMappingURL=condense.js.map