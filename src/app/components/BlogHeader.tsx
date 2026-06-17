/**
 * BlogHeader.tsx
 *
 * The top navigation bar for the blog.
 * Shows the blog logo/name and a "New Post" button that scrolls to the form.
 * Fully custom — no UI kit used.
 */

import { useNavigate, useLocation } from "react-router";
import { PenLine } from "lucide-react";

export function BlogHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show the "New Post" shortcut on the home page
  const isOnHomePage = location.pathname === "/";

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
      }}
      className="sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ── Logo & Brand Name ── */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Go to home"
        >
          {/* Animated icon container */}
          {/* Book + heart logo icon — custom SVG, no library */}
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {/* Open book pages */}
              <path d="M11 5C11 5 7 3.5 3 4.5V17C7 16 11 17.5 11 17.5V5Z" fill="white" opacity="0.9"/>
              <path d="M11 5C11 5 15 3.5 19 4.5V17C15 16 11 17.5 11 17.5V5Z" fill="white" opacity="0.6"/>
              {/* Spine */}
              <line x1="11" y1="5" x2="11" y2="17.5" stroke="white" strokeWidth="1.2" opacity="0.8"/>
              {/* Heart on top-right page */}
              <path d="M14.5 7.5C14.5 7 15 6.5 15.5 6.5C16 6.5 16.5 7 16.5 7.5C16.5 8 15.5 9 15.5 9C15.5 9 14.5 8 14.5 7.5Z" fill="#f9a8d4"/>
            </svg>
          </div>
          <div className="text-left">
            <h1 className="text-white text-xl font-extrabold tracking-tight leading-none">
              SulatSarap
            </h1>
            <p className="text-purple-200 text-xs leading-none mt-0.5">
              Where Every Story Feels Good.
            </p>
          </div>
        </button>

        {/* ── Right-side actions ── */}
        <div className="flex items-center gap-3">
          {isOnHomePage && (
            <button
              onClick={() => {
                // Smoothly scroll to the create-post form on the home page
                document
                  .getElementById("create-post-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-purple-50 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <PenLine size={15} />
              New Post
            </button>
          )}

          {!isOnHomePage && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm border border-white/30"
            >
              ← All Posts
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
