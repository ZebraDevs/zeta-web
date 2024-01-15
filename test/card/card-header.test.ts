import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import { ZetaCardHeader } from "../../src/index.js";
import "../../src/components/card/card-header/card-header.js";
import "../../src/components/avatar/avatar.js";
import "../../src/components/button/icon-button.js";

describe("zeta-card-header", () => {
  let subject: ZetaCardHeader;

  const headingText = "Headline";
  const subHeadingText = "Subhead";

  const leadingId = "avatar";
  const trailingId = "iconButton";

  const createComponent = (
    template = `<zeta-card-header headline=${headingText} sub-headline=${subHeadingText}>
  <zeta-avatar slot="leading" id=${leadingId}></zeta-avatar>
  <zeta-icon-button slot="trailing" id=${trailingId} iconname="more_vertical" flavor="basic"></zeta-icon-button>
  </zeta-card-header>`
  ) => {
    return fixture<ZetaCardHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the heading correctly", () => {
    const headerElement = subject.shadowRoot?.querySelector("h1");

    expect(headerElement).to.not.be.undefined;
    expect(headerElement?.textContent).to.equal(headingText);
  });

  it("sets the subheading correctly", () => {
    const subHeaderElement = subject.shadowRoot?.querySelector("h2");

    expect(subHeaderElement).to.not.be.undefined;
    expect(subHeaderElement?.textContent).to.equal(subHeadingText);
  });

  it("sets the leading content correctly", () => {
    const leadingElement = subject.shadowRoot?.querySelector(`#${leadingId}`);

    expect(leadingElement).to.not.be.undefined;
  });

  it("sets the trailing content correctly", () => {
    const trailingElement = subject.shadowRoot?.querySelector(`#${trailingId}`);

    expect(trailingElement).to.not.be.undefined;
  });

  it("meets accessability requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
