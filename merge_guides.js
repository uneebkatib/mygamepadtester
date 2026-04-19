const fs = require('fs');

const oldContent = fs.readFileSync('src/components/Guides/guidesData.jsx', 'utf-8');
const backupContent = fs.readFileSync('src/components/Guides/guidesData_backup.jsx', 'utf-8');

// 1. Get all the imports from backup
const backupImports = backupContent.match(/^import .*$/gm) || [];
// 2. Get the body of backup up to export const guidesData
const backupBodyMatch = backupContent.match(/^(?:import.*?\n)+(.*?)export const guidesData/s);
const backupBody = backupBodyMatch ? backupBodyMatch[1] : '';

// 3. Get the export const guidesData of backup
const backupExportMatch = backupContent.match(/export const guidesData = ({[\s\S]*});$/s);
let backupExportStr = backupExportMatch ? backupExportMatch[1] : null;

// The backup export string can be executed as a JS object since it's just an object, but wait! It has JSX like <XboxOneFatHdmiReplacementGuide /> which is invalid pure JS! We can't eval it easily.

// Let's do simple text modifications:
let newContent = oldContent;

// A. Update imports
const reactImport = 'import React from "react";';
let missingImports = backupImports.filter(imp => !newContent.includes(imp) && imp !== reactImport).join('\n');
if (missingImports) {
    newContent = newContent.replace(reactImport, reactImport + '\n' + missingImports);
}

// B. Replace or add components
// We will find all const NAME = () => ( or unction NAME in backupBody
const compRegex = /(?:const|function)\s+([A-Za-z0-9_]+)\s*(?:=\s*\(\)\s*=>\s*\(|\()/g;
let match;
const comps = [];
while ((match = compRegex.exec(backupBody)) !== null) {
    comps.push(match[1]);
}

console.log("Components found in backup:", comps);

// Actually, instead of parsing, why not just inject the entire backupBody right before export const guidesData?
// We can just rename the old components in the old string so they are 'overwritten' by JS variable shadowing or just remove old ones.
// In JS, you can't have duplicate const. So we MUST remove old ones.

for (let name of comps) {
    // Regex to remove old component definition:
    // It's either const name = () => ( or const name = () => { ...
    // It's very hard to parse the end. We can leave oldContent as is, but change const name = to // const name = 
    // Wait, commenting out doesn't work if it spans lines. We can replace const name = with const _old_name =.
    const oldRegex = new RegExp('const ' + name + '\\s*=', 'g');
    newContent = newContent.replace(oldRegex, 'const _old_' + name + ' =');
}

// Insert the new definitions right before export const guidesData
newContent = newContent.replace('export const guidesData', backupBody + '\n\nexport const guidesData');

// C. Now merge the export object
// The user says they changed SOME guides. 
// Old routing keys: "hardware-calibration", "stick-drift", etc.
// Backup routing keys: "controller-testing", "sony", "nintendo", "microsoft".
// Let's manually replace the keys in the giant object string if we know them.

// For now let's just write the modified content back but not change the export object yet to see if it parses.
fs.writeFileSync('src/components/Guides/guidesData_merged.jsx', newContent);
console.log("Merged components.");
