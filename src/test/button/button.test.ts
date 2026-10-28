import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
import "../../components/button/button.js";
import "../../index.css";
import "@zebra-fed/zeta-icons/index.css";
import { getCssVarValue } from "../utils.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const buttonText = "Button";
const sizes = ["small", "medium", "large"];
const flavors = ["primary", "positive", "negative", "outline", "outline-subtle", "text", "subtle"];

const px = (el: Element, token: string) => parseFloat(getCssVarValue(el, token));

describe("zeta-button", () => {
  let subject: ZetaButton;

  const createComponent = (template = `<zeta-button>${buttonText}</zeta-button>`) => {
    // prettier-ignore
    return fixture<ZetaButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    sizes.forEach(size => {
      flavors.forEach(flavor => {
        it(`meets contrast requirements for the ${flavor} flavor, ${size}`, async () => {
          subject.setAttribute("flavor", flavor);
          subject.setAttribute("size", size);
          await elementUpdated(subject);

          const buttonEl = subject.shadowRoot!.querySelector("button")!;
          await contrastTest(`Button ${flavor} ${size}`, buttonEl, buttonEl);
        });
      });
    });

    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    // Placed in Content because the Styling block is skipped.
    it("applies gradient text for the text-gradient flavor", async () => {
      const button = await createComponent(`<zeta-button flavor="text-gradient">${buttonText}</zeta-button>`);
      const slot = button.shadowRoot!.querySelector("button > slot")!;
      expect(getComputedStyle(slot).backgroundClip).to.equal("text");
      expect(getComputedStyle(button.shadowRoot!.querySelector("button")!).backgroundImage).to.equal("none");
    });

    it("should render the correct text within the button", () => {
      expect(subject.lastChild?.nodeValue).to.equal(buttonText);
    });

    [
      { name: "no icons", attrs: {}, expected: [] },
      { name: "a leading icon", attrs: { leadingIcon: "star" }, expected: ["star"] },
      { name: "a trailing icon", attrs: { trailingIcon: "check" }, expected: ["check"] },
      { name: "leading and trailing icons", attrs: { leadingIcon: "star", trailingIcon: "check" }, expected: ["star", "check"] }
    ].forEach(({ name, attrs, expected }) => {
      it(`should render ${name}`, async () => {
        Object.entries(attrs).forEach(([attr, value]) => subject.setAttribute(attr, value));
        await elementUpdated(subject);

        const icons = [...subject.shadowRoot!.querySelectorAll("zeta-icon")].map(icon => icon.getAttribute("name"));
        expect(icons).to.deep.equal(expected);
      });
    });
  });

  describe("Dimensions", () => {
    [
      { size: "small", height: "--control-sm", padding: "--space-md", gap: "--space-xs" },
      { size: "medium", height: "--control-md", padding: "--space-md", gap: "--space-sm" },
      { size: "large", height: "--control-lg", padding: "--space-lg", gap: "--space-sm" }
    ].forEach(({ size, height, padding, gap }) => {
      it(`renders ${size} button with correct dimensions`, async () => {
        subject.setAttribute("size", size);
        await elementUpdated(subject);

        // Text width depends on font rendering, so measure it rather than hardcoding it.
        const range = document.createRange();
        range.selectNodeContents(subject);
        const textWidth = range.getBoundingClientRect().width;
        const expectedHeight = px(subject, height);
        const expectedWidth = textWidth + 2 * px(subject, padding);

        const buttonNoIcons = subject.getBoundingClientRect();
        expect(buttonNoIcons.height).to.equal(expectedHeight);
        expect(buttonNoIcons.width).to.be.closeTo(expectedWidth, 1);

        subject.setAttribute("leadingIcon", "star");
        subject.setAttribute("trailingIcon", "star");
        await elementUpdated(subject);

        const buttonWithIcons = subject.getBoundingClientRect();
        expect(buttonWithIcons.height).to.equal(expectedHeight);
        expect(buttonWithIcons.width).to.be.closeTo(expectedWidth + 2 * (px(subject, "--control-icon-md") + px(subject, gap)), 1);
      });
    });
  });

  describe("Styling", () => {
    const iconColor = async (template: string, token: string) => {
      const button = await createComponent(template);
      const testColor = "rgb(1, 2, 3)";
      button.style.setProperty(token, testColor);
      await elementUpdated(button);
      expect(getComputedStyle(button.shadowRoot!.querySelector("zeta-icon")!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    };

    [
      { flavor: "primary", token: "--interactive-primary-foreground-default" },
      { flavor: "outline", token: "--interactive-ghost-foreground-default" },
      { flavor: "subtle", token: "--foreground-primary" }
    ].forEach(({ flavor, token }) => {
      it(`should apply ${token} as the icon color for ${flavor} flavor`, () =>
        iconColor(`<zeta-button flavor="${flavor}" leadingIcon="add">${buttonText}</zeta-button>`, token));
    });

    [
      { state: "enabled", attrs: "", bg: "--button-color", text: "--button-text-color", icon: "--icon-button-icon-color" },
      {
        state: "disabled",
        attrs: "disabled",
        bg: "--button-disabled-color",
        text: "--button-disabled-text-color",
        icon: "--icon-button-icon-color-disabled"
      }
    ].forEach(({ state, attrs, bg, text, icon }) => {
      it(`should apply custom background and text color variables when ${state}`, async () => {
        const button = await createComponent(`<zeta-button flavor="custom" ${attrs}>${buttonText}</zeta-button>`);
        const bgColor = "rgb(10, 20, 30)";
        const textColor = "rgb(200, 210, 220)";
        button.style.setProperty(bg, bgColor);
        button.style.setProperty(text, textColor);
        await elementUpdated(button);

        const buttonEl = button.shadowRoot!.querySelector("button")!;
        expect(getComputedStyle(buttonEl).backgroundColor).to.equal(bgColor);
        expect(getComputedStyle(buttonEl).color).to.equal(textColor);
      });

      it(`should apply custom icon color variable when ${state} via ${icon}`, () =>
        iconColor(`<zeta-button flavor="custom" leadingIcon="add" ${attrs}>${buttonText}</zeta-button>`, icon));
    });
  });

  describe("Interaction", () => {
    [
      { name: "should call a click handler function when clicked", disabled: false, expected: 1 },
      { name: "should not call click handler when button is disabled", disabled: true, expected: 0 }
    ].forEach(({ name, disabled, expected }) => {
      it(name, () => {
        const events: Event[] = [];
        subject.disabled = disabled;
        subject.addEventListener("click", e => events.push(e));
        subject.click();

        expect(events.length).to.equal(expected);
        events.forEach(e => expect(e.type).to.equal("click"));
      });
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaButton;
  let input: HTMLInputElement;

  beforeEach(async () => {
    const form = await fixture<HTMLFormElement>(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-button type="reset"></zeta-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']")!;
    button = form.querySelector("zeta-button[type='reset']")!;
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
