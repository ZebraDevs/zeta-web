import { readdirSync, lstatSync, readFileSync } from "fs";
import * as path from "path";
import {
  write,
  log,
  replaceAllInTemplate,
  capitalize,
  convertPathToUnixStyle,
  pascalCaseFromKebab,
} from "./utils.js";
const ZETA_REACT_NAME = "zeta-react";
const SRC_FOLDER_PATH = `${ZETA_REACT_NAME}/src`;
const SRC_FOLDER = `${SRC_FOLDER_PATH}/`;
const SRC_PATH = `../${SRC_FOLDER}`;
const ZETA_FOLDER_PATH = `../${ZETA_REACT_NAME}/`;

/** Slots that don't work in React.
 *
 * TODO: Add more to this list. */
const slotsToChange = ["svg"];

/** Directories that should be ignored when parsing files for react conversion.
 *
 * TODO: Add more to this list. */
const foldersToIgnore = ["mixins"];

/** RegExp to find only alphabetical characters. */
const azOnlyRegExp = /[^a-z]/g;

/** Recursively navigates directory returning all children
 *
 * @param {string} dir Initial directory to search.
 * @param {string[]} files List of files found so far.
 *
 * @returns {string[]} List of all files found so far.
 */
const walker = (dir, files = []) => {
  const dirFiles = readdirSync(path.normalize(dir));
  for (const f of dirFiles) {
    const stat = lstatSync(path.normalize(dir + path.sep + f));
    if (stat.isDirectory()) {
      walker(dir + path.sep + f, files);
    } else {
      files.push(convertPathToUnixStyle(dir + path.sep + f));
    }
  }
  return files;
};

/** Gets all web component stories.
 *
 * @returns {string[]} List of all web component file paths.
 */
const getWebStories = () =>
  walker("./src").filter((x) => x.match(/\.stories\.(ts|js|tsx|jsx)$/));

/** Gets the name of a component from its path.
 *
 * @param {string} path path of component file.
 * @returns {string} Name of component.
 */
const pathToName = (path) =>
  convertPathToUnixStyle(path).split("/").pop().split(".").shift();

/** For a given tag, find the closing tag in tags list.
 *
 * @param {string[]} tags List of all tags from code block.
 * @param {number} index index of opening tag in tags list.
 * @param {string} type Type of the tag - i.e. svg.
 *
 * @modifies This function has the side-effect of changing the very array it is looping over, tags.
 */
const findAndReplaceClosingSlotTag = (tags, index, type) => {
  /** Counts duplicate internal types in tags list. */
  let counter = 0;

  /** When closing tag is found, this will be its place in the array */
  let found = 0;

  /** Index iterated as we know current tag is not self-closing. */
  index = index + 1;

  /** Iterate over all tags to find closing tag that matches. */
  for (index; index < tags.length; index++) {
    /** Finds type of tag. */
    const type2 = tags[index].split(" ")[0].slice(1).replace(azOnlyRegExp, "");
    /**Check if type2 is what we are looking for, and if it is a closing tag, but not self-closing.. */
    if (
      type2 == type &&
      tags[index][1] != "/" &&
      tags[index].trim().endsWith("/>")
    ) {
      /** If this is an opening tag of the same type, then we know it is entirely within the parent type, iterate count to ignore this later on.*/
      counter += 1;
    } else if (type2 == type) {
      /** Check if we are waiting for any internal elements to be closed. */
      if (counter == 0) {
        /** Found closing tag (hopefully). Assign this value to `found` */
        found = index;
        break;
      } else {
        /** Reduce count by 1 as we have closed an internal element. */
        counter += -1;
      }
    }
  }

  /** Check if the closing tag was found. */
  if (found != 0) {
    /** Add the closing div after the found tag, to close the new wrapping div added above. This is added in directly in tags array, so is a side-effect. */
    tags[found] = tags[found] + "</div>";
  } else {
    //TODO: This is an error state. We should do something here.
  }
};

/** Function that refactors web-component slot elements for consumption in react storybook.
 *
 * @param {string[]} tags All the HTML tags being parsed. (This could be altered as a side-effect of this function).
 * @param {string} tag Current tag from `tag` array.
 * @param {number} index Index of the current `tag` within `tags`.
 * @param {string} type Type of tag (i.e. svg).
 *
 * @modifies This function has the side-effect of changing the very array it is looping over, tags.
 *
 * @returns {string} Refactored tag ready for consumption in react story.
 */
