var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { ContourableCondensableElement } from "../../mixins/condense.js";
import styles from "./in-page-banner.scss";
import { ZetaButton } from "../button/button.js";
/** Zeta in page banner component.
 *
 * @public */
let ZetaInPageBanner = class ZetaInPageBanner extends ContourableCondensableElement {
    constructor() {
        super(...arguments);
        /** Title of banner, displayed at top. */
        this.title = "";
        /** Body text of banner. */
        this.body = "";
        /** Status of component.
         *
         * @defaultValue `default`.*/
        this.status = "default";
        this.getIcon = () => {
            switch (this.status) {
                case "positive":
                    return html `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_1016_17892)">
            <path
              d="M9.99935 1.66663C5.39935 1.66663 1.66602 5.39996 1.66602 9.99996C1.66602 14.6 5.39935 18.3333 9.99935 18.3333C14.5993 18.3333 18.3327 14.6 18.3327 9.99996C18.3327 5.39996 14.5993 1.66663 9.99935 1.66663ZM7.74102 13.575L4.74935 10.5833C4.42435 10.2583 4.42435 9.73329 4.74935 9.40829C5.07435 9.08329 5.59935 9.08329 5.92435 9.40829L8.33268 11.8083L14.066 6.07496C14.391 5.74996 14.916 5.74996 15.241 6.07496C15.566 6.39996 15.566 6.92496 15.241 7.24996L8.91602 13.575C8.59935 13.9 8.06602 13.9 7.74102 13.575Z"
            />
          </g>
        </svg>`;
                case "warning":
                    return html `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_1016_18541)">
            <path
              d="M3.72445 17.5001H16.2745C17.5578 17.5001 18.3578 16.1084 17.7161 15.0001L11.4411 4.1584C10.7994 3.05007 9.19945 3.05007 8.55778 4.1584L2.28278 15.0001C1.64112 16.1084 2.44112 17.5001 3.72445 17.5001ZM9.99945 11.6667C9.54112 11.6667 9.16612 11.2917 9.16612 10.8334V9.16673C9.16612 8.7084 9.54112 8.3334 9.99945 8.3334C10.4578 8.3334 10.8328 8.7084 10.8328 9.16673V10.8334C10.8328 11.2917 10.4578 11.6667 9.99945 11.6667ZM10.8328 15.0001H9.16612V13.3334H10.8328V15.0001Z"
            />
          </g>
        </svg>`;
                case "negative":
                    return html `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_1016_19150)">
            <path
              d="M9.99935 1.66675C5.39935 1.66675 1.66602 5.40008 1.66602 10.0001C1.66602 14.6001 5.39935 18.3334 9.99935 18.3334C14.5993 18.3334 18.3327 14.6001 18.3327 10.0001C18.3327 5.40008 14.5993 1.66675 9.99935 1.66675ZM9.99935 10.8334C9.54102 10.8334 9.16602 10.4584 9.16602 10.0001V6.66675C9.16602 6.20842 9.54102 5.83342 9.99935 5.83342C10.4577 5.83342 10.8327 6.20842 10.8327 6.66675V10.0001C10.8327 10.4584 10.4577 10.8334 9.99935 10.8334ZM10.8327 14.1667H9.16602V12.5001H10.8327V14.1667Z"
            />
          </g>
        </svg>`;
                case "default":
                case "info":
                default:
                    return html `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_1016_19763)">
            <path
              d="M9.99935 1.66669C5.39935 1.66669 1.66602 5.40002 1.66602 10C1.66602 14.6 5.39935 18.3334 9.99935 18.3334C14.5993 18.3334 18.3327 14.6 18.3327 10C18.3327 5.40002 14.5993 1.66669 9.99935 1.66669ZM9.99935 14.1667C9.54102 14.1667 9.16602 13.7917 9.16602 13.3334V10C9.16602 9.54169 9.54102 9.16669 9.99935 9.16669C10.4577 9.16669 10.8327 9.54169 10.8327 10V13.3334C10.8327 13.7917 10.4577 14.1667 9.99935 14.1667ZM10.8327 7.50002H9.16602V5.83335H10.8327V7.50002Z"
            />
          </g>
        </svg>`;
            }
        };
        this.getCloseIcon = () => {
            return html `<svg id="close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" .onclick=${() => this.remove()}>
      <g clip-path="url(#clip0_1016_14731)">
        <path
          d="M15.2496 4.75834C14.9246 4.43334 14.3996 4.43334 14.0746 4.75834L9.99961 8.82501L5.92461 4.75001C5.59961 4.42501 5.07461 4.42501 4.74961 4.75001C4.42461 5.07501 4.42461 5.60001 4.74961 5.92501L8.82461 10L4.74961 14.075C4.42461 14.4 4.42461 14.925 4.74961 15.25C5.07461 15.575 5.59961 15.575 5.92461 15.25L9.99961 11.175L14.0746 15.25C14.3996 15.575 14.9246 15.575 15.2496 15.25C15.5746 14.925 15.5746 14.4 15.2496 14.075L11.1746 10L15.2496 5.92501C15.5663 5.60834 15.5663 5.07501 15.2496 4.75834Z"
        />
      </g>
    </svg>`;
        };
        this.styleButtons = () => {
            this.requestUpdate();
            if (this.leadingAction[0] && this.leadingAction[0] instanceof ZetaButton) {
                const s = this.leadingAction[0];
                s.flavor = "outline-subtle";
                s.rounded = this.rounded;
                s.condensed = this.condensed;
            }
            if (this.trailingAction[0] && this.trailingAction[0] instanceof ZetaButton) {
                const s = this.trailingAction[0];
                s.flavor = "outline-subtle";
                s.rounded = this.rounded;
                s.condensed = this.condensed;
            }
        };
    }
    render() {
        this.styleButtons();
        return html `
      <div class="banner">
        <div class="leading">${this.getIcon()}</div>
        <div class="trailing">
          <div class="header">
            <div class="title">${this.title}</div>
            <div>${this.getCloseIcon()}</div>
          </div>
          <div class="body">${this.body}</div>
          <div class="footer ">
            <slot name="leading-action" @slotchange=${this.styleButtons}></slot>
            <slot name="trailing-action" @slotchange=${this.styleButtons}></slot>
          </div>
        </div>
      </div>
    `;
    }
};
ZetaInPageBanner.styles = [styles, (void 0).styles ?? []];
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "body", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaInPageBanner.prototype, "status", void 0);
__decorate([
    queryAssignedElements({ slot: "leading-action", flatten: true })
], ZetaInPageBanner.prototype, "leadingAction", void 0);
__decorate([
    queryAssignedElements({ slot: "trailing-action", flatten: true })
], ZetaInPageBanner.prototype, "trailingAction", void 0);
ZetaInPageBanner = __decorate([
    customElement("zeta-in-page-banner")
], ZetaInPageBanner);
export { ZetaInPageBanner };
//# sourceMappingURL=in-page-banner.js.map