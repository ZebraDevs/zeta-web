import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaNavigationDrawerSubItem } from "../../index.js";
import "../../index.js";

describe("zeta-navigation-drawer-sub-item", () => {
  let subject: ZetaNavigationDrawerSubItem;

  const createComponent = (template = `<zeta-navigation-drawer-sub-item>Navigation Item</zeta-navigation-drawer-sub-item>`) => {
    return fixture<ZetaNavigationDrawerSubItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
