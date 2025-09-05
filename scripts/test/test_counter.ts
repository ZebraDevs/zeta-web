import { Project, SyntaxKind, Node, SourceFile } from "ts-morph";
import testCategories from "../assets/web.test.categories.json";
import packagejson from "../../package.json";
import * as fs from "fs";
import * as path from "path";

import {
  ASTStructure,
  TestCounts,
  TestFiles,
  writeToFile,
  isDescribeExpression,
  isItExpression,
} from "./test_counter_utils";

/**
 * Recursively retrieves all test file paths from a given directory.
 * A test file is identified by its `.test.ts` extension.
 *
 * @returns An array of strings, each representing the path to a test file.
 */
function getTestFiles(): string[] {
  const inputDir = path.resolve("src/test").replace(/^(\.\.(\/|\\|$))+/, "");

  let testFilePaths: string[] = [];

  function readDirectory(directory: string) {
    const entities = fs.readdirSync(directory, { withFileTypes: true });
    for (const entity of entities) {
      const fullPath = path.join(directory, entity.name);
      if (entity.isDirectory()) {
        readDirectory(fullPath);
      } else if (entity.isFile() && entity.name.endsWith(".test.ts")) {
        testFilePaths.push(fullPath);
      }
    }
  }

  readDirectory(inputDir);
  return testFilePaths;
}

/**
 * Parses the given test files and returns a map of their formatted AST structures.
 *
 * @param paths - An array of file paths to the test files that need to be parsed.
 * @returns A map where the keys are the file names and the values are the formatted AST structures.
 */
function parseTestFiles(paths: string[]): TestFiles {
  var parsedTestFiles: TestFiles = new Map();
  const project = new Project();
  for (const path of paths) {
    const sourceFile: SourceFile = project.addSourceFileAtPath(path);

    // get the AST structure of the source file
    const astTree: ASTStructure = nodeToASTStructure(sourceFile);

    // extract describe and it statements from the AST structure
    const extractedStatements: ASTStructure[] = extractStatements(astTree.children![0]);

    // format the extracted statements into a nested record object
    const formattedRecord: Record<string, any> = formatExtractedStatements(extractedStatements);

    const dirs = path.split(/[\\/]/);
    const componentName = dirs.length > 1 ? dirs[dirs.length - 2] : path.split(".")[0];

    parsedTestFiles[componentName] = formattedRecord;
  }
  return parsedTestFiles;
}

/**
 * Recursively converts a Node object into a JSON-like structure.
 *
 * @param node - The Node object to be converted.
 * @returns An ASTStructure object representing the node and its children.
 */
function nodeToASTStructure(node: Node): ASTStructure {
  // recursively get children of node
  const children = node.getChildren().map(nodeToASTStructure);
  return {
    kind: SyntaxKind[node.getKind()],
    text: node.getText() as String,
    children: children.length > 0 ? children : undefined,
  };
}

/**
 * Extracts `describe` and `it` statements from an AST structure.
 *
 * This function traverses an Abstract Syntax Tree (AST) and collects all
 * `describe` and `it` statements into a hierarchical structure. The `describe`
 * statements can contain nested `describe` and `it` statements as children.
 *
 * @param node - The root node of the AST structure to traverse.
 * @returns An array of `describe` statements, each containing nested `describe`
 *          and `it` statements as children.
 */
function extractStatements(node: ASTStructure): ASTStructure[] {
  const describeStatements: ASTStructure[] = [];

  function traverse(node: ASTStructure, parentDescribe?: ASTStructure) {
    if (isDescribeExpression(node)) {
      const newDescribe = { kind: node.kind, text: node.text, children: [] };

      // if there is a parent describe, add the new describe as a child
      if (parentDescribe) {
        parentDescribe.children!.push(newDescribe);
      } else {
        // otherwise, add the new describe to the top level
        describeStatements.push(newDescribe);
      }
      parentDescribe = newDescribe;
    } else if (isItExpression(node)) {
      const newIt = { kind: node.kind, text: node.text };
      // if there is a parent describe, add the new it as a child
      if (parentDescribe) {
        parentDescribe.children!.push(newIt);
      }
    }

    // recursively traverse children
    if (node.children) {
      node.children.forEach((child) => traverse(child, parentDescribe));
    }
  }

  traverse(node);
  return describeStatements;
}

/**
 * Formats an ASTStructure into a nested record object.
 *
 * @param tree - An array of ASTStructure nodes representing the tree to format.
 * @returns A nested record object where each `describe` statement creates a new nested object
 *          and each `it` statement adds to a `tests` array within the appropriate nested object.
 *
 * The function processes nodes with the following rules:
 * - Nodes with `kind` "ExpressionStatement" and text starting with "describe" create new nested objects.
 * - Nodes with `kind` "ExpressionStatement" and text starting with "it" add to a `tests` array within the appropriate nested object.
 * - Nested `describe` statements are handled recursively to maintain the hierarchy.
 *
 * Example:
 * Given an AST structure representing:
 *
 * describe('suite1', () => {
 *   it('test1', () => {});
 *   describe('suite2', () => {
 *     it('test2', () => {});
 *   });
 * });
 *
 * The function will return:
 * {
 *   suite1: {
 *     tests: ['test1'],
 *     suite2: {
 *       tests: ['test2']
 *     }
 *   }
 * }
 */
