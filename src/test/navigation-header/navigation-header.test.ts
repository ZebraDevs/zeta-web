import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaTabBar } from "../../index.js";
import "../../index.js";

describe("zeta-tab-bar", () => {
  let subject: ZetaTabBar;

  const createComponent = (template = `<zeta-navigation-header></zeta-navigation-header>`) => {
    return fixture<ZetaTabBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
