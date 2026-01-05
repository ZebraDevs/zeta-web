import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaNavigationDrawerItem } from "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";
import "../../components/navigation-drawer/navigation-drawer-item/navigation-drawer-item.js";

describe("zeta-navigation-drawer-item", () => {
  let subject: ZetaNavigationDrawerItem;

  const createComponent = (template = `<zeta-navigation-drawer-item>Navigation Item</zeta-navigation-drawer-item>`) => {
    // prettier-ignore
    return fixture<ZetaNavigationDrawerItem>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should toggle expanded state when clicked if expandable", async () => {
      subject.expandable = true;
      await subject.updateComplete;

      const item = subject.shadowRoot!.querySelector(".item") as HTMLElement;
      item.click();

      expect(subject.expanded).to.be.true;

      item.click();
      expect(subject.expanded).to.be.false;
    });

    it("should not toggle if not expandable", async () => {
      subject.expandable = false;
      await subject.updateComplete;

      const item = subject.shadowRoot!.querySelector(".item") as HTMLElement;
      item.click();

      expect(subject.expanded).to.be.false;
    });

    it("should dispatch navigation-drawer-item-click event", async () => {
      let eventDetail: any;
      subject.addEventListener("navigation-drawer-item-click", (e: any) => {
        eventDetail = e.detail;
      });

      const item = subject.shadowRoot!.querySelector(".item") as HTMLElement;
      item.click();

      expect(eventDetail).to.exist;
      expect(eventDetail.originalEvent).to.be.instanceOf(PointerEvent);
    });
  });

  describe("Nesting", () => {
    // Helper to access protected property for testing
    function getNestingLevel(item: ZetaNavigationDrawerItem) {
      // @ts-expect-error: Accessing protected for test
      return item.nestingLevel;
    }

    it("should have nestingLevel 1 for root item", async () => {
      expect(getNestingLevel(subject)).to.equal(1);
    });

    it("should have higher nestingLevel for nested items", async () => {
      const parent = await createComponent(`<zeta-navigation-drawer-item expandable>Parent</zeta-navigation-drawer-item>`);
      const child = document.createElement("zeta-navigation-drawer-item");
      child.textContent = "Child";
      parent.appendChild(child);
      await child.updateComplete;
      expect(getNestingLevel(child as ZetaNavigationDrawerItem)).to.equal(2);
    });
  });

  describe("Expandable", () => {
    it("should show plus-minus icon when expandable", async () => {
      subject.expandable = true;
      await subject.updateComplete;

      const icon = subject.shadowRoot!.querySelector("zeta-plus-minus");
      expect(icon).to.exist;
    });

    it("should not show plus-minus icon when not expandable", async () => {
      subject.expandable = false;
      await subject.updateComplete;

      const icon = subject.shadowRoot!.querySelector("zeta-plus-minus");
      expect(icon).to.not.exist;
    });

    it("should render children slot", async () => {
      subject.expandable = true;
      subject.expanded = true;
      await subject.updateComplete;

      const childrenSlot = subject.shadowRoot!.querySelector('slot[name="children"]');
      expect(childrenSlot).to.exist;
    });
  });
  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
