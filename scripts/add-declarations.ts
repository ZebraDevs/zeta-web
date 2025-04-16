import fs, { write } from "fs";
import path from "path";
import { log } from "./utils";
import { createMinifier } from "dts-minify";
import * as ts from "typescript";

interface CustomElements {
  comment: string;
  key: string;
  value: string;
}

interface FileToWrite {
  filePath: string;
  content: string;
}

const directoryPath = path.join("dist/components");

const findDTSFiles = (dir: string): string[] => {
  const resolvedDir = path.resolve(dir).replace(/^(\.\.(\/|\\|$))+/, "");

  if (
    resolvedDir &&
    resolvedDir != "" &&
    resolvedDir.indexOf("\0") === -1 &&
    fs.existsSync(resolvedDir) &&
    fs.statSync(resolvedDir).isDirectory() &&
    resolvedDir.includes(directoryPath)
  ) {
    const files = fs.readdirSync(dir);
    const dtsFiles: string[] = [];
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        dtsFiles.push(...findDTSFiles(filePath));
      } else if (file.endsWith(".d.ts") && !file.endsWith(".styles.d.ts")) {
        dtsFiles.push(filePath);
      }
    });

    return dtsFiles;
  } else {
    log(`Skipping directory: ${dir}`);
  }
  return [];
};

const getCustomElementsObject = (): CustomElements[] => {
  const stringContent = fs
    .readFileSync(path.join("dist", "jsx.d.ts"), "utf-8")
    .split("export type CustomElements =")[1]
    .split("\n\n");

  const customElements: CustomElements[] = [];

  stringContent.forEach((line) => {
    let line2 = line.trim();
    if (line2.endsWith("};")) {
      line2 = line2.slice(0, -2).trim();
    }

    const comment = line2.split("*/")[0] + "*/";
    const lastLine = line2.split("\n").slice(-1)[0];

    const key = lastLine.split(":")[0].trim();
    const value = lastLine.split(":")[1].split(";")[0].trim();

    if (comment && key && value) {
      customElements.push({ comment, key, value });
    }
  });

  return customElements;
};

const parseDTSFiles = (files: string[], customElements: CustomElements[]): FileToWrite[] =>
  files.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const matches = content.match(/interface HTMLElementTagNameMap\s*{([^}]*)}/s);
    if (matches && matches[1]) {
      const extractedValues = matches[1]
        .split(";")
        .map((entry) => entry.trim())
        .filter((entry) => entry)[0];

      const [key, value] = extractedValues.split(":").map((part) => part.trim());
      const element = customElements.filter((el) => el.key === key)[0];

      const relativePath = path
        .relative(path.dirname(filePath), path.join(directoryPath, "../jsx.js"))
        .replace(/\\/g, "/");
      const reactDec = `
      declare module "react" {
        namespace JSX {
          interface IntrinsicElements {
            ${element.comment}
            ${element.key}: ${element.value}
          }
        }
      }`;
      const reactImport = `import { ${value}Props, BaseProps, BaseEvents } from "${relativePath}";\n`;

      if (!content.includes(reactImport) && !content.includes(reactDec)) {
        log(`Adding import and declaration to ${filePath}`);
        return { filePath, content: reactImport + content + reactDec };
      } else {
        log(`Import or declaration already exists in ${filePath}`);
        return { filePath, content };
      }
    } else {
      log(`No matches found in ${filePath}`);
      return { filePath, content };
    }
  });

const writeMinifiedFiles = (files: FileToWrite[]) => {
  const minifier = createMinifier(ts);

  files.forEach((file) => {
    const minifiedContent = minifier.minify(file.content, { keepJsDocs: true }).replaceAll("/**", "\n/**");
    fs.writeFileSync(file.filePath, minifiedContent, "utf-8");
    log(`Minified and wrote file: ${file.filePath}`);
  });
};

const main = async () => {
  const dtsFiles = findDTSFiles(directoryPath);
  const customElements = getCustomElementsObject();
  const filesToWrite = parseDTSFiles(dtsFiles, customElements);
  writeMinifiedFiles(filesToWrite);
};

main();
