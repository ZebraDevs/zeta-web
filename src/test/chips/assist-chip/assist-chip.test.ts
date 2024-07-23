import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaAssistChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";
const icon = "star";

describe("ZetaAssistChip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = `<zeta-assist-chip icon=${icon}>${labelText}</zeta-assist-chip>`) => {
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct text on the chip", async () => {
    await expect(subject.lastChild?.nodeValue).to.equal(labelText);
  });

  it("displays the correct icon", async () => {
    const iconElement = subject.shadowRoot?.querySelector("zeta-icon");
    await expect(iconElement?.textContent).to.equal(icon);
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
