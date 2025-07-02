import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./empty-state.styles.js";
import { Contourable } from "../../mixins/contour.js";

/** ZetaEmptyState web component.
 *
 * //TODO: Add description
 * //TODO: Add slot description
 * //TODO: Add figma link(s)
 * //TODO: Add storybook link
 *
 * @public */
@customElement("zeta-empty-state")
export class ZetaEmptyState extends Contourable(LitElement) {
  protected override render() {
    return html` <div>// TODO:</div> `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-empty-state": ZetaEmptyState;
  }
}
