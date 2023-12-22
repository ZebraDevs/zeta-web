import { fixture } from "@open-wc/testing";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { html } from "lit";
import { ZetaTextInput } from "../../src/index.js";

interface Props {
  disabled?: boolean;
  icon?: ZetaIconName;
  suffix?: string;
  prefix?: string;
  error?: boolean;
  required?: boolean;
  iconPos?: "left" | "right";
  label?: string;
  hint?: string;
  type?: "text" | "textarea" | "password";
}

export async function setup({
  hint = "",
  label = "",
  iconPos = "left",
  disabled = false,
  error = false,
  icon = "star",
  prefix = "",
  required = false,
  suffix = "",
  type = "text"
}: Props) {
  return await fixture<ZetaTextInput>(
    html`<zeta-text-input
      ?required=${required}
      ?error=${error}
      hint-text=${hint}
      label=${label}
      suffix=${suffix}
      prefix=${prefix}
      icon-position=${iconPos}
      ?disabled=${disabled}
      icon=${icon}
      type=${type}
    ></zeta-text-input>`
  );
}

