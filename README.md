# Ahmed Nasser | Full-Stack TypeScript Engineer Portfolio

A premium, interactive developer portfolio demonstrating full-stack engineering expertise, systems-level optimization philosophy, and advanced AI-augmented systems orchestration.

Designed using a clean **Neobrutalist / Blueprint Design System** with a custom graph-paper grid pattern, hard shadows, and high contrast accents.

## 🚀 Tech Stack & Core Libraries

- **Core**: [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS CDN](https://tailwindcss.com/) with a custom theme and layout configuration defined in `index.html`
- **Animations**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) for micro-animations and entrance transitions
- **Scroller**: [Lenis Scroll](https://lenis.darkroom.engineering/) for inertia-based smooth scrolling
- **WebGL**: [Three.js](https://threejs.org/) for a dynamic wireframe background particle/geometry system

---

## 🛠️ Local Development Setup

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will run locally at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Vite will compile the code and assets into the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ☁️ Vercel Deployment Configuration

This project is fully configured for hosting on [Vercel](https://vercel.com).

- **Framework Preset**: Vite
- **Root Directory**: `./` (workspace root)
- **Build Command**: `vite build` (or `npm run build`)
- **Output Directory**: `dist`

### Single Page Application (SPA) Routing
A `vercel.json` file is defined at the root to rewrite all requests back to `/index.html`:
```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures direct subpath routing (like visiting `/about` directly) resolves correctly without Vercel returning a `404 Not Found` error.

---

## 📄 Git Configurations

- **`.gitignore`**: Ignores `node_modules`, `dist/` builds, local environment variables (`.env.*`), local Vercel CLI folders (`.vercel/`), and AI/IDE cache folders (`.Jules/`, `.qodo/`, `.vscode/`).
- **`.gitattributes`**: Configured to normalize all checkouts to LF line endings (`eol=lf`) for build environment cross-platform consistency.
