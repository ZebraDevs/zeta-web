import type { LitElement } from "lit";
import { property } from "lit/decorators.js";
import { type Constructor } from "./utils.js";

declare class SizeInterface {
  size: "small" | "medium" | "large";
}

export type SizeType = SizeInterface["size"];

/**
 * Mixin to add sizes component.
 *
 * Only adds size property, does not apply styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Size = <T extends Constructor<LitElement>>(superClass: T) => {
  class SizeClass extends superClass {
    /** Size of component */
    @property({ type: String, reflect: true }) size: SizeType = "medium";

    static styles = [(superClass as unknown as typeof LitElement).styles ?? []];
  }
  return SizeClass as Constructor<SizeInterface & LitElement> & T;
};
