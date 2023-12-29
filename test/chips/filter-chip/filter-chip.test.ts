import { ZetaFilterChip } from "../../../src/components/filter-chip/filter-chip.js";
import "../../../src/components/filter-chip/filter-chip.js";
import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";

describe("ZetaFilterChip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = "<zeta-filter-chip></zeta-filter-chip>") => {
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    expect(subject.type).to.equal("unselected");
    expect(subject.text).to.equal("Label");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});

