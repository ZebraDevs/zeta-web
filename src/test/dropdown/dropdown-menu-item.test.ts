import { fixture, html, unsafeStatic, expect, elementUpdated, oneEvent } from "@open-wc/testing";
import type { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaDroppable } from "../../components/dropdown/droppable.js";
import "../../components/dropdown/menu-item/dropdown-menu-item.js";
import "../../components/dropdown/droppable.js";
import "../../index.css";
import { getCssVarValue, getCssVarColorValue, getCssVarPxValue, getSlottedIconName, disableShadowDOMTransitions, KeyboardActions } from "../utils.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

describe("zeta-dropdown-menu-item", () => {
  const text = "Menu Item";

  let subject: ZetaDropdownMenuItem;

  const createComponent = (
    template = `<zeta-dropdown-menu-item size="medium" rounded>
    <zeta-icon slot="icon">star</zeta-icon>${text}</zeta-dropdown-menu-item>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDropdownMenuItem>(html`${unsafeStatic(template)}`);
  };

  const createMenu = async (type: "default" | "checkbox" | "radio" = "default") => {
    const menu = await fixture<ZetaDroppable>(
      html`<zeta-droppable open role="menu" aria-label="Menu">
        <zeta-dropdown-menu-item type=${type}>One</zeta-dropdown-menu-item>
        <zeta-dropdown-menu-item type=${type} disabled>Two</zeta-dropdown-menu-item>
        <zeta-dropdown-menu-item type=${type}>Three</zeta-dropdown-menu-item>
      </zeta-droppable>`
    );
    const items = Array.from(menu.querySelectorAll("zeta-dropdown-menu-item"));
    await Promise.all(items.map(i => i.updateComplete));
    return { menu, items };
  };

  const row = (el: ZetaDropdownMenuItem) => el.shadowRoot?.querySelector(".droppable-item") as HTMLElement;

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessability requirements", async () => {
      const { menu } = await createMenu();
      await expect(menu).to.be.accessible();
    });

    it("meets accessability requirements with checkbox and radio items", async () => {
      await expect((await createMenu("checkbox")).menu).to.be.accessible();
      await expect((await createMenu("radio")).menu).to.be.accessible();
    });

    it("meets contrast requirements", async () => {
      const { menu, items } = await createMenu();
      await contrastTest("Dropdown menu item label", row(items[0]), menu);
    });

    it("exposes the role for each type", async () => {
      expect(subject).to.have.attribute("tabindex", "0");
      for (const [type, role] of [
        ["default", "menuitem"],
        ["checkbox", "menuitemcheckbox"],
        ["radio", "menuitemradio"]
      ] as const) {
        subject.type = type;
        await elementUpdated(subject);
        expect(subject).to.have.attribute("role", role);
      }
    });

    it("sets aria-checked for checkbox/radio and aria-disabled when disabled", async () => {
      expect(subject).to.not.have.attribute("aria-checked");
      subject.type = "checkbox";
      subject.checked = true;
      subject.disabled = true;
      await elementUpdated(subject);
      expect(subject).to.have.attribute("aria-checked", "true");
      expect(subject).to.have.attribute("aria-disabled", "true");
    });
  });

  describe("Content", () => {
    it("renders the given text", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(text);
    });

    it("renders an icon with the correct name with the 'default' type", async () => {
      const icon = await fixture(html`<zeta-icon slot="icon">star</zeta-icon>`);
      subject.appendChild(icon);
      await elementUpdated(subject);

      await expect(getSlottedIconName(subject)).to.equal("star");
    });

    it("renders a non-focusable checkbox or radio for those types", async () => {
      subject.type = "checkbox";
      await elementUpdated(subject);
      const checkbox = subject.shadowRoot?.querySelector("zeta-checkbox");
      expect(checkbox).to.exist;
      expect(checkbox).to.have.attribute("inert");

      subject.type = "radio";
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("zeta-radio-button")).to.have.attribute("inert");
    });

    it("sets the rounded attribute correctly", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      await expect(subject.rounded).to.equal(true);
    });

    it("sets the disabled attribute correctly", async () => {
      subject.disabled = true;
      await elementUpdated(subject);

      await expect(subject.disabled).to.equal(true);
    });
  });

  describe("Dimensions", () => {
    it("has the menu item height and padding", async () => {
      const style = getComputedStyle(row(subject));
      await expect(row(subject).getBoundingClientRect().height).to.equal(getCssVarPxValue(subject, "--control-md"));
      await expect(parseFloat(style.paddingLeft)).to.equal(getCssVarPxValue(subject, "--space-md"));
    });

    it("has no leading padding for checkbox rows", async () => {
      subject.type = "checkbox";
      await elementUpdated(subject);
      await expect(getComputedStyle(row(subject)).paddingLeft).to.equal("0px");
    });
  });

  describe("Styling", () => {
    it("sets the correct colors when not disabled", async () => {
      const style = getComputedStyle(row(subject));

      await expect(style.color).to.equal(getCssVarColorValue(subject, "--interactive-neutral-foreground-default"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-ghost-background-default"));
    });

    it("sets the correct colors when disabled", async () => {
      subject.disabled = true;
      await elementUpdated(subject);

      const style = getComputedStyle(row(subject));

      await expect(style.color).to.equal(getCssVarColorValue(subject, "--interactive-neutral-foreground-disabled"));
      await expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-ghost-background-disabled"));
    });

    it("sets the selected background when checked", async () => {
      disableShadowDOMTransitions(subject);
      subject.checked = true;
      await elementUpdated(subject);

      await expect(getComputedStyle(row(subject)).backgroundColor).to.equal(getCssVarColorValue(subject, "--interactive-ghost-background-selected"));
    });

    it("draws the focus ring inside the row", async () => {
      subject.focus();
      await KeyboardActions.press("Shift");
      const style = getComputedStyle(row(subject));
      await expect(style.outlineColor).to.equal(getCssVarColorValue(subject, "--border-focus"));
      await expect(style.outlineWidth).to.equal(getCssVarValue(subject, "--stroke-thin"));
      await expect(parseFloat(style.outlineOffset)).to.equal(-getCssVarPxValue(subject, "--stroke-thin"));
    });

    it("sets the correct border radius when rounded is true", async () => {
      subject.rounded = true;
      await elementUpdated(subject);

      await expect(getComputedStyle(row(subject)).borderRadius).to.equal(getCssVarValue(subject, "--radius-sm"));
    });

    it("sets the correct border radius when rounded is false", async () => {
      subject.rounded = false;
      await elementUpdated(subject);

      await expect(getComputedStyle(row(subject)).borderRadius).to.equal(getCssVarValue(subject, "--radius-none"));
    });
  });

  describe("Interaction", () => {
    it("activates on Enter and Space", async () => {
      let clicks = 0;
      subject.addEventListener("click", () => clicks++);
      subject.focus();
      await KeyboardActions.press("Enter");
      await KeyboardActions.press("Space");
      await expect(clicks).to.equal(2);
    });

    it("moves focus between items with arrow keys, Home and End", async () => {
      const { items } = await createMenu();
      items[0].focus();
      await KeyboardActions.press("ArrowDown");
      await expect(document.activeElement).to.equal(items[1]);
      await KeyboardActions.press("End");
      await expect(document.activeElement).to.equal(items[2]);
      await KeyboardActions.press("ArrowDown");
      await expect(document.activeElement).to.equal(items[0]);
      await KeyboardActions.press("ArrowUp");
      await expect(document.activeElement).to.equal(items[2]);
      await KeyboardActions.press("Home");
      await expect(document.activeElement).to.equal(items[0]);
      // roving tabindex
      expect(items[0]).to.have.attribute("tabindex", "0");
      expect(items[2]).to.have.attribute("tabindex", "-1");
    });

    it("toggles a checkbox item and fires a bubbling, composed change event", async () => {
      const { items } = await createMenu("checkbox");
      setTimeout(() => items[0].click());
      const event = await oneEvent(items[0], "change");
      expect(event.bubbles).to.be.true;
      expect(event.composed).to.be.true;
      expect(items[0].checked).to.be.true;
      items[0].click();
      expect(items[0].checked).to.be.false;
    });

    it("selects one radio item and clears the others", async () => {
      const { items } = await createMenu("radio");
      items[0].click();
      items[2].click();
      expect(items[0].checked).to.be.false;
      expect(items[2].checked).to.be.true;
    });

    it("does not fire change for programmatic changes", async () => {
      let changes = 0;
      subject.type = "checkbox";
      subject.addEventListener("change", () => changes++);
      subject.checked = true;
      await elementUpdated(subject);
      await expect(changes).to.equal(0);
    });

    it("does not activate when disabled", async () => {
      const { items } = await createMenu("checkbox");
      let clicks = 0;
      items[1].addEventListener("click", () => clicks++);
      items[1].click();
      await expect(clicks).to.equal(0);
      expect(items[1].checked).to.be.false;
    });
  });
});
