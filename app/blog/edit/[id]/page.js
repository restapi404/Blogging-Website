"use client";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { postsAPI } from "@/lib/api";
import Link from "next/link";

export default function EditBlogPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState("https://via.placeholder.com/600x400");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  const categories = ["Technology", "Lifestyle", "Business", "Health", "Travel", "Other"];

  // Fetch post
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const data = await postsAPI.getById(id);
        setPost(data);

        // Check if user is the owner
        if (data.author._id !== user?.id && !authLoading) {
          setError("You can only edit your own posts");
          setTimeout(() => router.push("/dashboard"), 2000);
          return;
        }

        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setCategory(data.category);
        setImage(data.image);
      } catch (err) {
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user?.id, authLoading, router]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }

    setSaving(true);

    try {
      const response = await postsAPI.update(id, {
        title,
        excerpt,
        content,
        category,
        image,
      });

      if (response.post) {
        alert("Blog post updated successfully!");
        router.push("/dashboard");
      } else {
        setError(response.message || "Failed to update post");
      }
    } catch (err) {
      setError("Error updating post. Please try again.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Edit Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Update your blog post
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdatePost} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              rows="12"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-300 dark:border-gray-600">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded transition"
            >
              {saving ? "Updating..." : "💾 Update Post"}
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
