import { elementUpdated, expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import { ZetaAvatar } from "../../src";
import "../../src/components/avatar/avatar.js";

describe("zeta-avatar", () => {
  let subject: ZetaAvatar;

  const createComponent = (template = `<zeta-avatar></zeta-avatar>`) => {
    return fixture<ZetaAvatar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("placeholder", () => {
    it("has the correct placeholder icon", async () => {
      const icon = subject.shadowRoot?.querySelector("zeta-icon");

      expect(icon?.getAttribute("name")).to.equal("person");
      expect(icon?.getAttribute("color")).to.equal("var(--color-cool-50)");
    });

    it("displays a notification badge when notificationText is defined", async () => {
      subject.notificationText = "5";
      await elementUpdated(subject);

      const notificationBadge = subject.shadowRoot?.querySelector("zeta-notification-badge");
      expect(notificationBadge).to.not.be.undefined;
    });

    it("displays an icon badge when statusIcon is defined", async () => {
      subject.statusIcon = "star";
      await elementUpdated(subject);

      const iconBadge = subject.shadowRoot?.querySelector("zeta-icon-badge");
      expect(iconBadge).to.not.be.undefined;
    });

    it("meets accessability requirements", async () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("initials", () => {
    const initials = "WW";

    beforeEach(async () => {
      subject.initials = initials;
      await elementUpdated(subject);
    });

    it("shows the correct initials", () => {
      const initialsElement = subject.shadowRoot?.querySelector(".initials");
      const initialsText = (initialsElement?.lastChild as Text).wholeText;

      expect(initialsText).to.equal(initials);
    });

    it("meets accessability requirements", async () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("image", () => {
    const zebraUrl = "https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK-1200-80.jpg";

    beforeEach(async () => {
      subject.imageUrl = zebraUrl;
      await elementUpdated(subject);
    });

    it("displayed the correct image", async () => {
      const imageElement = subject.shadowRoot?.querySelector("img");
      const imageSrc = imageElement?.getAttribute("src");

      expect(imageSrc).to.equal(zebraUrl);
    });

    it("meets accessability requirements", async () => {
      expect(subject).shadowDom.to.be.accessible();
    });
  });
});
