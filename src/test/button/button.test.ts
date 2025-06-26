import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
import "../../components/button/button.js";
import "../../css/styles.css";
import "../../generated/tokens/primitives.css";
import "../../generated/tokens/semantics.css";
import "@zebra-fed/zeta-icons/index.css";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

const buttonText = "Button";
const flavors = ["primary", "positive", "negative", "outline", "outline-subtle", "text"];

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
        it("meets aria requirements", async () => {
          await expect(subject).to.be.accessible();
          await expect(subject).shadowDom.to.be.accessible();
        });
      });
    });
  });

  describe("Content", () => {
    it("should render the correct text within the button", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(buttonText);
    });
  });

  describe("Dimensions", () => {
    it("renders small button with correct dimensions", async () => {
      subject.setAttribute("label", "Button");
      subject.setAttribute("size", "small");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      await expect(buttonNoIcons.height).to.equal(32);
      await expect(Math.ceil(buttonNoIcons.width)).to.equal(54);

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      await expect(buttonWithIcons.height).to.equal(32);
      await expect(Math.ceil(buttonWithIcons.width)).to.equal(94);
    });
    it("renders medium button with correct dimensions", async () => {
      subject.setAttribute("label", "Button");
      subject.setAttribute("size", "medium");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      await expect(buttonNoIcons.height).to.equal(40);
      await expect(Math.ceil(buttonNoIcons.width)).to.equal(74);

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      await expect(buttonWithIcons.height).to.equal(40);
      await expect(Math.ceil(buttonWithIcons.width)).to.equal(130);
    });
    it("renders large button with correct dimensions", async () => {
      subject.setAttribute("label", "Button");
      subject.setAttribute("size", "large");
      await elementUpdated(subject);

      const buttonNoIcons = subject.getBoundingClientRect();

      await expect(buttonNoIcons.height).to.equal(48);
      await expect(Math.ceil(buttonNoIcons.width)).to.equal(82);

      subject.setAttribute("leadingIcon", "star");
      subject.setAttribute("trailingIcon", "star");
      await elementUpdated(subject);
      const buttonWithIcons = subject.getBoundingClientRect();

      await expect(buttonWithIcons.height).to.equal(48);
      await expect(Math.ceil(buttonWithIcons.width)).to.equal(138);
    });
  });

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

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
    it("should reset forms", async () => {
      // debugger;
      expect(input?.value).to.be.empty;
      input.value = TEST_STRING;
      await expect(input?.value).to.equal(TEST_STRING);
      button?.click();
      //console.log("loko at me", input?.value, form.querySelector("input[name='text-control']"), form.querySelector("input[name='text-control']").value)
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
