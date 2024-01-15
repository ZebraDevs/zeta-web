import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import "../../src/components/radio-button/radio-button.js";
import { ZetaRadioButton } from "../../src/index.js";

describe("zeta-checkbox", () => {
  let subject: ZetaRadioButton;

  const createComponent = (template = `<zeta-radio-button></zeta-radio-button>`) => {
    return fixture<ZetaRadioButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("changes the checked state when clicked", async () => {
    const checkboxElement = (subject.shadowRoot?.lastChild as HTMLElement).getElementsByClassName("container")[0] as HTMLElement;
    checkboxElement.click();
    expect(subject.checked).to.equal(true);
  });

  it("renders the correct text in the label", async () => {
    const labelText = "label";

    subject.label = labelText;
    await elementUpdated(subject);

    const labelElement = subject.shadowRoot?.querySelector("label");
    expect(labelElement).to.not.be.undefined;
    expect(labelElement?.textContent).to.equal(labelText);
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
