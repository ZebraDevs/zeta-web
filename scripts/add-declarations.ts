import fs from "fs";
import path from "path";
import { log } from "./utils";

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

const main = async () => {
  const dtsFiles = findDTSFiles(directoryPath);

  dtsFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const matches = content.match(/interface HTMLElementTagNameMap\s*{([^}]*)}/s);
    if (matches && matches[1]) {
      const extractedValues = matches[1]
        .split(";")
        .map((entry) => entry.trim())
        .filter((entry) => entry)[0];

      const [key, value] = extractedValues.split(":").map((part) => part.trim());

      const relativePath = path.relative(path.dirname(file), path.join(directoryPath, "../jsx.js")).replace(/\\/g, "/");
      const reactDec = `
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ${key}: ${value}Props & BaseProps & BaseEvents;
    }
  }
}`;
      const reactImport = `import { ${value}Props, BaseProps, BaseEvents } from "${relativePath}";\n`;
      if (!content.includes(reactImport) && !content.includes(reactDec)) {
        log("Adding to file:" + file);
        fs.writeFileSync(file, reactImport + content + reactDec, "utf-8");
      } else {
        log(`Import or declaration already exists in ${file}`);
      }
    } else {
      log(`No matches found in ${file}`);
    }
  });
};

main();
