#!/usr/bin/env python3
"""
Add search bar to all topic pages
"""

import os
import re
from pathlib import Path

TOPICS_DIR = Path(__file__).parent / 'topics'

# List of topic files
TOPIC_FILES = [
    'a1-communication.html',
    'a2-hydration-nutrition.html',
    'a3-response.html',
    'b1-generating-movement.html',
    'b2-forces-motion.html',
    'b3-injury.html',
    'c1-individual-differences.html',
    'c2-motor-learning.html',
    'c3-motivation.html',
    'c4-stress-coping.html',
    'c5-psychological-skills.html'
]

# Search bar HTML to insert into sticky header
SEARCH_BAR_HTML = '''        <div class="search-container header-search-container">
            <span class="search-icon">🔍</span>
            <input 
                type="text" 
                id="search-input" 
                class="search-input" 
                placeholder="Search concepts (e.g., Newton's laws, ATP etc.)"
                autocomplete="off"
            >
            <div id="search-dropdown" class="search-dropdown"></div>
        </div>
'''

# Script tags to add before </body>
SCRIPT_TAGS = '''    
    <script src="../search.js"></script>
    <script>
        // Initialize search for topic page
        initSearch('topic');
    </script>
'''

def add_search_to_file(file_path):
    """Add search bar and scripts to a topic file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # 1. Add Fuse.js CDN to head if not present
    if 'fuse.js' not in content:
        # Find the </head> tag and add script before it
        content = content.replace(
            '</head>',
            '    <script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0"></script>\n</head>'
        )
        modified = True
        print(f"  + Added Fuse.js CDN")
    
    # 2. Add search bar to sticky header if not present
    if 'search-container' not in content:
        # Find the sticky header and add search bar before closing </div>
        # Pattern: find sticky-topic-header div and add search before its closing tag
        pattern = r'(<div class="sticky-topic-header">.*?<span class="header-topic-title">.*?</span>)\s*(</div>)'
        
        def replacer(match):
            return match.group(1) + '\n' + SEARCH_BAR_HTML + '    ' + match.group(2)
        
        new_content = re.sub(pattern, replacer, content, flags=re.DOTALL, count=1)
        if new_content != content:
            content = new_content
            modified = True
            print(f"  + Added search bar to sticky header")
    
    # 3. Add search scripts before </body> if not present
    if 'search.js' not in content:
        content = content.replace('</body>', SCRIPT_TAGS + '</body>')
        modified = True
        print(f"  + Added search.js scripts")
    
    # Write back if modified
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Main function"""
    print("Adding search bars to topic pages...\n")
    
    updated_count = 0
    
    for filename in TOPIC_FILES:
        file_path = TOPICS_DIR / filename
        if file_path.exists():
            print(f"Processing {filename}...")
            if add_search_to_file(file_path):
                updated_count += 1
                print(f"  ✓ Updated {filename}")
            else:
                print(f"  - Already has search bar")
        else:
            print(f"  ! File not found: {filename}")
    
    print(f"\n✓ Updated {updated_count} topic page(s)")

if __name__ == '__main__':
    main()
