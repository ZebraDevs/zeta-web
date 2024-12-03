import type { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { type Constructor } from "./utils.js";
import styles from "./interactive.styles.js";

declare class SizeInterface {
  size: "small" | "medium" | "large";
}

/**
 * Mixin to add sizes component.
 *
 * Only adds size property, does not apply styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Size = <T extends Constructor<LitElement>>(superClass: T) => {
  class InteractiveClass extends superClass {
    /** Size of component */
    @property({ type: String, reflect: true }) size: "small" | "medium" | "large" = "medium";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? [], styles];
  }
  return InteractiveClass as Constructor<SizeInterface & LitElement> & T;
};
