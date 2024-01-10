import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./_utils.js";
import { Contourable } from "./contour.js";
import { Condensable } from "./condense.js";

export declare class FocusableInterface {
  focused: boolean;
}

export const Focusable = <T extends Constructor<LitElement>>(superClass: T) => {
  class FocusableClass extends superClass {
    @property({ type: Boolean, reflect: true }) focused = true;
    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        :host(:focus) .focus-target,
        :host(:focus) > :not(:has(.focus-target)) {
          box-shadow: 0 0 0 2px var(--border-focused);
          outline-width: 2px;
          outline-color: var(--color-blue-50);
        }
      `
    ];
  }
  return FocusableClass as Constructor<FocusableInterface & LitElement> & T;
};

export const FocusableElement = Focusable(LitElement);

export const FocusableContourableElement = Focusable(Contourable(LitElement));

export const FocusableContourableCondensableElement = Focusable(Contourable(Condensable(LitElement)));
