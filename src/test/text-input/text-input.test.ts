import { expect, assert, oneEvent, fixture, html } from "@open-wc/testing";
import { setup } from "./setup.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import { ZetaTextInput } from "../../components/text-input/text-input.js";
import { getSlotText, getCssVarColorValue, MouseActions, KeyboardActions } from "../utils.js";
import "../../components/text-input/text-input.js";
import "../../index.css";

describe("zeta-text-input", () => {
  // describe("Accessibility", () => {});

  describe("Content", () => {
    it.skip("creates from document.createElement", function () {
      const el = document.createElement("zeta-text-input");
      assert.equal("ZETA-TEXT-INPUT", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaTextInput();
      assert.equal("ZETA-TEXT-INPUT", el.nodeName);
    });

    it("focus on input when field focused", async () => {
      const el = await setup({});
      el.focus();
      return expect(el.shadowRoot?.querySelector("input:focus")).to.exist;
    });

    it("should not focus on input when field disabled", async () => {
      const el = await setup({ disabled: true });
      el.focus();
      return expect(el.shadowRoot?.querySelector("input:focus")).not.to.exist;
    });

    it("blur on input when field blurred", async () => {
      const el = await setup({});
      el.focus();
      el.blur();
      return expect(el.shadowRoot?.querySelector("input:focus")).not.to.exist;
    });

    it("should render icon", async () => {
      const el = await setup({ leadingIcon: "star" });
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "star");
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("class")!.includes("left"), true);
    });

    it("should render icon on the right", async () => {
      const el = await setup({ trailingIcon: "star" });
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "star");
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("class")!.includes("right"), true);
    });

    it("should render prefix", async () => {
      const el = await setup({ prefix: "PREFIX" });
      assert.equal(el.shadowRoot?.querySelector(".left.affix")?.textContent, "PREFIX");
    });

    it("should render suffix", async () => {
      const t = await setup({ suffix: "SUFFIX" });
      assert.equal(t.shadowRoot?.querySelector(".right.affix")?.textContent, "SUFFIX");
    });

    it("should render label", async () => {
      const labelText = "Label";
      const t = await setup({ label: labelText });
      const label = t.shadowRoot?.querySelector("label");

      assert.notEqual(label, undefined);
      assert.equal(label?.textContent?.includes(labelText), true);
    });

    it("should render hint text", async () => {
      const el = await setup({ hint: "hint" });
      assert.equal(el.shadowRoot?.querySelector(".hint-text span")?.textContent, "hint");
    });

    it("should render error icon", async () => {
      const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "error" });
      const icon = el.shadowRoot?.querySelector(".hint-text zeta-icon") as ZetaIcon;
      assert.equal(getSlotText(icon), "error");
    });

    it("should render error text", async () => {
      const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "errory" });
      assert.equal(el.shadowRoot?.querySelector(".hint-text span")?.textContent, "errory");
    });

    it("should change value", async () => {
      const el = await setup({});
      const input = el.shadowRoot?.querySelector("input");
      input!.value = "change";
      input?.dispatchEvent(new Event("change", { bubbles: true }));
      return assert.equal(el.value, "change");
    });

    it("should apply type textarea", async () => {
      const el = await setup({ type: "textarea" });
      const textarea = el.shadowRoot?.querySelector("textarea");
      return expect(textarea).not.to.be.null;
    });

    it("should apply type password", async () => {
      const el = await setup({ type: "password" });
      const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
      return assert.equal(input?.type, "password");
    });

    it("should apply type time", async () => {
      const el = await setup({ type: "time" });
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "clock_outline");
    });

    it("should apply type data", async () => {
      const el = await setup({ type: "date" });
      assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "calendar_3_day");
    });

    it("should show clear button when showClearButton is true and value is not empty", async () => {
      const el = await setup({ showClearButton: true, value: "Some text" });
      const clearButton = el.shadowRoot?.querySelector(".cancel-icon");
      assert.exists(clearButton, "Clear button should exist");
    });

    it("should not show clear button when showClearButton is false", async () => {
      const el = await setup({ showClearButton: false, value: "Some text" });
      const clearButton = el.shadowRoot?.querySelector(".cancel-icon");
      assert.notExists(clearButton, "Clear button should not exist");
    });

    it("should not show clear button when showClearButton is true but value is empty", async () => {
      const el = await setup({ showClearButton: true, value: "" });
      const clearButton = el.shadowRoot?.querySelector(".cancel-icon");
      assert.notExists(clearButton, "Clear button should not exist");
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("should render error icon color", async () => {
      const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "error" });
      const icon = el.shadowRoot?.querySelector(".hint-text zeta-icon");
      assert.equal(getComputedStyle(icon!).color, getCssVarColorValue(icon!, "--main-negative"));
    });

    it("should render error text color", async () => {
      const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "error" });
      const text = el.shadowRoot?.querySelector(".hint-text span");
      assert.equal(getComputedStyle(text!).color, getCssVarColorValue(text!, "--main-negative"));
    });

    const rgbToHex = (r: number, g: number, b: number) =>
      "#" +
      [r, g, b]
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");

    it("should set disabled color to icon when field is disabled", async () => {
      const el = await setup({ disabled: true, leadingIcon: "star" });
      const x = el.shadowRoot?.querySelector("zeta-icon");
      expect(x).to.exist;
      assert.equal(x!.textContent?.trim(), "star");

      const rgbColor = window.getComputedStyle(x!).color.split("(")[1].split(")")[0].split(",");
      const hexColor = rgbToHex(Number.parseInt(rgbColor[0]), Number.parseInt(rgbColor[1]), Number.parseInt(rgbColor[2]));

      return await expect(hexColor).to.equal(getComputedStyle(el).getPropertyValue("--main-disabled"));
    });

    it("should default to 2 rows when type is textarea and rows is not specified", async () => {
      const el = await setup({ type: "textarea" });
      const textArea = el.shadowRoot?.querySelector("textarea");
      const rows = textArea?.rows;
      assert.equal(rows, 2);
    });

    it("should accept rows when type is textarea and rows is specified", async () => {
      const numOfRows = 4;
      const el = await setup({ type: "textarea", rows: numOfRows });
      const textArea = el.shadowRoot?.querySelector("textarea");
      const rows = textArea?.rows;
      assert.equal(rows, numOfRows);
    });

    it("should default to 2 rows when type is textarea and rows is invalid", async () => {
      const numOfRows = -1;
      const el = await setup({ type: "textarea", rows: numOfRows });
      const textArea = el.shadowRoot?.querySelector("textarea");
      const rows = textArea?.rows;
      assert.equal(rows, 2);
    });
  });

  describe("Interaction", () => {
    it("should toggle password visibility", async () => {
      const el = await setup({ type: "password" });
      const input = el.shadowRoot?.querySelector("input");
      input!.value = "password";
      input?.dispatchEvent(new Event("change", { bubbles: true }));
      const icon = el.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;
      icon.click();
      await el.updateComplete;
      assert.equal(el.type, "text");
      assert.equal(el.value, "password");
    });

    // TODO extract into common test file
    it("should dispatch onInput when value changes", async () => {
      const el = await setup({});
      const eventListener = oneEvent(el, "input");
      await MouseActions.click(el);
      await KeyboardActions.type("Test Value");

      const event = await eventListener;
      await expect(event.type).to.equal("input");
    });
    it("should dispatch onChange when value changes", async () => {
      const el = await setup({});
      const eventListener = oneEvent(el, "change");
      await MouseActions.click(el);
      await KeyboardActions.type("Test Value");
      await MouseActions.clickOutside(el);

      const event = await eventListener;
      await expect(event.type).to.equal("change");
    });
    it("should dispatch onChange when field is deselected & value has changed", async () => {
      const el = await setup({});
      const clickButton = () => {
        void MouseActions.click(el)
          .then(() => KeyboardActions.press("Space"))
          .then(() => MouseActions.clickOutside(el));
      };
      void setTimeout(clickButton);

      // prettier-ignore
      const { data } = await oneEvent<InputEvent>(el, "input");
      return expect(data).to.equal(" ");
    });

    it("should dispatch onFocus when field is focused", async () => {
      const el = await setup({});
      await MouseActions.click(el);
      await KeyboardActions.press("Space");
    });
    it("should dispatch onBlur when field is deselected", async () => {
      const el = await setup({});
      await MouseActions.click(el);
      await KeyboardActions.press("Space");
    });

    /// Integer specific tests
    it("should filter decimal points from input when type is integer", async () => {
      const el = await setup({ type: "integer" });

      // Simulate typing "123.45"
      await MouseActions.click(el);
      await KeyboardActions.type("123.45");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("12345");
    });

    it("should allow negative integers when type is integer", async () => {
      const el = await setup({ type: "integer" });

      // Simulate typing "-123"
      await MouseActions.click(el);
      await KeyboardActions.type("-123");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("-123");
    });

    it("should filter out non-numeric characters except minus when type is integer", async () => {
      const el = await setup({ type: "integer" });

      // Simulate typing "1a2b3.45c"
      await MouseActions.click(el);
      await KeyboardActions.type("1a2b3.45c");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("12345");
    });

    it("should filter out scientific notation 'e' when type is integer", async () => {
      const el = await setup({ type: "integer" });

      // Simulate typing "123e4" (scientific notation)
      await MouseActions.click(el);
      await KeyboardActions.type("123e4");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("1234");
    });

    it("should filter out scientific notation 'E' when type is integer", async () => {
      const el = await setup({ type: "integer" });

      // Simulate typing "123E4" (scientific notation with capital E)
      await MouseActions.click(el);
      await KeyboardActions.type("123E4");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("1234");
    });

    it("should not affect input when type is not integer", async () => {
      const el = await setup({});

      // Simulate typing "123.45"
      await MouseActions.click(el);
      await KeyboardActions.type("123.45");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("123.45");
    });

    it("should not affect input when type is not number", async () => {
      const el = await setup({ type: "text" });

      // Simulate typing "123.45"
      await MouseActions.click(el);
      await KeyboardActions.type("123.45");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("123.45");
    });

    it("should not go below min when type is integer and min is set", async () => {
      const el = await setup({ type: "integer", min: 50 });

      await MouseActions.click(el);
      await KeyboardActions.type("30");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("50");
    });

    it("should not go above max when type is integer and max is set", async () => {
      const el = await setup({ type: "integer", max: 50 });

      await MouseActions.click(el);
      await KeyboardActions.type("80");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("50");
    });

    it("should not go below min and should filter dots and non-numeric characters when type is integer and min is set", async () => {
      const el = await setup({ type: "integer", min: 50 });

      await MouseActions.click(el);
      await KeyboardActions.type("5.e5");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("55");
    });

    it("should not go above max and should filter dots and non-numeric characters when type is integer and max is set", async () => {
      const el = await setup({ type: "integer", max: 50 });

      await MouseActions.click(el);
      await KeyboardActions.type("7e1.5");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("50");
    });

    it("should clear the text input when the clear button is clicked", async () => {
      const el = await setup({ showClearButton: true, value: "Some text" });
      const clearButton = el.shadowRoot?.querySelector(".cancel-icon");
      assert.exists(clearButton, "Clear button should exist");
      const changeListener = oneEvent(el, "change");

      clearButton?.dispatchEvent(new Event("click", { bubbles: true, composed: true }));
      await changeListener;
      await expect(el.value).to.equal("");
    });

    /// Increment / Decrement tests
    it("should increment value when type is integer and no max set", async () => {
      const el = await setup({ type: "integer", value: "5" });
      el.increment();
      await el.updateComplete;
      assert.equal(el.value, "6");
    });

    it("should not increment value when type is integer and value equals numeric max", async () => {
      const el = await setup({ type: "integer", value: "10", max: 10 });
      el.increment();
      await el.updateComplete;
      assert.equal(el.value, "10");
    });

    it("should increment value when type is integer and value is below numeric max", async () => {
      const el = await setup({ type: "integer", value: "9", max: 10 });
      el.increment();
      await el.updateComplete;
      assert.equal(el.value, "10");
    });

    it("should not increment value when type is integer and value is above numeric max", async () => {
      const el = await setup({ type: "integer", value: "11", max: 10 });
      el.increment();
      await el.updateComplete;
      assert.equal(el.value, "11");
    });

    it("should decrement value when type is integer and no min set", async () => {
      const el = await setup({ type: "integer", value: "5" });
      el.decrement();
      await el.updateComplete;
      assert.equal(el.value, "4");
    });

    it("should not decrement value when type is integer and value equals numeric min", async () => {
      const el = await setup({ type: "integer", value: "0", min: 0 });
      el.decrement();
      await el.updateComplete;
      assert.equal(el.value, "0");
    });

    it("should decrement value when type is integer and value is above numeric min", async () => {
      const el = await setup({ type: "integer", value: "1", min: 0 });
      el.decrement();
      await el.updateComplete;
      assert.equal(el.value, "0");
    });

    it("should not decrement value when type is integer and value is below numeric min", async () => {
      const el = await setup({ type: "integer", value: "-1", min: 0 });
      el.decrement();
      await el.updateComplete;
      assert.equal(el.value, "-1");
    });

    it("should not increment when type is not integer", async () => {
      const el = await setup({ type: "text", value: "5" });
      el.increment();
      await el.updateComplete;
      assert.equal(el.value, "5");
    });

    it("should not decrement when type is not integer", async () => {
      const el = await setup({ type: "text", value: "5" });
      el.decrement();
      await el.updateComplete;
      assert.equal(el.value, "5");
    });

    it("should dispatch change event when incrementing", async () => {
      const el = await setup({ type: "integer", value: "5" });
      const changeListener = oneEvent(el, "change");
      el.increment();
      await changeListener;
    });

    it("should dispatch change event when decrementing", async () => {
      const el = await setup({ type: "integer", value: "5" });
      const changeListener = oneEvent(el, "change");
      el.decrement();
      await changeListener;
    });

    it("should not dispatch change event when increment is blocked by max", async () => {
      const el = await setup({ type: "integer", value: "10", max: 10 });
      let changed = false;
      el.addEventListener("change", () => (changed = true));
      el.increment();
      await el.updateComplete;
      assert.isFalse(changed);
    });

    it("should not dispatch change event when decrement is blocked by min", async () => {
      const el = await setup({ type: "integer", value: "0", min: 0 });
      let changed = false;
      el.addEventListener("change", () => (changed = true));
      el.decrement();
      await el.updateComplete;
      assert.isFalse(changed);
    });
  });

  describe("Min/Max property conversion", () => {
    it("should accept numeric min/max as numbers on integer type", async () => {
      const el = await setup({ type: "integer", min: 5, max: 10 });
      assert.equal(el.min, 5);
      assert.equal(el.max, 10);
    });

    it("should coerce numeric string attribute min/max to numbers", async () => {
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="integer" min="5" max="10"></zeta-text-input>`);
      assert.equal(el.min, 5);
      assert.equal(el.max, 10);
    });

    it("should preserve string min/max for date type", async () => {
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="date" min="2024-01-01" max="2024-12-31"></zeta-text-input>`);
      assert.equal(el.min, "2024-01-01");
      assert.equal(el.max, "2024-12-31");
    });

    it("should set min/max to undefined when attribute is absent", async () => {
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="integer"></zeta-text-input>`);
      assert.isUndefined(el.min);
      assert.isUndefined(el.max);
    });

    it("should pass numeric min/max as-is to input for number type", async () => {
      const el = await setup({ type: "number", min: 1, max: 100 });
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "1");
      assert.equal(input?.getAttribute("max"), "100");
    });

    it("should pass string min/max as-is to input for date type", async () => {
      const el = await setup({ type: "date", min: "2024-01-01", max: "2024-12-31" });
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "2024-01-01");
      assert.equal(input?.getAttribute("max"), "2024-12-31");
    });

    it("should format epoch timestamp as date string for date type", async () => {
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="date"></zeta-text-input>`);
      el.min = new Date("2024-06-15").getTime();
      el.max = new Date("2024-12-31").getTime();
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "2024-06-15");
      assert.equal(input?.getAttribute("max"), "2024-12-31");
    });

    it("should format epoch timestamp as time string for time type", async () => {
      const epoch = Date.UTC(2024, 0, 1, 8, 30);
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="time"></zeta-text-input>`);
      el.min = epoch;
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "08:30");
    });

    it("should format epoch timestamp as month string for month type", async () => {
      const epoch = Date.UTC(2024, 5, 1);
      const el = await fixture<ZetaTextInput>(html`<zeta-text-input type="month"></zeta-text-input>`);
      el.min = epoch;
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "2024-06");
    });

    it("should not format numeric min/max as timestamps for non-date types", async () => {
      const el = await setup({ type: "number", min: 0, max: 100 });
      await el.updateComplete;
      const input = el.shadowRoot?.querySelector("input");
      assert.equal(input?.getAttribute("min"), "0");
      assert.equal(input?.getAttribute("max"), "100");
    });

    it("should not clamp integer input when min/max is a non-numeric string", async () => {
      const el = await setup({ type: "integer", min: "abc" as unknown as number });

      await MouseActions.click(el);
      await KeyboardActions.type("5");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("5");
    });

    it("should not strip leading minus when integer min is a non-numeric string", async () => {
      const el = await setup({ type: "integer", min: "abc" as unknown as number });

      await MouseActions.click(el);
      await KeyboardActions.type("-5");
      await MouseActions.clickOutside(el);

      await expect(el.value).to.equal("-5");
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});

  //TODO autocomplete, spellcheck, autofocus, aria-describedby, aria-label, placeholder
});
