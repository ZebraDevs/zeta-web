import type { LitElement } from "lit";
import { css } from "lit";
import { property } from "lit/decorators.js";
import { type Constructor } from "./utils.js";

declare class ContourableInterface {
  rounded: boolean;
}

/**
 * Mixin to add Contourable to component.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Contourable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ContourableClass extends superClass {
    /**
     * Whether the component is rounded or sharp.
     *
     * When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.
     *
     * Otherwise, this value will be `--radius-none`.
     */
    @property({ type: Boolean, reflect: true }) rounded?: boolean = true;

    static styles = [
      (superClass as unknown as typeof LitElement).styles ?? [],
      css`
        :host([rounded]) {
          --contour: var(--radius-minimal);
          --computed-icon-font: "zeta-icons-round";
        }
        :host([rounded="false"]) {
          --contour: var(--radius-none);
          --computed-icon-font: "zeta-icons-sharp";
        }
        :host > *,
        :host .contourable-target {
          --icon-font: var(--computed-icon-font, "zeta-icons-sharp");
          border-radius: var(--contour, var(--radius-none));
        }
      `
    ];
  }
  return ContourableClass as Constructor<ContourableInterface & LitElement> & T;
};
