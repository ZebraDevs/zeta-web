import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaStatusLabel } from "../../../components/badges/badges";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../index.css";
import "../../../components/badges/status-label/status-label";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils";

describe("zeta-status-label", () => {
  const statuses = ["info", "positive", "warning", "negative", "neutral"] as const;
  let subject: ZetaStatusLabel;
  const createComponent = (template = `<zeta-status-label></zeta-status-label>`) => {
    // prettier-ignore
    return fixture<ZetaStatusLabel>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    statuses.forEach(status => {
      it(`meets contrast requirements for ${status}`, async () => {
        subject.setAttribute("status", status);
        subject.setAttribute("label", `Label ${status}`);
        await elementUpdated(subject);

        // Check color contrast between text and background
        const bg = subject.shadowRoot?.querySelector("[part='container']");
        const fg = subject.shadowRoot?.querySelector("[part='text']");
        if (fg && bg && fg instanceof HTMLElement && bg instanceof HTMLElement) {
          await contrastTest(`Status Label ${status}`, fg, bg);
        }
      });
      it(`meets aria requirements for ${status}`, async () => {
        subject.status = status;
        subject.label = `Label ${status}`;
        await elementUpdated(subject);
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });
  describe("Content", () => {
    it("sets default status to neutral", () => {
      expect(subject.status).to.equal("neutral");
    });

    statuses.forEach(status => {
      it(`can set status to ${status}`, async () => {
        subject.status = status;
        await elementUpdated(subject);
        expect(subject.status).to.equal(status);
        expect(subject.getAttribute("status")).to.equal(status);
      });
    });

    it("renders label text when label prop is set", async () => {
      subject.label = "Test Label";
      await elementUpdated(subject);

      const textPart = subject.shadowRoot?.querySelector("[part='text']");
      expect(textPart?.textContent).to.equal("Test Label");
    });

    it("has an undefined label by default", () => {
      expect(subject.label).to.be.undefined;
    });

    it("overrides slot content when label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label>Slot Text</zeta-status-label>`);
      expect(componentWithSlot.textContent).to.include("Slot Text");

      componentWithSlot.label = "Label Text";
      await elementUpdated(componentWithSlot);
      const textPart = componentWithSlot.shadowRoot?.querySelector("[part='text']");
      expect(textPart?.textContent).to.equal("Label Text");
    });

    it("has an undefined icon by default", () => {
      expect(subject.icon).to.be.undefined;
    });

    it("defaults showIcon to true", () => {
      expect(subject.showIcon).to.be.true;
    });

    const leadingCases: {
      name: string;
      status: ZetaStatusLabel["status"];
      icon?: ZetaIconName;
      showIcon: boolean;
      container: boolean;
      zetaIcon: boolean;
      circle: boolean;
    }[] = [
      { name: "icon shown", status: "positive", icon: "star", showIcon: true, container: true, zetaIcon: true, circle: false },
      { name: "no icon, shown", status: "neutral", showIcon: true, container: true, zetaIcon: false, circle: true },
      { name: "icon hidden", status: "negative", icon: "star", showIcon: false, container: false, zetaIcon: false, circle: false },
      { name: "no icon, hidden", status: "warning", showIcon: false, container: false, zetaIcon: false, circle: false }
    ];
    leadingCases.forEach(c => {
      it(`renders the leading element for ${c.name} (status=${c.status}, icon=${c.icon}, showIcon=${c.showIcon})`, async () => {
        subject.status = c.status;
        subject.label = "Test";
        subject.icon = c.icon;
        subject.showIcon = c.showIcon;
        await elementUpdated(subject);

        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        expect(subject.status).to.equal(c.status);
        expect(subject.shadowRoot?.querySelector("[part='text']")?.textContent).to.equal("Test");
        expect(!!subject.shadowRoot?.querySelector("[part='icon-container']")).to.equal(c.container);
        expect(!!icon).to.equal(c.zetaIcon);
        expect(!!subject.shadowRoot?.querySelector("svg circle")).to.equal(c.circle);
        if (c.zetaIcon) expect(icon?.textContent).to.equal(c.icon);
      });
    });

    it("removes icon when showIcon is toggled from true to false", async () => {
      subject.label = "Test";
      subject.showIcon = true;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.exist;

      subject.showIcon = false;
      await elementUpdated(subject);
      expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.not.exist;
    });

    it("renders slot content when no label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label>Slotted Text Content</zeta-status-label>`);

      expect(componentWithSlot.textContent).to.include("Slotted Text Content");
    });

    it("does not render slot when label prop is set", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label label="Label Text">Slotted Text</zeta-status-label>`);

      const textPart = componentWithSlot.shadowRoot?.querySelector("[part='text']");
      expect(textPart?.textContent).to.equal("Label Text");
      expect(textPart?.textContent).to.not.include("Slotted Text");
    });

    it("supports multiple elements in slot", async () => {
      const componentWithSlot = await createComponent(`<zeta-status-label><span>Span Text</span> Extra Text</zeta-status-label>`);

      expect(componentWithSlot.textContent).to.include("Span Text");
      expect(componentWithSlot.textContent).to.include("Extra Text");
    });
  });
  describe("Dimensions", () => {
    // Rendered width of "Label" in --body-small. Depends on font rendering, so it can't come from a token.
    const LABEL_TEXT_WIDTH = 35;
    const px = (token: string) => getCssVarPxValue(subject, token);

    const widthCases: { name: string; icon?: ZetaIconName; showIcon: boolean }[] = [
      { name: "dot", showIcon: true },
      { name: "icon", icon: "star", showIcon: true },
      { name: "no leading element", showIcon: false }
    ];
    widthCases.forEach(c => {
      it(`sets the dimensions correctly with ${c.name} (icon=${c.icon}, showIcon=${c.showIcon})`, async () => {
        subject.label = "Label";
        subject.status = "negative";
        subject.icon = c.icon;
        subject.showIcon = c.showIcon;
        await elementUpdated(subject);

        // border + container padding + leading box + text padding + text, each side
        const expectedWidth =
          px("--stroke-thin") * 2 + px("--space-xxs") * 2 + (c.showIcon ? px("--control-icon-sm") : 0) + px("--space-xxs") * 2 + LABEL_TEXT_WIDTH;
        const rect = subject.getBoundingClientRect();

        // Use a range to account for browser / font rendering differences
        expect(Math.ceil(rect.width)).to.be.within(expectedWidth - 1, expectedWidth + 1);
        expect(rect.height).to.equal(px("--scale-10"));
      });
    });

    const leadingCases: { name: string; icon?: ZetaIconName; selector: string; inner: string }[] = [
      { name: "dot", selector: "svg", inner: "--control-icon-xxs" },
      { name: "icon", icon: "star", selector: "zeta-icon", inner: "--control-icon-sm" }
    ];
    leadingCases.forEach(c => {
      it(`has a --control-icon-sm leading box holding a ${c.inner} ${c.name}`, async () => {
        subject.label = "Label";
        subject.icon = c.icon;
        await elementUpdated(subject);

        const box = subject.shadowRoot!.querySelector("[part='icon-container']")!.getBoundingClientRect();
        const inner = subject.shadowRoot!.querySelector(c.selector)!.getBoundingClientRect();
        const boxSize = px("--control-icon-sm");
        const innerSize = px(c.inner);
        expect([box.width, box.height]).to.deep.equal([boxSize, boxSize]);
        expect([inner.width, inner.height]).to.deep.equal([innerSize, innerSize]);
      });
    });

    const radiusCases: { name: string; rounded: boolean; radius: string }[] = [
      { name: "rounded", rounded: true, radius: "--radius-pill" },
      { name: "sharp", rounded: false, radius: "--radius-none" }
    ];
    radiusCases.forEach(c => {
      it(`uses ${c.radius} when ${c.name}`, async () => {
        subject.rounded = c.rounded;
        await elementUpdated(subject);
        const container = getComputedStyle(subject.shadowRoot!.querySelector("[part='container']")!);
        expect(parseFloat(container.borderTopLeftRadius)).to.equal(px(c.radius));
      });
    });
  });
  describe("Styling", () => {
    const cases: { status: ZetaStatusLabel["status"]; fill: string; border: string; dot: string }[] = [
      { status: "neutral", fill: "--feedback-neutral-background-subtle", border: "--border-default", dot: "--foreground-primary" },
      { status: "info", fill: "--feedback-info-background-subtle", border: "--border-info", dot: "--foreground-info" },
      { status: "positive", fill: "--feedback-success-background-subtle", border: "--border-success", dot: "--foreground-success" },
      { status: "warning", fill: "--feedback-warning-background-subtle", border: "--border-warning", dot: "--foreground-warning" },
      { status: "negative", fill: "--feedback-error-background-subtle", border: "--border-error", dot: "--foreground-error" }
    ];
    cases.forEach(c => {
      it(`uses ${c.fill} and ${c.border} for ${c.status}`, async () => {
        subject.status = c.status;
        subject.label = "Label";
        await elementUpdated(subject);

        const style = getComputedStyle(subject.shadowRoot!.querySelector("[part='container']")!);
        expect(style.backgroundColor).to.equal(getCssVarColorValue(subject, c.fill));
        expect(style.borderTopColor).to.equal(getCssVarColorValue(subject, c.border));
        expect(parseFloat(style.borderTopWidth)).to.equal(getCssVarPxValue(subject, "--stroke-thin"));
      });
      it(`colours the dot with ${c.dot} and the label with --foreground-primary for ${c.status}`, async () => {
        subject.status = c.status;
        subject.label = "Label";
        await elementUpdated(subject);

        expect(getComputedStyle(subject.shadowRoot!.querySelector("svg circle")!).fill).to.equal(getCssVarColorValue(subject, c.dot));
        expect(getComputedStyle(subject.shadowRoot!.querySelector("[part='text']")!).color).to.equal(getCssVarColorValue(subject, "--foreground-primary"));
      });
    });
    it("pads the container --space-2xs vertical and --space-xxs horizontal", () => {
      const style = getComputedStyle(subject.shadowRoot!.querySelector("[part='container']")!);
      const v = `${getCssVarPxValue(subject, "--space-2xs")}px`;
      const h = `${getCssVarPxValue(subject, "--space-xxs")}px`;
      expect([style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft]).to.deep.equal([v, h, v, h]);
    });
  });
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
