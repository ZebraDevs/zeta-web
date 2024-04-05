import { LitElement, html, nothing } from "lit";
import styles from "./button-group-item.scss?inline";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable, Interactive } from "../../../index.js";
import { ZetaIconName } from "@zebra-fed/zeta-icons";

// TODO(UX-1041): Add inverse

/**
 * Button which is used by button groups.
 *
 * @slot - Button label content.
 */
@customElement("zeta-group-item")
export class ZetaButtonGroupItem extends Contourable(Interactive(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = {
    mode: "open",
    delegatesFocus: false
  };

  @query("button") private readonly buttonElement!: HTMLElement | null;

  /** Name for the button, used if the button is in a form.*/
  //TODO: Does this even work in a form?
  @property({ type: String }) name = "";

  /** The name of the icon displayed on the button. */
  @property({ type: String }) iconName?: ZetaIconName;

  /** Size of button. */
  @property({ type: String, reflect: true }) size: "medium" | "large" = "medium";

  @property() override onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => unknown) | null = null;

  private addGap = true;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  protected override render() {
    const leadingIcon = this.iconName ? html`<zeta-icon .rounded=${this.rounded} size="20" class="icon">${this.iconName}</zeta-icon>` : nothing;
    const dropDownIcon =
      this.onclick !== undefined && this.onclick !== null ? html`<zeta-icon .rounded=${this.rounded} size="20"> expand_more</zeta-icon>` : nothing;

    return html`
      <button ?disabled=${this.disabled} ?name=${this.name}>
        ${leadingIcon}
        <label class="text ${this.addGap ? "pad" : ""}"
          ><slot
            @slotchange=${() => {
              this.addGap = this.textContent?.trim() !== "";
              this.requestUpdate();
            }}
          ></slot
        ></label>
        ${dropDownIcon}
      </button>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-group-item": ZetaButtonGroupItem;
  }
}
