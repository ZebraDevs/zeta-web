/**
 * Utility function to set the width of an HTML element to an integer value.
 * This is useful for ensuring that the width is a whole number, which can help with layout
 * consistency, especially in cases where fractional pixel values might cause rendering issues.
 * @param element - The HTML element whose width needs to be set.
 */
export const makeIntegerWidth = (element: HTMLElement) => {
  element.style.width = "";
  element.style.width = Number.parseInt(window.getComputedStyle(element).width) + "px";
};