const parseWebStoryTagForSlot = (tags, tag, index, type) => {
  /** Value in slot i.e: name if 'slot="name" */
  const slotValue = tag.split("slot")[1].split('"')[1];

  /**  Tag string split on word slot */
  const splitOnSlot = tag.split("slot");

  /** Tag string with slot removed. */
  const unslotted = splitOnSlot[0] + splitOnSlot[1].slice(slotValue.length + 3);

  /** Add div with slot and append to unslotted tag string. */
  tag = `<div slot=\"${slotValue}\">${unslotted}`;

  /** Find self-closing tag. */
  if (tag.trim().endsWith("/>")) {
    /** If tag is self closing, then we can just close the div after it. */
    tag = tag + "</div>";
  } else {
    /** Otherwise, this function finds and replaces the closing tag further on in the array.*/
    findAndReplaceClosingSlotTag(tags, index, type);
  }
  return tag;
};

/** Parses and refactors HTML tags from web-component
 *
 * @param {string[]} tags List of HTML tags from web-component story, split by '<'.
 *
 * @returns {string[]} Refactored tags for react story.
 */
const parseWebStory = (tags) =>
  tags.map((tag, index) => {
    const type = tag.split(" ")[0].slice(1);
    return tag.includes("slot") && slotsToChange.includes(type)
      ? parseWebStoryTagForSlot(tags, tag, index, type)
      : tag;
  });

/** Refactors web-component story render method to work with react.
 *
 * @param {string} story Content of web-component story.
 * @param {string} name Name of the stories component.
 *
 * @returns {string} refactored (reactified) story.
 */
const buildReactifiedStoryRender = (story, name) => {
  console.log("buildReactifiedStoryRender", story, name);
  /** Initial part of string is <ZetaX ..., this remains unchanged. */
  const a = story.trim().slice(0, capitalize(name).length + 5) + " {...args} >";

  /** Split the remaining string on each '<' to find all the HTML tags. */
  let c1 = story
    .slice(story.indexOf(">"))
    .replace("`", "")
    .slice(1)
    .split("<")
    .map((x, i) => (i == 0 ? x : `<${x}`));

  /** Final tag of string is </ZetaX >, this remains unchanged. */
  const c = c1.pop();

  /** All intermediate tags should be parsed for slots and potentially refactored. */
  const b = parseWebStory(c1).join("");

  /** Rebuild story string in refactored form. */
  return a + b + c;
};

/** Creates a storybook file for react component based off web component storybook.
 *
 * @param {string} path Path of existing storybook for web component.
 */
