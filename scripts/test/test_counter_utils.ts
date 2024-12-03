import * as fs from "fs";
import * as path from "path";

import * as prettier from "prettier";

/**
 * Represents the structure of an Abstract Syntax Tree (AST).
 *
 * @interface ASTStructure
 * @property {String} kind - The kind of AST node.
 * @property {String} text - The text content of the AST node.
 * @property {ASTStructure[]} [children] - Optional array of child AST nodes.
 */
export interface ASTStructure {
  kind: String;
  text: String;
  children?: ASTStructure[];
}

/**
 * Represents a nested map structure for organizing test files.
 *
 * The structure is as follows:
 * - The outer map's keys are strings representing the the file name.
 * - The middle map's keys are strings representing the component groups.
 * - The inner map's keys are strings representing test categories (Accessibility, Content, etc).
 * - The innermost arrays contain strings representing the test names.
 */
export type TestFiles = Map<String, Map<String, Map<String, Array<String>>>>;

/**
 * Represents a nested map structure for counting tests.
 *
 * - Where the outer map's keys are strings representing the file name.
 * - The inner map's keys are strings representing the test group names.
 * - The inner map's values are numbers representing the number of tests in the group.
 */
export type TestCounts = Map<string, Map<string, number>>;

/**
 * Extends the global `String` interface with additional methods.
 *
 * @interface String
 * @method capitalizeEachWord - Capitalizes the first letter of each word in the string.
 * @returns {string} - The modified string with each word capitalized.
 *
 * @method matchItText - Matches and processes `it()` text in a specific way.
 * @returns {string} - The processed string.
 *
 * @method matchDescribeText - Matches and processes `describe()` text in a specific way.
 * @returns {string} - The processed string.
 *
 *
 * Extends the global `Array` interface with an additional method.
 *
 * @interface Array
 * @method addComponentandTotalRows - Adds a component and total rows to the array.
 * @param {TestCounts} testCounts - The test counts to be added.
 * @returns {string[]} - The modified array with the added component and total rows.
 */
declare global {
  export interface String {
    capitalizeEachWord(): string;
    matchItText(): string;
    matchDescribeText(): string;
    sanitizeGroupName(): string;
    sanitizeFileName(): string;
    isExpression(): boolean;
    isItBlock(): boolean;
    isDescribeBlock(): boolean;
  }

  export interface Array<T> {
    addComponentandTotalRows(
      testCounts: TestCounts,
      testCategories: string[]
    ): string[];
  }
}

/**
 * Determines if the string is an `ExpressionStatement`.
 * @returns `true` if the string is an `ExpressionStatement`; otherwise, `false`.
 */
String.prototype.isExpression = function (): boolean {
  return this === "ExpressionStatement";
};

/**
 * Determines if the string is an `it()` block.
 * @returns `true` if the string is an `it()` block; otherwise, `false`.
 */
String.prototype.isItBlock = function (): boolean {
  return this.startsWith("it(") || this.startsWith("it.skip(");
};

/**
 * Determines if the string is a `describe()` block.
 * @returns `true` if the string is a `describe()` block; otherwise, `false`.
 */
String.prototype.isDescribeBlock = function (): boolean {
  return this.startsWith("describe(") || this.startsWith("describe.skip(");
};

/**
 * Checks if the given AST node represents a describe block expression.
 *
 * @param node - The AST node to check.
 * @returns `true` if the node is a describe block expression, otherwise `false`.
 */
export function isDescribeExpression(node: ASTStructure): boolean {
  return node.kind.isExpression() && node.text.isDescribeBlock();
}

/**
 * Checks if the given AST node represents an it block expression.
 *
 * @param node - The AST node to check.
 * @returns `true` if the node is an it block expression, otherwise `false`.
 */
export function isItExpression(node: ASTStructure): boolean {
  return node.kind.isExpression() && node.text.isItBlock();
}

/**
 * Capitalizes the first letter of each word in the string.
 * @returns The modified string with each word capitalized.
 */
String.prototype.capitalizeEachWord = function (): string {
  return this.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Sanitizes a string to be used as a group name.
 * @returns The sanitized string.
 */
String.prototype.sanitizeGroupName = function (): string {
  return this.replaceAll(" Tests", "").replaceAll("SKIPPED ", "");
};

/**
 * Sanitizes a string to be used as a file name.
 * @returns The sanitized string.
 */
String.prototype.sanitizeFileName = function (): string {
  return this.split(".").shift()!.replaceAll("-", " ").capitalizeEachWord();
};

/**
 * Matches and processes the text content of a `it()` block.
 * @returns The processed string.
 */
String.prototype.matchItText = function (): string {
  const match = this.match(/(it(?:\.skip)?)\(([^)]+)\)/);
  if (match) {
    let result = match[2]
      .replaceAll('"', "")
      .replace(", async (", "")
      .replace(", (", "");
    if (match[1] === "it.skip") {
      result = "SKIPPED " + result;
    }
    return result;
  }
  return "unknown it";
};

