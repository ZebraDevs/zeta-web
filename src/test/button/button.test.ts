import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
import "../../components/button/button.js";
import "../../index.css";
import "@zebra-fed/zeta-icons/index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const buttonText = "Button";
const flavors = ["primary", "positive", "negative", "outline", "outline-subtle", "text", "subtle"];

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
    ["small", "medium", "large"].forEach(size => {
      flavors.forEach(flavor => {
        it(`meets contrast requirements for the ${flavor} flavor, ${size}`, async () => {
          subject.setAttribute("flavor", flavor);
          subject.setAttribute("size", size);

          await elementUpdated(subject);

          // Check color contrast between text and background
          const buttonEl = subject.shadowRoot?.querySelector("button");
          if (buttonEl) {
            await contrastTest(`Button ${flavor} ${size}`, buttonEl, buttonEl);
          }
        });
        it("meets aria requirements", () => {
          expect(subject).to.be.accessible();
          expect(subject).shadowDom.to.be.accessible();
        });
      });
    });
  });

  describe("Content", () => {
    // Placed in Content because the Styling block is skipped.
    it("applies gradient text for the text-gradient flavor", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="text-gradient">Button</zeta-button>`);
      const slot = button.shadowRoot!.querySelector("button > slot")!;
      expect(getComputedStyle(slot).backgroundClip).to.equal("text");
      expect(getComputedStyle(button.shadowRoot!.querySelector("button")!).backgroundImage).to.equal("none");
    });

    it("should render the correct text within the button", () => {
      expect(subject.lastChild?.nodeValue).to.equal(buttonText);
    });

    it("should render a leading icon when leadingIcon property is set", async () => {
      subject.setAttribute("leadingIcon", "star");
      await elementUpdated(subject);

      const leadingIcon = subject.shadowRoot?.querySelector("zeta-icon:first-of-type");
      expect(leadingIcon).to.exist;
      expect(leadingIcon?.getAttribute("name")).to.equal("star");
    });

    it("should render a trailing icon when trailingIcon property is set", async () => {
      subject.setAttribute("trailingIcon", "check");
      await elementUpdated(subject);

      const trailingIcon = subject.shadowRoot?.querySelector("zeta-icon:last-of-type");
      expect(trailingIcon).to.exist;
      expect(trailingIcon?.getAttribute("name")).to.equal("check");
    });

    it("should render both leading and trailing icons when both properties are set", async () => {
      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "check");
      await elementUpdated(subject);

      const icons = subject.shadowRoot?.querySelectorAll("zeta-icon");
      expect(icons?.length).to.equal(2);
      expect(icons?.[0].getAttribute("name")).to.equal("star");
      expect(icons?.[1].getAttribute("name")).to.equal("check");
    });

    it("should not render icons when icon properties are not set", () => {
      const icons = subject.shadowRoot?.querySelectorAll("zeta-icon");
      expect(icons?.length).to.equal(0);
    });
  });

  describe("Dimensions", () => {
    it("renders small button with correct dimensions", async () => {
      subject.setAttribute("size", "small");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      expect(buttonNoIcons.height).to.equal(32);
      expect(Math.ceil(buttonNoIcons.width)).to.be.within(51, 57); // Should be 54, but allow tolerance for font rendering differences

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      expect(buttonWithIcons.height).to.equal(32);
      expect(Math.ceil(buttonWithIcons.width)).to.be.within(91, 97); // Should be 94, but allow tolerance for font rendering differences
    });
    it("renders medium button with correct dimensions", async () => {
      subject.setAttribute("size", "medium");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      expect(buttonNoIcons.height).to.equal(40);
      expect(Math.ceil(buttonNoIcons.width)).to.be.within(71, 77); // Should be 74, but allow tolerance for font rendering differences

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      expect(buttonWithIcons.height).to.equal(40);
      expect(Math.ceil(buttonWithIcons.width)).to.be.within(127, 133); // Should be 130, but allow tolerance for font rendering differences
    });
    it("renders large button with correct dimensions", async () => {
      subject.setAttribute("size", "large");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      expect(buttonNoIcons.height).to.equal(48);
      expect(Math.ceil(buttonNoIcons.width)).to.be.within(79, 85); // Should be 82, but allow tolerance for font rendering differences

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      expect(buttonWithIcons.height).to.equal(48);
      expect(Math.ceil(buttonWithIcons.width)).to.be.within(135, 141); // Should be 138, but allow tolerance for font rendering differences
    });
  });

  describe("Styling", () => {
    it("should apply correct icon color for primary flavor", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="primary" leadingIcon="add">Button</zeta-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon");

      const testColor = "rgb(255, 255, 255)";
      button.style.setProperty("--state-default-enabled", testColor);
      await elementUpdated(button);

      expect(getComputedStyle(icon!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    });

    it("should apply correct icon color for outline flavor", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="outline" leadingIcon="add">Button</zeta-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon");

      const testColor = "rgb(0, 0, 255)";
      button.style.setProperty("--main-primary", testColor);
      await elementUpdated(button);

      expect(getComputedStyle(icon!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    });

    it("should apply correct icon color for subtle flavor", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="subtle" leadingIcon="add">Button</zeta-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon");

      const testColor = "rgb(120, 120, 120)";
      button.style.setProperty("--main-subtle", testColor);
      await elementUpdated(button);

      expect(getComputedStyle(icon!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    });

    it("should apply custom background and text color variables when enabled", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="custom">Button</zeta-button>`);
      const buttonEl = button.shadowRoot?.querySelector("button");

      const bgColor = "rgb(10, 20, 30)";
      const textColor = "rgb(200, 210, 220)";

      button.style.setProperty("--button-color", bgColor);
      button.style.setProperty("--button-text-color", textColor);
      await elementUpdated(button);

      expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(bgColor);
      expect(getComputedStyle(buttonEl!).color).to.equal(textColor);
    });

    it("should apply custom background and text color variables when disabled", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="custom" disabled>Button</zeta-button>`);
      const buttonEl = button.shadowRoot?.querySelector("button");

      const bgColor = "rgb(40, 50, 60)";
      const textColor = "rgb(140, 150, 160)";

      button.style.setProperty("--button-disabled-color", bgColor);
      button.style.setProperty("--button-disabled-text-color", textColor);
      await elementUpdated(button);

      expect(getComputedStyle(buttonEl!).backgroundColor).to.equal(bgColor);
      expect(getComputedStyle(buttonEl!).color).to.equal(textColor);
    });

    it("should apply custom icon color variable when enabled via --icon-button-icon-color", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="custom" leadingIcon="add">Button</zeta-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon");

      const testColor = "rgb(1, 2, 3)";
      button.style.setProperty("--icon-button-icon-color", testColor);
      await elementUpdated(button);

      expect(getComputedStyle(icon!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    });

    it("should apply custom icon color variable when disabled via --icon-button-icon-color-disabled", async () => {
      const button: ZetaButton = await fixture(html`<zeta-button flavor="custom" leadingIcon="add" disabled>Button</zeta-button>`);
      const icon = button.shadowRoot?.querySelector("zeta-icon");

      const testColor = "rgb(4, 5, 6)";
      button.style.setProperty("--icon-button-icon-color-disabled", testColor);
      await elementUpdated(button);

      expect(getComputedStyle(icon!).getPropertyValue("--icon-color").trim()).to.equal(testColor);
    });
  });

  describe("Interaction", () => {
    it("should call a click handler function when clicked", () => {
      let clickCount = 0;
      const clickHandler = () => {
        clickCount++;
      };

      subject.addEventListener("click", clickHandler);
      subject.click();

      expect(clickCount).to.equal(1);
    });

    it("should pass the click event to the handler", () => {
      let capturedEvent: Event | null = null;
      const clickHandler = (event: Event) => {
        capturedEvent = event;
      };

      subject.addEventListener("click", clickHandler);
      subject.click();

      expect(capturedEvent).to.not.be.null;
      expect(capturedEvent!.type).to.equal("click");
    });

    it("should not call click handler when button is disabled", () => {
      let clickCount = 0;
      const clickHandler = () => {
        clickCount++;
      };

      subject.disabled = true;
      subject.addEventListener("click", clickHandler);
      subject.click();

      expect(clickCount).to.equal(0);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-button AS form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaButton;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    form = await fixture(
      html`<form>
        <input type="text" name="text-control" />
        <zeta-button type="reset"></zeta-button>
      </form>`
    );
    input = form.querySelector("input[name='text-control']") as HTMLInputElement;
    button = form.querySelector("zeta-button[type='reset']") as ZetaButton;
  });

  // describe("Accessibility", () => {});

  // describe("Content", () => {});

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  describe("Interaction", () => {
    it("should reset forms", () => {
      // debugger;
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      expect(input?.value).to.equal(TEST_STRING);
      button?.click();
      //console.log("loko at me", input?.value, form.querySelector("input[name='text-control']"), form.querySelector("input[name='text-control']").value)
      expect(input?.value).to.equal("");
    });

    it("should not reset forms if disabled via JS", () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      expect(input?.value).to.equal(TEST_STRING);
      button.disabled = true;
      button?.click();
      expect(input?.value).to.equal(TEST_STRING);
    });

    it("should not reset forms if disabled via DOM", () => {
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      expect(input?.value).to.equal(TEST_STRING);
      button.setAttribute("disabled", "");
      button?.click();
      expect(input?.value).to.equal(TEST_STRING);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
