import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaFilterChip } from "../../../index.js";
import "../../../index.js";

const labelText = "Label";

describe("zeta-filter-chip", () => {
  let subject: ZetaFilterChip;

  const createComponent = (template = `<zeta-filter-chip>${labelText}</zeta-filter-chip>`) => {
    // prettier-ignore
    return fixture<ZetaFilterChip>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("it meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
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
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
