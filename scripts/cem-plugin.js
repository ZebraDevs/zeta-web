
import { generateJsxTypes } from "custom-element-jsx-integration";
import * as fs from "fs"; import * as path from "path";

export const JSXPluginWrapped = () => ({
    name: 'jsx-plugin-wrapped',
    packageLinkPhase({ customElementsManifest, context }) {
        const myCEM = customElementsManifest;
        myCEM.modules.forEach((module) => {
            module.declarations?.forEach((declaration) => {
                ['attributes', 'members'].forEach((key) => {
                    declaration[key]?.forEach((item) => {
                        if (item['change-type']) {
                            item.type = item['change-type'];
                        }
                    });
                });
            });
        });
        generateJsxTypes(myCEM, {
            outdir: "dist",
            fileName: "jsx.d.ts",
            globalEvents: `
/** Triggered when the element is clicked by the user by mouse or keyboard. */
onClick?: (event: MouseEvent) => void;
/** Fired when a key is pressed down. */
onKeyDown?: (event: KeyboardEvent) => void;
/** Fired when a key is released.. */
onKeyUp?: (event: KeyboardEvent) => void;
/** Fired when a key is pressed down. */
onKeyPressed?: (event: KeyboardEvent) => void;
/** Fired when the element receives focus, often triggered by tab navigation. */
onFocus?: (event: FocusEvent) => void;
/** Fired when the element loses focus. */
onBlur?: (event: FocusEvent) => void;
`,
        });
        const filePath = path.join("dist", "jsx.d.ts");
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(filePath, 'import { type ZetaIconName } from "@zebra-fed/zeta-icons"' + content, 'utf8');
        }
    },
})
