/**
 * PostForm.tsx
 *
 * The "Create a New Post" form.
 * - Validates that both title and description are filled in.
 * - Shows per-field error messages inline (friendly, not generic).
 * - Clears the form after a successful submission.
 * - Provides visual feedback: a brief success flash after posting.
 */

import { useState } from "react";
import { useBlog } from "../context/BlogContext";
import { PenLine, CheckCircle } from "lucide-react";

export function PostForm() {
  const { createPost } = useBlog();

  // ── Form field state ──
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  // ── Validation error messages ──
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // ── Success flash shown for 2s after creating a post ──
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  /**
   * validateForm()
   * Checks that both fields are non-empty and not just whitespace.
   * Returns true if all fields are valid, false otherwise.
   */
  function validateForm(): boolean {
    let isValid = true;

    if (!postTitle.trim()) {
      setTitleError("Please give your post a title.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!postDescription.trim()) {
      setDescriptionError("Please write something in the description.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  }

  /**
   * handleSubmit()
   * Called when the user clicks "Publish Post".
   * Validates → creates post via context → clears form → shows success banner.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent default browser form submission

    if (!validateForm()) return; // stop if validation fails

    createPost(postTitle, postDescription);

    // Clear the form fields
    setPostTitle("");
    setPostDescription("");

    // Show success message for 2 seconds
    setIsSuccessVisible(true);
    setTimeout(() => setIsSuccessVisible(false), 2500);
  }

  return (
    <section
      id="create-post-section"
      className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div
        className="px-8 py-5 flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #7c3aed11 0%, #ec489911 100%)",
          borderBottom: "1px solid #e9d5ff",
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          }}
        >
          <PenLine size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-gray-800 font-bold text-lg leading-none">
            Write a New Post
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Share your thoughts with the world
          </p>
        </div>
      </div>

      {/* ── Success Banner ── */}
      {isSuccessVisible && (
        <div className="mx-8 mt-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-3 animate-pulse">
          <CheckCircle size={18} className="text-green-500 shrink-0" />
          <p className="text-green-700 font-medium text-sm">
            Post published successfully!
          </p>
        </div>
      )}

      {/* ── Form Body ── */}
      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5" noValidate>
        {/* Title field */}
        <div className="space-y-1.5">
          <label
            htmlFor="post-title-input"
            className="block text-sm font-semibold text-gray-700"
          >
            Post Title <span className="text-pink-500">*</span>
          </label>
          <input
            id="post-title-input"
            type="text"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
              if (titleError) setTitleError(""); // clear error as user types
            }}
            placeholder="Give your post a captivating title…"
            className={`w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 ${
              titleError
                ? "border-red-400 focus:border-red-400 ring-1 ring-red-300"
                : "border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200"
            }`}
          />
          {titleError && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <span>⚠</span> {titleError}
            </p>
          )}
        </div>

        {/* Description field */}
        <div className="space-y-1.5">
          <label
            htmlFor="post-description-input"
            className="block text-sm font-semibold text-gray-700"
          >
            Description <span className="text-pink-500">*</span>
          </label>
          <textarea
            id="post-description-input"
            value={postDescription}
            onChange={(e) => {
              setPostDescription(e.target.value);
              if (descriptionError) setDescriptionError("");
            }}
            placeholder="Write your story here… be as detailed as you like."
            rows={5}
            className={`w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 text-sm bg-gray-50 focus:bg-white focus:outline-none transition-all duration-200 resize-none leading-relaxed ${
              descriptionError
                ? "border-red-400 focus:border-red-400 ring-1 ring-red-300"
                : "border-gray-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200"
            }`}
          />
          {descriptionError && (
            <p className="text-red-500 text-xs font-medium flex items-center gap-1">
              <span>⚠</span> {descriptionError}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm shadow-md hover:shadow-purple-300 hover:scale-105 active:scale-95 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
          >
            <PenLine size={15} />
            Publish Post
          </button>
        </div>
      </form>
    </section>
  );
}
