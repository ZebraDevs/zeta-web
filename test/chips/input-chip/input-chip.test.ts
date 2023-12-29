import { ZetaInputChip } from "../../../src/components/input-chip/input-chip.js";
import "../../../src/components/input-chip/input-chip.js";
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";

describe("ZetaInputChip", () => {
  let subject: ZetaInputChip;

  const createComponent = (template = "<zeta-input-chip></zeta-input-chip>") => {
    return fixture<ZetaInputChip>(html`${unsafeStatic(template)}`);
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

