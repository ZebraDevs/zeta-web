import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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
  static styles = css`
    :host {
      display: inline-block;
    }

    .zeta-illustration {
      display: contents;
    }

    .zeta-illustration svg {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: String }) name: ZetaIllustrationNames;

  getIllustrationPath = (name: ZetaIllustrationNames): string => {
    const zdna = ["addDevice", "emptyBox", "helpChat", "welcomeNav"];
    let folder = "workcloud";
    if (zdna.includes(name)) {
      folder = "zdna";
    }
    return "/assets/illustrations/" + folder + "/" + name + ".svg";
  };

  protected override render() {
    const svgPath = this.getIllustrationPath(this.name);

    return html`<img src="${svgPath}" alt="${this.name}" style="width: 100%; height: 100%;" />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-illustration": ZetaIllustration;
  }
}
