import { expect, fixture, html } from "@open-wc/testing";
import { ZetaAvatar, ZetaIcon, ZetaIconIndicator } from "../../index.js";
import "../../index.js";
import { getIconName } from "../utils.js";

describe("ZetaAvatar", () => {
  it("renders the avatar with a custom size", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar size="xl"></zeta-avatar>`);
    await expect(avatar.size).to.equal("xl");
  });

  it("renders the avatar with the ring", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-ring></zeta-avatar>`);
    expect(avatar.showRing).to.be.true;
  });

  it("renders the avatar without the ring", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
    expect(avatar.showRing).to.be.false;
  });

  it("renders the avatar with the close icon", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar show-close></zeta-avatar>`);
    expect(avatar.showClose).to.be.true;
  });

  it("renders the avatar without the close icon", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar></zeta-avatar>`);
    expect(avatar.showClose).to.be.false;
  });

  it("renders the avatar with an image", async () => {
    const url = "https://example.com/image.jpg";
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><img src=${url}></img></zeta-avatar>`);
    const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
    const img = slot?.assignedElements()[0] as HTMLImageElement;

    expect(img).to.exist;
    await expect(img?.src).to.equal(url);
  });

  it("renders the avatar with an icon", async () => {
    const iconName = "user";
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon>${iconName}</zeta-icon></zeta-avatar>`);
    const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#CONTENT_SLOT");
    const icon = slot?.assignedElements()[0] as ZetaIcon;

    expect(icon).to.exist;
    await expect(getIconName(icon)).to.equal(iconName);
  });

  it("renders the badge on the avatar", async () => {
    const avatar: ZetaAvatar = await fixture(html`<zeta-avatar><zeta-icon-indicator icon="star" slot="status"></zeta-icon-indicator></zeta-avatar>`);
    const slot: HTMLSlotElement | null | undefined = avatar.shadowRoot?.querySelector("#STATUS_SLOT");

    const badge = slot?.assignedElements()[0] as ZetaIconIndicator;
    expect(badge).to.exist;
  });
});
