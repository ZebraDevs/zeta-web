import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerFooter } from "../../components/navigation-drawer/navigation-drawer-footer/navigation-drawer-footer.js";
import "../../components/navigation-drawer/navigation-drawer-footer/navigation-drawer-footer.js";

describe("zeta-navigation-drawer-footer", () => {
  let subject: ZetaNavigationDrawerFooter;

  const createComponent = (template = `<zeta-navigation-drawer-footer>Title</zeta-navigation-drawer-footer>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationDrawerFooter>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