/**
 * Matches and processes the text content of a `describe()` block.
 * @returns The processed string.
 */
String.prototype.matchDescribeText = function (): string {
  const match = this.match(/(describe(?:\.skip)?)\(([^)]+)\)/);
  if (match) {
    let result = match[2].replaceAll('"', "").replace(", (", "");
    if (match[1] === "describe.skip") {
      result = "SKIPPED " + result;
    }
    return result;
  }
  return "unknown describe";
};

/**
 * Adds component and total rows to the provided data array based on the test counts.
 *
 * @param data - The array to which the formatted test count rows will be added.
 * @param testCounts - An object containing the test counts for each component, organized by test group.
 * @returns The updated data array with the components and total rows.
 *
 * @example
 * ```typescript
 * const data: string[] = [];
 * const testCounts: TestCounts = {
 *   ComponentA: {
 *     "Accessibility Tests": 5,
 *     "Content Tests": 3,
 *     "Dimensions Tests": 2,
 *     "Styling Tests": 4,
 *     "Interaction Tests": 1,
 *     "Golden Tests": 0,
 *     "Performance Tests": 2,
 *     "unorganised": 1,
 *   },
 *   ComponentB: {
 *     "Accessibility Tests": 2,
 *     "Content Tests": 1,
 *     "Dimensions Tests": 3,
 *     "Styling Tests": 2,
 *     "Interaction Tests": 4,
 *     "Golden Tests": 1,
 *     "Performance Tests": 0,
 *     "unorganised": 0,
 *   },
 * };
 * addComponentandTotalRows(data, testCounts);
 * console.log(data);
 * // Output:
 * // [
 * //   "| ComponentA | 5 | 3 | 2 | 4 | 1 | 0 | 2 | 1 | 18 |",
 * //   "| ComponentB | 2 | 1 | 3 | 2 | 4 | 1 | 0 | 0 | 13 |",
 * //   "| Total Tests | 7 | 4 | 5 | 6 | 5 | 1 | 2 | 1 | 31 |"
 * // ]
 * ```
 */
Array.prototype.addComponentandTotalRows = function (
  testCounts: TestCounts,
  testCategories: string[]
): string[] {
  const groupTotals = new Map<string, number>(
    testCategories.map((category) => [category.sanitizeGroupName(), 0])
  );
  groupTotals.set("unorganised", 0);

  // for each component
  for (const [componentName, groups] of Object.entries(testCounts)) {
    // for each group in the component get the total number of tests
    for (const [key, value] of Object.entries(groups)) {
      groupTotals.set(
        key.sanitizeGroupName(),
        groupTotals.get(key.sanitizeGroupName())! + (value as number)
      );
    }

    // get the total number of tests for the component
    const totalTestsForComponent = Object.values(groups).reduce(
      (acc, curr) => (acc as number) + (curr as number),
      0
    );

    // add the component row
    const row = [`| ${componentName}`];
    for (const category of groupTotals.keys()) {
      row.push(`${groups[category] || 0}`);
    }
    // add the total number of tests for the component
    row.push(` ${totalTestsForComponent} |`);
    this.push(row.join(" | "));
  }

  // get the total number of tests for each group
  const totalTests = Array.from(groupTotals.values()).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // add the total row
  const row = [`| Total Tests`];
  for (const category of groupTotals.keys()) {
    row.push(`${groupTotals.get(category) || 0}`);
  }
  // add the total number of tests
  row.push(` ${totalTests} |`);
  this.push(row.join(" | "));

  return this;
};

/**
 * Writes a JSON object to a specified file.
 *
 * @param outputPath - The path where the JSON file will be written.
 * @param data - The JSON data to write to the file.
 */
export function writeJsonToFile(outputPath: string, data: any) {
  fs.writeFileSync(
    path.resolve(outputPath).replace(/^(\.\.(\/|\\|$))+/, ""),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

/**
 * Writes the provided data to a file at the specified output path.
 *
 * @param outputPath - The path where the markdown file will be written.
 * @param data - The data to be written to the markdown file.
 */
export async function writeToFile(outputPath: string, data: any) {
  fs.writeFileSync(
    path.resolve(outputPath).replace(/^(\.\.(\/|\\|$))+/, ""),
    await prettier.format(data, { parser: "markdown" }),
    "utf8"
  );
}
