import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaBreadcrumb } from "../../components/breadcrumbs/breadcrumb.js";
import "../../components/breadcrumbs/breadcrumb.js";
import { MouseActions, getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import "../../index.css";

describe("zeta-breadcrumb", () => {
  let subject: ZetaBreadcrumb;
  const maxItems = 4;
  const rounded = true;

  const createComponent = (
    template = `<zeta-breadcrumb maxItems=${maxItems} .rounded=${rounded}>
      <zeta-breadcrumb-item> Standard breadcrumb </zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 1</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 2</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 3</zeta-breadcrumb-item>
      <zeta-breadcrumb-item> Text with separator 4</zeta-breadcrumb-item>
      <zeta-breadcrumb-item>
        <zeta-icon slot="icon">star</zeta-icon>
        Icon before with separator
      </zeta-breadcrumb-item>
    </zeta-breadcrumb>`
  ) => {
    // prettier-ignore
    return fixture<ZetaBreadcrumb>(html`${unsafeStatic(template)}`);
  };

  // Items stay in the light DOM; the visible ones are those assigned to the shadow slots
  const visibleItems = (el: ZetaBreadcrumb) => [...el.shadowRoot!.querySelectorAll("slot")].flatMap(slot => slot.assignedElements()) as HTMLElement[];

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).to.be.accessible();
    });

    it("exposes a navigation landmark with a default label", () => {
      expect(subject.getAttribute("role")).to.equal("navigation");
      expect(subject.getAttribute("aria-label")).to.equal("Breadcrumb");
    });

    it("keeps a consumer provided aria-label", async () => {
      const el = await createComponent(`<zeta-breadcrumb aria-label="Site path"><zeta-breadcrumb-item>Home</zeta-breadcrumb-item></zeta-breadcrumb>`);
      expect(el.getAttribute("aria-label")).to.equal("Site path");
    });

    it("labels the more menu button", () => {
      const button = subject.shadowRoot!.querySelector(".more-menu > button")!;
      expect(button.getAttribute("aria-label")).to.equal("Show all breadcrumbs");
    });
  });

  describe("Content", () => {
    it("renders the correct number of breadcrumb items", () => {
      const visible = visibleItems(subject);
      expect(visible.length).to.equal(4);
      // first item, then the last maxItems - 1
      expect(visible[0]).to.equal(subject.items[0]);
      expect(visible.slice(1)).to.deep.equal(subject.items.slice(-3));
    });

    it("keeps every item as a light DOM child while truncated", () => {
      expect(subject.querySelectorAll("zeta-breadcrumb-item").length).to.equal(6);
      expect(subject.shadowRoot!.querySelector("zeta-breadcrumb-item")).to.be.null;
    });

    it("re-truncates when maxItems changes", async () => {
      subject.maxItems = 3;
      await subject.updateComplete;
      expect(visibleItems(subject).length).to.equal(3);

      subject.maxItems = 0;
      await subject.updateComplete;
      expect(visibleItems(subject).length).to.equal(6);
      expect(subject.shadowRoot!.querySelector(".more-menu")).to.be.null;

      subject.maxItems = 1;
      await subject.updateComplete;
      expect(visibleItems(subject).length).to.equal(2);
      expect(subject.maxItems).to.equal(1);
    });

    it("shows every item without a more menu when maxItems is not less than the item count", async () => {
      subject.maxItems = 6;
      await subject.updateComplete;
      expect(visibleItems(subject).length).to.equal(6);
      expect(subject.shadowRoot!.querySelector(".more-menu")).to.be.null;
    });

    it("includes items added after the first render", async () => {
      subject.maxItems = 0;
      await subject.updateComplete;
      subject.append(document.createElement("zeta-breadcrumb-item"));
      await new Promise(r => setTimeout(r));
      await subject.updateComplete;
      expect(visibleItems(subject).length).to.equal(7);
    });

    it("renders the truncated breadcrumb ", () => {
      const moreMenu = subject.shadowRoot!.querySelector(".more-menu");

      expect(moreMenu).to.not.be.null;
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("styles the more menu button with neutral interactive tokens", () => {
      const button = subject.shadowRoot!.querySelector(".more-menu > button")!;
      const style = getComputedStyle(button);
      expect(style.backgroundColor).to.equal(getCssVarColorValue(button, "--interactive-neutral-background-default"));
      expect(style.borderTopColor).to.equal(getCssVarColorValue(button, "--interactive-neutral-border-default"));
      expect(style.borderTopWidth).to.equal(`${getCssVarPxValue(button, "--stroke-thin")}px`);
      expect(style.paddingLeft).to.equal(`${getCssVarPxValue(button, "--space-sm")}px`);
    });

    it("styles the separator with foreground tokens", () => {
      const item = visibleItems(subject)[1];
      const style = getComputedStyle(item, "::before");
      expect(style.color).to.equal(getCssVarColorValue(item, "--foreground-secondary"));
      expect(style.fontSize).to.equal(`${getCssVarPxValue(item, "--control-icon-sm")}px`);
      expect(style.marginLeft).to.equal(`${getCssVarPxValue(item, "--space-sm")}px`);
    });

    it("styles breadcrumb item links with the secondary foreground token", () => {
      const item = visibleItems(subject)[0];
      const link = item.shadowRoot!.querySelector("a")!;
      expect(getComputedStyle(link).color).to.equal(getCssVarColorValue(link, "--foreground-secondary"));
    });

    it("sizes the slotted item icon with the control icon token", () => {
      const icon = subject.querySelector("zeta-icon[slot='icon']") as HTMLElement;
      expect(icon.getBoundingClientRect().width).to.equal(getCssVarPxValue(icon, "--control-icon-md"));
    });
  });

  describe("Interaction", () => {
    it("renders the correct number of breadcrumb items after the more menu has been clicked", async () => {
      const moreMenu = subject.shadowRoot!.querySelector(".more-menu > button") as HTMLButtonElement;
      await MouseActions.click(moreMenu);
      await subject.updateComplete;

      expect(visibleItems(subject).length).to.equal(6);
      expect(subject.shadowRoot!.querySelector(".more-menu")).to.be.null;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
