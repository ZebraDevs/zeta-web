import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaTag } from "../../../components/badges/tag/tag.js";
import "../../../components/badges/tag/tag.js";
import "../../../index.css";
import { contrastTest } from "../../accessibility-utils/accessibility-test-runner.js";
import { getCssVarValue } from "../../utils.js";

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
      const expectedHeight = parseInt(getCssVarValue(subject, "--spacing-2xl")) + 2 * parseInt(getCssVarValue(subject, "--spacing-minimum"));
      const textWidth = 26; // rendered width of "Tag"; font-dependent
      const pointWidth = 12; // fixed svg width in tag.ts
      const expectedWidth = textWidth + 2 * parseInt(getCssVarValue(subject, "--spacing-small")) + pointWidth;
      subject.setAttribute("direction", "left");
      subject.setAttribute("label", "Tag");
      await elementUpdated(subject);
      const leftRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const leftRenderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(leftRenderedTotalWidth).to.equal(expectedWidth);
      await expect(leftRenderedTotalHeight).to.equal(expectedHeight);

      subject.setAttribute("direction", "right");
      await elementUpdated(subject);
      const rightRenderedTotalWidth = Math.ceil(subject.getBoundingClientRect().width);
      const rightRenderedTotalHeight = subject.getBoundingClientRect().height;

      await expect(rightRenderedTotalWidth).to.equal(expectedWidth);
      await expect(rightRenderedTotalHeight).to.equal(expectedHeight);

      expect(rightRenderedTotalWidth).to.equal(leftRenderedTotalWidth);
      expect(rightRenderedTotalHeight).to.equal(leftRenderedTotalHeight);
    });
  });

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
