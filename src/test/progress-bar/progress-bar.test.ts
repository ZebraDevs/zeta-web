import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaProgressBar } from "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../components/progress-indicators/progress-bar/progress-bar.js";
import "../../index.css";
import { getCssVarColorValue, getCssVarValue } from "../utils.js";

describe("zeta-progress-bar", () => {
  let subject: ZetaProgressBar;

  const createComponent = (template = `<zeta-progress-bar></zeta-progress-bar>`) => {
    // prettier-ignore
    return fixture<ZetaProgressBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
      subject.label = "Uploading";
      subject.indeterminate = true;
      await subject.updateComplete;
      await expect(subject).shadowDom.to.be.accessible();
    });

    it("exposes value and label to assistive tech", async () => {
      subject.value = 0.42;
      subject.label = "Uploading file";
      await subject.updateComplete;
      const track = subject.shadowRoot!.querySelector(".track")!;
      expect(track.getAttribute("role")).to.equal("progressbar");
      expect(track.getAttribute("aria-valuenow")).to.equal("42");
      expect(track.getAttribute("aria-labelledby")).to.equal("label");
      subject.indeterminate = true;
      await subject.updateComplete;
      expect(track.hasAttribute("aria-valuenow")).to.be.false;
    });
  });

  describe("Content", () => {
    it("hides the details row when there is no label or details content", () => {
      expect(subject.shadowRoot!.querySelector(".details")!.hasAttribute("hidden")).to.be.true;
    });

    it("renders slotted details content", async () => {
      // prettier-ignore
      const el = await createComponent(`<zeta-progress-bar><span slot="details">3 of 5</span></zeta-progress-bar>`);
      await el.updateComplete;
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>("slot[name=details]")!;
      expect(slot.assignedElements()[0].textContent).to.equal("3 of 5");
      expect(el.shadowRoot!.querySelector(".details")!.hasAttribute("hidden")).to.be.false;
    });
  });

  describe("Dimensions", () => {
    const height = () => getComputedStyle(subject.shadowRoot!.querySelector(".wrapper")!).height;
    const token = (name: string) => getCssVarValue(subject, name).trim();

    it("defaults to large at space-lg", () => {
      expect(subject.size).to.equal("large");
      expect(subject.getAttribute("size")).to.equal("large");
      expect(height()).to.equal(token("--space-lg"));
    });

    it("renders small at space-sm", async () => {
      subject.size = "small";
      await subject.updateComplete;
      expect(height()).to.equal(token("--space-sm"));
    });

    it("keeps deprecated 'thin' and 'medium' as aliases for small and large", async () => {
      subject.size = "thin";
      await subject.updateComplete;
      expect(height()).to.equal(token("--space-sm"));
      subject.size = "medium";
      await subject.updateComplete;
      expect(height()).to.equal(token("--space-lg"));
    });

    it("separates the label row from the bar by space-lg", async () => {
      subject.label = "Uploading";
      await subject.updateComplete;
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".progress-bar")!).rowGap).to.equal(token("--space-lg"));
    });
  });

  describe("Styling", () => {
    const token = (name: string) => getCssVarValue(subject, name).trim();

    it("uses token radius per size and sharp shape", async () => {
      const radius = () => getComputedStyle(subject.shadowRoot!.querySelector(".wrapper")!).borderRadius;
      expect(radius()).to.equal(token("--radius-md"));
      subject.size = "small";
      await subject.updateComplete;
      expect(radius()).to.equal(token("--radius-sm"));
      subject.rounded = false;
      await subject.updateComplete;
      expect(radius()).to.equal(token("--radius-none"));
    });

    it("colours the indicator foreground-link and the track surface-track", async () => {
      subject.value = 0.5;
      await subject.updateComplete;
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".bar")!).backgroundColor).to.equal(getCssVarColorValue(subject, "--foreground-link"));
      expect(getComputedStyle(subject.shadowRoot!.querySelector(".track")!).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-track"));
    });

    it("styles the label with label-medium in foreground-secondary", async () => {
      subject.label = "Uploading";
      await subject.updateComplete;
      const label = getComputedStyle(subject.shadowRoot!.querySelector("label")!);
      expect(label.color).to.equal(getCssVarColorValue(subject, "--foreground-secondary"));
      expect(label.fontSize).to.equal(token("--label-medium-font-size"));
      expect(label.lineHeight).to.equal(token("--label-medium-line-height"));
    });

    it("hides the track with hide-track", async () => {
      const track = subject.shadowRoot!.querySelector(".track")!;
      expect(getComputedStyle(track).backgroundColor).to.equal(getCssVarColorValue(subject, "--surface-track"));
      subject.hideTrack = true;
      await subject.updateComplete;
      expect(getComputedStyle(track).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
      subject.buffering = true;
      await subject.updateComplete;
      expect(getComputedStyle(track).backgroundColor).to.equal("rgba(0, 0, 0, 0)");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
