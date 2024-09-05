export * from "./menu-item/dropdown-menu-item.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./droppable.styles.js";
import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/mixins.js";

/** Zeta Droppable is a container that can be opened and closed and can be attached to an anchor which will determine it's position.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/dropdown--docs
 */
@customElement("zeta-droppable")
export class ZetaDroppable extends Contourable(LitElement) {
  /** Controls the open state of the droppable. */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /** Controls whether the droppable is fit to the width of the anchor */
  @property({ type: Boolean }) matchParentWidth: boolean = false;

  /** The anchor element to position the droppable */
  @property({ type: Object }) anchor?: HTMLElement;

  /** The alignment of the droppable relative to the anchor */
  @property({ type: String }) alignment?: "start" | "end" | "center";

  /** The direction of the droppable relative to the anchor */
  @property({ type: String }) direction?: "left" | "right" | "bottom" | "top" = "bottom";

  @queryAssignedElements() slottedElements!: Array<HTMLElement>;

  private getAnchorPosition() {
    if (this.anchor) {
      const anchorRect = this.anchor.getBoundingClientRect();
      return {
        top: anchorRect.top + window.scrollY,
        left: anchorRect.left + window.scrollX,
        right: anchorRect.right + window.scrollX,
        width: anchorRect.width,
        height: anchorRect.height
      };
    }
    return { top: 0, left: 0, right: 0, width: 0, height: 0 };
  }

  private getDroppablePosition() {
    const rect = this.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    };
  }

  private topVisible = (e: HTMLElement) => {
    return e.getBoundingClientRect().top >= 0;
  };

  private bottomVisible = (e: HTMLElement) => {
    return e.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight);
  };

  private alignHorizontally = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();

    if (this.alignment == "end") {
      this.style.left = "0";
      this.style.left = `${anchorPosition.right - droppablePosition.width}px`;
    } else if (this.alignment == "center") {
      this.style.left = `${anchorPosition.left + anchorPosition.width / 2 - droppablePosition.width / 2}px`;
    } else {
      this.style.left = `${anchorPosition.left}px`;
    }
  };

  private alignVertically = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();
    if (this.alignment == "end") {
      this.style.top = `${anchorPosition.top - droppablePosition.height + anchorPosition.height}px`;
    } else if (this.alignment == "center") {
      this.style.top = `${anchorPosition.top + anchorPosition.height / 2 - droppablePosition.height / 2}px`;
    }
  };

  private setDroppablePosition = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();

    if (this.anchor) {
      switch (this.direction) {
        case "left":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left - droppablePosition.width}px`;
          this.alignVertically();
          break;
        case "right":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left + anchorPosition.width}px`;
          this.alignVertically();
          break;
        case "top":
          this.style.top = `${anchorPosition.top - droppablePosition.height}px`;
          this.alignHorizontally();
          break;
        case "bottom":
          this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
          this.alignHorizontally();
          break;
        default:
          this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
          if (!this.topVisible(this)) {
            this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
          }
          if (!this.bottomVisible(this)) {
            this.style.top = `${anchorPosition.top - droppablePosition.height}px`;
          }
          this.alignHorizontally();
          break;
      }
    }
  };

  protected updated() {
    if (this.open) {
      this.setDroppablePosition();
    }

    const anchorPosition = this.getAnchorPosition();

    if (this.anchor) {
      this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
    }
    if (this.matchParentWidth) {
      const style = window.getComputedStyle(this);
      this.style.width = `calc(${anchorPosition.width}px - ${style.paddingLeft} - ${style.paddingRight})`;
    }
  }

  protected render() {
    if (this.open) {
      return html` <slot></slot> `;
    }
    return nothing;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-droppable": ZetaDroppable;
  }
}
