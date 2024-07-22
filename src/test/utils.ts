import type { ZetaIcon } from "../components/icon/icon";
import { sendMouse, resetMouse } from "@web/test-runner-commands";

export const toRGB = (color: string) => {
  const { style } = new Option();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  style.color = color;
  return style.color;
};

export const getCssVarValue = (el: Element, cssVarName: string): string => {
  return toRGB(getComputedStyle(el).getPropertyValue(cssVarName));
};

export const getIconTextNode = (icon: HTMLElement): HTMLSlotElement => {
  const parentSlot = icon.shadowRoot!.querySelector("slot")!;
  const nodes = parentSlot.assignedNodes();
  const slot = nodes.find(a => a.nodeName === "SLOT") as HTMLSlotElement;
  if (slot) {
    return slot;
  } else {
    return parentSlot;
  }
};

export const getIconName = (icon: HTMLElement): string | null => {
  const iconSlot = getIconTextNode(icon);
  const iconNodes = iconSlot.assignedNodes();
  return iconNodes
    .filter(a => a.nodeName === "#text")
    .reduce((acc, item) => acc + item.textContent, "")
    .trim();
};

export const getIconColor = (icon: ZetaIcon): string => {
  return getComputedStyle(getIconTextNode(icon)).color;
};

export const getMiddleOfElement = (element: HTMLElement) => {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2)
  };
};

export class MouseActions {
  static hover = async (element: HTMLElement) => {
    const { x, y } = getMiddleOfElement(element);

    return await sendMouse({ type: "move", position: [x, y] });
  };
  /* Moves the mouse to the element & presses the specified mouse button */
  static down = async (element: HTMLElement, button: "left" | "right" | "middle" = "left") => {
    await this.hover(element);
    return await sendMouse({ type: "down", button });
  };
  /* Lifts the specified mouse button, doesnt move the mouse */
  static up = async (button: "left" | "right" | "middle" = "left") => {
    return await sendMouse({ type: "up", button });
  };
  static reset = resetMouse;
}
