import { property } from "lit/decorators.js";
import { BaseChip } from "./base-chip.js";
import styles from "./interactive-chip.styles.js";

export class InterativeChip extends BaseChip {
  @property({ type: Boolean }) disabled: boolean = false;

  static styles = [styles, super.styles || []];
}
