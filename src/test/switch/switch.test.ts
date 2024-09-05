import { fixture, html, expect, assert } from "@open-wc/testing";
import { getIconColor, MouseActions, getCssVarColorValue } from "../utils.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import { ZetaSwitch } from "../../components/switch/switch.js";
import "../../components/switch/switch.js";
import "../../index.css";

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
  let subject: ZetaSwitch;
  beforeEach(async () => {
    subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
  });

  it("focus on button when switch focused", () => {
    subject.focus();
    expect(subject.shadowRoot?.querySelector(":focus")).to.exist;
  });

  it("blur on button when switch blurred", () => {
    subject.focus();
    subject.blur();

    expect(subject.shadowRoot?.querySelector("button:focus")).not.to.exist;
  });

  it("should toggle the state when clicked by accessibility tools", async () => {
    const t: ZetaSwitch = await fixture(html`<zeta-switch></zeta-switch>`);
    const input = t.shadowRoot?.querySelector("input") as HTMLInputElement;

    input?.click();
    expect(input.checked).to.be.true;
    expect(t.checked).to.be.true;

    input?.click();
    expect(input.checked).to.be.false;
    expect(t.checked).to.be.false;
  });
});

describe("zeta-switch colors", () => {
  let subject: ZetaSwitch;
  let track: HTMLElement | null | undefined;
  let thumb: HTMLElement | null | undefined;
  let activeIcon: ZetaIcon | null | undefined;
  let inactiveIcon: ZetaIcon | null | undefined;
  describe("disabled", () => {
    beforeEach(async () => {
      // await emulateMedia({ reducedMotion: "reduce" });
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off" disabled></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
      activeIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon active"]') as ZetaIcon;
      inactiveIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon inactive"]') as ZetaIcon;
    });
    it("inactiveIcon color, :hover color", async () => {
      await expect(getIconColor(inactiveIcon!)).to.equal(getCssVarColorValue(inactiveIcon!, "--main-disabled"));
      await MouseActions.hover(subject);
      await expect(getIconColor(inactiveIcon!)).to.equal(getCssVarColorValue(inactiveIcon!, "--main-disabled"));
    });
    it("activeIcon color, :hover color", async () => {
      await expect(getIconColor(activeIcon!)).to.equal(getCssVarColorValue(activeIcon!, "--main-disabled"));
      await MouseActions.hover(subject);
      await expect(getIconColor(activeIcon!)).to.equal(getCssVarColorValue(activeIcon!, "--main-disabled"));
    });
    it("track backgroundColor, :hover backgroundColor", async () => {
      await expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--surface-disabled"));
      await MouseActions.hover(subject);
      await expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--surface-disabled"));
    });
    it("thumb backgroundColor, :hover backgroundColor", async () => {
      await expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--main-disabled"));
      await MouseActions.hover(subject);
      await expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--main-disabled"));
    });
  });

  describe("enabled", () => {
    beforeEach(async () => {
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
      activeIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon active"]');
      inactiveIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon inactive"]');
    });
    it("activeIcon color", async () => {
      await expect(getComputedStyle(activeIcon!).color).to.equal(getCssVarColorValue(activeIcon!, "--main-inverse"));
    });
    it("inactiveIcon color", async () => {
      await expect(getComputedStyle(inactiveIcon!).color).to.equal(getCssVarColorValue(inactiveIcon!, "--main-inverse"));
    });
    it("track backgroundColor", async () => {
      await expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--main-disabled"));
    });
    it("thumb backgroundColor", async () => {
      await expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--main-inverse"));
    });
  });

  describe(":hover", () => {
    beforeEach(async () => {
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
      activeIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon active"]');
      inactiveIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon inactive"]');
    });

    it("track backgroundColor", async () => {
      await MouseActions.hover(subject);
      await expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--main-disabled"));
      await MouseActions.reset();
      await expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--main-disabled"));
    });
    it("thumb backgroundColor", async () => {
      await MouseActions.hover(subject);
      await expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(track!, "--main-inverse"));
      await MouseActions.reset();
      await expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(track!, "--main-inverse"));
    });
  });
});
