import { fixture, html } from "@open-wc/testing";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ZetaTextInput } from "../../index.js";
import "../../index.js";

interface Props {
  disabled?: boolean;
  leadingIcon?: ZetaIconName;
  trailingIcon?: ZetaIconName;
  suffix?: string;
  prefix?: string;
  error?: boolean;
  required?: boolean;
  label?: string;
  hint?: string;
  errorText?: string;
  type?: "text" | "date" | "textarea" | "password" | "time";
}

export async function setup({
  hint = "",
  label = "",
  disabled = false,
  error = false,
  leadingIcon,
  trailingIcon,
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
      hintText=${hint}
      label=${label}
      suffix=${suffix}
      prefix=${prefix}
      ?disabled=${disabled}
      leadingIcon=${leadingIcon ?? ""}
      trailingIcon=${trailingIcon ?? ""}
      errorText=${errorText ?? ""}
      type=${type}
    ></zeta-text-input>`
  );
}
