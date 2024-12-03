import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerSubItem } from "../../components/navigation-drawer/navigation-drawer-sub-item/navigation-drawer-sub-item.js";
import "../../components/navigation-drawer/navigation-drawer-sub-item/navigation-drawer-sub-item.js";

describe("zeta-navigation-drawer-sub-item", () => {
  let subject: ZetaNavigationDrawerSubItem;

  const createComponent = (template = `<zeta-navigation-drawer-sub-item>Navigation Item</zeta-navigation-drawer-sub-item>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationDrawerSubItem>(html`${unsafeStatic(template)}`);
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
