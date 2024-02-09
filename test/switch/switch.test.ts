/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { fixture, html, expect, assert } from "@open-wc/testing";
import { ZetaSwitch } from "../../src/components/switch/switch.js";

describe("zeta-switch", () => {
  it("creates from document.createElement", function () {
    const el = document.createElement("zeta-switch");
    assert.equal("ZETA-SWITCH", el.nodeName);
  });

  it("creates from constructor", function () {
    const el = new ZetaSwitch();
    assert.equal("ZETA-SWITCH", el.nodeName);
  });
});

describe("zeta-switch", () => {
  it("should render inactive icon", async () => {
    const t = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
    await expect(t.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name")).to.equal("microphone_off");
  });

  it("focus on button when switch focused", async () => {
    const t = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);

    t.focus();

    expect(t.shadowRoot?.querySelector("button:focus")).to.exist;
  });

  it("blur on button when switch blurred", async () => {
    const t = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);

    t.blur();

    expect(t.shadowRoot?.querySelector("button:focus")).not.to.exist;
  });

  it("should set correct color to the icon when disabled", async () => {
    const t = await fixture(html`<zeta-switch disabled activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);

    await expect(t.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color")).to.equal("var(--interactive-disabled-icon)");
  });

  it("should set correct color to the icon when enabled", async () => {
    const t = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);

    await expect(t.shadowRoot?.querySelector("zeta-icon")?.getAttribute("color")).to.equal("var(--interactive-primary-on)");
  });

  it("should render active icon", async () => {
    const t = await fixture(html`<zeta-switch active activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
    await expect(t.shadowRoot?.querySelector("zeta-icon")?.getAttribute("name")).to.equal("microphone");
  });
});

