import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import { getSlotText } from "../utils";
import "../../components/navigation-rail/navigation-rail-item";
import type { ZetaNavigationRailItem } from "../../components/navigation-rail/navigation-rail-item";
import type { ZetaIcon } from "../../components/icon/icon";
import "../../components/icon/icon";

describe("ZetaNavigationRailItem", () => {
  it("renders the label slot correctly", async () => {
    const label = "Home";
    const element = await fixture(html` <zeta-navigation-rail-item> ${label} </zeta-navigation-rail-item> `);

    await expect(getSlotText(element as HTMLElement)).to.equal(label);
  });

  it("renders the icon slot correctly", async () => {
    const iconName = "star";
    const element = await fixture(html` <zeta-navigation-rail-item> <zeta-icon slot="icon">${iconName}</zeta-icon> </zeta-navigation-rail-item> `);

    const icon = (element.shadowRoot?.querySelector("slot[name=icon]") as HTMLSlotElement).assignedElements()[0] as ZetaIcon;
    await expect(getSlotText(icon)).to.equal(iconName);
  });

  it("reflects the 'selected' property correctly", async () => {
    const element: ZetaNavigationRailItem = await fixture(html`<zeta-navigation-rail-item></zeta-navigation-rail-item>`);
    expect(element.selected).to.be.false;
    element.selected = true;
    await element.updateComplete;
    expect(element.selected).to.be.true;
  });

  // TODO: figure out how to test navigation
  it.skip("goes to the correct href when clicked", async () => {
    const element: ZetaNavigationRailItem = await fixture(html`<zeta-navigation-rail-item href="https://www.google.com"></zeta-navigation-rail-item>`);
    element.click();

    await element.updateComplete;
    await expect(window.location.href).to.equal("https://www.google.com");
  });
});
