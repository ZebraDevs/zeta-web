import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import type { ZetaNavigationBar } from "../../components/navigation-bar/navigation-bar.js";
import type { ZetaGridMenuItem } from "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/grid-menu-item/grid-menu-item.js";
import "../../components/navigation-bar/navigation-bar.js";
import "../../components/badges/indicators/indicators.js";

describe("zeta-navigation-bar", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar>
      <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    </zeta-navigation-bar>`
  ) => {
    // prettier-ignore
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    it("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the correct number of navigation bar items", async () => {
      const items = subject.querySelectorAll("zeta-grid-menu-item");
      await expect(items.length).to.equal(3);
    });

    it("renders the correct label and icon for each navigation bar item", async () => {
      const items = subject.querySelectorAll("zeta-grid-menu-item");
      await Promise.all(
        Array.from(items).map(async item => {
          const itemLabel = item.getAttribute("label");
          const itemIcon = item.getAttribute("icon");
          await expect(itemLabel).to.equal(label);
          await expect(itemIcon).to.equal(icon);
        })
      );
    });

    it("renders the correct badge content for each navigation bar item", async () => {
      const badges = subject.querySelectorAll("zeta-notification-indicator");
      await Promise.all(
        Array.from(badges).map(async badge => {
          await expect(badge.getAttribute("value")).to.equal(badgeValue);
        })
      );
    });

    it("updates badge content when the value changes", async () => {
      const newBadgeValue = "5";
      const badges = subject.querySelectorAll("zeta-notification-indicator");
      await Promise.all(
        Array.from(badges).map(async badge => {
          badge.setAttribute("value", newBadgeValue);
          await badge.updateComplete;
          await expect(badge.value).to.equal(newBadgeValue);
        })
      );
    });
  });

  // describe("Dimensions Tests", () => {});

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});

describe("zeta-navigation-bar spacer", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar shrinkItems>
      <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    <div class="spacer"></div>
    <zeta-grid-menu-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-grid-menu-item>
    </zeta-navigation-bar>`
  ) => {
    // prettier-ignore
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  // describe("Accessibility Tests", () => {});

  // describe("Content Tests", () => {});

  describe("Dimensions Tests", () => {
    it.skip("keeps a fixed width", async () => {
      const item0: ZetaGridMenuItem = subject.querySelector("zeta-grid-menu-item")!;
      item0.setAttribute("label", "SomethingVeryVeryLong");
      await item0.updateComplete;
      await expect(item0.getBoundingClientRect().width).to.equal(62);
    });
  });

  // describe("Styling Tests", () => {});

  // describe("Interaction Tests", () => {});

  // describe("Golden Tests", () => {});

  // describe("Performance Tests", () => {});
});
