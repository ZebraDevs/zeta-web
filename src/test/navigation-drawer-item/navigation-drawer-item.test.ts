import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerItem } from "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";
import "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";

describe("zeta-navigation-drawer-item", () => {
  let subject: ZetaNavigationDrawerItem;

  const createComponent = (template = `<zeta-navigation-drawer-item>Navigation Item</zeta-navigation-drawer-item>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationDrawerItem>(html`${unsafeStatic(template)}`);
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
