import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaProgressBar } from "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../components/progress-indicators/progress-bar/progress-bar.js";

describe("zeta-progress-bar", () => {
  let subject: ZetaProgressBar;

  const createComponent = (template = `<zeta-progress-bar></zeta-progress-bar>`) => {
    // prettier-ignore
    return fixture<ZetaProgressBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content Tests", () => {});

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
