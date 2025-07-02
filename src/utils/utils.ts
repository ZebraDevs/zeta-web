/**
 * Utility function to set the width of an HTML element to an integer value by rounding up.
 * This ensures that the width is a whole number, which can help with layout consistency
 * and avoid rendering issues caused by fractional pixel values.
 * @param element - The HTML element whose width needs to be set.
 */
export const makeIntegerWidth = (element: HTMLElement) => {
  element.style.width = "";
  element.style.width = Math.ceil(parseFloat(window.getComputedStyle(element).width)) + "px";
};
