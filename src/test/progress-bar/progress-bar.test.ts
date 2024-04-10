import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaProgressBar } from "../../index.js";
import "../../index.js";

describe("zeta-progress-bar", () => {
  let subject: ZetaProgressBar;

  const createComponent = (template = `<zeta-progress-bar></zeta-progress-bar>`) => {
    return fixture<ZetaProgressBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
