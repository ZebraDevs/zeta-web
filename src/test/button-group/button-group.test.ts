import { assert, elementUpdated, fixture, html } from "@open-wc/testing";
import type { ZetaButtonGroup } from "../../components/button-group/button-group.js";
import type { ZetaButtonGroupItem } from "../../components/button-group/button-group-item/button-group-item.js";
import "../../components/button-group/button-group.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";
import { getCssVarColorValue, getCssVarPxValue } from "../utils.js";

const setup = async (size?: string, rounded = true) =>
  fixture<ZetaButtonGroup>(html`
    <zeta-button-group size=${size ?? "medium"} .rounded=${rounded}>
      <zeta-button-group-item>One</zeta-button-group-item>
      <zeta-button-group-item>Two</zeta-button-group-item>
      <zeta-button-group-item>Three</zeta-button-group-item>
    </zeta-button-group>
  `);

const itemsOf = (el: ZetaButtonGroup) => Array.from(el.querySelectorAll("zeta-button-group-item"));
const buttonOf = (item: ZetaButtonGroupItem) => item.shadowRoot!.querySelector("button")!;

describe("zeta-button-group", () => {
  describe("Accessibility", () => {
    it("has role group", async () => {
      const el = await setup();
      assert.equal(el.getAttribute("role"), "group");
    });

    it("keeps a consumer provided role", async () => {
      const el = await fixture<ZetaButtonGroup>(html`<zeta-button-group role="toolbar"></zeta-button-group>`);
      assert.equal(el.getAttribute("role"), "toolbar");
    });

    it("meets contrast requirements for the default flavor", async () => {
      const el = await setup();
      const button = buttonOf(itemsOf(el)[0]);
      await contrastTest("default item", button, button);
    });

    it("meets contrast requirements for the inverse flavor", async () => {
      const item = await fixture<ZetaButtonGroupItem>(html`<zeta-button-group-item flavor="inverse">Label</zeta-button-group-item>`);
      const button = buttonOf(item);
      await contrastTest("inverse item", button, button);
    });
  });

  describe("Content", () => {
    it("hides children that are not button group items", async () => {
      const el = await fixture<ZetaButtonGroup>(html`
        <zeta-button-group>
          <zeta-button-group-item>One</zeta-button-group-item>
          <span>hidden</span>
        </zeta-button-group>
      `);
      assert.equal(getComputedStyle(el.querySelector("span")!).display, "none");
    });
  });

  describe("Dimensions", () => {
    const heights = { small: "--control-sm", medium: "--control-md", large: "--control-lg" };
    const paddings = { small: "--space-md", medium: "--space-md", large: "--space-lg" };

    for (const size of ["small", "medium", "large"] as const) {
      it(`applies ${size} size to every item`, async () => {
        const el = await setup(size);
        for (const item of itemsOf(el)) {
          assert.equal(item.size, size);
          assert.equal(item.getBoundingClientRect().height, getCssVarPxValue(el, heights[size]));
          assert.equal(parseFloat(getComputedStyle(buttonOf(item)).paddingLeft), getCssVarPxValue(el, paddings[size]));
        }
      });
    }

    it("updates item size when the group size changes", async () => {
      const el = await setup("medium");
      el.size = "large";
      await elementUpdated(el);
      itemsOf(el).forEach(item => assert.equal(item.size, "large"));
    });

    it("applies size to items added later", async () => {
      const el = await setup("small");
      const item = document.createElement("zeta-button-group-item");
      el.appendChild(item);
      await elementUpdated(el);
      await new Promise(r => setTimeout(r));
      assert.equal(item.size, "small");
    });
  });

  describe("Styling", () => {
    it("rounds only the outer corners when rounded", async () => {
      const el = await setup("medium", true);
      const [first, middle, last] = itemsOf(el).map(i => getComputedStyle(buttonOf(i)));
      const radius = `${getCssVarPxValue(el, "--radius-sm")}px`;
      assert.equal(first.borderTopLeftRadius, radius);
      assert.equal(first.borderTopRightRadius, "0px");
      assert.equal(middle.borderTopLeftRadius, "0px");
      assert.equal(middle.borderTopRightRadius, "0px");
      assert.equal(last.borderTopRightRadius, radius);
    });

    it("has square corners when not rounded", async () => {
      const el = await setup("medium", false);
      itemsOf(el).forEach(i => assert.equal(getComputedStyle(buttonOf(i)).borderTopLeftRadius, "0px"));
    });

    it("removes the right border between items", async () => {
      const el = await setup();
      const [first, , last] = itemsOf(el).map(i => getComputedStyle(buttonOf(i)));
      assert.equal(first.borderRightWidth, "0px");
      assert.equal(parseFloat(last.borderRightWidth), getCssVarPxValue(el, "--stroke-thin"));
    });

    it("uses neutral interactive tokens by default", async () => {
      const el = await setup();
      const item = itemsOf(el)[0];
      const style = getComputedStyle(buttonOf(item));
      assert.equal(style.backgroundColor, getCssVarColorValue(item, "--interactive-neutral-background-default"));
      assert.equal(style.color, getCssVarColorValue(item, "--interactive-neutral-foreground-default"));
      assert.equal(style.borderLeftColor, getCssVarColorValue(item, "--interactive-neutral-border-default"));
    });

    it("uses inverse interactive tokens for the inverse flavor", async () => {
      const item = await fixture<ZetaButtonGroupItem>(html`<zeta-button-group-item flavor="inverse">Label</zeta-button-group-item>`);
      const style = getComputedStyle(buttonOf(item));
      assert.equal(style.backgroundColor, getCssVarColorValue(item, "--interactive-inverse-background-default"));
      assert.equal(style.color, getCssVarColorValue(item, "--interactive-inverse-foreground-default"));
    });

    it("uses disabled tokens when disabled", async () => {
      const item = await fixture<ZetaButtonGroupItem>(html`<zeta-button-group-item disabled>Label</zeta-button-group-item>`);
      const style = getComputedStyle(buttonOf(item));
      assert.equal(style.backgroundColor, getCssVarColorValue(item, "--interactive-neutral-background-disabled"));
      assert.equal(style.color, getCssVarColorValue(item, "--interactive-neutral-foreground-disabled"));
    });
  });

  describe("Interaction", () => {
    it("fires click on an enabled item", async () => {
      const el = await setup();
      let clicked = false;
      const item = itemsOf(el)[0];
      item.addEventListener("click", () => (clicked = true));
      buttonOf(item).click();
      assert.isTrue(clicked);
    });

    it("disables the inner button when disabled", async () => {
      const item = await fixture<ZetaButtonGroupItem>(html`<zeta-button-group-item disabled>Label</zeta-button-group-item>`);
      assert.isTrue(buttonOf(item).disabled);
    });
  });
});
