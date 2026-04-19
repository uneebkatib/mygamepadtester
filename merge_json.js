const fs = require('fs');

let merged = fs.readFileSync('src/components/Guides/guidesData_merged.jsx', 'utf-8');
const backup = fs.readFileSync('src/components/Guides/guidesData_backup.jsx', 'utf-8');

// Extract the "controller-testing" block from backup
const ctestMatch = backup.match(/"controller-testing":\s*{[\s\S]*?},\n\s*"sony"/);
if (ctestMatch) {
    let ctestStr = ctestMatch[0].replace(/,\n\s*"sony"$/, ',');
    // Insert "controller-testing" into merged guidesData
    merged = merged.replace(/export const guidesData = {/, 'export const guidesData = {\n' + ctestStr);
}

// For PS5 HDMI replacement, replace the inline one with <PS5_HDMI_Replacement />
merged = merged.replace(/content: <PS5HdmiReplacementGuide \/>/g, 'content: <PS5_HDMI_Replacement />');

// For Switch Teardown
merged = merged.replace(/content: <SwitchTeardownGuide \/>/g, 'content: <Nintendo_Switch_teardown />');

fs.writeFileSync('src/components/Guides/guidesData.jsx', merged);
console.log("Merged keys successfully!");
