import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaInPageBanner } from "../../components/in-page-banner/in-page-banner.js";
import "../../components/in-page-banner/in-page-banner.js";

describe("zeta-in-page-banner", () => {
  let subject: ZetaInPageBanner;

  const headingText = "Headline";
  const subHeadingText = "Subhead";
  // const status = "default";
  const status = "info";
  // const status = "positive";
  // const status = "warning";
  // const status = "negative";

  const createComponent = (
    template = `<zeta-in-page-banner title="${headingText}" status="${status}">
        ${subHeadingText}
        </zeta-in-page-banner>`
  ) => {
    // prettier-ignore
    return fixture<ZetaInPageBanner>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the heading correctly", () => {
      const headerElement = subject.shadowRoot?.querySelector(".title");

      expect(headerElement).to.not.be.undefined;
      void expect(headerElement?.textContent).to.equal(headingText);
    });

    it("sets the subheading correctly", async () => {
      const slot = subject.shadowRoot!.querySelector("slot");
      const slotContent = (slot?.assignedNodes()[0] as Text)?.data.trim();
      await expect(slotContent).to.equal(subHeadingText);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
