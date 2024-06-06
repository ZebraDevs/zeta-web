/* LICENSE
Copyright (c) 2020 A Beautiful Site, LLC
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
File source: https://github.com/shoelace-style/shoelace/blob/next/scripts/shared.js
*/
import fs from 'fs';
/** Gets an array of components from a CEM object. */
export function getAllComponents(onlyRegisteredComponents) {
    const metadata = JSON.parse(fs.readFileSync('./custom-elements.json'), 'utf8');
    const allComponents = [];
  
    metadata.modules.map(module => {
      module.declarations?.map(declaration => {
        if (declaration.customElement) {
          const component = declaration;
          const path = module.path;
  
          if (component) {
            allComponents.push(Object.assign(component, { path }));
          }
        }
      });
    });
    // console.log(`ℹ️ All Components: #:${allComponents.length}. -tagName:${allComponents.filter((a) => !!a.tagName).length}`);
    // console.log(`ℹ️ Components without tagname: ${allComponents.filter((a) => !a.tagName).reduce((acc, {name}) => {return `${acc}${name}, `}, '')}`);
    if(onlyRegisteredComponents === true) return allComponents.filter((a) => !!a.tagName);
    return allComponents;
  }