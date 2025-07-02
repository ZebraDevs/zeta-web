import { fixture, html, expect, unsafeStatic, elementUpdated } from "@open-wc/testing";
import type { ZetaLabel } from "../../../components/badges/badges";
import "../../../components/badges/label/label";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";
import "../../../css/styles.css";

describe("zeta-label", () => {
  let subject: ZetaLabel;
  const createComponent = (template = `<zeta-label></zeta-label>`) => {
    // prettier-ignore
    return fixture<ZetaLabel>(html`${unsafeStatic(template)}`);
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
          await contrastTest(`Label ${status}`, fg, bg);
        }
      });
      it("meets aria requirements", async () => {
        await expect(subject).to.be.accessible();
        await expect(subject).shadowDom.to.be.accessible();
      });
    });
  });

  // describe("Content", () => {});
  describe("Dimensions", () => {
    it("sets the default dimensions correctly", async () => {
      subject.setAttribute("label", `Label`);
      subject.setAttribute("status", "negative");
      await elementUpdated(subject);

      const renderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const renderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidth).to.equal(38);
      await expect(renderedTotalHeight).to.equal(16);
    });
  });
  // describe("Styling", () => {});
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
