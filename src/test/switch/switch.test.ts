import { fixture, html, expect, assert } from "@open-wc/testing";
import { getIconColor, MouseActions, getCssVarColorValue, getCssVarPxValue } from "../utils.js";
import type { ZetaIcon } from "../../components/icon/icon.js";
import { ZetaSwitch } from "../../components/switch/switch.js";
import "../../components/switch/switch.js";
import "../../index.css";

describe("zeta-switch", () => {
  let subject: ZetaSwitch;
  beforeEach(async () => {
    subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
  });

  describe("Accessibility", () => {
    it("never exposes aria-checked as mixed, even when indeterminate", async () => {
      subject.indeterminate = true;
      await subject.updateComplete;
      expect(subject.getAttribute("aria-checked")).to.equal("false");
      expect(subject.shadowRoot?.querySelector("input")?.getAttribute("aria-checked")).to.equal("false");
    });
  });

  describe("Content", () => {
    it("creates from document.createElement", function () {
      const el = document.createElement("zeta-switch");
      assert.equal("ZETA-SWITCH", el.nodeName);
    });

    it("creates from constructor", function () {
      const el = new ZetaSwitch();
      assert.equal("ZETA-SWITCH", el.nodeName);
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
  });

  describe("Dimensions", () => {
    const part = (name: string) => subject.shadowRoot!.querySelector(`[part="${name}"]`) as HTMLElement;

    it("renders a 64x32 track with a control-xs thumb inset by space-2xs", () => {
      const track = part("track").getBoundingClientRect();
      const thumb = part("thumb").getBoundingClientRect();
      const pad = getCssVarPxValue(subject, "--space-2xs");
      expect(track.width).to.equal(64);
      expect(track.height).to.equal(32);
      expect(thumb.width).to.equal(getCssVarPxValue(subject, "--control-xs"));
      expect(thumb.left - track.left).to.equal(pad);
      expect(thumb.top - track.top).to.equal(pad);
    });

    it("renders control-icon-md icons centred on the thumb's two rest positions", () => {
      const track = part("track").getBoundingClientRect();
      const active = part("icon active").getBoundingClientRect();
      const inactive = part("icon inactive").getBoundingClientRect();
      expect(active.width).to.equal(getCssVarPxValue(subject, "--control-icon-md"));
      expect(active.left - track.left).to.equal(6);
      expect(track.right - inactive.right).to.equal(6);
      expect(active.top - track.top).to.equal(6);
    });

    it("moves the thumb 32px when checked", async () => {
      const el: ZetaSwitch = await fixture(html`<zeta-switch checked></zeta-switch>`);
      const track = el.shadowRoot!.querySelector('[part="track"]')!.getBoundingClientRect();
      const thumb = el.shadowRoot!.querySelector('[part="thumb"]')!.getBoundingClientRect();
      expect(thumb.left - track.left).to.equal(36);
    });
  });

  describe("Styling", () => {
    let subject: ZetaSwitch;
    let track: HTMLElement | null | undefined;
    let thumb: HTMLElement | null | undefined;
    let activeIcon: ZetaIcon | null | undefined;
    let inactiveIcon: ZetaIcon | null | undefined;

    beforeEach(async () => {
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
      activeIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon active"]');
      inactiveIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon inactive"]');
    });
    it("activeIcon color", () => {
      expect(getComputedStyle(activeIcon!).color).to.equal(getCssVarColorValue(activeIcon!, "--interactive-primary-foreground-default"));
    });
    it("inactiveIcon color", () => {
      expect(getComputedStyle(inactiveIcon!).color).to.equal(getCssVarColorValue(inactiveIcon!, "--interactive-primary-foreground-default"));
    });
    it("track backgroundColor", () => {
      expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-selection-background-default"));
    });
    it("thumb backgroundColor", () => {
      expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--interactive-primary-foreground-default"));
    });
    it("checked track uses the pressed selection background, thumb unchanged", async () => {
      const el: ZetaSwitch = await fixture(html`<zeta-switch checked></zeta-switch>`);
      const t = el.shadowRoot!.querySelector('[part="track"]')!;
      const th = el.shadowRoot!.querySelector('[part="thumb"]')!;
      expect(getComputedStyle(t).backgroundColor).to.equal(getCssVarColorValue(t, "--interactive-selection-background-pressed"));
      expect(getComputedStyle(th).backgroundColor).to.equal(getCssVarColorValue(th, "--interactive-primary-foreground-default"));
    });
    it("draws the focus border inside the track", () => {
      const t = track!;
      t.focus();
      const style = getComputedStyle(t);
      expect(style.outlineOffset).to.equal(`-${getCssVarPxValue(t, "--stroke-thick")}px`);
    });
  });

  describe("Interaction", () => {
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

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});

describe("zeta-switch disabled", () => {
  describe("Styling", () => {
    let subject: ZetaSwitch;
    let track: HTMLElement | null | undefined;
    let thumb: HTMLElement | null | undefined;
    let activeIcon: ZetaIcon | null | undefined;
    let inactiveIcon: ZetaIcon | null | undefined;

    beforeEach(async () => {
      // await emulateMedia({ reducedMotion: "reduce" });
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off" disabled></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
      activeIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon active"]');
      inactiveIcon = subject.shadowRoot?.querySelector('zeta-icon[part="icon inactive"]');
    });
    it("inactiveIcon color, :hover color", async () => {
      expect(getIconColor(inactiveIcon!)).to.equal(getCssVarColorValue(inactiveIcon!, "--interactive-primary-foreground-disabled"));
      await MouseActions.hover(subject);
      expect(getIconColor(inactiveIcon!)).to.equal(getCssVarColorValue(inactiveIcon!, "--interactive-primary-foreground-disabled"));
    });
    it("activeIcon color, :hover color", async () => {
      expect(getIconColor(activeIcon!)).to.equal(getCssVarColorValue(activeIcon!, "--interactive-primary-foreground-disabled"));
      await MouseActions.hover(subject);
      expect(getIconColor(activeIcon!)).to.equal(getCssVarColorValue(activeIcon!, "--interactive-primary-foreground-disabled"));
    });
    it("track backgroundColor, :hover backgroundColor", async () => {
      expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-selection-background-disabled"));
      await MouseActions.hover(subject);
      expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-selection-background-disabled"));
    });
    it("thumb backgroundColor, :hover backgroundColor", async () => {
      expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--interactive-primary-foreground-disabled"));
      await MouseActions.hover(subject);
      expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(thumb!, "--interactive-primary-foreground-disabled"));
    });
  });
});

describe("zeta-switch:hover", () => {
  describe("Styling", () => {
    let subject: ZetaSwitch;
    let track: HTMLElement | null | undefined;
    let thumb: HTMLElement | null | undefined;

    beforeEach(async () => {
      subject = await fixture(html`<zeta-switch activeIcon="microphone" inactiveIcon="microphone_off"></zeta-switch>`);
      track = subject.shadowRoot?.querySelector('[part="track"]');
      thumb = subject.shadowRoot?.querySelector('[part="thumb"]');
    });

    it("track backgroundColor", async () => {
      await MouseActions.hover(subject);
      expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-selection-background-default"));
      await MouseActions.reset();
      expect(getComputedStyle(track!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-selection-background-default"));
    });
    it("thumb backgroundColor", async () => {
      await MouseActions.hover(subject);
      expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-primary-foreground-default"));
      await MouseActions.reset();
      expect(getComputedStyle(thumb!).backgroundColor).to.equal(getCssVarColorValue(track!, "--interactive-primary-foreground-default"));
    });
  });
});
