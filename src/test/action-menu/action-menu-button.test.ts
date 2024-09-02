import { fixture, html, unsafeStatic, expect } from "@open-wc/testing";
import type { ZetaActionMenuButton, ZetaIconButton } from "../../index.js";
import "../../index.js";

describe("zeta-action-menu-button", () => {
  let subject: ZetaActionMenuButton;

  const createComponent = (
    template = `<zeta-action-menu-button
            size="medium"
            rounded
            icon="more_vertical"
            alignment="start"
            >
            </zeta-action-menu-button>`
  ) => {
    return fixture<ZetaActionMenuButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  it("meets accessability requirements", async () => {
    await expect(subject).shadowDom.to.be.accessible();
  });

  it("renders the action menu button correctly", () => {
    expect(subject).shadowDom.to.equalSnapshot();
  });

  // it.skip("renders an icon with the correct name", async () => {
  //   // fails due to slotting icon changes
  //   const iconName = "more_vertical";

  //   const iconElement = subject.shadowRoot!.querySelector("zeta-icon-button") as ZetaIconButton;

  //   expect(iconElement).to.not.be.undefined;
  //   await expect(getIconName(iconElement)).to.equal(iconName);
  // });

  it("opens the action menu when clicked", async () => {
    (subject.shadowRoot?.querySelector("zeta-icon-button") as ZetaIconButton).click();
    await subject.updateComplete;

    expect(subject.open).to.be.true;
  });

  it("closes the dropdown menu when clicked outside", async () => {
    (subject.shadowRoot?.querySelector("zeta-icon-button") as ZetaIconButton).click();
    await subject.updateComplete;

    document.body.click();
    await subject.updateComplete;

    expect(subject.open).to.be.false;
  });

  it("aligns the zeta droppable to the start", async () => {
    (subject.shadowRoot?.querySelector("zeta-icon-button") as ZetaIconButton).click();
    await subject.updateComplete;

    const dropdownMenuButtonRect = subject.getBoundingClientRect();
    const droppableRect = subject.droppable.getBoundingClientRect();

    const dropdownMenuButtonStart = dropdownMenuButtonRect.left;
    const droppableStart = droppableRect.left;

    await expect(droppableStart).to.equal(dropdownMenuButtonStart);
  });

  it("aligns the zeta droppable to the center", async () => {
    subject.alignment = "center";
    (subject.shadowRoot?.querySelector("zeta-icon-button") as ZetaIconButton).click();
    await subject.updateComplete;

    const dropdownMenuButtonRect = subject.getBoundingClientRect();
    const droppableRect = subject.droppable.getBoundingClientRect();

    const dropdownMenuButtonCenter = dropdownMenuButtonRect.left + dropdownMenuButtonRect.width / 2;
    const droppableCenter = droppableRect.left + droppableRect.width / 2;

    expect(droppableCenter).to.be.closeTo(dropdownMenuButtonCenter, 1);
  });

  it("aligns the zeta droppable to the end", async () => {
    subject.alignment = "end";
    (subject.shadowRoot?.querySelector("zeta-icon-button") as ZetaIconButton).click();
    await subject.updateComplete;

    const dropdownMenuButtonRect = subject.getBoundingClientRect();
    const droppableRect = subject.droppable.getBoundingClientRect();

    const dropdownMenuButtonEnd = dropdownMenuButtonRect.right;
    const droppableEnd = droppableRect.right;

    await expect(droppableEnd).to.equal(dropdownMenuButtonEnd);
  });
});
