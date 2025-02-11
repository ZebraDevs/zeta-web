import { customElement, eventOptions, property, query, state } from "lit/decorators.js";
import styles from "./dropdown-menu-button.styles.js";
import { html, LitElement } from "lit";
import { Contourable, Flavored, Size } from "../../../mixins/mixins.js";
import { FormField, type InputType } from "../../../mixins/form-field.js";
import type { ZetaDroppable } from "../droppable.js";
import "../../button/button.js";
import "../../radio-button/radio-button.js";
import "../../checkbox/checkbox.js";
import "../menu-item/dropdown-menu-item.js";
import "./../droppable";
import type { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ZetaDropdownEvent } from "../../../events.js";

export type ZetaDropdownItem = { label: string; icon?: ZetaIconName; checked?: boolean; disabled?: boolean; onClick?: () => void };

//TODO check to see if this works with keyboard input
//     include check to see if input event is fired too
/** Zeta Dropdown Menu Button places a button that when clicked opens a dropdown menu containing the items passed into it through the items prop.
 *
 * @slot - The slotted text will be displayed on the dropdown menu button.
 * @event {CustomEvent<ZetaDropdownEventDetail>} open - Fired when the dropdown is opened.
 * @event {CustomEvent<ZetaDropdownEventDetail>} close - Fired when the dropdown is closed.
 * @event {InputEvent} input - Fired when the dropdown is closed.
 * 
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://zeta-ds.web.app/web/storybook/?path=/docs/dropdown--docs
 */
@customElement("zeta-dropdown-menu-button")
export class ZetaDropdownMenuButton extends FormField(Contourable(Flavored(Size(LitElement)))) {
  /** Controls the state of the dropdown menu. */
  @property({ type: Boolean }) open: boolean = false;

  // TODO(UX-1024): Investigate moving items into the slot
  /** Array of items to populate the dropdown */
  @property({ type: Array }) items: Array<ZetaDropdownItem> = [
    {
      label: "Auto Item",
      icon: "star",
      checked: false
    }
  ];

  /** The type of dropdown.
   * - "text-dropdown" - A dropdown with a default dropdown buttons.
   * - "checkbox-dropdown" - A dropdown with checkboxes.
   * - "radio-dropdown" - A dropdown with radio buttons.
   */
  @property({ type: String }) type: InputType = "text-dropdown";

  /** The name of the dropdown menu button for form control*/
  @property({ type: String }) name: string = "default";

  /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
  @property({ type: String }) direction?: "left" | "right" | "bottom" | "top" = "bottom";

  @state() icon: string = "chevron_left";

  private checkedValues: string[] = [];

  @query("#anchor") anchor!: HTMLElement;

  @query("zeta-droppable") droppable!: ZetaDroppable;

  /* 
   * @internal
   */
  handleChange(_event: Event): void {
    //The input is disabled so we can ignore these
    //this.dispatchEvent(new Event(event.type, event)); TODO Is this the test fail source
    return;
  }

  /* 
   * @internal
   */
  handleInput(_event: Event): void {
    //The input is disabled so we can ignore these
    return;
  }

  protected firstUpdated() {
    this.droppable.anchor = this.anchor;
    this.items.map(item => {
      if (item.checked) {
        if (this.type === "checkbox-dropdown") {
          this.checkedValues = [...this.checkedValues, item.label];
          this.input.value = this.checkedValues.toString();
        } else if (this.type === "radio-dropdown") {
          this.input.value = item.label;
        }
        //this.input.dispatchEvent(new Event("input")); TODO here too
      }
    });
  }

  private handleItemClick(text: string) {
    if (this.type === "radio-dropdown" || this.type === "text-dropdown") {
      this.input.value = text;
      if (this.type === "text-dropdown") this.handleClick();
      this.input.dispatchEvent(new InputEvent("input"));
    } else if (this.type === "checkbox-dropdown") {
      if (this.checkedValues.includes(text)) {
        this.checkedValues = this.checkedValues.filter((item: string) => item !== text);
      } else {
        this.checkedValues = [...this.checkedValues, text];
      }
      this.input.value = this.checkedValues.toString();
      this.input.dispatchEvent(new InputEvent("input"));
    }
  }

  @eventOptions({ capture: true })
  private handleClick() {
    this.open = !this.open;
    if (this.open) { //TODO move this to CSS
      document.body.style.overflow = "hidden";
      this.icon = "expand_more";
    } else {
      document.body.style.overflow = "auto";
      this.icon = "chevron_left";
    }
    this.dispatchEvent(new ZetaDropdownEvent(this.open).toEvent()); //TODO BK this was added on my branch
  }

  private handleOutsideClick(e: Event) {
    if (this.open && !this.contains(e.target as Node)) {
      this.handleClick();
    }
  }

  private renderItems() {
    if (this.type === "radio-dropdown") {
      return this.items.map(item => {
        return html`<zeta-radio-button
          @change=${() => {
            this.handleItemClick(item.label);
            if (item.onClick) {
              item.onClick();
            }
          }}
          class="droppable-item"
          name=${this.name}
          ?checked=${item.checked}
          >${item.label}</zeta-radio-button
        >`;
      });
    } else if (this.type === "checkbox-dropdown") {
      return this.items.map(item => {
        return html`
          <zeta-checkbox
            @change=${() => {
            this.handleItemClick(item.label);
            if (item.onClick) {
              item.onClick();
            }
          }}
            class="droppable-item"
            name=${this.name}
            ?rounded=${this.rounded}
            ?checked=${item.checked}
            >${item.label}</zeta-checkbox
          >
        `;
      });
    } else {
      return this.items.map(item => {
        return html`<zeta-dropdown-menu-item
          @click=${() => {
            this.handleItemClick(item.label);
            if (item.onClick) {
              item.onClick();
            }
          }}
          ?rounded=${this.rounded}
          ><zeta-icon slot="icon" ?rounded=${this.rounded}>${item.icon}</zeta-icon>${item.label}</zeta-dropdown-menu-item
        >`;
      });
    }
  }

  protected render() {
    document.addEventListener("click", this.handleOutsideClick.bind(this));
    return html`
      <zeta-button
        id="anchor"
        @click=${() => this.handleClick()}
        .size=${this.size}
        ?rounded=${this.rounded}
        .flavor=${this.flavor}
        ><slot></slot><zeta-icon .rounded=${this.rounded}>${this.icon}</zeta-icon></zeta-button
      >
      <zeta-droppable .anchor=${this.anchor} .direction=${this.direction} .matchParentWidth=${true} ?open=${this.open} ?rounded=${this.rounded}
        >${this.renderItems()}</zeta-droppable
      >
      ${super.render()}
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-dropdown-menu-button": ZetaDropdownMenuButton;
  }
}
