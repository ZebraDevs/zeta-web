import { property, state } from "lit/decorators.js";
import { BaseChip } from "./base-chip.js";
import styles from "./draggable-chip.styles.js";

/**
 * A chip that can be made a native HTML5 drag source via `draggable`.
 *
 * Only the drag source is provided: listen for the native `dragstart`/`dragend` on the chip, and handle `dragover`/`drop` (and any reordering) on your own drop target.
 */
export class DraggableChip extends BaseChip {
  /** Whether the chip can be dragged. Drop handling and reordering are left to the consumer.
   *
   * Reflects as `draggable="true"` so the browser picks it up; a bare `draggable` attribute also works.
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value !== null && value !== "false",
      toAttribute: (value: boolean) => (value ? "true" : null)
    }
  })
  override draggable: boolean = false;

  /** @internal */
  @state() protected dragging = false;

  static styles = [super.styles ?? [], styles];

  constructor() {
    super();
    this.addEventListener("dragstart", this.handleDragStart);
    this.addEventListener("dragend", this.handleDragEnd);
  }

  private handleDragStart = (event: DragEvent) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.dragging = true;
    // Firefox won't start a drag without data; consumers can overwrite this in their own handler
    if (event.dataTransfer && !event.dataTransfer.types.includes("text/plain")) {
      event.dataTransfer.setData("text/plain", this.textContent?.trim() ?? "");
    }
  };

  private handleDragEnd = () => {
    this.dragging = false;
  };
}
