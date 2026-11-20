import { fixture, html, expect } from "@open-wc/testing";
import "../../components/accordion/accordion.js";
import "../../components/accordion/accordion-item/accordion-item.js";
import type { ZetaAccordion } from "../../components/accordion/accordion.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import type { ZetaAccordionItem } from "../../components/accordion/accordion-item/accordion-item.js";
import "../../index.css";
import { disableShadowDOMTransitions, getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import "../../components/button/button";

describe("zeta-accordion", () => {
  let accordion: ZetaAccordion;
  let accordionItem: ZetaAccordionItem;

  beforeEach(async () => {
    // prettier-ignore
    accordion =  await fixture<ZetaAccordion>(html`<zeta-accordion style="width: 328px">
      <zeta-accordion-item title="Accordion Item 1">
        <div>content!</div>
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 2">
        <div>content!</div>
      </zeta-accordion-item>
      <zeta-accordion-item title="Accordion Item 3">
        <div>content!</div>
      </zeta-accordion-item>
    </zeta-accordion>`);

    // prettier-ignore
    accordionItem = await fixture<ZetaAccordionItem>(html`<zeta-accordion-item title="Accordion Item 1">
      <div style="width: 388px; height: 354px;"></div>
    </zeta-accordion-item>`);

    // Disable transitions in the shadow DOM after component is created
    if (accordion && accordion.shadowRoot) {
      disableShadowDOMTransitions(accordion);
    }
  });

  describe("Accessibility", () => {
    it("meets contrast requirements", async () => {
      await contrastTest("Accordion Item", accordionItem.shadowRoot?.querySelector("h4") as HTMLElement, accordionItem);
    });

    it("meets aria requirements", () => {
      expect(accordion).to.be.accessible();
      expect(accordion).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders multiple accordion items and shows/hides content correctly", async () => {
      accordion.expandMultiple = true;
      const item1 = accordion.querySelectorAll("zeta-accordion-item")[0];
      const item2 = accordion.querySelectorAll("zeta-accordion-item")[1];
      const item3 = accordion.querySelectorAll("zeta-accordion-item")[2];
      item1.expanded = true;
      item2.expanded = true;
      await accordion.updateComplete;
      // Content 1 and 2 should be visible, 3 should be hidden
      expect(item1.shadowRoot?.querySelector('[part="item-content"]')?.hasAttribute("hidden")).to.be.false;
      expect(item2.shadowRoot?.querySelector('[part="item-content"]')?.hasAttribute("hidden")).to.be.false;
      expect(item3.shadowRoot?.querySelector('[part="item-content"]')?.hasAttribute("hidden")).to.be.true;
    });
    it("shows check mark only for selected selectable items", async () => {
      const item1 = accordion.querySelectorAll("zeta-accordion-item")[0];
      const item2 = accordion.querySelectorAll("zeta-accordion-item")[1];
      item1.selectable = true;
      item2.selectable = true;
      item1.selected = true;
      await accordion.updateComplete;
      const selectedCheck = item1.shadowRoot?.querySelector(".check");
      const unselectedCheck = item2.shadowRoot?.querySelector(".check");
      // Selected item should show check mark
      expect(selectedCheck).to.exist;
      expect(selectedCheck?.textContent).to.include("check_mark");
      // Unselected item should not show check mark
      expect(unselectedCheck).to.not.exist;
    });
    it("shows navigation icon for navigation accordion item", async () => {
      const item1 = accordion.querySelectorAll("zeta-accordion-item")[0];
      const item2 = accordion.querySelectorAll("zeta-accordion-item")[1];
      item1.navigation = true;
      await accordion.updateComplete;
      const navigationIcon = item1.shadowRoot?.querySelector(".navigation");
      const noNavigationIcon = item2.shadowRoot?.querySelector(".navigation");
      expect(navigationIcon).to.exist;
      expect(noNavigationIcon).to.not.exist;
      expect(navigationIcon?.textContent).to.include("chevron_right");
    });
  });

  describe("Dimensions", () => {
    it("Accordion with 8 items has expected dimensions", async () => {
      while (accordion.children.length < 8) {
        const item = document.createElement("zeta-accordion-item");
        item.setAttribute("title", `Item ${accordion.children.length + 1}`);
        item.innerHTML = `<div>Content ${accordion.children.length + 1}</div>`;
        accordion.appendChild(item);
      }

      await accordion.updateComplete;
      const rect = accordion.getBoundingClientRect();
      expect(rect.width).to.equal(328);
      expect(rect.height).to.be.closeTo(448, 2);
    });
    it("Accordion with 8 items in card has expected dimensions", async () => {
      while (accordion.children.length < 8) {
        const item = document.createElement("zeta-accordion-item");
        item.setAttribute("title", `Item ${accordion.children.length + 1}`);
        item.innerHTML = `<div>Content ${accordion.children.length + 1}</div>`;
        accordion.appendChild(item);
      }
      accordion.inCard = true;
      await accordion.updateComplete;
      const rect = accordion.getBoundingClientRect();
      expect(rect.width).to.equal(328);
      expect(rect.height).to.be.closeTo(448, 2);
    });
    it("Accordion item has correct height", () => {
      const rect = accordionItem.getBoundingClientRect();
      expect(rect.height).to.equal(56);
    });
    it("Open Accordion item has correct height", async () => {
      accordionItem.expanded = true;
      await accordionItem.updateComplete;

      await new Promise(resolve => setTimeout(resolve, 300));

      const slottedContent = accordionItem.querySelector("div");
      expect(slottedContent).to.exist;
      expect(slottedContent?.textContent).to.equal("");
      expect(slottedContent?.style.height).to.equal("354px");
      await accordionItem.updateComplete;
      const rect = accordionItem.getBoundingClientRect();

      expect(rect.height).to.equal(442);
    });
  });

  describe("Styling", () => {
    it("Accordion in card has correct styling", async () => {
      accordion.inCard = true;
      await accordion.updateComplete;
      const style = getComputedStyle(accordion);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(accordion!, "--surface-section"));
      expect(style.borderWidth).to.equal("1px");
      expect(style.borderStyle).to.equal("solid");
      expect(style.borderColor).to.equal(getCssVarColorValue(accordion!, "--border-subtle"));
      const slot = accordion.shadowRoot?.querySelector("slot");
      const assignedItems = slot?.assignedElements() ?? [];
      expect(assignedItems.length).to.equal(3);
      const computed = getComputedStyle(assignedItems[1], "::before");
      expect(computed.height).to.equal("1px");
      expect(computed.backgroundColor).to.equal(getCssVarColorValue(accordion!, "--border-subtle"));
    });
    it("Accordion without card has correct styling", async () => {
      accordion.inCard = false;
      await accordion.updateComplete;
      const style = getComputedStyle(accordion);
      expect(style.borderColor).to.equal("rgba(0, 0, 0, 0)");
      const slot = accordion.shadowRoot?.querySelector("slot");

      const assignedItems = slot?.assignedElements() ?? [];
      expect(assignedItems.length).to.equal(3);
      const computed = getComputedStyle(assignedItems[1], "::before");

      expect(computed.height).to.equal("auto");
      expect(computed.backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });
    it("Accordion item uses new tokens", async () => {
      accordionItem.selectable = true;
      accordionItem.selected = true;
      await accordionItem.updateComplete;
      expect(getComputedStyle(accordionItem).backgroundColor).to.equal(getCssVarColorValue(accordionItem, "--surface-section"));
      const title = accordionItem.shadowRoot?.querySelector("h4") as HTMLElement;
      const titleStyle = getComputedStyle(title);
      expect(titleStyle.color).to.equal(getCssVarColorValue(accordionItem, "--foreground-primary"));
      expect(titleStyle.fontSize).to.equal(`${getCssVarPxValue(accordionItem, "--title-large-font-size")}px`);
      expect(titleStyle.marginTop).to.equal(`${getCssVarPxValue(accordionItem, "--space-lg")}px`);
      const check = accordionItem.shadowRoot?.querySelector(".check") as HTMLElement;
      expect(getComputedStyle(check).color).to.equal(getCssVarColorValue(accordionItem, "--foreground-info"));
    });
    it("Accordion displays custom header", async () => {
      const el = await fixture(html`
        <zeta-accordion-item title="Item 1">
          <div slot="header" style="display: flex; gap: 8px;">
            <zeta-button>Action 1</zeta-button>
            <zeta-button>Action 2</zeta-button>
            <zeta-button>Action 3</zeta-button>
          </div>
          <div>Content 1</div>
        </zeta-accordion-item>
      `);

      await (el as ZetaAccordionItem).updateComplete;
      const header = el.shadowRoot?.querySelector("[part='header-content']");
      expect(header).to.exist;
      const slot = header?.querySelector("slot[name='header']") as HTMLSlotElement | null;
      const slottedNodes = ((slot ? slot.assignedNodes({ flatten: true }) : [])[0] as Element).children;

      expect(slot).to.exist;
      expect(slottedNodes.length).to.equal(3);
      expect(slottedNodes[0].tagName).to.equal("zeta-button".toUpperCase());
      const rect = (el as ZetaAccordionItem).getBoundingClientRect();
      expect(rect.height).to.equal(112);
    });
  });

  describe("Interaction", () => {
    it("Accordion item expands and collapses on click", async () => {
      const header = accordionItem.shadowRoot?.querySelector('[part="item-header"]') as HTMLElement;
      const content = accordionItem.shadowRoot?.querySelector('[part="item-content"]') as HTMLElement;
      const row = header.querySelector(".row") as HTMLElement;
      // Initially collapsed
      expect(accordionItem.expanded).to.be.false;
      expect(content.hasAttribute("hidden")).to.be.true;

      // Click to expand
      row.click();
      await accordionItem.updateComplete;

      expect(accordionItem.expanded).to.be.true;
      expect(content.hasAttribute("hidden")).to.be.false;

      // Click again to collapse
      row.click();
      await accordionItem.updateComplete;
      expect(accordionItem.expanded).to.be.false;
      expect(content.hasAttribute("hidden")).to.be.true;
    });

    it("Selectable accordion item can be selected and unselected", async () => {
      accordionItem.children[0].remove();
      accordionItem.selectable = true;
      await accordionItem.updateComplete;

      const row = accordionItem?.shadowRoot?.querySelector(".row") as HTMLElement;

      // Initially not selected
      expect(accordionItem.selected).to.be.false;
      expect(accordionItem.shadowRoot?.querySelector(".check")).to.not.exist;

      // Click to select
      row.click();
      await accordionItem.updateComplete;
      expect(accordionItem.selected).to.be.true;
      expect(accordionItem.shadowRoot?.querySelector(".check")).to.exist;

      // Click again to unselect
      row.click();
      await accordionItem.updateComplete;
      expect(accordionItem.selected).to.be.false;
      expect(accordionItem.shadowRoot?.querySelector(".check")).to.not.exist;
    });

    it("Selectable accordion item can be expanded and collapsed", async () => {
      accordionItem.selectable = true;
      await accordionItem.updateComplete;
      const chevron = accordionItem.shadowRoot?.querySelector(".chevron") as HTMLElement;
      const content = accordionItem.shadowRoot?.querySelector('[part="item-content"]') as HTMLElement;

      expect(accordionItem.expanded).to.be.false;
      expect(content.hasAttribute("hidden")).to.be.true;

      // Click chevron to expand
      chevron.click();
      await accordionItem.updateComplete;
      expect(accordionItem.expanded).to.be.true;
      expect(content.hasAttribute("hidden")).to.be.false;

      // Click chevron to collapse
      chevron.click();
      await accordionItem.updateComplete;
      expect(accordionItem.expanded).to.be.false;
      expect(content.hasAttribute("hidden")).to.be.true;
    });

    it("Navigation accordion size does not change on click", async () => {
      accordionItem.navigation = true;
      await accordionItem.updateComplete;
      const header = accordionItem.shadowRoot?.querySelector('[part="header"]') as HTMLElement;
      const row = accordionItem.shadowRoot?.querySelector(".row") as HTMLElement;
      const rectBefore = accordionItem.getBoundingClientRect();

      header?.click();
      row?.click();
      await accordionItem.updateComplete;
      const rectAfter = accordionItem.getBoundingClientRect();

      expect(rectAfter.height).to.equal(rectBefore.height);
    });

    it("Multiple items can be selected", async () => {
      accordion.selectMultiple = true;
      await accordion.updateComplete;

      const items = accordion?.querySelectorAll("zeta-accordion-item");
      expect(items.length).to.equal(3);

      items[0].selectable = true;
      await items[0].updateComplete;

      items[1].selectable = true;
      await items[1].updateComplete;

      await accordion.updateComplete;
      const header1 = items[0].shadowRoot?.querySelector(".title-wrapper") as HTMLElement;
      const header2 = items[1].shadowRoot?.querySelector(".title-wrapper") as HTMLElement;

      // Select first item
      header1.click();
      await items[0].updateComplete;

      // Select second item
      header2.click();
      await items[1].updateComplete;

      expect(items[0].selected).to.be.true;
      expect(items[1].selected).to.be.true;
    });

    it("Multiple items can be expanded", async () => {
      accordion.expandMultiple = true;
      await accordion.updateComplete;

      const items = accordion.querySelectorAll("zeta-accordion-item");
      const header1 = items[0].shadowRoot?.querySelector(".row") as HTMLElement;
      const header2 = items[1].shadowRoot?.querySelector(".row") as HTMLElement;

      // Expand first item
      header1.click();
      await items[0].updateComplete;

      // Expand second item
      header2.click();
      await items[1].updateComplete;

      expect(items[0].expanded).to.be.true;
      expect(items[1].expanded).to.be.true;
    });

    it("Only a single item can be selected", async () => {
      accordion.selectMultiple = false;
      await accordion.updateComplete;

      const items = accordion.querySelectorAll("zeta-accordion-item");
      items[0].selectable = true;
      await items[0].updateComplete;
      items[1].selectable = true;
      await items[1].updateComplete;

      const header1 = items[0].shadowRoot?.querySelector(".title-wrapper") as HTMLElement;
      const header2 = items[1].shadowRoot?.querySelector(".title-wrapper") as HTMLElement;

      // Select first item
      header1.click();
      await items[0].updateComplete;

      // Select second item
      header2.click();
      await items[1].updateComplete;
      await accordion.updateComplete;

      expect(items[0].selected).to.be.false;
      expect(items[1].selected).to.be.true;
    });

    it("Only a single item can be expanded", async () => {
      accordion.expandMultiple = false;
      await accordion.updateComplete;

      const items = accordion.querySelectorAll("zeta-accordion-item");
      const header1 = items[0].shadowRoot?.querySelector(".row") as HTMLElement;
      const header2 = items[1].shadowRoot?.querySelector(".row") as HTMLElement;

      // Expand first item
      header1.click();
      await items[0].updateComplete;

      // Expand second item
      header2.click();
      await items[1].updateComplete;

      expect(items[0].expanded).to.be.false;
      expect(items[1].expanded).to.be.true;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
