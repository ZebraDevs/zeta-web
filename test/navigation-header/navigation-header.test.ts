import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaNavigationHeader } from "../../src/index.js";
import "../../src/index.js";

describe("zeta-navigation-header", () => {
  let subject: ZetaNavigationHeader;

  const createComponent = (template = `<zeta-navigation-header></zeta-navigation-header>`) => {
    return fixture<ZetaNavigationHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
