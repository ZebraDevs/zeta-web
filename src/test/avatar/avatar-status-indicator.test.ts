import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaAvatarStatusIndicator } from "../../components/avatar/status-indicator/avatar-status-indicator.js";
import "../../components/avatar/status-indicator/avatar-status-indicator.js";
import { getCssVarValue } from "../utils.js";

describe("zeta-avatar-status-indicator", () => {
  describe("Accessibility", () => {
    it("meets accessibility requirements", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator></zeta-avatar-status-indicator>`);
      return expect(subject).shadowDom.to.be.accessible();
    });

    it("labels the presence state for assistive tech since it's conveyed by color alone", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator status="busy"></zeta-avatar-status-indicator>`);
      const indicator = subject.shadowRoot?.querySelector(".indicator");
      return expect(indicator?.getAttribute("aria-label")).to.equal("Busy");
    });

    it("uses a custom label when provided", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(
        html`<zeta-avatar-status-indicator status="icon" icon="star" label="Featured"></zeta-avatar-status-indicator>`
      );
      const indicator = subject.shadowRoot?.querySelector(".indicator");
      return expect(indicator?.getAttribute("aria-label")).to.equal("Featured");
    });
  });

  describe("Content", () => {
    it("defaults to the available status", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator></zeta-avatar-status-indicator>`);
      return expect(subject.status).to.equal("available");
    });

    it("renders the icon for a status with a fixed glyph", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator status="close"></zeta-avatar-status-indicator>`);
      return expect(subject.shadowRoot?.querySelector("zeta-icon")).to.exist;
    });

    it("renders the consumer-provided icon when status is icon", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator status="icon" icon="star"></zeta-avatar-status-indicator>`);
      const icon = subject.shadowRoot?.querySelector("zeta-icon");
      return expect(icon?.textContent).to.equal("star");
    });

    it("renders the icon for offline status", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator status="offline"></zeta-avatar-status-indicator>`);
      return expect(subject.shadowRoot?.querySelector("zeta-icon")).to.exist;
    });
  });

  describe("Dimensions", () => {
    it("defaults to 12px standalone", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator></zeta-avatar-status-indicator>`);
      return expect(getComputedStyle(subject).width).to.equal("12px");
    });

    it("matches a size set via --avatar-status-indicator-size", async () => {
      const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator></zeta-avatar-status-indicator>`);
      subject.style.setProperty("--avatar-status-indicator-size", "36px");
      return expect(getComputedStyle(subject).width).to.equal("36px");
    });
  });

  describe("Styling", () => {
    const statusColorTokens: [string, string][] = [
      ["available", "--chart-positive"],
      ["away", "--chart-series-8"],
      ["busy", "--chart-negative"],
      ["dnd", "--chart-series-4"],
      ["on-shift", "--chart-series-1"],
      ["offline", "--foreground-inverse"],
      ["close", "--chart-series-12"],
      ["icon", "--chart-series-1"]
    ];

    statusColorTokens.forEach(([status, token]) => {
      it(`uses ${token} for status "${status}"`, async () => {
        const subject: ZetaAvatarStatusIndicator = await fixture(html`<zeta-avatar-status-indicator status=${status}></zeta-avatar-status-indicator>`);
        expect(getCssVarValue(subject, "--status-color")).to.equal(getCssVarValue(subject, token));
      });
    });
  });

  // describe("Interaction", () => {});
  // describe("Golden", () => {});
  // describe("Performance", () => {});
});
