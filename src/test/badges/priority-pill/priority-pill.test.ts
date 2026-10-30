import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaPriorityPill } from "../../../components/badges/badges";
import "../../../components/badges/priority-pill/priority-pill";
import "../../../index.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import { getCssVarColorValue, getCssVarPxValue } from "../../utils";

type Size = "small" | "large";
type Status = "urgent" | "high" | "medium" | "low";

describe("zeta-priority-pill", () => {
  let subject: ZetaPriorityPill;
  const createComponent = (template = `<zeta-priority-pill></zeta-priority-pill>`) => {
    // prettier-ignore
    return fixture<ZetaPriorityPill>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    const cases: { size: Size; status: Status }[] = (["small", "large"] as Size[]).flatMap(size =>
      (["urgent", "high", "medium", "low"] as Status[]).map(status => ({ size, status }))
    );
    cases.forEach(c => {
      it(`meets contrast requirements for ${c.status} / ${c.size}`, async () => {
        subject.setAttribute("status", c.status);
        subject.setAttribute("size", c.size);
        await subject.updateComplete;

        const index = subject.shadowRoot?.querySelector(".number");
        const label = subject.shadowRoot?.querySelector(".text");
        const container = subject.shadowRoot?.querySelector(".container");

        expect(index).to.exist;
        expect(label).to.exist;
        expect(container).to.exist;

        await contrastTest(`Priority pill index ${c.status} / ${c.size}`, index!, index!);
        await contrastTest(`Priority pill label ${c.status} / ${c.size}`, label!, container!);
      });
      it(`meets aria requirements for ${c.status} / ${c.size}`, async () => {
        subject.setAttribute("status", c.status);
        subject.setAttribute("size", c.size);
        await subject.updateComplete;
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });
  describe("Content", () => {
    const cases: { status: Status; index: string; label: string }[] = [
      { status: "urgent", index: "U", label: "Urgent" },
      { status: "high", index: "1", label: "High" },
      { status: "medium", index: "2", label: "Medium" },
      { status: "low", index: "3", label: "Low" }
    ];
    cases.forEach(c => {
      it(`provides default values for ${c.status}`, async () => {
        subject.setAttribute("status", c.status);
        await subject.updateComplete;

        const index = subject.shadowRoot?.querySelector(".number");
        const label = subject.shadowRoot?.querySelector(".text");
        const container = subject.shadowRoot?.querySelector(".container");
        expect(label).to.exist;
        expect(container).to.exist;

        expect(index?.textContent).to.equal(c.index);
        expect(label?.textContent).to.equal(c.label);
      });
    });

    it("allows custom index and label", async () => {
      subject.setAttribute("status", "urgent");
      subject.setAttribute("index", "5");
      subject.setAttribute("label", "Custom Priority");
      await subject.updateComplete;

      const index = subject.shadowRoot?.querySelector(".number");
      const label = subject.shadowRoot?.querySelector(".text");
      const container = subject.shadowRoot?.querySelector(".container");

      expect(index).to.exist;
      expect(label).to.exist;
      expect(container).to.exist;

      expect(index?.textContent).to.equal("5");
      expect(label?.textContent).to.equal("Custom Priority");
    });
  });
  describe("Dimensions", () => {
    // Rendered width of the text "Label" depends on font rendering, so it cannot come from a token.
    // Values are the ceiling of the measured text width in --indicator-small / --body-small.
    const LABEL_TEXT_WIDTH = { small: 25, large: 35 };

    const cases: {
      size: Size;
      type: "badge" | "lozenge";
      circle: string;
      padding: string;
      gap: string;
      paddingEnd: string;
      textPadding: string;
    }[] = [
      {
        size: "large",
        type: "badge",
        circle: "--control-icon-md",
        padding: "--space-xxs",
        gap: "--space-xxs",
        paddingEnd: "--space-sm",
        textPadding: "--space-xxs"
      },
      {
        size: "large",
        type: "lozenge",
        circle: "--control-icon-md",
        padding: "--space-xxs",
        gap: "--space-xxs",
        paddingEnd: "--space-sm",
        textPadding: "--space-xxs"
      },
      {
        size: "small",
        type: "badge",
        circle: "--control-icon-sm",
        padding: "--space-2xs",
        gap: "--space-xxs",
        paddingEnd: "--space-sm",
        textPadding: "--space-2xs"
      },
      {
        size: "small",
        type: "lozenge",
        circle: "--control-icon-sm",
        padding: "--space-2xs",
        gap: "--space-xxs",
        paddingEnd: "--space-sm",
        textPadding: "--space-2xs"
      }
    ];
    cases.forEach(c => {
      it(`renders ${c.type} size ${c.size}`, async () => {
        subject.setAttribute("size", c.size);
        subject.setAttribute("type", c.type);
        subject.setAttribute("status", "urgent");
        subject.setAttribute("label", "Label");
        await subject.updateComplete;

        const px = (token: string) => getCssVarPxValue(subject, token);
        const { width, height } = subject.getBoundingClientRect();
        const expectedHeight = px(c.circle) + 2 * px(c.padding);

        if (c.type === "badge") {
          expect(width).to.equal(px(c.circle) + 2 * px(c.padding));
        } else {
          const tokenWidth = px(c.padding) + px(c.circle) + px(c.gap) + px(c.textPadding) + px(c.paddingEnd);
          expect(Math.ceil(width)).to.equal(tokenWidth + LABEL_TEXT_WIDTH[c.size]);
        }
        expect(height).to.equal(expectedHeight);
      });
    });
  });
  describe("Styling", () => {
    const cases: { status: Status; fill: string; foreground: string }[] = [
      { status: "urgent", fill: "--feedback-error-background-strong", foreground: "--interactive-destructive-foreground-default" },
      { status: "high", fill: "--feedback-warning-background-strong", foreground: "--foreground-inverse" },
      { status: "medium", fill: "--feedback-info-background-strong", foreground: "--interactive-primary-foreground-default" },
      { status: "low", fill: "--foreground-secondary", foreground: "--foreground-inverse" }
    ];
    cases.forEach(c => {
      it(`uses ${c.fill} / ${c.foreground} for ${c.status}`, async () => {
        subject.setAttribute("status", c.status);
        await subject.updateComplete;
        const container = getComputedStyle(subject.shadowRoot!.querySelector(".container")!);

        expect(container.backgroundColor).to.equal(getCssVarColorValue(subject, c.fill));
        expect(container.color).to.equal(getCssVarColorValue(subject, c.foreground));
      });
    });

    it("draws the circle as a knockout in the label colour", async () => {
      subject.setAttribute("status", "urgent");
      await subject.updateComplete;
      const container = getComputedStyle(subject.shadowRoot!.querySelector(".container")!);
      const circle = getComputedStyle(subject.shadowRoot!.querySelector(".number")!);

      expect(circle.backgroundColor).to.equal(container.color);
      expect(circle.color).to.equal(container.backgroundColor);
      expect(parseFloat(circle.width)).to.equal(getCssVarPxValue(subject, "--control-icon-md"));
      expect(container.borderRadius).to.equal(circle.borderRadius);
    });

    const circleCases: { size: Size; circle: string }[] = [
      { size: "small", circle: "--control-icon-sm" },
      { size: "large", circle: "--control-icon-md" }
    ];
    circleCases.forEach(c => {
      it(`uses a ${c.circle} circle at ${c.size}`, async () => {
        subject.setAttribute("size", c.size);
        await subject.updateComplete;
        const circle = getComputedStyle(subject.shadowRoot!.querySelector(".number")!);
        expect(parseFloat(circle.width)).to.equal(getCssVarPxValue(subject, c.circle));
        expect(parseFloat(circle.height)).to.equal(getCssVarPxValue(subject, c.circle));
      });
    });
  });
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
