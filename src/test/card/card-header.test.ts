import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaCardHeader } from "../../components/card/card-header/card-header.js";
import "../../components/card/card-header/card-header.js";
import "../../components/avatar/avatar.js";
import "../../components/button/icon-button/icon-button.js";

describe("zeta-card-header", () => {
  let subject: ZetaCardHeader;

  const headingText = "Headline";
  const subHeadingText = "Subhead";

  const leadingId = "avatar";
  const trailingId = "iconButton";

  const createComponent = (
    template = `<zeta-card-header headline=${headingText} subHeadline=${subHeadingText}>
  <zeta-avatar slot="leading" id=${leadingId}></zeta-avatar>
  <zeta-icon-button slot="trailing" id=${trailingId} flavor="basic">more_vertical</zeta-icon-button>
  </zeta-card-header>`
  ) => {
    // prettier-ignore
    return fixture<ZetaCardHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("sets the heading correctly", () => {
      const headerElement = subject.shadowRoot?.querySelector("h1");

      expect(headerElement).to.not.be.undefined;
      void expect(headerElement?.textContent).to.equal(headingText);
    });

    it("sets the subheading correctly", async () => {
      const subHeaderElement = subject.shadowRoot?.querySelector("h2");

      expect(subHeaderElement).to.not.be.undefined;
      await expect(subHeaderElement?.textContent).to.equal(subHeadingText);
    });

    it("sets the leading content correctly", () => {
      const leadingElement = subject.shadowRoot?.querySelector(`#${leadingId}`);

      expect(leadingElement).to.not.be.undefined;
    });

    it("sets the trailing content correctly", () => {
      const trailingElement = subject.shadowRoot?.querySelector(`#${trailingId}`);

      expect(trailingElement).to.not.be.undefined;
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
