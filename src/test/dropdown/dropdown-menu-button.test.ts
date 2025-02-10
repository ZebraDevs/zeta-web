import { fixture, html, expect, unsafeStatic } from "@open-wc/testing";
import type { ZetaButton } from "../../components/button/button.js";
import type { ZetaCheckbox } from "../../components/checkbox/checkbox.js";
import type { ZetaDropdownMenuButton } from "../../components/dropdown/dropdown-menu/dropdown-menu-button.js";
import type { ZetaDropdownMenuItem } from "../../components/dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaRadioButton } from "../../components/radio-button/radio-button.js";
import "../../components/dropdown/dropdown-menu/dropdown-menu-button.js";
import type { ZetaDropdownItem } from "../../components/dropdown/dropdown-menu/dropdown-menu-button.js";
// import { getIconName } from "../utils.js";

describe("zeta-dropdown-menu-button", () => {
  let subject: ZetaDropdownMenuButton;

  const createComponent = (
    template = `<zeta-dropdown-menu-button
            size="medium"
            name="dropdown-menu"
            rounded=true
            flavor="primary"
            type="text-dropdown"
            
          >
            Dropdown Menu
          </zeta-dropdown-menu-button>`
  ) => {
    // prettier-ignore
    return fixture<ZetaDropdownMenuButton>(html`${unsafeStatic(template)}`);
  };

  beforeEach(async () => {
    subject = await createComponent();
  });

  describe("Accessibility Tests", () => {
    // TODO: Colors currently fail accessability
    it.skip("meets accessability requirements", async () => {
      await expect(subject).shadowDom.to.be.accessible();
    });
  });

  describe("Content Tests", () => {
    it("renders the text correctly", async () => {
      const text = "Dropdown Menu";
      await expect(subject.innerText.trim()).to.equal(text);
    });

    // it.skip("renders an icon with the correct name", async () => {
    //   // fails due to slotting icon changes
    //   const iconName = "chevron_left";

    //   const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;

    //   expect(iconElement).to.not.be.undefined;
    //   await expect(getIconName(iconElement)).to.equal(iconName);
    // });

    // it.skip("renders an icon with the correct name when open", async () => {
    //   // fails due to slotting icon changes
    //   const iconName = "expand_more";

    //   const iconElement = subject.shadowRoot?.querySelector("zeta-icon") as ZetaIcon;

    //   (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
    //   await subject.updateComplete;

    //   expect(iconElement).to.not.be.undefined;
    //   await expect(getIconName(iconElement)).to.equal(iconName);
    // });
  });

  describe("Dimensions Tests", () => {
    it("has the same width as the zeta droppable", async () => {
      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      const dropdownMenuButtonWidth = subject.getBoundingClientRect().width;
      const droppableWidth = subject.droppable.getBoundingClientRect().width;

      await expect(dropdownMenuButtonWidth).to.equal(droppableWidth);
    });

    it("aligns the zeta droppable to the bottom of the dropdown menu button", async () => {
      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      const dropdownMenuButtonRect = subject.getBoundingClientRect();
      const droppableRect = subject.droppable.getBoundingClientRect();

      const dropdownMenuButtonBottom = dropdownMenuButtonRect.bottom;
      const droppableTop = droppableRect.top;

      await expect(droppableTop).to.equal(dropdownMenuButtonBottom);
    });
  });

  // describe("Styling Tests", () => {});

  describe("Interaction Tests", () => {
    it("opens the dropdown menu when clicked", async () => {
      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      expect(subject.open).to.be.true;
    });

    it("closes the dropdown menu when clicked outside", async () => {
      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      document.body.click();
      await subject.updateComplete;

      expect(subject.open).to.be.false;
    });

    it("closes the dropdown menu when clicked inside", async () => {
      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      (subject.shadowRoot?.querySelector("zeta-dropdown-menu-item") as HTMLElement).click();
      await subject.updateComplete;

      expect(subject.open).to.be.false;
    });

    it("returns the selected item when a wrapping form is submitted", async () => {
      subject.items = [
        { label: "Item 1", icon: "star", checked: false },
        { label: "Item 2", icon: "star", checked: false },
        { label: "Item 3", icon: "star", checked: false }
      ];

      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      const dropdownMenuItem = subject.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") as NodeListOf<ZetaDropdownMenuItem>;
      dropdownMenuItem[0].click();
      await subject.updateComplete;

      const form = document.createElement("form");
      form.appendChild(subject);
      document.body.appendChild(form);

      const event = new Event("submit");
      form.dispatchEvent(event);

      const data = new FormData(event.target as HTMLFormElement);

      await expect(Object.fromEntries(data)["dropdown-menu"]).to.equal(subject.items[0].label);
    });

    it("returns the selected checkboxes when a wrapping form is submitted", async () => {
      const selectedItem1: ZetaDropdownItem = { label: "Item 1", icon: "star", checked: false };
      const selectedItem2: ZetaDropdownItem = { label: "Item 2", icon: "star", checked: false };
      const selectedItem3: ZetaDropdownItem = { label: "Item 3", icon: "star", checked: false };
      subject.items = [selectedItem1, selectedItem2, selectedItem3];
      subject.type = "checkbox-dropdown";

      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      const checkboxElements = subject.shadowRoot?.querySelectorAll("zeta-checkbox") as NodeListOf<ZetaCheckbox>;
      checkboxElements[0].click();
      checkboxElements[2].click();
      await subject.updateComplete;

      const form = document.createElement("form");
      form.appendChild(subject);
      document.body.appendChild(form);

      const event = new Event("submit");
      form.dispatchEvent(event);

      const data = new FormData(event.target as HTMLFormElement);
      const selectedCheckboxes = Array.from((Object.fromEntries(data)["dropdown-menu"] as string).split(","));

      expect(selectedCheckboxes).to.have.lengthOf(2);
      expect(selectedCheckboxes).to.include.members([selectedItem1.label, selectedItem3.label]);
    });

    it("returns the selected radio button when a wrapping form is submitted", async () => {
      const selectedItem1: ZetaDropdownItem = { label: "Item 1", icon: "star", checked: false };
      const selectedItem2: ZetaDropdownItem = { label: "Item 2", icon: "star", checked: false };
      const selectedItem3: ZetaDropdownItem = { label: "Item 3", icon: "star", checked: false };
      subject.items = [selectedItem1, selectedItem2, selectedItem3];
      subject.type = "radio-dropdown";

      (subject.shadowRoot?.querySelector("zeta-button") as ZetaButton).click();
      await subject.updateComplete;

      const radioButtonElements = subject.shadowRoot?.querySelectorAll("zeta-radio-button") as NodeListOf<ZetaRadioButton>;
      radioButtonElements[0].shadowRoot?.querySelector("label")!.click();
      await subject.updateComplete;

      const form = document.createElement("form");
      form.appendChild(subject);
      document.body.appendChild(form);

      const event = new Event("submit");
      form.dispatchEvent(event);
      await subject.updateComplete;

      const data = new FormData(event.target as HTMLFormElement);
      console.log("FormData", data);

      await expect(Object.fromEntries(data)["dropdown-menu"]).to.equal(selectedItem1.label);
    });
  });

  // describe("Golden Tests", () => {
  //   it("renders the dropdown menu button correctly", () => {
  //     expect(subject).shadowDom.to.equalSnapshot();
  //   });
  // });

  // describe("Performance Tests", () => {});
});
