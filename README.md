# SulatSarap 📖

> **Where Every Story Feels Good.**

A Filipino-themed blog application built with React and TypeScript. SulatSarap lets users create posts, read stories, and engage through comments — all in a modern, responsive, purple-and-pink interface.

---

## Features

| # | Feature | Description |
|---|---|---|
| 1 | **Create a Post** | Write a post with a title and description. Validates empty inputs and clears the form after submission. |
| 2 | **View All Posts** | Browse all posts as beautiful blog cards showing title, description preview, and creation date. |
| 3 | **View Single Post** | Click any card to read the full post — title, full description, date, and total comment count. |
| 4 | **Add Comment** | Leave a comment on any post. Validates empty input and displays instantly after submission. |
| 5 | **Delete Comment** | Remove a comment with a confirmation dialog before permanently deleting. |

---

## Tech Stack

| Category | Technology |
|---|---|
| Language | TypeScript, CSS |
| Framework | React 18 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Font | Poppins (Google Fonts) |
| Build Tool | Vite |
| State Management | React Context API + useReducer |
| Data Storage | Browser localStorage |

> No backend. No database. No environment variables. Works entirely in the browser.

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                        # Root component — router + global provider
│   ├── context/
│   │   └── BlogContext.tsx            # Global state (posts & comments)
│   ├── components/
│   │   ├── BlogHeader.tsx             # Sticky navigation bar
│   │   ├── PostCard.tsx               # Blog card shown in the posts list
│   │   ├── PostForm.tsx               # Create post form with validation
│   │   ├── EmptyState.tsx             # Illustrated placeholder when no posts exist
│   │   ├── CommentSection.tsx         # Comment form, list, and delete modal
│   │   └── media/
│   │       └── ImageWithFallback.tsx  # Image component with error fallback
│   └── pages/
│       ├── HomePage.tsx               # Posts list + create form
│       └── PostDetailPage.tsx         # Single post view + comments
└── styles/
    ├── fonts.css                      # Google Fonts import (Poppins)
    ├── index.css                      # CSS entry point
    ├── tailwind.css                   # Tailwind v4 setup
    └── theme.css                      # Design tokens (colors, radius, spacing)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# 1. Clone or extract the project
cd sulatsarap-blog

# 2. Install dependencies
pnpm install
# or
npm install
```

### Run in Development

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
# or
npm run build
```

The production-ready files will be in the `dist/` folder. Open `dist/index.html` in any browser — no server required.

---

## Design System

| Token | Value |
|---|---|
| Primary Purple | `#7C3AED` |
| Primary Pink | `#EC4899` |
| Gradient | `linear-gradient(135deg, #7C3AED, #EC4899)` |
| Background | Soft purple-pink tint |
| Font | Poppins (400, 600, 700, 800) |
| Border Radius | `rounded-2xl` / `rounded-3xl` |

---

## Architecture Overview

```
Browser
  └── React SPA (Vite)
        ├── React Router     → client-side navigation between pages
        ├── BlogContext       → global state shared across all components
        │     └── useReducer → predictable state transitions
        ├── localStorage     → persists all data between page refreshes
        └── Tailwind CSS     → all styling, no UI kits used
```

**Data flow:**
1. On load → `BlogContext` reads from `localStorage` and hydrates state
2. User creates post → `PostForm` validates → dispatches `CREATE_POST` → state updates → `localStorage` saves
3. User clicks card → React Router navigates to `/post/:postId`
4. User adds comment → `CommentSection` validates → dispatches `ADD_COMMENT` → UI updates instantly
5. User deletes comment → confirmation modal → dispatches `DELETE_COMMENT` → UI updates instantly

---

## Notes

- All components are **100% hand-coded** — no UI kits, no shadcn/ui, no Material UI, no Ant Design, no pre-built templates.
- Data persists in `localStorage` — posts and comments survive page refreshes and browser restarts.
- Fully responsive — works on mobile, tablet, and desktop.

---

## Author

Built for the **AWS Builders UST Development Committee Exam**.

**Stack:** React · TypeScript · Tailwind CSS · React Router · localStorage
