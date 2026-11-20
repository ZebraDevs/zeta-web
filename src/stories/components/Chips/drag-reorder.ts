/**
 * Story-only demo of consumer-side reordering for draggable chips.
 * The chips only act as drag sources; this is the kind of drop handling an app would write.
 *
 * Bind `@dragstart`, `@dragover` and `@drop` on the element wrapping the chips.
 */
export const dragReorder = (chipTag: string) => {
  let dragged: HTMLElement | null = null;

  return {
    dragstart: (e: DragEvent) => {
      dragged = (e.target as Element).closest(chipTag);
    },
    dragover: (e: DragEvent) => {
      e.preventDefault();
      const over = (e.target as Element).closest<HTMLElement>(chipTag);
      if (!dragged || !over || over === dragged) return;
      // Insert before or after the hovered chip depending on which half the pointer is over
      const { left, width } = over.getBoundingClientRect();
      over.parentElement?.insertBefore(dragged, e.clientX < left + width / 2 ? over : over.nextSibling);
    },
    drop: (e: DragEvent) => {
      e.preventDefault();
      dragged = null;
    }
  };
};
