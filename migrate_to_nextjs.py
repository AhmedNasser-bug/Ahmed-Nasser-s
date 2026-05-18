import os
import shutil
import re

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def read_file(path):
    if not os.path.exists(path):
        return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def html_style_to_react(style_str):
    styles = []
    # Ignore empty styles
    if not style_str.strip():
        return "{{}}"
        
    for rule in style_str.split(';'):
        rule = rule.strip()
        if not rule: 
            continue
        parts = rule.split(':', 1)
        if len(parts) == 2:
            key, val = parts
            key = key.strip()
            # Convert kebab-case to camelCase
            key = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), key)
            val = val.strip().replace('"', "'")
            styles.append(f'{key}: "{val}"')
    return "{{ " + ", ".join(styles) + " }}"

def style_replacer(match):
    return 'style=' + html_style_to_react(match.group(1))

def html_to_jsx(html):
    # Remove DOCTYPE, html, head, body tags to just extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, flags=re.DOTALL | re.IGNORECASE)
    if body_match:
        html = body_match.group(1)
    
    # Replace comments
    html = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html, flags=re.DOTALL)
    
    # Standard HTML to JSX keyword swaps
    html = html.replace('class="', 'className="')
    html = html.replace('for="', 'htmlFor="')
    html = html.replace('stroke-width="', 'strokeWidth="')
    html = html.replace('stroke-linecap="', 'strokeLinecap="')
    html = html.replace('stroke-linejoin="', 'strokeLinejoin="')
    html = html.replace('autoplay', 'autoPlay')
    html = html.replace('playsinline', 'playsInline')
    html = html.replace('viewBox="', 'viewBox="')
    
    # Self close void elements
    void_elements = ['img', 'br', 'hr', 'input', 'meta', 'link', 'source']
    for tag in void_elements:
        html = re.sub(rf'<{tag}([^>]*?)(?<!/)>', rf'<{tag}\1 />', html, flags=re.IGNORECASE)

    # Convert inline styles
    html = re.sub(r'style="([^"]*)"', style_replacer, html)
    
    # Fix script tags to Next.js Script (assuming we are not moving local logic to useEffects yet)
    # We will remove <script src="..."></script> from body since we'll put them in layout or manually handle them.
    # It's better to preserve them but change class/src appropriately, or let users handle them.
    
    return html.strip()

def main():
    target_dir = "nextjs-portfolio"
    
    print("🚀 Initializing migration to Next.js...")
    os.makedirs(target_dir, exist_ok=True)
    
    # 1. Structure Definitions
    package_json = """{
  "name": "ahmed-nasser-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.5"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.5"
  }
}"""

    tsconfig_json = """{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}"""

    next_config = """/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
"""

    layout_tsx = """import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Ahmed Naser | Full-Stack .NET Developer",
  description: "Portfolio of Ahmed Naser, Technical Consultant & AI Systems Orchestrator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="stylesheet" href="/blueprint.css" />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/animations.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}"""

    # Create root configurations
    create_file(os.path.join(target_dir, 'package.json'), package_json)
    create_file(os.path.join(target_dir, 'tsconfig.json'), tsconfig_json)
    create_file(os.path.join(target_dir, 'next.config.mjs'), next_config)
    create_file(os.path.join(target_dir, 'app', 'layout.tsx'), layout_tsx)

    # Copy raw assets
    print("📦 Copying CSS and Javascript libraries...")
    os.makedirs(os.path.join(target_dir, 'public'), exist_ok=True)
    
    def copy_if_exists(src, dest):
        if os.path.exists(src):
            shutil.copy2(src, dest)
            
    copy_if_exists('blueprint.css', os.path.join(target_dir, 'public', 'blueprint.css'))
    copy_if_exists('animations.js', os.path.join(target_dir, 'public', 'animations.js'))
    copy_if_exists('about.js', os.path.join(target_dir, 'public', 'about.js'))
    copy_if_exists('hero.jpeg', os.path.join(target_dir, 'public', 'hero.jpeg'))
    copy_if_exists('Portfolio Inspo.jpeg', os.path.join(target_dir, 'public', 'Portfolio Inspo.jpeg'))
    
    # App styling
    if os.path.exists('style.css'):
        shutil.copy2('style.css', os.path.join(target_dir, 'app', 'globals.css'))
    else:
        create_file(os.path.join(target_dir, 'app', 'globals.css'), "")

    # Convert Routes
    print("🔄 transpiling index.html -> app/page.tsx")
    index_jsx = html_to_jsx(read_file('index.html'))
    page_tsx = f"""export default function Home() {{\n  return (\n    <>\n{index_jsx}\n    </>\n  );\n}}"""
    create_file(os.path.join(target_dir, 'app', 'page.tsx'), page_tsx)

    print("🔄 transpiling about.html -> app/about/page.tsx")
    about_jsx = html_to_jsx(read_file('about.html'))
    # about.html specifically needs its specific script! NextJs doesn't need to double-load layout scripts, but let's just make it run.
    about_tsx = f"""import Script from 'next/script';\n\nexport default function About() {{\n  return (\n    <>\n{about_jsx}\n      <Script src="/about.js" strategy="lazyOnload" />\n    </>\n  );\n}}"""
    create_file(os.path.join(target_dir, 'app', 'about', 'page.tsx'), about_tsx)

    print("✅ Migration completed successfully! The Next.js project is ready in the 'nextjs-portfolio' directory.")
    print("👉 To run the project, execute the following commands:")
    print("      cd nextjs-portfolio")
    print("      npm install")
    print("      npm run dev")

if __name__ == "__main__":
    main()
