import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaFilterChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";

describe("ZetaFilterChip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = `<zeta-filter-chip>${labelText}</zeta-filter-chip>`) => {
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct text on the chip", async () => {
    await expect(subject.lastChild?.nodeValue).to.equal(labelText);
  });

  it("shows the check icon when active", async () => {
    subject.active = true;
    await elementUpdated(subject);

    const iconElement = subject.shadowRoot?.querySelector("zeta-icon");

    expect(iconElement).to.exist;
    await expect(iconElement?.textContent).to.equal("check_mark");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
