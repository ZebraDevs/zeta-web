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
