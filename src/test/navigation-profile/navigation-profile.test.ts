import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationProfile } from "../../components/navigation-profile/navigation-profile.js";
import "../../components/navigation-profile/navigation-profile.js";

describe("zeta-navigation-profile", () => {
  let subject: ZetaNavigationProfile;

  const createComponent = (template = `<zeta-navigation-profile></zeta-navigation-profile>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationProfile>(html`${unsafeStatic(template)}`);
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
