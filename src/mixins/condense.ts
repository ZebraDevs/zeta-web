import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./_utils.js";
import { Contourable } from "./contour.js";

// Define the interface for the mixin
export declare class CondensableInterface {
  condensed: boolean;
}

export const Condensable = <T extends Constructor<LitElement>>(superClass: T) => {
  class CondensableClass extends superClass {
    @property({ type: Boolean, reflect: true }) condensed = false;

    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      //TODO extract string to global file TOKENS
      css`
        :host,
        :host * {
          font-family: var(--type-family-regular);
        }
        :host([condensed]),
        :host([condensed]) * {
          font-family: var(--type-family-condensed);
        }
      `
    ];
  }
  return CondensableClass as Constructor<CondensableInterface & LitElement> & T;
};

export const CondensableElement = Condensable(LitElement);

export const ContourableCondensableElement = Contourable(Condensable(LitElement));
