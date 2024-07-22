import { elementUpdated, expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import { ZetaAvatar, ZetaIcon } from "../../index.js";
import "../../index.js";
import { getIconName, getCssVarValue } from "../utils.js";

describe("zeta-avatar", () => {
  let subject: ZetaAvatar;

  const createComponent = (template = `<zeta-avatar></zeta-avatar>`) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return fixture<ZetaAvatar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("placeholder", () => {
    it("has the correct placeholder icon", async () => {
      const icon = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;

      await expect(getIconName(icon)).to.equal("person");
      expect(getCssVarValue(icon, "--color-cool-50"));
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
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("initials", () => {
    const initials = "WW";

    beforeEach(async () => {
      subject.initials = initials;
      await elementUpdated(subject);
    });

    it("shows the correct initials", async () => {
      const initialsElement = subject.shadowRoot?.querySelector(".initials");
      const initialsText = (initialsElement?.lastChild as Text).wholeText;

      await expect(initialsText).to.equal(initials);
    });

    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
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

      await expect(imageSrc).to.equal(zebraUrl);
    });

    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  // describe("size", () => {
  //   it("renders the avatar with the correct size class", async () => {
  //     subject.size = "xs";
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("size-xs")).to.be.true;

  //     subject.size = "sm";
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("size-sm")).to.be.true;

  //     subject.size = "md";
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("size-md")).to.be.true;

  //     subject.size = "lg";
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("size-lg")).to.be.true;

  //     subject.size = "xl";
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("size-xl")).to.be.true;
  //   });
  // });

  // describe("showStatus", () => {
  //   it("renders the avatar with a green border when showStatus is true", async () => {
  //     subject.showStatus = true;
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("show-status")).to.be.true;
  //   });

  //   it("renders the avatar without a green border when showStatus is false", async () => {
  //     subject.showStatus = false;
  //     await elementUpdated(subject);
  //     expect(subject.classList.contains("show-status")).to.be.false;
  //   });
  // });

  describe("altText", () => {
    it("sets the alt attribute of the image element", async () => {
      const altText = "User Avatar";
      subject.altText = altText;
      subject.imageUrl = "https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK-64-42.jpg";
      await elementUpdated(subject);

      const imageElement = subject.shadowRoot?.querySelector("img");
      const altAttribute = imageElement?.getAttribute("alt");

      await expect(altAttribute).to.equal(altText);
    });
  });

  describe("notificationText", () => {
    it("displays the notification badge with the correct text", async () => {
      const notificationText = "10";
      subject.notificationText = notificationText;
      await elementUpdated(subject);

      const notificationBadge = subject.shadowRoot?.querySelector("zeta-notification-indicator");
      const badgeText = notificationBadge?.textContent;

      await expect(badgeText).to.equal(notificationText);
    });
  });

  describe("statusIcon", () => {
    it("displays the icon badge with the correct icon", async () => {
      const statusIcon = "heart";
      subject.statusIcon = statusIcon;
      await elementUpdated(subject);

      const iconBadge = subject.shadowRoot?.querySelector("zeta-icon-indicator");
      const badgeIcon = iconBadge?.getAttribute("icon");

      await expect(badgeIcon).to.equal(statusIcon);
    });
  });
});