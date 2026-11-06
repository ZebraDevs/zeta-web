import { assert, fixture, html, oneEvent } from "@open-wc/testing";
import { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import "../../components/stepper-input/stepper-input.js";
import "../../index.css";
import { ZetaStepperChangeEvent } from "../../events.js";
import { getCssVarColorValue, getCssVarPxValue, KeyboardActions } from "../utils.js";

describe("zeta-stepper-input", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-stepper-input");
      assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaStepperInput();
      assert.equal("ZETA-STEPPER-INPUT", el.nodeName);
    });

    it("sets value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input value=${10}></zeta-stepper-input>`);
      assert.equal(el.value, "10");
    });

    it("sets value to max value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${9} value=${10}></zeta-stepper-input>`);
      assert.equal(el.value, "9");
    });

    it("sets value to min value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${9} value=${8}></zeta-stepper-input>`);
      assert.equal(el.value, "9");
    });

    it("doesn't change value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
      el.value = "123asd";
      el.requestUpdate();
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.value, "0");
    });

    it("doesn't change value via input change", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input></zeta-stepper-input>`);
      el.value = "test";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "0");
    });
    it("sets value to min value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${5}></zeta-stepper-input>`);
      el.value = "4";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "5");
    });
    it("sets value to max value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input max=${5}></zeta-stepper-input>`);
      el.value = "6";
      await el.updateComplete;
      el.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      el.dispatchEvent(new Event("change", { bubbles: true, composed: true }));

      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      await el.updateComplete;

      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input!.value, "5");
    });
    it("sets value to negative value via input onchange", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input min=${-10}></zeta-stepper-input>`);
      el.value = "-4";
      el?.dispatchEvent(new ZetaStepperChangeEvent({ value: el.value }).toEvent());
      await el.updateComplete;
      assert.equal(el.value, "-4");
    });

    it("should coerce numeric string attribute min/max to numbers", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="5" max="10"></zeta-stepper-input>`);
      assert.equal(el.min, 5);
      assert.equal(el.max, 10);
    });

    it("should set min/max to undefined when attribute is absent", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      assert.isUndefined(el.min);
      assert.isUndefined(el.max);
    });

    it("should not clamp value when min is a non-numeric string", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="2"></zeta-stepper-input>`);
      el.min = "abc";
      el.requestUpdate();
      await el.updateComplete;
      assert.equal(el.value, "2");
    });

    it("should not clamp value when max is a non-numeric string", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="99"></zeta-stepper-input>`);
      el.max = "abc";
      el.requestUpdate();
      await el.updateComplete;
      assert.equal(el.value, "99");
    });

    it("should not disable decrement button when min is a non-numeric string", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="0"></zeta-stepper-input>`);
      el.min = "abc";
      await el.updateComplete;
      const decrementBtn = el.shadowRoot?.querySelector("zeta-icon-button");
      assert.isFalse(decrementBtn?.disabled);
    });

    it("should not disable increment button when max is a non-numeric string", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="0"></zeta-stepper-input>`);
      el.max = "abc";
      await el.updateComplete;
      const incrementBtn = el.shadowRoot?.querySelectorAll("zeta-icon-button")[1];
      assert.isFalse(incrementBtn?.disabled);
    });

    it("should disable decrement button when value equals numeric min", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="0" value="0"></zeta-stepper-input>`);
      await el.updateComplete;
      const decrementBtn = el.shadowRoot?.querySelector("zeta-icon-button");
      assert.isTrue(decrementBtn?.disabled);
    });

    it("should disable increment button when value equals numeric max", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input max="10" value="10"></zeta-stepper-input>`);
      await el.updateComplete;
      const incrementBtn = el.shadowRoot?.querySelectorAll("zeta-icon-button")[1];
      assert.isTrue(incrementBtn?.disabled);
    });

    it("should not render hint text when disabled", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input hintText="hint" disabled></zeta-stepper-input>`);
      assert.notExists(el.shadowRoot?.querySelector(".hint-text"));
      el.disabled = false;
      await el.updateComplete;
      assert.exists(el.shadowRoot?.querySelector(".hint-text"));
    });

    it("should use primary flavor buttons only when disabled", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      const buttons = () => Array.from(el.shadowRoot!.querySelectorAll("zeta-icon-button"));
      buttons().forEach(b => assert.equal(b.flavor, "outline-subtle"));
      el.disabled = true;
      await el.updateComplete;
      buttons().forEach(b => assert.equal(b.flavor, "primary"));
    });
  });

  describe("Dimensions", () => {
    it("should size the value field height from the control tokens", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      const field = el.shadowRoot!.querySelector(".input-container")!;
      assert.equal(field.getBoundingClientRect().height, getCssVarPxValue(el, "--control-md"));
      el.size = "large";
      await el.updateComplete;
      assert.equal(field.getBoundingClientRect().height, getCssVarPxValue(el, "--control-lg"));
    });

    it("should keep the value field width fixed across sizes", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      const field = el.shadowRoot!.querySelector(".input-container")!;
      const expected = getCssVarPxValue(el, "--scale-15") + 2 * getCssVarPxValue(el, "--space-md");
      assert.equal(field.getBoundingClientRect().width, expected);
      el.size = "large";
      await el.updateComplete;
      assert.equal(field.getBoundingClientRect().width, expected);
    });

    it("should keep the value field height when disabled", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input disabled></zeta-stepper-input>`);
      const field = el.shadowRoot!.querySelector(".input-container")!;
      assert.equal(field.getBoundingClientRect().height, getCssVarPxValue(el, "--control-md"));
    });
  });

  describe("Styling", () => {
    it("should use neutral tokens for the value field at rest", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      const style = getComputedStyle(el.shadowRoot!.querySelector(".input-container")!);
      assert.equal(style.borderTopColor, getCssVarColorValue(el, "--interactive-neutral-border-default"));
      assert.equal(style.backgroundColor, getCssVarColorValue(el, "--interactive-neutral-background-default"));
      assert.equal(style.borderTopWidth, `${getCssVarPxValue(el, "--stroke-thin")}px`);
    });

    it("should use disabled tokens for the value field when disabled", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input disabled></zeta-stepper-input>`);
      const style = getComputedStyle(el.shadowRoot!.querySelector(".input-container")!);
      assert.equal(style.borderTopColor, getCssVarColorValue(el, "--interactive-neutral-border-disabled"));
      assert.equal(style.backgroundColor, getCssVarColorValue(el, "--interactive-neutral-background-disabled"));
    });

    it("should set the value field radius from rounded", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input .rounded=${false}></zeta-stepper-input>`);
      const field = el.shadowRoot!.querySelector(".input-container")!;
      assert.equal(getComputedStyle(field).borderTopLeftRadius, "0px");
      el.rounded = true;
      await el.updateComplete;
      assert.equal(getComputedStyle(field).borderTopLeftRadius, `${getCssVarPxValue(el, "--radius-sm")}px`);
    });

    it("should render hint text with secondary color and a primary icon", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input hintText="hint"></zeta-stepper-input>`);
      const hint = el.shadowRoot!.querySelector(".hint-text")!;
      assert.equal(getComputedStyle(hint).color, getCssVarColorValue(el, "--foreground-secondary"));
      assert.equal(getComputedStyle(hint.querySelector("zeta-icon")!).color, getCssVarColorValue(el, "--foreground-primary"));
    });

    it("should render error text with error color", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input error errorText="error"></zeta-stepper-input>`);
      const hint = el.shadowRoot!.querySelector(".hint-text")!;
      assert.equal(getComputedStyle(hint).color, getCssVarColorValue(el, "--foreground-error"));
      assert.equal(getComputedStyle(hint.querySelector("zeta-icon")!).color, getCssVarColorValue(el, "--foreground-error"));
    });
  });

  describe("Interaction", () => {
    it("responds correctly to focus event", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="0" value="10" max="100"></zeta-stepper-input>`);
      const eventListener = oneEvent(el, "focus");
      const input = el.shadowRoot?.querySelector("input");
      assert.exists(input, "input should exist in the shadow DOM");
      // Try focusing the input directly
      input?.focus();
      // If the event does not fire, dispatch it manually (for test environments)
      if (document.activeElement !== input) {
        input?.dispatchEvent(new FocusEvent("focus", { bubbles: true, composed: true }));
      }
      const event = await eventListener;
      assert.equal(event.type, "focus");
    });
    it("responds correctly to value above max value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="0" value="10" max="100"></zeta-stepper-input>`);
      const input = el.shadowRoot?.querySelector("input");
      for (const char of "133") {
        input!.dispatchEvent(new KeyboardEvent("keydown", { key: char, bubbles: true, composed: true }));
        input!.value += char;
        input!.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        input!.dispatchEvent(new KeyboardEvent("keyup", { key: char, bubbles: true, composed: true }));
      }
      input!.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      await el.updateComplete;
      assert.equal(el.value, "100"); // Should be capped at max value
    });

    it("allows typing a value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="-10" value="0"  max="10"></zeta-stepper-input>`);
      const textInput = el.shadowRoot?.querySelector(".input-container")?.querySelector("input");

      assert.exists(textInput, "Input element should exist in the shadow DOM");
      el.value = "";
      el.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      textInput?.focus();
      await KeyboardActions.type("5");
      await el.updateComplete;
      assert.equal(el?.value, "5", "Input value should be '5'");
    });

    it("allows typing a negative value", async () => {
      // prettier-ignore
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="-10" value="0"  max="10"></zeta-stepper-input>`);
      const textInput = el.shadowRoot?.querySelector(".input-container")?.querySelector("input");
      assert.exists(textInput, "Input element should exist in the shadow DOM");
      textInput?.focus();
      el.value = "";
      el.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      await el.updateComplete;
      await KeyboardActions.type("-5");
      await el.updateComplete;

      assert.equal(el?.value, "-5", "Input value should be '-5'");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
