import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaNavigationDrawer } from "../../index.js";
import "../../index.js";

describe("zeta-navigation-drawer", () => {
  let subject: ZetaNavigationDrawer;

  const createComponent = (template = `<zeta-navigation-drawer></zeta-navigation-drawer>`) => {
    return fixture<ZetaNavigationDrawer>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
