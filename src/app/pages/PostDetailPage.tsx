/**
 * PostDetailPage.tsx
 *
 * Displays the full content of a single blog post, plus its comments.
 *
 * URL: /post/:postId
 *
 * The postId comes from the URL via React Router's useParams() hook.
 * We then look it up via getPostById() from BlogContext.
 *
 * If the post isn't found (e.g. bad URL), we show a friendly 404 message.
 */

import { useParams, useNavigate } from "react-router";
import { useBlog } from "../context/BlogContext";
import { CommentSection } from "../components/CommentSection";
import { Calendar, MessageCircle, ArrowLeft, FileX } from "lucide-react";

/** Formats an ISO date into "Wednesday, June 17, 2026" */
function formatFullDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { getPostById } = useBlog();
  const navigate = useNavigate();

  // Look up the post from context using the ID in the URL
  const currentPost = getPostById(postId ?? "");

  // ── 404 state: post not found ──
  if (!currentPost) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <FileX size={28} className="text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Post not found</h2>
        <p className="text-gray-500 text-sm mb-8">
          This post may have been deleted or the link is incorrect.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm hover:scale-105 transition-all"
          style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
        >
          <ArrowLeft size={15} />
          Back to all posts
        </button>
      </main>
    );
  }

  const commentCount = currentPost.postComments.length;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* ── Back button ── */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-purple-600 font-semibold text-sm mb-8 hover:gap-3 transition-all duration-200 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform duration-200"
        />
        All Posts
      </button>

      {/* ── Post Hero Card ── */}
      <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        {/* Gradient header accent */}
        <div
          className="h-2"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #a855f7, #ec4899)",
          }}
        />

        <div className="px-8 py-8 sm:px-10 sm:py-10">
          {/* ── Post Title ── */}
          <h1 className="text-gray-900 font-extrabold text-2xl sm:text-3xl leading-tight mb-4">
            {currentPost.postTitle}
          </h1>

          {/* ── Meta: date + comment count ── */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-gray-400 text-sm">
              <Calendar size={14} />
              {formatFullDate(currentPost.postCreatedAt)}
            </span>

            <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-600">
              <MessageCircle size={13} />
              {commentCount === 0
                ? "No comments"
                : commentCount === 1
                ? "1 comment"
                : `${commentCount} comments`}
            </span>
          </div>

          {/* ── Full Description ── */}
          <div className="text-gray-700 text-base leading-loose whitespace-pre-wrap">
            {currentPost.postDescription}
          </div>
        </div>
      </article>

      {/* ── Comments Section ── */}
      <div className="bg-gray-50 rounded-3xl border border-gray-100 px-6 py-8 sm:px-8">
        <CommentSection
          postId={currentPost.postId}
          comments={currentPost.postComments}
        />
      </div>
    </main>
  );
}
