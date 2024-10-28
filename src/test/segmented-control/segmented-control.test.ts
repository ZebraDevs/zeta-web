import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import type { ZetaSegmentedControl } from "../../components/segmented-control/segmented-control";
import "../../components/segmented-control/segmented-control.js";

describe("zeta-segmented-control", () => {
  // describe("Accessibility Tests", () => {});

  describe("Content Tests", () => {
    it("renders the segmented control with the correct number of items", async () => {
      const items = [
        html`<zeta-segmented-item>Item 1</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 2</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 3</zeta-segmented-item>`
      ];
      const element: ZetaSegmentedControl = await fixture(html`<zeta-segmented-control>${items}</zeta-segmented-control>`);

      await expect(element.items.length).to.equal(3);
    });

    it("sets the first item as active by default", async () => {
      const items = [
        html`<zeta-segmented-item>Item 1</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 2</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 3</zeta-segmented-item>`
      ];
      const element: ZetaSegmentedControl = await fixture(html`<zeta-segmented-control>${items}</zeta-segmented-control>`);

      await expect(element.activeItem).to.equal(element.items[0]);
    });

    it("hides any slotted elements that aren't zeta-segmented-item", async () => {
      const items = [
        html`<zeta-segmented-item>Item 1</zeta-segmented-item>`,
        html`<div id="unwanted">Item 2</div>`,
        html`<zeta-segmented-item>Item 3</zeta-segmented-item>`
      ];
      const element: ZetaSegmentedControl = await fixture(html`<zeta-segmented-control>${items}</zeta-segmented-control>`);

      const slot = element.shadowRoot?.getElementById("content-slot") as HTMLSlotElement;
      const unwantedItem = slot.assignedElements().find(el => el.id === "unwanted") as HTMLDivElement;

      await expect(window.getComputedStyle(unwantedItem).display).to.equal("none");
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  describe("Interaction Tests", () => {
    it("updates the active item when a different item is clicked", async () => {
      const items = [
        html`<zeta-segmented-item>Item 1</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 2</zeta-segmented-item>`,
        html`<zeta-segmented-item>Item 3</zeta-segmented-item>`
      ];
      const element: ZetaSegmentedControl = await fixture(html`<zeta-segmented-control>${items}</zeta-segmented-control>`);

      const item2 = element.items[1];
      item2.click();

      await expect(element.activeItem).to.equal(item2);
    });
  });

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
