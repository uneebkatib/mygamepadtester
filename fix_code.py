import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix HTML entities inside JS expressions {}
    # This regex looks for { ... } and replaces entities inside
    def replace_entities_in_js(match):
        js_code = match.group(0)
        js_code = js_code.replace('&gt;', '>')
        js_code = js_code.replace('&lt;', '<')
        js_code = js_code.replace('&quot;', '"')
        js_code = js_code.replace('&apos;', "'")
        js_code = js_code.replace('&amp;', '&')
        return js_code

    new_content = re.sub(r'\{[^{}]*\}', replace_entities_in_js, content)
    
    # 2. Fix specific unclosed em tags if found
    if 'XboxOnePowerSupplyRepairGuide.jsx' in filepath:
        new_content = new_content.replace(
            'trip.)</li>',
            'trip.)</em></li>'
        ).replace(
            'culprit.)</li>',
            'culprit.)</em></li>'
        )

    # 3. Add eslint-disable to backup files to reduce noise
    if 'articles-backup' in filepath or 'guidesData_merged.jsx' in filepath or 'guidesData_backup.jsx' in filepath:
        if '/* eslint-disable */' not in new_content:
            new_content = '/* eslint-disable */\n' + new_content

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    src_dir = r"c:\Users\Administrator\Desktop\websites\New folder\gpad-tester-main\gpad-tester-main\nextjs-version\src"
    fixed_count = 0
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.jsx', '.js')):
                filepath = os.path.join(root, file)
                if fix_file(filepath):
                    print(f"Fixed: {filepath}")
                    fixed_count += 1
    print(f"Total files fixed: {fixed_count}")

if __name__ == "__main__":
    main()
