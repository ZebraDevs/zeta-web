import fs from 'fs';
import path from 'path';

const findDTSFiles = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const dtsFiles = [];
        if (stat.isDirectory()) {
            findDTSFiles(filePath);
        } else if (file.endsWith('.d.ts') && !file.endsWith('.styles.d.ts')) {
            dtsFiles.push(filePath);
        }
        return dtsFiles;
    });
}

const main = async () => {

    const directoryPath = path.join('dist/components');
    const dtsFiles = findDTSFiles(directoryPath);

    dtsFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf-8');
        const matches = content.match(/interface HTMLElementTagNameMap\s*{([^}]*)}/s);
        if (matches && matches[1]) {
            const extractedValues = matches[1]
                .split(';')
                .map(entry => entry.trim())
                .filter(entry => entry)[0];

            const [key, value] = extractedValues.split(':').map(part => part.trim());

            const relativePath = path.relative(path.dirname(file), path.join(directoryPath, '../jsx.js')).replace(/\\/g, '/');
            const reactDec = `import { ${value}Props, BaseProps, BaseEvents } from "${relativePath}";
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      ${key}: ${value}Props & BaseProps & BaseEvents;
    }
  }
}`;
            console.log('Adding to file:', file);
            fs.appendFileSync(file, reactDec);
        } else {
            console.log(`No matches found in ${file}`);
        }
    });
}


main();






