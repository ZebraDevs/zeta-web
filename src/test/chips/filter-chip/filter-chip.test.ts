import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaFilterChip } from "../../../index.js";
import "../../../index.js";

describe("ZetaFilterChip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = "<zeta-filter-chip></zeta-filter-chip>") => {
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    await expect(subject.type).to.equal("unselected");
    await expect(subject.text).to.equal("Label");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

