/* LICENSE
Copyright (c) 2020 A Beautiful Site, LLC
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
File source: https://github.com/shoelace-style/shoelace/blob/next/scripts/make-react.js
Modifications: made to fit zeta-web
*/
import commandLineArgs from "command-line-args";
import { promises as fs } from "fs";
import path from "path";
import { deleteAsync } from "del";
import prettier from "prettier";
import { getAllComponents } from "./shared.js";
import { pascalCaseFromKebab } from "./utils.js";

const { outdir } = commandLineArgs({ name: "outdir", type: String });

const reactSrcDir = path.join("../zeta-react/src");
const reactStorybookDir = path.join(reactSrcDir, "../.storybook");
const webStorybookDir = path.join("./.storybook");
//TODO change this

const errors = {};
const _collateError = (type, file) => {
  if (errors[type] === undefined) {
    errors[type] = [];
  }
  errors[type].push(file);
};
const _reportErrors = () => {
  const errArr = Object.entries(errors);
  errArr.forEach(([type, files]) => {
    console.error(`⛔ ${files.length} ${type} error(s) found:`);
    files.forEach((file) => console.error(`  - ${file}`));
  });
  process.exitCode = errArr.length > 0 ? 1 : 0;
};

// Fetch component metadata
const components = getAllComponents(true).map((component) => {
  const tagWithoutPrefix = component.tagName.replace(/^zeta-/, "");
  const componentDir = path.join(reactSrcDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, "index.ts");
  return { ...component, tagWithoutPrefix, componentDir, componentFile };
});

const index = components.map(
  ({ name, tagWithoutPrefix }) =>
    `export { default as ${name} } from './${tagWithoutPrefix}/index.js';`
);

const copyStorybookFiles = () => {
  const storybookPaths = ["./ZetaTheme.js", "./manager.js"];
  return storybookPaths.map((filePath) => {
    return fs.copyFile(
      path.join(webStorybookDir, filePath),
      path.join(reactStorybookDir, filePath)
    );
  });
};

const generateComponentFile = ({
  tagName,
  name,
  events,
  jsDoc,
  componentDir,
  componentFile /*, path*/,
}) => {
  let hasErrored = false;
  // const importPath = path.replace(/\.ts$/, '.js');
  const enhancedEvents = (events || []).map(({ name: fullName }) => {
    const [_, eventClass, name] = /(?:([a-zA-Z0-9_]+):)?([a-zA-Z-]+)/g.exec(
      fullName
    );
    const pascalName = pascalCaseFromKebab(name);
    const eventName = eventClass || `${pascalName}Event`;
    const reactName = `on${pascalName}`;
    return {
      imprt: `import type { ${eventName}Detail } from '@zebra-fed/zeta-web/events.js';`,
      exprt: `export type { ${eventName}Detail } from '@zebra-fed/zeta-web/events.js';`,
      reactName,
      name,
      eventName,
    };
  });
  const eventDefs = {};
  enhancedEvents.forEach(({ reactName, name, eventName }) => {
    try {
      const key = `${reactName}: '${name}'`;
      if (eventDefs[key] === undefined) {
        console.log("New event found: " + key, eventName, eventDefs);
        if (name === "undefined") {
          throw new Error(`Event name is undefined: ${tagName}`);
        }
        eventDefs[key] = `${eventName}Detail`;
      } else {
        eventDefs[key] = `${eventDefs[key]} | ${eventName}Detail`;
        console.log("Defined event: " + key, eventName, eventDefs);
      }
    } catch (e) {
      _collateError("undefinedEvent", componentFile);
      // console.warn(e.message);
      hasErrored = true;
    }
  });
  if (hasErrored) {
    // console.error("⛔ Error in generating event details", componentFile);
    return;
  }

  const eventNameImport =
    (events || []).length > 0
      ? `import { type EventName } from '@lit/react';`
      : ``;

  return Promise.all([
    prettier.format(
      `
    import * as React from 'react';
    import { createComponent } from '@lit/react';
    import { ${name} } from '@zebra-fed/zeta-web';

    ${eventNameImport}
    ${[...new Set(enhancedEvents.map(({ imprt }) => imprt))].join("\r\n")}
    ${[...new Set(enhancedEvents.map(({ exprt }) => exprt))].join("\r\n")}

    ${jsDoc || ""}
    const reactWrapper = createComponent({
    tagName: '${tagName}',
      elementClass: ${name},
      react: React,
      events: {
        ${Object.entries(eventDefs)
          .map(([key, value]) => `${key} as EventName<CustomEvent<${value}>>`)
          .join(",\r\n")}
      },
      displayName: "${name}"
    })

    export default reactWrapper
  `,
      {
        parser: "babel-ts",
      }
    ),
    fs.mkdir(componentDir, { recursive: true }),
  ]).then(([source, _fileName]) => fs.writeFile(componentFile, source, "utf8"));
};

const main = async () => {
  // Clear build directory
  await deleteAsync(reactSrcDir, { force: true }).then(() =>
    fs.mkdir(reactSrcDir, { recursive: true })
  );

  Promise.all([
    ...components.map(generateComponentFile),
    // Generate the index file
    fs.writeFile(path.join(reactSrcDir, "index.ts"), index.join("\n"), "utf8"),
    ...copyStorybookFiles(),
  ]);

  return _reportErrors(errors);
};

main();
