import fs from "fs";
import path from "path";
import { getAllComponents } from "./shared.js";
const components = getAllComponents();

const sourceDir = path.join("./src");

let imports = components
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(
    ({ name, path }) =>
      `import { ${name} } from "${path.replace(/\.ts/, ".js").replace(/^src\//, "./")}";`
  );
imports.unshift(`import "./index.css";`);
let exports = `\nexport {\n${components.map(({ name }) => `  ${name}`).join(",\n")}\n};`;

fs.writeFileSync(
  path.join(sourceDir, "index.ts"),
  `${imports.join("\n")}${exports}`,
  "utf8"
);
