import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import { ZetaDropdownMenuItem } from "../../../src/index.js";
import "../../../src/components/dropdown/menu-item/dropdown-menu-item.js";

describe("zeta-dropdown-menu-item", () => {
  const text = "Menu Item";

  let subject: ZetaDropdownMenuItem;

  const createComponent = (template = `<zeta-dropdown-menu-item>${text}</zeta-dropdown-menu-item>`) => {
    return fixture<ZetaDropdownMenuItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("renders the given text", () => {
    expect(subject.lastChild?.nodeValue).to.equal(text);
  });

  it("renders an icon with the correct name with the 'default' type", async () => {
    const iconName = "star";

    subject.icon = iconName;
    await elementUpdated(subject);

    const iconElement = subject.shadowRoot?.querySelector("zeta-icon");

    expect(iconElement).to.not.be.undefined;
    expect(iconElement?.getAttribute("name")).to.equal(iconName);
  });

  it("renders a checkbox with the 'checkbox' type", async () => {
    subject.type = "checkbox";
    await elementUpdated(subject);

    const checkbox = subject.shadowRoot?.querySelector("zeta-checkbox");

    expect(checkbox).to.not.be.undefined;
  });

  it("renders a radio button with the 'radio' type", async () => {
    subject.type = "radio";
    await elementUpdated(subject);

    const checkbox = subject.shadowRoot?.querySelector("zeta-radio-button");

    expect(checkbox).to.not.be.undefined;
  });
});
