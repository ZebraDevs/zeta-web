import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaNavigationItem } from "../../index.js";
import "../../index.js";

describe("zeta-navigation-item", () => {
  let subject: ZetaNavigationItem;

  const createComponent = (template = `<zeta-navigation-item></zeta-navigation-item>`) => {
    return fixture<ZetaNavigationItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
