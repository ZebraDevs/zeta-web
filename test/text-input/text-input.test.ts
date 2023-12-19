/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect, assert } from "@open-wc/testing";
import { ZetaTextInput } from "../../src/index.js";
import { setup } from "./setup.ts";

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
    const el = await setup({});
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name"), "star");
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("class"), "left");
  });

  it("should render icon on the right", async () => {
    const el = await setup({ iconPos: "right" });
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name"), "star");
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("class"), "right");
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
    const t = await setup({ label: "Label" });
    assert.equal(t.shadowRoot?.querySelector(".label")?.textContent, "Label");
  });

  it("should render hint text", async () => {
    const el = await setup({ hint: "hint" });
    assert.equal(el.shadowRoot?.querySelector(".hint-text span")?.textContent, "hint");
  });

  it("should render error hint text", async () => {
    const el = await setup({ error: true, hint: "hint" });
    assert.equal(el.shadowRoot?.querySelector(".hint-text zeta-icon")?.getAttribute("color"), "var(--color-red-60)");
  });

  it("should set disabled color to icon when field is disabled", async () => {
    const el = await setup({ disabled: true });
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name"), "star");
    assert.equal(el.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color"), "var(--color-cool-60)");
  });

  it("should change value", async () => {
    const el = await setup({});
    const input = el.shadowRoot?.querySelector("input");
    input!.value = "change";
    input?.dispatchEvent(new Event("change", { bubbles: true }));
    assert.equal(el.value, "change");
  });

  it("should apply type", async () => {
    const el = await setup({ type: "textarea" });
    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea).not.to.be.null;
  });
});

