
import { generateJsxTypes } from "custom-element-jsx-integration";

export const myPlugin = () => {
    // Write a custom plugin
    return {
        // Make sure to always give your plugins a name, this helps when debugging
        name: 'my-plugin',
        packageLinkPhase({ customElementsManifest, context }) {
            console.log('packageLinkPhase');
            // console.log(customElementsManifest.modules.find((m) => m.path.includes('button/button.ts')).declarations[0].attributes)
            const myCEM = customElementsManifest;

            myCEM.modules.forEach((module) => {
                module.declarations?.forEach((declaration) => {
                    // console.log('DECLARATION', declaration.name);
                    declaration.attributes?.forEach((attribute) => {
                        console.log('ATTRIBUTES', attribute.name)
                        if (attribute.name === 'change-type') {
                            attribute.name = 'type';
                            console.log('DOING THIS')
                        }
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
        },

    }
}
