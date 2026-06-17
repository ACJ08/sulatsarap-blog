/**
 * BlogContext.tsx
 *
 * Global state management for the blog application.
 * Uses React Context + useReducer to manage posts and comments.
 * Data is persisted to localStorage so posts survive page refreshes.
 *
 * Why Context + useReducer?
 * - Context: shares state across all components without prop drilling.
 * - useReducer: keeps state transitions predictable and easy to debug.
 * - localStorage: gives the app real persistence without a backend.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// ─── Data Types ───────────────────────────────────────────────────────────────

/** A single comment attached to a blog post */
export interface BlogComment {
  commentId: string;
  commentText: string;
  commentCreatedAt: string; // ISO date string
}

/** A full blog post with its associated comments */
export interface BlogPost {
  postId: string;
  postTitle: string;
  postDescription: string;
  postCreatedAt: string; // ISO date string
  postComments: BlogComment[];
}

// ─── State Shape ──────────────────────────────────────────────────────────────

interface BlogState {
  allPosts: BlogPost[];
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type BlogAction =
  | { type: "CREATE_POST"; payload: { title: string; description: string } }
  | { type: "ADD_COMMENT"; payload: { postId: string; commentText: string } }
  | { type: "DELETE_COMMENT"; payload: { postId: string; commentId: string } };

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Generates a simple unique ID using timestamp + random number */
function generateUniqueId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

/** Loads saved posts from localStorage, or returns empty array on first visit */
function loadPostsFromStorage(): BlogPost[] {
  try {
    const savedData = localStorage.getItem("blogPosts");
    return savedData ? JSON.parse(savedData) : [];
  } catch {
    // If JSON parsing fails, start fresh
    return [];
  }
}

/** Saves the current posts array to localStorage */
function savePostsToStorage(posts: BlogPost[]): void {
  localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

/**
 * Pure function that returns the next state based on the current state and action.
 * Never mutates state directly — always returns a new object.
 */
function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case "CREATE_POST": {
      const newPost: BlogPost = {
        postId: generateUniqueId(),
        postTitle: action.payload.title.trim(),
        postDescription: action.payload.description.trim(),
        postCreatedAt: new Date().toISOString(),
        postComments: [],
      };
      return { allPosts: [newPost, ...state.allPosts] }; // newest post first
    }

    case "ADD_COMMENT": {
      const newComment: BlogComment = {
        commentId: generateUniqueId(),
        commentText: action.payload.commentText.trim(),
        commentCreatedAt: new Date().toISOString(),
      };
      return {
        allPosts: state.allPosts.map((post) =>
          post.postId === action.payload.postId
            ? { ...post, postComments: [...post.postComments, newComment] }
            : post
        ),
      };
    }

    case "DELETE_COMMENT": {
      return {
        allPosts: state.allPosts.map((post) =>
          post.postId === action.payload.postId
            ? {
                ...post,
                postComments: post.postComments.filter(
                  (c) => c.commentId !== action.payload.commentId
                ),
              }
            : post
        ),
      };
    }

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface BlogContextValue {
  allPosts: BlogPost[];
  createPost: (title: string, description: string) => void;
  addComment: (postId: string, commentText: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  getPostById: (postId: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface BlogProviderProps {
  children: ReactNode;
}

export function BlogProvider({ children }: BlogProviderProps) {
  const [state, dispatch] = useReducer(blogReducer, {
    allPosts: loadPostsFromStorage(), // hydrate from localStorage on first render
  });

  // Persist to localStorage whenever posts change
  useEffect(() => {
    savePostsToStorage(state.allPosts);
  }, [state.allPosts]);

  // Action creators — these dispatch actions to the reducer
  const createPost = (title: string, description: string) => {
    dispatch({ type: "CREATE_POST", payload: { title, description } });
  };

  const addComment = (postId: string, commentText: string) => {
    dispatch({ type: "ADD_COMMENT", payload: { postId, commentText } });
  };

  const deleteComment = (postId: string, commentId: string) => {
    dispatch({ type: "DELETE_COMMENT", payload: { postId, commentId } });
  };

  const getPostById = (postId: string) =>
    state.allPosts.find((post) => post.postId === postId);

  return (
    <BlogContext.Provider
      value={{
        allPosts: state.allPosts,
        createPost,
        addComment,
        deleteComment,
        getPostById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

/**
 * useBlog() — consume the blog context anywhere in the component tree.
 * Throws an error if used outside <BlogProvider> so bugs are caught early.
 */
export function useBlog(): BlogContextValue {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used inside <BlogProvider>");
  }
  return context;
}
