import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaTag } from "../../../components/badges/tag/tag.js";
import "../../../components/badges/tag/tag.js";
import "../../../index.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner.js";

describe("zeta-tag", () => {
  let subject: ZetaTag;

  const createComponent = (template = "<zeta-tag></zeta-tag>") => {
    // prettier-ignore
    return fixture<ZetaTag>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("it meets contrast requirements", async () => {
      subject.setAttribute("label", "Label");
      await elementUpdated(subject);
      const element = subject.shadowRoot?.querySelector(".text");
      expect(element, "Element should exist").to.exist;
      await contrastTest("Tag", element!, element!);
    });
    it("meets aria requirements", () => {
      expect(subject).to.be.accessible();
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the default properties correctly", () => {
      expect(subject.direction).to.equal("right");
      expect(subject.label).to.equal(undefined);
    });

    it("manages direction attribute correctly", () => {
      let pointValue = "left";

      subject.setAttribute("direction", pointValue);
      expect(subject.direction).to.equal(pointValue);

      pointValue = "right";

      subject.setAttribute("direction", pointValue);
      expect(subject.direction).to.equal(pointValue);
    });

    it("manages label attribute correctly", () => {
      const textValue = "Testing service";
      subject.setAttribute("label", textValue);
      expect(subject.label).to.equal(textValue);
    });

    it("renders the passed text into a span", async () => {
      const textValue = "Testing service";
      subject.setAttribute("label", textValue);
      await elementUpdated(subject);

      const spanEl = subject.shadowRoot ? (subject.shadowRoot.querySelector("span") as HTMLSpanElement) : (subject.querySelector("span") as HTMLSpanElement);

      expect(spanEl.textContent).to.equal(textValue);
    });
  });

  describe("Dimensions", () => {
    it("sets the default dimensions correctly", async () => {
      subject.setAttribute("direction", "left");
      subject.setAttribute("label", "Tag");
      await elementUpdated(subject);
      const leftRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const leftRenderedTotalHeight = subject.getBoundingClientRect().height;

      expect(leftRenderedTotalWidth).to.equal(54);
      expect(leftRenderedTotalHeight).to.equal(32);

      subject.setAttribute("direction", "right");
      await elementUpdated(subject);
      const rightRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const rightRenderedTotalHeight = subject.getBoundingClientRect().height;

      expect(rightRenderedTotalWidth).to.equal(54);
      expect(rightRenderedTotalHeight).to.equal(32);

      expect(rightRenderedTotalWidth).to.equal(leftRenderedTotalWidth);
      expect(rightRenderedTotalHeight).to.equal(leftRenderedTotalHeight);
    });
  });

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
