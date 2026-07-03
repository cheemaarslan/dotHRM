import re
import sys

file_path = r'e:\bitlogicx\hrms\dotHRM\resources\js\pages\settings\index.tsx'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the refs
    content = re.sub(r'\s*const [a-zA-Z]+SettingsRef = useRef<HTMLDivElement>\(null\);\n', '', content)

    # 2. Remove the useEffect
    content = re.sub(r'\s*// Smart scroll functionality\n\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\n', '', content)

    # 3. Update handleNavClick
    new_handle_click = """  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
  };
"""
    content = re.sub(r'  // Handle navigation click\n\s*const handleNavClick = \(href: string\) => \{[\s\S]*?\};\n', new_handle_click, content)

    # 4. Update the sections
    def replace_section(match):
        prefix = match.group(1)
        condition = match.group(2)
        section_tag = match.group(3)
        id_match = re.search(r'id="([^"]+)"', section_tag)
        if not id_match:
            return match.group(0)
        section_id = id_match.group(1)
        # Add the activeSection check
        if 'activeSection ===' not in condition:
            new_condition = f"activeSection === '{section_id}' && ({condition})"
        else:
            new_condition = condition
        return f"{prefix}{new_condition} && (\n            {section_tag}"

    # The sections look like:
    #           {(auth.permissions?.includes('manage-system-settings') || auth.user?.type === 'superadmin' || auth.user?.type === 'company') && (
    #             <section id="system-settings" ref={systemSettingsRef} className="mb-8">
    content = re.sub(r'(\s*)\{\((.*?)\)\s*&&\s*\(\n\s*(<section[^>]+>)', replace_section, content)

    # Also handle cases where condition is not wrapped in outer parenthesis if any:
    #           {auth.user?.type !== 'superadmin' && (auth.permissions?.includes('manage-working-days-settings') || auth.user?.type === 'company') && (
    def replace_section_no_paren(match):
        prefix = match.group(1)
        condition = match.group(2)
        section_tag = match.group(3)
        id_match = re.search(r'id="([^"]+)"', section_tag)
        if not id_match:
            return match.group(0)
        section_id = id_match.group(1)
        if 'activeSection ===' not in condition:
            new_condition = f"activeSection === '{section_id}' && {condition}"
        else:
            new_condition = condition
        return f"{prefix}{{{new_condition} && (\n            {section_tag}"

    content = re.sub(r'(\s*)\{(.*?)\s*&&\s*\(\n\s*(<section[^>]+>)', replace_section_no_paren, content)

    # Remove the ref props from sections
    content = re.sub(r'\s*ref=\{[a-zA-Z]+SettingsRef\}', '', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Success")
except Exception as e:
    print(f"Error: {e}")
