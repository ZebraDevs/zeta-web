import { ZetaAssistChip } from "../../../src/components/assist-chip/assist-chip.js";
import "../../../src/components/assist-chip/assist-chip.js";
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";

describe("ZetaAssistChip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = "<zeta-assist-chip></zeta-assist-chip>") => {
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    expect(subject.type).to.equal("label-only");
    expect(subject.text).to.equal("Label");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

