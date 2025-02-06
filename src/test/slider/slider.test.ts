import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSlider } from "../../components/slider/slider.js";
import "../../components/slider/slider.js";
import "../../index.css";
import { getCssVarColorValue } from "../utils.js";

describe("zeta-slider", () => {
  let subject: ZetaSlider;

  const createComponent = (template = `<zeta-slider></zeta-slider>`) => {
    // prettier-ignore
    return fixture<ZetaSlider>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
    await subject.updateComplete;
  });

  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the track", () => {
      const track = subject.shadowRoot?.querySelector(".track");
      expect(track).to.exist;
    });

    it("renders the left handle and not the right handle when type is default", () => {
      const handle = subject.shadowRoot?.querySelector("#handle-l");
      expect(handle).to.exist;

      const handleR = subject.shadowRoot?.querySelector("#handle-r");
      expect(handleR).to.not.exist;
    });

    it("renders the right handle when type is range", async () => {
      subject.type = "range";
      await subject.updateComplete;
      const handle = subject.shadowRoot?.querySelector("#handle-r");
      expect(handle).to.exist;
    });

    it("sets initial values correctly", async () => {
      await expect(subject.value).to.equal(50);
      await expect(subject.lowerValue).to.equal(10);
      await expect(subject.upperValue).to.equal(90);
      await expect(subject.min).to.equal(0);
      await expect(subject.max).to.equal(100);
      await expect(subject.stepIncrement).to.equal(undefined);
      await expect(subject.type).to.equal("default");
    });
  });

  describe("Dimensions", () => {
    it("sets the track height correctly", async () => {
      const track = subject.shadowRoot?.querySelector(".track");

      await expect(track?.clientHeight).to.equal(4);
    });

    it("sets the handle width and height correctly", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      await expect(handle?.clientHeight).to.equal(16);
      await expect(handle?.clientHeight).to.equal(16);
    });

    it("sets the correct margin on the slider", async () => {
      const track = subject.shadowRoot?.querySelector(".slider");
      await expect(getComputedStyle(track as Element).margin).to.equal("0px 8px");
    });
  });

  describe("Styling", () => {
    it("sets the correct background color for the track", async () => {
      const track = subject.shadowRoot?.querySelector(".track");
      await expect(getComputedStyle(track as Element).backgroundColor).to.equal(getCssVarColorValue(track!, "--surface-disabled"));
    });

    it("sets the correct color for the selected area", async () => {
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      await expect(getComputedStyle(selected as Element).backgroundColor).to.equal(getCssVarColorValue(selected!, "--main-default"));
    });

    it("sets the correct background color for the handle", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      await expect(getComputedStyle(handle as Element).backgroundColor).to.equal(getCssVarColorValue(handle!, "--main-default"));
    });

    it("sets the correct color for the selected area and handle when pressed down", async () => {
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      const handle = subject.shadowRoot?.querySelector(".handle");

      handle?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));

      await expect(getComputedStyle(selected as Element).backgroundColor).to.equal(getCssVarColorValue(selected!, "--main-primary"));
      await expect(getComputedStyle(handle as Element).backgroundColor).to.equal(getCssVarColorValue(handle!, "--main-primary"));

      handle?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));
    });

    it("sets the correct border radius for the handle", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      await expect(getComputedStyle(handle as Element).borderRadius).to.equal("0px");

      subject.rounded = true;
      await subject.updateComplete;
      await expect(getComputedStyle(handle as Element).borderRadius).to.equal("360px");
    });

    it("sets the correct border radius for the track", async () => {
      const track = subject.shadowRoot?.querySelector(".track");
      await expect(getComputedStyle(track as Element).borderRadius).to.equal("0px");

      subject.rounded = true;
      await subject.updateComplete;
      await expect(getComputedStyle(track as Element).borderRadius).to.equal("4px");
    });
  });

  describe("Interaction", () => {
    it("updates the value when the handle is dragged", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      handle?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
      handle?.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true, clientX: 800 }));
      handle?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));

      await expect(subject.value).to.equal(100);
    });

    it("updates the lower and upper values when the handles are dragged", async () => {
      subject.type = "range";
      await subject.updateComplete;

      await expect(subject.lowerValue).to.equal(10);
      await expect(subject.upperValue).to.equal(90);

      const handleL = subject.shadowRoot?.querySelector("#handle-l");
      const handleR = subject.shadowRoot?.querySelector("#handle-r");

      handleL?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
      handleL?.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true, clientX: 250 }));
      handleL?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));

      handleR?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
      handleR?.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true, clientX: 500 }));
      handleR?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));

      expect(subject.lowerValue).to.be.closeTo(30, 5);
      expect(subject.upperValue).to.be.closeTo(65, 5);
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
