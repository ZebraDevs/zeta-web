import { customElement, property, query } from "lit/decorators.js";
import { html } from "lit";
import styles from "./icon-button.scss?inline";
import { ButtonFlavor, Size } from "../../../types.js";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ContourableFlavoredElement } from "../../../mixins/flavor.js";
import "../../icon/icon.js";

// TODO slot icon name instead of passing it through a property
@customElement("zeta-icon-button")
/**
 * A button containing a Zeta Icon.
 */
export class ZetaIconButton extends ContourableFlavoredElement {
  @query("button") private readonly buttonElement!: HTMLElement | null;

  /** The flavor of the button. */
  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  /** The name of the icon displayed on the button. */
  @property({ type: String }) iconName: ZetaIconName = "star";

  /** Name for the button, used if the button is in a form. TODO: Does this even work in a form? */
  @property({ type: String }) name = "";

  /** The value of the name property When submitted as part of a form */
  @property({ type: String }) value = "";

  /** Size of button. @see {@link Size} for more details. @defaultValue `medium` */
  @property({ type: String, reflect: true }) size: Size = "medium";

  override focus() {
    this.buttonElement?.focus();
  }

  override blur() {
    this.buttonElement?.blur();
  }

  private getIconSize(): number {
    switch (this.size) {
      case "small":
        return 20;
      case "medium":
      case "large":
        return 24;
    }
  }

  private getIconColor(): string {
    if (this.disabled) {
      return "var(--icon-disabled)";
    } else {
      switch (this.flavor) {
        case "outline":
          return "var(--surface-flavor-primary)";
        case "outline-subtle":
        case "text":
          return "var(--icon-default)";
        case "primary":
        case "secondary":
        case "positive":
        case "negative":
          return "var(--icon-inverse)";
      }
    }
  }

  protected render() {
    const label = this.iconName.replaceAll("_", " ");
    return html`<button ?disabled=${this.disabled} value=${this.value} name=${this.name} flavor=${this.flavor} aria-label=${label}>
      <zeta-icon name=${this.iconName} .rounded=${this.rounded} color=${this.getIconColor()} size=${this.getIconSize()}>
        <div class=${this.flavor}></div>
      </zeta-icon>
    </button>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-button": ZetaIconButton;
  }
}

