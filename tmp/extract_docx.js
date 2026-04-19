const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const docxPath = 'C:\\Users\\Administrator\\Desktop\\websites\\New folder\\gpad-tester-main\\gpad-tester-main\\guides\\guide prompt.docx';
const tempDir = path.join(process.env.TEMP, 'docx_extract_' + Date.now());

try {
    fs.mkdirSync(tempDir, { recursive: true });
    const zipPath = path.join(tempDir, 'temp.zip');
    fs.copyFileSync(docxPath, zipPath);
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force"`);
    
    const xmlPath = path.join(tempDir, 'word', 'document.xml');
    if (fs.existsSync(xmlPath)) {
        const content = fs.readFileSync(xmlPath, 'utf8');
        // Simple regex to extract text from XML tags <w:t>
        const matches = content.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (matches) {
            const text = matches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
            console.log("EXTRACTED TEXT:\n");
            console.log(text);
        } else {
            console.log("No text found in XML.");
        }
    } else {
        console.log("document.xml not found in the unzipped folder.");
    }
} catch (err) {
    console.error("Error extracting docx:", err.message);
} finally {
    // Cleanup
    try {
        // fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {}
}
