import { mkdirSync, writeFileSync } from "fs";
import * as path from "path";

/** Custom wrapper for `console.log` to account for --silent arg.
 *
 * @param {string} string string to be logged.
 */
export const log = string => {
  if (!process.argv.slice(2).includes("--silent")) {
    console.log(string);
  }
};

/** Custom wrapper for `writeFileSync` to account for --dry-run arg.
 *
 * @param {string} pathName Path of file to be written.
 * @param {String} contents Contents to be written to file.
 */
export const write = (pathName, contents) => {
  if (!process.argv.slice(2).includes("--dry-run")) {
    const dir = pathName.split("/");
    dir.pop();
    mkdirSync(path.normalize(dir.join("/")), { recursive: true });
    writeFileSync(path.normalize(pathName), contents);
  }
};

/** Finds and replaces all instances of a search with replacement in template.
 *
 * @param {string} search String to be replaced.
 * @param {string} replacement Replacement string.
 * @param {string} template String to be searched.
 * @returns {string} String with replacements made.
 */
export const replaceAllInTemplate = (search, replacement, template) => String(template).replace(new RegExp(search, "g"), replacement);

/** Capitalizes all words in string.
 *
 * @param {string} s string to be parsed.
 * @returns {string} All words in string capitalized.
 */
export const capitalize = s =>
  s
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

/**
 * Inserts a string into another string at a given location.
 *
 * @param {string} string The string to be added to.
 * @param {string} newString The string to be inserted.
 * @param {int} index The index for the new string to be insterted at.
 * @returns The new string;
 */
export const insert = (string, newString, index) => string.slice(0, index) + newString + string.slice(index, string.length);

/**
 * Converts a Windows path's seperators to '/'
 * @param {string} string the path to convert
 * @returns The path with all '\' changed to '/'
 */
export const convertPathToUnixStyle = (string) => string.replace(/\\/g, '/');

/**
 * Converts camelCase to PascalCase
 * @param {string} string camelCase string to convert
 * @returns PascalCase string representation
 */
export const pascalCase = (string) => pascalCaseFromParts(string.split(/(?=[A-Z])/));

/**
 * Converts kebab-case to PascalCase
 * @param {string} string kebab-case string to convert
 * @returns {string} PascalCase representation
 */
export const pascalCaseFromKebab = (string) => pascalCaseFromParts(string.split('-'));

/**
 * Converts a list of strings to a to PascalCase string
 * @param {string[]} stringArr Array of words that make up the identifier
 * @returns {string} A PascalCase string combining the inputted strings
 */
export const pascalCaseFromParts = (stringArr) => stringArr.reduce((acc, part) => acc + wordToTitleCase(part), "");;

/**
 * Capitalizes the first letter of a string
 * @param {string} string 
 * @returns {string} the inputted string with a Capitalized first letter
 */
export const wordToTitleCase = (string) => (string.slice(0,1).toUpperCase() + string.slice(1));
