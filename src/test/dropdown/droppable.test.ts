import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDroppable } from "../../components/dropdown/droppable.js";
import "../../components/dropdown/droppable.js";
import "../../components/button/button.js";
import "../../index.css";

describe("zeta-droppable", () => {
  let subject: ZetaDroppable;

  const createComponent = (
    template = `<zeta-droppable rounded=true ?open="true">
          
        </zeta-droppable>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDroppable>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the open attribute correctly", async () => {
      let open = true;
      subject.open = open;
      await elementUpdated(subject);

      await expect(subject.open).to.equal(open);

      open = false;
      subject.open = open;
      await elementUpdated(subject);

      await expect(subject.open).to.equal(open);
    });

    it("is visible when open is true", async () => {
      subject.open = true;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      await expect(style.display).to.not.equal("none");
    });

    it("is not visible when open is false", async () => {
      subject.open = false;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      await expect(style.display).to.equal("none");
    });

    it("sets the rounded attribute correctly", async () => {
      const rounded = true;
      subject.rounded = rounded;
      await elementUpdated(subject);

      await expect(subject.rounded).to.equal(rounded);
    });
  });

  describe("Dimensions", () => {
    it("ensures the droppable does not exceed the dropdown menu button width when dropdown menu item text is long", async () => {
      // Create a zeta-button as the anchor
      const anchorButton = document.createElement("zeta-button");
      anchorButton.textContent = "Dropdown";
      anchorButton.setAttribute("size", "medium");
      document.body.appendChild(anchorButton);
      await elementUpdated(anchorButton);

      subject.anchor = anchorButton;
      subject.matchParentWidth = true;
      subject.open = true;
      await elementUpdated(subject);

      const longText = "This is a very long dropdown menu item text to test the width of the droppable component.";
      subject.innerHTML = `<zeta-dropdown-menu-item>${longText}</zeta-dropdown-menu-item>`;
      await elementUpdated(subject);

      const droppableWidth = subject.getBoundingClientRect().width;
      const buttonWidth = anchorButton.getBoundingClientRect().width;

      // The droppable width should match the button width
      await expect(droppableWidth).to.equal(buttonWidth);

      // Check overflow-x: auto
      const computedStyle = window.getComputedStyle(subject);
      await expect(computedStyle.overflowX).to.equal("auto");

      // Clean up
      document.body.removeChild(anchorButton);
    });
  });

  describe("Styling", () => {
    it("sets the correct border radius when rounded is true", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      await expect(style.borderRadius).to.equal("4px");
    });

    it("sets the correct border radius when rounded is false", async () => {
      subject.rounded = false;
      await elementUpdated(subject);

      const style = getComputedStyle(subject);

      await expect(style.borderRadius).to.equal("0px");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
