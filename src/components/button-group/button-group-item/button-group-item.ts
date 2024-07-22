import { LitElement, html, nothing } from "lit";
import styles from "./button-group-item.styles.js";
import { customElement, property, query } from "lit/decorators.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../icon/icon.js";

// TODO(UX-1041): Add inverse

/**
 * Button which is used by button groups.
 *
 * @slot - Button label content.
 */
@customElement("zeta-button-group-item")
export class ZetaButtonGroupItem extends Contourable(Interactive(LitElement)) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: false
  };

  @query("button") private readonly buttonElement!: HTMLElement | null;

  /** Name for the button, used if the button is in a form.*/
  //TODO: Does this even work in a form?
  @property({ type: String }) name?: string;

  /** The name of the icon displayed on the button. */
  @property({ type: String }) iconName?: ZetaIconName;

  /** Size of button. */
  @property({ type: String, reflect: true }) size: "medium" | "large" = "medium";

  /** Whether to show the dropdown icon. */
  @property({ type: Boolean, reflect: true }) showDropdown?: boolean = false;

  @property() override onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => unknown) | null = null;

  private addGap = true;

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  protected override render() {
    const leadingIcon = this.iconName ? html`<zeta-icon .rounded=${this.rounded} class="icon">${this.iconName}</zeta-icon>` : nothing;

    return html`
      <button ?disabled=${this.disabled} name=${ifDefined(this.name)}>
        ${leadingIcon}
        <label class="text ${this.addGap ? "pad" : ""}">
          <slot
            @slotchange=${() => {
        this.addGap = this.textContent?.trim() !== "";
        this.requestUpdate();
      }}
          >
          </slot>
        </label>
        ${this.showDropdown ? html`<zeta-icon .rounded=${this.rounded}> expand_more</zeta-icon>` : nothing}
      </button>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group-item": ZetaButtonGroupItem;
  }
}
