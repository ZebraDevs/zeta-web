import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaInputChip } from "../../../index.js";
import "../../../index.js";

describe("ZetaInputChip", () => {
  let subject: ZetaInputChip;

  const createComponent = (template = "<zeta-input-chip></zeta-input-chip>") => {
    return fixture<ZetaInputChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    await expect(subject.type).to.equal("label-only");
    await expect(subject.text).to.equal("Label");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
