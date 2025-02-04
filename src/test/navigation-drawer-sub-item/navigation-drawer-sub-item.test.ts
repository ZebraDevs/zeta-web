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
