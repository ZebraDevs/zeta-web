import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerItem } from "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";
import "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";

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
