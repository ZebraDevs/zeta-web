import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import { css, html, LitElement } from "lit";

const styles = css`
  :host {
    display: inline-flex;
    width: var(--spacing-large);
    height: var(--spacing-large);
    position: relative;
  }
  div {
    background-color: var(--main-subtle);
    position: absolute;
    width: var(--spacing-medium);
    height: var(--spacing-0-5);
    left: var(--spacing-0-5);
    top: 50%;
    transition: all 0.2s ease-in-out;
  }

  :host([value="plus"]) .vertical {
    transform: rotate(90deg) translate(0, 0.2px);
  }
`;

/**
 * An animating plus/minus icon component.
 */
@customElement("zeta-plus-minus")
export class ZetaPlusMinus extends Contourable(LitElement) {
  /** The value of the icon, either "plus" or "minus". */
  @property({ type: String, reflect: true }) value: "plus" | "minus" = "plus";

  protected override render() {
    return html`
      <div class="contourable-target vertical"></div>
      <div class="contourable-target horizontal"></div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-plus-minus": ZetaPlusMinus;
  }
}
