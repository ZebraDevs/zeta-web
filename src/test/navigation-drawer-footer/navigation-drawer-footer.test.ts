import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerFooter } from "../../components/navigation-drawer/navigation-drawer-footer/navigation-drawer-footer.js";
import "../../components/navigation-drawer/navigation-drawer-footer/navigation-drawer-footer.js";

describe("zeta-navigation-drawer-footer", () => {
  let subject: ZetaNavigationDrawerFooter;

  const createComponent = (template = `<zeta-navigation-drawer-footer>Title</zeta-navigation-drawer-footer>`) => {
    return fixture<ZetaNavigationDrawerFooter>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
