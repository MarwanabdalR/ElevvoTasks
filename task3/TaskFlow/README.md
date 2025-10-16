# Task Flow

A simple, responsive task manager built with React, Vite, and Tailwind CSS v4. Tasks are stored locally in your browser, with search, add, and delete functionality.

Live demo: [`taskflow-lime-eight.vercel.app`](https://taskflow-lime-eight.vercel.app/)

## Features

- Search tasks in real time
- Add new tasks (press Enter or click Submit)
- Delete tasks
- Tasks persist in `localStorage`
- Responsive UI (mobile → desktop)
- Feature highlights, testimonials, and pricing sections
- Footer with contact links and social icons

## Tech stack

- React (Vite)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- LocalStorage for persistence

## Getting started

Prerequisites:

- Node.js 18+

Install and run (from `task3/TaskFlow` directory):

```bash
npm i
npm i -D tailwindcss @tailwindcss/vite
npm run dev
```

Then open the local URL printed by Vite.

## Project scripts

```bash
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview local production build
```

## Project structure

```
TaskFlow/
  ├─ index.html
  ├─ vite.config.js
  ├─ src/
  │  ├─ main.jsx           # entry
  │  ├─ App.jsx            # UI + app logic
  │  └─ index.css          # Tailwind import + custom styles
  └─ README.md
```

## Tailwind setup (v4)

Tailwind v4 is enabled through the Vite plugin and a single CSS import.

- `vite.config.js`:

```js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- `src/index.css`:

```css
@import "tailwindcss";
/* Your custom styles below */
```

No `tailwind.config.js` is required unless you want custom themes or advanced configuration.

## App logic

- State: `tasks`, `searchQuery`, `newTaskTitle`
- Load/save: `localStorage` key `taskflow:tasks`
- Add task: button or Enter key
- Delete task: trash button per item
- Filtered list derived from `searchQuery`

## Deploy

You can deploy the `dist/` build to any static host. This project’s live version is on Vercel: [`taskflow-lime-eight.vercel.app`](https://taskflow-lime-eight.vercel.app/).

```bash
npm run build
# upload dist/ to your host or push to Vercel/Netlify/GitHub Pages
```

## License

MIT
