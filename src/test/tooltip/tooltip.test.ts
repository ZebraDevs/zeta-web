import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaTooltip } from "../../components/tooltip/tooltip.js";
import "../../components/tooltip/tooltip.js";
import { contrastTest } from "../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import "../../index.css";

describe("zeta-tooltip", () => {
  let subject: ZetaTooltip;

  const createComponent = (template = `<zeta-tooltip>Label</zeta-tooltip>`) => {
    // prettier-ignore
    return fixture<ZetaTooltip>(html`${unsafeStatic(template)}`);
  };

  const container = () => subject.shadowRoot!.querySelector(".container") as HTMLElement;

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("meets contrast requirements", async () => {
      await contrastTest("Tooltip label", subject.shadowRoot!.querySelector("slot")!, container());
    });

    it("can be hidden from assistive technology with aria-hidden", async () => {
      subject = await createComponent(`<zeta-tooltip aria-hidden="true" popover="manual">Full cell text</zeta-tooltip>`);
      await expect(subject).to.be.accessible();
      expect(subject.getAttribute("aria-hidden")).to.equal("true");
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", () => {
      const el = document.createElement("zeta-tooltip");
      expect(el.nodeName).to.equal("ZETA-TOOLTIP");
    });

    it("renders the label in the default slot", () => {
      const slot = subject.shadowRoot!.querySelector("slot")!;
      expect(slot.assignedNodes()[0].textContent).to.equal("Label");
    });
  });

  describe("Styling", () => {
    it("uses surface/inverse for the bubble and pointer, and foreground/inverse for the label", () => {
      expect(getComputedStyle(container()).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-inverse"));
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".point")!).fill).to.equal(getCssVarColorValue(subject, "--surface-inverse"));
      expect(getComputedStyle(subject.shadowRoot!.querySelector("slot")!).color).to.equal(getCssVarColorValue(subject, "--foreground-inverse"));
    });

    it("uses radius.sm when rounded", () => {
      expect(parseFloat(getComputedStyle(container()).borderTopLeftRadius)).to.equal(getCssVarPxValue(subject, "--radius-sm"));
    });

    it("uses radius.none when sharp", async () => {
      subject.rounded = false;
      await elementUpdated(subject);
      expect(parseFloat(getComputedStyle(container()).borderTopLeftRadius)).to.equal(getCssVarPxValue(subject, "--radius-none"));
    });

    it("has a two-layer shadow", () => {
      expect(getComputedStyle(container()).boxShadow.split("px,").length).to.equal(2);
    });

    it("reflects the point attribute", async () => {
      expect(subject.getAttribute("point")).to.equal("bottom");
      subject.point = "left";
      await elementUpdated(subject);
      expect(subject.getAttribute("point")).to.equal("left");
    });
  });

  describe("Dimensions", () => {
    it("has space.2xs vertical and space.sm horizontal padding", () => {
      const style = getComputedStyle(container());
      expect(parseFloat(style.paddingTop)).to.equal(getCssVarPxValue(subject, "--space-2xs"));
      expect(parseFloat(style.paddingBottom)).to.equal(getCssVarPxValue(subject, "--space-2xs"));
      expect(parseFloat(style.paddingLeft)).to.equal(getCssVarPxValue(subject, "--space-sm"));
      expect(parseFloat(style.paddingRight)).to.equal(getCssVarPxValue(subject, "--space-sm"));
    });

    it("is 24px tall for a single line label", () => {
      expect(container().getBoundingClientRect().height).to.equal(24);
    });
  });

  describe("Interaction", () => {
    it("can be shown and hidden as a native popover without the UA popover box", async () => {
      subject = await createComponent(`<zeta-tooltip popover="manual" style="transition: none">Label</zeta-tooltip>`);
      expect(subject.matches(":popover-open")).to.be.false;
      expect(getComputedStyle(subject).display).to.equal("none");

      subject.showPopover();
      expect(subject.matches(":popover-open")).to.be.true;
      const style = getComputedStyle(subject);
      expect(style.display).to.not.equal("none");
      expect(style.borderTopStyle).to.equal("none");
      expect(style.paddingTop).to.equal("0px");
      expect(style.overflow).to.equal("visible");
      expect(style.opacity).to.equal("1");

      subject.hidePopover();
      expect(getComputedStyle(subject).display).to.equal("none");
    });

    it("can be positioned with inline left/top when used as a popover", async () => {
      subject = await createComponent(`<zeta-tooltip popover="manual" style="transition: none; left: 40px; top: 30px">Label</zeta-tooltip>`);
      subject.showPopover();
      const rect = subject.getBoundingClientRect();
      expect(rect.left).to.equal(40);
      expect(rect.top).to.equal(30);
    });

    it("hides with the hidden attribute", async () => {
      subject.hidden = true;
      await elementUpdated(subject);
      expect(getComputedStyle(subject).display).to.equal("none");
    });
  });
});
