import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaInPageBanner } from "../../components/in-page-banner/in-page-banner.js";
import "../../components/in-page-banner/in-page-banner.js";

describe("zeta-in-page-banner", () => {
  let subject: ZetaInPageBanner;

  const headingText = "Headline";
  const bodyContent = "Subhead";
  const status = "info";

  const createComponent = (
    template = `<zeta-in-page-banner title="${headingText}" status="${status}">
        ${bodyContent}
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

    it("sets the content correctly", async () => {
      const slot = subject.shadowRoot!.querySelector("slot");
      const slotContent = (slot?.assignedNodes()[0] as Text)?.data.trim();
      await expect(slotContent).to.equal(bodyContent);
    });

    it("renders correctly with no content", async () => {
      subject.innerHTML = "";
      subject.slot = "";
      await subject.updateComplete;
      const slot = subject.shadowRoot!.querySelector("slot");
      const slotContent = slot?.assignedNodes().length;
      await expect(slotContent).to.equal(0);
    });

    it("renders correctly with no title", async () => {
      subject.title = "";
      await subject.updateComplete;
      const headerElement = subject.shadowRoot?.querySelector(".title");
      expect(headerElement).to.be.null;
    });

    it("renders correctly with no title and no content", async () => {
      subject.title = "";
      subject.innerHTML = "";
      subject.slot = "";
      await subject.updateComplete;
      const titleElement = subject.shadowRoot?.querySelector(".title");
      const slot = subject.shadowRoot!.querySelector("slot");
      const slotContent = slot?.assignedNodes().length;
      expect(titleElement).to.be.null;
      await expect(slotContent).to.equal(0);
    });

    it("renders correctly with icon hidden", async () => {
      subject.showIcon = false;
      await subject.updateComplete;
      const leadingIcon = subject.shadowRoot?.querySelector(".leading");
      expect(leadingIcon).to.be.null;
    });

    it("renders correctly when not closable", async () => {
      subject.canClose = false;
      await subject.updateComplete;
      const closeButton = subject.shadowRoot?.querySelector("zeta-icon-button");
      expect(closeButton).to.be.null;
    });

    it("renders a custom icon correctly", async () => {
      subject.icon = "star";
      await subject.updateComplete;
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      await expect(icon?.textContent?.trim()).to.equal("star");
    });

    it("renders the correct icon for each status", async () => {
      const statusIcons: Record<string, string> = {
        positive: "check_circle",
        negative: "error",
        warning: "warning",
        info: "info",
        default: "info"
      };

      for (const [statusValue, expectedIcon] of Object.entries(statusIcons)) {
        subject.status = statusValue as ZetaInPageBanner["status"];
        await subject.updateComplete;
        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        await expect(icon?.textContent?.trim()).to.equal(expectedIcon);
      }
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
