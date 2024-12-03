import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawer } from "../../components/navigation-drawer/navigation-drawer.js";
import "../../components/navigation-drawer/navigation-drawer.js";

describe("zeta-navigation-drawer", () => {
  let subject: ZetaNavigationDrawer;

  const createComponent = (template = `<zeta-navigation-drawer></zeta-navigation-drawer>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationDrawer>(html`${unsafeStatic(template)}`);
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
