import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaGlobalHeader } from "../../index.js";
import "../../index.js";

describe("zeta-global-header", () => {
  let subject: ZetaGlobalHeader;

  const createComponent = (template = `<zeta-global-header></zeta-global-header>`) => {
    return fixture<ZetaGlobalHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

