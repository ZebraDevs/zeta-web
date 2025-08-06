import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaTileButton } from "../../components/button/tile-button/tile-button.js";
import "../../components/button/tile-button/tile-button.js";

import "../../index.css";
import { getCssVarColorValue, getSlotText, KeyboardActions, MouseActions } from "../utils.js";
import sinon from "sinon";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner.js";

describe("zeta-tile-button", () => {
  let subject: ZetaTileButton;

  const createComponent = (template = `<zeta-tile-button icon="star">Button</zeta-tile-button>`) => {
    // prettier-ignore
    return fixture<ZetaTileButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  const createDisabledButton = async (subject: ZetaTileButton) => {
    subject.remove();
    await elementUpdated(subject);
    subject = await createComponent(`<zeta-tile-button icon="star" disabled>Button</zeta-tile-button>`);
    await elementUpdated(subject);
  };

  describe("Accessibility", () => {
    it("meets aria requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("meets contrast requirements for outline-subtle flavor", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await contrastTest(`Button outline-subtle`, srButton!, srButton!);
    });
  });

  describe("Content", () => {
    it("renders an icon", async () => {
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      await expect(icon?.name).to.equal("star");
    });

    it("renders a default icon if none is provided", async () => {
      subject.icon = undefined;
      await elementUpdated(subject);
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      await expect(icon?.name).to.equal("star");
    });

    it("renders a label", async () => {
      await expect(getSlotText(subject)).to.equal("Button");
    });

    it("text stays empty when no text is given", async () => {
      subject.slot = "";
      await elementUpdated(subject);
      await expect(subject.slot).to.equal("");
    });

    it("truncates the label when text is longer than button width", async () => {
      subject.textContent = "12345678910111213";
      await elementUpdated(subject);
      const srTextSpan = subject.shadowRoot?.querySelector(".button-text");
      expect(srTextSpan).to.exist;
      expect((srTextSpan as HTMLElement).offsetWidth).to.be.lessThan((srTextSpan as HTMLElement).scrollWidth);
      expect(getComputedStyle(srTextSpan as HTMLElement).textOverflow).to.equal("ellipsis");
      expect(getComputedStyle(srTextSpan as HTMLElement).overflow).to.equal("hidden");
    });
  });

  describe("Dimensions", () => {
    it("if characters in title equal less than 80px, width should == 80px", async () => {
      subject.textContent = "1234567";
      await elementUpdated(subject);
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).width).to.equal("80px");
    });

    it("button stays the same size if text is longer than button width", async () => {
      subject.textContent = "12345678910111213";
      await elementUpdated(subject);
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).width).to.equal("80px");
    });

    it("height should == 80px regardless of title.length", async () => {
      subject.slot = "";
      await elementUpdated(subject);
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).height).to.equal("80px");
      subject.slot = "12345678910111213";
      await elementUpdated(subject);
      await expect(getComputedStyle(srButton!).height).to.equal("80px");
    });
  });

  describe("Styling", () => {
    it("has a white background", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).backgroundColor).to.equal(getCssVarColorValue(srButton!, "--state-default-enabled"));
    });

    it("has black text", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).color).to.equal(getCssVarColorValue(srButton!, "--main-default"));
    });

    it("has a black icon", async () => {
      const srZetaIcon = subject.shadowRoot?.querySelector("zeta-icon");
      if (!srZetaIcon) return;
      await expect(getComputedStyle(srZetaIcon).color).to.equal(getCssVarColorValue(srZetaIcon, "--main-default"));
    });

    it("has border-default border", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      const buttonBorderColor = getComputedStyle(srButton!).boxShadow.match(/rgb[a]?\([^)]+\)/)?.[0] ?? "rgb(0,0,0)";
      await expect(buttonBorderColor).to.equal(getCssVarColorValue(srButton!, "--border-default"));
    });

    it("has the correct background colour when disabled", async () => {
      await createDisabledButton(subject);
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).backgroundColor).to.equal(getCssVarColorValue(srButton!, "--surface-disabled"));
    });

    it("has the correct icon colour when disabled", async () => {
      await createDisabledButton(subject);
      const srZetaIcon = subject.shadowRoot?.querySelector("zeta-icon");
      if (!srZetaIcon) return;
      await expect(getComputedStyle(srZetaIcon).color).to.equal(getCssVarColorValue(srZetaIcon, "--main-disabled"));
    });

    it("has the correct text colour when disabled", async () => {
      await createDisabledButton(subject);
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await expect(getComputedStyle(srButton!).color).to.equal(getCssVarColorValue(srButton!, "--main-disabled"));
    });
  });

  describe("Interaction", () => {
    it("calls onClick when clicked", async () => {
      const eventSpy = sinon.spy();
      subject.addEventListener("click", eventSpy);
      await MouseActions.click(subject);
      expect(eventSpy).to.have.been.calledOnce;
    });

    it("has the correct style when hovered", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await MouseActions.hover(srButton!);
      await expect(getComputedStyle(srButton!).backgroundColor).to.equal(getCssVarColorValue(srButton!, "--surface-hover"));
    });

    it("has the correct style when focused", async () => {
      const srButton = subject.shadowRoot?.querySelector("button");
      expect(srButton).to.exist;
      await KeyboardActions.press("Tab");
      await expect(getComputedStyle(srButton!).outlineColor).to.equal(getCssVarColorValue(srButton!, "--border-primary"));
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
