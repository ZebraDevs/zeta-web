import { expect, assert, oneEvent } from "@open-wc/testing";
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
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});

  //TODO autocomplete, spellcheck, autofocus, aria-describedby, aria-label, placeholder
});
