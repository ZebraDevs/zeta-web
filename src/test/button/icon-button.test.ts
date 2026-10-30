import { fixture, html, expect, elementUpdated, unsafeStatic } from "@open-wc/testing";
import type { ZetaIconButton } from "../../components/button/icon-button/icon-button.js";
import { getCssVarColorValue, getCssVarValue, toRGB, getSlotText } from "../utils.js";
import "../../components/button/icon-button/icon-button.js";
import "../../index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const flavors = ["primary", "positive", "negative", "outline", "outline-subtle", "text", "subtle"];
const iconName = "star";

describe("zeta-icon-button", () => {
  let subject: ZetaIconButton;

  const createComponent = (template = `<zeta-icon-button>${iconName}</zeta-icon-button>`) => {
    // prettier-ignore
    return fixture<ZetaIconButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    flavors.forEach(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        const buttonEl = subject.shadowRoot!.querySelector("button")!;
        await contrastTest(`Button ${flavor} `, buttonEl, buttonEl);
      });
    });

    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("should render the correct icon", () => {
      expect(getSlotText(subject.shadowRoot!.querySelector("zeta-icon")!)).to.equal(iconName);
    });
  });

  describe("Dimensions", () => {
    [
      { size: "small", token: "--control-sm" },
      { size: "medium", token: "--control-md" },
      { size: "large", token: "--control-lg" }
    ].forEach(({ size, token }) => {
      it(`renders ${size} button with correct dimensions`, async () => {
        subject.setAttribute("size", size);
        await elementUpdated(subject);

        const expected = parseFloat(getCssVarValue(subject, token));
        const iconButton = subject.getBoundingClientRect();
        expect(iconButton.height).to.equal(expected);
        expect(iconButton.width).to.equal(expected);
      });
    });
  });

  describe("Styling", () => {
    [
      { flavor: "primary", attrs: "disabled", icon: "--interactive-primary-foreground-disabled" },
      { flavor: "primary", attrs: "", icon: "--interactive-primary-foreground-default", background: "--interactive-primary-background-default" },
      { flavor: "positive", attrs: "", icon: "--interactive-primary-foreground-default", background: "--interactive-positive-background-default" },
      { flavor: "negative", attrs: "", icon: "--interactive-primary-foreground-default", background: "--interactive-destructive-background-default" },
      { flavor: "outline", attrs: "", icon: "--interactive-ghost-foreground-default", background: "--interactive-neutral-background-default" },
      { flavor: "text", attrs: "", icon: "--interactive-ghost-foreground-default", background: "--interactive-neutral-background-default" },
      { flavor: "outline-subtle", attrs: "", icon: "--interactive-neutral-foreground-default", background: "--interactive-neutral-background-default" },
      { flavor: "subtle", attrs: "", icon: "--interactive-neutral-foreground-default", background: "--interactive-neutral-background-default" }
    ].forEach(({ flavor, attrs, icon, background }) => {
      const state = attrs || "enabled";

      it(`should display ${icon} as the icon color for ${flavor} flavor when ${state}`, async () => {
        const iconButton = await createComponent(`<zeta-icon-button flavor="${flavor}" ${attrs}>${iconName}</zeta-icon-button>`);
        const iconEl = iconButton.shadowRoot!.querySelector("zeta-icon")!;
        expect(getComputedStyle(iconEl).color).to.equal(getCssVarColorValue(iconEl, icon));
      });

      if (background) {
        it(`button should have ${background} as the background color for the ${flavor} flavor`, async () => {
          const iconButton = await createComponent(`<zeta-icon-button flavor="${flavor}">${iconName}</zeta-icon-button>`);
          const buttonEl = iconButton.shadowRoot!.querySelector("button")!;
          expect(getComputedStyle(buttonEl).backgroundColor).to.equal(getCssVarColorValue(buttonEl, background));
        });
      }
    });

    [
      { attrs: "", token: "--button-color", part: "button", property: "backgroundColor" },
      { attrs: "disabled", token: "--button-disabled-color", part: "button", property: "backgroundColor" },
      { attrs: "", token: "--icon-button-icon-color", part: "zeta-icon", property: "color" },
      { attrs: "disabled", token: "--icon-button-icon-color-disabled", part: "zeta-icon", property: "color" }
    ].forEach(({ attrs, token, part, property }) => {
      it(`should render the custom ${part} with the correct ${property} ${attrs ? "when disabled " : ""}via ${token}`, async () => {
        const iconButton = await createComponent(`<zeta-icon-button flavor="custom" ${attrs}>${iconName}</zeta-icon-button>`);
        const testColor = "#55b7da";
        iconButton.style.setProperty(token, testColor);
        await elementUpdated(iconButton);

        const el = iconButton.shadowRoot!.querySelector(part)!;
        expect(getComputedStyle(el)[property as "color" | "backgroundColor"]).to.equal(toRGB(testColor));
      });
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-icon-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaIconButton;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-icon-button type="reset">reset</zeta-icon-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']")!;
    button = form.querySelector("zeta-icon-button[type='reset']")!;
  });

  // describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    [
      { name: "should reset forms", disable: () => {}, expected: "" },
      { name: "should not reset forms if disabled via JS", disable: () => (button.disabled = true), expected: TEST_STRING },
      { name: "should not reset forms if disabled via DOM", disable: () => button.setAttribute("disabled", ""), expected: TEST_STRING }
    ].forEach(({ name, disable, expected }) => {
      it(name, () => {
        expect(input.value).to.be.empty;
        input.value = TEST_STRING;
        disable();
        button.click();
        expect(input.value).to.equal(expected);
      });
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
