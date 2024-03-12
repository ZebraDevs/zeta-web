import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaMoreMenu } from "../../../index.js";
import "../../../index.js";

describe("ZetaMoreMenu", () => {
  let subject: ZetaMoreMenu;

  const createComponent = (template = "<zeta-more-menu></zeta-more-menu>") => {
    return fixture<ZetaMoreMenu>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    await expect(subject.disabled).to.equal(false);
    await expect(subject.rounded).to.equal(true);
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

