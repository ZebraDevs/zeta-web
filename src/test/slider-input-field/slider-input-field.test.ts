import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSliderInputField } from "../../components/slider/slider-input-field/slider-input-field.js";
import "../../components/slider/slider-input-field/slider-input-field.js";

describe("zeta-slider-input-field", () => {
  let subject: ZetaSliderInputField;

  const createComponent = (template = `<zeta-slider-input-field></zeta-slider-input-field>`) => {
    return fixture<ZetaSliderInputField>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
