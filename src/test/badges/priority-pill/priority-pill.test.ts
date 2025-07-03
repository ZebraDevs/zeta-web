import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaPriorityPill } from "../../../components/badges/badges";
import "../../../components/badges/priority-pill/priority-pill";
import "../../../css/styles.css";
import "../../../generated/tokens/primitives.css";
import "../../../generated/tokens/semantics.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner";

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
    ["small", "large"].forEach(size => {
      ["urgent", "high", "medium", "low"].forEach(status => {
        it(`meets contrast requirements for ${status}`, async () => {
          subject.setAttribute("status", status);
          subject.setAttribute("size", size);
          await subject.updateComplete;

          const index = subject.shadowRoot?.querySelector(".number");
          const label = subject.shadowRoot?.querySelector(".text");
          const container = subject.shadowRoot?.querySelector(".container");

          expect(index).to.exist;
          expect(label).to.exist;
          expect(container).to.exist;

          await contrastTest(`Priority pill index ${status} / ${size}`, index!, index!);
          await contrastTest(`Priority pill label ${status} / ${size}`, label!, container!);
        });
        it("meets aria requirements", async () => {
          await expect(subject).to.be.accessible();
          await expect(subject).shadowDom.to.be.accessible();
        });
      });
    });
  });
  describe("Content", () => {
    ["urgent", "high", "medium", "low"].forEach((status, i) => {
      it(`provides default values for ${status}`, async () => {
        subject.setAttribute("status", status);
        await subject.updateComplete;

        const index = subject.shadowRoot?.querySelector(".number");
        const label = subject.shadowRoot?.querySelector(".text");
        const container = subject.shadowRoot?.querySelector(".container");
        const indexValue = status === "urgent" ? "U" : i.toString();
        expect(label).to.exist;
        expect(container).to.exist;

        await expect(index?.textContent).to.equal(indexValue);
        await expect(label?.textContent).to.equal(status.charAt(0).toUpperCase() + status.slice(1));
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

      await expect(index?.textContent).to.equal("5");
      await expect(label?.textContent).to.equal("Custom Priority");
    });
  });
  describe("Dimensions", () => {
    it("renders badge size large", async () => {
      subject.setAttribute("size", "large");
      subject.setAttribute("type", "badge");
      await subject.updateComplete;

      const renderedTotalWidthBadge = subject.getBoundingClientRect().width;
      const renderedTotalHeightBadge = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidthBadge).to.equal(28);
      await expect(renderedTotalHeightBadge).to.equal(28);
    });
    it("renders lozenge size large", async () => {
      subject.setAttribute("size", "large");
      subject.setAttribute("type", "lozenge");
      subject.setAttribute("status", "urgent");
      subject.setAttribute("label", "Label");
      await subject.updateComplete;
      const renderedTotalWidthLozenge = Math.ceil(subject.getBoundingClientRect().width);
      const renderedTotalHeightLozenge = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidthLozenge).to.equal(79);
      await expect(renderedTotalHeightLozenge).to.equal(28);
    });
    it("renders badge size small", async () => {
      subject.setAttribute("size", "small");
      subject.setAttribute("type", "badge");
      await subject.updateComplete;

      const renderedTotalWidthBadge = subject.getBoundingClientRect().width;
      const renderedTotalHeightBadge = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidthBadge).to.equal(20);
      await expect(renderedTotalHeightBadge).to.equal(20);
    });
    it("renders lozenge size small", async () => {
      subject.setAttribute("size", "small");
      subject.setAttribute("type", "lozenge");
      subject.setAttribute("status", "urgent");
      subject.setAttribute("label", "Label");
      await subject.updateComplete;
      const renderedTotalWidthLozenge = Math.ceil(subject.getBoundingClientRect().width);
      const renderedTotalHeightLozenge = subject.getBoundingClientRect().height;

      await expect(renderedTotalWidthLozenge).to.equal(61);
      await expect(renderedTotalHeightLozenge).to.equal(20);
    });
  });
  // describe("Styling", () => {});
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
