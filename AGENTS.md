# AI Developer Onboarding Guide (`agent.md`)

Welcome! This document outlines the architectural patterns, styling standards, and process guidelines for any AI agent or developer onboarding to this project. It is designed to get you up-to-speed immediately and ensure all contributions respect the design language, libraries, and system hygiene of this codebase.

---

## 📖 Project Context & Architecture

This repository is the personal developer portfolio for **Ahmed Nasser Mohammed**, a Full-Stack TypeScript & AI Systems Engineer. 

### Core Tech Stack
* **Framework**: React 19 (SPA Router using `react-router-dom`)
* **Build System**: Vite 6 + TypeScript 5
* **Styling**: Tailwind CSS (CDN-based configuration in `index.html`) + Vanilla CSS in `index.css`
* **Smooth Scrolling**: Lenis Scroll (coupled with `requestAnimationFrame` render loop)
* **Animations**: AOS (Animate On Scroll) library
* **WebGL**: Three.js for interactive particle backgrounds

---

## 🗺️ Codebase File Map

Use this map to navigate the repository layout:

* **[/](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/) (Root)**
  * [README.md](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/README.md): Project description, local development, and build/deploy steps.
  * [App.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/App.tsx): App router, initializes Lenis scroll and AOS animation system.
  * [constants.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/constants.tsx): Single source of truth for portfolio profile, timeline, skills, and projects data.
  * [types.ts](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/types.ts): TypeScript interfaces for data collections (`Profile`, `Experience`, `Project`, etc.).
  * [index.html](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/index.html): Entry HTML containing custom Tailwind theme configurations, external script loadings (AOS), custom font packages, and import maps.
  * [index.css](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/index.css): Core design styles (blueprint grid backgrounds, custom webkit scrollbars).
  * [vite.config.ts](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/vite.config.ts): Vite build configurations.
  * [vercel.json](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/vercel.json): Vercel SPA route rewrite rules.
* **[.agents/](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/)**
  * [skills/README.md](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/README.md): The Quick-Selection Matrix mapping the 20 available developer skills.
* **[components/](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/)**
  * [ThreeBackground.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/ThreeBackground.tsx): Interactive wireframe background particles utilizing Three.js.
  * [AboutPage.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/AboutPage.tsx): Detail view component for the Bio/Timeline.
  * [Hero.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/Hero.tsx), [Skills.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/Skills.tsx), [Projects.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/Projects.tsx), [Contact.tsx](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/components/Contact.tsx): Modular landing page section components.

---

## 🎨 Design System: Neobrutalist & Blueprint Style

The UI features a unique **Blueprint / Graph-Paper** styling. If you add or modify UI components, you must adhere strictly to these aesthetics:

1. **Background Grid**: The layout features a repeating 20px grid background pattern using the `.graph-paper` utility class defined in [index.css](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/index.css).
2. **Sharp Geometries**: Border radius settings must remain strictly square. In [index.html](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/index.html), Tailwind's `borderRadius` is locked to `0px` (`DEFAULT`, `sm`, `md`, `lg`, `xl`, `full` are `0px`). Do not use rounded corners.
3. **Hard Shadows**: Box shadows must be high-contrast and solid black. Use Tailwind configurations:
   * `shadow-hard` (`4px 4px 0px #171717`)
   * `shadow-hard-hover` (`6px 6px 0px #171717`)
4. **Font Pairing**:
   * **Monospace**: `IBM Plex Mono` (for numbers, telemetry data, labels, code styles).
   * **Sans-serif**: `IBM Plex Sans` (for standard paragraph layouts, lists, tags).
   * **Display Serif**: `Newsreader` (for major headers, hero tags, display title blocks).
5. **No Placeholders**: Never insert dummy pictures or generic Lorem Ipsum text. When generating graphics or mock interfaces, utilize the `generate_image` tool to create authentic UI assets.

---

## 🧠 Interactive Skills Integration

This project uses a modular developer skills directory located inside [.agents/skills/](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/).

Before writing code or running operations:
1. Review the [.agents/skills/README.md](file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/README.md) to locate the relevant guide for your task.
2. Study the target `SKILL.md` file for exact coding rules, best practices, and anti-patterns.
3. When you submit code, add a header comment linking back to the skill file used:
   ```typescript
   // Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/react-best-practices/SKILL.md
   ```

---

## ⚙️ Process & Resource Hygiene Protocol

To maintain host health, keep CPU/Memory utilization low, and prevent runaway background jobs, you must obey the following process-lifecycle guidelines:

1. **Process Registration**: Keep track of every background command shell, node/python process, dev server (`npm run dev`), or web socket connection you open during execution.
2. **Mandatory Termination**: Immediately kill all child processes and watcher services you spawned before completing your turn or ending a task.
3. **Force-Kill Compliance**: Natively terminate lingering processes.
   * **Windows (PowerShell)**: Natively execute `taskkill /F /T /PID <pid>` to completely tear down the process tree.
   * **Unix (Linux/macOS)**: Run `kill -9 -<pgid>` or `kill -9 <pid>` to clear the process group.
4. **Connection Audits**: Safely close active WebSockets, file watchers, database connections, and DevTools hooks before finishing.

---

## 🚀 Deployment & Verification

* **SPA Rewrites**: Do not remove `vercel.json` rewrite configs, as they ensure SPA subpaths (such as `/about`) are routed directly to `/index.html` on Vercel without throwing 404s.
* **Local Verification**: Verify build compatibility by executing `npm run build` and checking compilation statuses inside the console before concluding tasks.
