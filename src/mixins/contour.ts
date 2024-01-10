import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";
import { Constructor } from "./_utils.js";

// Define the interface for the mixin
export declare class ContourableInterface {
  rounded: boolean;
}

export const Contourable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ContourableClass extends superClass {
    @property({ type: Boolean, reflect: true }) rounded = true;
    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        :host > *,
        :host .contourable-target {
          border-radius: 0;
        }
        :host([rounded]) > *,
        :host([rounded]) .contourable-target {
          border-radius: 4px;
        }
      `
    ];
  }
  return ContourableClass as Constructor<ContourableInterface & LitElement> & T;
};

export const ContourableElement = Contourable(LitElement);
