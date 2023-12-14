import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./accordion.scss";
import { CondensableInteractiveElement } from "../../mixins/interactive.js";

@customElement("zeta-accordion")
/**
 * An expandable section of content.
 *
 * For proper usage, pass in 'li' elements as children.
 */
export class ZetaAccordion extends CondensableInteractiveElement {
  /** The title of the accordion. */
  @property({ type: String }) accordionTitle: string | undefined = undefined;

  /** Creates a border around the accordion. */
  @property({ type: Boolean, reflect: true }) contained: boolean = false;

  /** Opens the accordion. */
  @property({ type: Boolean, reflect: true })
  private _open = false;
  set open(val: boolean) {
    this._open = !this.disabled && val;
  }
  get open() {
    return !this.disabled && this._open;
  }

  private toggleOpen() {
    this.open = !this.open;
  }

  private titleTemplate() {
    return html`
      <div class="title">
        <div>${this.accordionTitle}</div>
        <zeta-icon color="${this.disabled ? "var(--icon-disabled)" : ""} .rounded=${this.rounded} size="24"
          >${this.open ? "remove" : "add"}</zeta-icon
        >
      </div>
    `;
  }

  private bodyTemplate() {
    return html` <div class="body" ?open=${this.open}><slot></slot></div> `;
  }

  protected render() {
    return html` <div class="accordion" ?disabled=${this.disabled} @click=${(_e: Event) => this.toggleOpen()} style=${styles}>
      ${this.titleTemplate()} ${this.bodyTemplate()}
    </div>`;
  }

  static styles = [styles, CondensableInteractiveElement.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-accordion": ZetaAccordion;
  }
}
