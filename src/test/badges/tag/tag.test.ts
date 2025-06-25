import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaTag } from "../../../components/badges/tag/tag.js";
import "../../../components/badges/tag/tag.js";
import "../../../css/styles.css";
import "../../../generated/tokens/primitives.css";
import "../../../generated/tokens/semantics.css";
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
    it("it meets accessibility requirements", async () => {
      subject.setAttribute("label", "Label");
      await elementUpdated(subject);
      const element = subject.shadowRoot?.querySelector(".text");
      expect(element, "Element should exist").to.exist;
      await contrastTest("Tag", element!, element!);
    });
  });

  describe("Content", () => {
    it("sets the default properties correctly", async () => {
      await expect(subject.direction).to.equal("right");
      await expect(subject.label).to.equal(undefined);
    });

    it("manages direction attribute correctly", async () => {
      let pointValue = "left";

      subject.setAttribute("direction", pointValue);
      await expect(subject.direction).to.equal(pointValue);

      pointValue = "right";

      subject.setAttribute("direction", pointValue);
      await expect(subject.direction).to.equal(pointValue);
    });

    it("manages label attribute correctly", async () => {
      const textValue = "Testing service";
      subject.setAttribute("label", textValue);
      await expect(subject.label).to.equal(textValue);
    });

    it("renders the passed text into a span", async () => {
      const textValue = "Testing service";
      subject.setAttribute("label", textValue);
      await elementUpdated(subject);

      const spanEl = subject.shadowRoot ? (subject.shadowRoot.querySelector("span") as HTMLSpanElement) : (subject.querySelector("span") as HTMLSpanElement);

      await expect(spanEl.textContent).to.equal(textValue);
    });
  });

  describe("Dimensions", () => {
    it("sets the default dimensions correctly", async () => {
      subject.setAttribute("direction", "left");
      subject.setAttribute("label", "Tag");
      await elementUpdated(subject);
      const leftRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const leftRenderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(leftRenderedTotalWidth).to.equal(54);
      await expect(leftRenderedTotalHeight).to.equal(32);

      subject.setAttribute("direction", "right");
      await elementUpdated(subject);
      const rightRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const rightRenderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(rightRenderedTotalWidth).to.equal(54);
      await expect(rightRenderedTotalHeight).to.equal(32);

      await expect(rightRenderedTotalWidth).to.equal(leftRenderedTotalWidth);
      await expect(rightRenderedTotalHeight).to.equal(leftRenderedTotalHeight);
    });
  });

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
