import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import { ZetaIconButton } from "../../index.js";
import "../../index.js";
import { toRGB } from "../utils.js";

const flavors = ["primary", "secondary", "positive", "negative", "outline", "outline-subtle", "text"];

describe("zeta-icon-button", () => {
  let subject: ZetaIconButton;
  const iconName = "check";

  const createComponent = (template = `<zeta-icon-button></zeta-icon-button>`) => {
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

    const icon: Element | null | undefined = subject.shadowRoot?.querySelector("zeta-icon");
    await expect(getComputedStyle(icon!).color).to.equal(toRGB(getComputedStyle(icon!).getPropertyValue("--icon-disabled")));
  });

  it("should display correct icon color for negative and primary flavors", async () => {
    await Promise.all(
      ["negative", "primary"].map(async flavor => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        const icon: Element | null | undefined = subject.shadowRoot?.querySelector("zeta-icon");
        await expect(getComputedStyle(icon!).color).to.equal(toRGB(getComputedStyle(icon!).getPropertyValue("--icon-inverse")));
      })
    );
  });

  it("should display correct icon color for outline-subtle flavor", async () => {
    subject.setAttribute("flavor", "outline-subtle");
    await elementUpdated(subject);

    const icon: Element | null | undefined = subject.shadowRoot?.querySelector("zeta-icon");
    await expect(getComputedStyle(icon!).color).to.equal(toRGB(getComputedStyle(icon!).getPropertyValue("--icon-default")));
  });

  it("should display correct icon color for text flavor", async () => {
    await Promise.all(
      ["text"].map(async flavor => {
        subject.setAttribute("flavor", flavor);
        await elementUpdated(subject);

        const icon: Element | null | undefined = subject.shadowRoot?.querySelector("zeta-icon");
        await expect(getComputedStyle(icon!).color).to.equal(toRGB(getComputedStyle(icon!).getPropertyValue("--icon-flavor-primary")));
      })
    );
  });

  flavors.map(flavor => {
    it(`meets accessibility requirements for the ${flavor} flavor`, async () => {
      subject.setAttribute("flavor", flavor);
      subject.setAttribute("icon-name", iconName);
      await elementUpdated(subject);
      await expect(subject).shadowDom.to.be.accessible();
    });
  });
});
