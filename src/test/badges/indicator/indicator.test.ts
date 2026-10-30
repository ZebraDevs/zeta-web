import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaIndicator } from "../../../components/badges/badges";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils";
import "../../../components/badges/indicators/indicators";
import "../../../css/styles.css";

describe("zeta-indicator", () => {
  let subject: ZetaIndicator;
  // "99+" hugs its text with space-xxs padding, so it can run just over the min-width token (font-dependent).
  const TEXT_WIDTH_TOLERANCE = 1;
  const createComponent = (template = `<zeta-indicator></zeta-indicator>`) => {
    // prettier-ignore
    return fixture<ZetaIndicator>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    const cases: { type: "icon" | "notification"; size: string }[] = [
      { type: "icon", size: "medium" },
      { type: "notification", size: "medium" },
      { type: "icon", size: "large" },
      { type: "notification", size: "large" }
    ];
    cases.forEach(c => {
      it(`meets contrast requirements for ${c.type}, ${c.size}`, async () => {
        subject.setAttribute("type", c.type);
        subject.setAttribute("size", c.size);
        if (c.type === "icon") {
          subject.setAttribute("icon", "star");
        } else {
          subject.setAttribute("value", "5");
        }
        await elementUpdated(subject);

        // Check color contrast between text and background
        const bg = subject.shadowRoot?.querySelector(".container");
        const fg = subject.shadowRoot?.querySelector(c.type === "icon" ? ".container" : "span");
        if (fg && bg && fg instanceof HTMLElement && bg instanceof HTMLElement) {
          await contrastTest(`Indicator ${c.type} ${c.size}`, fg, bg);
        }
      });
      it(`meets aria requirements for ${c.type}, ${c.size}`, async () => {
        subject.setAttribute("type", c.type);
        subject.setAttribute("size", c.size);
        await elementUpdated(subject);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });
  describe("Content", () => {
    it("sets the default properties correctly", () => {
      expect(subject.type).to.equal("notification");
      expect(subject.size).to.equal("medium");
      expect(subject.icon).to.equal(undefined);
      expect(subject.value).to.equal(undefined);
    });
  });
  describe("Dimensions", () => {
    const iconCases = [
      { size: "small", box: "--control-icon-sm", glyph: "--control-icon-xs" },
      { size: "medium", box: "--control-icon-md", glyph: "--control-icon-sm" },
      { size: "large", box: "--control-icon-lg", glyph: "--space-xl" }
    ];
    iconCases.forEach(c => {
      it(`icon, sets the ${c.size} dimensions to ${c.box}`, async () => {
        subject.setAttribute("size", c.size);
        subject.setAttribute("type", "icon");
        subject.setAttribute("icon", "star");
        await elementUpdated(subject);

        const expected = getCssVarPxValue(subject, c.box);
        expect(subject.getBoundingClientRect().width).to.equal(expected);
        expect(subject.getBoundingClientRect().height).to.equal(expected);
      });
      it(`icon, sets the ${c.size} glyph to ${c.glyph}`, async () => {
        subject.setAttribute("size", c.size);
        subject.setAttribute("type", "icon");
        subject.setAttribute("icon", "star");
        await elementUpdated(subject);

        const expected = getCssVarPxValue(subject, c.glyph);
        const icon = subject.shadowRoot?.querySelector("zeta-icon") as HTMLElement;
        expect(icon.getBoundingClientRect().width).to.equal(expected);
        expect(icon.getBoundingClientRect().height).to.equal(expected);
      });
    });

    const notificationCases = [
      { size: "small", value: undefined, width: "--control-icon-xxs", height: "--control-icon-xxs", tolerance: 0 },
      { size: "medium", value: "notification", width: "--control-icon-sm", height: "--control-icon-sm", tolerance: 0 },
      { size: "large", value: "500", width: "--control-icon-lg", height: "--control-icon-md", tolerance: TEXT_WIDTH_TOLERANCE }
    ];
    notificationCases.forEach(c => {
      it(`notification, sets the ${c.size} dimensions to ${c.width} x ${c.height}`, async () => {
        subject.setAttribute("size", c.size);
        subject.setAttribute("type", "notification");
        if (c.value) subject.setAttribute("value", c.value);
        await elementUpdated(subject);

        expect(subject.getBoundingClientRect().width).to.be.closeTo(getCssVarPxValue(subject, c.width), c.tolerance);
        expect(subject.getBoundingClientRect().height).to.equal(getCssVarPxValue(subject, c.height));
      });
    });
  });
  describe("Styling", () => {
    const digitCases = [
      { name: "1 digit", value: "5", text: "5", width: "--control-icon-sm", height: "--control-icon-sm", tolerance: 0 },
      { name: "2 digit (10)", value: "10", text: "10", width: "--control-icon-lg", height: "--control-icon-md", tolerance: 0 },
      { name: "2 digit (99)", value: "99", text: "99", width: "--control-icon-lg", height: "--control-icon-md", tolerance: 0 },
      { name: "3+ digit", value: "100", text: "99+", width: "--control-icon-lg", height: "--control-icon-md", tolerance: TEXT_WIDTH_TOLERANCE }
    ];
    digitCases.forEach(c => {
      it(`notification, applies the correct style based on ${c.name}: value ${c.value} renders "${c.text}" at ${c.width} x ${c.height}`, async () => {
        subject.setAttribute("type", "notification");
        subject.setAttribute("size", "medium");
        subject.setAttribute("value", c.value);
        await elementUpdated(subject);

        expect(subject.getBoundingClientRect().width).to.be.closeTo(getCssVarPxValue(subject, c.width), c.tolerance);
        expect(subject.getBoundingClientRect().height).to.equal(getCssVarPxValue(subject, c.height));
        expect(subject.shadowRoot?.querySelector("span")?.textContent).to.equal(c.text);
      });
    });

    it("notification, small renders a dot with no count", async () => {
      subject.setAttribute("size", "small");
      subject.setAttribute("value", "50");
      await elementUpdated(subject);

      const expected = getCssVarPxValue(subject, "--control-icon-xxs");
      expect(subject.shadowRoot?.querySelector("span")).to.equal(null);
      expect(subject.getBoundingClientRect().width).to.equal(expected);
      expect(subject.getBoundingClientRect().height).to.equal(expected);
    });

    it("notification, has a --stroke-base weight border bound to --border-inverse", async () => {
      subject.setAttribute("value", "5");
      await elementUpdated(subject);

      const style = getComputedStyle(subject.shadowRoot!.querySelector(".container")!);
      expect(parseFloat(style.borderTopWidth)).to.equal(getCssVarPxValue(subject, "--stroke-base"));
      expect(style.borderTopStyle).to.equal("solid");
      expect(style.borderTopColor).to.equal(getCssVarColorValue(subject, "--border-inverse"));
    });

    ["small", "medium", "large"].forEach(size => {
      it(`notification, is fully rounded (--radius-pill) at ${size}`, async () => {
        subject.setAttribute("size", size);
        subject.setAttribute("value", "5");
        await elementUpdated(subject);

        const radius = getComputedStyle(subject.shadowRoot!.querySelector(".container")!).borderTopLeftRadius;
        expect(parseFloat(radius)).to.equal(getCssVarPxValue(subject, "--radius-pill"));
      });
    });

    it("icon, defaults to a clock glyph and fills with --foreground-secondary", async () => {
      subject.setAttribute("type", "icon");
      await elementUpdated(subject);

      expect(subject.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name")).to.equal("clock");
      const container = subject.shadowRoot!.querySelector(".container")!;
      expect(getComputedStyle(container).backgroundColor).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
    });
  });
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
