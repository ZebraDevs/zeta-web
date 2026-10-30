import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaTileButton } from "../../components/button/tile-button/tile-button.js";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import "../../components/button/tile-button/tile-button.js";

import "../../index.css";
import { getCssVarColorValue, getCssVarValue, getSlotText, KeyboardActions, MouseActions } from "../utils.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const longText = "12345678910111213";

describe("zeta-tile-button", () => {
  let subject: ZetaTileButton;

  const createComponent = (template = `<zeta-tile-button icon="star">Button</zeta-tile-button>`) => {
    // prettier-ignore
    return fixture<ZetaTileButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("meets contrast requirements for outline-subtle flavor", async () => {
      const srButton = subject.shadowRoot!.querySelector("button")!;
      await contrastTest(`Button outline-subtle`, srButton, srButton);
    });
  });

  describe("Content", () => {
    [
      { name: "renders an icon", icon: "add", expected: "add" },
      { name: "renders a default icon if none is provided", icon: undefined, expected: "star" }
    ].forEach(({ name, icon, expected }) => {
      it(name, async () => {
        subject.icon = icon as ZetaIconName | undefined;
        await elementUpdated(subject);
        expect(subject.shadowRoot!.querySelector("zeta-icon")!.name).to.equal(expected);
      });
    });

    [
      { name: "renders a label", text: "Button" },
      { name: "text stays empty when no text is given", text: "" }
    ].forEach(({ name, text }) => {
      it(name, async () => {
        subject.textContent = text;
        await elementUpdated(subject);
        expect(getSlotText(subject)).to.equal(text);
      });
    });

    it("truncates the label when text is longer than button width", async () => {
      subject.textContent = longText;
      await elementUpdated(subject);
      const srTextSpan = subject.shadowRoot!.querySelector<HTMLElement>(".button-text")!;
      expect(srTextSpan.offsetWidth).to.be.lessThan(srTextSpan.scrollWidth);
      expect(getComputedStyle(srTextSpan).textOverflow).to.equal("ellipsis");
      expect(getComputedStyle(srTextSpan).overflow).to.equal("hidden");
    });
  });

  describe("Dimensions", () => {
    [
      { name: "short text", text: "1" },
      { name: "text longer than the button width", text: longText },
      { name: "no text", text: "" }
    ].forEach(({ name, text }) => {
      it(`is a fixed square size with ${name}`, async () => {
        subject.textContent = text;
        await elementUpdated(subject);
        const srButton = subject.shadowRoot!.querySelector("button")!;
        // Tile size is (2 * --space-2xl) + --space-lg
        const expected = `${2 * parseFloat(getCssVarValue(srButton, "--space-2xl")) + parseFloat(getCssVarValue(srButton, "--space-lg"))}px`;
        expect(getComputedStyle(srButton).width).to.equal(expected);
        expect(getComputedStyle(srButton).height).to.equal(expected);
      });
    });
  });

  describe("Styling", () => {
    const borderColor = (el: Element) => getComputedStyle(el).boxShadow.match(/rgb[a]?\([^)]+\)/)?.[0] ?? "rgb(0,0,0)";

    [
      {
        name: "background",
        part: "button",
        disabled: false,
        token: "--interactive-neutral-background-default",
        read: (el: Element) => getComputedStyle(el).backgroundColor
      },
      { name: "text", part: "button", disabled: false, token: "--interactive-neutral-foreground-default", read: (el: Element) => getComputedStyle(el).color },
      {
        name: "icon",
        part: "zeta-icon",
        disabled: false,
        token: "--interactive-neutral-foreground-default",
        read: (el: Element) => getComputedStyle(el).color
      },
      { name: "border", part: "button", disabled: false, token: "--interactive-neutral-border-default", read: borderColor },
      {
        name: "background",
        part: "button",
        disabled: true,
        token: "--interactive-neutral-background-disabled",
        read: (el: Element) => getComputedStyle(el).backgroundColor
      },
      { name: "text", part: "button", disabled: true, token: "--interactive-neutral-foreground-disabled", read: (el: Element) => getComputedStyle(el).color },
      { name: "icon", part: "zeta-icon", disabled: true, token: "--interactive-neutral-foreground-disabled", read: (el: Element) => getComputedStyle(el).color }
    ].forEach(({ name, part, disabled, token, read }) => {
      it(`has ${token} ${name} colour when ${disabled ? "disabled" : "enabled"}`, async () => {
        const el = subject.shadowRoot!.querySelector(part)!;
        if (disabled) {
          subject.setAttribute("disabled", "true");
          await elementUpdated(subject);
          // Wait for the colour transition to finish
          await new Promise(resolve => setTimeout(resolve, 350));
        }
        expect(read(el)).to.equal(getCssVarColorValue(el, token));
      });
    });
  });

  describe("Interaction", () => {
    it("calls onClick when clicked", async () => {
      let clicks = 0;
      subject.addEventListener("click", () => clicks++);
      await MouseActions.click(subject);
      expect(clicks).to.equal(1);
    });

    [
      {
        name: "hovered",
        token: "--interactive-neutral-background-hover",
        act: (el: HTMLElement) => MouseActions.hover(el),
        read: (el: Element) => getComputedStyle(el).backgroundColor
      },
      {
        name: "focused",
        token: "--border-focus",
        act: () => KeyboardActions.press("Tab"),
        read: (el: Element) => getComputedStyle(el).outlineColor
      }
    ].forEach(({ name, token, act, read }) => {
      it(`has the correct style when ${name}`, async () => {
        const srButton = subject.shadowRoot!.querySelector("button")!;
        await act(srButton);
        expect(read(srButton)).to.equal(getCssVarColorValue(srButton, token));
      });
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
