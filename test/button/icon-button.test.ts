import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import "../../src/components/button/icon-button.js";
import { ZetaIconButton } from "../../src/index.js";

const flavors = ["primary", "primary-variant", "negative", "outline", "outline-subtle", "basic", "basic-negative"];

describe("zeta-icon-button", () => {
  let subject: ZetaIconButton;
  const iconName = "check";

  const createComponent = (template = `<zeta-icon-button iconName=></zeta-icon-button iconName=>`) => {
    return fixture<ZetaIconButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    subject.iconName = iconName;
  });

  it("should render the correct icon", async () => {
    await expect(subject.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name")).to.equal(iconName);
  });

  it("should display correct icon color when disabled", async () => {
    subject.setAttribute("disabled", "true");
    await elementUpdated(subject);

    await expect(subject.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color")).to.equal("var(--icon-disabled)");
  });

  it("should display correct icon color for negative and primary flavors", async () => {
    await Promise.all(
      ["negative", "primary"].map(async flavor => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        await expect(subject.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color")).to.equal("var(--icon-inverse)");
      })
    );
  });

  it("should display correct icon color for primary-variant, outline-subtle and basic flavors", async () => {
    await Promise.all(
      ["primary-variant", "outline-subtle", "basic"].map(async flavor => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        await expect(subject.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color")).to.equal("var(--icon-default)");
      })
    );
  });

  flavors.map(flavor => {
    it(`meets accessibility requirements for the ${flavor} flavor`, async () => {
      subject.setAttribute("flavor", flavor);
      await elementUpdated(subject);

      await expect(subject).shadowDom.to.be.accessible();
    });
  });
});
