import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaStatusLabel } from "../../../components/badges/badges";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../css/styles.css";
import "../../../generated/tokens/primitives.css";
import "../../../generated/tokens/semantics.css";
import "../../../components/badges/status-label/status-label";

describe("zeta-status-label", () => {
  let subject: ZetaStatusLabel;
  const createComponent = (template = `<zeta-status-label></zeta-status-label>`) => {
    // prettier-ignore
    return fixture<ZetaStatusLabel>(html`${unsafeStatic(template)}`);
  };
  beforeEach(async () => {
    subject = await createComponent();
  });
  describe("Accessibility", () => {
    ["info", "positive", "warning", "negative", "neutral"].forEach(status => {
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
      it("meets aria requirements", async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });
  describe("Content", () => {
    describe("status prop", () => {
      it("sets default status to neutral", () => {
        expect(subject.status).to.equal("neutral");
      });

      ["info", "positive", "warning", "negative", "neutral"].forEach(status => {
        it(`can set status to ${status}`, async () => {
          subject.status = status as any;
          await elementUpdated(subject);
          expect(subject.status).to.equal(status);
          expect(subject.getAttribute("status")).to.equal(status);
        });
      });
    });

    describe("label prop", () => {
      it("renders label text when label prop is set", async () => {
        subject.label = "Test Label";
        await elementUpdated(subject);

        const textPart = subject.shadowRoot?.querySelector("[part='text']");
        expect(textPart?.textContent).to.equal("Test Label");
      });

      it("should be undefined by default", () => {
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
    });

    describe("icon prop", () => {
      it("should be undefined by default", () => {
        expect(subject.icon).to.be.undefined;
      });

      it("renders a zeta-icon when icon prop is set", async () => {
        subject.icon = "star";
        subject.label = "Test";
        await elementUpdated(subject);

        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        expect(icon).to.exist;
        expect(icon?.textContent).to.equal("star");
      });

      it("renders an indicator circle when icon is not set", async () => {
        subject.label = "Test";
        await elementUpdated(subject);

        const circle = subject.shadowRoot?.querySelector("svg circle");
        expect(circle).to.exist;
      });

      it("renders zeta-icon instead of indicator circle when icon is provided", async () => {
        subject.icon = "star";
        subject.label = "Test";
        await elementUpdated(subject);

        const icon = subject.shadowRoot?.querySelector("zeta-icon");
        const circle = subject.shadowRoot?.querySelector("svg circle");
        expect(icon).to.exist;
        expect(circle).to.not.exist;
      });
    });

    describe("showIcon prop", () => {
      it("defaults to true", () => {
        expect(subject.showIcon).to.be.true;
      });

      it("renders icon container when showIcon is true", async () => {
        subject.label = "Test";
        subject.showIcon = true;
        await elementUpdated(subject);

        const iconContainer = subject.shadowRoot?.querySelector("[part='icon-container']");
        expect(iconContainer).to.exist;
      });

      it("hides icon container when showIcon is false", async () => {
        subject.label = "Test";
        subject.showIcon = false;
        await elementUpdated(subject);

        const iconContainer = subject.shadowRoot?.querySelector("[part='icon-container']");
        expect(iconContainer).to.not.exist;
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
    });

    describe("slot", () => {
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

    describe("combination of props", () => {
      it("renders correctly with status, label, and icon", async () => {
        subject.status = "positive";
        subject.label = "Success";
        subject.icon = "star";
        await elementUpdated(subject);

        expect(subject.status).to.equal("positive");
        expect(subject.shadowRoot?.querySelector("[part='text']")?.textContent).to.equal("Success");
        expect(subject.shadowRoot?.querySelector("zeta-icon")).to.exist;
      });

      it("renders correctly with status and label without icon", async () => {
        subject.status = "warning";
        subject.label = "Warning";
        subject.showIcon = false;
        await elementUpdated(subject);

        expect(subject.status).to.equal("warning");
        expect(subject.shadowRoot?.querySelector("[part='text']")?.textContent).to.equal("Warning");
        expect(subject.shadowRoot?.querySelector("[part='icon-container']")).to.not.exist;
      });
    });
  });

  describe("Dimensions", () => {
    it("sets the default dimensions correctly", async () => {
      subject.setAttribute("label", `Label`);
      subject.setAttribute("status", "negative");
      await elementUpdated(subject);

      const renderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      expect(renderedTotalWidth).to.be.within(70, 72); // Value should be 71, but use a range to account for browser / font rendering differences
      await expect(renderedTotalHeight).to.equal(28);
    });
    it("sets the default dimensions with icon correctly", async () => {
      subject.setAttribute("label", `Label`);
      subject.setAttribute("status", "negative");
      subject.setAttribute("icon", "star");
      await elementUpdated(subject);

      const renderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      expect(renderedTotalWidth).to.be.within(82, 85); // Value should be 83, but use a range to account for browser / font rendering differences
      await expect(renderedTotalHeight).to.equal(28);
    });
  });
  // describe("Styling", () => {});
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
