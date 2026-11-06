import { fixture, expect, html, elementUpdated } from "@open-wc/testing";
import type { ZetaAvatarRail } from "../../components/avatar-rail/avatar-rail.js";
import type { ZetaAvatar } from "../../components/avatar/avatar.js";
import { getCssVarPxValue } from "../utils.js";
import "../../components/avatar-rail/avatar-rail.js";
import "../../components/avatar/avatar.js";
import "../../index.css";

describe("zeta-avatar-rail", () => {
  const avatarsOf = (rail: ZetaAvatarRail) => Array.from(rail.querySelectorAll<ZetaAvatar>("zeta-avatar"));

  describe("Content", () => {
    it("cascades size to avatars without their own size", async () => {
      const rail = await fixture<ZetaAvatarRail>(
        html`<zeta-avatar-rail size="l"><zeta-avatar>AB</zeta-avatar><zeta-avatar size="s">CD</zeta-avatar></zeta-avatar-rail>`
      );
      const [first, second] = avatarsOf(rail);
      expect(first.size).to.equal("l");
      expect(second.size).to.equal("s");

      rail.size = "xs";
      await elementUpdated(rail);
      expect(first.size).to.equal("xs");
      expect(second.size).to.equal("s");
    });

    it("cascades show-close to avatars without their own show-close", async () => {
      const rail = await fixture<ZetaAvatarRail>(
        html`<zeta-avatar-rail show-close><zeta-avatar>AB</zeta-avatar><zeta-avatar show-close>CD</zeta-avatar></zeta-avatar-rail>`
      );
      const [first, second] = avatarsOf(rail);
      expect(first.showClose).to.be.true;

      rail.showClose = false;
      await elementUpdated(rail);
      expect(first.showClose).to.be.false;
      expect(second.showClose).to.be.true;
    });

    it("applies rail props to avatars added later", async () => {
      const rail = await fixture<ZetaAvatarRail>(html`<zeta-avatar-rail size="xl" show-close></zeta-avatar-rail>`);
      const avatar = document.createElement("zeta-avatar");
      rail.appendChild(avatar);
      await elementUpdated(rail);
      await new Promise(r => setTimeout(r));
      expect(avatar.size).to.equal("xl");
      expect(avatar.showClose).to.be.true;
    });

    it("hides slotted content that is not an avatar", async () => {
      const rail = await fixture<ZetaAvatarRail>(html`<zeta-avatar-rail><span>nope</span></zeta-avatar-rail>`);
      const span = rail.querySelector("span")!;
      expect(getComputedStyle(span).display).to.equal("none");
    });
  });

  describe("Dimensions", () => {
    it("spaces avatars with the --space-sm token", async () => {
      const rail = await fixture<ZetaAvatarRail>(
        html`<zeta-avatar-rail><zeta-avatar>AB</zeta-avatar><zeta-avatar>CD</zeta-avatar></zeta-avatar-rail>`
      );
      expect(parseFloat(getComputedStyle(rail).columnGap)).to.equal(getCssVarPxValue(rail, "--space-sm"));
    });
  });
});
