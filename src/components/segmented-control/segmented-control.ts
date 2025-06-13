import { html, LitElement, type PropertyValues } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, query, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./segmented-control.styles.js";
import { ZetaSegmentedItem } from "./segmented-item.js";
import { styleMap } from "lit/directives/style-map.js";

const animationDuration = 300;

/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
 * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
 *
 * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
 *
 * @slot {zeta-segmented-item[]} - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1046-20148&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-segmented-control--docs
 */
@customElement("zeta-segmented-control")
export class ZetaSegmentedControl extends Contourable(LitElement) {
  @queryAssignedElements() items!: NodeListOf<ZetaSegmentedItem>;

  @state() activeItem?: ZetaSegmentedItem;
  @state() initComplete = false;
  @query(".indicator") indicator!: HTMLDivElement;

  constructor() {
    super();
    this.addEventListener("click", e => {
      if (e.target instanceof ZetaSegmentedControl) return;

      this.items.forEach(item => {
        const segmentedItem = this.findSegmentedItem(e.target as HTMLElement);
        if (item === segmentedItem) {
          this.activeItem = segmentedItem as ZetaSegmentedItem;
          void new Promise(resolve => setTimeout(resolve, animationDuration)).then(() => {
            item.active = true;
          });
        } else {
          item.active = false;
        }
      });
    });
  }

  private findSegmentedItem(element: HTMLElement): HTMLElement | null {
    if (element instanceof ZetaSegmentedItem) {
      return element;
    }
    if (element.parentElement) {
      return this.findSegmentedItem(element.parentElement);
    }
    return null;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.items.forEach(item => {
      if (item.active) {
        this.activeItem = item;
      }
    });
    if (!this.activeItem) {
      this.activeItem = this.items[0];
    }
    void new Promise(resolve => setTimeout(resolve, animationDuration)).then(() => {
      this.initComplete = true;
    });
  }

  render() {
    return html`<div>
      <div
        class="indicator contourable-target"
        style=${styleMap({
          visibility: this.initComplete ? "visible" : "hidden",
          animationDuration: `${animationDuration}ms`,
          width: `${this.activeItem?.offsetWidth}px`,
          transform: `translateX(${(this.activeItem?.offsetLeft ?? 0) - 4}px)`,
          height: `${this.activeItem?.offsetHeight}px`
        })}
      ></div>
      <slot id="content-slot"></slot>
    </div> `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-segmented-control": ZetaSegmentedControl;
  }
}
