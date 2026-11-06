import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaSlider } from "../../components/slider/slider.js";
import "../../components/slider/slider.js";
import "../../index.css";
import { sendKeys } from "@web/test-runner-commands";
import { getCssVarColorValue, getCssVarPxValue, getCssVarValue } from "../utils.js";

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
    it("meets accessibility requirements", () => {
      expect(subject).shadowDom.to.be.accessible();
    });

    it("exposes each thumb as a slider with its value, minimum and maximum", async () => {
      const handle = subject.shadowRoot?.querySelector("#handle-l");
      expect(handle?.getAttribute("role")).to.equal("slider");
      expect(handle?.getAttribute("tabindex")).to.equal("0");
      expect(handle?.getAttribute("aria-valuenow")).to.equal("50");
      expect(handle?.getAttribute("aria-valuemin")).to.equal("0");
      expect(handle?.getAttribute("aria-valuemax")).to.equal("100");

      subject.type = "range";
      await subject.updateComplete;
      const lower = subject.shadowRoot?.querySelector("#handle-l");
      const upper = subject.shadowRoot?.querySelector("#handle-r");
      expect(lower?.getAttribute("aria-valuenow")).to.equal("10");
      expect(upper?.getAttribute("aria-valuenow")).to.equal("90");
      expect(lower?.getAttribute("aria-label")).to.not.equal(upper?.getAttribute("aria-label"));
    });

    it("removes the thumb from the tab order when disabled", async () => {
      subject.disabled = true;
      await subject.updateComplete;
      expect(subject.shadowRoot?.querySelector("#handle-l")?.getAttribute("tabindex")).to.equal("-1");
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

    it("sets initial values correctly", () => {
      expect(subject.value).to.equal(50);
      expect(subject.lowerValue).to.equal(10);
      expect(subject.upperValue).to.equal(90);
      expect(subject.min).to.equal(0);
      expect(subject.max).to.equal(100);
      expect(subject.stepIncrement).to.equal(undefined);
      expect(subject.type).to.equal("default");
    });
  });

  describe("Dimensions", () => {
    it("sets the track height correctly", () => {
      const track = subject.shadowRoot?.querySelector(".track");

      expect(track?.clientHeight).to.equal(parseInt(getCssVarValue(track!, "--space-2xs")));
    });

    it("sizes the thumb to control-icon-sm at rest inside a control-icon-md box", () => {
      const handle = subject.shadowRoot?.querySelector(".handle") as HTMLElement;
      const box = getCssVarPxValue(handle, "--control-icon-md");
      const thumb = getCssVarPxValue(handle, "--control-icon-sm");
      expect(handle.clientHeight).to.equal(box);
      expect(handle.clientWidth).to.equal(box);
      expect(parseFloat(getComputedStyle(handle).paddingTop)).to.equal((box - thumb) / 2);
    });

    it("grows only the dragged thumb to control-icon-md", async () => {
      subject.type = "range";
      await subject.updateComplete;
      const handleL = subject.shadowRoot?.querySelector("#handle-l") as HTMLElement;
      const handleR = subject.shadowRoot?.querySelector("#handle-r") as HTMLElement;

      handleL.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
      expect(getComputedStyle(handleL).paddingTop).to.equal("0px");
      expect(getComputedStyle(handleR).paddingTop).to.not.equal("0px");
      window.dispatchEvent(new MouseEvent("mouseup"));
      expect(getComputedStyle(handleL).paddingTop).to.not.equal("0px");
    });

    it("sets the correct margin on the slider", () => {
      const slider = subject.shadowRoot?.querySelector(".slider") as HTMLElement;
      const half = getCssVarPxValue(slider, "--control-icon-md") / 2;
      expect(getComputedStyle(slider).margin).to.equal(`0px ${half}px`);
    });
  });

  describe("Styling", () => {
    it("sets the correct background color for the track", () => {
      const track = subject.shadowRoot?.querySelector(".track");
      expect(getComputedStyle(track as Element).backgroundColor).to.equal(getCssVarColorValue(track!, "--surface-track"));
    });

    it("sets the correct color for the selected area", () => {
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      expect(getComputedStyle(selected as Element).backgroundColor).to.equal(getCssVarColorValue(selected!, "--interactive-neutral-foreground-default"));
    });

    it("sets the correct background color for the handle", () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      expect(getComputedStyle(handle as Element).backgroundColor).to.equal(getCssVarColorValue(handle!, "--interactive-neutral-foreground-default"));
    });

    it("sets the selected color on the fill and both thumbs when a thumb is pressed down", async () => {
      subject.type = "range";
      await subject.updateComplete;
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      const handleL = subject.shadowRoot?.querySelector("#handle-l");
      const handleR = subject.shadowRoot?.querySelector("#handle-r");

      handleL?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));

      const selectedColor = getCssVarColorValue(selected!, "--interactive-ghost-foreground-default");
      expect(getComputedStyle(selected as Element).backgroundColor).to.equal(selectedColor);
      expect(getComputedStyle(handleL as Element).backgroundColor).to.equal(selectedColor);
      expect(getComputedStyle(handleR as Element).backgroundColor).to.equal(selectedColor);

      window.dispatchEvent(new MouseEvent("mouseup"));
      expect(getComputedStyle(selected as Element).backgroundColor).to.equal(getCssVarColorValue(selected!, "--interactive-neutral-foreground-default"));
    });

    it("shows the fill and thumb in the disabled color when disabled", async () => {
      subject.disabled = true;
      await subject.updateComplete;
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      const handle = subject.shadowRoot?.querySelector(".handle");
      const disabledColor = getCssVarColorValue(handle!, "--interactive-neutral-foreground-disabled");

      expect(getComputedStyle(selected as Element).display).to.not.equal("none");
      expect(getComputedStyle(selected as Element).backgroundColor).to.equal(disabledColor);
      expect(getComputedStyle(handle as Element).backgroundColor).to.equal(disabledColor);
    });

    it("sets the correct border radius for the handle", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      expect(getComputedStyle(handle as Element).borderRadius).to.equal(getCssVarValue(handle as Element, "--radius-pill"));

      subject.rounded = false;
      await subject.updateComplete;
      expect(getComputedStyle(handle as Element).borderRadius).to.equal("0px");
    });

    it("sets the correct border radius for the track and keeps the fill square-ended", async () => {
      const track = subject.shadowRoot?.querySelector(".track");
      const selected = subject.shadowRoot?.querySelector(".selected-area");
      expect(getComputedStyle(track as Element).borderRadius).to.equal(getCssVarValue(track as Element, "--radius-xs"));
      expect(getComputedStyle(selected as Element).borderRadius).to.equal("0px");

      subject.rounded = false;
      await subject.updateComplete;
      expect(getComputedStyle(track as Element).borderRadius).to.equal("0px");
      expect(getComputedStyle(selected as Element).borderRadius).to.equal("0px");
    });

    it("renders step dots in foreground-inverse", async () => {
      subject.stepIncrement = 10;
      await subject.updateComplete;
      const steps = subject.shadowRoot?.querySelectorAll(".step");
      expect(steps?.length).to.equal(11);
      expect(getComputedStyle(steps![0]).backgroundColor).to.equal(getCssVarColorValue(steps![0], "--foreground-inverse"));
      expect(getComputedStyle(steps![0]).width).to.equal(getCssVarValue(steps![0], "--space-3xs"));
    });

    it("shows a focus ring on a keyboard-focused thumb", async () => {
      const handle = subject.shadowRoot?.querySelector(".handle") as HTMLElement;
      await sendKeys({ press: "Tab" });
      expect(subject.shadowRoot?.activeElement).to.equal(handle);
      expect(getComputedStyle(handle).outlineColor).to.equal(getCssVarColorValue(handle, "--border-focus"));
      expect(getComputedStyle(handle).outlineWidth).to.equal(getCssVarValue(handle, "--stroke-thick"));
    });
  });

  describe("Interaction", () => {
    it("updates the value when the handle is dragged", () => {
      const handle = subject.shadowRoot?.querySelector(".handle");
      handle?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
      handle?.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, composed: true, clientX: 800 }));
      handle?.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, composed: true }));

      expect(subject.value).to.equal(100);
    });

    it("updates the lower and upper values when the handles are dragged", async () => {
      subject.type = "range";
      await subject.updateComplete;

      expect(subject.lowerValue).to.equal(10);
      expect(subject.upperValue).to.equal(90);

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

    it("moves the thumb to the clicked point on the track", async () => {
      const track = subject.shadowRoot?.querySelector("#track") as HTMLElement;
      const rect = track.getBoundingClientRect();
      track.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, clientX: rect.x + rect.width * 0.25 }));
      await subject.updateComplete;
      expect(subject.value).to.be.closeTo(25, 1);
    });

    it("changes the value with the keyboard and fires change", async () => {
      subject.stepIncrement = 10;
      await subject.updateComplete;
      const handle = subject.shadowRoot?.querySelector("#handle-l") as HTMLElement;
      const changes: number[] = [];
      subject.addEventListener("change", (e: Event) => changes.push((e as CustomEvent<{ value: number }>).detail.value));
      handle.focus();

      await sendKeys({ press: "ArrowRight" });
      expect(subject.value).to.equal(60);
      await sendKeys({ press: "ArrowLeft" });
      await sendKeys({ press: "ArrowLeft" });
      expect(subject.value).to.equal(40);
      await sendKeys({ press: "End" });
      expect(subject.value).to.equal(100);
      await sendKeys({ press: "ArrowRight" });
      expect(subject.value).to.equal(100);
      await sendKeys({ press: "Home" });
      expect(subject.value).to.equal(0);
      expect(changes).to.deep.equal([60, 50, 40, 100, 0]);
    });

    it("ignores track clicks when disabled", async () => {
      subject.disabled = true;
      await subject.updateComplete;
      const track = subject.shadowRoot?.querySelector("#track") as HTMLElement;
      const rect = track.getBoundingClientRect();
      track.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, clientX: rect.x + rect.width * 0.25 }));
      await subject.updateComplete;
      expect(subject.value).to.equal(50);
    });

    it("snaps keyboard moves to the nearest step", async () => {
      subject.stepIncrement = 20;
      subject.value = 50;
      await subject.updateComplete;
      (subject.shadowRoot?.querySelector("#handle-l") as HTMLElement).focus();
      await sendKeys({ press: "ArrowRight" });
      expect(subject.value).to.equal(80);
    });

    it("stops a range thumb at the other thumb when moved with the keyboard", async () => {
      subject.type = "range";
      await subject.updateComplete;
      (subject.shadowRoot?.querySelector("#handle-l") as HTMLElement).focus();
      await sendKeys({ press: "End" });
      expect(subject.lowerValue).to.equal(90);
      expect(subject.upperValue).to.equal(90);
    });
  });

  describe("Golden", () => {});

  describe("Performance", () => {});
});
