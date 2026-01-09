import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./shimmer.styles.js";

/** Shimmer is a loading skeleton component that displays an animated shimmer effect to indicate content is loading.
 *
 * @cssproperty --shimmer-height - The height of the shimmer element. Default: 20px
 * @cssproperty --shimmer-width - The width of the shimmer element. Default: 100%
 * @cssproperty --shimmer-animation-duration - The duration of the shimmer animation. Default: 1.5s
 * @cssproperty --shimmer-border-radius - The border radius of the shimmer element. Default: 0px
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-shimmer--docs
 */
@customElement("zeta-shimmer")
export class ZetaShimmer extends LitElement {
  protected override render() {
    return html`<div class="shimmer"></div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-shimmer": ZetaShimmer;
  }
}

