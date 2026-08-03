import { assert, fixture, html, oneEvent } from "@open-wc/testing";
import { ZetaStepperInput } from "../../components/stepper-input/stepper-input.js";
import "../../components/stepper-input/stepper-input.js";
import "../../index.css";
import { ZetaStepperChangeEvent } from "../../events.js";
import { KeyboardActions } from "../utils.js";

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
      const el = await fixture<ZetaStepperInput>(html` <zeta-stepper-input max=${5}></zeta-stepper-input>`);
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
  });

  // describe("Dimensions", () => {});

  // describe("Styling", () => {});

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

  describe("Min/Max property conversion", () => {
    it("should coerce numeric string attribute min/max to numbers", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="5" max="10"></zeta-stepper-input>`);
      assert.equal(el.min, 5);
      assert.equal(el.max, 10);
    });

    it("should set min/max to undefined when attribute is absent", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input></zeta-stepper-input>`);
      assert.isUndefined(el.min);
      assert.isUndefined(el.max);
    });

    it("should not clamp value when min is a non-numeric string", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="2"></zeta-stepper-input>`);
      el.min = "abc" as unknown as number;
      el.requestUpdate();
      await el.updateComplete;
      assert.equal(el.value, "2");
    });

    it("should not clamp value when max is a non-numeric string", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="99"></zeta-stepper-input>`);
      el.max = "abc" as unknown as number;
      el.requestUpdate();
      await el.updateComplete;
      assert.equal(el.value, "99");
    });

    it("should not disable decrement button when min is a non-numeric string", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="0"></zeta-stepper-input>`);
      el.min = "abc" as unknown as number;
      await el.updateComplete;
      const decrementBtn = el.shadowRoot?.querySelector("zeta-icon-button");
      assert.isFalse(decrementBtn?.disabled);
    });

    it("should not disable increment button when max is a non-numeric string", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input value="0"></zeta-stepper-input>`);
      el.max = "abc" as unknown as number;
      await el.updateComplete;
      const incrementBtn = el.shadowRoot?.querySelectorAll("zeta-icon-button")[1];
      assert.isFalse(incrementBtn?.disabled);
    });

    it("should disable decrement button when value equals numeric min", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input min="0" value="0"></zeta-stepper-input>`);
      await el.updateComplete;
      const decrementBtn = el.shadowRoot?.querySelector("zeta-icon-button");
      assert.isTrue(decrementBtn?.disabled);
    });

    it("should disable increment button when value equals numeric max", async () => {
      const el = await fixture<ZetaStepperInput>(html`<zeta-stepper-input max="10" value="10"></zeta-stepper-input>`);
      await el.updateComplete;
      const incrementBtn = el.shadowRoot?.querySelectorAll("zeta-icon-button")[1];
      assert.isTrue(incrementBtn?.disabled);
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
