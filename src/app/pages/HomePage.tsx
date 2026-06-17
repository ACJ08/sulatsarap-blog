/**
 * HomePage.tsx
 *
 * The main landing page of the blog.
 * Layout:
 *   - Left/top: "Create a Post" form (PostForm)
 *   - Right/bottom: All posts grid (PostCard list or EmptyState)
 *
 * On desktop: two-column side-by-side layout.
 * On mobile: single column, form on top, posts below.
 */

import { useBlog } from "../context/BlogContext";
import { PostForm } from "../components/PostForm";
import { PostCard } from "../components/PostCard";
import { EmptyState } from "../components/EmptyState";
import { Layers } from "lucide-react";

export function HomePage() {
  const { allPosts } = useBlog();

  /** Scrolls smoothly to the create-post form when user clicks "Write your first post" */
  function scrollToCreateForm() {
    document
      .getElementById("create-post-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Page intro ── */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome to{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
          >
            SulatSarap
          </span>
        </h2>
        <p className="text-gray-500 text-sm">
          Where Every Story Feels Good. Isulat mo na! ✍️
        </p>
      </div>

      {/* ── Two-column layout on md+, stacked on mobile ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
        {/* Left column: Create Post form (sticky on desktop) */}
        <div className="lg:sticky lg:top-24">
          <PostForm />
        </div>

        {/* Right column: Post list */}
        <div>
          {/* Posts section header */}
          <div className="flex items-center gap-2 mb-5">
            <Layers size={18} className="text-purple-500" />
            <h3 className="text-gray-800 font-bold text-base">
              {allPosts.length === 0
                ? "All Posts"
                : allPosts.length === 1
                ? "1 Post"
                : `${allPosts.length} Posts`}
            </h3>
          </div>

          {/* Conditional: show posts grid or empty state */}
          {allPosts.length === 0 ? (
            <div
              className="rounded-3xl border border-dashed border-purple-200"
              style={{ background: "linear-gradient(135deg, #faf5ff, #fdf2f8)" }}
            >
              <EmptyState onWriteFirstPost={scrollToCreateForm} />
            </div>
          ) : (
            <ul className="space-y-4">
              {allPosts.map((blogPost) => (
                // Each post gets a unique key for React's diffing algorithm
                <li key={blogPost.postId}>
                  <PostCard post={blogPost} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
