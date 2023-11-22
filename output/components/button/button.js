var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { query } from "lit/decorators.js";
import { customElement, property } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./button.scss"; //TODO: Vite CLI not happy about this
//TODO SCSSify
//TODO maybe remove pseudo classes from [disabled]
//TODO text overflow broken
//TODO: Flash of unstyled content
export class ButtonBase extends ContourableCondensableElement {
}
ButtonBase.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
};
ButtonBase.styles = [styles, ContourableCondensableElement.styles || []];
let ZetaButton = class ZetaButton extends ButtonBase {
    constructor() {
        super(...arguments);
        /** Disabling the button changes the style and cursor, and removes functionality. Defaults to false. */
        this.disabled = false;
        /** Name for the button, used if the button is in a form. TODO: Does this even work in a form? */
        this.name = "";
        /** The value of the name property When submitted as part of a form */
        this.value = "";
        /** Type of button. @see {@link ButtonFlavor | ButtonFlavor} for more details. @defaultValue `primary`.*/
        this.flavor = "primary";
        /** Size of button. See {@link Size | Size}. Defaults to `"medium"`. */
        this.size = "medium";
    }
    focus() {
        this.buttonElement?.focus();
    }
    blur() {
        this.buttonElement?.blur();
    }
    static get styles() {
        return [super.styles ?? []];
    }
    render() {
        return html `
      <button ?disabled=${this.disabled} value=${this.value} name=${this.name}>
        <slot></slot>
      </button>
    `;
    }
};
ZetaButton.shadowRootOptions = {
    mode: "open",
    delegatesFocus: true
};
__decorate([
    query("button")
], ZetaButton.prototype, "buttonElement", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaButton.prototype, "disabled", void 0);
__decorate([
    property({ type: String })
], ZetaButton.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZetaButton.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaButton.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaButton.prototype, "size", void 0);
ZetaButton = __decorate([
    customElement("zeta-button")
], ZetaButton);
export { ZetaButton };
//# sourceMappingURL=button.js.map