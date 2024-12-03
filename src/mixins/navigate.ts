import { css, type LitElement } from "lit";
import type { Constructor } from "./utils";
import { property } from "lit/decorators.js";

declare class NavigateInterface {
  href: string;
}

/**
 * Mixin to add a href attribute to a given component.
 *
 * Removes default styling from anchor tags.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Navigate = <T extends Constructor<LitElement>>(superClass: T) => {
  class InteractiveClass extends superClass {
    /**
     * The URL of the component.
     */
    @property({ type: String, reflect: true }) href?: string;

    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        a {
          text-decoration: none;
        }
      `
    ];
  }
  return InteractiveClass as Constructor<NavigateInterface & LitElement> & T;
};
