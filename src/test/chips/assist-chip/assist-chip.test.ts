import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaAssistChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";
const icon = "star";

describe("zeta-assist-chip", () => {
  let subject: ZetaAssistChip;

  const createComponent = (template = `<zeta-assist-chip icon=${icon}>${labelText}</zeta-assist-chip>`) => {
    // prettier-ignore
    return fixture<ZetaAssistChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("sets the correct text on the chip", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(labelText);
    });

    it("displays the correct icon", async () => {
      const iconElement = subject.shadowRoot?.querySelector("zeta-icon");
      await expect(iconElement?.textContent).to.equal(icon);
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
