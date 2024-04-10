import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaSlider } from "../../index.js";
import "../../index.js";

describe("zeta-slider", () => {
  let subject: ZetaSlider;

  const createComponent = (template = `<zeta-slider></zeta-slider>`) => {
    return fixture<ZetaSlider>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
