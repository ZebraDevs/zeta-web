import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaNavigationDrawerItem } from "../../src/index.js";
import "../../src/index.js";

describe("zeta-navigation-drawer-item", () => {
  let subject: ZetaNavigationDrawerItem;

  const createComponent = (template = `<zeta-navigation-drawer-item>Navigation Item</zeta-navigation-drawer-item>`) => {
    return fixture<ZetaNavigationDrawerItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
