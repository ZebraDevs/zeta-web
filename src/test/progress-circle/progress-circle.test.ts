import { assert, expect, fixture, html, oneEvent } from "@open-wc/testing";
import { ZetaProgressCircle } from "../../components/progress-indicators/progress-circle/progress-circle.js";
import "../../components/progress-indicators/progress-circle/progress-circle.js";
import { ZetaCancelUploadEvent } from "../../events.js";
import "../../index.css";
import { getCssVarColorValue, getCssVarValue } from "../utils.js";

describe("zeta-progress-circle", () => {
  describe("Accessibility", () => {
    it("exposes the progress value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle progress="30"></zeta-progress-circle>`);
      const svg = el.shadowRoot!.querySelector("svg")!;
      expect(svg.getAttribute("role")).to.equal("progressbar");
      expect(svg.getAttribute("aria-valuenow")).to.equal("30");
    });

    it("meets accessibility requirements as an upload control", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle type="upload" progress="40"></zeta-progress-circle>`);
      await expect(el).shadowDom.to.be.accessible();
    });

    it("gives the cancel action an accessible name", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle type="upload"></zeta-progress-circle>`);
      const btn = el.shadowRoot!.querySelector("button.cancel")!;
      expect(btn.getAttribute("aria-label")).to.equal("Cancel upload");
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-progress-circle");
      assert.equal("ZETA-PROGRESS-CIRCLE", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaProgressCircle();
      assert.equal("ZETA-PROGRESS-CIRCLE", el.nodeName);
    });

    it("should set value to 100 if above 100", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
      el.progress = 101;
      await el.updateComplete;
      assert.equal(el.progress, 100);
    });

    it("should set value to 0 if below 0", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
      el.progress = -1;
      await el.updateComplete;
      assert.equal(el.progress, 0);
    });

    it("should set value ", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle progress="50"></zeta-progress-circle>`);
      assert.equal(el.progress, 50);
    });

    it("should render uploading components", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
      el.type = "upload";
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector(".uploading")).to.exist;
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    const circles = (el: ZetaProgressCircle) => [...el.shadowRoot!.querySelectorAll("circle")].map(c => getComputedStyle(c));

    it("draws the track in border-subtle and the arc in border-info", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle progress="50"></zeta-progress-circle>`);
      const [track, arc] = circles(el);
      expect(track.stroke).to.equal(getCssVarColorValue(el, "--border-subtle"));
      expect(arc.stroke).to.equal(getCssVarColorValue(el, "--border-info"));
    });

    it("draws both rings at stroke-heavy", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
      const heavy = getCssVarValue(el, "--stroke-heavy").trim();
      for (const c of circles(el)) expect(c.strokeWidth).to.equal(heavy);
    });

    it("hides the track with hide-track", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle hide-track></zeta-progress-circle>`);
      expect(circles(el)[0].stroke).to.equal("rgba(0, 0, 0, 0)");
    });

    it("styles the upload control with indicator-medium text and an outlined ghost cancel button", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle type="upload" progress="40"></zeta-progress-circle>`);
      const percentage = getComputedStyle(el.shadowRoot!.querySelector(".percentage")!);
      expect(percentage.fontSize).to.equal(getCssVarValue(el, "--indicator-medium-font-size").trim());
      expect(percentage.color).to.equal(getCssVarColorValue(el, "--foreground-primary"));

      const cancel = getComputedStyle(el.shadowRoot!.querySelector(".cancel")!);
      expect(cancel.backgroundColor).to.equal(getCssVarColorValue(el, "--interactive-ghost-background-hover"));
      expect(cancel.borderTopColor).to.equal(getCssVarColorValue(el, "--interactive-neutral-border-default"));
      expect(cancel.borderTopWidth).to.equal(getCssVarValue(el, "--stroke-base").trim());
    });
  });

  describe("Interaction", () => {
    it("starts and stops spinning with indeterminate", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle indeterminate></zeta-progress-circle>`);
      expect(el.getAnimations()).to.have.length(1);
      el.progress = 10;
      el.requestUpdate();
      await el.updateComplete;
      expect(el.getAnimations()).to.have.length(1);
      el.indeterminate = false;
      await el.updateComplete;
      expect(el.getAnimations()).to.have.length(0);
    });

    it("should fire a ZetaCancelUploadEvent on button click", async () => {
      // prettier-ignore
      const el = await fixture<ZetaProgressCircle>(html`<zeta-progress-circle></zeta-progress-circle>`);
      const eventListener = oneEvent(el, "cancelUpload");

      el.type = "upload";
      await el.updateComplete;

      const btn = el.shadowRoot?.querySelector(".cancel") as HTMLElement;
      btn.click();
      await el.updateComplete;

      const event = await eventListener;
      assert(event.type, new ZetaCancelUploadEvent().name);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
