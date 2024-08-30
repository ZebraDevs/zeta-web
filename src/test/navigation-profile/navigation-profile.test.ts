import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationProfile } from "../../components/navigation-profile/navigation-profile.js";
import "../../components/navigation-profile/navigation-profile.js";

describe("zeta-navigation-profile", () => {
  let subject: ZetaNavigationProfile;

  const createComponent = (template = `<zeta-navigation-profile></zeta-navigation-profile>`) => {
    return fixture<ZetaNavigationProfile>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
