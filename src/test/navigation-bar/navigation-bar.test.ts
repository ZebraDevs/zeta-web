import { expect, fixture, html, unsafeStatic } from "@open-wc/testing";
import { ZetaNavigationBar, ZetaNavigationBarItem } from "../../index.js";
import "../../index.js";

describe("zeta-navigation-bar", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar>
      <zeta-navigation-bar-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-navigation-bar-item>
    <zeta-navigation-bar-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-navigation-bar-item>
    <zeta-navigation-bar-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-navigation-bar-item>
    </zeta-navigation-bar>`
  ) => {
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessability requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });

  it("renders the correct number of navigation bar items", async () => {
    const items = subject.querySelectorAll("zeta-navigation-bar-item");
    await expect(items.length).to.equal(3);
  });

  it("renders the correct label and icon for each navigation bar item", async () => {
    const items = subject.querySelectorAll("zeta-navigation-bar-item");
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

describe("zeta-navigation-bar spacer", () => {
  const label = "Label";
  const icon = "star";
  const badgeValue = "2";

  let subject: ZetaNavigationBar;

  const createComponent = (
    template = `<zeta-navigation-bar shrinkItems>
      <zeta-navigation-bar-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-navigation-bar-item>
    <div class="spacer"></div>
    <zeta-navigation-bar-item icon=${icon} label=${label}>
      <zeta-notification-indicator value=${badgeValue}></zeta-notification-indicator>
    </zeta-navigation-bar-item>
    </zeta-navigation-bar>`
  ) => {
    return fixture<ZetaNavigationBar>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it.skip("keeps a fixed width", async () => {
    const item0: ZetaNavigationBarItem = subject.querySelector("zeta-navigation-bar-item")!;
    item0.setAttribute("label", "SomethingVeryVeryLong");
    await item0.updateComplete;
    await expect(item0.getBoundingClientRect().width).to.equal(62);
  });
});
