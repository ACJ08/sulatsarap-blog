/**
 * EmptyState.tsx
 *
 * A friendly, visually appealing placeholder shown when no posts exist yet.
 * Uses an illustrated SVG graphic and a call-to-action to encourage the user
 * to create their first post.
 */

import { PenLine } from "lucide-react";

interface EmptyStateProps {
  /** Called when user clicks "Write your first post" */
  onWriteFirstPost: () => void;
}

export function EmptyState({ onWriteFirstPost }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      {/* Illustrated graphic */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div
          className="w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
          }}
        >
          {/* Inner circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7c3aed22, #ec489922)",
            }}
          >
            {/* Animated pencil SVG */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              className="animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <rect
                x="12"
                y="4"
                width="28"
                height="38"
                rx="4"
                fill="url(#page-grad)"
              />
              <rect x="18" y="12" width="16" height="2.5" rx="1.25" fill="#c4b5fd" />
              <rect x="18" y="18" width="16" height="2.5" rx="1.25" fill="#c4b5fd" />
              <rect x="18" y="24" width="10" height="2.5" rx="1.25" fill="#c4b5fd" />
              <path
                d="M34 34 L46 22 L50 26 L38 38 L34 38 Z"
                fill="url(#pen-grad)"
              />
              <path d="M34 38 L36 34 L38 38 Z" fill="#f9a8d4" />
              <defs>
                <linearGradient id="page-grad" x1="12" y1="4" x2="40" y2="42">
                  <stop offset="0%" stopColor="#ede9fe" />
                  <stop offset="100%" stopColor="#fce7f3" />
                </linearGradient>
                <linearGradient id="pen-grad" x1="34" y1="22" x2="50" y2="38">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Decorative dots around the circle */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pink-300 opacity-60" />
        <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-purple-400 opacity-50" />
        <div className="absolute top-6 -left-5 w-2 h-2 rounded-full bg-pink-400 opacity-40" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
        No posts yet!
      </h3>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
        Your blog is a blank canvas. Write your first post and share something
        amazing with the world.
      </p>

      {/* CTA button */}
      <button
        onClick={onWriteFirstPost}
        className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm shadow-lg hover:shadow-purple-300 hover:scale-105 active:scale-95 transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
        }}
      >
        <PenLine size={16} />
        Write your first post
      </button>
    </div>
  );
}
