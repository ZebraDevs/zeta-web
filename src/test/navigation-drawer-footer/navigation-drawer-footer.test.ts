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

  describe("Accessibility Tests", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content Tests", () => {});

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
