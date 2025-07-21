import { getContrast } from "polished";
import { elementUpdated, expect } from "@open-wc/testing";

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

  const waitForStylesheet = (link: HTMLLinkElement) => {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Stylesheet load timeout: ${link.href}`)), 1000); // 1 seconds timeout
      link.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      link.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load stylesheet: ${link.href}`));
      };
    });
  };

  for (const test of tests) {
    if (document.getElementById(themeMode)) {
      document.getElementById(themeMode)!.remove();
    }
    if (document.getElementById(contrastMode)) {
      document.getElementById(contrastMode)!.remove();
    }
    // Apply theme and contrast modes based on the test configuration

    const link = document.createElement("link");
    link.id = themeMode;
    link.rel = "stylesheet";
    link.href = `src/generated/tokens/primitives${test.darkMode ? "-dark" : ""}.css?direct&cacheBust=${Date.now()}`;
    document.head.appendChild(link);

    const contrastLink = document.createElement("link");
    contrastLink.id = contrastMode;
    contrastLink.rel = "stylesheet";
    contrastLink.href = `src/generated/tokens/semantics${test.highContrast ? "-high-contrast" : ""}.css?direct&cacheBust=${Date.now()}`;
    document.head.appendChild(contrastLink);

    await Promise.all([waitForStylesheet(link), waitForStylesheet(contrastLink)]); // Load stylesheets in parallel
    document.body.offsetHeight; // Forces reflow

    await elementUpdated(foreground);
    await elementUpdated(background);

    const fgStyles = getComputedStyle(foreground);
    const bgStyles = getComputedStyle(background);
    const fg = fgStyles.color;
    const bg = bgStyles.backgroundColor;
    const contrast = getContrast(fg, bg);
    await elementUpdated(foreground);
    await elementUpdated(background);

    try {
      if (test.highContrast) {
        expect(contrast).to.be.gte(7); // WCAG AAA minimum for normal text
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
  }
};
