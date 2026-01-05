import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-drawer-item.styles.js";
import { Contourable, Interactive } from "../../../mixins/mixins.js";
import "../../icon/plus-minus";

/**
 * A navigation item to be used in a zeta-navigation-drawer
 *
 * @slot - The headline text.
 * @slot badge - Content to be placed in the badge.
 * @slot leading - Content to be placed before the headline.
 * @slot trailing - Content to be placed after the headline.
 * @slot children - Child navigation items to be shown when expandable is true.
 *
 * @part body - The main body of the item.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer-item")
export class ZetaNavigationDrawerItem extends Contourable(Interactive(LitElement)) {
  /** The headline text. Can also be slotted. */
  @property({ type: String }) headline?: string;

  /** Sets the item to active. */
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  /** Sets the item to expandable.
   *
   *  When true, an expand/collapse icon will be shown on the trailing side and the items in slot 'children' will be shown/hidden when clicking the item.
   */
  @property({ type: Boolean, reflect: true }) expandable: boolean = false;

  /** Whether the item is expanded to show its children. */
  @state() expanded: boolean = false;

  /** The nesting level of the item, used to calculate padding. */
  @state() protected nestingLevel = 0;

  override connectedCallback() {
    // @ts-expect-error-next-line
    if (super.connectedCallback) super.connectedCallback();
    const isNested =
      this.parentElement?.tagName === "ZETA-NAVIGATION-DRAWER-ITEM" &&
      this.parentElement instanceof ZetaNavigationDrawerItem &&
      (this.parentElement as ZetaNavigationDrawerItem).expandable;
    this.nestingLevel = isNested ? (this.parentElement as ZetaNavigationDrawerItem).nestingLevel + 1 : 0;
  }

  protected onHeaderClick = (e: PointerEvent) => {
    if (this.expandable) {
      this.expanded = !this.expanded;
    }
    this.dispatchEvent(new CustomEvent("navigation-drawer-item-click", { detail: { originalEvent: e }, bubbles: true, composed: true }));
  };

  protected override render() {
    return html`
      <div
        part="body"
        @click=${this.onHeaderClick}
        style="padding-inline-start: ${this.nestingLevel == 0 ? "var(--spacing-medium)" : `calc(${this.nestingLevel} * var(--spacing-2xl))`};"
      >
        <div class="leading">
          <slot name="leading"></slot>
          <h1>${this.headline}<slot></slot></h1>
        </div>
        <div class="trailing">
          <slot name="badge"></slot>
          <slot name="trailing"></slot>
          ${this.expandable ? html`<zeta-plus-minus value=${this.expanded ? "minus" : "plus"}></zeta-plus-minus>` : null}
        </div>
      </div>
      <div class="children" style="grid-template-rows: ${this.expanded ? "1fr" : "0fr"};">
        <div>
          <slot name="children"></slot>
        </div>
      </div>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer-item": ZetaNavigationDrawerItem;
  }
}
