// scripts/extend-component-props.ts
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'; // Added import

/**
 * Converts a kebab-case component name to PascalCase.
 * Example: "select-input" -> "SelectInput"
 */
function capitalizeComponentName(name: string): string {
    return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

/**
 * Escapes special characters for use in a regular expression.
 */
function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\\\]\\\\]/g, '\\\\$&'); // $& means the whole matched string
}

/**
 * Updates the component's .d.ts file to extend its JSX props with InputHTMLAttributes.
 */
function updateComponentDefinition(componentName: string, workspaceRoot: string): void {
    const componentKebabCase = componentName; // e.g., select-input
    const componentPascalCase = capitalizeComponentName(componentName); // e.g., SelectInput

    const filePath = path.join(workspaceRoot, 'dist', 'components', componentKebabCase, `${componentKebabCase}.d.ts`);

    if (!fs.existsSync(filePath)) {
        console.warn(`[WARN] File not found: ${filePath}. Skipping ${componentPascalCase}.`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Commented out section for adding import statement
    /*
    // 1. Ensure InputHTMLAttributes is imported from 'react'
    const reactImportType = "InputHTMLAttributes";
    const reactPackage = "react";
    const desiredImportStatement = `import type { ${reactImportType} } from '${reactPackage}';`;

    const importExistsRegex = new RegExp(`import\\s+(type\\s+)?\\{[^}]*${reactImportType}[^}]*\\}\\s+from\\s+['"]${reactPackage}['"];`);

    if (!importExistsRegex.test(content)) {
        const lines = content.split('\n');
        let lastImportLineIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                lastImportLineIndex = i;
            }
        }

        if (lastImportLineIndex !== -1) {
            lines.splice(lastImportLineIndex + 1, 0, desiredImportStatement);
        } else {
            let insertIndex = 0;
            for (let i = 0; i < lines.length; i++) {
                const trimmedLine = lines[i].trim();
                if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine === '') {
                    insertIndex = i + 1;
                } else {
                    break;
                }
            }
            lines.splice(insertIndex, 0, desiredImportStatement);
        }
        content = lines.join('\n');
        changed = true;
        console.log(`[INFO] Added import for ${reactImportType} from ${reactPackage} to ${filePath}`);
    }
    */

    // 2. Extend the props in JSX.IntrinsicElements
    // Example target: "zeta-select-input": Partial<ZetaSelectInputProps&BaseProps&BaseEvents>
    // Becomes: "zeta-select-input": Partial<ZetaSelectInputProps&BaseProps&BaseEvents>&Partial<InputHTMLAttributes<ZetaSelectInputProps>>
    
    const propsTypeName = `Zeta${componentPascalCase}Props`;
    const typeToExtend = `${propsTypeName}&BaseProps&BaseEvents`; // This is what's inside Partial<>
    const extensionToAdd = `&Partial<InputHTMLAttributes<${propsTypeName}>>`; // Changed this line

    const escapedTypeToExtend = escapeRegExp(typeToExtend);
    const escapedPropsTypeNameForRegex = escapeRegExp(propsTypeName); // For the negative lookahead

    // Regex captures:
    // Group 1: The prefix, e.g., "zeta-select-input": 
    // Group 2: The Partial<...> block itself
    // Negative lookahead: Ensures we don't add the extension if it's already there in the new format.
    const jsxIntrinsicElementRegex = new RegExp(
        `("zeta-${componentKebabCase}"\\s*:\\s*)` + // Group 1: Line prefix
        `(Partial<${escapedTypeToExtend}>)` +          // Group 2: The base Partial<...>
        `(?!\\s*&\\s*Partial<InputHTMLAttributes<${escapedPropsTypeNameForRegex}>>)`, // Changed negative lookahead
        'g'
    );
    
    let replacementMadeInJsx = false;
    const newContent = content.replace(jsxIntrinsicElementRegex, (match, linePrefix, basePartial) => {
        replacementMadeInJsx = true;
        return `${linePrefix}${basePartial}${extensionToAdd}`;
    });

    if (replacementMadeInJsx) {
        content = newContent;
        changed = true;
        console.log(`[INFO] Extended props for ${componentPascalCase} in JSX.IntrinsicElements in ${filePath} to include ${extensionToAdd}`);
    } else {
        // Check if the pattern was found but already included the extension, or if the base pattern wasn't found.
        const basePatternString = `("zeta-${componentKebabCase}"\\s*:\\s*)(Partial<${escapedTypeToExtend}>)`;
        const alreadyExtendedPatternString = `${basePatternString}\\s*&\\s*Partial<InputHTMLAttributes<${escapedPropsTypeNameForRegex}>>`; // Changed this line

        const basePatternForCheck = new RegExp(basePatternString);
        const alreadyExtendedPatternForCheck = new RegExp(alreadyExtendedPatternString);

        if (alreadyExtendedPatternForCheck.test(content)) {
            console.log(`[INFO] Props for ${componentPascalCase} in ${filePath} are already correctly extended with ${extensionToAdd}.`);
        } else if (basePatternForCheck.test(content)) {
            console.warn(`[WARN] Found base pattern for ${componentPascalCase} in ${filePath} but did not extend it. The structure might differ slightly or the negative lookahead in the regex needs adjustment.`);
            console.warn(`       Base pattern looked for: "zeta-${componentKebabCase}": Partial<${typeToExtend}>`);
            console.warn(`       Expected to add: ${extensionToAdd}`);
        } else {
            console.warn(`[WARN] Could not find the expected JSX IntrinsicElements definition for ${componentPascalCase} to extend in ${filePath}.`);
            console.warn(`       Looked for pattern starting with: "zeta-${componentKebabCase}": Partial<${typeToExtend}`);
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[SUCCESS] Successfully updated ${filePath}`);
    } else {
        console.log(`[INFO] No changes needed for ${filePath} regarding ${componentPascalCase}.`);
    }
}

function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Usage: ts-node scripts/extend-component-props.ts <component-name-1> [component-name-2] ...');
        console.error('Example: ts-node scripts/extend-component-props.ts select-input text-input');
        process.exit(1);
    }

    // Assuming the script is in <workspaceRoot>/scripts/
    const __filename = fileURLToPath(import.meta.url); // Added line
    const __dirname = path.dirname(__filename); // Added line
    const workspaceRoot = path.resolve(__dirname, '..'); 

    args.forEach(componentName => {
        console.log(`\nProcessing component: ${componentName}`);
        try {
            updateComponentDefinition(componentName, workspaceRoot);
        } catch (error) {
            console.error(`[ERROR] Failed to process component ${componentName}:`, error);
        }
    });

    console.log('\nScript finished.');
}

main();
