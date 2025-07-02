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
        const bg = subject.shadowRoot?.querySelector(".container");
        const fg = subject.shadowRoot?.querySelector(".text");
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
  //   describe("Content", () => {});
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
