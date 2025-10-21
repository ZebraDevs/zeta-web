import { fixture, html, expect } from "@open-wc/testing";
import type { ZetaAvatar } from "../../components/avatar/avatar.js";
import "../../components/avatar/avatar.js";

import type { ZetaIcon } from "../../components/icon/icon.js";
import type { ZetaIconIndicator } from "../../components/badges/indicators/indicators.js";
import { getSlotText } from "../utils.js";

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
      await expect(avatar.size).to.equal("xl");
    });

    it("renders the avatar with the ring", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      return expect(avatar.showRing).to.be.true;
    });

    it("renders the avatar without the ring", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      return expect(avatar.showRing).to.be.false;
    });

    it("renders the avatar with the close icon", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
      return expect(avatar.showClose).to.be.true;
    });

    it("renders the avatar without the close icon", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
      return expect(avatar.showClose).to.be.false;
    });

    it("renders the avatar with an image", async () => {
      const url = "https://example.com/image.jpg";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><img src=${url} /></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const img = slot?.assignedElements()[0] as HTMLImageElement;

      expect(img).to.exist;
      return await expect(img?.src).to.equal(url);
    });

    it("renders the avatar with an icon", async () => {
      const iconName = "user";
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon>${iconName}</zeta-icon></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
      const icon = slot?.assignedElements()[0] as ZetaIcon;

      expect(icon).to.exist;
      await expect(getSlotText(icon)).to.equal(iconName);
    });

    it("renders the badge on the avatar", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon-indicator icon="star" slot="status"></zeta-icon-indicator></zeta-avatar>`);
      const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");

      const badge = slot?.assignedElements()[0] as ZetaIconIndicator;
      expect(badge).to.exist;
    });
  });

  // describe("Dimensions", () => {});

  describe("Styling", () => {
    it("applies the colour to the avatar border", async () => {
      const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
      avatar.style.setProperty("--avatar-border-color", "rgb(255, 0, 0)");

      const avatarDiv = avatar.shadowRoot?.querySelector(".avatar");
      expect(avatarDiv).to.exist;

      const style = getComputedStyle(avatarDiv!);
      await expect(style.borderColor).to.equal("rgb(255, 0, 0)");
    });
  });

  // describe("Interaction", () => {});

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
