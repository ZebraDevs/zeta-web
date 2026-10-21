import { fixture, html, unsafeStatic, expect, elementUpdated } from "@open-wc/testing";
import type { ZetaDivider } from "../../components/divider/divider.js";
import "../../components/divider/divider.js";
import "../../index.css";

describe("zeta-divider", () => {
  let subject: ZetaDivider;

  const createComponent = (template = `<zeta-divider></zeta-divider>`) => {
    // prettier-ignore
    return fixture<ZetaDivider>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });

    it("has the separator role", () => {
      expect(subject.getAttribute("role")).to.equal("separator");
    });

    it("does not set aria-orientation for a horizontal divider", () => {
      expect(subject.getAttribute("aria-orientation")).to.be.null;
    });

    it("sets aria-orientation for a vertical divider", async () => {
      subject.orientation = "vertical";
      await elementUpdated(subject);
      expect(subject.getAttribute("aria-orientation")).to.equal("vertical");
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", () => {
      const el = document.createElement("zeta-divider");
      expect(el.nodeName).to.equal("ZETA-DIVIDER");
    });

    // Styling block is skipped, so token assertions live here.
    it("has no corner radius and 1px thickness", () => {
      const style = getComputedStyle(subject);
      expect(style.borderTopLeftRadius).to.equal("0px");
      expect(style.height).to.equal("1px");
    });
  });

  describe("Styling", () => {
    it("defaults to horizontal orientation", () => {
      expect(subject.orientation).to.equal("horizontal");
      expect(subject.getAttribute("orientation")).to.equal("horizontal");
    });

    it("reflects the vertical orientation attribute", async () => {
      subject.orientation = "vertical";
      await elementUpdated(subject);
      expect(subject.getAttribute("orientation")).to.equal("vertical");
    });
  });

  // describe("Dimensions", () => {});
  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
