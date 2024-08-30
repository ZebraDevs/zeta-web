import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
import "../../components/button/button.js";

const buttonText = "Button";
const flavors = ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"];

describe("zeta-button", () => {
  let subject: ZetaButton;

  const createComponent = (template = `<zeta-button>${buttonText}</zeta-button>`) => {
    return fixture<ZetaButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("should render the correct text within the button", async () => {
    await expect(subject.lastChild?.nodeValue).to.equal(buttonText);
  });

  flavors.map(flavor =>
    describe(`zeta-button ${flavor}`, () => {
      // TODO test for correct colors
      it("meets accessibility requirements", async () => {
        await expect(subject).shadowDom.to.be.accessible();
      });
    })
  );
});

describe("zeta-button as form reset control", () => {
  const TEST_STRING = "test string";
  let button: ZetaButton;
  let form: HTMLFormElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    form = await fixture(html`<form>
      <input type="text" name="text-control" />
      <zeta-button type="reset"></zeta-button>
    </form>`);
    input = form.querySelector("input[name='text-control']") as HTMLInputElement;
    button = form.querySelector("zeta-button[type='reset']") as ZetaButton;
  });

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