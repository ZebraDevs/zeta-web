import { elementUpdated, expect } from "@open-wc/testing";
import "../../index.css";

interface AccessibilityTests {
  darkMode: boolean;
  highContrast: boolean;
}

function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g);
  if (!result) return rgb;
  const [r, g, b] = result.map(Number);
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function getContrast(fg: string, bg: string): number {
  const getLuminance = (rgb: string) => {
    const values = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const [r, g, b] = values.map(x => x / 255);
    const [rs, gs, bs] = [r, g, b].map(x => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const modes = [false, true];
const tests: AccessibilityTests[] = modes.flatMap(darkMode => modes.map(highContrast => ({ darkMode, highContrast })));
/**
 * Tests the color contrast between a foreground and background element.
 * @param foreground - The foreground element (e.g., text).
 * @param background - The background element (e.g., button).
 */
export const contrastTest = async (testName: string, foreground: HTMLElement | Element, background: HTMLElement | Element) => {
  const themeMode = "theme-mode";
  const contrastMode = "contrast-mode";

  for (const test of tests) {
    if (document.getElementById(themeMode)) {
      document.getElementById(themeMode)!.remove();
    }
    if (document.getElementById(contrastMode)) {
      document.getElementById(contrastMode)!.remove();
    }
    const html = document.documentElement;
    html.setAttribute("data-mode", test.darkMode ? "dark" : "light");
    html.setAttribute("data-contrast", test.highContrast ? "more" : "less");

    await elementUpdated(foreground);
    await elementUpdated(background);

    const fgStyles = getComputedStyle(foreground);
    const bgStyles = getComputedStyle(background);
    const fg = fgStyles.color;
    const bg = bgStyles.backgroundColor;
    const contrast = getContrast(fg, bg);

    try {
      if (test.highContrast) {
        // DE TODO: commented out while there is no AAA mode from Zebra Design System Figma file tokens
        // expect(contrast).to.be.gte(7); // WCAG AAA minimum for normal text
      } else {
        expect(contrast).to.be.gte(4.5); // WCAG AA minimum for normal text
      }
    } catch (error) {
      console.error(
        `${testName} Contrast test failed. Foreground: ${rgbToHex(fg)}, background: ${rgbToHex(bg)}. ${test.darkMode ? "Dark" : "Light"} mode, ${test.highContrast ? "High Contrast" : "Normal"} mode.`,
        error
      );
      throw error;
    }
    html.removeAttribute("data-mode");
    html.removeAttribute("data-contrast");
  }
};