const outputStoryFile = (storyPath) => {
  const outputPath = `${storyPath.replace("./src/", ZETA_FOLDER_PATH)}x`;

  /** kebab-case name of story.*/
  const name = pathToName(storyPath);
  const camelCaseName = capitalize(name);

  /** All text of story. */
  const storyText = readFileSync(storyPath).toString();

  let replaceImport = "";

  if (storyText.includes("render")) {
    // log(`🔨 --- Render method found. Update this to use react props: ${path.resolve(outputPath)}`)
    replaceImport = 'import React from "react";';
  }

  /** Reads in file, removes lit import and adds render. */
  let storyWeb = storyText
    .split(/$/)
    .map((x) =>
      x.includes("render")
        ? "//TODO: This render method may need to change for react\n" + x
        : x
    )
    .join("\n");

  /** Builds populated template. */
  let populatedTemplate = storyWeb;
  populatedTemplate = replaceAllInTemplate(
    'import { html } from "lit";',
    replaceImport,
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    "web-components",
    "react",
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    "Meta<Zeta",
    "Meta<typeof Zeta",
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    "StoryObj<Zeta",
    "StoryObj<typeof Zeta",
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    `"zeta-${name}"`,
    `Zeta${camelCaseName}`,
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    `"Zeta${camelCaseName}"`,
    `Zeta${camelCaseName}`,
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    `import type { Zeta${camelCaseName} } from`,
    `import Zeta${camelCaseName} from`,
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    `import { ifDefined } from "lit/directives/if-defined.js";`,
    "",
    populatedTemplate
  );
  populatedTemplate = replaceAllInTemplate(
    `import { spread } from "@open-wc/lit-helpers";`,
    "",
    populatedTemplate
  );

  populatedTemplate = populatedTemplate.replace(
    /import \{ Zeta([A-Z][a-zA-Z]+) \} from "..\//,
    'import Zeta$1 from "../',
    populatedTemplate
  );
  populatedTemplate = populatedTemplate.replace(
    /from "((?:..\/)+)(?:.+\/)?([a-zA-Z-]+).js"/g,
    `from "\$1src/\$2/index.js"`,
    populatedTemplate
  ); //Path of react index file
  populatedTemplate = populatedTemplate.replace(
    /import "((?:..\/)+)(?:.+\/)?([a-zA-Z-]+).js"/g,
    (_, a, b) =>
      `import Zeta${pascalCaseFromKebab(b)} from "${a}src/${b}/index.js"`,
    populatedTemplate
  ); //Path of other react components used in this story index file
  populatedTemplate = populatedTemplate.replace(
    /ifDefined\(([a-zA-Z\._-]+)\)/g,
    "$1",
    populatedTemplate
  ); //removes ifDefined
  populatedTemplate = populatedTemplate.replace(
    /\$\{spread\(args\)\}/g,
    "{...args}",
    populatedTemplate
  ); //converts the usage of spread() function to actual ...spread in React
  populatedTemplate = populatedTemplate.replace(
    /\$\{args\.([A-Za-z0-9._-]+)\}/g,
    "{args.$1}",
    populatedTemplate
  ); //converts ${...} to {...}
  populatedTemplate = populatedTemplate.replace(
    /\$\{/g,
    "{",
    populatedTemplate
  ); //converts remaining ${ to { . Probably dont need the line above

  /** Refactor local imports to come from react index file */
  let localImports = [];
  const populatedTemplateArr = populatedTemplate
    .split(/$/)
    .map((line) => {
      if (foldersToIgnore.some((element) => line.includes(element))) {
        localImports.push(line.split("{")[1].split("}")[0]);
        return null;
      }
      return line;
    })
    .filter((item) => item);

  //TODO: This doesnt remove props from template
  //TODO: When in template this does not wrap slot children
  populatedTemplate = populatedTemplateArr.join("\n");
  /** Refactor lit html in render methods */
  populatedTemplate = populatedTemplate
    .split(/html`\s*/s)
    .map((y, index) => {
      // if(name === 'button') console.log("htmlToReactRender", name, index);
      /** Filters out any parts of the story that are irrelevant */
      if (y.includes("</Zeta")) {
        return buildReactifiedStoryRender(y, name).replace("`", "");
      }
      // if (index != 0) {

      //   y = '<>' + y
      //   return y.replace('`', '</>');
      // }
      //Change web component element with React Element
      return y
        .replace(
          /<(\/?)zeta-([a-z0-9-]+)(\s|>|\/>)/g,
          (match, group1, group2, group3, endTick) => {
            return `<${group1}Zeta${capitalize(group2)}${group3}`;
          }
        )
        .replace(/(\s+)[\.@\?]([a-zA-Z0-9_-]+)=/g, "$1$2=")
        .replace(/<\/([a-zA-Z-]+)\s*>\s*`/gs, "</$1>");
    })
    .join("");

  let x = populatedTemplate
    .split("content:")
    .map((x, i) => (i == 0 ? x : "content:" + x));
  let a = x.shift();
  x = x.map((b, i7) => {
    const c = b.split("<").map((x, i) => (i == 0 ? x : "<" + x));
    c.forEach((d, index) => {
      if (d.startsWith("<zeta-")) {
        c[index] = "<Zeta" + d[6].toUpperCase() + d.slice(7);
      } else if (d.startsWith("</zeta-")) {
        c[index] = "</Zeta" + d[7].toUpperCase() + d.slice(8);
      }
      if (d.includes("slot=")) {
        let a = c[index].split("slot=")[0];
        let b = c[index].split("slot=")[1].split('"').slice(2);
        let name1 = c[index].split('slot="')[1].split('"')[0];
        c[index] = '<div slot="' + name1 + '">' + a + b;
        let name = c[index].slice(1).split(" ").shift();
        let i = index + 1;
        let counter = 0;

        for (i; i < c.length; i++) {
          if (c[i].startsWith("<" + name)) {
            counter++;
          } else if (c[i].startsWith("</" + name)) {
            if (counter > 0) {
              counter--;
            } else {
              c[i] = c[i] + "</div>";
              break;
            }
          }
        }
      }
    });
    return c.join("");
  });

  populatedTemplate = a + x;

  /** Write out story file. */
  write(outputPath, populatedTemplate);
};

const main = () => {
  /// Build react storybooks
  log("\n📖 --- Looking for un-reactified storybook files");
  const allWebStories = getWebStories();
  const currentReactStoriesConv = walker(SRC_PATH)
    .filter((x) => x.includes(".stories."))
    .map((x) => x.replace("/zeta-react/", "/").slice(0, -1));
  const allStoriesNeeded = allWebStories.filter(
    (x) => !currentReactStoriesConv.includes(x)
  );

  if (allStoriesNeeded.length > 0) {
    if (allStoriesNeeded.length == 1) {
      log("😮 --- 1 un-reactified story found");
    } else {
      log("😮 --- 2 un-reactified stories found");
    }
    allStoriesNeeded.forEach((file) => outputStoryFile(file));
    log(
      `✅ --- All ${allStoriesNeeded.length} stories un-reactified to ${path.resolve(ZETA_FOLDER_PATH)}`
    );
  } else {
    log("🚀 --- No un-reactified stories found");
  }
  log("✅ --- Done\n");
};

main();

//TODO:

// Dont do mdx files or styles or mixins
// Fix import lines
