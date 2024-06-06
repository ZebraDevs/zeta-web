import { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { type Constructor } from "./utils.js";
import styles from "./interactive.styles.js";

declare class InteractiveInterface {
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
    /**
     *  Boolean for if component is disabled.
     *
     * This will apply disabled styles.
     */
    @property({ type: Boolean, reflect: true }) disabled: boolean = false;

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return InteractiveClass as Constructor<InteractiveInterface & LitElement> & T;
};
