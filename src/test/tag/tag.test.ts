import { fixture, html, elementUpdated, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaTag } from "../../components/badges/tag/tag.js";
import "../../components/badges/tag/tag.js";

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
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("sets the default properties correctly", async () => {
      await expect(subject.point).to.equal("right");
      await expect(subject.text).to.equal("");
    });

    it("manages point attribute correctly", async () => {
      let pointValue = "left";

      subject.setAttribute("point", pointValue);
      await expect(subject.point).to.equal(pointValue);

      pointValue = "right";

      subject.setAttribute("point", pointValue);
      await expect(subject.point).to.equal(pointValue);
    });

    it("manages text attribute correctly", async () => {
      const textValue = "Testing service";
      subject.setAttribute("text", textValue);
      await expect(subject.text).to.equal(textValue);
    });

    it("renders the passed text into a span", async () => {
      const textValue = "Testing service";
      subject.setAttribute("text", textValue);
      await elementUpdated(subject);

      const spanEl = subject.shadowRoot ? (subject.shadowRoot.querySelector("span") as HTMLSpanElement) : (subject.querySelector("span") as HTMLSpanElement);

      await expect(spanEl.textContent).to.equal(textValue);
    });
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
