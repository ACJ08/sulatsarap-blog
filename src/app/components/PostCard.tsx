/**
 * PostCard.tsx
 *
 * Displays a single blog post as a beautiful card in the posts list.
 * Clicking the card navigates to the full post detail page.
 *
 * Shows:
 *   - Title
 *   - Description preview (truncated to 2 lines)
 *   - Creation date (formatted nicely)
 *   - Comment count badge
 */

import { useNavigate } from "react-router";
import { BlogPost } from "../context/BlogContext";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";

interface PostCardProps {
  post: BlogPost;
}

/** Formats an ISO date string into a readable format like "Jun 17, 2026" */
function formatReadableDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.postId}`);
  };

  const commentCount = post.postComments.length;

  return (
    <article
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      aria-label={`Read post: ${post.postTitle}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      {/* Gradient accent bar on top of each card */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)",
        }}
      />

      <div className="p-6">
        {/* ── Post Title ── */}
        <h3 className="text-gray-900 font-bold text-lg leading-snug group-hover:text-purple-700 transition-colors duration-200 line-clamp-2">
          {post.postTitle}
        </h3>

        {/* ── Description Preview ── */}
        <p className="mt-2 text-gray-500 text-sm leading-relaxed line-clamp-3">
          {post.postDescription}
        </p>

        {/* ── Meta Row: date + comment count + read more ── */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Creation date */}
            <span className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
              <Calendar size={13} />
              {formatReadableDate(post.postCreatedAt)}
            </span>

            {/* Comment count badge */}
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600">
              <MessageCircle size={12} />
              {commentCount === 0
                ? "No comments"
                : commentCount === 1
                ? "1 comment"
                : `${commentCount} comments`}
            </span>
          </div>

          {/* Read more arrow — animates on hover */}
          <div className="flex items-center gap-1 text-purple-500 text-xs font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-200">
            Read more <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </article>
  );
}
