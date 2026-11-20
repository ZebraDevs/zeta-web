import { LitElement, html } from "lit";
import styles from "./button-group.styles.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import type { ZetaButtonGroupItem } from "./button-group-item/button-group-item.js";

export * from "./button-group-item/button-group-item.js";

/** Button groups are used to group related buttons together. They can be used to create a toolbar or a set of related actions.
 *
 * Takes in Zeta Button Group Items as children and groups them by applying styling to them.
 *
 * Does not render any other types of children.
 *
 * The group's `size` is applied to every slotted item. The host gets `role="group"` unless a role is already set; give it an `aria-label` describing the group.
 *
 * @slot - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=5833-912
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-button-group--docs
 */
@customElement("zeta-button-group")
export class ZetaButtonGroup extends Contourable(LitElement) {
  /**
   * Size of the buttons in the group. Applied to every slotted `zeta-button-group-item`.
   *
   * Valid values: `"small"` (36px), `"medium"` (40px), `"large"` (48px).
   *
   * @defaultValue "medium"
   */
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";

  @queryAssignedElements({ selector: "zeta-button-group-item" }) private readonly items!: Array<ZetaButtonGroupItem>;

  override connectedCallback() {
    super.connectedCallback?.();
    if (!this.hasAttribute("role")) this.setAttribute("role", "group");
  }

  protected override updated(changed: Map<string, unknown>) {
    if (changed.has("size")) this.syncItemSize();
  }

  private syncItemSize = () => {
    this.items.forEach(item => (item.size = this.size));
  };

  protected override render() {
    return html`<slot @slotchange=${this.syncItemSize}></slot>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button-group": ZetaButtonGroup;
  }
}
