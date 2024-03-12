import { fixture, html } from "@open-wc/testing";
import { ZetaIconName } from "@zebra-fed/zeta-icons";
import { ZetaTextInput } from "../../index.js";
import "../../index.js";

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
  errorText?: string;
  type?: "text" | "date" | "textarea" | "password" | "time";
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
  type = "text",
  errorText = undefined
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
      error-text=${errorText}
      type=${type}
    ></zeta-text-input>`
  );
}

