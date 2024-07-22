import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import { ZetaIcon, ZetaNavigationBarItem } from "../../index.js";
import "../../index.js";
import { getIconName } from "../utils.js";

describe("zeta-navigation-bar-item", () => {
  const label = "Label";
  const icon = "star";
  const badgeId = "badge";

  let subject: ZetaNavigationBarItem;

  const createComponent = (
    template = `<zeta-navigation-bar-item icon=${icon} label=${label}>
    <zeta-notification-indicator slot="badge" id=${badgeId}>2</zeta-notification-indicator>
  </zeta-navigation-bar-item>`
  ) => {
    return fixture<ZetaNavigationBarItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("renders the given icon", async () => {
    const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;
    expect(iconElement).to.not.be.undefined;

    await expect(getIconName(iconElement)).to.equal(icon);
  });

  it("renders the given label", async () => {
    const labelElement = subject.shadowRoot?.querySelector(".label");

    await expect(labelElement?.textContent).to.equal(label);
  });

  it("renders the given badge", () => {
    const badgeElement = subject.shadowRoot?.querySelector(`#${badgeId}`);

    expect(badgeElement).to.not.be.undefined;
  });

  it("meets accessability requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
