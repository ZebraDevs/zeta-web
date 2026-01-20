import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaShimmer } from "../../components/shimmer/shimmer.js";
import "../../components/shimmer/shimmer.js";

describe("zeta-shimmer", () => {
  let subject: ZetaShimmer;

  const createComponent = (template = `<zeta-shimmer></zeta-shimmer>`) => {
    // prettier-ignore
    return fixture<ZetaShimmer>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the shimmer element", () => {
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer");
      expect(shimmerElement).to.not.be.undefined;
    });
  });

  describe("Dimensions", () => {
    it("has default height of 20px", async () => {
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer") as HTMLElement;
      const computedStyle = getComputedStyle(shimmerElement);
      await expect(computedStyle.height).to.equal("20px");
    });

    it("respects custom height via CSS custom property", async () => {
      subject.style.setProperty("--shimmer-height", "30px");
      await subject.updateComplete;
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer") as HTMLElement;
      const computedStyle = getComputedStyle(shimmerElement);
      await expect(computedStyle.height).to.equal("30px");
    });

    it("respects custom width via CSS custom property", async () => {
      subject.style.setProperty("--shimmer-width", "200px");
      await subject.updateComplete;
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer") as HTMLElement;
      const computedStyle = getComputedStyle(shimmerElement);
      await expect(computedStyle.width).to.equal("200px");
    });
  });

  describe("Styling", () => {
    it("applies shimmer animation", async () => {
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer") as HTMLElement;
      const computedStyle = getComputedStyle(shimmerElement);
      await expect(computedStyle.animationName).to.equal("shimmer");
      await expect(computedStyle.animationDuration).to.equal("1.5s");
      await expect(computedStyle.animationIterationCount).to.equal("infinite");
    });

    it("has flex: 1 by default", async () => {
      const shimmerElement = subject.shadowRoot?.querySelector(".shimmer") as HTMLElement;
      const computedStyle = getComputedStyle(shimmerElement);
      await expect(computedStyle.flex).to.equal("1 1 0%");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {
  //   it("renders the shimmer correctly", () => {
  //     expect(subject).shadowDom.to.equalSnapshot();
  //   });
  // });

  // describe("Performance", () => {});
});
