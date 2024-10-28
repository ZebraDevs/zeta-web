import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSlider } from "../../components/slider/slider.js";
import "../../components/slider/slider.js";

describe("zeta-slider", () => {
  let subject: ZetaSlider;

  const createComponent = (template = `<zeta-slider></zeta-slider>`) => {
    // prettier-ignore
    return fixture<ZetaSlider>(html`${unsafeStatic(template)}`);
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
