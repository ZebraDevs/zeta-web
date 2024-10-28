import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSliderInputField } from "../../components/slider/slider-input-field/slider-input-field.js";
import "../../components/slider/slider-input-field/slider-input-field.js";

describe("zeta-slider-input-field", () => {
  let subject: ZetaSliderInputField;

  const createComponent = (template = `<zeta-slider-input-field></zeta-slider-input-field>`) => {
    // prettier-ignore
    return fixture<ZetaSliderInputField>(html`${unsafeStatic(template)}`);
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
