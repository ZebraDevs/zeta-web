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
