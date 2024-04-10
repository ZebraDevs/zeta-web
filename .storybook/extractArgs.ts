/**
 * Adapted from cem-plugin-better-lit-types: https://github.com/Uscreen-video/cem-plugin-better-lit-types.
 */

import {
  getComponentDeclaration,
  reduceTypes,
} from "cem-plugin-better-lit-types/storybook";
import { FIELD } from "../node_modules/cem-plugin-better-lit-types/dist/extractor/types";

export default (manifest, mapArgs?) => (componentName) => {
  const declaration: any = getComponentDeclaration(manifest, componentName);

  if (!declaration) return;

  let args = Object.fromEntries(
    Object.entries(
      Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              {},
              reduceTypes(declaration.attributes, FIELD.attributes, mapArgs)
            ),
            reduceTypes(declaration.members, FIELD.properties, mapArgs)
          ),
          reduceTypes(declaration.slots, FIELD.slots, mapArgs)
        ),
        reduceTypes(declaration.cssProperties, FIELD.css, mapArgs)
      )
    ).map((e) => {
      /** Edit fields after initial creation */
      return e.map((f) => {
        /** Move value of `type.text` to `type`. */
        if (
          f!["type"] &&
          f!["type"]["text"] &&
          !f!["type"]["text"].includes("boolean")
        ) {
          f!["type"] = f!["type"]["text"];
        }

        /** Set values for boolean */
        if (
          f!["type"] &&
          f!["type"]["text"] &&
          f!["type"]["text"].includes("boolean")
        ) {
          f!["type"] = "boolean";
          f!["control"] = { type: "boolean" };
        }

        /** Set controls for plain strings. */
        if (
          f!["type"] &&
          typeof f!["type"] === "string" &&
          f!["type"].includes("string")
        ) {
          f!["control"] = { type: "text" };
        }

        /** If the name includes color, set the control to color.  */
        if (f!["name"] && f!["name"].includes("color")) {
          f!["control"] = { type: "color" };
        }

        /** Storybook doesn't play nicely with `undefined` so change to a string. */
        if (
          f!["type"] &&
          typeof f!["type"] === "string" &&
          f!["type"].includes(" | undefined") &&
          f!["table"]["defaultValue"]["summary"] === undefined
        ) {
          f!["table"]["defaultValue"]["summary"] = "undefined";
        }

        return f;
      });
    })
  );

  if (declaration.events) {
    args = getEvents(declaration, args);
  }

  return args;
};

/**
 * Adds event values to `args`.
 *
 * Builds values using `events` in `declaration` and adds them to `args` output.
 */
const getEvents = (declaration, args) => {
  declaration.events.forEach((element) => {
    args[element.name] = {
      name: element?.name,
      description: element?.description,
      table: { category: "events", defaultValue: "undefined" },
      type: element?.type?.text,
    };
  });

  return args;
};
