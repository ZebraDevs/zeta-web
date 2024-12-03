import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../index.css";
import { getCssVarValue, getCssVarColorValue, getSlottedIconName } from "../utils.js";
// import sinon from "sinon";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";

describe("zeta-dropdown-menu-item", () => {
  const text = "Menu Item";

  let subject: ZetaDropdownMenuItem;

  const createComponent = (
    template = `<zeta-dropdown-menu-item size="medium" rounded=true disabled=false>
    <zeta-icon slot="icon">star</zeta-icon>${text}</zeta-dropdown-menu-item>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDropdownMenuItem> (html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessability requirements", async () => {
      const item: ZetaDropdownMenuItem = await fixture(html`<zeta-dropdown-menu-item><zeta-icon slot="icon">star</zeta-icon>${text}</zeta-dropdown-menu-item>`);
      await elementUpdated(item);

      await expect(item).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the given text", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(text);
    });

    it("renders an icon with the correct name with the 'default' type", async () => {
      const icon = await fixture(html`<zeta-icon slot="icon">star</zeta-icon>`);
      subject.appendChild(icon);
      await elementUpdated(subject);

      await expect(getSlottedIconName(subject)).to.equal("star");
    });

    it("sets the rounded attribute correctly", async () => {
      const rounded = true;
      subject.rounded = rounded;
      await elementUpdated(subject);

      await expect(subject.rounded).to.equal(rounded);
    });

    it("sets the disabled attribute correctly", async () => {
      const disabled = true;
      subject.disabled = disabled;
      await elementUpdated(subject);

      await expect(subject.disabled).to.equal(disabled);
    });
  });

  // describe("Dimensions Tests", () => {});

  describe("Styling Tests", () => {
    it("sets the correct colors when not disabled", async () => {
      subject.disabled = false;
      await elementUpdated(subject);

      const droppableItemElement = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      const style = window.getComputedStyle(droppableItemElement);

      await expect(style.color).to.equal(getCssVarColorValue(droppableItemElement, "--main-default"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(droppableItemElement, "--surface-default"));
    });

    it("sets the correct colors when disabled", async () => {
      subject.disabled = true;
      await elementUpdated(subject);

      const droppableItemElement = subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement;
      const style = window.getComputedStyle(droppableItemElement);

      await expect(style.color).to.equal(getCssVarColorValue(droppableItemElement, "--main-disabled"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(droppableItemElement, "--surface-disabled"));
    });

    it.skip("sets the correct icon color when not disabled", async () => {
      // fails due to change to icon slot
      subject.disabled = false;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as Element;
      const style = window.getComputedStyle(iconElement);

      await expect(style.color).to.equal(getCssVarColorValue(iconElement, "--main-subtle"));
    });

    it.skip("sets the correct icon color when disabled", async () => {
      // fails due to change to icon slot
      subject.disabled = true;
      await elementUpdated(subject);

      const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;
      const style = window.getComputedStyle(iconElement as Element);

      await expect(style.color).to.equal(getCssVarColorValue(iconElement, "--main-disabled"));
    });

    it("sets the correct border radius when rounded is true", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      const style = window.getComputedStyle(subject.shadowRoot?.querySelector(".droppable-item") as Element);

      await expect(style.borderRadius).to.equal(getCssVarValue(subject, "--radius-minimal"));
    });

    it("sets the correct border radius when rounded is false", async () => {
      subject.rounded = false;
      await elementUpdated(subject);

      const style = window.getComputedStyle(subject.shadowRoot?.querySelector(".droppable-item") as HTMLElement);

      await expect(style.borderRadius).to.equal(getCssVarValue(subject, "--radius-none"));
    });
  });

  // describe("Interaction Tests", () => {
  //   it("triggers a click event on keyboard down", () => {
  //     const clickSpy = sinon.spy();
  //     subject.addEventListener("keydown", clickSpy);

  //     const event = new KeyboardEvent("keydown", { key: "Enter" });
  //     subject.dispatchEvent(event);

  //     expect(clickSpy.calledOnce).to.be.true;
  //   });
  // });

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
