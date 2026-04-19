const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'src/components/Guides/articles');

function fixH2Tags(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  // Replace all </h1> that should be </h2>
  // Pattern: <h2>...</h1> should be <h2>...</h2>
  content = content.replace(/(<h2[^>]*>.*?)(<\/h1>)/gs, '$1</h2>');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${path.relative(__dirname, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.jsx')) {
      fixH2Tags(fullPath);
    }
  });
}

console.log('Fixing h2 closing tags in all guide articles...\n');
walkDir(articlesDir);
console.log('\n✅ Done!');
