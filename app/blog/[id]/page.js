"use client";
import { use, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { postsAPI, commentsAPI } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogDetails({ params }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [fullPost, setFullPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await postsAPI.getById(id);
        setFullPost(data);
        const formattedBlog = {
          id: data._id,
          title: data.title,
          image: data.image,
          content: data.content,
          author: data.author.name,
          authorId: data.author._id,
          date: new Date(data.createdAt).toLocaleDateString(),
          tags: [data.category],
          views: data.views,
          likes: data.likes.length,
        };
        setBlog(formattedBlog);

        // Fetch comments for this post
        const commentsData = await commentsAPI.getByPost(id);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await commentsAPI.create(id, commentText);
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment. Please login first.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    try {
      await postsAPI.delete(id);
      alert("Post deleted successfully!");
      router.push("/dashboard");
    } catch (err) {
      alert("Error deleting post");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading blog...</div>;
  }

  if (error || !blog) {
    return <div className="p-8 text-center text-red-600">Blog not found.</div>;
  }

  const isOwner = user && user.id === blog.authorId;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow">
      <img src={blog.image} alt={blog.title} className="rounded mb-6 h-60 w-full object-cover" />
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="text-gray-500 dark:text-gray-400 mb-4 flex justify-between items-center">
            <span>By {blog.author} • {blog.date}</span>
            <span className="text-sm">👁️ {blog.views} views</span>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/blog/edit/${id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags.map(tag => (
          <span key={tag} className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="prose dark:prose-invert max-w-none mb-8">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={user ? "Add a comment..." : "Login to comment..."}
            disabled={!user}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            rows="3"
          />
          {!user && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>{" "}
              to comment
            </p>
          )}
          {user && (
            <button
              type="submit"
              disabled={submittingComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          )}
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="font-bold">{comment.author.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
                <p className="text-gray-900 dark:text-gray-100">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
}
