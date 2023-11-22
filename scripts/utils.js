import { mkdirSync, writeFileSync } from 'fs'
import * as path from 'path';

/** Custom wrapper for `console.log` to account for --silent arg.
 * 
 * @param {string} string string to be logged.
 */
export const log = (string) => {
    if (!process.argv.slice(2).includes('--silent')) {
        console.log(string)
    }
}

/** Custom wrapper for `writeFileSync` to account for --dry-run arg.
 * 
 * @param {string} pathName Path of file to be written.
 * @param {String} contents Contents to be written to file.
 */
export const write = (pathName, contents) => {
    if (!process.argv.slice(2).includes('--dry-run')) {
        const dir = pathName.split('/')
        dir.pop();
        mkdirSync(path.normalize(dir.join('/')), { recursive: true })
        writeFileSync(path.normalize(pathName), contents);
    }
}

/** Finds and replaces all instances of a search with replacement in template.
 * 
 * @param {string} search String to be replaced.
 * @param {string} replacement Replacement string.
 * @param {string} template String to be searched.
 * @returns {string} String with replacements made.
 */
export const replaceAllInTemplate = (search, replacement, template) => String(template).replace(new RegExp(search, 'g'), replacement);

/** Capitalizes all words in string.
 * 
 * @param {string} s string to be parsed.
 * @returns {string} All words in string capitalized.
*/
export const capitalize = s => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
