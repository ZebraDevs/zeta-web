import { write, log, replaceAllInTemplate, capitalize } from './utils.js';
import { readFileSync, existsSync } from 'fs';


const buildFile = (nameLower, nameCap, outDir, template, type) => {
    if (existsSync(path.normalize(outDir))) {
        log('⚔️ --- ' + nameCap + ' ' + type + ' already exists')
    } else {
        let populatedTemplate = template;
        populatedTemplate = replaceAllInTemplate('_replacelower_', nameLower, populatedTemplate)
        populatedTemplate = replaceAllInTemplate('_replacecap_', nameCap, populatedTemplate)
        write(outDir, populatedTemplate);
        log(' --- Zeta' + nameCap + ' ' + type + ' created\n')
    }
}

const main = () => {

    const nameArr = process.argv.slice(2).filter(x => x)
    let nameLower, dirName = null;
    nameLower = nameArr[0].toLowerCase();
    if (nameArr.length == 1) {
        // dir and file same name
        dirName = nameLower;
    } else if (nameArr.length == 2) {
        // dir and file differnet names
        dirName = nameArr[1];
    } else {
        log('❎ --- No name entered')
    }

    if (dirName) {
        const outDir = '../src/components/' + dirName + '/' + nameLower
        const nameCap = nameLower.split('-').map(x => capitalize(x))

        buildFile(nameLower, nameCap, outDir + '.ts', readFileSync(path.normalize('./assets/web.template')), 'Component')
        buildFile(nameLower, nameCap, outDir + '.styles.ts', readFileSync(path.normalize('./assets/web.styles.template')), 'Style')
        buildFile(nameLower, nameCap, outDir + '.stories.ts', readFileSync(path.normalize('./assets/web.stories.template')), 'Story')
        //TODO: Add to index
    }
}

main();