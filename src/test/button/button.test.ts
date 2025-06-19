import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
// import "../../index.css";
import "../../components/button/button.js";
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
    flavors.map(flavor => {
      it(`meets accessibility requirements for the ${flavor} flavor`, async () => {
        // Force the browser to ignore user preference and always use light mode
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: (query: string) =>
            ({
              matches: query === "(prefers-color-scheme: light)",
              media: query,
              addEventListener: () => {},
              removeEventListener: () => {}
            }) as any
        });

        const button: ZetaButton = await fixture(html`<zeta-button>Text</zeta-button>`);

        button.setAttribute("flavor", flavor);
        await elementUpdated(button);
        await expect(button).shadowDom.to.be.accessible();
        await expect(button).to.be.accessible();

        // Check color contrast between text and background
        const buttonEl = button.shadowRoot?.querySelector("button");
        if (buttonEl) {
          contrastTest(buttonEl, buttonEl);
          // const styles = getComputedStyle(buttonEl);
          // const fg = styles.color;
          // const bg = styles.backgroundColor;
          // const contrast = getContrast(fg, bg);
          // console.log(`Contrast for ${flavor} flavor:`, contrast, fg, bg);
          // debugger;
          // expect(contrast).to.be.gte(4.5); // WCAG AA minimum for normal text
        }
      });
    });

    it("meets accessibility requirements", async () => {
      await expect(subject).to.be.accessible();
    });
  });

  describe("Content", () => {
    it("should render the correct text within the button", async () => {
      await expect(subject.lastChild?.nodeValue).to.equal(buttonText);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});

  // flavors.map(flavor =>
  //   describe(`zeta-button ${flavor}`, () => {
  //     // TODO test for correct colors
  //     it("meets accessibility requirements", async () => {
  //       await expect(subject).shadowDom.to.be.accessible();
  //     });
  //   })
  // );
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
