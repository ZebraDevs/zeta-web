import { expect, assert } from "@open-wc/testing";
import { setup } from "./setup.js";
import { ZetaIcon, ZetaTextInput } from "../../index.js";
import "../../index.js";
import { getIconName, getCssVarValue } from "../utils.js";

describe("Zeta Input", () => {
  it("creates from document.createElement", function () {
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
    expect(el.shadowRoot?.querySelector("input:focus")).to.exist;
  });

  it("should not focus on input when field disabled", async () => {
    const el = await setup({ disabled: true });
    el.focus();
    expect(el.shadowRoot?.querySelector("input:focus")).not.to.exist;
  });

  it("blur on input when field blurred", async () => {
    const el = await setup({});
    el.focus();
    el.blur();
    expect(el.shadowRoot?.querySelector("input:focus")).not.to.exist;
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
    assert.equal(getIconName(icon), "error");
  });
  it("should render error icon color", async () => {
    const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "error" });
    const icon = el.shadowRoot?.querySelector(".hint-text zeta-icon");
    assert.equal(getComputedStyle(icon!).color, getCssVarValue(icon!, "--icon-flavor-negative"));
  });
  it("should render error text", async () => {
    const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "errory" });
    assert.equal(el.shadowRoot?.querySelector(".hint-text span")?.textContent, "errory");
  });
  it("should render error text color", async () => {
    const el = await setup({ error: true, hint: "hint", disabled: false, errorText: "error" });
    const text = el.shadowRoot?.querySelector(".hint-text span");
    assert.equal(getComputedStyle(text!).color, getCssVarValue(text!, "--text-flavor-negative"));
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

    await expect(hexColor).to.equal(getComputedStyle(el).getPropertyValue("--icon-disabled"));
  });

  it("should change value", async () => {
    const el = await setup({});
    const input = el.shadowRoot?.querySelector("input");
    input!.value = "change";
    input?.dispatchEvent(new Event("change", { bubbles: true }));
    assert.equal(el.value, "change");
  });

  it("should apply type textarea", async () => {
    const el = await setup({ type: "textarea" });
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea).not.to.be.null;
  });

  it("should apply type password", async () => {
    const el = await setup({ type: "password" });
    const input = el.shadowRoot?.querySelector("input") as HTMLInputElement;
    assert.equal(input?.type, "password");
  });

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

  it("should apply type time", async () => {
    const el = await setup({ type: "time" });
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "clock_outline");
  });

  it("should apply type data", async () => {
    const el = await setup({ type: "date" });
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.textContent?.trim(), "calendar_3_day");
  });

  //TODO autocomplete, spellcheck, autofocus, aria-describedby, aria-label, placeholder
});
