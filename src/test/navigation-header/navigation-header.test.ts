import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaTabBar } from "../../components/tab-bar/tab-bar.js";
import "../../components/tab-bar/tab-bar.js";

describe("zeta-navigation-header", () => {
  let subject: ZetaTabBar;

  const createComponent = (template = `<zeta-navigation-header></zeta-navigation-header>`) => {
    // prettier-ignore
    return fixture<ZetaTabBar>(html`${unsafeStatic(template)}`);
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
