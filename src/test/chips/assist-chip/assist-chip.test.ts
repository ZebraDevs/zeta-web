import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaAssistChip } from "../../../index.js";
import "../../../index.js";

describe("ZetaAssistChip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = "<zeta-assist-chip></zeta-assist-chip>") => {
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    await expect(subject.type).to.equal("label-only");
    await expect(subject.text).to.equal("Label");
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
