import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaAvatar } from "../../components/avatar/avatar.js";
import "../../components/avatar/avatar.js";

import type { ZetaIcon } from "../../components/icon/icon.js";
import type { ZetaIconIndicator } from "../../components/badges/indicators/indicators.js";
import { getSlotText, getCssVarValue } from "../utils.js";
import type { AvatarSize } from "../../components/avatar/avatar-size.js";

describe("zeta-avatar", () => {
  // let subject: ZetaAvatar;

  // const createComponent = (template = `<zeta-avatar></zeta-avatar>`) => {
  //   // prettier-ignore
  //   return fixture<ZetaAvatar>(html`${unsafeStatic(template)}`);
  // };

  // beforeEach(async () => {
  //   subject = await createComponent();
  // });

  // describe("Accessibility", () => {});

  describe("Content", () => {
    it("renders the avatar with a custom size", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xl"></zeta-avatar>`);
      expect(avatar.size).to.equal("xl");
    });

    it("renders the avatar with the ring", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      expect(avatar.showRing).to.be.true;
      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      return expect(avatarDiv?.classList.contains("ring")).to.be.true;
    });

    it("renders the avatar without the ring", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(avatar.showRing).to.be.false;
      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      return expect(avatarDiv?.classList.contains("ring")).to.be.false;
    });

    it("renders the avatar with the close icon", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
      expect(avatar.showClose).to.be.true;
      const closeIndicator = avatar.shadowRoot?.querySelector(".close zeta-avatar-status-indicator");
      expect(closeIndicator).to.exist;
      return expect(closeIndicator?.getAttribute("status")).to.equal("close");
    });

    it("renders the avatar without the close icon", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(avatar.showClose).to.be.false;
      // The close button isn't just visually hidden, it isn't rendered at all.
      return expect(avatar.shadowRoot?.querySelector(".close")).to.not.exist;
    });

    it("shows no status badge by default", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(avatar.status).to.be.undefined;
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");
      return expect(slot?.assignedElements().length).to.equal(0);
    });

    it("shows a status badge when status property is set", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar status="busy"></zeta-avatar>`);
      const indicator = avatar.shadowRoot?.querySelector("#STATUS_SLOT zeta-avatar-status-indicator");
      expect(indicator).to.exist;
      return expect(indicator?.getAttribute("status")).to.equal("busy");
    });

    it("lets slotted status content override the default status indicator", async () => {
      const avatar: ZetaAvatar = await fixture(
        html`<zeta-avatar status="available"><zeta-icon-indicator icon="star" slot="status"></zeta-icon-indicator></zeta-avatar>`
      );
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");
      const assigned = slot?.assignedElements();
      expect(assigned?.length).to.equal(1);
      return expect(assigned?.[0].tagName.toLowerCase()).to.equal("zeta-icon-indicator");
    });

    it("renders the avatar with an image", async () => {
      const url = "https://example.com/image.jpg";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><img src=${url} /></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const img = slot?.assignedElements()[0] as HTMLImageElement;

      expect(img).to.exist;
      return expect(img?.src).to.equal(url);
    });

    it("renders the avatar with an icon", async () => {
      const iconName = "user";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon>${iconName}</zeta-icon></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const icon = slot?.assignedElements()[0] as ZetaIcon;

      expect(icon).to.exist;
      expect(getSlotText(icon)).to.equal(iconName);
    });

    it("renders the badge on the avatar", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon-indicator icon="star" slot="status"></zeta-icon-indicator></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");

      const badge = slot?.assignedElements()[0] as ZetaIconIndicator;
      expect(badge).to.exist;
    });
  });

  describe("Dimensions", () => {
    // Close/status badge size is fixed per size tier, matching the avatar's own size steps in Figma.
    const badgeSizes: [AvatarSize, string][] = [
      ["xxxs", "8px"],
      ["xxs", "10px"],
      ["xs", "12px"],
      ["s", "12px"],
      ["m", "16px"],
      ["l", "18px"],
      ["xl", "24px"],
      ["xxl", "36px"],
      ["xxxl", "56px"],
      ["xxxsmall", "8px"],
      ["medium", "16px"],
      ["xxxlarge", "56px"]
    ];

    badgeSizes.forEach(([size, expectedSize]) => {
      it(`sizes the close/status badge to ${expectedSize} at size "${size}"`, async () => {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size=${size}></zeta-avatar>`);
        expect(getCssVarValue(avatar, "--avatar-status-indicator-size")).to.equal(expectedSize);
      });
    });
  });

  describe("Styling", () => {
    // Ring weight is fixed per size tier per design spec, not a percentage of avatar size.
    const thinTiers: AvatarSize[] = ["xxxs", "xxs", "xs", "s", "m"];
    const heavyTiers: AvatarSize[] = ["l", "xl"];

    thinTiers.forEach(size => {
      it(`uses --stroke-thick for the ring width at size "${size}"`, async () => {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size=${size} show-ring></zeta-avatar>`);
        expect(getCssVarValue(avatar, "--border-width")).to.equal(getCssVarValue(avatar, "--stroke-thick"));
      });
    });

    heavyTiers.forEach(size => {
      it(`uses --stroke-heavy for the ring width at size "${size}"`, async () => {
        const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size=${size} show-ring></zeta-avatar>`);
        expect(getCssVarValue(avatar, "--border-width")).to.equal(getCssVarValue(avatar, "--stroke-heavy"));
      });
    });

    it("applies the colour to the avatar border", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      avatar.style.setProperty("--avatar-border-color", "rgb(255, 0, 0)");

      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      expect(avatarDiv).to.exist;

      const style = getComputedStyle(avatarDiv!);
      expect(style.borderColor).to.equal("rgb(255, 0, 0)");
    });

    it('fixes the ring width to "6px" at size "xxl" (not bound to a token)', async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xxl" show-ring></zeta-avatar>`);
      expect(getCssVarValue(avatar, "--border-width")).to.equal("6px");
    });

    it('fixes the ring width to "8px" at size "xxxl" (not bound to a token)', async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xxxl" show-ring></zeta-avatar>`);
      expect(getCssVarValue(avatar, "--border-width")).to.equal("8px");
    });
  });

  describe("Interaction", () => {
    it("shows the close icon when showClose is toggled on programmatically (regression test)", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(avatar.showClose).to.be.false;
      expect(avatar.shadowRoot?.querySelector(".close")).to.not.exist;

      avatar.showClose = true;
      await avatar.updateComplete;

      expect(avatar.showClose).to.be.true;
      const closeIndicator = avatar.shadowRoot?.querySelector(".close zeta-avatar-status-indicator");
      return expect(closeIndicator).to.exist;
    });

    it("hides the close icon when showClose is toggled off programmatically (regression test)", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
      expect(avatar.showClose).to.be.true;
      expect(avatar.shadowRoot?.querySelector(".close")).to.exist;

      avatar.showClose = false;
      await avatar.updateComplete;

      expect(avatar.showClose).to.be.false;
      return expect(avatar.shadowRoot?.querySelector(".close")).to.not.exist;
    });

    it("shows the ring when showRing is toggled on programmatically (regression test)", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      expect(avatar.showRing).to.be.false;

      avatar.showRing = true;
      await avatar.updateComplete;

      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      return expect(avatarDiv?.classList.contains("ring")).to.be.true;
    });

    it("hides the ring when showRing is toggled off programmatically (regression test)", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      expect(avatar.showRing).to.be.true;

      avatar.showRing = false;
      await avatar.updateComplete;

      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      return expect(avatarDiv?.classList.contains("ring")).to.be.false;
    });

    it("cycles showClose on and off multiple times (regression test for Storybook control toggling)", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);

      for (let i = 0; i < 3; i++) {
        avatar.showClose = true;
        await avatar.updateComplete;
        expect(avatar.shadowRoot?.querySelector(".close")).to.exist;

        avatar.showClose = false;
        await avatar.updateComplete;
        expect(avatar.shadowRoot?.querySelector(".close")).to.not.exist;
      }
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
