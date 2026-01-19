"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { postsAPI } from "@/lib/api";
import Link from "next/link";

export default function CreateBlogPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState("https://via.placeholder.com/600x400");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const categories = ["Technology", "Lifestyle", "Business", "Health", "Travel", "Other"];

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }

    setPosting(true);

    try {
      const response = await postsAPI.create({
        title,
        excerpt,
        content,
        category,
        image,
      });

      if (response.post) {
        alert("Blog post published successfully!");
        router.push("/dashboard");
      } else {
        setError(response.message || "Failed to create post");
      }
    } catch (err) {
      setError("Error creating post. Please try again.");
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  if (loading || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Create New Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Share your thoughts with the world
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleCreatePost} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Short Description (Excerpt)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your post..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="Preview"
                  className="h-48 w-full object-cover rounded"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400";
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Blog Content (Markdown supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here... You can use Markdown!"
              rows="12"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              required
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              💡 Tip: Use Markdown for formatting (# Headers, **bold**, *italics*, etc.)
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-300 dark:border-gray-600">
            <button
              type="submit"
              disabled={posting}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded transition"
            >
              {posting ? "Publishing..." : "📤 Publish Blog Post"}
            </button>
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded text-center transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
