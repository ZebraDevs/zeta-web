import type { LitElement, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import type { Constructor } from "./utils.js";
import styles from "./interactive.styles.js";

export declare class InteractiveInterface {
  disabled: boolean;
}

/**
 * Mixin to add interactive states to component.
 *
 * Adds disabled attribute and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Interactive = <T extends Constructor<LitElement>>(superClass: T) => {
  class InteractiveClass extends superClass {
    /**@internal tracks what the focus listener has been applied to */
    _listenerTarget?: "target" | "firstChild";

    /** @internal adds the focus eventListener*/
    firstUpdated(_changedProperties: PropertyValues): void {
      super.firstUpdated(_changedProperties);
      if (this.interactiveElement) {
        this.interactiveElement.addEventListener("focus", this._handleFocus);
        this._listenerTarget = "target";
      } else if (this.interactiveChild) {
        this.interactiveChild?.classList.add("interactive-target");
        this.interactiveChild?.addEventListener("focus", this._handleFocus);
        this._listenerTarget = "firstChild";
      }
    }
    /** @internal removes the focus eventListener*/
    disconnectedCallback(): void {
      super.disconnectedCallback();
      switch (this._listenerTarget) {
        case "target":
          this.interactiveElement?.removeEventListener("focus", this._handleFocus);
          break;
        case "firstChild":
          this.interactiveChild?.removeEventListener("focus", this._handleFocus);
          break;
      }
    }

    /** @internal This stops internal focus events happening onclick */
    _handleFocus = (event: FocusEvent) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        // Revert focus back to previous blurring element
        if (event.relatedTarget) {
          (event.relatedTarget as HTMLElement).focus();
        } else {
          this.blur();
        }
      }
      return true;
    };

    /** @internal */
    @query(".interactive-target") private readonly interactiveElement?: HTMLElement;

    /** @internal */
    @query(":host > :first-child") private readonly interactiveChild?: HTMLElement;

    /**
     * Boolean for if component is disabled.
     *
     * This will apply disabled styles.
     */
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;
    /**
     * The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key.
     */
    @property({ type: Number }) override tabIndex: number = 0;

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return InteractiveClass as Constructor<InteractiveInterface & LitElement> & T;
};
