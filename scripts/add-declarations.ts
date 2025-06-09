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

/**
 * Recursively finds all .d.ts files in a directory and its subdirectories.
 * @param dir - The directory to search in.
 * @returns An array of paths to .d.ts files.
 */
const findDTSFiles = (dir: string): string[] => {
  const resolvedDir = path.resolve(dir);

  if (
    !resolvedDir ||
    resolvedDir.includes("\0") ||
    !fs.existsSync(resolvedDir) ||
    !fs.statSync(resolvedDir).isDirectory() ||
    !resolvedDir.includes(directoryPath)
  ) {
    log(`Skipping directory: ${dir}`);
    return [];
  }

  return fs.readdirSync(resolvedDir).flatMap((file) => {
    const filePath = path.join(resolvedDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      return findDTSFiles(filePath);
    }

    return file.endsWith(".d.ts") && !file.endsWith(".styles.d.ts") ? [filePath] : [];
  });
};

/**
 * Reads the custom elements object from the generated JSX type definition file.
 * @returns An array of custom elements with their comments, keys, and values.
 */
const getCustomElementsObject = (): CustomElements[] => {
  const filePath = path.join("dist", "jsx.d.ts");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const typeDefinition = fileContent.split("export type CustomElements =")[1]?.split("\n\n") || [];

  return typeDefinition
    .map((entry) => {
      const trimmedEntry = entry.trim().replace(/};$/, "").trim();
      const commentMatch = trimmedEntry.match(/\/\*\*[\s\S]*?\*\//);
      const lastLine = trimmedEntry.split("\n").pop()?.trim();
      const [key, value] = lastLine?.split(":").map((part) => part.trim()) || [];

      return commentMatch && key && value ? { comment: commentMatch[0], key, value: value.replace(";", "") } : null;
    })
    .filter((item): item is CustomElements => item !== null);
};

/**
 * Parses the .d.ts files to add React declarations for custom elements.
 * @param files - The array of .d.ts file paths.
 * @param customElements - The array of custom elements with their comments, keys, and values.
 * @returns An array of objects containing the file path and modified content.
 */
const parseDTSFiles = (files: string[], customElements: CustomElements[]): FileToWrite[] => {
  return files.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/interface HTMLElementTagNameMap\s*{([^}]*)}/s);

    if (!match || !match[1]) {
      log(`No matches found in ${filePath}`);
      return { filePath, content };
    }

    const keyValuePairs = match[1]
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((pair) => {
        const [key, value] = pair.split(":").map((part) => part.trim());
        return { key, value };
      });

    const cElements = customElements.filter((e) => keyValuePairs.some((el) => el.key === e.key));
    const elements = keyValuePairs.filter((e) => customElements.some((el) => el.key === e.key));

    if (elements.length === 0) {
      log(`No matching custom elements found for ${filePath}`);
      return { filePath, content };
    }

    const relativePath = path
      .relative(path.dirname(filePath), path.join(directoryPath, "../jsx.js"))
      .replace(/\\/g, "/");

    const reactImport = `import { ${elements.map((e) => e.value + "Props, ").join("")}BaseProps, BaseEvents } from "${relativePath}";\n`;

    const reactDeclaration = `
    declare module "react" {
      namespace JSX {
      interface IntrinsicElements {
        ${cElements
          .map(({ key, value, comment }) => {
            return `${comment}\n${key}: ${value}`;
          })
          .join("\n")}
      }
      }
    }`;

    if (!content.includes(reactDeclaration)) {
      return { filePath, content: `${reactImport}${content}\n${reactDeclaration}` };
    }

    return { filePath, content };
  });
};

/**
 * Writes and minifies content to the respective .d.ts files.
 * @param files - The array of objects containing the file path and content.
 */
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
