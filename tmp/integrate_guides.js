const fs = require('fs');
const path = require('path');

const guidesDir = 'C:\\Users\\Administrator\\Desktop\\websites\\New folder\\gpad-tester-main\\gpad-tester-main\\guides';
const outputDir = 'c:\\Users\\Administrator\\Desktop\\websites\\New folder\\gpad-tester-main\\gpad-tester-main\\nextjs-version\\src\\components\\Guides\\articles';

const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(guidesDir, file), 'utf8');
    
    // Extract Deliverable 2 (Article)
    let article = "";
    const articleMatch = content.match(/# DELIVERABLE 2: Complete Article([\s\S]*?)# DELIVERABLE 3:/i);
    if (articleMatch) {
        article = articleMatch[1].trim();
        article = article.replace(/^---/, '').trim();
    } else {
        // Fallback: take content from beginning up to DELIVERABLE 3 or end
        const endMatch = content.match(/# DELIVERABLE 3:/i);
        if (endMatch) {
            article = content.substring(0, endMatch.index).trim();
        } else {
            article = content.trim();
        }
    }

    // Convert Markdown to JSX
    // This is a simple conversion. For complex MD, we'd need a library, but I can do it manually for this structure.
    
    let name = file.replace('-guide.md', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    if (!name.endsWith('Guide')) name += 'Guide';

    // Determine category based on filename
    let category = "Technical";
    if (file.includes("xbox")) category = "Microsoft";
    
    const stylePath = category === "Technical" ? "../ArticleStyles" : "../ArticleStyles"; 
    const convertedContent = convertMdToJsx(article);
    const className = name;

    const jsxContent = `
'use client'
import React from "react";
import { StyledArticleWrapper } from "${stylePath}";
import Link from "next/link";

export const ${className} = () => (
  <StyledArticleWrapper>
    ${convertedContent}
  </StyledArticleWrapper>
);
`;

    const subFolder = file.startsWith('xbox') ? 'Microsoft' : 'Technical';
    const targetPath = path.join(outputDir, subFolder, `${name}.jsx`);
    
    if (!fs.existsSync(path.dirname(targetPath))) fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, jsxContent);
    console.log(`Integrated: ${name}`);
});

function convertMdToJsx(md) {
    let jsx = md
        .replace(/# (.*)/g, '<h1>$1</h1>')
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/_([^_]+)_/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<Link href="$2">$1</Link>')
        .replace(/---/g, '<hr />')
        .replace(/(!\[.*\]\((.*)\))/g, '{/* Image placeholder for $2 */}')
        .split('\n')
        .map(line => {
            line = line.trim();
            if (!line) return '';
            
            // Escape special characters for JSX
            // Only if it's not a tag
            if (!line.startsWith('<')) {
                line = line.replace(/&/g, '&amp;').replace(/>/g, '&gt;');
            } else {
                // If it is a tag, we might have text inside it like <p>Settings > System</p>
                // This is harder. Let's do a simple replace on the inner text.
                line = line.replace(/([^<>]*)?(>|&)([^<>]*)/g, (match, p1, p2, p3) => {
                   if (p2 === '>') return `${p1 || ''}&gt;${p3 || ''}`;
                   if (p2 === '&') return `${p1 || ''}&amp;${p3 || ''}`;
                   return match;
                });
            }

            // Check for headings first to prevent p-wrapping
            if (line.match(/^<h[1-6]|^<hr/)) return line;
            
            // List items
            if (line.match(/^[0-9]+\./)) {
                return `<li>${line.replace(/^[0-9]+\. /, '')}</li>`;
            }
            if (line.startsWith('- ')) {
                return `<li>${line.replace(/^- /, '')}</li>`;
            }
            if (line.startsWith('* ')) {
                return `<li>${line.replace(/^\* /, '')}</li>`;
            }

            // If it's pure JSX already, leave it
            if (line.startsWith('<') && line.endsWith('>')) return line;
            
            return `<p>${line}</p>`;
        })
        .join('\n');
    
    // Wrap lists
    jsx = jsx.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>\n${match}</ul>\n`);
    
    return jsx;
}
