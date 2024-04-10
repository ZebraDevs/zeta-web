import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaSheetHeader } from "../../../index.js";
import "../../../index.js";

describe("ZetaSheetHeader", () => {
  let subject: ZetaSheetHeader;

  const createComponent = (template = "<zeta-sheet-header></zeta-sheet-header>") => {
    return fixture<ZetaSheetHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("sets the correct default values", async () => {
    await expect(subject.alignment).to.equal("start");
    await expect(subject.text).to.equal("Title");
  });

  it("should align the text to the center when alightment = center", async () => {
    subject.setAttribute("alignment", "center");
    await elementUpdated(subject);
    const x = subject.shadowRoot?.querySelector(".container");
    expect(x).to.exist;
    await expect(window.getComputedStyle(x!).justifyContent).to.equal("center");
  });

  it("should shows the text to the passed value", async () => {
    subject.setAttribute("text", "Testing service");
    await elementUpdated(subject);

    await expect(subject.shadowRoot?.querySelector(".container")?.textContent).to.equal("Testing service");
  });

  it("it meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
