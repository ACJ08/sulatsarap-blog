# SulatSarap – Project Guidelines

## Project overview
A Filipino-themed blog application built with React, TypeScript, React Router, and Tailwind CSS.
All components are hand-coded from scratch. No UI kits or component libraries are used.

---

## General rules
- Never use shadcn/ui, Radix UI, Material UI, Chakra UI, Ant Design, or any pre-built component library.
- Never use pre-made headers, footers, or template layouts.
- All components must be original, hand-coded, and custom-designed.
- Use Tailwind CSS for all styling. Avoid inline styles unless absolutely necessary.
- Use Poppins (Google Fonts) as the font family across the entire app.
- Keep components small and focused — one responsibility per file.

---

## Design system

### Brand
- Name: SulatSarap
- Tagline: Where Every Story Feels Good.
- Identity: Filipino blog — warm, modern, inviting.

### Colors
- Primary purple: `#7C3AED`
- Primary pink: `#EC4899`
- Gradient: `linear-gradient(135deg, #7C3AED, #EC4899)`
- Background: soft purple-pink tint `linear-gradient(160deg, #faf5ff, #fdf2f8, #f0fdf4)`
- White: `#FFFFFF`

### Typography
- Font: Poppins (weights: 400, 500, 600, 700, 800, 900)
- Imported via Google Fonts in `src/styles/fonts.css`

### Layout
- Max content width: `max-w-5xl` (home), `max-w-3xl` (post detail)
- Rounded corners on all cards: `rounded-2xl` or `rounded-3xl`
- Subtle shadows: `shadow-sm` default, `shadow-xl` on hover
- Smooth hover transitions: `transition-all duration-200` or `duration-300`

---

## Folder structure
```
src/
├── app/
│   ├── App.tsx                     ← Root: BrowserRouter + BlogProvider + routes
│   ├── context/
│   │   └── BlogContext.tsx         ← Global state (useReducer + localStorage)
│   ├── components/
│   │   ├── BlogHeader.tsx          ← Sticky gradient nav bar
│   │   ├── PostCard.tsx            ← Blog post card (home page list)
│   │   ├── PostForm.tsx            ← Create post form with validation
│   │   ├── EmptyState.tsx          ← Illustrated zero-state (no posts yet)
│   │   ├── CommentSection.tsx      ← Add/delete comments + confirmation modal
│   │   └── media/
│   │       └── ImageWithFallback.tsx
│   └── pages/
│       ├── HomePage.tsx            ← Two-column layout (form + posts grid)
│       └── PostDetailPage.tsx      ← Full post + comments
└── styles/
    ├── fonts.css                   ← Google Fonts (Poppins)
    ├── index.css                   ← CSS entry point
    ├── tailwind.css                ← Tailwind v4 config
    └── theme.css                   ← Design tokens
```

---

## State management
- Use React Context API (`BlogContext.tsx`) + `useReducer` for all global state.
- Persist all posts and comments to `localStorage` via `useEffect`.
- No external state library (Redux, Zustand, etc.) needed.

---

## Routing
- Use `react-router` v7 with `BrowserRouter`, `Routes`, and `Route`.
- Two routes: `/` (HomePage) and `/post/:postId` (PostDetailPage).

---

## Naming conventions
- Use descriptive, feature-related variable names: `blogPost`, `postTitle`, `commentCreatedAt`.
- Avoid generic names like `a`, `b`, `x`, `data`, `item`.
- Component files: PascalCase (`PostCard.tsx`).
- Hook/util files: camelCase (`BlogContext.tsx`).
