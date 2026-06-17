/**
 * App.tsx
 *
 * Root component of the SulatSarap blog application.
 *
 * Responsibilities:
 *   1. Wraps the entire app in <BlogProvider> so all components can access state.
 *   2. Sets up React Router with two routes:
 *      - "/" → HomePage (list all posts + create post form)
 *      - "/post/:postId" → PostDetailPage (single post + comments)
 *   3. Renders <BlogHeader> on every page.
 *   4. Applies the page-level background gradient.
 *
 * Architecture note:
 *   We use React Router v7's <BrowserRouter> + <Routes> + <Route>.
 *   This gives us clean URLs and client-side navigation (no full page reloads).
 */

import { BrowserRouter, Routes, Route } from "react-router";
import { BlogProvider } from "./context/BlogContext";
import { BlogHeader } from "./components/BlogHeader";
import { HomePage } from "./pages/HomePage";
import { PostDetailPage } from "./pages/PostDetailPage";

export default function App() {
  return (
    /**
     * <BlogProvider> wraps everything so any component inside can call useBlog()
     * to read or update posts/comments.
     */
    <BlogProvider>
      {/**
       * <BrowserRouter> enables client-side routing.
       * It intercepts link clicks and renders the matching <Route> without
       * reloading the page — making the app feel fast and native.
       */}
      <BrowserRouter>
        {/* Min-height + background gradient applied to the whole page */}
        <div
          className="min-h-screen"
          style={{
            background:
              "linear-gradient(160deg, #faf5ff 0%, #fdf2f8 50%, #f0fdf4 100%)",
          }}
        >
          {/* Sticky header rendered on every route */}
          <BlogHeader />

          {/* Route definitions */}
          <Routes>
            {/* Home: shows the post creation form + all posts */}
            <Route path="/" element={<HomePage />} />

            {/* Post detail: shows one post and its comment section */}
            <Route path="/post/:postId" element={<PostDetailPage />} />

            {/* Catch-all: redirect unknown URLs back to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>

          {/* ── Footer ── */}
          <footer className="text-center py-8 mt-4">
            <p className="text-gray-400 text-xs">
              Made with{" "}
              <span
                className="font-semibold bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #7c3aed, #ec4899)",
                }}
              >
                SulatSarap
              </span>{" "}
              · {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </BlogProvider>
  );
}
