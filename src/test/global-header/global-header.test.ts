import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import sinon from "sinon";
import type { ZetaGlobalHeader } from "../../components/global-header/global-header.js";
import "../../components/global-header/global-header.js";
import "../../index.css";
import "../../components/global-header/global-header.styles.js";

describe("zeta-global-header", () => {
  let subject: ZetaGlobalHeader;
  const createComponent = (
    template = `<zeta-global-header .platformName="Platform Name" .name="Name" .initials="RK" appSwitcher=true .rounded=true>
          
          <!-- Menu items -->
          <zeta-dropdown-menu-button rounded=true slot="menu-items" flavor="subtle"
          .items=[{ label: "Menu Item" }, { label: "Menu Item" }, { label: "Menu Item" }]>Nav Item</zeta-dropdown-menu-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>
          <zeta-button shape=rounded slot="menu-items" flavor="subtle">Nav Item</zeta-button>

          <!-- Action items -->
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>
          <zeta-icon-button shape=rounded slot="action-items" flavor="subtle">star</zeta-icon-button>

          <!-- Avatar -->
          <zeta-avatar id="avatar" slot="user-avatar" size="xxs" .showClose=false .showRing=false>RK</zeta-avatar>

        </zeta-global-header>`
  ) => {
    // prettier-ignore
    return fixture<ZetaGlobalHeader>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility", () => {
    //Remove the theme and contrast stylesheets after each test
    afterEach(() => {
      document.getElementById("theme-mode")?.remove();
      document.getElementById("contrast-mode")?.remove();
    });

    it("meets accessibility requirements", async () => {
      await expect(subject).to.be.accessible();
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content", () => {
    it("renders the platform name", async () => {
      const platformName = subject.shadowRoot?.querySelector("#platform-name");
      expect(platformName).to.exist;
      await expect(platformName?.textContent).to.equal("Platform Name");
    });
    it("renders the name", async () => {
      const name = subject.shadowRoot?.querySelector("#name");
      expect(name).to.exist;
      await expect(name?.textContent).to.equal("Name");
    });
    it("renders the initials", async () => {
      const avatar = subject.querySelector("#avatar");
      expect(avatar).to.exist;
      await expect(avatar?.textContent).to.equal("RK");
    });
    it("renders the app switcher", () => {
      const appSwitcher = subject.shadowRoot?.querySelector("#app-switcher");
      expect(appSwitcher).to.exist;
    });
    it("renders the menu items", async () => {
      const menuItems = subject.shadowRoot?.querySelector("slot[name='menu-items']");
      expect(menuItems).to.exist;
      const assignedNodesLength = (menuItems as HTMLSlotElement)?.assignedNodes().length;
      await expect(assignedNodesLength).to.equal(6);
    });
    it("renders the action items", async () => {
      const actionItems = subject.shadowRoot?.querySelector("slot[name='action-items']");
      expect(actionItems).to.exist;
      const assignedNodesLength = (actionItems as HTMLSlotElement)?.assignedNodes().length;
      await expect(assignedNodesLength).to.equal(6);
    });
    it("renders the zebra logo", () => {
      const logo = subject.shadowRoot?.querySelector("#logo") as HTMLImageElement;
      expect(logo).to.exist;
      expect(logo.src).to.contain("zebra-logo.svg");
    });
  });

  describe("Dimensions", () => {
    it("has a logo height of 32px", () => {
      const logo = subject.shadowRoot?.querySelector("#logo") as HTMLImageElement;
      expect(logo).to.exist;
      expect(logo).to.have.style("height", "32px");
    });
    it("has a logo width of 80px", () => {
      const logo = subject.shadowRoot?.querySelector("#logo") as HTMLImageElement;
      expect(logo).to.exist;
      expect(logo).to.have.style("width", "80px");
    });
    it("has icon buttons with dimensions of 40px by 40px", () => {
      const iconButtons = subject.shadowRoot?.querySelectorAll("zeta-icon-button");
      expect(iconButtons).to.exist;
      iconButtons!.forEach(button => {
        expect(button).to.have.style("width", "40px");
        expect(button).to.have.style("height", "40px");
      });
    });
  });

  describe("Styling", () => {
    it("has the correct background color", () => {
      const mainContainer = subject.shadowRoot?.querySelector("#header-main");
      expect(mainContainer).to.exist;
      expect(mainContainer).to.have.style("background-color", "rgb(21, 21, 25)");
    });
    it("has buttons with flavor of subtle", () => {
      const buttons = subject.shadowRoot?.querySelectorAll("zeta-button");
      expect(buttons).to.exist;
      buttons!.forEach(button => {
        expect(button).to.have.attribute("flavor", "subtle");
      });
    });
    it("has an avatar with the correct background color", () => {
      const avatarElement = subject.querySelector("#avatar");
      expect(avatarElement).to.exist;
      const avatar = avatarElement?.shadowRoot?.querySelector(".avatar");
      expect(avatar).to.exist;
      expect(avatar).to.have.style("background-color", "rgb(220, 193, 251)");
    });
    it("has platform name with the correct color", () => {
      const platformName = subject.shadowRoot?.querySelector("#platform-name");
      expect(platformName).to.exist;
      expect(platformName).to.have.style("color", "rgb(243, 246, 250)");
    });
    it("has name with the correct color", () => {
      const name = subject.shadowRoot?.querySelector("#name");
      expect(name).to.exist;
      expect(name).to.have.style("color", "rgb(243, 246, 250)");
    });
  });

  describe("Interaction", () => {
    it("user info button is clickable", () => {
      const userInfoButton = subject.shadowRoot?.querySelector("#user-info-button") as HTMLButtonElement;
      expect(userInfoButton).to.exist;

      const onClickSpy = sinon.spy();
      userInfoButton?.addEventListener("click", onClickSpy);
      userInfoButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
    it("hamburger menu button is clickable", () => {
      const hamburgerMenuButton = subject.shadowRoot?.querySelector("zeta-icon-button");
      expect(hamburgerMenuButton).to.exist;

      const onClickSpy = sinon.spy();
      hamburgerMenuButton?.addEventListener("click", onClickSpy);
      hamburgerMenuButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
    it("app switcher button is clickable", () => {
      const appSwitcherButton = subject.shadowRoot?.querySelector("#app-switcher") as HTMLButtonElement;
      expect(appSwitcherButton).to.exist;

      const onClickSpy = sinon.spy();
      appSwitcherButton?.addEventListener("click", onClickSpy);
      appSwitcherButton?.click();
      expect(onClickSpy).to.have.been.calledOnce;
    });
  });

  // describe("Golden", () => {});

  // describe("Performance", () => {});
});
