import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaInputChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";

describe("ZetaInputChip", () => {
  let subject: ZetaInputChip;

  const createComponent = (template = `<zeta-input-chip>${labelText}</zeta-input-chip>`) => {
    return fixture<ZetaInputChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct text on the chip", async () => {
    await expect(subject.lastChild?.nodeValue).to.equal(labelText);
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
