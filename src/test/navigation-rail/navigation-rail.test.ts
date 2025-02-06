import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../../components/navigation-rail/navigation-rail";
import "../../components/navigation-rail/navigation-rail-item";
import "../../components/icon/icon";
import { getSlotText } from "../utils";
import type { ZetaIcon } from "../../components/icon/icon";

describe("zeta-navigation-rail", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders the navigation items", async () => {
      const items = [
        { label: "Home", icon: "home" },
        { label: "Profile", icon: "person" },
        { label: "Settings", icon: "settings" }
      ];

      const element = await fixture(html`
        <zeta-navigation-rail>
          ${items.map(item => html` <zeta-navigation-rail-item><zeta-icon slot="icon">${item.icon}</zeta-icon>${item.label} </zeta-navigation-rail-item> `)}
        </zeta-navigation-rail>
      `);

      const navigationItems = element.querySelectorAll("zeta-navigation-rail-item");
      expect(navigationItems).to.have.lengthOf(items.length);

      let i = 0;
      for (const item of navigationItems) {
        const label = getSlotText(item);
        await expect(label).to.equal(items[i].label);

        const icon = (item.shadowRoot?.querySelector("slot[name=icon]") as HTMLSlotElement).assignedElements()[0] as ZetaIcon;
        await expect(getSlotText(icon)).to.equal(items[i].icon);
        i++;
      }
    });

    it("hides any slotted elements that aren't zeta-navigation-rail-item", async () => {
      const items = [
        html`<zeta-navigation-rail-item>Item 1</zeta-navigation-rail-item>`,
        html`<div id="unwanted">Item 2</div>`,
        html`<zeta-navigation-rail-item>Item 3</zeta-navigation-rail-item>`
      ];
      const element = await fixture(html`<zeta-navigation-rail>${items}</zeta-navigation-rail>`);

      const slot = element.shadowRoot?.getElementById("content-slot") as HTMLSlotElement;
      const unwantedItem = slot.assignedElements().find(el => el.id === "unwanted") as HTMLDivElement;

      await expect(window.getComputedStyle(unwantedItem).display).to.equal("none");
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
