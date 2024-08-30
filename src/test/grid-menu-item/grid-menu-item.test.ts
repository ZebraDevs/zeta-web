import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/badges/indicators/indicators.js";
import "../../components/icon/icon.js";
import "../../components/grid-menu-item/grid-menu-item.js";
import { getSlottedIconName, getSlotText } from "../utils.js";

describe("zeta-grid-menu-item", () => {
  const label = "Label";
  const icon = "star";
  const badgeId = "badge";

  let subject: ZetaGridMenuItem;

  const createComponent = (
    template = `<zeta-grid-menu-item>
    <zeta-icon slot="icon">${icon}</zeta-icon>
    <zeta-notification-indicator slot="badge" id=${badgeId}>2</zeta-notification-indicator>
    ${label}
  </zeta-grid-menu-item>`
  ) => {
    return fixture<ZetaGridMenuItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("renders the given icon", async () => {
    await expect(getSlottedIconName(subject)).to.equal(icon);
  });

  it("renders the given label", async () => {
    await expect(getSlotText(subject)).to.equal(label);
  });

  it("renders the given badge", () => {
    const badgeElement = subject.shadowRoot?.querySelector(`#${badgeId}`);

    expect(badgeElement).to.not.be.undefined;
  });

  it("meets accessibility requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });
});
