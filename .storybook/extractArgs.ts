/**
 * Adapted from cem-plugin-better-lit-types: https://github.com/Uscreen-video/cem-plugin-better-lit-types.
 */

import { reduceTypes } from "cem-plugin-better-lit-types/storybook";
import { FIELD } from "../node_modules/cem-plugin-better-lit-types/dist/extractor/types";

/**
 * Extracts arguments for a component based on its manifest and mapArgs.
 * @param {object} manifest - The component's manifest.
 * @param {object} mapArgs - The mapArgs object.
 * @returns {object} - The extracted arguments for the component.
 */
export default (manifest, mapArgs?) => (componentName) => {
  const declaration: any = getDeclaration(manifest, componentName);

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
        if (
          f! &&
          f!["table"] &&
          f!["name"] &&
          f!["table"]["category"] &&
          f!["table"]["category"] === "slots" &&
          declaration["slots"]
        ) {
          const name = f!["name"] === "default" ? "" : f!["name"];
          if (declaration["slots"].some((e) => e["name"] === name)) {
            const decValue = declaration["slots"].find(
              (e) => e["name"] === name
            );

            if (decValue["type"]) f!["type"] = decValue["type"];
          }
        }

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
 * @param {object} declaration - The component's declaration.
 * @param {object} args - The arguments object.
 * @returns {object} - The updated arguments object.
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


/**
 * Gets the declaration for a component based on its manifest and tagName.
 * @param {object} manifest - The component's manifest.
 * @param {string} tagName - The component's tagName.
 * @param {string} type - The type of declaration (optional).
 * @returns {object} - The component's declaration.
 */
export const getDeclaration = (manifest, tagName, type = "") => {
  var _a;
  let _declaration;
  const finder = type === "mixin" ? "name" : "tagName";

  (_a =
    manifest === null || manifest === void 0 ? void 0 : manifest.modules) ===
    null || _a === void 0
    ? void 0
    : _a.forEach((_module) => {
      var _a;
      (_a =
        _module === null || _module === void 0
          ? void 0
          : _module.declarations) === null || _a === void 0
        ? void 0
        : _a.forEach((declaration) => {
          if (declaration[finder] === tagName) {
            _declaration = declaration;
          }
        });
    });

  return _declaration;
};
