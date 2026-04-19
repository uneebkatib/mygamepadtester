const fs = require('fs');
const filePath = 'c:/Users/Administrator/Desktop/websites/New folder/gpad-tester-main/gpad-tester-main/nextjs-version/src/components/AxesSVG/AxesSVG.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Line numbers from view_file are 1-indexed. Array is 0-indexed.
// Line 257 -> index 256
// Line 259 -> index 258
// Line 262 -> index 261

if (lines[256] && lines[256].includes('Clear Paths')) {
    lines[256] = '        <Btn onClick={clearPaths}>🗑️ Clear Paths (P)</Btn>';
}
if (lines[258] && lines[258].includes('Perfect Circle')) {
    lines[258] = "          {showPerfectCircle ? '✓' : '⭕'} Perfect Circle";
}
if (lines[261] && lines[261].includes('Deadzone')) {
    lines[261] = "          {showDeadzone ? '✓' : '⭕'} Deadzone";
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('AxesSVG.jsx fixed.');
