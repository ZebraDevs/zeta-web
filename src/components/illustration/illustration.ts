import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./illustration.styles.js";

export const ZetaIllustrationNamesList = [
  "addDevice",
  "emptyBox",
  "welcomeNav",
  "helpChat",
  "taskZebra",
  "sadZebra",
  "search",
  "boxEmpty",
  "calendar",
  "loadFailure",
  "serverDisconnect",
  "internet1",
  "internet2",
  "internet3",
  "zebraSad",
  "zebraHidden",
  "zebraRelaxed",
  "zebraHappy",
  "zebraNeutral",
  "zebraThumbsUp",
  "login",
  "warning",
  "welcome"
];

//TODO: This is duplicated from the list above due to issues with how custom elements manifest extracts types.
// Once a solution is found, this should be changed to: typeof ZetaIllustrationNamesList[number]
export type ZetaIllustrationNames =
  | "addDevice"
  | "emptyBox"
  | "welcomeNav"
  | "helpChat"
  | "taskZebra"
  | "sadZebra"
  | "search"
  | "boxEmpty"
  | "calendar"
  | "loadFailure"
  | "serverDisconnect"
  | "internet1"
  | "internet2"
  | "internet3"
  | "zebraSad"
  | "zebraHidden"
  | "zebraRelaxed"
  | "zebraHappy"
  | "zebraNeutral"
  | "zebraThumbsUp"
  | "login"
  | "warning"
  | "welcome";
/**
 * Graphical illustrations are used for visual representation.
 */
@customElement("zeta-illustration")
export class ZetaIllustration extends LitElement {
  static override styles = styles;

  /** The name of the illustration. */
  @property({ type: String }) name: ZetaIllustrationNames;

  /** (Optional) alt text for the icons. Defaults to the illustration name. */
  @property({ type: String }) alt?: string;

  /** The base path of zeta-web components. */
  @property({ type: String, reflect: true }) basePath: string = "node_modules/@zebra-fed/zeta-web";

  getIllustrationPath = (name: ZetaIllustrationNames): string => {
    const zdna = ["addDevice", "emptyBox", "helpChat", "welcomeNav"];
    let folder = "workcloud";
    if (zdna.includes(name)) {
      folder = "zdna";
    }
    return this.basePath + "/assets/illustrations/" + folder + "/" + name + ".svg";
  };

  protected override render() {
    return html`<img src="${this.getIllustrationPath(this.name)}" alt="${this.alt ?? this.name}" style="width: 100%; height: 100%;" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-illustration": ZetaIllustration;
  }
}
