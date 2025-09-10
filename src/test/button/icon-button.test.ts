import { fixture, html, expect, elementUpdated, unsafeStatic } from "@open-wc/testing";
import type { ZetaIconButton } from "../../components/button/icon-button/icon-button.js";
import { getCssVarColorValue, toRGB, getSlotText } from "../utils.js";
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
    flavors.map(flavor => {
      it(`meets contrast requirements for the ${flavor} flavor`, async () => {
        await elementUpdated(subject);
        // Check color contrast between text and background
        const buttonEl = subject.shadowRoot?.querySelector("button");
        if (buttonEl) {
          await contrastTest(`Button ${flavor} `, buttonEl, buttonEl);
        }
      });
      it(`meets aria requirements for the ${flavor} flavor`, async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  describe("Content", () => {
    it("should render the correct icon", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      await expect(getSlotText(iconButton.shadowRoot!.querySelector("zeta-icon")!)).to.equal(iconName);
    });
  });

  describe("Dimensions", () => {
    it("renders small button with correct dimensions", async () => {
      subject.setAttribute("icon", "star");
      subject.setAttribute("size", "small");
      await elementUpdated(subject);

      const iconButton = subject.getBoundingClientRect();

      await expect(iconButton.height).to.equal(28);
      await expect(iconButton.width).to.equal(28);
    });
    it("renders medium button with correct dimensions", async () => {
      subject.setAttribute("icon", "star");
      subject.setAttribute("size", "medium");
      await elementUpdated(subject);

      const iconButton = subject.getBoundingClientRect();

      await expect(iconButton.height).to.equal(40);
      await expect(iconButton.width).to.equal(40);
    });
    it("renders large button with correct dimensions", async () => {
      subject.setAttribute("icon", "star");
      subject.setAttribute("size", "large");
      await elementUpdated(subject);

      const iconButton = subject.getBoundingClientRect();

      await expect(iconButton.height).to.equal(48);
      await expect(iconButton.width).to.equal(48);
    });
  });

  describe("Styling", () => {
    it("should display correct icon color when disabled", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("disabled", "true");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--main-disabled"));
    });

    it("should display correct icon color for primary flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "primary");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--state-default-enabled"));
    });

    it("should display correct icon color for negative flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "negative");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--state-default-enabled"));
    });

    it("should display correct icon color for text flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "text");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--main-primary"));
    });

    it("should display correct icon color for outline-subtle flavor", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      iconButton.setAttribute("flavor", "outline-subtle");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      await expect(getComputedStyle(icon!).color).to.equal(getCssVarColorValue(icon!, "--main-default"));
    });

    flavors.map(flavor => {
      it(`button should have correct background color for the ${flavor} flavor`, async () => {
        const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

        iconButton.setAttribute("flavor", flavor);
        const button: Element | null | undefined = iconButton.shadowRoot?.querySelector("button");
        const buttonColor = getComputedStyle(button!).backgroundColor;
        let finalFlavor;
        switch (flavor) {
          case "outline":
          case "outline-subtle":
          case "text":
          case "basic":
          case "basic-negative":
            finalFlavor = "--surface-default";
            break;
          default:
            finalFlavor = `--state-${flavor}-enabled`;
        }
        await expect(buttonColor).to.equal(getCssVarColorValue(button!, finalFlavor));
      });
    });

    it("should render the button with the correct color when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-color", testColor);
      const button: Element | null | undefined = iconButton.shadowRoot?.querySelector("button");
      const buttonColor = getComputedStyle(button!).backgroundColor;
      await expect(buttonColor).to.equal(toRGB(testColor));
    });

    it("should render the icon with the correct color when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-icon-color", testColor);
      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      const iconColor = getComputedStyle(icon!).color;
      await expect(iconColor).to.equal(toRGB(testColor));
    });

    it("should render the icon with the correct color when disabled when set by CSS Variable", async () => {
      const iconButton: ZetaIconButton = await fixture(html`<zeta-icon-button>${iconName}</zeta-icon-button>`);

      const testColor = "#BADA55";
      iconButton.style.setProperty("--icon-button-icon-color-disabled", testColor);
      iconButton.setAttribute("disabled", "true");
      await elementUpdated(iconButton);

      const icon: Element | null | undefined = iconButton.shadowRoot?.querySelector("zeta-icon");
      const iconColor = getComputedStyle(icon!).color;
      await expect(iconColor).to.equal(toRGB(testColor));
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-icon-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaIconButton;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    form = await fixture(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-icon-button type="reset">reset</zeta-icon-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']") as HTMLInputElement;
    button = form.querySelector("zeta-icon-button[type='reset']") as ZetaIconButton;
  });

  // describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should reset forms", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button?.click();
      await expect(input?.value).to.equal("");
    });

    it("should not reset forms if disabled via JS", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button.disabled = true;
      button?.click();
      await expect(input?.value).to.equal(TEST_STRING);
    });

    it("should not reset forms if disabled via DOM", async () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button.setAttribute("disabled", "");
      button?.click();
      await expect(input?.value).to.equal(TEST_STRING);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
