export * from "./breadcrumb-item/breadcrumb-item.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";

// TODO(UX-1336): Breadcrumb arrows are not aligned.
/** The breadcrumb is a secondary navigation pattern that helps a user understand the hierarchy among levels and navigate back through them.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-5&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-breadcrumb--docs
 */
@customElement("zeta-breadcrumb")
export class ZetaBreadcrumb extends Contourable(Interactive(LitElement)) {
  static styles = [super.styles ?? [], styles];

  // Items stay in the light DOM; render() picks which ones are assigned to the slots.
  static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, slotAssignment: "manual" };

  /**
   * The maximum number of items to display in the breadcrumb. `0` (the default) shows every item; `1` is treated as `2`.
   * For example, if the value is 3 and there are 5 items in the breadcrumb:
   * * The first item will always be displayed.
   * * The last 2 items will always be displayed.
   * * The rest of the items will be truncated and displayed in a more menu.
   */
  @property({ type: Number }) maxItems: number = 0;

  /** Set when the more menu is clicked; reset whenever `maxItems` changes. */
  @state() private expanded = false;

  @query("#leading") private leadingSlot!: HTMLSlotElement;
  @query("#trailing") private trailingSlot!: HTMLSlotElement;

  /** The breadcrumb items (the element's children). */
  get items(): HTMLElement[] {
    return [...this.children] as HTMLElement[];
  }

  #observer = new MutationObserver(() => this.requestUpdate());

  override connectedCallback() {
    super.connectedCallback?.();
    // Expose the breadcrumb as a navigation landmark unless the consumer has set their own
    if (!this.hasAttribute("role")) this.setAttribute("role", "navigation");
    if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "Breadcrumb");
    this.#observer.observe(this, { childList: true });
  }

  override disconnectedCallback() {
    super.disconnectedCallback?.();
    this.#observer.disconnect();
  }

  protected override willUpdate(changed: PropertyValues<this>) {
    if (changed.has("maxItems")) this.expanded = false;
  }

  /** How many items to show, or 0 when everything fits / the menu was expanded. */
  private get visibleCount() {
    const max = this.maxItems === 1 ? 2 : this.maxItems;
    return !this.expanded && max >= 1 && max < this.items.length ? max : 0;
  }

  protected override updated() {
    const items = this.items;
    const count = this.visibleCount;
    this.leadingSlot.assign(...(count ? items.slice(0, 1) : items));
    this.trailingSlot.assign(...(count ? items.slice(items.length - (count - 1)) : []));
  }

  protected override render() {
    return html`
      <div class="container">
        <slot id="leading"></slot>
        ${
          this.visibleCount
            ? html`<div class="more-menu">
                <button class="contourable-target" aria-label="Show all breadcrumbs" @click=${() => (this.expanded = true)}>
                  <zeta-icon aria-hidden="true">more_horizontal</zeta-icon>
                </button>
              </div>`
            : nothing
        }
        <slot id="trailing"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb": ZetaBreadcrumb;
  }
}
