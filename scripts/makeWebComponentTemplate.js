import { write, log, replaceAllInTemplate, capitalize, insert } from "./utils.js";
import { readFileSync, existsSync, writeFileSync } from "fs";
import path from "path";

const buildFile = (nameLower, nameCap, outDir, template, type) => {
  if (existsSync(path.normalize(outDir))) {
    log("⚔️ --- " + nameCap + " " + type + " already exists");
  } else {
    let populatedTemplate = template;
    populatedTemplate = replaceAllInTemplate("_replacelower_", nameLower, populatedTemplate);
    populatedTemplate = replaceAllInTemplate("_replacecap_", nameCap, populatedTemplate);
    write(outDir, populatedTemplate);
    log(" --- Zeta" + nameCap + " " + type + " created\n");
  }
};

const appendIndex = outDir => {
  const indexPath = "../src/index.ts";
  const indexFile = readFileSync(indexPath);
  if (indexFile) {
    let indexFileStr = String(indexFile);

    const importStatement = 'import "' + outDir + '.ts";' + "\n";
    const importStatementLocation = indexFileStr.indexOf("export") - 2;

    indexFileStr = insert(indexFileStr, importStatement, importStatementLocation);

    const exportStatement = 'export * from "' + outDir + '.js";';

    indexFileStr += exportStatement;

    log(indexFileStr);
    writeFileSync(indexPath, indexFileStr);
  }
};

const main = () => {
  const nameArr = process.argv.slice(2).filter(x => x);
  let nameLower,
    dirName = null;
  nameLower = nameArr[0].toLowerCase();
  if (nameArr.length == 1) {
    // dir and file same name
    dirName = nameLower;
  } else if (nameArr.length == 2) {
    // dir and file differnet names
    dirName = nameArr[1];
  } else {
    log("❎ --- No name entered");
  }

  if (dirName) {
    const outDir = "../src/components/" + dirName + "/" + nameLower;
    const testOutDir = "../test/" + dirName + "/" + nameLower;
    const nameCap = nameLower
      .split("-")
      .map(x => capitalize(x))
      .join("");

    buildFile(nameLower, nameCap, outDir + ".ts", readFileSync(path.normalize("./assets/web.template")), "Component");
    buildFile(nameLower, nameCap, outDir + ".scss", readFileSync(path.normalize("./assets/web.styles.template")), "Style");
    buildFile(nameLower, nameCap, outDir + ".stories.ts", readFileSync(path.normalize("./assets/web.stories.template")), "Story");
    buildFile(nameLower, nameCap, testOutDir + ".test.ts", readFileSync(path.normalize("./assets/web.test.template")), "Test");

    appendIndex(outDir);
  }
};

main();
