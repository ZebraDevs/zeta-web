import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDropdownMenuItem } from "../../../index.js";
import { getSlottedIconName } from "../../utils.js";
import "../../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../../components/icon/icon.js";

describe("zeta-dropdown-menu-item", () => {
  const text = "Menu Item";

  let subject: ZetaDropdownMenuItem;

  const createComponent = (template = `<zeta-dropdown-menu-item>${text}</zeta-dropdown-menu-item>`) => {
    return fixture<ZetaDropdownMenuItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("renders the given text", async () => {
    await expect(subject.lastChild?.nodeValue).to.equal(text);
  });
  it("renders an icon with the correct name with the 'default' type", async () => {
    const icon = await fixture(html`<zeta-icon slot="icon">star</zeta-icon>`);
    subject.appendChild(icon);
    await elementUpdated(subject);

    await expect(getSlottedIconName(subject)).to.equal("star");
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