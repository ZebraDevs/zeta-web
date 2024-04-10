import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import { ZetaButton } from "../../index.js";
import "../../index.js";

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
