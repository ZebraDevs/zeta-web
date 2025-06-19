import { lightAARunner } from "./light-aa-runner";
import { lightAAARunner } from "./light-aaa-runner";
import { darkAARunner } from "./dark-aa-runner";
import { darkAAARunner } from "./dark-aaa-runner";
import { getContrast } from "polished";
import { expect } from "@open-wc/testing";

const accessibilityTestRunners = [lightAARunner, lightAAARunner, darkAARunner, darkAAARunner];

export const accessibilityTestRunner = async (testFn: () => Promise<void>) => {
  accessibilityTestRunners.forEach(async runner => await runner(testFn));
};

/**
 * Tests the color contrast between a foreground and background element.
 * @param foreground - The foreground element (e.g., text).
 * @param background - The background element (e.g., button).
 */
export const contrastTest = async (foreground: HTMLElement, background: HTMLElement) => {
  const runners = [lightAARunner, lightAAARunner, darkAARunner, darkAAARunner];
  for (const runner of runners) {
    await runner(async () => {
      const fgStyles = getComputedStyle(foreground);
      const bgStyles = getComputedStyle(background);
      const fg = fgStyles.color;
      const bg = bgStyles.backgroundColor;
      const contrast = getContrast(fg, bg);

      if (runner === lightAARunner || runner === darkAARunner) {
        console.log(`Contrast for ${runner.name}:`, contrast, fg, bg);
        debugger;
        expect(contrast).to.be.gte(4.5); // WCAG AA minimum for normal text
      }
      if (runner === lightAAARunner || runner === darkAAARunner) {
        console.log(`Contrast for ${runner.name}:`, contrast, fg, bg);
        expect(contrast).to.be.gte(7); // WCAG AAA minimum for normal text
      }
    });
  }
};