function formatExtractedStatements(tree: ASTStructure[]): Record<string, any> {
  const result: Record<string, any> = {};

  function addToResult(node: ASTStructure, parentKey?: string) {
    if (isDescribeExpression(node)) {
      const describeText: string = node.text.matchDescribeText();
      // if the describe statement is nested
      if (parentKey) {
        if (!result[parentKey] && !result[parentKey.split(".").shift()!]) {
          result[parentKey] = {};
        }
        if (!result[parentKey.split(".").shift()!]) {
          result[parentKey][describeText] = {};
        }
        node.children?.forEach((child) => addToResult(child, `${parentKey}.${describeText}`));
      } else {
        // else the describe statement is at the root level
        result[describeText] = {};
        node.children?.forEach((child) => addToResult(child, describeText));
      }
    } else if (isItExpression(node) && parentKey) {
      const itText = node.text.matchItText();
      const keys = parentKey.split(".");
      let current = result;
      keys.forEach((key) => {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      });
      if (!current["tests"]) {
        current["tests"] = [];
      }
      current["tests"].push(itText);
    }
  }

  tree.forEach((node) => addToResult(node));
  return result;
}

/**
 * Counts the number of tests in each test file and categorizes them.
 *
 * @param {TestFiles} testFiles - An object where the key is the file name and the value is a map of component names to their test groups.
 * @returns {TestCounts} A map where the key is the formatted file name and the value is a map of test categories to their counts.
 *
 * The function iterates over each test file and its components, counting the number of tests in each category.
 * Tests that are not in category groups are counted under the "unorganised" group.
 */
function countTests(testFiles: TestFiles): TestCounts {
  var testCounts: TestCounts = new Map();
  // loop through each top level object
  for (const [fileName, file] of Object.entries(testFiles)) {
    const fileTestCounts: Map<string, number> = new Map();

    // loop through each component
    for (const [componentName, testGroups] of Object.entries(file as Map<String, Map<String, String[]>>)) {
      const testGroupsArray = testGroups as Array<string>;

      // if the component has tests that aren't in a test group
      if (testGroupsArray["tests"]) {
        const testsLength = testGroupsArray["tests"].length;
        if (!fileTestCounts["unorganised"]) {
          fileTestCounts["unorganised"] = testsLength;
        } else {
          fileTestCounts["unorganised"] += testsLength;
        }
      }

      // loop through each test group
      for (const [groupName, tests] of Object.entries(testGroups)) {
        const sanitizedGroupName = groupName.sanitizeGroupName();
        const testsArray = tests as Array<string>;

        // if the test group is in the testCategories array
        if (
          testCategories.includes(sanitizedGroupName) ||
          (testCategories.includes(groupName) && testsArray["tests"])
        ) {
          const testsLength = testsArray["tests"].length;
          // if the test group has not been looped through yet
          if (!fileTestCounts[sanitizedGroupName]) {
            fileTestCounts[sanitizedGroupName] = testsLength;
            // if the test group has been looped through
          } else {
            fileTestCounts[sanitizedGroupName] += testsLength;
          }
          // if the test group is not in the testCategories array
        } else if (testsArray["tests"]) {
          const testsLength = testsArray["tests"].length;

          if (!fileTestCounts["unorganised"]) {
            fileTestCounts["unorganised"] = testsLength;
          } else {
            fileTestCounts["unorganised"] += testsLength;
          }
        }
      }
    }

    testCounts[fileName.sanitizeFileName()] = fileTestCounts;
  }
  return testCounts;
}

/**
 * Generates a Markdown table summarizing test counts for various test categories.
 *
 * @param testCounts - An object containing the counts of tests for each component.
 * @returns A string representing the Markdown table.
 *
 */
function generateMDTable(testCounts: TestCounts) {
  var data = [
    `| Component | ${testCategories.join(" | ").sanitizeGroupName()} | Unorganised | Total Tests |`,
    `| ${Array(testCategories.length + 3)
      .fill("---")
      .join(" | ")} |`,
  ].addComponentandTotalRows(testCounts, testCategories);

  return data.join("\n");
}

// /**
//  * This is the source of truth for the test categories.
//  * If you change the categories here, you must also change them in the test files.
//  * You can add or remove categories as needed.
//  * Tests that don't belong to one of these test groups well be organised into the "Unorganised" group.
//  * The order of the categories here will be reflected in the output.
//  * You can have the word 'Tests' in there or not. It wouldn't matter.
//  */
// const testCategories: string[] = [
//   "Accessibility",
//   "Content",
//   "Dimensions",
//   "Styling",
//   "Interaction",
//   "Golden",
//   "Performance",
// ];

async function main() {
  // get output directory
  const outputDir = path.resolve("scripts/test/output").replace(/^(\.\.(\/|\\|$))+/, "");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // get all test files
  const sourceFilePaths = getTestFiles();

  // parse test files
  const testFiles: TestFiles = parseTestFiles(sourceFilePaths);

  // count tests in each test group function
  const testCounts: TestCounts = countTests(testFiles);

  const lastUpdated = new Date().toISOString().split("T")[0];

  const zetaVersion = packagejson?.version ?? "";

  // prepend last updated and version info to the markdown output
  const header = `**Last updated:** ${lastUpdated}  |  **Zeta Web version:** ${zetaVersion}`;
  const markdownTable = [header, "", generateMDTable(testCounts)].join("\n");

  // write test count table to markdown file
  await writeToFile(outputDir + "/test_counts.md", markdownTable);
}

main();
