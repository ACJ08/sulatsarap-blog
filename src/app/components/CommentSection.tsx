/**
 * CommentSection.tsx
 *
 * Handles everything comment-related for a single blog post:
 *   1. Comment input form (with validation)
 *   2. List of existing comments (newest at top)
 *   3. Delete button per comment with a confirmation dialog
 *
 * Why we put this in its own component:
 *   - Keeps PostDetailPage clean and focused on layout.
 *   - Comment logic is complex enough to deserve its own file.
 */

import { useState } from "react";
import { useBlog, BlogComment } from "../context/BlogContext";
import { MessageCircle, Send, Trash2, AlertTriangle } from "lucide-react";

interface CommentSectionProps {
  postId: string;
  comments: BlogComment[];
}

/** Formats an ISO date into "Jun 17, 2026 at 3:45 PM" */
function formatCommentDate(isoDateString: string): string {
  return new Date(isoDateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A simple custom confirmation dialog.
 * We build this from scratch (no library) to stay within exam restrictions.
 */
function DeleteConfirmModal({ onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    // Backdrop overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onCancel} // clicking backdrop = cancel
    >
      {/* Modal card */}
      <div
        className="bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()} // prevent backdrop click from firing
      >
        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
        </div>

        <h3 className="text-gray-900 font-bold text-lg text-center mb-2">
          Delete Comment?
        </h3>
        <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
          This action cannot be undone. The comment will be permanently removed.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main CommentSection Component ───────────────────────────────────────────

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const { addComment, deleteComment } = useBlog();

  // ── Add comment form state ──
  const [newCommentText, setNewCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

  // ── Delete confirmation modal state ──
  // Stores the ID of the comment being considered for deletion, or null
  const [commentPendingDeleteId, setCommentPendingDeleteId] = useState<string | null>(null);

  /**
   * handleAddComment()
   * Validates the textarea, then dispatches addComment to context.
   */
  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();

    if (!newCommentText.trim()) {
      setCommentError("Please write something before posting.");
      return;
    }

    addComment(postId, newCommentText);
    setNewCommentText("");
    setCommentError("");
  }

  /**
   * handleConfirmDelete()
   * Called when the user confirms they want to delete the comment.
   */
  function handleConfirmDelete() {
    if (commentPendingDeleteId) {
      deleteComment(postId, commentPendingDeleteId);
      setCommentPendingDeleteId(null); // close modal
    }
  }

  return (
    <section className="mt-10">
      {/* ── Section Title ── */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          }}
        >
          <MessageCircle size={16} className="text-white" />
        </div>
        <h2 className="text-gray-800 font-bold text-lg">
          {comments.length === 0
            ? "Comments"
            : comments.length === 1
            ? "1 Comment"
            : `${comments.length} Comments`}
        </h2>
      </div>

      {/* ── Add Comment Form ── */}
      <form
        onSubmit={handleAddComment}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8"
      >
        <label
          htmlFor="new-comment-input"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Add a comment
        </label>
        <textarea
          id="new-comment-input"
          value={newCommentText}
          onChange={(e) => {
            setNewCommentText(e.target.value);
            if (commentError) setCommentError("");
          }}
          placeholder="Share your thoughts on this post…"
          rows={3}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none resize-none leading-relaxed transition-all duration-200 ${
            commentError
              ? "border-red-400 ring-1 ring-red-300"
              : "border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200"
          }`}
        />
        {commentError && (
          <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
            <span>⚠</span> {commentError}
          </p>
        )}
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-sm hover:shadow-purple-300 hover:scale-105 active:scale-95 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
          >
            <Send size={14} />
            Post Comment
          </button>
        </div>
      </form>

      {/* ── Comments List ── */}
      {comments.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle size={36} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {/* Show newest comments at the bottom (chronological order) */}
          {[...comments].reverse().map((comment) => (
            <li
              key={comment.commentId}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex gap-4 group hover:border-purple-100 transition-colors duration-200"
            >
              {/* Avatar initials placeholder */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold select-none"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                }}
              >
                A
              </div>

              <div className="flex-1 min-w-0">
                {/* Comment metadata */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-700">
                    Anonymous
                  </span>
                  <span className="text-gray-400 text-xs">
                    {formatCommentDate(comment.commentCreatedAt)}
                  </span>
                </div>

                {/* Comment body */}
                <p className="text-gray-600 text-sm leading-relaxed break-words">
                  {comment.commentText}
                </p>
              </div>

              {/* Delete button — always visible on mobile, hover-visible on desktop */}
              <button
                onClick={() => setCommentPendingDeleteId(comment.commentId)}
                aria-label="Delete comment"
                className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {commentPendingDeleteId && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setCommentPendingDeleteId(null)}
        />
      )}
    </section>
  );
}
