import os
import re

def fix_metadata_conflict(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if 'export async function generateMetadata' in content and 'export const metadata' in content:
        print(f"Fixing metadata conflict in {filepath}")
        
        # Remove generateMetadata function
        # This regex matches the function from 'export async function generateMetadata' to the closing '}'
        # It assumes the function ends with a '}' on a new line or followed by other exports
        content = re.sub(r'export\s+async\s+function\s+generateMetadata.*?\}\s*(?=export|import|$)', '', content, flags=re.DOTALL)
        
        # Also remove 'import en from "@/locales/en.json";' if it becomes unused
        if 'import en from "@/locales/en.json";' in content or "import en from '@/locales/en.json';" in content:
            # Check if 'en' is used anywhere else in the file
            # We use a simple regex check for 'en' as a word, but exclude the import line itself
            remaining_content = re.sub(r'import\s+en\s+from\s+["\']@/locales/en\.json["\'];?\n?', '', content)
            if not re.search(r'\ben\b', remaining_content):
                content = remaining_content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def walk_and_fix(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file == 'page.jsx' or file == 'page.js':
                fix_metadata_conflict(os.path.join(root, file))

if __name__ == "__main__":
    app_dir = r"c:\Users\Administrator\Desktop\websites\New folder\gpad-tester-main\gpad-tester-main\nextjs-version\src\app"
    walk_and_fix(app_dir)
