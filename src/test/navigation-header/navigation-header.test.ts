import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaTabBar } from "../../components/tab-bar/tab-bar.js";
import "../../components/tab-bar/tab-bar.js";

describe("zeta-tab-bar", () => {
  let subject: ZetaTabBar;

  const createComponent = (template = `<zeta-navigation-header></zeta-navigation-header>`) => {
    return fixture<ZetaTabBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
