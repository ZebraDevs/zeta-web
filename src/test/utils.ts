import type { ZetaIcon } from "../components/icon/icon";
import { sendMouse, resetMouse, sendKeys/*, type SendKeysPayload*/ } from "@web/test-runner-commands";

/**
 * Converts a color hex string to its RGB representation.
 * @param color - The color string to convert.
 * @returns The RGB representation of the color.
 */
export const toRGB = (color: string) => {
  const { style } = new Option();
  style.color = color;
  return style.color;
};

/**
 * Retrieves the value of a CSS variable from an element.
 * @param el - The element to get the CSS variable value from.
 * @param cssVarName - The name of the CSS variable.
 * @returns The value of the CSS variable.
 */
export const getCssVarValue = (el: Element, cssVarName: string): string => {
  return getComputedStyle(el).getPropertyValue(cssVarName);
};

/**
 * Retrieves the RGB representation of a CSS variable color from an element.
 * @param el - The element to get the CSS variable color from.
 * @param cssVarName - The name of the CSS variable.
 * @returns The RGB representation of the CSS variable color.
 */
export const getCssVarColorValue = (el: Element, cssVarName: string): string => {
  return toRGB(getCssVarValue(el, cssVarName));
};

/**
 * Retrieves the text node of an icon element, for an icon this is the part that holds the iconName
 * @param elementWithSlot - The element that has a slot.
 * @returns The text node of the element that has a slot.
 */
export const getSlotTextNode = (elementWithSlot: HTMLElement, slotName: string = ""): HTMLSlotElement | undefined => {
  const parentSlot = [...elementWithSlot.shadowRoot!.querySelectorAll("slot")].find((a: HTMLSlotElement) => a.name === slotName);
  const nodes = parentSlot?.assignedNodes();
  const slot = nodes?.find(a => a.nodeName === "SLOT" && (a as HTMLSlotElement).name === slotName) as HTMLSlotElement;
  if (slot) {
    return slot;
  } else {
    return parentSlot;
  }
};

export const getSlot = (parent: HTMLElement, slotName: string = ""): HTMLSlotElement => {
  return parent.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
};

/**
 * Finds the icon in the named slot and returns its name (its text content).
 * @param parent The parent element
 * @param slotName (optional) the name of the slot, defaults to "icon"
 * @returns the name of the icon in the slot, or null if not found
 */
export const getSlottedIconName = (parent: HTMLElement, slotName: string = "icon"): string | null => {
  const slotElement = getSlot(parent, slotName);
  const iconElement = slotElement.assignedElements().find(a => a.nodeName === "ZETA-ICON") as ZetaIcon;
  return getSlotText(iconElement);
};

/**
 * Retrieves the trimmed text of an element with a slot.
 * @param elementWithASlot - The element with the slot.
 * @returns The trimmed text of the elements slot.
 */
export const getSlotText = (elementWithASlot: HTMLElement): string | null => {
  const slotNode = getSlotTextNode(elementWithASlot)!;
  const textNodes = slotNode.assignedNodes();
  return textNodes
    .filter(a => a.nodeName === "#text")
    .reduce((acc, item) => acc + item.textContent, "")
    .trim();
};

/**
 * Retrieves the color of an icon element in RGB format.
 * @param icon - The icon element.
 * @returns The color of the icon element.
 */
export const getIconColor = (icon: ZetaIcon): string => {
  return getComputedStyle(getSlotTextNode(icon)!).color;
};

/**
 * Retrieves the middle coordinates of an element, relative to the viewport.
 * @param element - The element.
 * @returns The middle coordinates of the element in x, y object format
 */
export const getMiddleOfElement = (element: HTMLElement): { x: number; y: number } => {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2)
  };
};

export const getCoordsOfElement = (element: HTMLElement): { x: number; y: number, width: number, height: number } => {
  const a: Pick<DOMRect, "x" | "y" | "height" | "width"> = element.getBoundingClientRect();
  return a;
};

/**
 * Provides mouse actions such as hover, click, and reset.
 */
export class MouseActions {
  /**
   * Moves the mouse to the center of the specified element.
   * @param element - The element to hover over.
   * @returns A promise that resolves when the mouse movement is complete.
   */
  static hover = async (element: HTMLElement): Promise<void> => {
    const { x, y } = getMiddleOfElement(element);

    return await sendMouse({ type: "move", position: [x, y] });
  };

  /**
   * Moves the mouse to the specified element and presses the specified mouse button.
   * @param element - The element to click.
   * @param button - The mouse button to press (default: "left").
   * @returns A promise that resolves when the mouse button is pressed.
   */
  static down = async (element: HTMLElement, button: "left" | "right" | "middle" = "left"): Promise<void> => {
    await this.hover(element);
    return await sendMouse({ type: "down", button });
  };

  /**
   * Lifts the specified mouse button without moving the mouse.
   * @param button - The mouse button to lift (default: "left").
   * @returns A promise that resolves when the mouse button is lifted.
   */
  static up = async (button: "left" | "right" | "middle" = "left"): Promise<void> => {
    return await sendMouse({ type: "up", button });
  };

  static click = async (element: HTMLElement, mouseButton: "left" | "right" | "middle" = "left") => {
    await this.down(element, mouseButton);
    return await this.up(mouseButton);
  };

  /**
   * Resets the mouse position to the top left corner of the viewport
   */
  static reset = resetMouse;

  static clickOutside = async (element: HTMLElement, button: "left" | "right" | "middle" = "left") => {
    const { x, y, width, height } = getCoordsOfElement(element);
    await sendMouse({ type: "move", position: [x + width + 2, y + height + 2] });
    await sendMouse({ type: "down", button });
    return await sendMouse({ type: "up", button });
  };
}

export class KeyboardActions {
  static press = async (keys: string): Promise<void> => {
    return await sendKeys({ press: keys });
  };
  static type = async (keys: string): Promise<void> => {
    return await sendKeys({ type: keys });
  };
}